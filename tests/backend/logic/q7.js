

function testing(marks, attendance) {

    let pass = true;

    if (marks >= 40) {
        pass = true;
    }
    if (attendance < 75) {

        pass = false
    }

    return pass




}

module.exports = { testing }



/*Best logical combinations:
pass marks + low attendance
fail marks + good attendance
exact 40
exact 75*/
