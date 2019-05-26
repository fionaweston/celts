import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///static/data/parkingCitations.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Agency = Base.classes.Agency
AgencySummary = Base.classes.AgencySummary

AgencyDayOfWeekSummary=Base.classes.AgencyDayOfWeekSummary
AgencyTimeOfDaySummary=Base.classes.AgencyTimeOfDaySummary
AgencyTopMeters=Base.classes.AgencyTopMeters
MeterDetails=Base.classes.MeterDetails

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/getAgencies")
def agency():
    

    # Use Pandas to perform the sql query
    stmt_meta = db.session.query(Agency).statement
    df_meta = pd.read_sql_query(stmt_meta, db.session.bind)
    stmt_summary=db.session.query(AgencySummary).statement
    df_summary = pd.read_sql_query(stmt_summary, db.session.bind)

    df=pd.merge(df_meta, df_summary, how='inner', left_on="AgencyID", right_on="AgencyID_FK")
    
    agency_metadata=[]
    for i in range(df_meta.shape[0]):
        m_dict={}
       
        m_dict["name"]=df_meta.iloc[i,0]
        m_dict["id"]=str(df_meta.iloc[i,1])

        df_district=df_summary.loc[df_summary["AgencyID_FK"]==df_meta.iloc[i,1],:]
        summary_arr=[]
        for j in range(df_district.shape[0]):
            summary_dict={}
            summary_dict["count"]=int(df_district.iloc[j,2])
            summary_dict["year"]=int(df_district.iloc[j,3])
            summary_arr.append(summary_dict)
        m_dict["summarycount"]=summary_arr
        agency_metadata.append(m_dict)

    return jsonify(agency_metadata)

@app.route("/getAgencyDetails/<id>/<year>")
def agencyDetails(id=None,year=None):
    

    # Use Pandas to perform the sql query
    
    stmt_tod = db.session.query(AgencyTimeOfDaySummary).\
        filter_by(AgencyID_FK=id).filter_by(Year=year).statement
    df_tod = pd.read_sql_query(stmt_tod, db.session.bind)

    stmt_dow = db.session.query(AgencyDayOfWeekSummary).\
        filter_by(AgencyID_FK=id).filter_by(Year=year).statement
    df_dow = pd.read_sql_query(stmt_dow, db.session.bind)

    stmt_meters = db.session.query(AgencyTopMeters).\
        filter_by(AgencyID_FK=id).filter_by(Year=year).statement
    df_meters = pd.read_sql_query(stmt_meters, db.session.bind)
    

    
    agency_details={}    
        
    agency_details["year"]=int(year)
    agency_details["id"]=str(id)

    summary_dow=[]
    for j in range(df_dow.shape[0]):
        summary_dict={}
        summary_dict["count"]=int(df_dow.iloc[j,4])
        summary_dict["day"]=str(df_dow.iloc[j,3])
        summary_dow.append(summary_dict)
    agency_details["summarydayofweek"]=summary_dow

    
    summary_tod=[]
    for j in range(df_tod.shape[0]):
        summary_dict={}
        summary_dict["count"]=int(df_tod.iloc[j,4])
        summary_dict["hour"]=str(df_tod.iloc[j,3])
        summary_tod.append(summary_dict)
    agency_details["summaryhour"]=summary_tod

    summary_meters=[]
    for j in range(df_meters.shape[0]):
        summary_dict={}
        summary_dict["count"]=int(df_meters.iloc[j,7])
        summary_dict["location"]=str(df_meters.iloc[j,4])
        summary_dict["id"]=str(df_meters.iloc[j,2])
        summary_dict["latitude"]=float(df_meters.iloc[j,5])
        summary_dict["longitude"]=float(df_meters.iloc[j,6])
        summary_meters.append(summary_dict)
    agency_details["meters"]=summary_meters
    

    return jsonify(agency_details)

@app.route("/getMeterDetails/<id>/<year>")
def meterDetails(id=None,year=None):
    

    # Use Pandas to perform the sql query
    
    stmt_md = db.session.query(MeterDetails).\
        filter_by(MeterID=id).filter_by(Year=year).statement
    df_md = pd.read_sql_query(stmt_md, db.session.bind)
    

    
    meter_details={}    
        
    meter_details["year"]=int(year)
    meter_details["id"]=str(id)

    summary_make=[]
    for j in range(df_md.shape[0]):
        summary_dict={}
        summary_dict["count"]=int(df_md.iloc[j,5])
        summary_dict["vehiclemake"]=str(df_md.iloc[j,4])
        summary_make.append(summary_dict)
    meter_details["summarymake"]=summary_make

    

    return jsonify(meter_details)

if __name__ == "__main__":
    app.run()
