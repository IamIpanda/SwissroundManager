@global = ->
  console.log 'Global is a static class.'
@global.getState = ->
  $('.view.active .pages .page.page-on-center').attr('data-page')
@global.getLastState = ->
@global.getData = ->
  this[this.getState()]
Object.defineProperty @global, 'state', get: @global.getState
Object.defineProperty @global, 'data', get: @global.getData

@global["index-match"] = {}
@global["index-history"] = {}
@global["index-player"] = {}
@global["match"] = {}
@global["player"] = {}
@global['index-edit-player'] = {}
@global['edit-player'] = {}