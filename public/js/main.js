document.querySelector('#butt1').addEventListener('click' , ()=>{
    const txt1 = document.getElementById("txt1").value;
    //  get request to /hash endpoint


    fetch(`/hash/${txt1}/`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        if(data.success == true){
            document.getElementById("prob").innerText = '';
            document.getElementById("hash1").innerText = data.text;
            document.getElementById("time1").innerText = `${data.timeRefer} ms , Source : (${data.source})`;
        }else{
            document.getElementById("prob").innerText = data.text;
        }
    })
})