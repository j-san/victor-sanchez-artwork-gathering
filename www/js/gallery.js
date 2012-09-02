$(function () {
	var menu = $("#menu"),
		carousel = $("#carousel"),
		carInner = carousel.find(".carousel-inner"),
        title = $("#carousel-title"),
        to,
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
				addPhotos(gallery.photos, "g" + count, gallery.title);
				count++;
			}
		}
	}

	function addPhotos(photos, id, title) {
		for (i in photos) {
			var photo = photos[i];
			var item = $("<div class='item' title='" + title + "' />").appendTo(carInner);
			if (i == 0) {
				item.attr("id", id); // first image in given list will be referenced
			}
			
			$("<img src='" + photo + "'>")
                .wrap("<div class='v-align'/>").parent()
                .wrap("<div class='v-align-wrap'/>").parent()
                .appendTo(item);
		}
	}
    carousel.on("slid", function () {
        var newTitle = carousel.find(".active").prop("title");
        if (newTitle !== title.text()) {
            title.text(newTitle).fadeIn();
            clearTimeout(to);
            to = setTimeout(function () {
                title.fadeOut();
            }, 3000);
        }
    });
	$(document.body).delegate('.btn.btn-gallery', 'click', function () {
		$(".active").removeClass("active"); // deactive preceding active element
		$($(this).attr("href")).addClass("active");
        carousel.trigger("slid");
		carousel.carousel({
			interval: false
		}).slideDown();
	});
	$(document.body).delegate('.close', 'click', function () {
		carousel.slideUp();
	});
});
