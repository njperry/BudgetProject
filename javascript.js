
      var budget = {
        "Total": prompt("Please enter total budget", "200"),
        "Entertainment": 0,
        "Food": 0,
        "Clothing": 0,
        "Bills": 0,
        "Remaining": 0
      }
  
      google.charts.load('current', {
        'packages': ['corechart']
      });
      google.charts.setOnLoadCallback(updateAll);


      function buttonPressed() {
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
            budget["Bills"] = budget["Bills"] + parseInt(document.getElementById("amount").value, 10);
            break;

        }
        updateAll();
      }

      function updateAll() {
        budget["Remaining"] = budget["Total"] - budget["Entertainment"] - budget["Food"] - budget["Clothing"] - budget["Bills"];

        document.getElementById("availBal").innerHTML = "Available Balance: $" + budget["Remaining"]
        document.getElementById("entertainmentSpent").innerHTML = "$" + budget["Entertainment"]
        document.getElementById("foodSpent").innerHTML = "$" + budget["Food"]
        document.getElementById("clothingSpent").innerHTML = "$" + budget["Clothing"]
        document.getElementById("billsSpent").innerHTML = "$" + budget["Bills"]


        var dataArrayGen = [
          ['Budget', "Dollars"],
          ['Entertainment', budget["Entertainment"]],
          ['Food', budget["Food"]],
          ['Clothing', budget["Clothing"]],
          ['Bills', budget["Bills"]],
          ['Remaining', budget["Remaining"]]
        ]

        var data = google.visualization.arrayToDataTable(dataArrayGen);

        var options = {
          title: 'Budget'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      //   google.visualization.events.addListener(chart, 'error', function (googleError) {
      //     google.visualization.errors.removeError(googleError.id);
      //     document.getElementById("error_msg").innerHTML = "Message removed";
      // });
    


        chart.draw(data);
      }

      M.AutoInit();
