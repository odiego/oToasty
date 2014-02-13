/**
 * Copyright (C) 2006 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * oToasty - jQuery oToasty Plugin v1.0.0
 * See (https://github.com/odiego/oToasty)
 * 
 * @author - Diego de Souza Nunes
 * @email - odiego@terra.com.br
 * 
 * See the Github oToasty project (https://github.com/odiego/oToasty) for full details.
 * This plugin is just a fun and awesome script for Big Dan of Mortal Kombat's "Toasty" using Konami Code.
 * @memberOf jQuery.fn
 */
(function($){
	// To call the function, just use: $.oToasty();
	$.extend({
		oToasty: function (soundType) {
			// Global Variables
			var body = $('body');
			var notificationObj = $('#toasy-container');
			var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right b a
			var konami_index = 0;

			if(!notificationObj || notificationObj.length <= 0){
				createToastyContainer(soundType);
			}
			
			function setSoundType(soundType){	
				var sound = "toasty.mp3";
				
				if(soundType && soundType == "deception")
					sound = "toasty_deception.mp3";
				
				return sound;			
			}

			function showToasty(soundType){
				// Plays the toasty <audio> sound
				document.getElementById('toastyAudio').play();
				// Shows up Dan and then hides him again
				var notificationObj = $('#toasy-container');
				notificationObj.animate({"bottom" : "0","right" : "0"}, 300,
					function() { 	
						notificationObj.delay(1000).animate({"bottom" : "-300px", "right" : "-300px"}, 300)
					}
				);
				return false;
			};

			function createToastyContainer(soundType){				
				var toastyHtml = '';
				toastyHtml += '<div id="toasy-container"';
					toastyHtml += 'style="position: fixed; z-index: 999; bottom: -300px; right: -300px; display: block;';
					toastyHtml += '">';
					toastyHtml += '<img id="toastyImage" src="images/dan.png" />';
					toastyHtml += '<audio id="toastyAudio" preload="auto"><source src="audio/'+ setSoundType(soundType) +'" /></audio>';
				toastyHtml += '</div>';
				body.append(toastyHtml);
			};
			
			// Call to show the toasty if the code is right ;D
			window.addEventListener("keydown", function(e){
				if (e.keyCode === konami[konami_index])
				{
					konami_index++; // valid key at the valid point
					if (konami_index == 10)
					{
						showToasty(soundType);
						konami_index = 0;
					}
				} else {
					konami_index = 0; // incorrect code restart
				}
		   });
		}
	});
})(jQuery);

// First we ensure that jQuery is loaded, then call $.oToasty()
if (typeof jQuery === 'undefined')
{
	var j = document.createElement('script');
	j.type = 'text/javascript';
	j.src = 'vendor/jquery-1.11.0.min.js';
	j.onload = $.oToasty();
	document.getElementsByTagName('head')[0].appendChild(j);
}
else
{
	$.oToasty();
}