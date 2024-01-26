/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************!*\
  !*** ./src/background.jsx ***!
  \****************************/
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(['customInstructions'], function (result) {
    var storedInstructions = result.customInstructions || [];
    if (storedInstructions.length === 0) {
      chrome.storage.sync.set({
        customInstructions: [ReactDeveloper, deepLearningExpert, golangLearner]
      });
    }
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBQSxNQUFNLENBQUNDLE9BQU8sQ0FBQ0MsV0FBVyxDQUFDQyxXQUFXLENBQUMsWUFBTTtFQUN6Q0gsTUFBTSxDQUFDSSxPQUFPLENBQUNDLElBQUksQ0FBQ0MsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxVQUFDQyxNQUFNLEVBQUs7SUFDMUQsSUFBTUMsa0JBQWtCLEdBQUdELE1BQU0sQ0FBQ0Usa0JBQWtCLElBQUksRUFBRTtJQUMxRCxJQUFJRCxrQkFBa0IsQ0FBQ0UsTUFBTSxLQUFLLENBQUMsRUFBRTtNQUNuQ1YsTUFBTSxDQUFDSSxPQUFPLENBQUNDLElBQUksQ0FBQ00sR0FBRyxDQUFDO1FBQUVGLGtCQUFrQixFQUFFLENBQUNHLGNBQWMsRUFBRUMsa0JBQWtCLEVBQUVDLGFBQWE7TUFBRSxDQUFDLENBQUM7SUFDdEc7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dwdC1jaS8uL3NyYy9iYWNrZ3JvdW5kLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChbJ2N1c3RvbUluc3RydWN0aW9ucyddLCAocmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0b3JlZEluc3RydWN0aW9ucyA9IHJlc3VsdC5jdXN0b21JbnN0cnVjdGlvbnMgfHwgW107XHJcbiAgICAgIGlmIChzdG9yZWRJbnN0cnVjdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBjdXN0b21JbnN0cnVjdGlvbnM6IFtSZWFjdERldmVsb3BlciwgZGVlcExlYXJuaW5nRXhwZXJ0LCBnb2xhbmdMZWFybmVyXSB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgIl0sIm5hbWVzIjpbImNocm9tZSIsInJ1bnRpbWUiLCJvbkluc3RhbGxlZCIsImFkZExpc3RlbmVyIiwic3RvcmFnZSIsInN5bmMiLCJnZXQiLCJyZXN1bHQiLCJzdG9yZWRJbnN0cnVjdGlvbnMiLCJjdXN0b21JbnN0cnVjdGlvbnMiLCJsZW5ndGgiLCJzZXQiLCJSZWFjdERldmVsb3BlciIsImRlZXBMZWFybmluZ0V4cGVydCIsImdvbGFuZ0xlYXJuZXIiXSwic291cmNlUm9vdCI6IiJ9