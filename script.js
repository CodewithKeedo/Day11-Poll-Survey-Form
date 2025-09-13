document.addEventListener("DOMContentLoaded", ()=> {
    const form = document.getElementById("surveyForm");

    //Get values
    const successMsg = document.getElementById('successMsg');
    const radios = document.getElementsByName('internet');
    const checkboxes = document.getElementsByName('device');

    //Get errors
    const errRadio = document.getElementById('err-radio');
    const errCheckbox = document.getElementById('err-checkbox');

    //Helpers
    function validateRadio(){
        const radioChecked = Array.from(radios).some(radios => radios.checked);
        errRadio.classList.toggle('active', !radioChecked);
        return radioChecked;
    }

    function validateCheckbox(){
        const checkboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        errCheckbox.classList.toggle('active', !checkboxChecked);
        return checkboxChecked;
    }

    //Live validation: hide error immediately when corrected
    radios.forEach(radio => radio.addEventListener('change', validateRadio));
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', validateCheckbox));

    //On submit
    form.addEventListener('submit', e => {
        e.preventDefault();

        const validRadio = validateRadio();
        const validCheckbox = validateCheckbox();

        if(validRadio && validCheckbox){
            const selectedRadio = Array.from(radios).find(r => r.checked).value;
            const selectedCheckboxes = Array.from(checkboxes)
            .filter(c => c.checked)
            .map(c => c.value)
            .join(', ');


            //Success message interpolation
            successMsg.innerHTML = `✅Thank you! You use the internet <strong> ${selectedRadio} </strong> and your devices are: <strong>${selectedCheckboxes}</strong>. `;
            successMsg.classList.add('active');
            form.reset(); //Reset fields
        }else{
            successMsg.classList.remove('active');
        }
    })
});
    