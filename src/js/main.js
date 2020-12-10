
$(document).ready(function () {
@import '../src/js/vendors/_vendor.js'

  // click actions
  $(document)
    .on('click', '.person-options-toggler', function(e) {
      e.stopPropagation();
      $(this).next('.person-options-list').slideToggle(300);
    })
    .on('click', '.message-add-file-toggler', function(e) {
      e.stopPropagation();
      $(this).toggleClass('active');
      $(this).next('.message-add-file-list').slideToggle(300);
    })
    .on('click', function() {
      $('.messages-header .person-options-list').slideUp(300);
      $('.message-add-file-toggler').removeClass('active');
      $('.message-field .message-add-file-list').slideUp(300);
    });

    // search input
    $('.search-field input').on('keyup', function() {
      if ($(this).val() !== '') {
        $(this).next('button').addClass('active');
      } else {
        $(this).next('button').removeClass('active');
      }
    });

    // message textarea
    $('.message-input textarea').each(function() {
      if ($(this).val() !== '') {
        $(this).parents('.message-field').find('.message-send-btn').addClass('active');
      } else {
        $(this).parents('.message-field').find('.message-send-btn').removeClass('active');
      }
      $(this).on('keyup', function() {
        if ($(this).val() !== '') {
          $(this).parents('.message-field').find('.message-send-btn').addClass('active');
        } else {
          $(this).parents('.message-field').find('.message-send-btn').removeClass('active');
        }
      });
    });

    var textarea = document.querySelectorAll('.message-input textarea');
    textarea.forEach(function(el) {
      var textWrapper = el.parentNode;
      el.setAttribute('style', 'height:' + (el.scrollHeight) + 'px;overflow-y:hidden;');
      textWrapper.style.height = el.scrollHeight + 25 + 'px';
      el.addEventListener('input', function () {
        if (this.value !== '') {
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
          textWrapper.style.height = this.scrollHeight + 25 + 'px';
          $('.message-input').mCustomScrollbar("update");
        } else {
          this.style.height = 25 + 'px';
          textWrapper.style.height = 50 + 'px';
          $('.message-input').mCustomScrollbar("update");
        }
      });
    });

    // scrollbars
    var scrollOpts = {
      scrollInertia:200,
      contentTouchScroll: 1,
      mouseWheel:{ 
        preventDefault: true,
      }
    }

    $('.message-input').mCustomScrollbar(scrollOpts);
    $('.message-list-scroller').mCustomScrollbar(scrollOpts);
    $('.chat-current-scroller').mCustomScrollbar(scrollOpts);
    $('.chat-current-person-scroller').mCustomScrollbar(scrollOpts);
});


