from flask import render_template, request
import requests
from . import bp as main



@main.route('/students', methods=['GET'])
def students():
    my_students = ["diana", "caleb", "connor","marco", "lizzette", "marcus", "kevin", "gulfem"]
                                            #name in Jinja = name in python
    return render_template('students.html.j2', students = my_students)


@main.route('/api_test', methods=['GET'])
def api_test():
    return {"Caleb":"Smart dude",
            "Dylan":"Smelly Dude", 
            "Marcus": "Chill Dude", 
            "Conman" : "Pokemon Dude", 
            "Gulfem": "Fun Dude",
            "Diana": "Joke destroyer!"}

@main.route('/ergast', methods=['GET', 'POST'])
def ergast():
    if request.method =='POST':
        year = request.form.get("year")
        r = request.form.get("round")
        url = f'http://ergast.com/api/f1/{year}/{r}/driverStandings.json'
        response = requests.get(url)
        if not response.ok:
            error_string = "We had an Unexpected Error"
            return render_template('ergast.html.j2', error = error_string)
        if not response.json()["MRData"]["StandingsTable"]["StandingsLists"]:
            error_string = "You have a Bad Year / Round Combo/  Please Try Again"
            return render_template('ergast.html.j2', error = error_string)
        data = response.json()["MRData"]["StandingsTable"]["StandingsLists"][0]['DriverStandings']
        new_data=[]
        for racer in data:
            racer_dict={
                "last_name":racer['Driver']['familyName'],
                "first_name":racer['Driver']['givenName'],
                "position":racer['position'],
                "wins":racer['wins'],
                "DOB":racer['Driver']['dateOfBirth'],
                "nationality":racer['Driver']['nationality'],
                "constructor":racer['Constructors'][0]['name']
            }
            new_data.append(racer_dict)
        return render_template('ergast.html.j2', racers=new_data)

    return render_template('ergast.html.j2')
