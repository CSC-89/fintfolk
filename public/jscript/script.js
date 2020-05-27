

$(document).ready(function() {
    $("#popup").fadeIn(2500)
});


function clicked(toExpand) {
	
	var expand = toExpand.currentTarget.parentNode.parentNode.childNodes[3]
	var linkBox = toExpand.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[3]
	
	$(expand).slideToggle()
	$(expand).css("display", "block")
	
	// setInterval(function() {
				
	// }, 700)

	$(linkBox).fadeToggle(1500)
	
	console.log(linkBox)
}


function closePopup(toClose) {
	var popupselect = toClose.currentTarget.parentNode.parentNode.parentNode
	console.log(popupselect)
	$(popupselect).fadeOut(1000)

}

4

$(".clickable").on("click", function(toExpand) {
    clicked(toExpand)
})


$(".clickClose").on("click", function(toClose) {
    closePopup(toClose)
})



