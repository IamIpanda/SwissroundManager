Element.prototype.smartAppend = (str) ->
  if typeof str != 'string'
    return
  type = ""
  _class = []
  if str.startsWith '.'
    type = "div"
    _class = [str[1..-1]]
  else if str.includes '.'
    parts = str.split '.'
    type = parts[0]
    _class = parts[1..-1]
  type = str if type == ""
  node = this.appendChild document.createElement type
  node.classList.add _class if _class.length > 0
  node

Element.prototype.smartAttribute = (attributeName, attributeValue) ->
  attr = document.createAttribute(attributeName)
  attr.value = attributeValue
  this.attributes.setNamedItem attr
  this

@createLi = (title, after, href, data, onclick) ->
  li = $('<li></li>')[0]
  href = href || "#"
  a = li.smartAppend('a.item-link').smartAttribute("href", href)
  inner = a.smartAppend('.item-content').smartAppend('.item-inner')
  $(inner.smartAppend('.item-title')).html title if title
  $(inner.smartAppend('.item-after')).html after if after
  jq = $(li)
  if onclick != undefined and onclick != null
    jq.on 'click', data, onclick
  jq
