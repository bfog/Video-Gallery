$(function(){
    $('#myModal').modal({
        show: false
    }).on('hidden.bs.modal', function(){
        $(this).find('firstVid')[0].pause();
    });
});
