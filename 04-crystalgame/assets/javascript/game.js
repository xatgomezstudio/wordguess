$(document).ready(function () {

    var fundsNumber = 0;
    var debtNumber = 0;

    function debtNumber() {
        return  Math.floor(Math.random() * 120000) + 19000;
    }

    function buttonNumber() {
        return Math.floor(Math.random() * 1200) + 100; 
    }

    function gameOn() {
        fundsNumber = 0;
        debtNumber = debtNumber();
        buttonNumber = buttonNumber();

        $("#funds-area").text("$ " + fundsNumber);
        $("#debt-area").text("-$ " + debtNumber);

        console.log("Debt: -$ " + debtNumber);
        console.log("Debt: $ " + fundsNumber);
    }
    gameOn();

    $(".funds").on("click", function () {

        var buttonValue = ($(this).attr("data-income"));
        buttonValue = parseInt(buttonValue);

        fundsNumber += buttonValue

        if (fundsNumber === debtNumber) {
            alert("Winner winner, chicken dinner!");
        }
        else if (fundsNumber > debtNumber) {
            alert("You snooze, you lose!");
        }
    })

    $(".start-button").on("click", function () {
        gameOn();
    })

})

