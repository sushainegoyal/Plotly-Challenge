//read in metadata(demographic) key of json and organize it into table

function MetaData(sample) {
    d3.json(`/metadata/${sample}`).then((data) => {
        var panel = d3.select("#sample_metadata");
        panel.html("");

        Object.entries(data).forEach(([key, value]) => {
            panel.append("p").text(`${key}: ${value}`);
        });

    })
    }

    //read in bacterial sample key of json and organize it into table
    //bar chart
    function SampleData(sample) {
        d3.json(`/samples${sample}`).then(function(data) {

            var x_values = data.otu_ids;
            var y_values = data.sample_values;
            var m_size = data.sample_values;
            var m_colors = data.otu_ids;
            var t_values = data.otu_labels;

            var data = [trace];

            var layout = {
                xaxis: {title: "otu id",}
            };
            //bubble plot for bacteria data
            Plotly.newPlot('bubble', data, layout);

            d3.json(`/samples/${sample}`).then(function(data) {
                var pie_values = data.sample_values.slice(0,10);
                var pie_labels = data.otu_ids.slice(0,10);

                var data = [{
                    values: pie_values,
                    labels: pie_labels,
                    hovertext: pie_hover,
                    type: 'pie'
                }];

                Plotly.newPlot('pie', data);
                //pie chart for bacteria data
            });
        });
    }
    //for dropdown menu, select study participant
    function init() {
        var selector = d3.select("#selDataset");

        d3.json("/names").then((sampleNames) => {
            sampleNames.forEach((sample) => {
                selector
                    .append("option")
                    .text(sample)
                    .property('value', sample);
            });
            //building first plot
            var sample1 = sampleNames[0];
            SampleData(sample1);
            MetaData(sample1);
        });
    }
    //refreshing plot when new sample is selected
    function options(sample2) {
        SampleData(sample2);
        MetaData(sample2);
    }

    init();