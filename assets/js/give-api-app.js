var giveCharts = giveCharts || {};

(function($){

	giveCharts.charts = (function( charts ) {

		charts.api_check = function() {
			if( give_local && give_local.key && give_local.token ) {
				return true;
			} else {
				return false
			}
		}

		charts.get_donations = function( count ) {
			if( !charts.api_check() ) {
				return false;
			}

			var dfd = jQuery.Deferred();

			$.get( give_local.give_api_url + '/donations?key=' + give_local.key + '&token=' + give_local.token, function( res ) {
				dfd.resolve( res.donations );
			});

			return dfd.promise();
		}

		charts.load_donation_chart = function load_chart() {

			$.when( charts.get_donations()).then(function( donations ) {
				var pieChartData = [],
					colors = ['red', 'blue', 'green', 'purple', 'yellow', 'cyan'],
					forms = [],
					labels = [],
					data = [];

				$.each(donations, function (key, value) {
					forms.push(value.form.name);
					labels.push(value.form.name);
				})
				$.unique(labels);

				$.each(labels, function (key, value) {
					data.push(count(forms, value));
					pieChartData.push({
						value: count(forms, value),
						color: colors[key],
						highlight: colors[key + 1],
						label: value
					})
				});

				var barChartData = {
					labels: labels,
					datasets: [
						{
							fillColor: colors[4],
							strokeColor: colors[1],
							highlightFill: colors[2],
							highlightStroke: colors[3],
							data: data
						},
					]
				}


				// LOAD CHART
				//var ctx = document.getElementById("bar").getContext("2d");
				//window.myBar = new Chart(ctx).Bar(barChartData, {
				//	responsive: true
				//});

				var ctx = document.getElementById("chart").getContext("2d");
				window.myBar = new Chart(ctx).Doughnut(pieChartData, {
					responsive: true
				});

			});

		}

		return charts;

	}(giveCharts.charts || {}))

	$(document).ready(function() {
		giveCharts.charts.load_donation_chart();
	});

}(jQuery));



function count( arr, find ) {
	
	var count = 0;
	for(var i = 0; i < arr.length; ++i){
	    if(arr[i] == find)
	        count++;
	}
	return count;
	
}
