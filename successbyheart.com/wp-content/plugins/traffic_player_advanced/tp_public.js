var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}

if (typeof(jQueryScriptOutputted) == 'undefined') {
    var jQueryScriptOutputted = false;
}

if (typeof(jInitPopup) == 'undefined') {
    var jInitPopup = [];
}


function initJQuery() {
    if (typeof(jQuery) == 'undefined') {
        if (! jQueryScriptOutputted) {
            jQueryScriptOutputted = true;
            document.write("<scr" + "ipt type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js\"></scr" + "ipt>");
        }

        setTimeout("initJQuery()", 500);
    } else {    

            jQuery(document).ready(function () {
                jQuery.fn.alignCenter = function() {
                    var marginLeft = Math.max(0, parseInt(parseInt(jQuery(window).width())/2 - parseInt(jQuery(this).width())/2)-10) + 'px';
                    var marginTop = Math.max(0, parseInt(parseInt(jQuery(window).height())/2 - parseInt(jQuery(this).height())/2)-10) + 'px';
                    jQuery(this).css({'position':'fixed','left':0,'margin-left':marginLeft, 'top':marginTop});

                };



                jQuery('.popup_preview_text').click(function(){
                    if (typeof(jInitPopup[this.id]) == 'undefined') {
                        jInitPopup[this.id]=true;
                        jQuery('.the_popup_video:first').html(jQuery('.the_popup_video:first').html()+jQuery('.popup_layout .'+this.id).html());
                        make_show();
                        var h = jQuery(window).scrollTop();

                        jQuery('body').animate({scrollTop:h-1},1500);

                    }
                    return false;
                });


                jQuery('.popup_preview_slideshow').click(function(){
                    if (typeof(jInitPopup[this.id]) == 'undefined') {
                        jInitPopup[this.id]=true;
                        jQuery('.the_popup_video:first').html(jQuery('.the_popup_video:first').html()+jQuery('.popup_layout .'+this.id).html());
                    }
                    make_show();
					
                    return false;
                });


                jQuery(window).scroll(function () { 
                    jQuery('.the_popup_video:first').alignCenter();
                });
                jQuery(window).resize(function () { 
                    jQuery('.the_popup_video:first').alignCenter();
                });
            });


    }
}

initJQuery();


    
    var max_slide = 3;
    var current_slide = 1;
    
    function nextslide() {
        if (current_slide==max_slide){
            jQuery('.popup_preview_slideshow img').css('margin-left', '0');
            current_slide = 1;
        }
        jQuery('.tp_slider_img_'+current_slide).animate({'margin-left': '-120px'}, 2000, function() {
            setTimeout(nextslide,3000);current_slide = current_slide+1;
        });
    }
    setTimeout(nextslide,1000);
    
    function make_show(){

        jQuery('.the_popup_layout:first').show();
                
        var check_js = jQuery('.the_popup_video:first .coded_container').html();
        if(check_js==null){
            jQuery('.the_popup_video:first .coded_container').html(check_js);
        }else{
            if(check_js.indexOf('>')==-1){
                jQuery('.the_popup_video:first .coded_container').html(Base64.decode(check_js));
            }else{
                jQuery('.the_popup_video:first .coded_container').html(check_js);
            }
        }
        var close_type              = jQuery('.the_popup_video:first .coded_container #close_type').val();
        var close_redirect_enabled  = jQuery('.the_popup_video:first .coded_container #close_redirect_enabled').val();
        
        var in_popup_html ='';
        
        if(jQuery('.the_popup_video:first .coded_container #in_popup_html').val()!=undefined){
            in_popup_html = '<div class="popup_text_container">'+jQuery('.the_popup_video:first .coded_container #in_popup_html').val()+"</div>";
        }
        var in_popup_html_mode      = jQuery('.the_popup_video:first .coded_container #in_popup_html_mode').val();
        
        var copy_href = jQuery('.the_popup_video:first .coded_container #copy_href').val();
        if(copy_href != ''){
            jQuery('.copyright').show();
        }
        
        

        if(in_popup_html_mode=='top'){
            jQuery('.the_popup_video:first .tp_video').before(in_popup_html);

        }else{
            if (in_popup_html_mode == 'bottom'){
                jQuery('.the_popup_video:first .tp_video').after(in_popup_html);

            }
        }
        
        jQuery('.copyright').click(function(){
            window.location.href = copy_href;
        });
        

        
        if(close_type == 'img'){
            jQuery('.the_popup_video:first .the_popup_close').addClass('img');
        }else{
            jQuery('.the_popup_video:first .the_popup_close').removeClass('img');
        }

        
        


        jQuery('.the_popup_video:first').show();
        if (jQuery('.the_popup_video:first .tp_video').css('width')!='auto'){
            jQuery('.the_popup_video:first').css({'width':parseInt(jQuery('.the_popup_video:first .tp_video').css('width'))});
        }

        if (jQuery('.the_popup_video:first .tp_video').css('height')!='auto'){
            //jQuery('.the_popup_video:first').css({'height':parseInt(jQuery('.the_popup_video:first .tp_video').css('height'))+20+parseInt(jQuery('.the_popup_video:first .popup_text_container').height())});
        } 
        
        jQuery('.the_popup_video:first').removeClass('standard');
        jQuery('.the_popup_video:first').removeClass('strong');
        jQuery('.the_popup_video:first').removeClass('no_skin');

        jQuery('.the_popup_video:first').addClass('standard');
        if (jQuery('.the_popup_video:first .tp_video').hasClass('strong')){
            jQuery('.the_popup_video:first').removeClass('standard');
            jQuery('.the_popup_video:first').addClass('strong');
        }
        if (jQuery('.the_popup_video:first tp_video').hasClass('no_skin')){
            jQuery('.the_popup_video:first').removeClass('standard');
            jQuery('.the_popup_video:first').addClass('no_skin');
        }
        
        
        
        jQuery('.the_popup_video:first').alignCenter();
        
        
    }
    
    function close_popup(){
        jQuery('.the_popup_video:first').hide();
        jQuery('.the_popup_video:first').html("<div class='the_popup_close' onclick='close_popup();'>Close</div>");
        jQuery('.the_popup_layout:first').html('');
        jQuery('.the_popup_layout:first').hide();
        jInitPopup = [];
    }