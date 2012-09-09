$(function () {
	var menu = $("#menu"),
		carousel = $("#carousel"),
		carInner = carousel.find(".carousel-inner"),
        title = $("#carousel-title"),
        to,
		count = 0;

    for(var cat in data) {
        $("#" + cat).after(makeGallery(data[cat]));
    }

	function makeGallery(galleries) {
		var menu = $("<div class='content btn-group btn-group-vertical'/>");
		for (i in galleries) {
			var gallery = galleries[i];

			if (gallery.artworks) {
				var elem = $("<a class='btn btn-gallery'>" + gallery.title + "</a>").appendTo(menu);
				elem.attr("href", "#g" + count);
				addArtworks(gallery.artworks, "g" + count, gallery.title);
				count++;
			}
		}
        return menu;
	}

	function addArtworks(artworks, id, title) {
		for (i in artworks) {
			var artwork = artworks[i];
			var item = $("<div class='item' title='" + title + "' />").appendTo(carInner);
			if (i == 0) {
				item.attr("id", id); // first image in given list will be referenced
			}
			
			$("<img src='" + artwork + "'>")
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
    $("#main").scrollspy('refresh');
});
