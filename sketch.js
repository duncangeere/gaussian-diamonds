// A4
var r = new Rune({
    container: "body",
    width: 1123,
    height: 794,
    debug: true
});

function graphic() {

    // This creates a bunch of equally spaced rectangles of different sizes in a gaussian distribution.
    // The spacing is accomplished with a circle-packing approach that's fast and easy.

    // User constants
    const attempts = 50000; // number of attempts
    const margin = 20; // pixel margin
    const radMin = 5; // min circle radius
    const radMax = 15; // max circle radius
    const spacing = -1; // min space between circles

    // Calculated constants
    const _width = r.width - (radMax * 2);
    const _height = r.height - (radMax * 2);

    // Empty array to keep circles in
    const circles = [];

    // Create a group to hold the circles
    const black = r.group(r.width/2, r.height/2);
    const pink = r.group(r.width/2, r.height/2);

    // Loop over the number of attempts
    for (let i = 0; i < attempts; i++) {

        // Define a circle with random position and radius
        const circle = {
            pos: new Rune.Vector(Math.floor((randomGaussian() - 0.5) * _height), Math.floor((randomGaussian() - 0.5) * _height)),
            rad: Math.floor(Rune.random(radMin, radMax)),
        }

        // Set a variable to check if it's overlapping or not
        let notOverlapping = true;

        // Loop through all of the other circles
        for (let j = 0; j < circles.length; j++) {

            // For each circle in turn
            const other = circles[j];

            // Calculate the distance between the new circle and each other circle
            const d = other.pos.distance(circle.pos);
            const radSum = circle.rad + other.rad + spacing;

            // If they're overlapping
            if (d < radSum) {

                // Log that
                notOverlapping = false;
                break; // then break out of the loop
            }
        }

        // If they're still not overlapping after looping through them all
        if (notOverlapping) {

            // Add the circle to the array
            circles.push(circle);
        }
    }

    // Loop over all the circles in the array
    for (let i = 0; i < circles.length; i++) {

        // Draw an square in each - either black or pink
        if (Math.random() < 0.95) {
            r.rect(circles[i].pos.x - circles[i].rad/2, circles[i].pos.y - circles[i].rad, circles[i].rad, circles[i].rad, black).fill("none");
        } else {
            r.rect(circles[i].pos.x - circles[i].rad/2, circles[i].pos.y - circles[i].rad, circles[i].rad, circles[i].rad, pink).fill("pink").stroke("none");
        }
        

    }

    // Rotate the squares to turn them into diamonds
    black.rotate(45, r.width/2, r.height/2)
    pink.rotate(45, r.width/2, r.height/2)

}

// Draw it 
graphic();
r.draw();