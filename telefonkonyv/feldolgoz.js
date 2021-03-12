$(function(){
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adBeir);
    $("article").delegate(".torol", "click", adTorol);
    $("article").delegate(".szerkeszt", "click", adatModosit);
    $("#megse").on("click", adatMegse);
    $("#modosit").on("click", adatModositas);
    //majd ha lesz töröl gombunk
    
});

function adatMegse(){
    $(".szerkesztes").addClass("elrejt");
}
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
        var id=telefonkonyvem[i].ID;
        
        var elem="<div> <h2>"+nev+"</h2> <p>"+tel+"</p> <p>"+kep+"</p> <button class='torol' id='"+id+"'>Töröl</button>\n\
<button class='szerkeszt' id='"+i+"'>Szerkeszt</button></div>";
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
function adTorol() {
    var aktElem = $(this).closest("div");
    console.log("törlés");
    var id = $(this).attr("id");
    $.ajax({
        type: "DELETE",
        url: "torles.php?ID=" + id,
        success: function () {
            aktElem.remove();
        },
        error: function () {
            alert("Hiba az adatok törlésekor!");
        }
    });
    
}
function adatModosit(){
       console.log("Modosit");
       $(".szerkesztes").removeClass("elrejt");
       var index=$(this).attr("id");
       console.log(index);
       
       $("#id2").val(telefonkonyvem[index].ID);
       $("#nev2").val(telefonkonyvem[index].nev);
       $("#tel2").val(telefonkonyvem[index].tel);
       $("#kep2").val(telefonkonyvem[index].kep);
        
    }
    function adatModositas(){
    var editSzemely = {
        ID: $("#id2").val(),
        nev: $("#nev2").val(),
        tel: $("#tel2").val(),
        kep: $("#kep2").val()
    };
    console.log("Modosít");
    console.log(editSzemely);
        $.ajax({
        type: "PUT",
        url: "modosit.php",
        data: editSzemely,
        success: function(){
            beolvas();
        },
        error: function(){
            alert("Hiba az adatok módosításkor!");
        }
    });
    }
