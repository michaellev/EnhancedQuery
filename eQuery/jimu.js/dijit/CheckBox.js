///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare',
  'dijit/_WidgetBase',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/on',
  'dojo/Evented'
],
function(declare, _WidgetBase, lang, html, on, Evented) {
  return declare([_WidgetBase, Evented], {
    'baseClass': 'jimu-checkbox',
    declaredClass: 'jimu.dijit.CheckBox',

    checked: false,
    status: true,

    postCreate: function(){
      this.checkNode = html.create('div', {
        'class': 'checkbox jimu-float-leading'
      }, this.domNode);
      if(this.label){
        this.labelNode = html.create('div', {
          'class': 'label jimu-float-leading',
          innerHTML: this.label
        }, this.domNode);
      }
      if(this.checked){
        html.addClass(this.checkNode, 'checked');
      }

      this.own(
        on(this.checkNode, 'click', lang.hitch(this, function(){
          if(this.status){
            if(this.checked){
              this.uncheck();
            }else{
              this.check();
            }
          }
        }))
      );

      if(this.label){
        this.own(
          on(this.labelNode, 'click', lang.hitch(this, function(){
            if(this.checked && this.status){
              this.uncheck();
            }else if(this.status){
              this.check();
            }
          }))
        );
      }

    },

    setValue: function(value){
      if(!this.status){
        return;
      }
      if(value === true){
        this.check();
      }else{
        this.uncheck();
      }
    },

    getValue: function(){
      return this.checked;
    },

    setStatus: function(newStatus){
      newStatus = !!newStatus;

      var isStatusChanged = this.status !== newStatus;

      this.status = newStatus;

      if(isStatusChanged){
        this.emit('status-change', newStatus);
      }

      if(!this.labelNode){
        return;
      }
      if(this.status){
        html.setStyle(this.labelNode, "color", "#000000");
      }else{
        html.setStyle(this.labelNode, "color", "#818181");
      }
    },

    check: function(){
      if(!this.status){
        return;
      }
      this.checked = true;
      html.addClass(this.checkNode, 'checked');
      this.onStateChange();
    },

    uncheck: function(notEvent){
      if(!this.status){
        return;
      }
      this.checked = false;
      html.removeClass(this.checkNode, 'checked');
      if(!notEvent){
        this.onStateChange();
      }
    },

    onStateChange: function(){
      if(this.onChange && lang.isFunction(this.onChange)){
        this.onChange(this.checked);
      }
    }
  });
});