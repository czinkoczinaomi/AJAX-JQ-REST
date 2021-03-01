$(function(){
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adBeir);
    
});

function kiir(){
//    var nev=$("#nev").val();
//    var tel=$("#tel").val();
//    var kep=$("#kep").val();
//    
$("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var nev=telefonkonyvem[i].nev;
        var tel=telefonkonyvem[i].tel;
        var kep=telefonkonyvem[i].kep;
        
        var elem="<div> <h2>"+nev+"</h2> <p>"+tel+"</p> <p>"+kep+"</p> <button class='torol'>Töröl</button></div>";
         $("article").append(elem);
    }
    
   
    
}
function beolvas(){
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function(result){
            console.log(result);
            telefonkonyvem=JSON.parse(result);
            console.log(telefonkonyvem);
            kiir();
        },
        error: function(){
            alert("Hiba az adatok betöltésekor!");
        }
    });
    
}
function adBeir(){
   // kiolvassuk a formból az adatokat
   var szemely={
     nev: $("#nev").val(),
     tel: $("#tel").val(),
    kep: $("#kep").val()
};
   //elküldjük a phpnek az adatokat
   $.ajax({
        type: "POST",
        url: "beir.php",
        data: szemely,
        success: function(ujSzemely){
            console.log(ujSzemely);
            telefonkonyvem.push(JSON.parse(ujSzemely));
            console.log(telefonkonyvem);
            kiir();
        },
        error: function(){
            alert("Hiba az adatok metésekor!");
        }
    });
   //űrlap adatait a képernyőre is kiírjuk
}
