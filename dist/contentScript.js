/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/contentscript.jsx ***!
  \*******************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.instruction) {
    setInstructionInTextAreas(message.instruction.user_profile);
  }
});
function setInstructionInTextAreas(userProfile) {
  var textAreas = document.querySelectorAll('textarea');
  var _iterator = _createForOfIteratorHelper(textAreas),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var textArea = _step.value;
      textArea.value = userProfile;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLENBQUMsVUFBQ0MsT0FBTyxFQUFFQyxNQUFNLEVBQUVDLFlBQVksRUFBSztFQUNwRSxJQUFJRixPQUFPLENBQUNHLFdBQVcsRUFBRTtJQUN2QkMseUJBQXlCLENBQUNKLE9BQU8sQ0FBQ0csV0FBVyxDQUFDRSxZQUFZLENBQUM7RUFDN0Q7QUFDRixDQUFDLENBQUM7QUFFRixTQUFTRCx5QkFBeUJBLENBQUNFLFdBQVcsRUFBRTtFQUM5QyxJQUFNQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO0VBQUMsSUFBQUMsU0FBQSxHQUFBQywwQkFBQSxDQUNqQ0osU0FBUztJQUFBSyxLQUFBO0VBQUE7SUFBaEMsS0FBQUYsU0FBQSxDQUFBRyxDQUFBLE1BQUFELEtBQUEsR0FBQUYsU0FBQSxDQUFBSSxDQUFBLElBQUFDLElBQUEsR0FBa0M7TUFBQSxJQUF2QkMsUUFBUSxHQUFBSixLQUFBLENBQUFLLEtBQUE7TUFDakJELFFBQVEsQ0FBQ0MsS0FBSyxHQUFHWCxXQUFXO0lBQzlCO0VBQUMsU0FBQVksR0FBQTtJQUFBUixTQUFBLENBQUFTLENBQUEsQ0FBQUQsR0FBQTtFQUFBO0lBQUFSLFNBQUEsQ0FBQVUsQ0FBQTtFQUFBO0FBQ0gsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dwdC1jaS8uL3NyYy9jb250ZW50c2NyaXB0LmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICBpZiAobWVzc2FnZS5pbnN0cnVjdGlvbikge1xyXG4gICAgICBzZXRJbnN0cnVjdGlvbkluVGV4dEFyZWFzKG1lc3NhZ2UuaW5zdHJ1Y3Rpb24udXNlcl9wcm9maWxlKTtcclxuICAgIH1cclxuICB9KTtcclxuICBcclxuICBmdW5jdGlvbiBzZXRJbnN0cnVjdGlvbkluVGV4dEFyZWFzKHVzZXJQcm9maWxlKSB7XHJcbiAgICBjb25zdCB0ZXh0QXJlYXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0ZXh0YXJlYScpO1xyXG4gICAgZm9yIChjb25zdCB0ZXh0QXJlYSBvZiB0ZXh0QXJlYXMpIHtcclxuICAgICAgdGV4dEFyZWEudmFsdWUgPSB1c2VyUHJvZmlsZTtcclxuICAgIH1cclxuICB9XHJcbiAgIl0sIm5hbWVzIjpbImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsIm1lc3NhZ2UiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJpbnN0cnVjdGlvbiIsInNldEluc3RydWN0aW9uSW5UZXh0QXJlYXMiLCJ1c2VyX3Byb2ZpbGUiLCJ1c2VyUHJvZmlsZSIsInRleHRBcmVhcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJzIiwibiIsImRvbmUiLCJ0ZXh0QXJlYSIsInZhbHVlIiwiZXJyIiwiZSIsImYiXSwic291cmNlUm9vdCI6IiJ9