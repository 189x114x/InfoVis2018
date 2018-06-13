function main()
{
    var volume = new KVS.CreateTornadoData( 64, 64, 64 );
    var screen = new KVS.THREEScreen();
    var up,path,geometry,material,mesh,box;


    screen.init( volume );
    setup();
    createTubeline(20, 2, 8)
    screen.loop();


    function setup()
    {
        var color = new KVS.Vec3( 0, 0, 0 );
        box = new KVS.BoundingBox();
        box.setColor( color );
        box.setWidth( 2 );
        var streamline = new KVS.Streamline();
        streamline.setIntegrationStepLength( 0.5 );
        streamline.setIntegrationTime( 500 );
        streamline.setIntegrationMethod( KVS.RungeKutta4 );
        streamline.setIntegrationDirection( KVS.ForwardDirection );
        streamline.setLineWidth( 50 );
        streamline.seed_point.set(32,32,32);

        var line1 = KVS.ToTHREELine( box.exec( volume ) );
        var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
        screen.scene.add( line1 );
        screen.scene.add( line2 );
        screen.draw();

        document.addEventListener( 'mousemove', function() {
            screen.light.position.copy( screen.camera.position );
        });

        window.onload = function() {
            up = new Update();
            var gui = new dat.GUI();

            var f1 = gui.addFolder('Create New Streamline');
            f1.add(up, 'x');
            f1.add(up, 'y');
            f1.add(up, 'z');
            f1.add(up, 'create').onChange(set);
            var f2 = gui.addFolder('Change Tubeline');
            f2.add(up, 'radius', 0, 10).onChange(change);
            f2.add(up, 'reflection', {Lambertian:1, Phong:2, BlinnPhong:3, CookTorrance:4, Toon:5}).onChange(select);
       }

    }

    function createTubeline(segments,radius,radialSegments){

    	 function CustomSinCurve( scale ) {

         	THREE.Curve.call( this );
         	this.scale = ( scale === undefined ) ? 1 : scale;

         }

         CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
         CustomSinCurve.prototype.constructor = CustomSinCurve;

         CustomSinCurve.prototype.getPoint = function ( t ) {

         	var tx = t * 3 + 1.8;
         	var ty = Math.sin( 2 * Math.PI * t ) + 3.0;
         	var tz = t * 3 + 1.8;

         	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

         };

         var renderer = new THREE.WebGLRenderer();
         renderer.setSize( 500, 500 );
         document.body.appendChild( renderer.domElement );

         path = new CustomSinCurve( 10 );
         geometry = new THREE.TubeGeometry( path, segments, radius, radialSegments, false );
         material = new THREE.ShaderMaterial({
         	vertexColors: THREE.VertexColors,
         	side: THREE.DoubleSide,
         	vertexShader: document.getElementById('Lambertian.vert').text,
         	fragmentShader: document.getElementById('Lambertian.frag').text,
         	uniforms: {
         	light_position: { type: 'v3', value: screen.light.position.copy( screen.camera.position ) } }

         });;
         mesh = new THREE.Mesh( geometry, material );
         screen.scene.add( mesh );

    }

    //1~62まで
    var Update = function() {
		 this.x = 32;
		 this.y = 32;
		 this.z = 32;
		 this.create = function(){};
		 this.radius = 2;
		 this.reflection = 1;
	};

	function select(){

		if(up.reflection==1){
			mesh.material = new THREE.ShaderMaterial({
				vertexColors: THREE.VertexColors,
	         	side: THREE.DoubleSide,
	         	vertexShader: document.getElementById('Lambertian.vert').text,
	         	fragmentShader: document.getElementById('Lambertian.frag').text,
	         	uniforms: {
	         	light_position: { type: 'v3', value: screen.light.position.copy( screen.camera.position ) } }

	         });;
	    }

		if(up.reflection==2){
			mesh.material = new THREE.ShaderMaterial({
				vertexColors: THREE.VertexColors,
	         	side: THREE.DoubleSide,
	         	vertexShader: document.getElementById('Phong.vert').text,
	         	fragmentShader: document.getElementById('Phong.frag').text,
	         	uniforms: {
	         	light_position: { type: 'v3', value: screen.light.position.copy( screen.camera.position ) } }

	         });;
	    }

		if(up.reflection==3){
			mesh.material = new THREE.ShaderMaterial({
				vertexColors: THREE.VertexColors,
	         	side: THREE.DoubleSide,
	         	vertexShader: document.getElementById('BlinnPhong.vert').text,
	         	fragmentShader: document.getElementById('BlinnPhong.frag').text,
	         	uniforms: {
	         	light_position: { type: 'v3', value: screen.light.position.copy( screen.camera.position ) } }

	         });;
	    }

		if(up.reflection==4){
			mesh.material = new THREE.ShaderMaterial({
				vertexColors: THREE.VertexColors,
	         	side: THREE.DoubleSide,
	         	vertexShader: document.getElementById('CookTorrance.vert').text,
	         	fragmentShader: document.getElementById('CookTorrance.frag').text,
	         	uniforms: {
	         	light_position: { type: 'v3', value: screen.light.position.copy( screen.camera.position ) } }

	         });;
	    }

		if(up.reflection==5){
			mesh.material = new THREE.ShaderMaterial({
				vertexColors: THREE.VertexColors,
	         	side: THREE.DoubleSide,
	         	vertexShader: document.getElementById('Toon.vert').text,
	         	fragmentShader: document.getElementById('Toon.frag').text,
	         	uniforms: {
	         	light_position: { type: 'v3', value: screen.light.position.copy( screen.camera.position ) } }

	         });;
	    }

	}


    function change(){
    	mesh.geometry.dispose();
	
	function CustomSinCurve( scale ) {

         	THREE.Curve.call( this );
         	this.scale = ( scale === undefined ) ? 1 : scale;

         }

         CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
         CustomSinCurve.prototype.constructor = CustomSinCurve;

         CustomSinCurve.prototype.getPoint = function ( t ) {

         	var tx = t * 3 + 1.8;
         	var ty = Math.sin( 2 * Math.PI * t ) + 3.0;
         	var tz = t * 3 + 1.8;

         	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

         };

         var renderer = new THREE.WebGLRenderer();
         renderer.setSize( 500, 500 );
         document.body.appendChild( renderer.domElement );

         path = new CustomSinCurve( 10 );
	
    	mesh.geometry = new THREE.TubeGeometry( path, 20, up.radius, 8, false );
    }


    function set(){
    	//更新処理
         var seed_point = volume.objectCenter();
         var streamline = new KVS.Streamline();
         streamline.setIntegrationStepLength( 0.5 );
         streamline.setIntegrationTime( 500 );
         streamline.setIntegrationMethod( KVS.RungeKutta4 );
         streamline.setIntegrationDirection( KVS.ForwardDirection );
         streamline.setLineWidth( 5 );
         streamline.seed_point.set( up.x, up.y, up.z);
         var line1 = KVS.ToTHREELine( box.exec( volume ) );
         var line2 = KVS.ToTHREELine( streamline.exec( volume ) );
         screen.scene.add( line1 );
         screen.scene.add( line2 );
         screen.draw();
    }


   	screen.loop();


}
