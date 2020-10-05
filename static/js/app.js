//Some code borrowed from Dom's office hours :-)
console.log("You are in the app.js file");

function initDashboard() {
    console.log("initDashboard() called");

    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names;

        // Populate the selector with the IDs
        sampleNames.forEach((id) => {
            selector.append("option")
                .text(id)
                .property("value", id);
        });
        var initialId = sampleNames[0];
        console.log("Starting sample ID: ", initialId);

        // call functions to set initial state of components
        drawBarGraph(initialId);
        drawBubbleChart(initialId);
        fillDemographicData(initialId);
    });
}

function drawBarGraph(id) {
    console.log(`drawBarGraph() called with: ${id}`);

    d3.json("samples.json").then((data) => {
        // get samples for this id
        var samples = data.samples;
        // filter on requested id
        var filterSamplesArray = samples.filter((s) => s.id == id);
        // only one match for each ID so grab index 0:
        var result = filterSamplesArray[0];
        console.log(result)

        // get the stuff for this id
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map((otuId) => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", [barData], barLayout);
    });
}

function drawBubbleChart(id) {
    console.log(`drawBubbleChart() called with: ${id}`);
}

function fillDemographicData(id) {
    console.log(`fillDemographicData() called with: ${id}`);
}

function  optionChanged(newId) {
    console.log(`optionChanged(${newId})`);
    drawBarGraph(newId);
    drawBubbleChart(newId);
    fillDemographicData(newId);
}

initDashboard()
