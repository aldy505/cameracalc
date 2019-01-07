$(document).ready(function () {

	// JavaScript Document
	$("#firstpage").hide();
	$("#secondpage").hide();
	$("#goback").hide();
	$("#thirdpage").hide();
	$("#btn1").click(function () {
		$("#homepage").hide();
		$("#secondpage").hide();
		$("#firstpage").show();
		$("#thirdpage").hide();
		$("#goback").show();
	});

	$("#btn2").click(function () {
		$("#homepage").hide();
		$("#secondpage").show();
		$("#firstpage").hide();
		$("#thirdpage").hide();
		$("#goback").show();
	});
	$("#btn3").click(function () {
		$("#homepage").hide();
		$("#secondpage").hide();
		$("#firstpage").hide();
		$("#thirdpage").show();
		$("#goback").show();
	});
	$("#homebtn").click(function () {
		$("#homepage").show();
		$("#secondpage").hide();
		$("#firstpage").hide();
		$("#thirdpage").hide();
		$("#goback").hide();
	});

	//var iso = [25,50,100,200,400,800,1600,3200,6400,12800];
	//var apeture = [0.7,1,1.4,2,2.8,4,5.6,8,11,16,22,32,45,64];
	var fps1 = {
		24: '24',
		48: '48',
		72: '72',
		96: '96'
	};
	var fps2 = {
		25: '25',
		50: '50',
		75: '75',
		100: '100'
	};
	var fps3 = {
		30: '30',
		60: '60',
		90: '90',
		120: '120'
	};
	//		  24   25    30
	var m = [0.009696, 0.0099, 0.01086];

	// sensor size
	var Camera =
		"IMAX 70 mm Film,Medium Format,Vision Research Phantom 65,Alexa 65,65mm Film Frame,Red Monstro VV 8K,Sony Venice,Sony ?7S II,Red GEMINI 5K S35,Alexa LF,Red Helium 8K S35,Vision Research Phantom Flex4K,Alexa SXT W,Blackmagic URSA Mini 4.6K EF,Blackmagic URSA Mini Pro,Canon C100,Canon C200,Canon C300,Canon C500,Red DRAGON-X 5K S35,Arri Alexa Mini,Arri Amira,Sony ?6500,35mm Film Frame,Blackmagic Pocket Cinema Camera 4K,Panasonic GH5s,Digital Bolex D16,Super 16mm Film Frame,Blackmagic Micro Cinema Camera,16mm Film Frame,GoPro HERO 5 Black,GoPro HERO 7 Black,GoPro HERO4 Black,Super 8mm Film Frame,8mm Film Frame";
	var SensorWidth =
		"70.41,53.7,52.1,54.12,52.48,40.96,36,35.6,30.72,36.7,29.9,27.6,28.25,25.34,25.34,24.6,26.2,26.2,26.2,25.6,28.25,28.25,23.5,22,18.96,17.3,12.52,12.52,12.48,10.26,6.17,6.17,6.17,5.79,4.8";
	var SensorHeight =
		"52.63,40.2,30.5,25.59,23.01,21.6,24,23.8,18,25.54,15.77,15.5,18.17,14.25,14.25,13.8,13.8,13.8,13.8,13.5,18.17,18.17,15.6,16,10,13,7.41,7.41,7.02,7.49,3.47,4.63,4.55,4.01,3.5";
	var SensorDiagonal =
		"87.91,67.08,0,0,57.3,46.31,0,0,35.61,44.71,33.8,0,33.59,0,0,28.2,29.6,29.6,29.6,28.9,33.59,33.59,0,27.2,0,0,0,14.54,0,12.7,0,0,0,7.04,5.94";
	var AspectRatio =
		"1.337830135,1.335820896,1.708196721,2.114888628,2.280747501,1.896296296,1.5,1.495798319,1.706666667,1.436961629,1.896005073,1.780645161,1.554760594,1.778245614,1.778245614,1.782608696,1.898550725,1.898550725,1.898550725,1.896296296,1.554760594,1.554760594,1.506410256,1.375,1.896,1.330769231,1.689608637,1.689608637,1.777777778,1.369826435,1.778097983,1.332613391,1.356043956,1.443890274,1.371428571";
	var CropFactor =
		"0.51129101,0.670391061,0.690978887,0.791382721,0.880195599,0.9375,1,1.011235955,1.125,1.136363636,1.284338209,1.304347826,1.377199694,1.420678769,1.420678769,1.463414634,1.467391304,1.467391304,1.467391304,1.5,1.515151515,1.515151515,1.531914894,1.636363636,2.025,2.080924855,2.733485194,2.875399361,2.884615385,3.50877193,5.834683955,5.834683955,5.834683955,6.21761658,7.5";
	Camera = Camera.split(',');
	SensorDiagonal = SensorDiagonal.split(',');
	SensorWidth = SensorWidth.split(',');
	SensorHeight = SensorHeight.split(',');
	AspectRatio = AspectRatio.split(',');
	CropFactor = CropFactor.split(',');
	var k, ke = "";
	for (k = 0; k < 35; k++) {
		ke = ke + "<option>" + Camera[k] + "</option>";
	}
	$("#inp4cam").html(ke);

	function cari() {
		var cahaya = 0,
			hasil = "",
			fpss;
		var xiso = parseInt($("#isoo").val());
		//var xapeture = parseInt($("#apeture").val(););
		var xfps = $("#fps").val();
		var xfc = $("#fc").val();
		var xlux = $("#lux").val();


		if (xlux == "" && xfc == "") {
			hasil = "isi dulu fc nya";
		} else {
			cahaya = (xlux !== "" && xfc == "") ? (parseInt(
					xlux) / 10.764) : (xlux == "" && xfc !==
					"") ? (parseInt(xfc)) : (xlux !== "" &&
					xfc !== "") ? parseInt(xfc) :
				"error line 42";
		}

		// if 400 iso f/4 in 24 fps needs 50 fc
		// we need to break down the most basic element: fps

		if (xfps in fps1) {
			fpss = 1;
			hasil = ((1 / (2 * xfps)) * cahaya * m[0] * xiso);
			hasil = parseFloat(Math.round(hasil * 100) / 100)
				.toFixed(2);
		} else if (xfps in fps2) {
			fpss = 2;
			hasil = ((1 / (2 * xfps)) * cahaya * m[1] * xiso);
			hasil = parseFloat(Math.round(hasil * 100) / 100)
				.toFixed(2);
		} else if (xfps in fps3) {
			fpss = 3;
			hasil = ((1 / (2 * xfps)) * cahaya * m[2] * xiso);
			hasil = parseFloat(Math.round(hasil * 100) / 100)
				.toFixed(2);
		} else {
			hasil = 'error dapet else';
		}
		$("#result").text("f/" + hasil.toString());
		$("#xiso").text(xiso.toString());
		$("#xfc").text(xfc + "/" + cahaya);
		$("#xlux").text(xlux + "/" + cahaya);
		$("#xfps").text($("#fps").val());
		$("#hasil").text(hasil.toString());
		$("#fpss").text(fpss);
	}

	function carib() {
		var fc = 0,
			fpssss, lux = 0;
		var yiso = parseInt($("#iso").val());
		var yaperture = parseInt($("#aperture").val());
		var yfps = $("#fpsss").val();

		if (yfps in fps1) {
			fpssss = 1;
			fc = (yaperture / ((1 / (2 * yfps)) * yiso * m[0]));
			lux = fc * 10.764;
		} else if (yfps in fps2) {
			fpssss = 2;
			fc = (yaperture / ((1 / (2 * yfps)) * yiso * m[1]));
			lux = fc * 10.764;
		} else if (yfps in fps3) {
			fpssss = 3;
			fc = (yaperture / ((1 / (2 * yfps)) * yiso * m[2]));
			lux = fc * 10.764;
		} else {
			fc = 'error dapet else';
		}

		fc = parseFloat(Math.round(fc * 100) / 100).toFixed(2);
		lux = parseFloat(Math.round(lux * 100) / 100).toFixed(
			3);

		$("#lights").text(fc + " fc / " + lux + " lux");
		$("#yiso").text(yiso);
		$("#yaperture").text(yaperture);
		$("#yfps").text(yfps);
		$("#fpssss").text(fpssss);
		$("#lampu").text(fc + "/" + lux);
	}

	function carid() {
		var focal = parseInt($("#inp4focal").val());
		var cam = $("#inp4cam").val();
		var ar = $("#inpt4ar").val();
		var id;
		for (k = 0; k < 35; k++) {
			if (cam == Camera[k]) {
				id = k;
			}
		}

		var hasil = focal * CropFactor[id];
		if (ar == "16:9") {
			hasil = hasil * 1;
		} else if (ar == "2.40:1") {
			hasil = hasil * (36 / 48.6);
		} else if (ar == "4:3") {
			hasil = hasil * (4 / 3);
		}
		hasil = parseFloat(Math.round(hasil * 100) / 100).toFixed(
			1);
		$("#inp4result").text(hasil);
		$("#sensize").text(SensorWidth[id] + " x " +
			SensorHeight[id] + " mm (" + SensorDiagonal[
				id] + " diagonally)");
		var asprat = parseFloat(Math.round(AspectRatio[id] *
			100) / 100).toFixed(2);
		$("#asprat").text(asprat);
	}

	$(".inp").change(function () {
		cari();
		console.log(hasil);
		console.log(fpss, xiso, xfps, xfc, xlux);
	});

	$(".inp2").change(function () {
		carib();
		console.log(lights);
		console.log(fpssss, yiso, yaperture, fc, lux);
	});
	$(".inp4").change(function () {
		carid();
	});


	// establishing data
	var LightName =
		"Aputure Amaran F7,Aputure LightStorm LS120d,Aputure LightStorm LS120d II,Aputure LightStorm LS300d,Aputure LightStorm Mini 20c (Flood),Aputure LightStorm Mini 20c (Spot),Aputure LightStorm Mini 20d (Flood),Aputure LightStorm Mini 20d (Spot),ARRI Compact 200 Daylight (Flood),ARRI Compact 200 Daylight (Spot),Arri Fresnel Tungsten 150 (FLOOD),Arri Fresnel Tungsten 150 (SPOT),Arri Fresnel Tungsten 300 Plus (FLOOD),Arri Fresnel Tungsten 300 Plus (SPOT),Arri Fresnel Tungsten 650 Plus (FLOOD),Arri Fresnel Tungsten 650 Plus (SPOT),Arri M18 (1200w 1 - SPOT),Arri M18 (1200w 2 - MIDDLE),Arri M18 (1200w 3 - FLOOD),Arri M18 (1800w 1 - SPOT),Arri M18 (1800w 2 - MIDDLE),Arri M18 (1800w 3 - FLOOD),Arri Skypanel S120-C,Arri Skypanel S30-C,Arri Skypanel S360-C,Arri Skypanel S60-C,Arri TrueBlue D12 (FLOOD),Arri TrueBlue D12 (SPOT),Arri TrueBlue D25 (FLOOD),Arri TrueBlue D25 (SPOT),Arri TrueBlue D40 (FLOOD),Arri TrueBlue D40 (SPOT),Arri TrueBlue D5 (FLOOD),Arri TrueBlue D5 (SPOT),Astera Pixel Tube,Astera Titan Tube,Dedo Felloni (High-Output),Dedo Felloni (Low-Profile),Dedo Felloni (Standard),Dedo Felloni Bicolor (High Output),Dedo Felloni Bicolor (Standard),Dedolight DLH4 (Flood),Dedolight DLH4 (Spot),Digital Sputnik DS1,Digital Sputnik DS3,Digital Sputnik DS6,DMG Lumiere maxiswitch,DMG Lumiere miniswitch,DMG Lumiere SL1 Switch,K5600 Jokerbug 400 (1 - SPOT),K5600 Jokerbug 400 (2 - MEDIUM),K5600 Jokerbug 400 (3 - WIDE),K5600 Jokerbug 400 (4 - SUPER WIDE),K5600 Jokerbug 400 (5 - FRESNEL FROST),K5600 Jokerbug 800 (1 - SPOT),K5600 Jokerbug 800 (2 - MEDIUM),K5600 Jokerbug 800 (3 - WIDE),K5600 Jokerbug 800 (4 - SUPER WIDE),K5600 Jokerbug 800 (5 - FRESNEL FROST),KinoFlo 2ft 4-Bank,KinoFlo 4ft 4-Bank,KinoFlo Celeb 450,KinoFlo Celeb 850,KinoFlo Diva-Lite 20,KinoFlo Diva-Lite 30,KinoFlo Select 20 / Freestyle 21,KinoFlo Select 30 / Freestyle 31,Litemat+ 1,Litemat+ 2,Litemat+ 2L,Litemat+ 3,Litemat+ 4,Litepanels Astra 3x Bi-Color,Litepanels Astra 6x Bi-Color,Litepanels Astra Soft,Litepanels Gemini,Litepanels Sola 12 (Flood),Litepanels Sola 12 (Spot),Litepanels Sola 4+ (Flood),Litepanels Sola 4+ (Spot),Litepanels Sola 6+ (Flood),Litepanels Sola 6+ (Spot),Litepanels Sola 6C (Flood),Litepanels Sola 6C (Spot),Litepanels Sola 9 (Flood),Litepanels Sola 9 (Spot),LiteTile+ 4,LiteTile+ 8,Mole Baby 1k,Mole Baby 1k,Mole Junior 2k (Spot),Mole Junior 2k (Flood),Mole Midget 200w (Spot),Mole Midget 200w (Flood),Mole Senior 5k (Spot),Mole Senior 5k (Flood),Mole Tener 10k (Spot),Mole Tener 10k (Flood),Quasar Q-LED X Crossfade 2ft ,Quasar Q-LED X Crossfade 4ft,Westcott Flex 1ft x 1ft ,Westcott Flex 1ft x 2ft ,Westcott Flex 1ft x 3ft ,Westcott Flex 2ft x 2ft ,Westcott Icelight 2";
	var Type =
		"LED,LED,LED,LED,LED,LED,LED,LED,HMI,HMI,Tungsten,Tungsten,Tungsten,Tungsten,Tungsten,Tungsten,HMI,HMI,HMI,HMI,HMI,HMI,LED,LED,LED,LED,HMI,HMI,HMI,HMI,HMI,HMI,HMI,HMI,LED,LED,LED,LED,LED,LED,LED,Tungsten,Tungsten,LED,LED,LED,LED,LED,LED,HMI,HMI,HMI,HMI,HMI,HMI,HMI,HMI,HMI,HMI,Fluorescent,Fluorescent,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,LED,Tungsten,Tungsten,Tungsten,Tungsten,Tungsten,Tungsten,Tungsten,Tungsten,Tungsten,Tungsten,LED,LED,LED,LED,LED,LED,LED";
	var Style =
		"Panel,Beam,Beam,Beam,Beam,Beam,Beam,Beam,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Open Face,Open Face,Open Face,Open Face,Open Face,Open Face,Soft Panel,Soft Panel,Soft Panel,Soft Panel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Tube,Tube,Panel,Panel,Panel,Panel,Panel,Fresnel,Fresnel,Beam,Beam,Beam,Soft Panel,Soft Panel,Soft Panel,PAR,PAR,PAR,PAR,PAR,PAR,PAR,PAR,PAR,PAR,Array,Array,Soft Panel,Soft Panel,Soft Panel,Soft Panel,Soft Panel,Soft Panel,Panel,Panel,Panel,Panel,Panel,Panel,Panel,Soft Panel,Soft Panel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Flex Panel,Flex Panel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Fresnel,Tube,Tube,Flex Panel,Flex Panel,Flex Panel,Flex Panel,Tube";
	var ColorTemp =
		"3200°-9500°,6000º,5500º,5500º,3200°-6500°,3200°-6500°,7500°,7500°,6000°,6000°,3200º,3200º,3200º,3200º,3200º,3200º,6000º,6000º,6000º,6000º,6000º,6000º,RGBW,RGBW,RGBW,RGBW,6000º,6000º,6000º,6000º,6000º,6000º,6000º,6000º,RGBW,RGBW,5600°,5600°,5600°,3200°-5600°,3200°-5600°,3400°,3400°,RGBW,RGBW,RGBW,3000º-5600º,3000º-5600º,3000º-5600º,5600º,5600º,5600º,5600º,5600º,5600º,5600º,5600º,5600º,5600º,2900º, 3200º, 5500º,2900º, 3200º, 5500º,RGBW,RGBW,RGBW,RGBW,RGBW,RGBW,2600º-6200º,2600º-6200º,2600º-6200º,2600º-6200º,2600º-6200º,3200º-5600º,3200º-5600º,3200º-5600º,RGBW,5500º,5500º,5500º,5500º,5500º,5500º,5500º,5500º,5500º,5500º,2600º-6200º,2600º-6200º,3200º,3200º,3200º,3200º,3200º,3200º,3200º,3200º,3200º,3200º,2000º-6000º,2000º-6000º,2800º-6000º,2800º-6000º,2800º-6000º,2800º-6000º,5500º";
	var BeamAngle =
		"45º,n/a,n/a,n/a,60º,20º,60º,20º,52°,8.5°,42°,14°,53°,14°,52°,12°,15º,38º,62º,16º,39º,63º,106º,106º,103º,106º,50°,7.5°,59°,6°,61°,6.5°,56°,6°,180°,125°,50°,30°,50°,50°,50°,48°,4.5°,20º,20º,20º,Variable (2 lights hinged),45º,45º,3º,26ºx11º,58xº19º,58º,44º,4º,25ºx13º,41ºx11º,44º,37º,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,112º,112º,112º,112º,112º,46º,46º,96º,93º,54°,15°,71°,15°,67°,16°,70°,16°,67°,15°,112º-360º,112º-360º,15º,58º,27º,55º,12º,58º,17º,61º,15º,63º,180º ?,180º ?,140º-360º,140º-360º,140º-360º,140º-360º,72.6º";
	var FCTungsten =
		"n/a,n/a,n/a,n/a,30,173,n/a,n/a,n/a,n/a,82,247,180,672,430,2110,n/a,n/a,n/a,n/a,n/a,n/a,488,221,2028,453,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,10,32,n/a,n/a,n/a,63,41,134,22,1336,4008,8016,620,88,184,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,44,128,236,444,104,112,104,112,85,161,163,213,256,301,528,95,389,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,244,456,6320,700,6000,1600,1060,110,23200,3800,48400,6400,13,28,104,197,n/a,n/a,n/a";
	var FCDaylight =
		"62,136,289,454,30,173,74,413,309,2597,n/a,n/a,n/a,n/a,n/a,n/a,27000,6500,2590,39200,8660,3440,448,216,1848,444,2890,24464,4905,64910,7780,79020,1195,13276,10,32,114,142,74,63,41,n/a,n/a,1336,4008,8016,672,84,176,61760,6080,1776,752,576,83760,12600,7244,2628,1552,44,128,236,444,104,112,104,112,85,161,163,213,256,345,588,109,389,760,5294,87,1128,234,2436,167,1454,604,3124,244,456,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,24,52,120,220,379,541,28";
	var Watts =
		"15w,135w,180w,300w,30w,30w,30w,30w,200w,200w,150w,150w,300w,300w,650w,650w,1200w,1200w,1200w,1800w,1800w,1800w,400w,200w,1500w,420w,1200w,1200w,2500w,2500w,4000w,4000w,575w,575w,28,48w,24w,24w,24w,24w,24w,150w,150w,140w,420w,840w,520w,85w,170w,400w,400w,400w,400w,400w,800w,800w,800w,800w,800w,160w,300w,255w,575w,123w,129w,123w,130w,50w,100w,100w,150w,200w,55w,105w,105w,350w,346w,346w,53w,53w,104w,104w,104w,104w,190w,190w,200w,400w,1000w,1000w,2000w,2000w,200w,200w,5000w,5000w,10000w,10000w,25w,50w,55w,100w,150w,200w,19w";
	var CRI =
		"95,96,96,95,96,96,96,96,95,95,100,100,100,100,100,100,95,95,95,95,95,95,94+,95+,95+,95+,95,95,97,97,97,97,97,97,88,95+,84,84,84,84,84,n/a,n/a,95,95,95,95,95,95,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,95,95,95,95,95,95,95,95,95+,95+,95+,95+,95+,95/D 98/T,95/D 98/T,95/D 98/T,97/D 99/T,89,89,95,95,95,95,95,95,n/a,n/a,95+,95+,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,95+,95+,95-98,95-98,95-98,95-98,97";
	var TLCI =
		"95,96,97,96,97,97,97,97,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,94+,95+,95+,95+,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,97,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,95+,95+,95+,95+,95+,95/D 98/T,95/D 98/T,95/D 98/T,97/D 99/T,89,89,95,95,95,95,95,95,n/a,n/a,95+,95+,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,97+,97+,97-98,97-98,97-98,97-98,97";
	var Voltage =
		"n/a,100-242,100-243,100-241,100-240,100-240,100-240,100-240,n/a,n/a,120-230,120-230,120-230,120-230,120-230,120-230,120-220 VAC,120-220 VAC,120-220 VAC,120-220 VAC,120-220 VAC,120-220 VAC,n/a,n/a,n/a,n/a,100,100,115,115,200,200,95,95,90-264,90-264,100-240 VAC,100-240 VAC,100-240 VAC,100-240 VAC,100-240 VAC,n/a,n/a,90-260,90-260,90-260,100-242,100-241,100-240,90-132 or 180-265,90-132 or 180-265,90-132 or 180-265,90-132 or 180-265,90-132 or 180-265,90-132 or 180-265,90-132 or 180-265,90-132 or 180-265,90-132 or 180-265,90-132 or 180-265,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100-240,100 - 240,100 - 240,100 - 240,100 - 240,100 - 240,100 - 240,100 - 240,100 - 240,100 - 240,100 - 240,100-240,100-240,120-240,120-240,120-240,120-240,120-240,120-240,120-240,120-240,120-240,120-240,n/a,n/a,110-220,110-221,110-222,110-223,100-240";
	var FlickerFree =
		"n/a,yes,yes,yes,yes,yes,yes,yes,n/a,n/a,no,no,no,no,no,no,no,no,no,no,no,no,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,n/a,yes,yes,yes,yes,yes,yes,no,no,no,no,no,no,no,no,no,no,no,no,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,yes,no,no,no,no,no,no,no,no,no,no,n/a,n/a,yes,yes,yes,yes,yes";

	LightName = LightName.split(',');
	Type = Type.split(',');
	Style = Style.split(',');
	ColorTemp = ColorTemp.split(',');
	BeamAngle = BeamAngle.split(',');
	FCTungsten = FCTungsten.split(',');
	FCDaylight = FCDaylight.split(',');
	Watts = Watts.split(',');
	CRI = CRI.split(',');
	TLCI = TLCI.split(',');
	Voltage = Voltage.split(',');
	FlickerFree = FlickerFree.split(',');

	function inpType() {
		var a = $("#inp3type").val();
		var x, b = "";
		for (x = 0; x < 105; x++) {
			if (a == Type[x]) {
				b = b + "<option>" + LightName[x] +
					"</option>";
			}
		}
		$("#inp3name").html(b);
	}

	function caric() {
		var name = $("#inp3name").val();
		var dist = $("#inp3dist").val();
		var distFeet = dist * 3.281;
		var k, id;
		for (k = 0; k < 105; k++) {
			if (name == LightName[k]) {
				id = k;
			}
		}
		console.log(id + " / " + LightName[id]);
		var tun = (FCTungsten[id] * 25) / (distFeet *
			distFeet);
		tun = parseFloat(Math.round(tun * 100) / 100).toFixed(
			0);
		var tunb = tun * 10.764;
		tunb = parseFloat(Math.round(tunb * 100) / 100).toFixed(
			0);
		var day = (FCDaylight[id] * 25) / (distFeet *
			distFeet);
		day = parseFloat(Math.round(day * 100) / 100).toFixed(
			0);
		var dayb = day * 10.764;
		dayb = parseFloat(Math.round(dayb * 100) / 100).toFixed(
			0);

		$("#inp3result").html("<b>" + tun + " fc / " + tunb +
			" lux </b>for the tungsten and<b> " +
			day + " fc / " + dayb +
			" lux </b>for the daylight. " +
			"Also you need to remember that this light has a beam angle of<b> " +
			BeamAngle[id] +
			"</b> and has <b>" + CRI[id] + " CRI & " +
			TLCI[id] + " TLCI</b>. You also might need" +
			" to remember that this light needs <b>" +
			Watts[id] + " / " + Voltage[id] +
			"</b>, and this" +
			"light is <b>(" + FlickerFree[id] +
			")</b> flicker free.");
	}

	$("#inp3type").change(function () {
		inpType();
		console.log(inpType());
	});

	$(".inp3").change(function () {
		caric();
	});


});