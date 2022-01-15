// ініціалізація змінних


let calc_transporter = {
  l_trans: $('#length_trans option:selected').val(),
  params_trans: $('#params_trans option:selected').val().split(','),
  engine_params: $('#engine_params option:selected').val().split(','),
  working_angle: $('#working_angle').val().split(',')*1,
  weight_product: $('#weight_product').val().split(',')*1,
  pi: 3.1415926535,
  price_sh_transporter: 0, 
  production_sh_transporter: 0.0,
  rbtn_chek_privod: false,

  target_rbtn_chek_privod : function (){
    rbtn_chek_privod = $("#btn_engyne_reduktor").prop("checked");
  }
}


// перша перевірка радіобатона на вибір моторредуктора

target_rbtn_chek_privod();

// клік евент 
$( "#calck_price" ).click(function() {
    init_varible_value() 
    prace_vue();
  });

$( "#calck_production" ).click(function() {
  init_varible_value() 
  calck_production()
});

// при зміні вибору мотор редуктора
$( ".form-check-input_engyne" ).change(function() {
  target_rbtn_chek_privod();
  build_select_engin();
  clean_prace();
});

// надання значень змінним

// заміна селекта з двигунами
function build_select_engin() {
  let tmp = "",
      engines_params = [
        [0,    0,   0, "Без двигуна"]
        [1500, 1.1, 3237],
        [1500, 1.5, 3582],
        [1500, 2.2, 5448],
        [1500, 3.0, 6306],
        [1500, 4.0, 7161],
        [1500, 5.5, 8778],
        [1500, 7.5, 11421],
        [1500, 11.0, 14145],
        [1000, 1.1, 3747],
        [1000, 1.5, 5115],
        [1000, 2.2, 6045],
        [1000, 3.0, 8352],
        [1000, 4.0, 8946],
        [1000, 5.5, 9375],
        [1000, 7.5, 12015],
        [1000, 11.0, 20136],
        [750, 1.1, 5448],
        [750, 1.5, 6390],
        [750, 2.2, 8517],
        [750, 3.0, 9375],
        [750, 4.0, 12183],
        [750, 5.5, 12015],
        [750, 7.5, 19056],
        [750, 11.0, 23370]
      ],

      motor_engine_params = [
        [0,  0,   0, "Без мотор редуктора"],
        [0,1.1,8153],
        [0,1.1,10013],
        [0,1.5,9083],
        [0,1.5,10943],
        [0,2.2,12090],
        [0,2.2,15345],
        [0,3,16275],
        [0,3,19716],
        [0,4,17918],
        [0,4,20925],
        [0,5.5,22320],
        [0,5.5,26505],
        [0,7.5,26040],
        [0,7.5,30225],
        [0,11,39990]
      ]

  if(rbtn_chek_privod == false){
    engines_params.forEach(function(item, i, engines_params){
        if (i===0) { 
          tmp+='<option selected value="0,0,0">Без двигуна</option>';
        }else{
          tmp+=`<option value="${item[0]},${item[1]},${item[2]}">Мотор ${item[1]} кВт. ${item[0]} об./хв.</option>`;
        }      
      });
      
    $("#engine_params").html(
      tmp
    );
    }else{
      $("#engine_params").html(
        '<option selected value="0,0,0">Без мотор-редуктора</option>'+
        '<option value="0,1.1,8153">Мотор редуктор 1.1 кВт. WMI 63</option>'+
        '<option value="0,1.1,10013">Мотор редуктор 1.1 кВт. WMI 75</option>'+
        '<option value="0,1.5,9083">Мотор редуктор 1.5 кВт. WMI 63</option>'+
        '<option value="0,1.5,10943">Мотор редуктор 1.5 кВт. WMI 75</option>'+
        '<option value="0,2.2,12090">Мотор редуктор 2.2 кВт. WMI 75</option>'+
        '<option value="0,2.2,15345">Мотор редуктор 2.2 кВт. WMI 90</option>'+
        '<option value="0,3,16275">Мотор редуктор 3 кВт. WMI 90</option>'+
        '<option value="0,3,19716">Мотор редуктор 3 кВт. WMI 110</option>'+
        '<option value="0,4,17918">Мотор редуктор 4 кВт. WMI 90</option>'+
        '<option value="0,4,20925">Мотор редуктор 4 кВт. WMI 110</option>'+
        '<option value="0,5.5,22320">Мотор редуктор 5.5 кВт. WMI 110</option>'+
        '<option value="0,5.5,26505">Мотор редуктор 5.5 кВт. WMI 130</option>'+
        '<option value="0,7.5,26040">Мотор редуктор 7.5 кВт. WMI 110</option>'+
        '<option value="0,7.5,30225">Мотор редуктор 7.5 кВт. WMI 130</option>'+
        '<option value="0,11,39990">Мотор редуктор 11 кВт. WMI 150</option>'
      );  
    }
}


