$(function () {
	var menu = $("#menu"),
		carousel = $("#carousel"),
		carInner = carousel.find(".carousel-inner"),
		count = 0;

	addGalleries(galleryData, menu);

	function addGalleries(galleries, conainer) {
		var menu = $("<div class='gallery'/>").appendTo(conainer);
		for (i in galleries) {
			var gallery = galleries[i];
			if (gallery.galleries) {
				var elem = $("<div />").appendTo(menu);
				elem.addClass("btn-group btn-group-vertical");
				$("<h2>" + gallery.title + "</h2>").addClass("divider").appendTo(elem);
				addGalleries(gallery.galleries, elem);
			}
			if (gallery.photos) {
				var elem = $("<a class='btn btn-gallery'>" + gallery.title + "</a>").appendTo(menu);
				elem.attr("href", "#g" + count);
				addPhotos(gallery.photos, "g" + count);
				count++;
			}
		}
	}

	function addPhotos(photos, id) {
		for (i in photos) {
			var photo = photos[i];
			var img = $("<div />").appendTo(carInner);
			if (i == 0) {
				img.attr("id", id); // first image in given list will be referenced
			}
			img.addClass("item");
			
			img.append($("<img>").prop("src", photo).wrap("<div class='v-align'/>").parent().wrap("<div class='v-align-wrap'/>").parent());
		}
	}
	$(document.body).delegate('.btn.btn-gallery', 'click', function () {
		$(".active").removeClass("active"); // deactive preceding active element
		$($(this).attr("href")).addClass("active");
		carousel.carousel({
			interval: false
		}).slideDown();
	});
	$(document.body).delegate('.close', 'click', function () {
		carousel.slideUp();
	});
});