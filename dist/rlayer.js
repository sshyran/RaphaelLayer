(function(){var e,t;typeof exports!="undefined"?e=exports:(e={},t=window.R,e.noConflict=function(){return window.R=t,e},window.R=e),e.version="0.1.1",e.Layer=L.Class.extend({initialize:function(e){},onAdd:function(e){this._map=e,this._map._initRaphaelRoot(),this._paper=this._map._paper,this._set=this._paper.set(),e.on("viewreset",this.projectLatLngs,this),this.projectLatLngs()},onRemove:function(e){e.off("viewreset",this.projectLatLngs,this),this._map=null,this._set.forEach(function(e){e.remove()},this),this._set.clear()},projectLatLngs:function(){},animate:function(e,t,n,r){return this._set.animate(e,t,n,r),this},hover:function(e,t,n,r){return this._set.hover(e,t,n,r),this},attr:function(e,t){return this._set.attr(e,t),this}}),L.Map.include({_initRaphaelRoot:function(){this._raphaelRoot||(this._raphaelRoot=this._panes.overlayPane,this._paper=Raphael(this._raphaelRoot),this.on("moveend",this._updateRaphaelViewport),this._updateRaphaelViewport())},_updateRaphaelViewport:function(){var e=.02,t=this.getSize(),n=L.DomUtil.getPosition(this._mapPane),r=n.multiplyBy(-1)._subtract(t.multiplyBy(e)),i=r.add(t.multiplyBy(1+e*2)),s=i.x-r.x,o=i.y-r.y,u=this._raphaelRoot,a=this._panes.overlayPane;this._paper.setSize(s,o),L.DomUtil.setPosition(u,r),u.setAttribute("width",s),u.setAttribute("height",o),this._paper.setViewBox(r.x,r.y,s,o,!1)}}),e.Marker=e.Layer.extend({initialize:function(t,n,r,i){e.Layer.prototype.initialize.call(this,i),this._latlng=t,this._pathString=typeof n=="string"?n:"M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z",this._attr=typeof n=="object"?n:r?r:{fill:"#000"}},projectLatLngs:function(){this._path&&this._path.remove();var e=this._map.latLngToLayerPoint(this._latlng),t=Raphael.pathBBox(this._pathString);this._path=this._paper.path(this._pathString).attr(this._attr).translate(e.x-1.05*t.width,e.y-1.15*t.height).toFront(),this._set.push(this._path)}}),e.Pulse=e.Layer.extend({initialize:function(t,n,r,i,s){e.Layer.prototype.initialize.call(this,s),this._latlng=t,this._radius=typeof n=="number"?n:6,this._attr=typeof n=="object"?n:typeof r=="object"?r:{fill:"#30a3ec",stroke:"#30a3ec"},this._pulseAttr=typeof n=="object"?r:typeof i=="object"?i:{"stroke-width":3,stroke:this._attr.stroke},this._repeat=3},onRemove:function(t){e.Layer.prototype.onRemove.call(this,t),this._marker&&this._marker.remove(),this._pulse&&this._pulse.remove()},projectLatLngs:function(){this._marker&&this._marker.remove(),this._pulse&&this._pulse.remove();var e=this._map.latLngToLayerPoint(this._latlng);this._marker=this._paper.circle(e.x,e.y,this._radius).attr(this._attr),this._pulse=this._paper.circle(e.x,e.y,this._radius).attr(this._pulseAttr);var t=Raphael.animation({"0%":{transform:"s0.3",opacity:1},"100%":{transform:"s3.0",opacity:0,easing:"<"}},1e3);this._pulse.animate(t.repeat(this._repeat))}}),e.Polyline=e.Layer.extend({includes:L.Mixin.Events,initialize:function(t,n,r){e.Layer.prototype.initialize.call(this,r),this._latlngs=t,this._attr=n||{fill:"#000",stroke:"#000"}},projectLatLngs:function(){this._set.clear(),this._path&&this._path.remove(),this._path=this._paper.path(this.getPathString()).attr(this._attr).toBack(),this._set.push(this._path)},getPathString:function(){for(var e=0,t=this._latlngs.length,n="";e<t;e++){var r=this._map.latLngToLayerPoint(this._latlngs[e]);n+=(e?"L":"M")+r.x+" "+r.y}return n}}),e.Polygon=e.Layer.extend({includes:L.Mixin.Events,initialize:function(t,n,r){e.Layer.prototype.initialize.call(this,r),t.length==1&&t[0]instanceof Array&&(t=t[0]),this._latlngs=t,this._attr=n||{fill:"rgba(255, 0, 0, 0.5)",stroke:"#f00","stroke-width":2}},projectLatLngs:function(){this._path&&this._path.remove(),this._path=this._paper.path(this.getPathString()).attr(this._attr).toBack(),this._set.push(this._path)},getPathString:function(){for(var e=0,t=this._latlngs.length,n="";e<t;e++){var r=this._map.latLngToLayerPoint(this._latlngs[e]);n+=(e?"L":"M")+r.x+" "+r.y}return n+="Z",n}}),e.PolygonGlow=e.Layer.extend({initialize:function(t,n,r){e.Layer.prototype.initialize.call(this,r),this._latlngs=t,this._attr=n||{fill:"rgba(255, 0, 0, 1)",stroke:"#f00","stroke-width":3}},onRemove:function(t){e.Layer.prototype.onRemove.call(this,t),this._path&&this._path.remove()},projectLatLngs:function(){this._path&&this._path.remove(),this._path=this._paper.path(this.getPathString()).attr(this._attr).toBack();var e=this._path,t=function(){e.animate({"fill-opacity":.25},1e3,"<",n)},n=function(){e.animate({"fill-opacity":1},1e3,"<",t)};n()},getPathString:function(){for(var e=0,t=this._latlngs.length,n="";e<t;e++){var r=this._map.latLngToLayerPoint(this._latlngs[e]);n+=(e?"L":"M")+r.x+" "+r.y}return n+="Z",n}}),e.Bezier=e.Layer.extend({initialize:function(t,n,r){e.Layer.prototype.initialize.call(this,r),this._latlngs=t,this._attr=n},projectLatLngs:function(){this._path&&this._path.remove();var e=this._map.latLngToLayerPoint(this._latlngs[0]),t=this._map.latLngToLayerPoint(this._latlngs[1]),n=this.getControlPoint(e,t);this._path=this._paper.path("M"+e.x+" "+e.y+"Q"+n.x+" "+n.y+" "+t.x+" "+t.y).attr(this._attr).toBack(),this._set.push(this._path)},getControlPoint:function(e,t){var n={x:0,y:0};n.x=e.x+(t.x-[e.x])/2,n.y=e.y+(t.y-[e.y])/2;var r=0;return this.closeTo(e.x,t.x)&&!this.closeTo(e.y,t.y)?(r=(e.x-t.x)*1+15*(e.x<t.x?-1:1),n.x=Math.max(e.x,t.x)+r):(r=(t.y-e.y)*1.5+15*(e.y<t.y?1:-1),n.y=Math.min(e.y,t.y)+r),n},closeTo:function(e,t){var n=15;return e-t>-n&&e-t<n}}),e.BezierAnim=e.Layer.extend({initialize:function(t,n,r,i){e.Layer.prototype.initialize.call(this,i),this._latlngs=t,this._attr=n,this._cb=r},onRemove:function(t){e.Layer.prototype.onRemove.call(this,t),this._path&&this._path.remove(),this._sub&&this._sub.remove()},projectLatLngs:function(){this._path&&this._path.remove(),this._sub&&this._sub.remove();var e=this,t=this._map.latLngToLayerPoint(this._latlngs[0]),n=this._map.latLngToLayerPoint(this._latlngs[1]),r=this.getControlPoint(t,n),i="M"+t.x+" "+t.y+"Q"+r.x+" "+r.y+" "+n.x+" "+n.y,s=this._paper.path(i).hide();this._paper.customAttributes.alongBezier=function(e){var t=this.data("reverse"),n=this.data("pathLength");return{path:this.data("bezierPath").getSubpath(t?(1-e)*n:0,t?n:e*n)}};var o=this._sub=this._paper.path().data("bezierPath",s).data("pathLength",s.getTotalLength()).data("reverse",!1).attr({stroke:"#f00",alongBezier:0,"stroke-width":3});o.stop().animate({alongBezier:1},500,function(){e._cb(),o.data("reverse",!0),o.stop().animate({alongBezier:0},500,function(){o.remove()})})},getControlPoint:function(e,t){var n={x:0,y:0};n.x=e.x+(t.x-[e.x])/2,n.y=e.y+(t.y-[e.y])/2;var r=0;return this.closeTo(e.x,t.x)&&!this.closeTo(e.y,t.y)?(r=(e.x-t.x)*1+15*(e.x<t.x?-1:1),n.x=Math.max(e.x,t.x)+r):(r=(t.y-e.y)*1.5+15*(e.y<t.y?1:-1),n.y=Math.min(e.y,t.y)+r),n},closeTo:function(e,t){var n=15;return e-t>-n&&e-t<n}}),e.FeatureGroup=L.FeatureGroup.extend({initialize:function(e,t){L.FeatureGroup.prototype.initialize.call(this,e,t)},animate:function(e,t,n,r){this.eachLayer(function(i){i.animate(e,t,n,r)})},onAdd:function(e){L.FeatureGroup.prototype.onAdd.call(this,e),this._set=this._map._paper.set();for(i in this._layers)this._set.push(this._layers[i]._set)},hover:function(e,t,n,r){return this.eachLayer(function(i){i.hover(e,t,n,r)}),this},attr:function(e,t){return this.eachLayer(function(n){n.attr(e,t)}),this}}),function(){function t(t){return e.FeatureGroup.extend({initialize:function(e,t){this._layers={},this._options=t,this.setLatLngs(e)},setLatLngs:function(e){var n=0,r=e.length;this.eachLayer(function(t){n<r?t.setLatLngs(e[n++]):this.removeLayer(t)},this);while(n<r)this.addLayer(new t(e[n++],this._options));return this}})}e.MultiPolyline=t(e.Polyline),e.MultiPolygon=t(e.Polygon)}(),e.GeoJSON=e.FeatureGroup.extend({initialize:function(e,t){L.Util.setOptions(this,t),this._geojson=e,this._layers={},e&&this.addGeoJSON(e)},addGeoJSON:function(t){var n=t.features,r,i;if(n){for(r=0,i=n.length;r<i;r++)this.addGeoJSON(n[r]);return}var s=t.type==="Feature",o=s?t.geometry:t,u=e.GeoJSON.geometryToLayer(o,this.options.pointToLayer);this.fire("featureparse",{layer:u,properties:t.properties,geometryType:o.type,bbox:t.bbox,id:t.id,geometry:t.geometry}),this.addLayer(u)}}),L.Util.extend(e.GeoJSON,{geometryToLayer:function(t,n){var r=t.coordinates,i=[],s,o,u,a,f;switch(t.type){case"Point":return s=this.coordsToLatLng(r),n?n(s):new e.Marker(s);case"MultiPoint":for(u=0,a=r.length;u<a;u++)s=this.coordsToLatLng(r[u]),f=n?n(s):new e.Marker(s),i.push(f);return new e.FeatureGroup(i);case"LineString":return o=this.coordsToLatLngs(r),new e.Polyline(o);case"Polygon":return o=this.coordsToLatLngs(r,1),new e.Polygon(o);case"MultiLineString":return o=this.coordsToLatLngs(r,1),new e.MultiPolyline(o);case"MultiPolygon":return o=this.coordsToLatLngs(r,2),new e.MultiPolygon(o);case"GeometryCollection":for(u=0,a=t.geometries.length;u<a;u++)f=this.geometryToLayer(t.geometries[u],n),i.push(f);return new e.FeatureGroup(i);default:throw Error("Invalid GeoJSON object.")}},coordsToLatLng:function(e,t){var n=parseFloat(e[t?0:1]),r=parseFloat(e[t?1:0]);return new L.LatLng(n,r,!0)},coordsToLatLngs:function(e,t,n){var r,i=[],s,o;for(s=0,o=e.length;s<o;s++)r=t?this.coordsToLatLngs(e[s],t-1,n):this.coordsToLatLng(e[s],n),i.push(r);return i}})})();