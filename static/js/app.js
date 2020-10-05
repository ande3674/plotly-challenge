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
    });
}

function drawBarGraph(id) {
    console.log(`drawBarGraph() called with: ${id}`);
}

function drawBubbleChart(id) {
    console.log(`drawBubbleChart() called with: ${id}`);
}

function  optionChanged(newId) {
    console.log(`optionChanged(${newId})`);
    drawBarGraph(newId);
    drawBubbleChart(newId);
}

initDashboard()