// обрахунок та вивід прайса
function prace_vue() {
  // перевірка та обрахунок на моторі та мотор-редукторі
  if(rbtn_chek_privod == false){
      price_sh_transporter = (params_trans[2]*1)+(params_trans[1]*1)+(params_trans[3]*l_trans*1.1)+(engine_params[2]*1);
    }else{
      price_sh_transporter = 3000 + (params_trans[1]*1)+(params_trans[3]*l_trans*1.1)+(engine_params[2]*1);
    }

  // перевірка на наявність бункерка та підставки
  if($(".radio_boonker").prop("checked")){
    price_sh_transporter += 2000
  }

  if($(".radio_pistavka").prop("checked")){
    price_sh_transporter += 4000
  }

  price_sh_transporter = parseInt(price_sh_transporter)

  $(".price").html( " ₴ " + price_sh_transporter+ ".00 з пдв");
}



// обрахунок та иввід продуктивності
function calck_production(){
  
  let params_inner_volume_pipe = params_trans[0] - 7
  params_inner_volume_pipe = Math.sqrt( params_inner_volume_pipe / 2 *0.001 ) * pi
  


  let scrw_p = (params_trans[0] - 11) * 0.001


  let  engine_speed

  if(rbtn_chek_privod == false){
   engine_speed = engine_params[0]*0.25
  }else{
   alert ("на мотор редуктрі поки що не обраховується")
  }





  let volume_smale_pipe

  if(params_trans[0]==102||params_trans[0]==127){
    volume_smale_pipe = (( 34 / 2 ) * pi) * 0.001
    volume_smale_pipe = volume_smale_pipe * volume_smale_pipe 
  }
  else {
    volume_smale_pipe = (( 42 / 2 ) * pi ) * 0.001
    volume_smale_pipe = volume_smale_pipe * volume_smale_pipe    
  } 


  let cooficient_speed_working

  if (working_angle==0){
    cooficient_speed_working = 0.85
  }else if(working_angle==15){
    cooficient_speed_working = 0.75
  }else if(working_angle==30){
    cooficient_speed_working = 0.7
  }else if(working_angle==45){
    cooficient_speed_working = 0.6
  }else if(working_angle==60){
    cooficient_speed_working = 0.5
  }else if(working_angle==90){
    cooficient_speed_working = 0.5
  }

  production_sh_transporter = (params_inner_volume_pipe *  scrw_p) - (volume_smale_pipe*scrw_p) *   cooficient_speed_working * engine_speed * 60  * weight_product

  

  $(".production_sh").html( " " + production_sh_transporter+ " тон на годину");

  console.log(params_inner_volume_pipe)
}


// зачиска ціни при зміні параметрів
$( "#params_trans" ).change(function() {
  clean_prace()
  clean_producthion()
});

$( "#length_trans" ).change(function() {
  clean_prace()
  clean_producthion()
});

$( "#engine_params" ).change(function() {
  clean_prace()
  clean_producthion()
});

$( ".radio_boonker" ).change(function() {
  clean_prace()
});

$( ".radio_pistavka" ).change(function() {
  clean_prace()
});

// зачиска ціни при зміні параметрів продуктивності
$( "#weight_product" ).change(function() {
  clean_producthion()
});

$( "#working_angle" ).change(function() {
  clean_producthion()
});




function clean_prace() {
  $(".price").html( "" );
}

function clean_producthion() {
  $(".production_sh").html( "" );
}
