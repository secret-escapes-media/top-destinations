;(function ( $, window, document, undefined ) {
    
    "use strict";

    var pluginName = 'prettifyUpload',
        defaults = {
            buttonClass:'file-button',
            iconClass:'',
            text:'select a file',
            wrapperHeight: '22px',
            
        };
    function PrettifyUpload( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    PrettifyUpload.prototype.init = function () {
        
        $(this.element).css({
            cursor: 'pointer',
            fontSize: '30px',
            opacity: 0,
            filter:'alpha(opacity: 0)',
            position: 'relative',
            top: '-28px',
            left: '-180px',
            width: '200%'
        });
        
        var wrapper = $('<div />', {'class': 'input-file-wrapper'}).css({
            height:this.options.wrapperHeight,
            display:'inline-block',
            overflow:'hidden',
            position:'relative',
        });        
        
        var button = $('<a />', {'class': 'fileupload-button'});
        
        button
            .addClass(this.options.buttonClass)
            .append(this.options.text);
        
        $(this.element).wrap(wrapper);    
        
        $(this.element).parents('.input-file-wrapper:first').prepend(button);

        $(this.element).bind('change', function() {
            var self = $(this);

            // Hide the input text and field
            var selfButton = $(this).parent().find('a');
            selfButton.hide();
            self.css('top', '-999px');

            
            for (var i = 0; i < self[0].files.length; i++) {
                var filename = self[0].files[i].name;
              if (filename.length > 20 ) {
                filename = filename.substring(0,20)+"...";
              }

              self.parents('.input-file-wrapper')
                  .after($('<p />', {'class': 'input-file-name'})
                      .html(filename)
                      .css({
                        'margin': '-25px 0 5px 0',
                        'fontSize': '0.75em',
                        'position': 'relative',
                        'zIndex': '999'
                      })
                      .append($('<a />', {href:'javascript:void(0)', 'class': 'input-file-remove'})
                          .html('remove')
                          .css({
                            'position': 'absolute',
                            'top': '1.6em',
                            'left': '0'
                           })
                          .bind('click', function() {
                              $(this).parent().remove();
                              selfButton.show();
                              self.css('top', '-28px');
                          })
                      )                    
                  );            
            }
        });
        
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new PrettifyUpload( this, options ));
            }
        });
    }
    
    $(function() {
        $('[data-pretty-file]').prettifyUpload();
    })

})( jQuery, window, document );