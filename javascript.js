"use strict";
//prompting the user to enter in their total budget and setting the other items to 0.
      var budget = {
        "Total": prompt("Please enter total budget", "200"),
        "Entertainment": 0,
        "Food": 0,
        "Clothing": 0,
        "Bills": 0,
        "Remaining": 0
      }
  //loading the current chart from google  charts
      google.charts.load('current', {
        'packages': ['corechart']
      });
      //updating the google chart everytime data is entered 
      google.charts.setOnLoadCallback(updateAll);

//creating a function that adds the value to the chart
      function buttonPressed(e) {
        event.preventDefault();
        if(document.getElementById("amount").value.length === 0){
          document.getElementById("amount").value = "0"
        }
        switch (document.getElementById("selector").value) {
          case "1":
            budget["Entertainment"] = budget["Entertainment"] + parseInt(document.getElementById("amount").value, 10);
            break;
          case "2":
            budget["Food"] = budget["Food"] + parseInt(document.getElementById("amount").value, 10);
            break;
          case "3":
            budget["Clothing"] = budget["Clothing"] + parseInt(document.getElementById("amount").value, 10);
            break;
          case "4":
            budget["Bills"] = budget["Bills"] +  parseInt(document.getElementById("amount").value, 10);
            break;

        }
        //sends all the data to the chart when new data is inputed 
        updateAll();
        //resetting the input value to $0
        document.getElementById("myForm").reset();
      }
        //calculating all the integers that are stored/displayed in the table 
      function updateAll() {
        budget["Remaining"] = budget["Total"] - budget["Entertainment"] - budget["Food"] - budget["Clothing"] - budget["Bills"];

        document.getElementById("availBal").innerHTML = "Available Balance: $" + budget["Remaining"]
        document.getElementById("entertainmentSpent").innerHTML = "$" + budget["Entertainment"]
        document.getElementById("foodSpent").innerHTML = "$" + budget["Food"]
        document.getElementById("clothingSpent").innerHTML = "$" + budget["Clothing"]
        document.getElementById("billsSpent").innerHTML = "$" + budget["Bills"]

//creating a variable with an array that stores all the numbers that are being calculated 
        var dataArrayGen = [
          ['Budget', "Dollars"],
          ['Entertainment', budget["Entertainment"]],
          ['Food', budget["Food"]],
          ['Clothing', budget["Clothing"]],
          ['Bills', budget["Bills"]],
          ['Remaining', budget["Remaining"]]
        ]
//storing the data array that was declared above for the chart
        var data = google.visualization.arrayToDataTable(dataArrayGen);

        // giving adjustable properties to the chart to give it some design 
        var options = {
          is3D: true,
          pieSliceText:  `value`,
          width :600,
          height:400,
          
        };
//applying the data to the chart and adjusting the slice sizes
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        //displaying an error message when the user has gone over their budget
        google.visualization.events.addListener(chart, 'error', function (googleError) {
          let errorMessage = document.querySelector("#piechart div span", "#piechart div");
          errorMessage.innerText = "Oh no, you're over budget Mate!!!!!";
          errorMessage.style.fontSize = "30px";
          errorMessage.style.display = "flex";
          errorMessage.style.backgroundColor = "";
          errorMessage.style.color = "red";
          errorMessage.style.padding = "24%";
 
      });
      //calling all the data to actually display the chart
        chart.draw(data, options);
      }
 

