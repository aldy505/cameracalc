$(document).ready(function () {

	// JavaScript Document

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

});