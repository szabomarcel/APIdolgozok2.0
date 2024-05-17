const apiurl = "http://localhost/APIdolgozok2.0/backend/index.php?dolgozok";
const createButton = document.getElementById("create");
document.addEventListener("DOMContentLoaded", function(){
    async function getDolgozok(){
        response = await fetch(apiurl);
        data = await response.json();
        console.log(data);
        showdolgozok(data);
    }

    function showdolgozok(data){
        let dolgozokHtml = "";
        for(let dolgozo of data){
            dolgozokHtml += `<div class="card col-lg-3 col-md-4 col-sm-6 m-1">
            <div class="card-body">
            <h5 class="card-title">${dolgozo.dolgozoid}</h5>
            <p class="card-text">név: ${dolgozo.nev}</p>
            <p class="card-text">neme: ${dolgozo.neme}</p>
            <p class="card-text">részleg: ${dolgozo.reszleg}</p>
            <p class="card-text">belépésév: ${dolgozo.belepesev}</p>
            <p class="card-text">bér: ${dolgozo.ber}</p>
            </div></div>`;
        } 
        document.getElementById("dolgozok").innerHTML=dolgozokHtml;
    }

    getDolgozok();

    createButton.addEventListener("click", async function () {
        const form = document.getElementById("dolgozoForm");
        const formData = new FormData(form);

        const options = {
            method: "POST",
            mode: "cors",
            body: formData
        };

        try {
            let response = await fetch("http://localhost/APIdolgozok2.0/backend/index.php?dolgozo", options);
            if (response.ok) {
                console.log("Sikeres feltöltés");
                form.reset(); // Clear the form after successful submission
                getDolgozok(); // Refresh the list of employees
            } else {
                console.error("Sikertelen feltöltés");
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
        getDolgozok();
    });
});