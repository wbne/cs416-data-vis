let slideIndex = 0;

let slide1 = `Welcome to this CS416 Narrative Visualization Project!
</br><b>Warning!</b> The demo is best experienced in 1080p!!`;

let slide2 = `While many people know of the importance of sleep quality, factors that contribute to that refreshing night of rest might not be at the top of your head.
One of the most intuitive factors is how long you sleep, as shown here.`;

let slide3 = `Something that's less intuitive is the minimal impact of physical activity.
Here we can see a lack of correlation (both positive and negative) between the two.
Feel free to look at "Daily Steps" to see another example of this observation.`;

let slide4 = `Of course stress is a crucial factor in deciding sleep quality.
Many people have definitely tosssed and turned while being worried about a test or big day.
Even disregarding sleep quality (which you shouldn't), constant stress can be a huge problem that you should address!`;

let slide5 = `Feel free to explore the other parameters and hover over the data points to see how common each coordinate pair is!
To change the parameter, go to the left hand side, click on one of the radio buttons, and then click the "Plot Graph" button!
</br>
<i>If you are interested in the original dataset then it's linked in the bottom left corner.</i>`;

let slides = [slide1, slide2, slide3, slide4, slide5];

window.onload = (event) => { 
    decrementSlide();
}

function incrementSlide() {
    slideIndex = Math.min(slideIndex + 1, slides.length - 1);
    updateSlide();
}

function decrementSlide() {
    slideIndex = Math.max(0, slideIndex - 1);
    updateSlide();
}

function updateSlide() {
    const textBody = document.getElementById("textBody");
    const radios = document.querySelectorAll("input");
    textBody.innerHTML = slides[slideIndex];

    switch(slideIndex) {
        case 1:
            radios[0].click();
            dotplot();
            annotation1();
        break;
        case 2:
            radios[1].click();
            dotplot();
            annotation2();
        break;
        case 3:
            radios[2].click();
            dotplot();
            annotation3();
        break;
        default: // Either the first or last slide
            if(svg) {
                resetSVG();
            }
        break;
    }
}

function annotation1() {
    const type = d3.annotationLabel

    const annotations = [{
    note: {
        label: "It seems like sleeping 7.2 hours is not only common but a pretty good idea!",
        bgPadding: 20,
        title: "Take Notes!"
    },
        x: 610,
        y: 210,
        className: "show-bg",
        dy: 150,
        dx: 100
    }]

    const x = d3.scaleLinear().range([0, graphWidth])
    const y = d3.scaleLinear().range([graphHeight, 0])

    const makeAnnotations = d3.annotation()
    .notePadding(15)
    .type(type)
    .annotations(annotations)

    d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
}

function annotation2() {
    const type = d3.annotationLabel

    const annotations = [{
        note: {
            label: "Others can be active and still sleep well!",
            bgPadding: 20,
            title: "Meanwhile..."
        },
        x: 1060,
        y: 210,
        className: "show-bg",
        dy: 150,
        dx: -100
    },
    {
        note: {
            label: "These people can get good sleep after some rest!",
            bgPadding: 20,
            title: "Maybe rest is key!"
        },
        x: 130,
        y: 132,
        className: "show-bg",
        dy: 120,
        dx: 100
    }
    ]

    const x = d3.scaleLinear().range([0, graphWidth])
    const y = d3.scaleLinear().range([graphHeight, 0])

    const makeAnnotations = d3.annotation()
    .notePadding(15)
    .type(type)
    .annotations(annotations)

    d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
}

function annotation3() {
    const type = d3.annotationLabel

    const annotations = [
    {
        note: {
            label: "The responses form a very solid and consistent trend that stress is bad for sleep.",
            bgPadding: 20,
            title: "What a Correlation!"
        },
        x: 540,
        y: 220,
        className: "show-bg",
        dy: 160,
        dx: -100
    }, 
    {
        x: 260,
        y: 140,
        className: "show-bg",
        dy: 240,
        dx: 160
    }, 
    {
        x: 940,
        y: 390,
        className: "show-bg",
        dy: 10,
        dx: -450
    }, 
    ]

    const x = d3.scaleLinear().range([0, graphWidth])
    const y = d3.scaleLinear().range([graphHeight, 0])

    const makeAnnotations = d3.annotation()
    .notePadding(15)
    .type(type)
    .annotations(annotations)

    d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)
}