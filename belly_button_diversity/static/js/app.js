// Use D3 fetch to read the JSON file
d3.json("../../data/samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;
    console.log(data.names);
    //add options to button
    d3.select("#selDataset")
        .selectAll("option")
        .data(data)
        .enter()
        .append("option")
        .attr("value", function(option) {return option.names; })
        .text(function(option) {return option.names;})

    // Submit Button handler
    // function handleSubmit() {
    //     // Prevent the page from refreshing
    //     d3.event.preventDefault();
    //     // Select the input value from the form
    //     var name = d3.select("selDataset").property("value");
    //     console.log(name);
    //     //build plot
    //     buildplot(name);
    // };


});