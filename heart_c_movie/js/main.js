'use strict';

$(function() {
  var $win = $(window),
      $main = $('main'),
      $nav = $('nav'),
      navHeight = $nav.outerHeight(),
      navPos = $nav.offset().top,
      fixedClass = 'is-fixed';

  $win.on('load scroll', function() {
    var value = $(this).scrollTop();
    if ( value > navPos ) {
      $nav.addClass(fixedClass);
      $main.css('margin-top', navHeight);
    } else {
      $nav.removeClass(fixedClass);
      $main.css('margin-top', '0');
    }
  });
});

$(function(){
  $('a[href^="#"]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position-200}, speed, "swing");
    return false;
  });
});

$(function() {
  $('#sec01').on('inview', function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(".sec01").addClass('current');
    } else {
    //表示領域から出た時
      $(".sec01").removeClass('current');
    }
  });
  $('#sec02').on('inview', function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(".sec02").addClass('current');
    } else {
    //表示領域から出た時
      $(".sec02").removeClass('current');
    }
  });
  $('#sec05').on('inview', function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(".sec05").addClass('current');
    } else {
    //表示領域から出た時
      $(".sec05").removeClass('current');
    }
  });
  $('#sec06').on('inview', function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(".sec06").addClass('current');
    } else {
    //表示領域から出た時
      $(".sec06").removeClass('current');
    }
  });
  $('#sec07').on('inview', function(event, isInView) {
    if (isInView) {
    //表示領域に入った時
      $(".sec07").addClass('current');
    } else {
    //表示領域から出た時
      $(".sec07").removeClass('current');
    }
  });
});

// footer 企業情報, 診断結果リンク先をデバイスによって出しわけ
$(function() {
  // let resultHref = '';
  // let movieHref = '';
  let footerHref = '';
  const windowSize = $(window).innerWidth();

  // if(windowSize < 640) {
    // footerHref = 'https://orientalbio-kenko.jp/epa/sp/data.html';

  //   resultHref = '/heart_c/index_c.html?argument=2JbemGXQ&dmai=a5f59ce92502b9';

  //   movieHref = '/interview/ngr_m/?argument=2JbemGXQ&dmai=a5f59ce2c99639';
  // } else {
  //   footerHref = 'https://orientalbio-kenko.jp/epa/data.html';

  //   resultHref = '/heart_c/index_c.html?argument=2JbemGXQ&dmai=a5f59ce92502b9';

  //   movieHref = '/interview/ngr_m/?argument=2JbemGXQ&dmai=a5f59ce2c99639';
  // }
  // $('#footer .links a').attr('href', footerHref);
  // $('#result a.second_result__btn').attr('href', resultHref);
});


{
  const cover = document.getElementById('cover');
  const checkBtn = document.getElementById('cover_btn');

  checkBtn.addEventListener('click', () => {
    cover.classList.add('hidden');
  });
}

// 診断
{
  // 項目を編集
  const items = [
    '常に疲労感・倦怠感がある',
    '手のしびれや体のむくみがある',
    // '頭がもやもやする',
    // '冷えやむくみがおさまりにくい',
    'ときどき胸に痛みや圧迫感がある',
    '頭がもやもやしたり、頭痛が起こる',
    '高血圧である',
    '安静時にドキドキと動悸が起こる',
    '急に心臓がバクバク、脈が乱れることがある',
    // '目がちかちかして、視界が悪くなる',
  ];

  // イラストを編集
  const images = [
    'simulation01.jpg',
    'simulation02.jpg',
    // 'simulation03.jpg',
    // 'simulation04.jpg',
    'simulation05.jpg',
    'simulation06.jpg',
    'simulation07.jpg',
    'simulation08.jpg',
    'simulation09.jpg',
    // 'simulation10.jpg',
  ];

  const labelItems = [
    '常に疲労感・倦怠感がある',
    '手のしびれがある',
    // '頭がもやもやする',
    // '冷えやむくみがおさまりにくい',
    'ときどき胸に痛みや圧迫感がある',
    '長年つらい頭痛・偏頭痛持ちである',
    '薬を飲んでも高血圧が治らない',
    '安静時にドキドキと動悸が起こる',
    '急に心臓がバクバク、脈が乱れることがある',
    // '目がちかちかして、視界が悪くなる',
  ];

  const btnSet = document.querySelectorAll('.btn');
  const title = document.getElementById('simulationTitle');
  const page = document.getElementById('simulationPage');
  const image = document.getElementById('simulationImg');
  const submitBtn = document.getElementById('simulationSubmit');

  let currentPage = 0;
  let scoreYes = 0;
  let scoreNo = 0;
  let gaLabelName = '';

  function setSimulation() {
    title.textContent = items[currentPage];
    page.textContent = `${currentPage + 1} / ${items.length}`;
    image.innerHTML = `<img src="img/${images[currentPage]}" alt="">`;
  }

  setSimulation();

  btnSet.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      currentPage++;

      gaLabelName = `${labelItems[currentPage - 1]}`;
      console.log(gaLabelName, currentPage);

      if(currentPage <= items.length) {
        index === 0 ? scoreYes++ : scoreNo++;
        if(index === 0) {
          ga('create', 'UA-48253872-4', 'auto');
          ga('send', 'event', 'epa-kenkyu-second', 'click_Y/N', gaLabelName);
        }

        // setTimeout(setSimulation, 100);
        setSimulation();

        if(currentPage === items.length) {
          submitBtn.classList.remove('hidden');
          document.querySelector('.simulation__box__footer').classList.add('hidden');

          currentPage--;

          setSimulation();
        }
      }
    });
  });

  const result = document.getElementById('result');
  const resultTextBox = document.querySelectorAll('.second_result__text');
  const resultText = document.getElementById('resultText');
  // const resultTextAllNo = document.getElementById('resultText2');
  const resultBg = document.getElementsByClassName('result_bg')[0];
  const resultButton = document.getElementById('resultBtn');
  const br = document.createElement('br');
  const close = document.getElementById('resultClose');

  submitBtn.addEventListener('click', () => {
    ga('create', 'UA-48253872-4', 'auto');
    ga('send', 'event', 'epa-kenkyu-second', 'click_Y/N', '結果を見るボタン');
    resultBg.classList.remove('hidden');
    result.classList.remove('hidden');
    if(scoreYes >= 1) {
      resultText.textContent = `${scoreYes} / ${items.length}問当てはまったあなたは、要注意！`;
      resultTextBox[0].classList.remove('hidden');
    } else {
      resultTextBox[1].classList.remove('hidden');
    }
  });

  close.addEventListener('click', () => {
    result.classList.add('hidden');
    resultBg.classList.add('hidden');
  });

  resultBtn.addEventListener('click', () => {
    ga('create', 'UA-48253872-4', 'auto');
    ga('send', 'event', 'epa-kenkyu-second', 'click_Y/N', '詳細はこちらボタン');
  });
}

// もう一度診断する
$(function() {
  $('.second_result__again').click(function() {
    location.reload();
  });
});
