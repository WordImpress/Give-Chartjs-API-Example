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

			$.get( give_local.give_api_url + '/donations?key=' + give_local.key + '&token=' + give_local.token + '&number=100', function( res ) {
				dfd.resolve( res.donations );
			});

			return dfd.promise();
		}

		charts.load_donation_chart = function load_chart() {

			$.when( charts.get_donations()).then(function( donations ) {
				var pieChartData = [],
					forms = [],
					labels = [],
					data = [],
					month = [];

				$.each(donations, function (key, value) {
					forms.push(value.form.name);
					labels.push(value.form.name);
					var date = new Date( value.date );
					if( !month[date.getMonth()] ) {
						month[date.getMonth()] = value.total;
					} else {
						month[date.getMonth()] = month[date.getMonth()] + value.total;
					}
				})
				$.unique(labels);

				/** PIE DATA */
				var pieColors = ['#ECE5CE', '#E08E79'];
				$.each(labels, function (key, value) {
					data.push(count(forms, value));
					pieChartData.push({
						value: count(forms, value),
						color: pieColors[key],
						highlight: '#C5E0DC',
						label: value
					})
				});

				/** BAR DATA **/
				var barChartData = {
					labels: [],
					datasets: [
						{
							label: 'Month Totals (dollars)',
							fillColor: '#ECE5CE',
							stokeColor: '#E08E79',
							highlightFill: '#C5E0DC',
							data: [],
						}
					]
				};
				var month_key = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
				$.each( month, function( key, value ) {
					barChartData.labels.push( month_key[key] );
					barChartData.datasets[0].data.push( value );
				});

				// 0'ing out all undefined months
				$.each( barChartData.datasets[0].data, function( key, value ) {
					if( !value ) {
						barChartData.datasets[0].data[key] = 0;
					}
				});

				/** LOAD CHARTS **/
				var bar_graph = document.getElementById("bar").getContext("2d");
				window.myBar = new Chart(bar_graph).Bar(barChartData, {
					responsive: true,
					tooltipTemplate: "<%if (label){%><%=label%>: <%}%>$<%= value %>",
				});
				jQuery('#month_chart').append(window.myBar.generateLegend());

				var pie_chart = document.getElementById("chart").getContext("2d");
				window.myPie = new Chart(pie_chart).Pie(pieChartData, {
					responsive: true
				});

				jQuery('#form_chart').append(window.myPie.generateLegend());


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
