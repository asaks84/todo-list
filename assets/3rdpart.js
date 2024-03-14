"use strict";
(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["3rdpart"],{

/***/ 840:
/*!**************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/options */ 8);
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./l10n/default */ 853);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ 714);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/dom */ 682);
/* harmony import */ var _utils_dates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dates */ 947);
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/formatting */ 703);
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/polyfills */ 990);
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_utils_polyfills__WEBPACK_IMPORTED_MODULE_6__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};







var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
    var self = {
        config: __assign(__assign({}, _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults), flatpickr.defaultConfig),
        l10n: _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"],
    };
    self.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({ config: self.config, l10n: self.l10n });
    self._handlers = [];
    self.pluginElements = [];
    self.loadedPlugins = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self._positionCalendar = positionCalendar;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self.onMouseOver = onMouseOver;
    self._createElement = _utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement;
    self.createDay = createDay;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.updateValue = updateValue;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
            }
            updateValue(false);
        }
        setCalendarWidth();
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!self.isMobile && isSafari) {
            positionCalendar();
        }
        triggerEvent("onReady");
    }
    function getClosestActiveElement() {
        var _a;
        return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
            .activeElement || document.activeElement);
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function setCalendarWidth() {
        var config = self.config;
        if (config.weekNumbers === false && config.showMonths === 1) {
            return;
        }
        else if (config.noCalendar !== true) {
            window.requestAnimationFrame(function () {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.style.visibility = "hidden";
                    self.calendarContainer.style.display = "block";
                }
                if (self.daysContainer !== undefined) {
                    var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                    self.daysContainer.style.width = daysWidth + "px";
                    self.calendarContainer.style.width =
                        daysWidth +
                            (self.weekWrapper !== undefined
                                ? self.weekWrapper.offsetWidth
                                : 0) +
                            "px";
                    self.calendarContainer.style.removeProperty("visibility");
                    self.calendarContainer.style.removeProperty("display");
                }
            });
        }
    }
    function updateTime(e) {
        if (self.selectedDates.length === 0) {
            var defaultDate = self.config.minDate === undefined ||
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(new Date(), self.config.minDate) >= 0
                ? new Date()
                : new Date(self.config.minDate.getTime());
            var defaults = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config);
            defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
            self.selectedDates = [defaultDate];
            self.latestSelectedDateObj = defaultDate;
        }
        if (e !== undefined && e.type !== "blur") {
            timeWrapper(e);
        }
        var prevValue = self._input.value;
        setHoursFromInputs();
        updateValue();
        if (self._input.value !== prevValue) {
            self._debouncedChange();
        }
    }
    function ampm2military(hour, amPM) {
        return (hour % 12) + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(amPM === self.l10n.amPM[1]);
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined) {
            hours = ampm2military(hours, self.amPM.textContent);
        }
        var limitMinHours = self.config.minTime !== undefined ||
            (self.config.minDate &&
                self.minDateHasTime &&
                self.latestSelectedDateObj &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(self.latestSelectedDateObj, self.config.minDate, true) ===
                    0);
        var limitMaxHours = self.config.maxTime !== undefined ||
            (self.config.maxDate &&
                self.maxDateHasTime &&
                self.latestSelectedDateObj &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(self.latestSelectedDateObj, self.config.maxDate, true) ===
                    0);
        if (self.config.maxTime !== undefined &&
            self.config.minTime !== undefined &&
            self.config.minTime > self.config.maxTime) {
            var minBound = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
            var maxBound = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
            var currentTime = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.calculateSecondsSinceMidnight)(hours, minutes, seconds);
            if (currentTime > maxBound && currentTime < minBound) {
                var result = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.parseSeconds)(minBound);
                hours = result[0];
                minutes = result[1];
                seconds = result[2];
            }
        }
        else {
            if (limitMaxHours) {
                var maxTime = self.config.maxTime !== undefined
                    ? self.config.maxTime
                    : self.config.maxDate;
                hours = Math.min(hours, maxTime.getHours());
                if (hours === maxTime.getHours())
                    minutes = Math.min(minutes, maxTime.getMinutes());
                if (minutes === maxTime.getMinutes())
                    seconds = Math.min(seconds, maxTime.getSeconds());
            }
            if (limitMinHours) {
                var minTime = self.config.minTime !== undefined
                    ? self.config.minTime
                    : self.config.minDate;
                hours = Math.max(hours, minTime.getHours());
                if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                    minutes = minTime.getMinutes();
                if (minutes === minTime.getMinutes())
                    seconds = Math.max(seconds, minTime.getSeconds());
            }
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date && date instanceof Date) {
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        }
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(!self.config.time_24hr
            ? ((12 + hours) % 12) + 12 * (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(hours % 12 === 0)
            : hours);
        self.minuteElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(hours >= 12)];
        if (self.secondElement !== undefined)
            self.secondElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(seconds);
    }
    function onYearInput(event) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(event);
        var year = parseInt(eventTarget.value) + (event.delta || 0);
        if (year / 1000 > 1 ||
            (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
            changeYear(year);
        }
    }
    function bind(element, event, handler, options) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler, options); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler, options); });
        element.addEventListener(event, handler, options);
        self._handlers.push({
            remove: function () { return element.removeEventListener(event, handler, options); },
        });
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.debounce)(onResize, 50);
        self._debouncedChange = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.debounce)(triggerChange, DEBOUNCED_CHANGE_MS);
        if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
            bind(self.daysContainer, "mouseover", function (e) {
                if (self.config.mode === "range")
                    onMouseOver((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e));
            });
        bind(self._input, "keydown", onKeyDown);
        if (self.calendarContainer !== undefined) {
            bind(self.calendarContainer, "keydown", onKeyDown);
        }
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document, "touchstart", documentClick);
        else
            bind(window.document, "mousedown", documentClick);
        bind(window.document, "focus", documentClick, { capture: true });
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "click", self.open);
        }
        if (self.daysContainer !== undefined) {
            bind(self.monthNav, "click", onMonthNavClick);
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "click", selectDate);
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e).select();
            };
            bind(self.timeContainer, ["increment"], updateTime);
            bind(self.timeContainer, "blur", updateTime, { capture: true });
            bind(self.timeContainer, "click", timeIncrement);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "click", function (e) {
                    updateTime(e);
                });
            }
        }
        if (self.config.allowInput) {
            bind(self._input, "blur", onBlur);
        }
    }
    function jumpToDate(jumpDate, triggerChange) {
        var jumpTo = jumpDate !== undefined
            ? self.parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        var oldYear = self.currentYear;
        var oldMonth = self.currentMonth;
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            e.message = "Invalid date supplied: " + jumpTo;
            self.config.errorHandler(e);
        }
        if (triggerChange && self.currentYear !== oldYear) {
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        if (triggerChange &&
            (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
            triggerEvent("onMonthChange");
        }
        self.redraw();
    }
    function timeIncrement(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        if (~eventTarget.className.indexOf("arrow"))
            incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rangeMode", self.config.mode === "range");
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "animate", self.config.animate === true);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined &&
            self.config.appendTo.nodeType !== undefined;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, _dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (className.indexOf("hidden") === -1 &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
            dayElement.setAttribute("aria-current", "date");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(dayElement, "startRange", self.selectedDates[0] &&
                        (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[0], true) === 0);
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(dayElement, "endRange", self.selectedDates[1] &&
                        (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[1], true) === 0);
                    if (className === "nextMonthDay")
                        dayElement.classList.add("inRange");
                }
            }
        }
        else {
            dayElement.classList.add("flatpickr-disabled");
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
        }
        if (self.weekNumbers &&
            self.config.showMonths === 1 &&
            className !== "prevMonthDay" &&
            i % 7 === 6) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDayElem(targetNode) {
        targetNode.focus();
        if (self.config.mode === "range")
            onMouseOver(targetNode);
    }
    function getFirstAvailableDay(delta) {
        var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
        var endMonth = delta > 0 ? self.config.showMonths : -1;
        for (var m = startMonth; m != endMonth; m += delta) {
            var month = self.daysContainer.children[m];
            var startIndex = delta > 0 ? 0 : month.children.length - 1;
            var endIndex = delta > 0 ? month.children.length : -1;
            for (var i = startIndex; i != endIndex; i += delta) {
                var c = month.children[i];
                if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                    return c;
            }
        }
        return undefined;
    }
    function getNextAvailableDay(current, delta) {
        var givenMonth = current.className.indexOf("Month") === -1
            ? current.dateObj.getMonth()
            : self.currentMonth;
        var endMonth = delta > 0 ? self.config.showMonths : -1;
        var loopDelta = delta > 0 ? 1 : -1;
        for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
            var month = self.daysContainer.children[m];
            var startIndex = givenMonth - self.currentMonth === m
                ? current.$i + delta
                : delta < 0
                    ? month.children.length - 1
                    : 0;
            var numMonthDays = month.children.length;
            for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                var c = month.children[i];
                if (c.className.indexOf("hidden") === -1 &&
                    isEnabled(c.dateObj) &&
                    Math.abs(current.$i - i) >= Math.abs(delta))
                    return focusOnDayElem(c);
            }
        }
        self.changeMonth(loopDelta);
        focusOnDay(getFirstAvailableDay(loopDelta), 0);
        return undefined;
    }
    function focusOnDay(current, offset) {
        var activeElement = getClosestActiveElement();
        var dayFocused = isInView(activeElement || document.body);
        var startElem = current !== undefined
            ? current
            : dayFocused
                ? activeElement
                : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                    ? self.selectedDateElem
                    : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                        ? self.todayDateElem
                        : getFirstAvailableDay(offset > 0 ? 1 : -1);
        if (startElem === undefined) {
            self._input.focus();
        }
        else if (!dayFocused) {
            focusOnDayElem(startElem);
        }
        else {
            getNextAvailableDay(startElem, offset);
        }
    }
    function buildMonthDays(year, month) {
        var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
        var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
        var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
            (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
            days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        var dayContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "dayContainer");
        dayContainer.appendChild(days);
        return dayContainer;
    }
    function buildDays() {
        if (self.daysContainer === undefined) {
            return;
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.daysContainer);
        if (self.weekNumbers)
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.weekNumbers);
        var frag = document.createDocumentFragment();
        for (var i = 0; i < self.config.showMonths; i++) {
            var d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
        }
        self.daysContainer.appendChild(frag);
        self.days = self.daysContainer.firstChild;
        if (self.config.mode === "range" && self.selectedDates.length === 1) {
            onMouseOver();
        }
    }
    function buildMonthSwitch() {
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType !== "dropdown")
            return;
        var shouldBuildMonth = function (month) {
            if (self.config.minDate !== undefined &&
                self.currentYear === self.config.minDate.getFullYear() &&
                month < self.config.minDate.getMonth()) {
                return false;
            }
            return !(self.config.maxDate !== undefined &&
                self.currentYear === self.config.maxDate.getFullYear() &&
                month > self.config.maxDate.getMonth());
        };
        self.monthsDropdownContainer.tabIndex = -1;
        self.monthsDropdownContainer.innerHTML = "";
        for (var i = 0; i < 12; i++) {
            if (!shouldBuildMonth(i))
                continue;
            var month = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("option", "flatpickr-monthDropdown-month");
            month.value = new Date(self.currentYear, i).getMonth().toString();
            month.textContent = (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_5__.monthToStr)(i, self.config.shorthandCurrentMonth, self.l10n);
            month.tabIndex = -1;
            if (self.currentMonth === i) {
                month.selected = true;
            }
            self.monthsDropdownContainer.appendChild(month);
        }
    }
    function buildMonth() {
        var container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-month");
        var monthNavFragment = window.document.createDocumentFragment();
        var monthElement;
        if (self.config.showMonths > 1 ||
            self.config.monthSelectorType === "static") {
            monthElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "cur-month");
        }
        else {
            self.monthsDropdownContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("select", "flatpickr-monthDropdown-months");
            self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
            bind(self.monthsDropdownContainer, "change", function (e) {
                var target = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
                var selectedMonth = parseInt(target.value, 10);
                self.changeMonth(selectedMonth - self.currentMonth);
                triggerEvent("onMonthChange");
            });
            buildMonthSwitch();
            monthElement = self.monthsDropdownContainer;
        }
        var yearInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("cur-year", { tabindex: "-1" });
        var yearElement = yearInput.getElementsByTagName("input")[0];
        yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
        if (self.config.minDate) {
            yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
        }
        if (self.config.maxDate) {
            yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
            yearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        var currentMonth = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-current-month");
        currentMonth.appendChild(monthElement);
        currentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(currentMonth);
        container.appendChild(monthNavFragment);
        return {
            container: container,
            yearElement: yearElement,
            monthElement: monthElement,
        };
    }
    function buildMonths() {
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.monthNav);
        self.monthNav.appendChild(self.prevMonthNav);
        if (self.config.showMonths) {
            self.yearElements = [];
            self.monthElements = [];
        }
        for (var m = self.config.showMonths; m--;) {
            var month = buildMonth();
            self.yearElements.push(month.yearElement);
            self.monthElements.push(month.monthElement);
            self.monthNav.appendChild(month.container);
        }
        self.monthNav.appendChild(self.nextMonthNav);
    }
    function buildMonthNav() {
        self.monthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-months");
        self.yearElements = [];
        self.monthElements = [];
        self.prevMonthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.nextMonthNav = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        buildMonths();
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool) {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.prevMonthNav, "flatpickr-disabled", bool);
                    self.__hidePrevMonthArrow = bool;
                }
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool) {
                    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.nextMonthNav, "flatpickr-disabled", bool);
                    self.__hideNextMonthArrow = bool;
                }
            },
        });
        self.currentYearElement = self.yearElements[0];
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        var defaults = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config);
        self.timeContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-time-separator", ":");
        var hourInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-hour", {
            "aria-label": self.l10n.hourAriaLabel,
        });
        self.hourElement = hourInput.getElementsByTagName("input")[0];
        var minuteInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-minute", {
            "aria-label": self.l10n.minuteAriaLabel,
        });
        self.minuteElement = minuteInput.getElementsByTagName("input")[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? defaults.hours
                : military2ampm(defaults.hours));
        self.minuteElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : defaults.minutes);
        self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
        self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
        self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
        self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
        self.hourElement.setAttribute("maxlength", "2");
        self.minuteElement.setAttribute("min", "0");
        self.minuteElement.setAttribute("max", "59");
        self.minuteElement.setAttribute("maxlength", "2");
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createNumberInput)("flatpickr-second");
            self.secondElement = secondInput.getElementsByTagName("input")[0];
            self.secondElement.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : defaults.seconds);
            self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
            self.secondElement.setAttribute("min", "0");
            self.secondElement.setAttribute("max", "59");
            self.secondElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-am-pm", self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekdays");
        else
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.clearNode)(self.weekdayContainer);
        for (var i = self.config.showMonths; i--;) {
            var container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekdaycontainer");
            self.weekdayContainer.appendChild(container);
        }
        updateWeekdays();
        return self.weekdayContainer;
    }
    function updateWeekdays() {
        if (!self.weekdayContainer) {
            return;
        }
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
        }
        for (var i = self.config.showMonths; i--;) {
            self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
        }
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, isOffset) {
        if (isOffset === void 0) { isOffset = true; }
        var delta = isOffset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow === true) ||
            (delta > 0 && self._hideNextMonthArrow === true))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
        buildDays();
        triggerEvent("onMonthChange");
        updateNavigationCurrentMonth();
    }
    function clear(triggerChangeEvent, toInitial) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        if (toInitial === void 0) { toInitial = true; }
        self.input.value = "";
        if (self.altInput !== undefined)
            self.altInput.value = "";
        if (self.mobileInput !== undefined)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        if (toInitial === true) {
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
        }
        if (self.config.enableTime === true) {
            var _a = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.getDefaultHours)(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
            setHours(hours, minutes, seconds);
        }
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            if (self.calendarContainer !== undefined) {
                self.calendarContainer.classList.remove("open");
            }
            if (self._input !== undefined) {
                self._input.classList.remove("active");
            }
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            self._handlers[i].remove();
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode) {
            if (self.config.static && self.calendarContainer.parentNode) {
                var wrapper = self.calendarContainer.parentNode;
                wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                if (wrapper.parentNode) {
                    while (wrapper.firstChild)
                        wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
            }
            else
                self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        }
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "monthsDropdownContainer",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var eventTarget_1 = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
            var isCalendarElement = isCalendarElem(eventTarget_1);
            var isInput = eventTarget_1 === self.input ||
                eventTarget_1 === self.altInput ||
                self.element.contains(eventTarget_1) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = !isInput &&
                !isCalendarElement &&
                !isCalendarElem(e.relatedTarget);
            var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                return elem.contains(eventTarget_1);
            });
            if (lostFocus && isIgnored) {
                if (self.config.allowInput) {
                    self.setDate(self._input.value, false, self.config.altInput
                        ? self.config.altFormat
                        : self.config.dateFormat);
                }
                if (self.timeContainer !== undefined &&
                    self.minuteElement !== undefined &&
                    self.hourElement !== undefined &&
                    self.input.value !== "" &&
                    self.input.value !== undefined) {
                    updateTime();
                }
                self.close();
                if (self.config &&
                    self.config.mode === "range" &&
                    self.selectedDates.length === 1)
                    self.clear(false);
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
            (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
            buildMonthSwitch();
        }
    }
    function isEnabled(date, timeless) {
        var _a;
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable && self.config.disable.length === 0)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string") {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function isInView(elem) {
        if (self.daysContainer !== undefined)
            return (elem.className.indexOf("hidden") === -1 &&
                elem.className.indexOf("flatpickr-disabled") === -1 &&
                self.daysContainer.contains(elem));
        return false;
    }
    function onBlur(e) {
        var isInput = e.target === self._input;
        var valueChanged = self._input.value.trimEnd() !== getDateStr();
        if (isInput &&
            valueChanged &&
            !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
            self.setDate(self._input.value, true, e.target === self.altInput
                ? self.config.altFormat
                : self.config.dateFormat);
        }
    }
    function onKeyDown(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var isInput = self.config.wrap
            ? element.contains(eventTarget)
            : eventTarget === self._input;
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.keyCode === 13 && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, eventTarget === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                self.close();
                return eventTarget.blur();
            }
            else {
                self.open();
            }
        }
        else if (isCalendarElem(eventTarget) ||
            allowKeydown ||
            allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(eventTarget);
            switch (e.keyCode) {
                case 13:
                    if (isTimeObj) {
                        e.preventDefault();
                        updateTime();
                        focusAndClose();
                    }
                    else
                        selectDate(e);
                    break;
                case 27:
                    e.preventDefault();
                    focusAndClose();
                    break;
                case 8:
                case 46:
                    if (isInput && !self.config.allowInput) {
                        e.preventDefault();
                        self.clear();
                    }
                    break;
                case 37:
                case 39:
                    if (!isTimeObj && !isInput) {
                        e.preventDefault();
                        var activeElement = getClosestActiveElement();
                        if (self.daysContainer !== undefined &&
                            (allowInput === false ||
                                (activeElement && isInView(activeElement)))) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(undefined, delta_1);
                            else {
                                e.stopPropagation();
                                changeMonth(delta_1);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if ((self.daysContainer &&
                        eventTarget.$i !== undefined) ||
                        eventTarget === self.input ||
                        eventTarget === self.altInput) {
                        if (e.ctrlKey) {
                            e.stopPropagation();
                            changeYear(self.currentYear - delta);
                            focusOnDay(getFirstAvailableDay(1), 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(undefined, delta * 7);
                    }
                    else if (eventTarget === self.currentYearElement) {
                        changeYear(self.currentYear - delta);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case 9:
                    if (isTimeObj) {
                        var elems = [
                            self.hourElement,
                            self.minuteElement,
                            self.secondElement,
                            self.amPM,
                        ]
                            .concat(self.pluginElements)
                            .filter(function (x) { return x; });
                        var i = elems.indexOf(eventTarget);
                        if (i !== -1) {
                            var target = elems[i + (e.shiftKey ? -1 : 1)];
                            e.preventDefault();
                            (target || self._input).focus();
                        }
                    }
                    else if (!self.config.noCalendar &&
                        self.daysContainer &&
                        self.daysContainer.contains(eventTarget) &&
                        e.shiftKey) {
                        e.preventDefault();
                        self._input.focus();
                    }
                    break;
                default:
                    break;
            }
        }
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            switch (e.key) {
                case self.l10n.amPM[0].charAt(0):
                case self.l10n.amPM[0].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[0];
                    setHoursFromInputs();
                    updateValue();
                    break;
                case self.l10n.amPM[1].charAt(0):
                case self.l10n.amPM[1].charAt(0).toLowerCase():
                    self.amPM.textContent = self.l10n.amPM[1];
                    setHoursFromInputs();
                    updateValue();
                    break;
            }
        }
        if (isInput || isCalendarElem(eventTarget)) {
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem, cellClass) {
        if (cellClass === void 0) { cellClass = "flatpickr-day"; }
        if (self.selectedDates.length !== 1 ||
            (elem &&
                (!elem.classList.contains(cellClass) ||
                    elem.classList.contains("flatpickr-disabled"))))
            return;
        var hoverDate = elem
            ? elem.dateObj.getTime()
            : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
        var containsDisabled = false;
        var minRange = 0, maxRange = 0;
        for (var t = rangeStartDate; t < rangeEndDate; t += _utils_dates__WEBPACK_IMPORTED_MODULE_4__.duration.DAY) {
            if (!isEnabled(new Date(t), true)) {
                containsDisabled =
                    containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                if (t < initialDate && (!minRange || t > minRange))
                    minRange = t;
                else if (t > initialDate && (!maxRange || t < maxRange))
                    maxRange = t;
            }
        }
        var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
        hoverableCells.forEach(function (dayElem) {
            var date = dayElem.dateObj;
            var timestamp = date.getTime();
            var outOfRange = (minRange > 0 && timestamp < minRange) ||
                (maxRange > 0 && timestamp > maxRange);
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return;
            }
            else if (containsDisabled && !outOfRange)
                return;
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            if (elem !== undefined) {
                elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                    ? "startRange"
                    : "endRange");
                if (initialDate < hoverDate && timestamp === initialDate)
                    dayElem.classList.add("startRange");
                else if (initialDate > hoverDate && timestamp === initialDate)
                    dayElem.classList.add("endRange");
                if (timestamp >= minRange &&
                    (maxRange === 0 || timestamp <= maxRange) &&
                    (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.isBetween)(timestamp, initialDate, hoverDate))
                    dayElem.classList.add("inRange");
            }
        });
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._positionElement; }
        if (self.isMobile === true) {
            if (e) {
                e.preventDefault();
                var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
                if (eventTarget) {
                    eventTarget.blur();
                }
            }
            if (self.mobileInput !== undefined) {
                self.mobileInput.focus();
                self.mobileInput.click();
            }
            triggerEvent("onOpen");
            return;
        }
        else if (self._input.disabled || self.config.inline) {
            return;
        }
        var wasOpen = self.isOpen;
        self.isOpen = true;
        if (!wasOpen) {
            self.calendarContainer.classList.add("open");
            self._input.classList.add("active");
            triggerEvent("onOpen");
            positionCalendar(positionElement);
        }
        if (self.config.enableTime === true && self.config.noCalendar === true) {
            if (self.config.allowInput === false &&
                (e === undefined ||
                    !self.timeContainer.contains(e.relatedTarget))) {
                setTimeout(function () { return self.hourElement.select(); }, 50);
            }
        }
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "allowInvalidPreload",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
        var formats = {};
        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        var timeMode = userConfig.mode === "time";
        if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
            var defaultDateFormat = flatpickr.defaultConfig.dateFormat || _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults.dateFormat;
            formats.dateFormat =
                userConfig.noCalendar || timeMode
                    ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                    : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput &&
            (userConfig.enableTime || timeMode) &&
            !userConfig.altFormat) {
            var defaultAltFormat = flatpickr.defaultConfig.altFormat || _types_options__WEBPACK_IMPORTED_MODULE_0__.defaults.altFormat;
            formats.altFormat =
                userConfig.noCalendar || timeMode
                    ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                    : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        var minMaxTimeSetter = function (type) { return function (val) {
            self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
        }; };
        Object.defineProperty(self.config, "minTime", {
            get: function () { return self.config._minTime; },
            set: minMaxTimeSetter("min"),
        });
        Object.defineProperty(self.config, "maxTime", {
            get: function () { return self.config._maxTime; },
            set: minMaxTimeSetter("max"),
        });
        if (userConfig.mode === "time") {
            self.config.noCalendar = true;
            self.config.enableTime = true;
        }
        Object.assign(self.config, formats, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        _types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
            self.config[hook] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(self.config[hook] || []).map(bindToInstance);
        });
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (_types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.indexOf(key) > -1) {
                    self.config[key] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        if (!userConfig.altInputClass) {
            self.config.altInputClass =
                getInputElem().className + " " + self.config.altInputClass;
        }
        triggerEvent("onParseConfig");
    }
    function getInputElem() {
        return self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
        self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined));
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
        _utils_formatting__WEBPACK_IMPORTED_MODULE_5__.tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
        var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
        if (userConfig.time_24hr === undefined &&
            flatpickr.defaultConfig.time_24hr === undefined) {
            self.config.time_24hr = self.l10n.time_24hr;
        }
        self.formatDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateFormatter)(self);
        self.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({ config: self.config, l10n: self.l10n });
    }
    function positionCalendar(customPositionElement) {
        if (typeof self.config.position === "function") {
            return void self.config.position(self, customPositionElement);
        }
        if (self.calendarContainer === undefined)
            return;
        triggerEvent("onPreCalendarPosition");
        var positionElement = customPositionElement || self._positionElement;
        var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
            (configPosVertical !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowTop", !showOnTop);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var isCenter = false;
        var isRight = false;
        if (configPosHorizontal === "center") {
            left -= (calendarWidth - inputBounds.width) / 2;
            isCenter = true;
        }
        else if (configPosHorizontal === "right") {
            left -= calendarWidth - inputBounds.width;
            isRight = true;
        }
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowCenter", isCenter);
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "arrowRight", isRight);
        var right = window.document.body.offsetWidth -
            (window.pageXOffset + inputBounds.right);
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        var centerMost = right + calendarWidth > window.document.body.offsetWidth;
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else if (!centerMost) {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
        else {
            var doc = getDocumentStyleSheet();
            if (doc === undefined)
                return;
            var bodyWidth = window.document.body.offsetWidth;
            var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
            var centerBefore = ".flatpickr-calendar.centerMost:before";
            var centerAfter = ".flatpickr-calendar.centerMost:after";
            var centerIndex = doc.cssRules.length;
            var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "rightMost", false);
            (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.toggleClass)(self.calendarContainer, "centerMost", true);
            doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
            self.calendarContainer.style.left = centerLeft + "px";
            self.calendarContainer.style.right = "auto";
        }
    }
    function getDocumentStyleSheet() {
        var editableSheet = null;
        for (var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (!sheet.cssRules)
                continue;
            try {
                sheet.cssRules;
            }
            catch (err) {
                continue;
            }
            editableSheet = sheet;
            break;
        }
        return editableSheet != null ? editableSheet : createStyleSheet();
    }
    function createStyleSheet() {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildMonthSwitch();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function focusAndClose() {
        self._input.focus();
        if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            navigator.msMaxTouchPoints !== undefined) {
            setTimeout(self.close, 0);
        }
        else {
            self.close();
        }
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("flatpickr-disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.findParent)((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e), isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
            selectedDate.getMonth() >
                self.currentMonth + self.config.showMonths - 1) &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2) {
                self.clear(false, false);
            }
            self.latestSelectedDateObj = selectedDate;
            self.selectedDates.push(selectedDate);
            if ((0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            triggerEvent("onMonthChange");
        }
        updateNavigationCurrentMonth();
        buildDays();
        updateValue();
        if (!shouldChangeMonth &&
            self.config.mode !== "range" &&
            self.config.showMonths === 1)
            focusOnDayElem(target);
        else if (self.selectedDateElem !== undefined &&
            self.hourElement === undefined) {
            self.selectedDateElem && self.selectedDateElem.focus();
        }
        if (self.hourElement !== undefined)
            self.hourElement !== undefined && self.hourElement.focus();
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range) {
                focusAndClose();
            }
        }
        triggerChange();
    }
    var CALLBACKS = {
        locale: [setupLocale, updateWeekdays],
        showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
        minDate: [jumpToDate],
        maxDate: [jumpToDate],
        positionElement: [updatePositionElement],
        clickOpens: [
            function () {
                if (self.config.clickOpens === true) {
                    bind(self._input, "focus", self.open);
                    bind(self._input, "click", self.open);
                }
                else {
                    self._input.removeEventListener("focus", self.open);
                    self._input.removeEventListener("click", self.open);
                }
            },
        ],
    };
    function set(option, value) {
        if (option !== null && typeof option === "object") {
            Object.assign(self.config, option);
            for (var key in option) {
                if (CALLBACKS[key] !== undefined)
                    CALLBACKS[key].forEach(function (x) { return x(); });
            }
        }
        else {
            self.config[option] = value;
            if (CALLBACKS[option] !== undefined)
                CALLBACKS[option].forEach(function (x) { return x(); });
            else if (_types_options__WEBPACK_IMPORTED_MODULE_0__.HOOKS.indexOf(option) > -1)
                self.config[option] = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.arrayify)(value);
        }
        self.redraw();
        updateValue(true);
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                case "time":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split(self.config.conjunction)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        else
            self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
        self.selectedDates = (self.config.allowInvalidPreload
            ? dates
            : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
        if (self.config.mode === "range")
            self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = self.config.dateFormat; }
        if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.latestSelectedDateObj =
            self.selectedDates[self.selectedDates.length - 1];
        self.redraw();
        jumpToDate(undefined, triggerChange);
        setHoursFromDate();
        if (self.selectedDates.length === 0) {
            self.clear(false);
        }
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .slice()
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = self.parseDate(self.config.now) || new Date();
        var preloadedDate = self.config.defaultDate ||
            ((self.input.nodeName === "INPUT" ||
                self.input.nodeName === "TEXTAREA") &&
                self.input.placeholder &&
                self.input.value === self.input.placeholder
                ? null
                : self.input.value);
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        self._initialDate =
            self.selectedDates.length > 0
                ? self.selectedDates[0]
                : self.config.minDate &&
                    self.config.minDate.getTime() > self.now.getTime()
                    ? self.config.minDate
                    : self.config.maxDate &&
                        self.config.maxDate.getTime() < self.now.getTime()
                        ? self.config.maxDate
                        : self.now;
        self.currentYear = self._initialDate.getFullYear();
        self.currentMonth = self._initialDate.getMonth();
        if (self.selectedDates.length > 0)
            self.latestSelectedDateObj = self.selectedDates[0];
        if (self.config.minTime !== undefined)
            self.config.minTime = self.parseDate(self.config.minTime, "H:i");
        if (self.config.maxTime !== undefined)
            self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
    }
    function setupInputs() {
        self.input = getInputElem();
        if (!self.input) {
            self.config.errorHandler(new Error("Invalid input element specified"));
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)(self.input.nodeName, self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.tabIndex = self.input.tabIndex;
            self.altInput.type = "text";
            self.input.setAttribute("type", "hidden");
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        updatePositionElement();
    }
    function updatePositionElement() {
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar
                ? "time"
                : "datetime-local"
            : "date";
        self.mobileInput = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.createElement)("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.required = self.input.required;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date"
                    ? "Y-m-d"
                    : "H:i:S";
        if (self.selectedDates.length > 0) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        if (self.input.getAttribute("step"))
            self.mobileInput.step = String(self.input.getAttribute("step"));
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        bind(self.mobileInput, "change", function (e) {
            self.setDate((0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e).value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle(e) {
        if (self.isOpen === true)
            return self.close();
        self.open(e);
    }
    function triggerEvent(event, data) {
        if (self.config === undefined)
            return;
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            var selectedDate = self.selectedDates[i];
            if (selectedDate instanceof Date &&
                (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(selectedDate, date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return ((0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[0]) >= 0 &&
            (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates)(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.yearElements.forEach(function (yearElement, i) {
            var d = new Date(self.currentYear, self.currentMonth, 1);
            d.setMonth(self.currentMonth + i);
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType === "static") {
                self.monthElements[i].textContent =
                    (0,_utils_formatting__WEBPACK_IMPORTED_MODULE_5__.monthToStr)(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
            }
            else {
                self.monthsDropdownContainer.value = d.getMonth().toString();
            }
            yearElement.value = d.getFullYear().toString();
        });
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function getDateStr(specificFormat) {
        var format = specificFormat ||
            (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
        return self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, format); })
            .filter(function (d, i, arr) {
            return self.config.mode !== "range" ||
                self.config.enableTime ||
                arr.indexOf(d) === i;
        })
            .join(self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator);
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        self.input.value = getDateStr(self.config.dateFormat);
        if (self.altInput !== undefined) {
            self.altInput.value = getDateStr(self.config.altFormat);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
        var eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e);
        var isPrevMonth = self.prevMonthNav.contains(eventTarget);
        var isNextMonth = self.nextMonthNav.contains(eventTarget);
        if (isPrevMonth || isNextMonth) {
            changeMonth(isPrevMonth ? -1 : 1);
        }
        else if (self.yearElements.indexOf(eventTarget) >= 0) {
            eventTarget.select();
        }
        else if (eventTarget.classList.contains("arrowUp")) {
            self.changeYear(self.currentYear + 1);
        }
        else if (eventTarget.classList.contains("arrowDown")) {
            self.changeYear(self.currentYear - 1);
        }
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", eventTarget = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_3__.getEventTarget)(e), input = eventTarget;
        if (self.amPM !== undefined && eventTarget === self.amPM) {
            self.amPM.textContent =
                self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(self.amPM.textContent === self.l10n.amPM[0])];
        }
        var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!isHourElem) +
                        ((0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(isHourElem) && (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - (0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step)) {
                self.amPM.textContent =
                    self.l10n.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_2__.int)(self.amPM.textContent === self.l10n.amPM[0])];
            }
            input.value = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.pad)(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice
        .call(nodeList)
        .filter(function (x) { return x instanceof HTMLElement; });
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.error(e);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined" &&
    typeof HTMLCollection !== "undefined" &&
    typeof NodeList !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr = function (selector, config) {
    if (typeof selector === "string") {
        return _flatpickr(window.document.querySelectorAll(selector), config);
    }
    else if (selector instanceof Node) {
        return _flatpickr([selector], config);
    }
    else {
        return _flatpickr(selector, config);
    }
};
flatpickr.defaultConfig = {};
flatpickr.l10ns = {
    en: __assign({}, _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"]),
    default: __assign({}, _l10n_default__WEBPACK_IMPORTED_MODULE_1__["default"]),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
};
flatpickr.parseDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateParser)({});
flatpickr.formatDate = (0,_utils_dates__WEBPACK_IMPORTED_MODULE_4__.createDateFormatter)({});
flatpickr.compareDates = _utils_dates__WEBPACK_IMPORTED_MODULE_4__.compareDates;
if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
if (typeof window !== "undefined") {
    window.flatpickr = flatpickr;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flatpickr);


/***/ }),

/***/ 853:
/*!*********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/l10n/default.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   english: () => (/* binding */ english)
/* harmony export */ });
var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
    yearAriaLabel: "Year",
    monthAriaLabel: "Month",
    hourAriaLabel: "Hour",
    minuteAriaLabel: "Minute",
    time_24hr: false,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (english);


/***/ }),

/***/ 8:
/*!**********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/types/options.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HOOKS: () => (/* binding */ HOOKS),
/* harmony export */   defaults: () => (/* binding */ defaults)
/* harmony export */ });
var HOOKS = [
    "onChange",
    "onClose",
    "onDayCreate",
    "onDestroy",
    "onKeyDown",
    "onMonthChange",
    "onOpen",
    "onParseConfig",
    "onReady",
    "onValueUpdate",
    "onYearChange",
    "onPreCalendarPosition",
];
var defaults = {
    _disable: [],
    allowInput: false,
    allowInvalidPreload: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    autoFillDefaultTime: true,
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enableSeconds: false,
    enableTime: false,
    errorHandler: function (err) {
        return typeof console !== "undefined" && console.warn(err);
    },
    getWeek: function (givenDate) {
        var date = new Date(givenDate.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        var week1 = new Date(date.getFullYear(), 0, 4);
        return (1 +
            Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7));
    },
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    monthSelectorType: "dropdown",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    now: new Date(),
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    showMonths: 1,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};


/***/ }),

/***/ 947:
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dates.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateSecondsSinceMidnight: () => (/* binding */ calculateSecondsSinceMidnight),
/* harmony export */   compareDates: () => (/* binding */ compareDates),
/* harmony export */   compareTimes: () => (/* binding */ compareTimes),
/* harmony export */   createDateFormatter: () => (/* binding */ createDateFormatter),
/* harmony export */   createDateParser: () => (/* binding */ createDateParser),
/* harmony export */   duration: () => (/* binding */ duration),
/* harmony export */   getDefaultHours: () => (/* binding */ getDefaultHours),
/* harmony export */   isBetween: () => (/* binding */ isBetween),
/* harmony export */   parseSeconds: () => (/* binding */ parseSeconds)
/* harmony export */ });
/* harmony import */ var _formatting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatting */ 703);
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/options */ 8);
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../l10n/default */ 853);



var createDateFormatter = function (_a) {
    var _b = _a.config, config = _b === void 0 ? _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? _l10n_default__WEBPACK_IMPORTED_MODULE_2__.english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
    return function (dateObj, frmt, overrideLocale) {
        var locale = overrideLocale || l10n;
        if (config.formatDate !== undefined && !isMobile) {
            return config.formatDate(dateObj, frmt, locale);
        }
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return _formatting__WEBPACK_IMPORTED_MODULE_0__.formats[c] && arr[i - 1] !== "\\"
                ? _formatting__WEBPACK_IMPORTED_MODULE_0__.formats[c](dateObj, locale, config)
                : c !== "\\"
                    ? c
                    : "";
        })
            .join("");
    };
};
var createDateParser = function (_a) {
    var _b = _a.config, config = _b === void 0 ? _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? _l10n_default__WEBPACK_IMPORTED_MODULE_2__.english : _c;
    return function (date, givenFormat, timeless, customLocale) {
        if (date !== 0 && !date)
            return undefined;
        var locale = customLocale || l10n;
        var parsedDate;
        var dateOrig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (config || _types_options__WEBPACK_IMPORTED_MODULE_1__.defaults).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (config && config.parseDate) {
                parsedDate = config.parseDate(date, format);
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr)) {
                parsedDate = new Date(date);
            }
            else {
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (_formatting__WEBPACK_IMPORTED_MODULE_0__.tokenRegex[token] && !escaped) {
                        regexStr += _formatting__WEBPACK_IMPORTED_MODULE_0__.tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: _formatting__WEBPACK_IMPORTED_MODULE_0__.revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                }
                parsedDate =
                    !config || !config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                ops.forEach(function (_a) {
                    var fn = _a.fn, val = _a.val;
                    return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                });
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
            config.errorHandler(new Error("Invalid date provided: " + dateOrig));
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    };
};
function compareDates(date1, date2, timeless) {
    if (timeless === void 0) { timeless = true; }
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
function compareTimes(date1, date2) {
    return (3600 * (date1.getHours() - date2.getHours()) +
        60 * (date1.getMinutes() - date2.getMinutes()) +
        date1.getSeconds() -
        date2.getSeconds());
}
var isBetween = function (ts, ts1, ts2) {
    return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
};
var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
};
var parseSeconds = function (secondsSinceMidnight) {
    var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
    return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
};
var duration = {
    DAY: 86400000,
};
function getDefaultHours(config) {
    var hours = config.defaultHour;
    var minutes = config.defaultMinute;
    var seconds = config.defaultSeconds;
    if (config.minDate !== undefined) {
        var minHour = config.minDate.getHours();
        var minMinutes = config.minDate.getMinutes();
        var minSeconds = config.minDate.getSeconds();
        if (hours < minHour) {
            hours = minHour;
        }
        if (hours === minHour && minutes < minMinutes) {
            minutes = minMinutes;
        }
        if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
            seconds = config.minDate.getSeconds();
    }
    if (config.maxDate !== undefined) {
        var maxHr = config.maxDate.getHours();
        var maxMinutes = config.maxDate.getMinutes();
        hours = Math.min(hours, maxHr);
        if (hours === maxHr)
            minutes = Math.min(maxMinutes, minutes);
        if (hours === maxHr && minutes === maxMinutes)
            seconds = config.maxDate.getSeconds();
    }
    return { hours: hours, minutes: minutes, seconds: seconds };
}


/***/ }),

/***/ 682:
/*!******************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dom.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearNode: () => (/* binding */ clearNode),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   createNumberInput: () => (/* binding */ createNumberInput),
/* harmony export */   findParent: () => (/* binding */ findParent),
/* harmony export */   getEventTarget: () => (/* binding */ getEventTarget),
/* harmony export */   toggleClass: () => (/* binding */ toggleClass)
/* harmony export */ });
function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName, opts) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
        numInput.type = "number";
    }
    else {
        numInput.type = "text";
        numInput.pattern = "\\d*";
    }
    if (opts !== undefined)
        for (var key in opts)
            numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}
function getEventTarget(event) {
    try {
        if (typeof event.composedPath === "function") {
            var path = event.composedPath();
            return path[0];
        }
        return event.target;
    }
    catch (error) {
        return event.target;
    }
}


/***/ }),

/***/ 703:
/*!*************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/formatting.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formats: () => (/* binding */ formats),
/* harmony export */   monthToStr: () => (/* binding */ monthToStr),
/* harmony export */   revFormat: () => (/* binding */ revFormat),
/* harmony export */   tokenRegex: () => (/* binding */ tokenRegex)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 714);

var doNothing = function () { return undefined; };
var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var revFormat = {
    D: doNothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM, locale) {
        dateObj.setHours((dateObj.getHours() % 12) +
            12 * (0,_utils__WEBPACK_IMPORTED_MODULE_0__.int)(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum, locale) {
        var weekNumber = parseInt(weekNum);
        var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
        date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
        return date;
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    u: function (_, unixMillSeconds) {
        return new Date(parseFloat(unixMillSeconds));
    },
    w: doNothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "",
    F: "",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    u: "(.+)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(formats.h(date, locale, options));
    },
    H: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date, locale) { return locale.amPM[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.int)(date.getHours() > 11)]; },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getFullYear(), 4); },
    d: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pad)(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    u: function (date) { return date.getTime(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};


/***/ }),

/***/ 714:
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayify: () => (/* binding */ arrayify),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   int: () => (/* binding */ int),
/* harmony export */   pad: () => (/* binding */ pad)
/* harmony export */ });
var pad = function (number, length) {
    if (length === void 0) { length = 2; }
    return ("000" + number).slice(length * -1);
};
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(fn, wait) {
    var t;
    return function () {
        var _this = this;
        var args = arguments;
        clearTimeout(t);
        t = setTimeout(function () { return fn.apply(_this, args); }, wait);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};


/***/ }),

/***/ 990:
/*!************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/polyfills.js ***!
  \************************************************************/
/***/ (() => {


if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}


/***/ }),

/***/ 367:
/*!******************************************************************************!*\
  !*** ./node_modules/imask/esm/controls/html-contenteditable-mask-element.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLContenteditableMaskElement)
/* harmony export */ });
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-mask-element.js */ 911);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mask-element.js */ 529);




class HTMLContenteditableMaskElement extends _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** Returns HTMLElement selection start */
  get _unsafeSelectionStart() {
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    const anchorOffset = selection && selection.anchorOffset;
    const focusOffset = selection && selection.focusOffset;
    if (focusOffset == null || anchorOffset == null || anchorOffset < focusOffset) {
      return anchorOffset;
    }
    return focusOffset;
  }

  /** Returns HTMLElement selection end */
  get _unsafeSelectionEnd() {
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    const anchorOffset = selection && selection.anchorOffset;
    const focusOffset = selection && selection.focusOffset;
    if (focusOffset == null || anchorOffset == null || anchorOffset > focusOffset) {
      return anchorOffset;
    }
    return focusOffset;
  }

  /** Sets HTMLElement selection */
  _unsafeSelect(start, end) {
    if (!this.rootElement.createRange) return;
    const range = this.rootElement.createRange();
    range.setStart(this.input.firstChild || this.input, start);
    range.setEnd(this.input.lastChild || this.input, end);
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /** HTMLElement value */
  get value() {
    return this.input.textContent || '';
  }
  set value(value) {
    this.input.textContent = value;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;




/***/ }),

/***/ 560:
/*!********************************************************************!*\
  !*** ./node_modules/imask/esm/controls/html-input-mask-element.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLInputMaskElement)
/* harmony export */ });
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-mask-element.js */ 911);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mask-element.js */ 529);




/** Bridge between InputElement and {@link Masked} */
class HTMLInputMaskElement extends _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** InputElement to use mask on */

  constructor(input) {
    super(input);
    this.input = input;
  }

  /** Returns InputElement selection start */
  get _unsafeSelectionStart() {
    return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
  }

  /** Returns InputElement selection end */
  get _unsafeSelectionEnd() {
    return this.input.selectionEnd;
  }

  /** Sets InputElement selection */
  _unsafeSelect(start, end) {
    this.input.setSelectionRange(start, end);
  }
  get value() {
    return this.input.value;
  }
  set value(value) {
    this.input.value = value;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].HTMLMaskElement = _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__["default"];




/***/ }),

/***/ 911:
/*!**************************************************************!*\
  !*** ./node_modules/imask/esm/controls/html-mask-element.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLMaskElement)
/* harmony export */ });
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask-element.js */ 529);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);



const KEY_Z = 90;
const KEY_Y = 89;

/** Bridge between HTMLElement and {@link Masked} */
class HTMLMaskElement extends _mask_element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** HTMLElement to use mask on */

  constructor(input) {
    super();
    this.input = input;
    this._onKeydown = this._onKeydown.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onBeforeinput = this._onBeforeinput.bind(this);
    this._onCompositionEnd = this._onCompositionEnd.bind(this);
  }
  get rootElement() {
    var _this$input$getRootNo, _this$input$getRootNo2, _this$input;
    return (_this$input$getRootNo = (_this$input$getRootNo2 = (_this$input = this.input).getRootNode) == null ? void 0 : _this$input$getRootNo2.call(_this$input)) != null ? _this$input$getRootNo : document;
  }

  /** Is element in focus */
  get isActive() {
    return this.input === this.rootElement.activeElement;
  }

  /** Binds HTMLElement events to mask internal events */
  bindEvents(handlers) {
    this.input.addEventListener('keydown', this._onKeydown);
    this.input.addEventListener('input', this._onInput);
    this.input.addEventListener('beforeinput', this._onBeforeinput);
    this.input.addEventListener('compositionend', this._onCompositionEnd);
    this.input.addEventListener('drop', handlers.drop);
    this.input.addEventListener('click', handlers.click);
    this.input.addEventListener('focus', handlers.focus);
    this.input.addEventListener('blur', handlers.commit);
    this._handlers = handlers;
  }
  _onKeydown(e) {
    if (this._handlers.redo && (e.keyCode === KEY_Z && e.shiftKey && (e.metaKey || e.ctrlKey) || e.keyCode === KEY_Y && e.ctrlKey)) {
      e.preventDefault();
      return this._handlers.redo(e);
    }
    if (this._handlers.undo && e.keyCode === KEY_Z && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      return this._handlers.undo(e);
    }
    if (!e.isComposing) this._handlers.selectionChange(e);
  }
  _onBeforeinput(e) {
    if (e.inputType === 'historyUndo' && this._handlers.undo) {
      e.preventDefault();
      return this._handlers.undo(e);
    }
    if (e.inputType === 'historyRedo' && this._handlers.redo) {
      e.preventDefault();
      return this._handlers.redo(e);
    }
  }
  _onCompositionEnd(e) {
    this._handlers.input(e);
  }
  _onInput(e) {
    if (!e.isComposing) this._handlers.input(e);
  }

  /** Unbinds HTMLElement events to mask internal events */
  unbindEvents() {
    this.input.removeEventListener('keydown', this._onKeydown);
    this.input.removeEventListener('input', this._onInput);
    this.input.removeEventListener('beforeinput', this._onBeforeinput);
    this.input.removeEventListener('compositionend', this._onCompositionEnd);
    this.input.removeEventListener('drop', this._handlers.drop);
    this.input.removeEventListener('click', this._handlers.click);
    this.input.removeEventListener('focus', this._handlers.focus);
    this.input.removeEventListener('blur', this._handlers.commit);
    this._handlers = {};
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].HTMLMaskElement = HTMLMaskElement;




/***/ }),

/***/ 571:
/*!**********************************************************!*\
  !*** ./node_modules/imask/esm/controls/input-history.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputHistory)
/* harmony export */ });
class InputHistory {
  constructor() {
    this.states = [];
    this.currentIndex = 0;
  }
  get currentState() {
    return this.states[this.currentIndex];
  }
  get isEmpty() {
    return this.states.length === 0;
  }
  push(state) {
    // if current index points before the last element then remove the future
    if (this.currentIndex < this.states.length - 1) this.states.length = this.currentIndex + 1;
    this.states.push(state);
    if (this.states.length > InputHistory.MAX_LENGTH) this.states.shift();
    this.currentIndex = this.states.length - 1;
  }
  go(steps) {
    this.currentIndex = Math.min(Math.max(this.currentIndex + steps, 0), this.states.length - 1);
    return this.currentState;
  }
  undo() {
    return this.go(-1);
  }
  redo() {
    return this.go(+1);
  }
  clear() {
    this.states.length = 0;
    this.currentIndex = 0;
  }
}
InputHistory.MAX_LENGTH = 100;




/***/ }),

/***/ 866:
/*!**************************************************!*\
  !*** ./node_modules/imask/esm/controls/input.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputMask)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _core_action_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/action-details.js */ 234);
/* harmony import */ var _masked_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../masked/factory.js */ 471);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mask-element.js */ 529);
/* harmony import */ var _html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./html-input-mask-element.js */ 560);
/* harmony import */ var _html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./html-contenteditable-mask-element.js */ 367);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _input_history_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./input-history.js */ 571);
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html-mask-element.js */ 911);










/** Listens to element events and controls changes between element and {@link Masked} */
class InputMask {
  /**
    View element
  */

  /** Internal {@link Masked} model */

  constructor(el, opts) {
    this.el = el instanceof _mask_element_js__WEBPACK_IMPORTED_MODULE_3__["default"] ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new _html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_5__["default"](el) : new _html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_4__["default"](el);
    this.masked = (0,_masked_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])(opts);
    this._listeners = {};
    this._value = '';
    this._unmaskedValue = '';
    this._rawInputValue = '';
    this.history = new _input_history_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this._saveSelection = this._saveSelection.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onUndo = this._onUndo.bind(this);
    this._onRedo = this._onRedo.bind(this);
    this.alignCursor = this.alignCursor.bind(this);
    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
    this._bindEvents();

    // refresh
    this.updateValue();
    this._onChange();
  }
  maskEquals(mask) {
    var _this$masked;
    return mask == null || ((_this$masked = this.masked) == null ? void 0 : _this$masked.maskEquals(mask));
  }

  /** Masked */
  get mask() {
    return this.masked.mask;
  }
  set mask(mask) {
    if (this.maskEquals(mask)) return;
    if (!(mask instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_6__["default"].Masked) && this.masked.constructor === (0,_masked_factory_js__WEBPACK_IMPORTED_MODULE_2__.maskedClass)(mask)) {
      // TODO "any" no idea
      this.masked.updateOptions({
        mask
      });
      return;
    }
    const masked = mask instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_6__["default"].Masked ? mask : (0,_masked_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      mask
    });
    masked.unmaskedValue = this.masked.unmaskedValue;
    this.masked = masked;
  }

  /** Raw value */
  get value() {
    return this._value;
  }
  set value(str) {
    if (this.value === str) return;
    this.masked.value = str;
    this.updateControl('auto');
  }

  /** Unmasked value */
  get unmaskedValue() {
    return this._unmaskedValue;
  }
  set unmaskedValue(str) {
    if (this.unmaskedValue === str) return;
    this.masked.unmaskedValue = str;
    this.updateControl('auto');
  }

  /** Raw input value */
  get rawInputValue() {
    return this._rawInputValue;
  }
  set rawInputValue(str) {
    if (this.rawInputValue === str) return;
    this.masked.rawInputValue = str;
    this.updateControl();
    this.alignCursor();
  }

  /** Typed unmasked value */
  get typedValue() {
    return this.masked.typedValue;
  }
  set typedValue(val) {
    if (this.masked.typedValueEquals(val)) return;
    this.masked.typedValue = val;
    this.updateControl('auto');
  }

  /** Display value */
  get displayValue() {
    return this.masked.displayValue;
  }

  /** Starts listening to element events */
  _bindEvents() {
    this.el.bindEvents({
      selectionChange: this._saveSelection,
      input: this._onInput,
      drop: this._onDrop,
      click: this._onClick,
      focus: this._onFocus,
      commit: this._onChange,
      undo: this._onUndo,
      redo: this._onRedo
    });
  }

  /** Stops listening to element events */
  _unbindEvents() {
    if (this.el) this.el.unbindEvents();
  }

  /** Fires custom event */
  _fireEvent(ev, e) {
    const listeners = this._listeners[ev];
    if (!listeners) return;
    listeners.forEach(l => l(e));
  }

  /** Current selection start */
  get selectionStart() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
  }

  /** Current cursor position */
  get cursorPos() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
  }
  set cursorPos(pos) {
    if (!this.el || !this.el.isActive) return;
    this.el.select(pos, pos);
    this._saveSelection();
  }

  /** Stores current selection */
  _saveSelection( /* ev */
  ) {
    if (this.displayValue !== this.el.value) {
      console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
    }
    this._selection = {
      start: this.selectionStart,
      end: this.cursorPos
    };
  }

  /** Syncronizes model value from view */
  updateValue() {
    this.masked.value = this.el.value;
    this._value = this.masked.value;
  }

  /** Syncronizes view from model value, fires change events */
  updateControl(cursorPos) {
    const newUnmaskedValue = this.masked.unmaskedValue;
    const newValue = this.masked.value;
    const newRawInputValue = this.masked.rawInputValue;
    const newDisplayValue = this.displayValue;
    const isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue || this._rawInputValue !== newRawInputValue;
    this._unmaskedValue = newUnmaskedValue;
    this._value = newValue;
    this._rawInputValue = newRawInputValue;
    if (this.el.value !== newDisplayValue) this.el.value = newDisplayValue;
    if (cursorPos === 'auto') this.alignCursor();else if (cursorPos != null) this.cursorPos = cursorPos;
    if (isChanged) this._fireChangeEvents();
    if (!this._historyChanging && (isChanged || this.history.isEmpty)) this.history.push({
      unmaskedValue: newUnmaskedValue,
      selection: {
        start: this.selectionStart,
        end: this.cursorPos
      }
    });
  }

  /** Updates options with deep equal check, recreates {@link Masked} model if mask type changes */
  updateOptions(opts) {
    const {
      mask,
      ...restOpts
    } = opts; // TODO types, yes, mask is optional

    const updateMask = !this.maskEquals(mask);
    const updateOpts = this.masked.optionsIsChanged(restOpts);
    if (updateMask) this.mask = mask;
    if (updateOpts) this.masked.updateOptions(restOpts); // TODO

    if (updateMask || updateOpts) this.updateControl();
  }

  /** Updates cursor */
  updateCursor(cursorPos) {
    if (cursorPos == null) return;
    this.cursorPos = cursorPos;

    // also queue change cursor for mobile browsers
    this._delayUpdateCursor(cursorPos);
  }

  /** Delays cursor update to support mobile browsers */
  _delayUpdateCursor(cursorPos) {
    this._abortUpdateCursor();
    this._changingCursorPos = cursorPos;
    this._cursorChanging = setTimeout(() => {
      if (!this.el) return; // if was destroyed
      this.cursorPos = this._changingCursorPos;
      this._abortUpdateCursor();
    }, 10);
  }

  /** Fires custom events */
  _fireChangeEvents() {
    this._fireEvent('accept', this._inputEvent);
    if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
  }

  /** Aborts delayed cursor update */
  _abortUpdateCursor() {
    if (this._cursorChanging) {
      clearTimeout(this._cursorChanging);
      delete this._cursorChanging;
    }
  }

  /** Aligns cursor to nearest available position */
  alignCursor() {
    this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT));
  }

  /** Aligns cursor only if selection is empty */
  alignCursorFriendly() {
    if (this.selectionStart !== this.cursorPos) return; // skip if range is selected
    this.alignCursor();
  }

  /** Adds listener on custom event */
  on(ev, handler) {
    if (!this._listeners[ev]) this._listeners[ev] = [];
    this._listeners[ev].push(handler);
    return this;
  }

  /** Removes custom event listener */
  off(ev, handler) {
    if (!this._listeners[ev]) return this;
    if (!handler) {
      delete this._listeners[ev];
      return this;
    }
    const hIndex = this._listeners[ev].indexOf(handler);
    if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
    return this;
  }

  /** Handles view input event */
  _onInput(e) {
    this._inputEvent = e;
    this._abortUpdateCursor();
    const details = new _core_action_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      // new state
      value: this.el.value,
      cursorPos: this.cursorPos,
      // old state
      oldValue: this.displayValue,
      oldSelection: this._selection
    });
    const oldRawValue = this.masked.rawInputValue;
    const offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection, {
      input: true,
      raw: true
    }).offset;

    // force align in remove direction only if no input chars were removed
    // otherwise we still need to align with NONE (to get out from fixed symbols for instance)
    const removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE;
    let cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
    if (removeDirection !== _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE) cursorPos = this.masked.nearestInputPos(cursorPos, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE);
    this.updateControl(cursorPos);
    delete this._inputEvent;
  }

  /** Handles view change event and commits model value */
  _onChange() {
    if (this.displayValue !== this.el.value) {
      this.updateValue();
    }
    this.masked.doCommit();
    this.updateControl();
    this._saveSelection();
  }

  /** Handles view drop event, prevents by default */
  _onDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  /** Restore last selection on focus */
  _onFocus(ev) {
    this.alignCursorFriendly();
  }

  /** Restore last selection on focus */
  _onClick(ev) {
    this.alignCursorFriendly();
  }
  _onUndo() {
    this._applyHistoryState(this.history.undo());
  }
  _onRedo() {
    this._applyHistoryState(this.history.redo());
  }
  _applyHistoryState(state) {
    if (!state) return;
    this._historyChanging = true;
    this.unmaskedValue = state.unmaskedValue;
    this.el.select(state.selection.start, state.selection.end);
    this._saveSelection();
    this._historyChanging = false;
  }

  /** Unbind view events and removes element reference */
  destroy() {
    this._unbindEvents();
    this._listeners.length = 0;
    delete this.el;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_6__["default"].InputMask = InputMask;




/***/ }),

/***/ 529:
/*!*********************************************************!*\
  !*** ./node_modules/imask/esm/controls/mask-element.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskElement)
/* harmony export */ });
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/holder.js */ 885);


/**  Generic element API to use with mask */
class MaskElement {
  /** */

  /** */

  /** */

  /** Safely returns selection start */
  get selectionStart() {
    let start;
    try {
      start = this._unsafeSelectionStart;
    } catch {}
    return start != null ? start : this.value.length;
  }

  /** Safely returns selection end */
  get selectionEnd() {
    let end;
    try {
      end = this._unsafeSelectionEnd;
    } catch {}
    return end != null ? end : this.value.length;
  }

  /** Safely sets element selection */
  select(start, end) {
    if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;
    try {
      this._unsafeSelect(start, end);
    } catch {}
  }

  /** */
  get isActive() {
    return false;
  }
  /** */

  /** */

  /** */
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_0__["default"].MaskElement = MaskElement;




/***/ }),

/***/ 234:
/*!*******************************************************!*\
  !*** ./node_modules/imask/esm/core/action-details.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ActionDetails)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ 938);


/** Provides details of changing input */
class ActionDetails {
  /** Current input value */

  /** Current cursor position */

  /** Old input value */

  /** Old selection */

  constructor(opts) {
    Object.assign(this, opts);

    // double check if left part was changed (autofilling, other non-standard input triggers)
    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
      --this.oldSelection.start;
    }
    if (this.insertedCount) {
      // double check right part
      while (this.value.slice(this.cursorPos) !== this.oldValue.slice(this.oldSelection.end)) {
        if (this.value.length - this.cursorPos < this.oldValue.length - this.oldSelection.end) ++this.oldSelection.end;else ++this.cursorPos;
      }
    }
  }

  /** Start changing position */
  get startChangePos() {
    return Math.min(this.cursorPos, this.oldSelection.start);
  }

  /** Inserted symbols count */
  get insertedCount() {
    return this.cursorPos - this.startChangePos;
  }

  /** Inserted symbols */
  get inserted() {
    return this.value.substr(this.startChangePos, this.insertedCount);
  }

  /** Removed symbols count */
  get removedCount() {
    // Math.max for opposite operation
    return Math.max(this.oldSelection.end - this.startChangePos ||
    // for Delete
    this.oldValue.length - this.value.length, 0);
  }

  /** Removed symbols */
  get removed() {
    return this.oldValue.substr(this.startChangePos, this.removedCount);
  }

  /** Unchanged head symbols */
  get head() {
    return this.value.substring(0, this.startChangePos);
  }

  /** Unchanged tail symbols */
  get tail() {
    return this.value.substring(this.startChangePos + this.insertedCount);
  }

  /** Remove direction */
  get removeDirection() {
    if (!this.removedCount || this.insertedCount) return _utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE;

    // align right if delete at right
    return (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) &&
    // if not range removed (event with backspace)
    this.oldSelection.end === this.oldSelection.start ? _utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.RIGHT : _utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT;
  }
}




/***/ }),

/***/ 472:
/*!*******************************************************!*\
  !*** ./node_modules/imask/esm/core/change-details.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChangeDetails)
/* harmony export */ });
/* harmony import */ var _holder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./holder.js */ 885);


/** Provides details of changing model value */
class ChangeDetails {
  /** Inserted symbols */

  /** Additional offset if any changes occurred before tail */

  /** Raw inserted is used by dynamic mask */

  /** Can skip chars */

  static normalize(prep) {
    return Array.isArray(prep) ? prep : [prep, new ChangeDetails()];
  }
  constructor(details) {
    Object.assign(this, {
      inserted: '',
      rawInserted: '',
      tailShift: 0,
      skip: false
    }, details);
  }

  /** Aggregate changes */
  aggregate(details) {
    this.inserted += details.inserted;
    this.rawInserted += details.rawInserted;
    this.tailShift += details.tailShift;
    this.skip = this.skip || details.skip;
    return this;
  }

  /** Total offset considering all changes */
  get offset() {
    return this.tailShift + this.inserted.length;
  }
  get consumed() {
    return Boolean(this.rawInserted) || this.skip;
  }
  equals(details) {
    return this.inserted === details.inserted && this.tailShift === details.tailShift && this.rawInserted === details.rawInserted && this.skip === details.skip;
  }
}
_holder_js__WEBPACK_IMPORTED_MODULE_0__["default"].ChangeDetails = ChangeDetails;




/***/ }),

/***/ 476:
/*!****************************************************************!*\
  !*** ./node_modules/imask/esm/core/continuous-tail-details.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContinuousTailDetails)
/* harmony export */ });
/** Provides details of continuous extracted tail */
class ContinuousTailDetails {
  /** Tail value as string */

  /** Tail start position */

  /** Start position */

  constructor(value, from, stop) {
    if (value === void 0) {
      value = '';
    }
    if (from === void 0) {
      from = 0;
    }
    this.value = value;
    this.from = from;
    this.stop = stop;
  }
  toString() {
    return this.value;
  }
  extend(tail) {
    this.value += String(tail);
  }
  appendTo(masked) {
    return masked.append(this.toString(), {
      tail: true
    }).aggregate(masked._appendPlaceholder());
  }
  get state() {
    return {
      value: this.value,
      from: this.from,
      stop: this.stop
    };
  }
  set state(state) {
    Object.assign(this, state);
  }
  unshift(beforePos) {
    if (!this.value.length || beforePos != null && this.from >= beforePos) return '';
    const shiftChar = this.value[0];
    this.value = this.value.slice(1);
    return shiftChar;
  }
  shift() {
    if (!this.value.length) return '';
    const shiftChar = this.value[this.value.length - 1];
    this.value = this.value.slice(0, -1);
    return shiftChar;
  }
}




/***/ }),

/***/ 885:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/core/holder.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IMask)
/* harmony export */ });
/** Applies mask on element */
function IMask(el, opts) {
  // currently available only for input-like elements
  return new IMask.InputMask(el, opts);
}




/***/ }),

/***/ 938:
/*!**********************************************!*\
  !*** ./node_modules/imask/esm/core/utils.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIRECTION: () => (/* binding */ DIRECTION),
/* harmony export */   escapeRegExp: () => (/* binding */ escapeRegExp),
/* harmony export */   forceDirection: () => (/* binding */ forceDirection),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   objectIncludes: () => (/* binding */ objectIncludes),
/* harmony export */   pick: () => (/* binding */ pick)
/* harmony export */ });
/** Checks if value is string */
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

/** Checks if value is object */
function isObject(obj) {
  var _obj$constructor;
  return typeof obj === 'object' && obj != null && (obj == null || (_obj$constructor = obj.constructor) == null ? void 0 : _obj$constructor.name) === 'Object';
}
function pick(obj, keys) {
  if (Array.isArray(keys)) return pick(obj, (_, k) => keys.includes(k));
  return Object.entries(obj).reduce((acc, _ref) => {
    let [k, v] = _ref;
    if (keys(v, k)) acc[k] = v;
    return acc;
  }, {});
}

/** Direction */
const DIRECTION = {
  NONE: 'NONE',
  LEFT: 'LEFT',
  FORCE_LEFT: 'FORCE_LEFT',
  RIGHT: 'RIGHT',
  FORCE_RIGHT: 'FORCE_RIGHT'
};

/** Direction */

function forceDirection(direction) {
  switch (direction) {
    case DIRECTION.LEFT:
      return DIRECTION.FORCE_LEFT;
    case DIRECTION.RIGHT:
      return DIRECTION.FORCE_RIGHT;
    default:
      return direction;
  }
}

/** Escapes regular expression control chars */
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

// cloned from https://github.com/epoberezkin/fast-deep-equal with small changes
function objectIncludes(b, a) {
  if (a === b) return true;
  const arrA = Array.isArray(a),
    arrB = Array.isArray(b);
  let i;
  if (arrA && arrB) {
    if (a.length != b.length) return false;
    for (i = 0; i < a.length; i++) if (!objectIncludes(a[i], b[i])) return false;
    return true;
  }
  if (arrA != arrB) return false;
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const dateA = a instanceof Date,
      dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;
    const regexpA = a instanceof RegExp,
      regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;
    const keys = Object.keys(a);
    // if (keys.length !== Object.keys(b).length) return false;

    for (i = 0; i < keys.length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = 0; i < keys.length; i++) if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
    return true;
  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }
  return false;
}

/** Selection range */




/***/ }),

/***/ 303:
/*!*****************************************!*\
  !*** ./node_modules/imask/esm/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChangeDetails: () => (/* reexport safe */ _core_change_details_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   ChunksTailDetails: () => (/* reexport safe */ _masked_pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   DIRECTION: () => (/* reexport safe */ _core_utils_js__WEBPACK_IMPORTED_MODULE_7__.DIRECTION),
/* harmony export */   HTMLContenteditableMaskElement: () => (/* reexport safe */ _controls_html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   HTMLInputMaskElement: () => (/* reexport safe */ _controls_html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   HTMLMaskElement: () => (/* reexport safe */ _controls_html_mask_element_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   InputMask: () => (/* reexport safe */ _controls_input_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   MaskElement: () => (/* reexport safe */ _controls_mask_element_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Masked: () => (/* reexport safe */ _masked_base_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   MaskedDate: () => (/* reexport safe */ _masked_date_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   MaskedDynamic: () => (/* reexport safe */ _masked_dynamic_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   MaskedEnum: () => (/* reexport safe */ _masked_enum_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   MaskedFunction: () => (/* reexport safe */ _masked_function_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   MaskedNumber: () => (/* reexport safe */ _masked_number_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   MaskedPattern: () => (/* reexport safe */ _masked_pattern_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   MaskedRange: () => (/* reexport safe */ _masked_range_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   MaskedRegExp: () => (/* reexport safe */ _masked_regexp_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   PIPE_TYPE: () => (/* reexport safe */ _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__.PIPE_TYPE),
/* harmony export */   PatternFixedDefinition: () => (/* reexport safe */ _masked_pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   PatternInputDefinition: () => (/* reexport safe */ _masked_pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   RepeatBlock: () => (/* reexport safe */ _masked_repeat_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   createMask: () => (/* reexport safe */ _masked_factory_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   createPipe: () => (/* reexport safe */ _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__.createPipe),
/* harmony export */   "default": () => (/* reexport safe */ _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   forceDirection: () => (/* reexport safe */ _core_utils_js__WEBPACK_IMPORTED_MODULE_7__.forceDirection),
/* harmony export */   normalizeOpts: () => (/* reexport safe */ _masked_factory_js__WEBPACK_IMPORTED_MODULE_12__.normalizeOpts),
/* harmony export */   pipe: () => (/* reexport safe */ _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__.pipe)
/* harmony export */ });
/* harmony import */ var _controls_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls/input.js */ 866);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/holder.js */ 885);
/* harmony import */ var _controls_html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls/html-contenteditable-mask-element.js */ 367);
/* harmony import */ var _controls_html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls/html-input-mask-element.js */ 560);
/* harmony import */ var _controls_html_mask_element_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls/html-mask-element.js */ 911);
/* harmony import */ var _controls_mask_element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls/mask-element.js */ 529);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/change-details.js */ 472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/utils.js */ 938);
/* harmony import */ var _masked_base_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./masked/base.js */ 168);
/* harmony import */ var _masked_date_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./masked/date.js */ 773);
/* harmony import */ var _masked_dynamic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./masked/dynamic.js */ 536);
/* harmony import */ var _masked_enum_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./masked/enum.js */ 180);
/* harmony import */ var _masked_factory_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./masked/factory.js */ 471);
/* harmony import */ var _masked_function_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./masked/function.js */ 357);
/* harmony import */ var _masked_number_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./masked/number.js */ 24);
/* harmony import */ var _masked_pattern_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./masked/pattern.js */ 867);
/* harmony import */ var _masked_pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./masked/pattern/chunk-tail-details.js */ 403);
/* harmony import */ var _masked_pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./masked/pattern/fixed-definition.js */ 370);
/* harmony import */ var _masked_pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./masked/pattern/input-definition.js */ 260);
/* harmony import */ var _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./masked/pipe.js */ 509);
/* harmony import */ var _masked_range_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./masked/range.js */ 600);
/* harmony import */ var _masked_regexp_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./masked/regexp.js */ 136);
/* harmony import */ var _masked_repeat_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./masked/repeat.js */ 474);
/* harmony import */ var _core_action_details_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./core/action-details.js */ 234);
/* harmony import */ var _controls_input_history_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./controls/input-history.js */ 571);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./core/continuous-tail-details.js */ 476);
/* harmony import */ var _masked_pattern_cursor_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./masked/pattern/cursor.js */ 976);




























try {
  globalThis.IMask = _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"];
} catch {}




/***/ }),

/***/ 168:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/masked/base.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Masked)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/holder.js */ 885);





/** Append flags */

/** Extract flags */

// see https://github.com/microsoft/TypeScript/issues/6223

/** Provides common masking stuff */
class Masked {
  /** */

  /** */

  /** Transforms value before mask processing */

  /** Transforms each char before mask processing */

  /** Validates if value is acceptable */

  /** Does additional processing at the end of editing */

  /** Format typed value to string */

  /** Parse string to get typed value */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  /** */

  constructor(opts) {
    this._value = '';
    this._update({
      ...Masked.DEFAULTS,
      ...opts
    });
    this._initialized = true;
  }

  /** Sets and applies new options */
  updateOptions(opts) {
    if (!this.optionsIsChanged(opts)) return;
    this.withValueRefresh(this._update.bind(this, opts));
  }

  /** Sets new options */
  _update(opts) {
    Object.assign(this, opts);
  }

  /** Mask state */
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(state) {
    this._value = state._value;
  }

  /** Resets value */
  reset() {
    this._value = '';
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this.resolve(value, {
      input: true
    });
  }

  /** Resolve new value */
  resolve(value, flags) {
    if (flags === void 0) {
      flags = {
        input: true
      };
    }
    this.reset();
    this.append(value, flags, '');
    this.doCommit();
  }
  get unmaskedValue() {
    return this.value;
  }
  set unmaskedValue(value) {
    this.resolve(value, {});
  }
  get typedValue() {
    return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
  }
  set typedValue(value) {
    if (this.format) {
      this.value = this.format(value, this);
    } else {
      this.unmaskedValue = String(value);
    }
  }

  /** Value that includes raw user input */
  get rawInputValue() {
    return this.extractInput(0, this.displayValue.length, {
      raw: true
    });
  }
  set rawInputValue(value) {
    this.resolve(value, {
      raw: true
    });
  }
  get displayValue() {
    return this.value;
  }
  get isComplete() {
    return true;
  }
  get isFilled() {
    return this.isComplete;
  }

  /** Finds nearest input position in direction */
  nearestInputPos(cursorPos, direction) {
    return cursorPos;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return Math.min(this.displayValue.length, toPos - fromPos);
  }

  /** Extracts value in range considering flags */
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return this.displayValue.slice(fromPos, toPos);
  }

  /** Extracts tail in range */
  extractTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.extractInput(fromPos, toPos), fromPos);
  }

  /** Appends tail */
  appendTail(tail) {
    if ((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(tail)) tail = new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__["default"](String(tail));
    return tail.appendTo(this);
  }

  /** Appends char */
  _appendCharRaw(ch, flags) {
    if (!ch) return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._value += ch;
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      inserted: ch,
      rawInserted: ch
    });
  }

  /** Appends char */
  _appendChar(ch, flags, checkTail) {
    if (flags === void 0) {
      flags = {};
    }
    const consistentState = this.state;
    let details;
    [ch, details] = this.doPrepareChar(ch, flags);
    if (ch) {
      details = details.aggregate(this._appendCharRaw(ch, flags));

      // TODO handle `skip`?

      // try `autofix` lookahead
      if (!details.rawInserted && this.autofix === 'pad') {
        const noFixState = this.state;
        this.state = consistentState;
        let fixDetails = this.pad(flags);
        const chDetails = this._appendCharRaw(ch, flags);
        fixDetails = fixDetails.aggregate(chDetails);

        // if fix was applied or
        // if details are equal use skip restoring state optimization
        if (chDetails.rawInserted || fixDetails.equals(details)) {
          details = fixDetails;
        } else {
          this.state = noFixState;
        }
      }
    }
    if (details.inserted) {
      let consistentTail;
      let appended = this.doValidate(flags) !== false;
      if (appended && checkTail != null) {
        // validation ok, check tail
        const beforeTailState = this.state;
        if (this.overwrite === true) {
          consistentTail = checkTail.state;
          for (let i = 0; i < details.rawInserted.length; ++i) {
            checkTail.unshift(this.displayValue.length - details.tailShift);
          }
        }
        let tailDetails = this.appendTail(checkTail);
        appended = tailDetails.rawInserted.length === checkTail.toString().length;

        // not ok, try shift
        if (!(appended && tailDetails.inserted) && this.overwrite === 'shift') {
          this.state = beforeTailState;
          consistentTail = checkTail.state;
          for (let i = 0; i < details.rawInserted.length; ++i) {
            checkTail.shift();
          }
          tailDetails = this.appendTail(checkTail);
          appended = tailDetails.rawInserted.length === checkTail.toString().length;
        }

        // if ok, rollback state after tail
        if (appended && tailDetails.inserted) this.state = beforeTailState;
      }

      // revert all if something went wrong
      if (!appended) {
        details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.state = consistentState;
        if (checkTail && consistentTail) checkTail.state = consistentTail;
      }
    }
    return details;
  }

  /** Appends optional placeholder at the end */
  _appendPlaceholder() {
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  /** Appends optional eager placeholder at the end */
  _appendEager() {
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  /** Appends symbols considering flags */
  append(str, flags, tail) {
    if (!(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(str)) throw new Error('value should be string');
    const checkTail = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(tail) ? new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__["default"](String(tail)) : tail;
    if (flags != null && flags.tail) flags._beforeTailState = this.state;
    let details;
    [str, details] = this.doPrepare(str, flags);
    for (let ci = 0; ci < str.length; ++ci) {
      const d = this._appendChar(str[ci], flags, checkTail);
      if (!d.rawInserted && !this.doSkipInvalid(str[ci], flags, checkTail)) break;
      details.aggregate(d);
    }
    if ((this.eager === true || this.eager === 'append') && flags != null && flags.input && str) {
      details.aggregate(this._appendEager());
    }

    // append tail but aggregate only tailShift
    if (checkTail != null) {
      details.tailShift += this.appendTail(checkTail).tailShift;
      // TODO it's a good idea to clear state after appending ends
      // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
      // this._resetBeforeTailState();
    }
    return details;
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    this._value = this.displayValue.slice(0, fromPos) + this.displayValue.slice(toPos);
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  /** Calls function and reapplies current value */
  withValueRefresh(fn) {
    if (this._refreshing || !this._initialized) return fn();
    this._refreshing = true;
    const rawInput = this.rawInputValue;
    const value = this.value;
    const ret = fn();
    this.rawInputValue = rawInput;
    // append lost trailing chars at the end
    if (this.value && this.value !== value && value.indexOf(this.value) === 0) {
      this.append(value.slice(this.displayValue.length), {}, '');
      this.doCommit();
    }
    delete this._refreshing;
    return ret;
  }
  runIsolated(fn) {
    if (this._isolated || !this._initialized) return fn(this);
    this._isolated = true;
    const state = this.state;
    const ret = fn(this);
    this.state = state;
    delete this._isolated;
    return ret;
  }
  doSkipInvalid(ch, flags, checkTail) {
    return Boolean(this.skipInvalid);
  }

  /** Prepares string before mask processing */
  doPrepare(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    return _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(this.prepare ? this.prepare(str, this, flags) : str);
  }

  /** Prepares each char before mask processing */
  doPrepareChar(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    return _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(this.prepareChar ? this.prepareChar(str, this, flags) : str);
  }

  /** Validates if value is acceptable */
  doValidate(flags) {
    return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
  }

  /** Does additional processing at the end of editing */
  doCommit() {
    if (this.commit) this.commit(this.value, this);
  }
  splice(start, deleteCount, inserted, removeDirection, flags) {
    if (inserted === void 0) {
      inserted = '';
    }
    if (removeDirection === void 0) {
      removeDirection = _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE;
    }
    if (flags === void 0) {
      flags = {
        input: true
      };
    }
    const tailPos = start + deleteCount;
    const tail = this.extractTail(tailPos);
    const eagerRemove = this.eager === true || this.eager === 'remove';
    let oldRawValue;
    if (eagerRemove) {
      removeDirection = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.forceDirection)(removeDirection);
      oldRawValue = this.extractInput(0, tailPos, {
        raw: true
      });
    }
    let startChangePos = start;
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

    // if it is just deletion without insertion
    if (removeDirection !== _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE) {
      startChangePos = this.nearestInputPos(start, deleteCount > 1 && start !== 0 && !eagerRemove ? _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE : removeDirection);

      // adjust tailShift if start was aligned
      details.tailShift = startChangePos - start;
    }
    details.aggregate(this.remove(startChangePos));
    if (eagerRemove && removeDirection !== _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE && oldRawValue === this.rawInputValue) {
      if (removeDirection === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_LEFT) {
        let valLength;
        while (oldRawValue === this.rawInputValue && (valLength = this.displayValue.length)) {
          details.aggregate(new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
            tailShift: -1
          })).aggregate(this.remove(valLength - 1));
        }
      } else if (removeDirection === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_RIGHT) {
        tail.unshift();
      }
    }
    return details.aggregate(this.append(inserted, flags, tail));
  }
  maskEquals(mask) {
    return this.mask === mask;
  }
  optionsIsChanged(opts) {
    return !(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.objectIncludes)(this, opts);
  }
  typedValueEquals(value) {
    const tval = this.typedValue;
    return value === tval || Masked.EMPTY_VALUES.includes(value) && Masked.EMPTY_VALUES.includes(tval) || (this.format ? this.format(value, this) === this.format(this.typedValue, this) : false);
  }
  pad(flags) {
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
}
Masked.DEFAULTS = {
  skipInvalid: true
};
Masked.EMPTY_VALUES = [undefined, null, ''];
_core_holder_js__WEBPACK_IMPORTED_MODULE_3__["default"].Masked = Masked;




/***/ }),

/***/ 773:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/masked/date.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedDate)
/* harmony export */ });
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern.js */ 867);
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range.js */ 600);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./factory.js */ 471);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pattern/input-definition.js */ 260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./regexp.js */ 136);














/** Date mask */
class MaskedDate extends _pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static extractPatternOptions(opts) {
    const {
      mask,
      pattern,
      ...patternOpts
    } = opts;
    return {
      ...patternOpts,
      mask: (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_3__.isString)(mask) ? mask : pattern
    };
  }

  /** Pattern mask for date according to {@link MaskedDate#format} */

  /** Start date */

  /** End date */

  /** Format typed value to string */

  /** Parse string to get typed value */

  constructor(opts) {
    super(MaskedDate.extractPatternOptions({
      ...MaskedDate.DEFAULTS,
      ...opts
    }));
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      mask,
      pattern,
      blocks,
      ...patternOpts
    } = {
      ...MaskedDate.DEFAULTS,
      ...opts
    };
    const patternBlocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS());
    // adjust year block
    if (opts.min) patternBlocks.Y.from = opts.min.getFullYear();
    if (opts.max) patternBlocks.Y.to = opts.max.getFullYear();
    if (opts.min && opts.max && patternBlocks.Y.from === patternBlocks.Y.to) {
      patternBlocks.m.from = opts.min.getMonth() + 1;
      patternBlocks.m.to = opts.max.getMonth() + 1;
      if (patternBlocks.m.from === patternBlocks.m.to) {
        patternBlocks.d.from = opts.min.getDate();
        patternBlocks.d.to = opts.max.getDate();
      }
    }
    Object.assign(patternBlocks, this.blocks, blocks);
    super._update({
      ...patternOpts,
      mask: (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_3__.isString)(mask) ? mask : pattern,
      blocks: patternBlocks
    });
  }
  doValidate(flags) {
    const date = this.date;
    return super.doValidate(flags) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
  }

  /** Checks if date is exists */
  isDateExist(str) {
    return this.format(this.parse(str, this), this).indexOf(str) >= 0;
  }

  /** Parsed Date */
  get date() {
    return this.typedValue;
  }
  set date(date) {
    this.typedValue = date;
  }
  get typedValue() {
    return this.isComplete ? super.typedValue : null;
  }
  set typedValue(value) {
    super.typedValue = value;
  }
  maskEquals(mask) {
    return mask === Date || super.maskEquals(mask);
  }
  optionsIsChanged(opts) {
    return super.optionsIsChanged(MaskedDate.extractPatternOptions(opts));
  }
}
MaskedDate.GET_DEFAULT_BLOCKS = () => ({
  d: {
    mask: _range_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    from: 1,
    to: 31,
    maxLength: 2
  },
  m: {
    mask: _range_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    from: 1,
    to: 12,
    maxLength: 2
  },
  Y: {
    mask: _range_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    from: 1900,
    to: 9999
  }
});
MaskedDate.DEFAULTS = {
  ..._pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"].DEFAULTS,
  mask: Date,
  pattern: 'd{.}`m{.}`Y',
  format: (date, masked) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return [day, month, year].join('.');
  },
  parse: (str, masked) => {
    const [day, month, year] = str.split('.').map(Number);
    return new Date(year, month - 1, day);
  }
};
_core_holder_js__WEBPACK_IMPORTED_MODULE_2__["default"].MaskedDate = MaskedDate;




/***/ }),

/***/ 536:
/*!**************************************************!*\
  !*** ./node_modules/imask/esm/masked/dynamic.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedDynamic)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factory.js */ 471);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);







/** Dynamic mask for choosing appropriate mask in run-time */
class MaskedDynamic extends _base_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(opts) {
    super({
      ...MaskedDynamic.DEFAULTS,
      ...opts
    });
    this.currentMask = undefined;
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update(opts);
    if ('mask' in opts) {
      this.exposeMask = undefined;
      // mask could be totally dynamic with only `dispatch` option
      this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(m => {
        const {
          expose,
          ...maskOpts
        } = (0,_factory_js__WEBPACK_IMPORTED_MODULE_2__.normalizeOpts)(m);
        const masked = (0,_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
          overwrite: this._overwrite,
          eager: this._eager,
          skipInvalid: this._skipInvalid,
          ...maskOpts
        });
        if (expose) this.exposeMask = masked;
        return masked;
      }) : [];

      // this.currentMask = this.doDispatch(''); // probably not needed but lets see
    }
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const details = this._applyDispatch(ch, flags);
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendChar(ch, this.currentMaskFlags(flags)));
    }
    return details;
  }
  _applyDispatch(appended, flags, tail) {
    if (appended === void 0) {
      appended = '';
    }
    if (flags === void 0) {
      flags = {};
    }
    if (tail === void 0) {
      tail = '';
    }
    const prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
    const inputValue = this.rawInputValue;
    const insertValue = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._rawInputValue : inputValue;
    const tailValue = inputValue.slice(insertValue.length);
    const prevMask = this.currentMask;
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const prevMaskState = prevMask == null ? void 0 : prevMask.state;

    // clone flags to prevent overwriting `_beforeTailState`
    this.currentMask = this.doDispatch(appended, {
      ...flags
    }, tail);

    // restore state after dispatch
    if (this.currentMask) {
      if (this.currentMask !== prevMask) {
        // if mask changed reapply input
        this.currentMask.reset();
        if (insertValue) {
          this.currentMask.append(insertValue, {
            raw: true
          });
          details.tailShift = this.currentMask.value.length - prevValueBeforeTail.length;
        }
        if (tailValue) {
          details.tailShift += this.currentMask.append(tailValue, {
            raw: true,
            tail: true
          }).tailShift;
        }
      } else if (prevMaskState) {
        // Dispatch can do something bad with state, so
        // restore prev mask state
        this.currentMask.state = prevMaskState;
      }
    }
    return details;
  }
  _appendPlaceholder() {
    const details = this._applyDispatch();
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendPlaceholder());
    }
    return details;
  }
  _appendEager() {
    const details = this._applyDispatch();
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendEager());
    }
    return details;
  }
  appendTail(tail) {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    if (tail) details.aggregate(this._applyDispatch('', {}, tail));
    return details.aggregate(this.currentMask ? this.currentMask.appendTail(tail) : super.appendTail(tail));
  }
  currentMaskFlags(flags) {
    var _flags$_beforeTailSta, _flags$_beforeTailSta2;
    return {
      ...flags,
      _beforeTailState: ((_flags$_beforeTailSta = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta.currentMaskRef) === this.currentMask && ((_flags$_beforeTailSta2 = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta2.currentMask) || flags._beforeTailState
    };
  }
  doDispatch(appended, flags, tail) {
    if (flags === void 0) {
      flags = {};
    }
    if (tail === void 0) {
      tail = '';
    }
    return this.dispatch(appended, this, flags, tail);
  }
  doValidate(flags) {
    return super.doValidate(flags) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(flags)));
  }
  doPrepare(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let [s, details] = super.doPrepare(str, flags);
    if (this.currentMask) {
      let currentDetails;
      [s, currentDetails] = super.doPrepare(s, this.currentMaskFlags(flags));
      details = details.aggregate(currentDetails);
    }
    return [s, details];
  }
  doPrepareChar(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let [s, details] = super.doPrepareChar(str, flags);
    if (this.currentMask) {
      let currentDetails;
      [s, currentDetails] = super.doPrepareChar(s, this.currentMaskFlags(flags));
      details = details.aggregate(currentDetails);
    }
    return [s, details];
  }
  reset() {
    var _this$currentMask;
    (_this$currentMask = this.currentMask) == null || _this$currentMask.reset();
    this.compiledMasks.forEach(m => m.reset());
  }
  get value() {
    return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : '';
  }
  set value(value) {
    if (this.exposeMask) {
      this.exposeMask.value = value;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
    } else super.value = value;
  }
  get unmaskedValue() {
    return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : '';
  }
  set unmaskedValue(unmaskedValue) {
    if (this.exposeMask) {
      this.exposeMask.unmaskedValue = unmaskedValue;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
    } else super.unmaskedValue = unmaskedValue;
  }
  get typedValue() {
    return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : '';
  }
  set typedValue(typedValue) {
    if (this.exposeMask) {
      this.exposeMask.typedValue = typedValue;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
      return;
    }
    let unmaskedValue = String(typedValue);

    // double check it
    if (this.currentMask) {
      this.currentMask.typedValue = typedValue;
      unmaskedValue = this.currentMask.unmaskedValue;
    }
    this.unmaskedValue = unmaskedValue;
  }
  get displayValue() {
    return this.currentMask ? this.currentMask.displayValue : '';
  }
  get isComplete() {
    var _this$currentMask2;
    return Boolean((_this$currentMask2 = this.currentMask) == null ? void 0 : _this$currentMask2.isComplete);
  }
  get isFilled() {
    var _this$currentMask3;
    return Boolean((_this$currentMask3 = this.currentMask) == null ? void 0 : _this$currentMask3.isFilled);
  }
  remove(fromPos, toPos) {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    if (this.currentMask) {
      details.aggregate(this.currentMask.remove(fromPos, toPos))
      // update with dispatch
      .aggregate(this._applyDispatch());
    }
    return details;
  }
  get state() {
    var _this$currentMask4;
    return {
      ...super.state,
      _rawInputValue: this.rawInputValue,
      compiledMasks: this.compiledMasks.map(m => m.state),
      currentMaskRef: this.currentMask,
      currentMask: (_this$currentMask4 = this.currentMask) == null ? void 0 : _this$currentMask4.state
    };
  }
  set state(state) {
    const {
      compiledMasks,
      currentMaskRef,
      currentMask,
      ...maskedState
    } = state;
    if (compiledMasks) this.compiledMasks.forEach((m, mi) => m.state = compiledMasks[mi]);
    if (currentMaskRef != null) {
      this.currentMask = currentMaskRef;
      this.currentMask.state = currentMask;
    }
    super.state = maskedState;
  }
  extractInput(fromPos, toPos, flags) {
    return this.currentMask ? this.currentMask.extractInput(fromPos, toPos, flags) : '';
  }
  extractTail(fromPos, toPos) {
    return this.currentMask ? this.currentMask.extractTail(fromPos, toPos) : super.extractTail(fromPos, toPos);
  }
  doCommit() {
    if (this.currentMask) this.currentMask.doCommit();
    super.doCommit();
  }
  nearestInputPos(cursorPos, direction) {
    return this.currentMask ? this.currentMask.nearestInputPos(cursorPos, direction) : super.nearestInputPos(cursorPos, direction);
  }
  get overwrite() {
    return this.currentMask ? this.currentMask.overwrite : this._overwrite;
  }
  set overwrite(overwrite) {
    this._overwrite = overwrite;
  }
  get eager() {
    return this.currentMask ? this.currentMask.eager : this._eager;
  }
  set eager(eager) {
    this._eager = eager;
  }
  get skipInvalid() {
    return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
  }
  set skipInvalid(skipInvalid) {
    this._skipInvalid = skipInvalid;
  }
  get autofix() {
    return this.currentMask ? this.currentMask.autofix : this._autofix;
  }
  set autofix(autofix) {
    this._autofix = autofix;
  }
  maskEquals(mask) {
    return Array.isArray(mask) ? this.compiledMasks.every((m, mi) => {
      if (!mask[mi]) return;
      const {
        mask: oldMask,
        ...restOpts
      } = mask[mi];
      return (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.objectIncludes)(m, restOpts) && m.maskEquals(oldMask);
    }) : super.maskEquals(mask);
  }
  typedValueEquals(value) {
    var _this$currentMask5;
    return Boolean((_this$currentMask5 = this.currentMask) == null ? void 0 : _this$currentMask5.typedValueEquals(value));
  }
}
/** Currently chosen mask */
/** Currently chosen mask */
/** Compliled {@link Masked} options */
/** Chooses {@link Masked} depending on input value */
MaskedDynamic.DEFAULTS = {
  ..._base_js__WEBPACK_IMPORTED_MODULE_3__["default"].DEFAULTS,
  dispatch: (appended, masked, flags, tail) => {
    if (!masked.compiledMasks.length) return;
    const inputValue = masked.rawInputValue;

    // simulate input
    const inputs = masked.compiledMasks.map((m, index) => {
      const isCurrent = masked.currentMask === m;
      const startInputPos = isCurrent ? m.displayValue.length : m.nearestInputPos(m.displayValue.length, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT);
      if (m.rawInputValue !== inputValue) {
        m.reset();
        m.append(inputValue, {
          raw: true
        });
      } else if (!isCurrent) {
        m.remove(startInputPos);
      }
      m.append(appended, masked.currentMaskFlags(flags));
      m.appendTail(tail);
      return {
        index,
        weight: m.rawInputValue.length,
        totalInputPositions: m.totalInputPositions(0, Math.max(startInputPos, m.nearestInputPos(m.displayValue.length, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT)))
      };
    });

    // pop masks with longer values first
    inputs.sort((i1, i2) => i2.weight - i1.weight || i2.totalInputPositions - i1.totalInputPositions);
    return masked.compiledMasks[inputs[0].index];
  }
};
_core_holder_js__WEBPACK_IMPORTED_MODULE_4__["default"].MaskedDynamic = MaskedDynamic;




/***/ }),

/***/ 180:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/masked/enum.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedEnum)
/* harmony export */ });
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern.js */ 867);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factory.js */ 471);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern/input-definition.js */ 260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./regexp.js */ 136);













/** Pattern which validates enum values */
class MaskedEnum extends _pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(opts) {
    super({
      ...MaskedEnum.DEFAULTS,
      ...opts
    }); // mask will be created in _update
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      enum: enum_,
      ...eopts
    } = opts;
    if (enum_) {
      const lengths = enum_.map(e => e.length);
      const requiredLength = Math.min(...lengths);
      const optionalLength = Math.max(...lengths) - requiredLength;
      eopts.mask = '*'.repeat(requiredLength);
      if (optionalLength) eopts.mask += '[' + '*'.repeat(optionalLength) + ']';
      this.enum = enum_;
    }
    super._update(eopts);
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const matchFrom = Math.min(this.nearestInputPos(0, _core_utils_js__WEBPACK_IMPORTED_MODULE_3__.DIRECTION.FORCE_RIGHT), this.value.length);
    const matches = this.enum.filter(e => this.matchValue(e, this.unmaskedValue + ch, matchFrom));
    if (matches.length) {
      if (matches.length === 1) {
        this._forEachBlocksInRange(0, this.value.length, (b, bi) => {
          const mch = matches[0][bi];
          if (bi >= this.value.length || mch === b.value) return;
          b.reset();
          b._appendChar(mch, flags);
        });
      }
      const d = super._appendCharRaw(matches[0][this.value.length], flags);
      if (matches.length === 1) {
        matches[0].slice(this.unmaskedValue.length).split('').forEach(mch => d.aggregate(super._appendCharRaw(mch)));
      }
      return d;
    }
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }
  extractTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    // just drop tail
    return new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_4__["default"]('', fromPos);
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    if (fromPos === toPos) return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    const matchFrom = Math.min(super.nearestInputPos(0, _core_utils_js__WEBPACK_IMPORTED_MODULE_3__.DIRECTION.FORCE_RIGHT), this.value.length);
    let pos;
    for (pos = fromPos; pos >= 0; --pos) {
      const matches = this.enum.filter(e => this.matchValue(e, this.value.slice(matchFrom, pos), matchFrom));
      if (matches.length > 1) break;
    }
    const details = super.remove(pos, toPos);
    details.tailShift += pos - fromPos;
    return details;
  }
}
/** Match enum value */
MaskedEnum.DEFAULTS = {
  ..._pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"].DEFAULTS,
  matchValue: (estr, istr, matchFrom) => estr.indexOf(istr, matchFrom) === matchFrom
};
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedEnum = MaskedEnum;




/***/ }),

/***/ 471:
/*!**************************************************!*\
  !*** ./node_modules/imask/esm/masked/factory.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMask),
/* harmony export */   maskedClass: () => (/* binding */ maskedClass),
/* harmony export */   normalizeOpts: () => (/* binding */ normalizeOpts)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);



// TODO can't use overloads here because of https://github.com/microsoft/TypeScript/issues/50754
// export function maskedClass(mask: string): typeof MaskedPattern;
// export function maskedClass(mask: DateConstructor): typeof MaskedDate;
// export function maskedClass(mask: NumberConstructor): typeof MaskedNumber;
// export function maskedClass(mask: Array<any> | ArrayConstructor): typeof MaskedDynamic;
// export function maskedClass(mask: MaskedDate): typeof MaskedDate;
// export function maskedClass(mask: MaskedNumber): typeof MaskedNumber;
// export function maskedClass(mask: MaskedEnum): typeof MaskedEnum;
// export function maskedClass(mask: MaskedRange): typeof MaskedRange;
// export function maskedClass(mask: MaskedRegExp): typeof MaskedRegExp;
// export function maskedClass(mask: MaskedFunction): typeof MaskedFunction;
// export function maskedClass(mask: MaskedPattern): typeof MaskedPattern;
// export function maskedClass(mask: MaskedDynamic): typeof MaskedDynamic;
// export function maskedClass(mask: Masked): typeof Masked;
// export function maskedClass(mask: typeof Masked): typeof Masked;
// export function maskedClass(mask: typeof MaskedDate): typeof MaskedDate;
// export function maskedClass(mask: typeof MaskedNumber): typeof MaskedNumber;
// export function maskedClass(mask: typeof MaskedEnum): typeof MaskedEnum;
// export function maskedClass(mask: typeof MaskedRange): typeof MaskedRange;
// export function maskedClass(mask: typeof MaskedRegExp): typeof MaskedRegExp;
// export function maskedClass(mask: typeof MaskedFunction): typeof MaskedFunction;
// export function maskedClass(mask: typeof MaskedPattern): typeof MaskedPattern;
// export function maskedClass(mask: typeof MaskedDynamic): typeof MaskedDynamic;
// export function maskedClass<Mask extends typeof Masked> (mask: Mask): Mask;
// export function maskedClass(mask: RegExp): typeof MaskedRegExp;
// export function maskedClass(mask: (value: string, ...args: any[]) => boolean): typeof MaskedFunction;

/** Get Masked class by mask type */
function maskedClass(mask) /* TODO */{
  if (mask == null) throw new Error('mask property should be defined');
  if (mask instanceof RegExp) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedRegExp;
  if ((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(mask)) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedPattern;
  if (mask === Date) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedDate;
  if (mask === Number) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedNumber;
  if (Array.isArray(mask) || mask === Array) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedDynamic;
  if (_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked && mask.prototype instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) return mask;
  if (_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked && mask instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) return mask.constructor;
  if (mask instanceof Function) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedFunction;
  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
  return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked;
}
function normalizeOpts(opts) {
  if (!opts) throw new Error('Options in not defined');
  if (_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) {
    if (opts.prototype instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) return {
      mask: opts
    };

    /*
      handle cases like:
      1) opts = Masked
      2) opts = { mask: Masked, ...instanceOpts }
    */
    const {
      mask = undefined,
      ...instanceOpts
    } = opts instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked ? {
      mask: opts
    } : (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(opts) && opts.mask instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked ? opts : {};
    if (mask) {
      const _mask = mask.mask;
      return {
        ...(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.pick)(mask, (_, k) => !k.startsWith('_')),
        mask: mask.constructor,
        _mask,
        ...instanceOpts
      };
    }
  }
  if (!(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(opts)) return {
    mask: opts
  };
  return {
    ...opts
  };
}

// TODO can't use overloads here because of https://github.com/microsoft/TypeScript/issues/50754

// From masked
// export default function createMask<Opts extends Masked, ReturnMasked=Opts> (opts: Opts): ReturnMasked;
// // From masked class
// export default function createMask<Opts extends MaskedOptions<typeof Masked>, ReturnMasked extends Masked=InstanceType<Opts['mask']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedDate>, ReturnMasked extends MaskedDate=MaskedDate<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedNumber>, ReturnMasked extends MaskedNumber=MaskedNumber<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedEnum>, ReturnMasked extends MaskedEnum=MaskedEnum<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedRange>, ReturnMasked extends MaskedRange=MaskedRange<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedRegExp>, ReturnMasked extends MaskedRegExp=MaskedRegExp<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedFunction>, ReturnMasked extends MaskedFunction=MaskedFunction<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedPattern>, ReturnMasked extends MaskedPattern=MaskedPattern<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedDynamic>, ReturnMasked extends MaskedDynamic=MaskedDynamic<Opts['parent']>> (opts: Opts): ReturnMasked;
// // From mask opts
// export default function createMask<Opts extends MaskedOptions<Masked>, ReturnMasked=Opts extends MaskedOptions<infer M> ? M : never> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedNumberOptions, ReturnMasked extends MaskedNumber=MaskedNumber<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedDateFactoryOptions, ReturnMasked extends MaskedDate=MaskedDate<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedEnumOptions, ReturnMasked extends MaskedEnum=MaskedEnum<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedRangeOptions, ReturnMasked extends MaskedRange=MaskedRange<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedPatternOptions, ReturnMasked extends MaskedPattern=MaskedPattern<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedDynamicOptions, ReturnMasked extends MaskedDynamic=MaskedDynamic<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<RegExp>, ReturnMasked extends MaskedRegExp=MaskedRegExp<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<Function>, ReturnMasked extends MaskedFunction=MaskedFunction<Opts['parent']>> (opts: Opts): ReturnMasked;

/** Creates new {@link Masked} depending on mask type */
function createMask(opts) {
  if (_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked && opts instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) return opts;
  const nOpts = normalizeOpts(opts);
  const MaskedClass = maskedClass(nOpts.mask);
  if (!MaskedClass) throw new Error("Masked class is not found for provided mask " + nOpts.mask + ", appropriate module needs to be imported manually before creating mask.");
  if (nOpts.mask === MaskedClass) delete nOpts.mask;
  if (nOpts._mask) {
    nOpts.mask = nOpts._mask;
    delete nOpts._mask;
  }
  return new MaskedClass(nOpts);
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].createMask = createMask;




/***/ }),

/***/ 357:
/*!***************************************************!*\
  !*** ./node_modules/imask/esm/masked/function.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedFunction)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils.js */ 938);






/** Masking by custom Function */
class MaskedFunction extends _base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update({
      ...opts,
      validate: opts.mask
    });
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedFunction = MaskedFunction;




/***/ }),

/***/ 24:
/*!*************************************************!*\
  !*** ./node_modules/imask/esm/masked/number.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedNumber)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);






var _MaskedNumber;
/** Number mask */
class MaskedNumber extends _base_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /** Single char */

  /** Single char */

  /** Array of single chars */

  /** */

  /** */

  /** Digits after point */

  /** Flag to remove leading and trailing zeros in the end of editing */

  /** Flag to pad trailing zeros after point in the end of editing */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  /** Format typed value to string */

  /** Parse string to get typed value */

  constructor(opts) {
    super({
      ...MaskedNumber.DEFAULTS,
      ...opts
    });
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update(opts);
    this._updateRegExps();
  }
  _updateRegExps() {
    const start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
    const mid = '\\d*';
    const end = (this.scale ? "(" + (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(this.radix) + "\\d{0," + this.scale + "})?" : '') + '$';
    this._numberRegExp = new RegExp(start + mid + end);
    this._mapToRadixRegExp = new RegExp("[" + this.mapToRadix.map(_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp).join('') + "]", 'g');
    this._thousandsSeparatorRegExp = new RegExp((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(this.thousandsSeparator), 'g');
  }
  _removeThousandsSeparators(value) {
    return value.replace(this._thousandsSeparatorRegExp, '');
  }
  _insertThousandsSeparators(value) {
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    const parts = value.split(this.radix);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    return parts.join(this.radix);
  }
  doPrepareChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const [prepCh, details] = super.doPrepareChar(this._removeThousandsSeparators(this.scale && this.mapToRadix.length && (
    /*
      radix should be mapped when
      1) input is done from keyboard = flags.input && flags.raw
      2) unmasked value is set = !flags.input && !flags.raw
      and should not be mapped when
      1) value is set = flags.input && !flags.raw
      2) raw value is set = !flags.input && flags.raw
    */
    flags.input && flags.raw || !flags.input && !flags.raw) ? ch.replace(this._mapToRadixRegExp, this.radix) : ch), flags);
    if (ch && !prepCh) details.skip = true;
    if (prepCh && !this.allowPositive && !this.value && prepCh !== '-') details.aggregate(this._appendChar('-'));
    return [prepCh, details];
  }
  _separatorsCount(to, extendOnSeparators) {
    if (extendOnSeparators === void 0) {
      extendOnSeparators = false;
    }
    let count = 0;
    for (let pos = 0; pos < to; ++pos) {
      if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
        ++count;
        if (extendOnSeparators) to += this.thousandsSeparator.length;
      }
    }
    return count;
  }
  _separatorsCountFromSlice(slice) {
    if (slice === void 0) {
      slice = this._value;
    }
    return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
    return this._removeThousandsSeparators(super.extractInput(fromPos, toPos, flags));
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
    const prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
    this._value = this._removeThousandsSeparators(this.value);
    const oldValue = this._value;
    this._value += ch;
    const num = this.number;
    let accepted = !isNaN(num);
    let skip = false;
    if (accepted) {
      let fixedNum;
      if (this.min != null && this.min < 0 && this.number < this.min) fixedNum = this.min;
      if (this.max != null && this.max > 0 && this.number > this.max) fixedNum = this.max;
      if (fixedNum != null) {
        if (this.autofix) {
          this._value = this.format(fixedNum, this).replace(MaskedNumber.UNMASKED_RADIX, this.radix);
          skip || (skip = oldValue === this._value && !flags.tail); // if not changed on tail it's still ok to proceed
        } else {
          accepted = false;
        }
      }
      accepted && (accepted = Boolean(this._value.match(this._numberRegExp)));
    }
    let appendDetails;
    if (!accepted) {
      this._value = oldValue;
      appendDetails = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    } else {
      appendDetails = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        inserted: this._value.slice(oldValue.length),
        rawInserted: skip ? '' : ch,
        skip
      });
    }
    this._value = this._insertThousandsSeparators(this._value);
    const beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
    const beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
    appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
    return appendDetails;
  }
  _findSeparatorAround(pos) {
    if (this.thousandsSeparator) {
      const searchFrom = pos - this.thousandsSeparator.length + 1;
      const separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
      if (separatorPos <= pos) return separatorPos;
    }
    return -1;
  }
  _adjustRangeWithSeparators(from, to) {
    const separatorAroundFromPos = this._findSeparatorAround(from);
    if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;
    const separatorAroundToPos = this._findSeparatorAround(to);
    if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
    return [from, to];
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
    const valueBeforePos = this.value.slice(0, fromPos);
    const valueAfterPos = this.value.slice(toPos);
    const prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
    const beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
    });
  }
  nearestInputPos(cursorPos, direction) {
    if (!this.thousandsSeparator) return cursorPos;
    switch (direction) {
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT:
        {
          const separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
          if (separatorAtLeftPos >= 0) {
            const separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
            if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT) {
              return separatorAtLeftPos;
            }
          }
          break;
        }
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.RIGHT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_RIGHT:
        {
          const separatorAtRightPos = this._findSeparatorAround(cursorPos);
          if (separatorAtRightPos >= 0) {
            return separatorAtRightPos + this.thousandsSeparator.length;
          }
        }
    }
    return cursorPos;
  }
  doCommit() {
    if (this.value) {
      const number = this.number;
      let validnum = number;

      // check bounds
      if (this.min != null) validnum = Math.max(validnum, this.min);
      if (this.max != null) validnum = Math.min(validnum, this.max);
      if (validnum !== number) this.unmaskedValue = this.format(validnum, this);
      let formatted = this.value;
      if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
      if (this.padFractionalZeros && this.scale > 0) formatted = this._padFractionalZeros(formatted);
      this._value = formatted;
    }
    super.doCommit();
  }
  _normalizeZeros(value) {
    const parts = this._removeThousandsSeparators(value).split(this.radix);

    // remove leading zeros
    parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, (match, sign, zeros, num) => sign + num);
    // add leading zero
    if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';
    if (parts.length > 1) {
      parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros
      if (!parts[1].length) parts.length = 1; // remove fractional
    }
    return this._insertThousandsSeparators(parts.join(this.radix));
  }
  _padFractionalZeros(value) {
    if (!value) return value;
    const parts = value.split(this.radix);
    if (parts.length < 2) parts.push('');
    parts[1] = parts[1].padEnd(this.scale, '0');
    return parts.join(this.radix);
  }
  doSkipInvalid(ch, flags, checkTail) {
    if (flags === void 0) {
      flags = {};
    }
    const dropFractional = this.scale === 0 && ch !== this.thousandsSeparator && (ch === this.radix || ch === MaskedNumber.UNMASKED_RADIX || this.mapToRadix.includes(ch));
    return super.doSkipInvalid(ch, flags, checkTail) && !dropFractional;
  }
  get unmaskedValue() {
    return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, MaskedNumber.UNMASKED_RADIX);
  }
  set unmaskedValue(unmaskedValue) {
    super.unmaskedValue = unmaskedValue;
  }
  get typedValue() {
    return this.parse(this.unmaskedValue, this);
  }
  set typedValue(n) {
    this.rawInputValue = this.format(n, this).replace(MaskedNumber.UNMASKED_RADIX, this.radix);
  }

  /** Parsed Number */
  get number() {
    return this.typedValue;
  }
  set number(number) {
    this.typedValue = number;
  }
  get allowNegative() {
    return this.min != null && this.min < 0 || this.max != null && this.max < 0;
  }
  get allowPositive() {
    return this.min != null && this.min > 0 || this.max != null && this.max > 0;
  }
  typedValueEquals(value) {
    // handle  0 -> '' case (typed = 0 even if value = '')
    // for details see https://github.com/uNmAnNeR/imaskjs/issues/134
    return (super.typedValueEquals(value) || MaskedNumber.EMPTY_VALUES.includes(value) && MaskedNumber.EMPTY_VALUES.includes(this.typedValue)) && !(value === 0 && this.value === '');
  }
}
_MaskedNumber = MaskedNumber;
MaskedNumber.UNMASKED_RADIX = '.';
MaskedNumber.EMPTY_VALUES = [..._base_js__WEBPACK_IMPORTED_MODULE_2__["default"].EMPTY_VALUES, 0];
MaskedNumber.DEFAULTS = {
  ..._base_js__WEBPACK_IMPORTED_MODULE_2__["default"].DEFAULTS,
  mask: Number,
  radix: ',',
  thousandsSeparator: '',
  mapToRadix: [_MaskedNumber.UNMASKED_RADIX],
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  scale: 2,
  normalizeZeros: true,
  padFractionalZeros: false,
  parse: Number,
  format: n => n.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits: 20
  })
};
_core_holder_js__WEBPACK_IMPORTED_MODULE_3__["default"].MaskedNumber = MaskedNumber;




/***/ }),

/***/ 867:
/*!**************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedPattern)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factory.js */ 471);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/input-definition.js */ 260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./regexp.js */ 136);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);












/** Pattern mask */
class MaskedPattern extends _base_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  /** */

  /** */

  /** Single char for empty input */

  /** Single char for filled input */

  /** Show placeholder only when needed */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  constructor(opts) {
    super({
      ...MaskedPattern.DEFAULTS,
      ...opts,
      definitions: Object.assign({}, _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__["default"].DEFAULT_DEFINITIONS, opts == null ? void 0 : opts.definitions)
    });
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    opts.definitions = Object.assign({}, this.definitions, opts.definitions);
    super._update(opts);
    this._rebuildMask();
  }
  _rebuildMask() {
    const defs = this.definitions;
    this._blocks = [];
    this.exposeBlock = undefined;
    this._stops = [];
    this._maskedBlocks = {};
    const pattern = this.mask;
    if (!pattern || !defs) return;
    let unmaskingBlock = false;
    let optionalBlock = false;
    for (let i = 0; i < pattern.length; ++i) {
      if (this.blocks) {
        const p = pattern.slice(i);
        const bNames = Object.keys(this.blocks).filter(bName => p.indexOf(bName) === 0);
        // order by key length
        bNames.sort((a, b) => b.length - a.length);
        // use block name with max length
        const bName = bNames[0];
        if (bName) {
          const {
            expose,
            repeat,
            ...bOpts
          } = (0,_factory_js__WEBPACK_IMPORTED_MODULE_4__.normalizeOpts)(this.blocks[bName]); // TODO type Opts<Arg & Extra>
          const blockOpts = {
            lazy: this.lazy,
            eager: this.eager,
            placeholderChar: this.placeholderChar,
            displayChar: this.displayChar,
            overwrite: this.overwrite,
            autofix: this.autofix,
            ...bOpts,
            repeat,
            parent: this
          };
          const maskedBlock = repeat != null ? new _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].RepeatBlock(blockOpts /* TODO */) : (0,_factory_js__WEBPACK_IMPORTED_MODULE_4__["default"])(blockOpts);
          if (maskedBlock) {
            this._blocks.push(maskedBlock);
            if (expose) this.exposeBlock = maskedBlock;

            // store block index
            if (!this._maskedBlocks[bName]) this._maskedBlocks[bName] = [];
            this._maskedBlocks[bName].push(this._blocks.length - 1);
          }
          i += bName.length - 1;
          continue;
        }
      }
      let char = pattern[i];
      let isInput = (char in defs);
      if (char === MaskedPattern.STOP_CHAR) {
        this._stops.push(this._blocks.length);
        continue;
      }
      if (char === '{' || char === '}') {
        unmaskingBlock = !unmaskingBlock;
        continue;
      }
      if (char === '[' || char === ']') {
        optionalBlock = !optionalBlock;
        continue;
      }
      if (char === MaskedPattern.ESCAPE_CHAR) {
        ++i;
        char = pattern[i];
        if (!char) break;
        isInput = false;
      }
      const def = isInput ? new _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        isOptional: optionalBlock,
        lazy: this.lazy,
        eager: this.eager,
        placeholderChar: this.placeholderChar,
        displayChar: this.displayChar,
        ...(0,_factory_js__WEBPACK_IMPORTED_MODULE_4__.normalizeOpts)(defs[char]),
        parent: this
      }) : new _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
        char,
        eager: this.eager,
        isUnmasking: unmaskingBlock
      });
      this._blocks.push(def);
    }
  }
  get state() {
    return {
      ...super.state,
      _blocks: this._blocks.map(b => b.state)
    };
  }
  set state(state) {
    if (!state) {
      this.reset();
      return;
    }
    const {
      _blocks,
      ...maskedState
    } = state;
    this._blocks.forEach((b, bi) => b.state = _blocks[bi]);
    super.state = maskedState;
  }
  reset() {
    super.reset();
    this._blocks.forEach(b => b.reset());
  }
  get isComplete() {
    return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every(b => b.isComplete);
  }
  get isFilled() {
    return this._blocks.every(b => b.isFilled);
  }
  get isFixed() {
    return this._blocks.every(b => b.isFixed);
  }
  get isOptional() {
    return this._blocks.every(b => b.isOptional);
  }
  doCommit() {
    this._blocks.forEach(b => b.doCommit());
    super.doCommit();
  }
  get unmaskedValue() {
    return this.exposeBlock ? this.exposeBlock.unmaskedValue : this._blocks.reduce((str, b) => str += b.unmaskedValue, '');
  }
  set unmaskedValue(unmaskedValue) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.unmaskedValue = unmaskedValue;
      this.appendTail(tail);
      this.doCommit();
    } else super.unmaskedValue = unmaskedValue;
  }
  get value() {
    return this.exposeBlock ? this.exposeBlock.value :
    // TODO return _value when not in change?
    this._blocks.reduce((str, b) => str += b.value, '');
  }
  set value(value) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.value = value;
      this.appendTail(tail);
      this.doCommit();
    } else super.value = value;
  }
  get typedValue() {
    return this.exposeBlock ? this.exposeBlock.typedValue : super.typedValue;
  }
  set typedValue(value) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.typedValue = value;
      this.appendTail(tail);
      this.doCommit();
    } else super.typedValue = value;
  }
  get displayValue() {
    return this._blocks.reduce((str, b) => str += b.displayValue, '');
  }
  appendTail(tail) {
    return super.appendTail(tail).aggregate(this._appendPlaceholder());
  }
  _appendEager() {
    var _this$_mapPosToBlock;
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    let startBlockIndex = (_this$_mapPosToBlock = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : _this$_mapPosToBlock.index;
    if (startBlockIndex == null) return details;

    // TODO test if it works for nested pattern masks
    if (this._blocks[startBlockIndex].isFilled) ++startBlockIndex;
    for (let bi = startBlockIndex; bi < this._blocks.length; ++bi) {
      const d = this._blocks[bi]._appendEager();
      if (!d.inserted) break;
      details.aggregate(d);
    }
    return details;
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const blockIter = this._mapPosToBlock(this.displayValue.length);
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (!blockIter) return details;
    for (let bi = blockIter.index, block; block = this._blocks[bi]; ++bi) {
      var _flags$_beforeTailSta;
      const blockDetails = block._appendChar(ch, {
        ...flags,
        _beforeTailState: (_flags$_beforeTailSta = flags._beforeTailState) == null || (_flags$_beforeTailSta = _flags$_beforeTailSta._blocks) == null ? void 0 : _flags$_beforeTailSta[bi]
      });
      details.aggregate(blockDetails);
      if (blockDetails.consumed) break; // go next char
    }
    return details;
  }
  extractTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const chunkTail = new _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    if (fromPos === toPos) return chunkTail;
    this._forEachBlocksInRange(fromPos, toPos, (b, bi, bFromPos, bToPos) => {
      const blockChunk = b.extractTail(bFromPos, bToPos);
      blockChunk.stop = this._findStopBefore(bi);
      blockChunk.from = this._blockStartPos(bi);
      if (blockChunk instanceof _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_5__["default"]) blockChunk.blockIndex = bi;
      chunkTail.extend(blockChunk);
    });
    return chunkTail;
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    if (flags === void 0) {
      flags = {};
    }
    if (fromPos === toPos) return '';
    let input = '';
    this._forEachBlocksInRange(fromPos, toPos, (b, _, fromPos, toPos) => {
      input += b.extractInput(fromPos, toPos, flags);
    });
    return input;
  }
  _findStopBefore(blockIndex) {
    let stopBefore;
    for (let si = 0; si < this._stops.length; ++si) {
      const stop = this._stops[si];
      if (stop <= blockIndex) stopBefore = stop;else break;
    }
    return stopBefore;
  }

  /** Appends placeholder depending on laziness */
  _appendPlaceholder(toBlockIndex) {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (this.lazy && toBlockIndex == null) return details;
    const startBlockIter = this._mapPosToBlock(this.displayValue.length);
    if (!startBlockIter) return details;
    const startBlockIndex = startBlockIter.index;
    const endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
    this._blocks.slice(startBlockIndex, endBlockIndex).forEach(b => {
      if (!b.lazy || toBlockIndex != null) {
        var _blocks2;
        details.aggregate(b._appendPlaceholder((_blocks2 = b._blocks) == null ? void 0 : _blocks2.length));
      }
    });
    return details;
  }

  /** Finds block in pos */
  _mapPosToBlock(pos) {
    let accVal = '';
    for (let bi = 0; bi < this._blocks.length; ++bi) {
      const block = this._blocks[bi];
      const blockStartPos = accVal.length;
      accVal += block.displayValue;
      if (pos <= accVal.length) {
        return {
          index: bi,
          offset: pos - blockStartPos
        };
      }
    }
  }
  _blockStartPos(blockIndex) {
    return this._blocks.slice(0, blockIndex).reduce((pos, b) => pos += b.displayValue.length, 0);
  }
  _forEachBlocksInRange(fromPos, toPos, fn) {
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const fromBlockIter = this._mapPosToBlock(fromPos);
    if (fromBlockIter) {
      const toBlockIter = this._mapPosToBlock(toPos);
      // process first block
      const isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
      const fromBlockStartPos = fromBlockIter.offset;
      const fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].displayValue.length;
      fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
      if (toBlockIter && !isSameBlock) {
        // process intermediate blocks
        for (let bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
          fn(this._blocks[bi], bi, 0, this._blocks[bi].displayValue.length);
        }

        // process last block
        fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
      }
    }
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const removeDetails = super.remove(fromPos, toPos);
    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      removeDetails.aggregate(b.remove(bFromPos, bToPos));
    });
    return removeDetails;
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE;
    }
    if (!this._blocks.length) return 0;
    const cursor = new _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_6__["default"](this, cursorPos);
    if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE) {
      // -------------------------------------------------
      // NONE should only go out from fixed to the right!
      // -------------------------------------------------
      if (cursor.pushRightBeforeInput()) return cursor.pos;
      cursor.popState();
      if (cursor.pushLeftBeforeInput()) return cursor.pos;
      return this.displayValue.length;
    }

    // FORCE is only about a|* otherwise is 0
    if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT || direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_LEFT) {
      // try to break fast when *|a
      if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT) {
        cursor.pushRightBeforeFilled();
        if (cursor.ok && cursor.pos === cursorPos) return cursorPos;
        cursor.popState();
      }

      // forward flow
      cursor.pushLeftBeforeInput();
      cursor.pushLeftBeforeRequired();
      cursor.pushLeftBeforeFilled();

      // backward flow
      if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT) {
        cursor.pushRightBeforeInput();
        cursor.pushRightBeforeRequired();
        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
        cursor.popState();
        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
        cursor.popState();
      }
      if (cursor.ok) return cursor.pos;
      if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_LEFT) return 0;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      return 0;
    }
    if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.RIGHT || direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_RIGHT) {
      // forward flow
      cursor.pushRightBeforeInput();
      cursor.pushRightBeforeRequired();
      if (cursor.pushRightBeforeFilled()) return cursor.pos;
      if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_RIGHT) return this.displayValue.length;

      // backward flow
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      return this.nearestInputPos(cursorPos, _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT);
    }
    return cursorPos;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    let total = 0;
    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      total += b.totalInputPositions(bFromPos, bToPos);
    });
    return total;
  }

  /** Get block by name */
  maskedBlock(name) {
    return this.maskedBlocks(name)[0];
  }

  /** Get all blocks by name */
  maskedBlocks(name) {
    const indices = this._maskedBlocks[name];
    if (!indices) return [];
    return indices.map(gi => this._blocks[gi]);
  }
  pad(flags) {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._forEachBlocksInRange(0, this.displayValue.length, b => details.aggregate(b.pad(flags)));
    return details;
  }
}
MaskedPattern.DEFAULTS = {
  ..._base_js__WEBPACK_IMPORTED_MODULE_3__["default"].DEFAULTS,
  lazy: true,
  placeholderChar: '_'
};
MaskedPattern.STOP_CHAR = '`';
MaskedPattern.ESCAPE_CHAR = '\\';
MaskedPattern.InputDefinition = _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__["default"];
MaskedPattern.FixedDefinition = _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_7__["default"];
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedPattern = MaskedPattern;




/***/ }),

/***/ 403:
/*!*********************************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern/chunk-tail-details.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChunksTailDetails)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/change-details.js */ 472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils.js */ 938);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/continuous-tail-details.js */ 476);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/holder.js */ 885);





class ChunksTailDetails {
  /** */

  constructor(chunks, from) {
    if (chunks === void 0) {
      chunks = [];
    }
    if (from === void 0) {
      from = 0;
    }
    this.chunks = chunks;
    this.from = from;
  }
  toString() {
    return this.chunks.map(String).join('');
  }
  extend(tailChunk) {
    if (!String(tailChunk)) return;
    tailChunk = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(tailChunk) ? new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"](String(tailChunk)) : tailChunk;
    const lastChunk = this.chunks[this.chunks.length - 1];
    const extendLast = lastChunk && (
    // if stops are same or tail has no stop
    lastChunk.stop === tailChunk.stop || tailChunk.stop == null) &&
    // if tail chunk goes just after last chunk
    tailChunk.from === lastChunk.from + lastChunk.toString().length;
    if (tailChunk instanceof _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      // check the ability to extend previous chunk
      if (extendLast) {
        // extend previous chunk
        lastChunk.extend(tailChunk.toString());
      } else {
        // append new chunk
        this.chunks.push(tailChunk);
      }
    } else if (tailChunk instanceof ChunksTailDetails) {
      if (tailChunk.stop == null) {
        // unwrap floating chunks to parent, keeping `from` pos
        let firstTailChunk;
        while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
          firstTailChunk = tailChunk.chunks.shift(); // not possible to be `undefined` because length was checked above
          firstTailChunk.from += tailChunk.from;
          this.extend(firstTailChunk);
        }
      }

      // if tail chunk still has value
      if (tailChunk.toString()) {
        // if chunks contains stops, then popup stop to container
        tailChunk.stop = tailChunk.blockIndex;
        this.chunks.push(tailChunk);
      }
    }
  }
  appendTo(masked) {
    if (!(masked instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_3__["default"].MaskedPattern)) {
      const tail = new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.toString());
      return tail.appendTo(masked);
    }
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    for (let ci = 0; ci < this.chunks.length; ++ci) {
      const chunk = this.chunks[ci];
      const lastBlockIter = masked._mapPosToBlock(masked.displayValue.length);
      const stop = chunk.stop;
      let chunkBlock;
      if (stop != null && (
      // if block not found or stop is behind lastBlock
      !lastBlockIter || lastBlockIter.index <= stop)) {
        if (chunk instanceof ChunksTailDetails ||
        // for continuous block also check if stop is exist
        masked._stops.indexOf(stop) >= 0) {
          details.aggregate(masked._appendPlaceholder(stop));
        }
        chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
      }
      if (chunkBlock) {
        const tailDetails = chunkBlock.appendTail(chunk);
        details.aggregate(tailDetails);

        // get not inserted chars
        const remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
        if (remainChars) details.aggregate(masked.append(remainChars, {
          tail: true
        }));
      } else {
        details.aggregate(masked.append(chunk.toString(), {
          tail: true
        }));
      }
    }
    return details;
  }
  get state() {
    return {
      chunks: this.chunks.map(c => c.state),
      from: this.from,
      stop: this.stop,
      blockIndex: this.blockIndex
    };
  }
  set state(state) {
    const {
      chunks,
      ...props
    } = state;
    Object.assign(this, props);
    this.chunks = chunks.map(cstate => {
      const chunk = "chunks" in cstate ? new ChunksTailDetails() : new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
      chunk.state = cstate;
      return chunk;
    });
  }
  unshift(beforePos) {
    if (!this.chunks.length || beforePos != null && this.from >= beforePos) return '';
    const chunkShiftPos = beforePos != null ? beforePos - this.from : beforePos;
    let ci = 0;
    while (ci < this.chunks.length) {
      const chunk = this.chunks[ci];
      const shiftChar = chunk.unshift(chunkShiftPos);
      if (chunk.toString()) {
        // chunk still contains value
        // but not shifted - means no more available chars to shift
        if (!shiftChar) break;
        ++ci;
      } else {
        // clean if chunk has no value
        this.chunks.splice(ci, 1);
      }
      if (shiftChar) return shiftChar;
    }
    return '';
  }
  shift() {
    if (!this.chunks.length) return '';
    let ci = this.chunks.length - 1;
    while (0 <= ci) {
      const chunk = this.chunks[ci];
      const shiftChar = chunk.shift();
      if (chunk.toString()) {
        // chunk still contains value
        // but not shifted - means no more available chars to shift
        if (!shiftChar) break;
        --ci;
      } else {
        // clean if chunk has no value
        this.chunks.splice(ci, 1);
      }
      if (shiftChar) return shiftChar;
    }
    return '';
  }
}




/***/ }),

/***/ 976:
/*!*********************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern/cursor.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternCursor)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils.js */ 938);


class PatternCursor {
  constructor(masked, pos) {
    this.masked = masked;
    this._log = [];
    const {
      offset,
      index
    } = masked._mapPosToBlock(pos) || (pos < 0 ?
    // first
    {
      index: 0,
      offset: 0
    } :
    // last
    {
      index: this.masked._blocks.length,
      offset: 0
    });
    this.offset = offset;
    this.index = index;
    this.ok = false;
  }
  get block() {
    return this.masked._blocks[this.index];
  }
  get pos() {
    return this.masked._blockStartPos(this.index) + this.offset;
  }
  get state() {
    return {
      index: this.index,
      offset: this.offset,
      ok: this.ok
    };
  }
  set state(s) {
    Object.assign(this, s);
  }
  pushState() {
    this._log.push(this.state);
  }
  popState() {
    const s = this._log.pop();
    if (s) this.state = s;
    return s;
  }
  bindBlock() {
    if (this.block) return;
    if (this.index < 0) {
      this.index = 0;
      this.offset = 0;
    }
    if (this.index >= this.masked._blocks.length) {
      this.index = this.masked._blocks.length - 1;
      this.offset = this.block.displayValue.length; // TODO this is stupid type error, `block` depends on index that was changed above
    }
  }
  _pushLeft(fn) {
    this.pushState();
    for (this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((_this$block = this.block) == null ? void 0 : _this$block.displayValue.length) || 0) {
      var _this$block;
      if (fn()) return this.ok = true;
    }
    return this.ok = false;
  }
  _pushRight(fn) {
    this.pushState();
    for (this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0) {
      if (fn()) return this.ok = true;
    }
    return this.ok = false;
  }
  pushLeftBeforeFilled() {
    return this._pushLeft(() => {
      if (this.block.isFixed || !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT);
      if (this.offset !== 0) return true;
    });
  }
  pushLeftBeforeInput() {
    // cases:
    // filled input: 00|
    // optional empty input: 00[]|
    // nested block: XX<[]>|
    return this._pushLeft(() => {
      if (this.block.isFixed) return;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT);
      return true;
    });
  }
  pushLeftBeforeRequired() {
    return this._pushLeft(() => {
      if (this.block.isFixed || this.block.isOptional && !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT);
      return true;
    });
  }
  pushRightBeforeFilled() {
    return this._pushRight(() => {
      if (this.block.isFixed || !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_RIGHT);
      if (this.offset !== this.block.value.length) return true;
    });
  }
  pushRightBeforeInput() {
    return this._pushRight(() => {
      if (this.block.isFixed) return;

      // const o = this.offset;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE);
      // HACK cases like (STILL DOES NOT WORK FOR NESTED)
      // aa|X
      // aa<X|[]>X_    - this will not work
      // if (o && o === this.offset && this.block instanceof PatternInputDefinition) continue;
      return true;
    });
  }
  pushRightBeforeRequired() {
    return this._pushRight(() => {
      if (this.block.isFixed || this.block.isOptional && !this.block.value) return;

      // TODO check |[*]XX_
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE);
      return true;
    });
  }
}




/***/ }),

/***/ 370:
/*!*******************************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern/fixed-definition.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternFixedDefinition)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/change-details.js */ 472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils.js */ 938);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/continuous-tail-details.js */ 476);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/holder.js */ 885);





class PatternFixedDefinition {
  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  constructor(opts) {
    Object.assign(this, opts);
    this._value = '';
    this.isFixed = true;
  }
  get value() {
    return this._value;
  }
  get unmaskedValue() {
    return this.isUnmasking ? this.value : '';
  }
  get rawInputValue() {
    return this._isRawInput ? this.value : '';
  }
  get displayValue() {
    return this.value;
  }
  reset() {
    this._isRawInput = false;
    this._value = '';
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
    if (!this._value) this._isRawInput = false;
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.NONE;
    }
    const minPos = 0;
    const maxPos = this._value.length;
    switch (direction) {
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.LEFT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.FORCE_LEFT:
        return minPos;
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.NONE:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.RIGHT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.FORCE_RIGHT:
      default:
        return maxPos;
    }
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    return this._isRawInput ? toPos - fromPos : 0;
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    if (flags === void 0) {
      flags = {};
    }
    return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
  }
  get isComplete() {
    return true;
  }
  get isFilled() {
    return Boolean(this._value);
  }
  _appendChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    if (this.isFilled) return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const appendEager = this.eager === true || this.eager === 'append';
    const appended = this.char === ch;
    const isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && (!flags.raw || !appendEager) && !flags.tail;
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      inserted: this.char,
      rawInserted: isResolved ? this.char : ''
    });
    this._value = this.char;
    this._isRawInput = isResolved && (flags.raw || flags.input);
    return details;
  }
  _appendEager() {
    return this._appendChar(this.char, {
      tail: true
    });
  }
  _appendPlaceholder() {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (this.isFilled) return details;
    this._value = details.inserted = this.char;
    return details;
  }
  extractTail() {
    return new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"]('');
  }
  appendTail(tail) {
    if ((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(tail)) tail = new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"](String(tail));
    return tail.appendTo(this);
  }
  append(str, flags, tail) {
    const details = this._appendChar(str[0], flags);
    if (tail != null) {
      details.tailShift += this.appendTail(tail).tailShift;
    }
    return details;
  }
  doCommit() {}
  get state() {
    return {
      _value: this._value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(state) {
    this._value = state._value;
    this._isRawInput = Boolean(state._rawInputValue);
  }
  pad(flags) {
    return this._appendPlaceholder();
  }
}




/***/ }),

/***/ 260:
/*!*******************************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern/input-definition.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternInputDefinition)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ 471);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/change-details.js */ 472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils.js */ 938);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/holder.js */ 885);





class PatternInputDefinition {
  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  constructor(opts) {
    const {
      parent,
      isOptional,
      placeholderChar,
      displayChar,
      lazy,
      eager,
      ...maskOpts
    } = opts;
    this.masked = (0,_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(maskOpts);
    Object.assign(this, {
      parent,
      isOptional,
      placeholderChar,
      displayChar,
      lazy,
      eager
    });
  }
  reset() {
    this.isFilled = false;
    this.masked.reset();
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    if (fromPos === 0 && toPos >= 1) {
      this.isFilled = false;
      return this.masked.remove(fromPos, toPos);
    }
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  get value() {
    return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : '');
  }
  get unmaskedValue() {
    return this.masked.unmaskedValue;
  }
  get rawInputValue() {
    return this.masked.rawInputValue;
  }
  get displayValue() {
    return this.masked.value && this.displayChar || this.value;
  }
  get isComplete() {
    return Boolean(this.masked.value) || this.isOptional;
  }
  _appendChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    if (this.isFilled) return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const state = this.masked.state;
    // simulate input
    let details = this.masked._appendChar(ch, this.currentMaskFlags(flags));
    if (details.inserted && this.doValidate(flags) === false) {
      details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.masked.state = state;
    }
    if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
      details.inserted = this.placeholderChar;
    }
    details.skip = !details.inserted && !this.isOptional;
    this.isFilled = Boolean(details.inserted);
    return details;
  }
  append(str, flags, tail) {
    // TODO probably should be done via _appendChar
    return this.masked.append(str, this.currentMaskFlags(flags), tail);
  }
  _appendPlaceholder() {
    if (this.isFilled || this.isOptional) return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.isFilled = true;
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      inserted: this.placeholderChar
    });
  }
  _appendEager() {
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  extractTail(fromPos, toPos) {
    return this.masked.extractTail(fromPos, toPos);
  }
  appendTail(tail) {
    return this.masked.appendTail(tail);
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    return this.masked.extractInput(fromPos, toPos, flags);
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE;
    }
    const minPos = 0;
    const maxPos = this.value.length;
    const boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
    switch (direction) {
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_LEFT:
        return this.isComplete ? boundPos : minPos;
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.RIGHT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_RIGHT:
        return this.isComplete ? boundPos : maxPos;
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE:
      default:
        return boundPos;
    }
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    return this.value.slice(fromPos, toPos).length;
  }
  doValidate(flags) {
    return this.masked.doValidate(this.currentMaskFlags(flags)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(flags)));
  }
  doCommit() {
    this.masked.doCommit();
  }
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue,
      masked: this.masked.state,
      isFilled: this.isFilled
    };
  }
  set state(state) {
    this.masked.state = state.masked;
    this.isFilled = state.isFilled;
  }
  currentMaskFlags(flags) {
    var _flags$_beforeTailSta;
    return {
      ...flags,
      _beforeTailState: (flags == null || (_flags$_beforeTailSta = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta.masked) || (flags == null ? void 0 : flags._beforeTailState)
    };
  }
  pad(flags) {
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
}
PatternInputDefinition.DEFAULT_DEFINITIONS = {
  '0': /\d/,
  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  // http://stackoverflow.com/a/22075070
  '*': /./
};




/***/ }),

/***/ 509:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/masked/pipe.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PIPE_TYPE: () => (/* binding */ PIPE_TYPE),
/* harmony export */   createPipe: () => (/* binding */ createPipe),
/* harmony export */   pipe: () => (/* binding */ pipe)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory.js */ 471);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ 938);




/** Mask pipe source and destination types */
const PIPE_TYPE = {
  MASKED: 'value',
  UNMASKED: 'unmaskedValue',
  TYPED: 'typedValue'
};
/** Creates new pipe function depending on mask type, source and destination options */
function createPipe(arg, from, to) {
  if (from === void 0) {
    from = PIPE_TYPE.MASKED;
  }
  if (to === void 0) {
    to = PIPE_TYPE.MASKED;
  }
  const masked = (0,_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arg);
  return value => masked.runIsolated(m => {
    m[from] = value;
    return m[to];
  });
}

/** Pipes value through mask depending on mask type, source and destination options */
function pipe(value, mask, from, to) {
  return createPipe(mask, from, to)(value);
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].PIPE_TYPE = PIPE_TYPE;
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].createPipe = createPipe;
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].pipe = pipe;




/***/ }),

/***/ 600:
/*!************************************************!*\
  !*** ./node_modules/imask/esm/masked/range.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedRange)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pattern.js */ 867);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factory.js */ 471);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern/input-definition.js */ 260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./regexp.js */ 136);













/** Pattern which accepts ranges */
class MaskedRange extends _pattern_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
    Optionally sets max length of pattern.
    Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
  */

  /** Min bound */

  /** Max bound */

  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }
  constructor(opts) {
    super(opts); // mask will be created in _update
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      to = this.to || 0,
      from = this.from || 0,
      maxLength = this.maxLength || 0,
      autofix = this.autofix,
      ...patternOpts
    } = opts;
    this.to = to;
    this.from = from;
    this.maxLength = Math.max(String(to).length, maxLength);
    this.autofix = autofix;
    const fromStr = String(this.from).padStart(this.maxLength, '0');
    const toStr = String(this.to).padStart(this.maxLength, '0');
    let sameCharsCount = 0;
    while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) ++sameCharsCount;
    patternOpts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(this.maxLength - sameCharsCount);
    super._update(patternOpts);
  }
  get isComplete() {
    return super.isComplete && Boolean(this.value);
  }
  boundaries(str) {
    let minstr = '';
    let maxstr = '';
    const [, placeholder, num] = str.match(/^(\D*)(\d*)(\D*)/) || [];
    if (num) {
      minstr = '0'.repeat(placeholder.length) + num;
      maxstr = '9'.repeat(placeholder.length) + num;
    }
    minstr = minstr.padEnd(this.maxLength, '0');
    maxstr = maxstr.padEnd(this.maxLength, '9');
    return [minstr, maxstr];
  }
  doPrepareChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let details;
    [ch, details] = super.doPrepareChar(ch.replace(/\D/g, ''), flags);
    if (!ch) details.skip = !this.isComplete;
    return [ch, details];
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    if (!this.autofix || this.value.length + 1 > this.maxLength) return super._appendCharRaw(ch, flags);
    const fromStr = String(this.from).padStart(this.maxLength, '0');
    const toStr = String(this.to).padStart(this.maxLength, '0');
    const [minstr, maxstr] = this.boundaries(this.value + ch);
    if (Number(maxstr) < this.from) return super._appendCharRaw(fromStr[this.value.length], flags);
    if (Number(minstr) > this.to) {
      if (!flags.tail && this.autofix === 'pad' && this.value.length + 1 < this.maxLength) {
        return super._appendCharRaw(fromStr[this.value.length], flags).aggregate(this._appendCharRaw(ch, flags));
      }
      return super._appendCharRaw(toStr[this.value.length], flags);
    }
    return super._appendCharRaw(ch, flags);
  }
  doValidate(flags) {
    const str = this.value;
    const firstNonZero = str.search(/[^0]/);
    if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
    const [minstr, maxstr] = this.boundaries(str);
    return this.from <= Number(maxstr) && Number(minstr) <= this.to && super.doValidate(flags);
  }
  pad(flags) {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (this.value.length === this.maxLength) return details;
    const value = this.value;
    const padLength = this.maxLength - this.value.length;
    if (padLength) {
      this.reset();
      for (let i = 0; i < padLength; ++i) {
        details.aggregate(super._appendCharRaw('0', flags));
      }

      // append tail
      value.split('').forEach(ch => this._appendCharRaw(ch));
    }
    return details;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedRange = MaskedRange;




/***/ }),

/***/ 136:
/*!*************************************************!*\
  !*** ./node_modules/imask/esm/masked/regexp.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedRegExp)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils.js */ 938);






/** Masking by RegExp */
class MaskedRegExp extends _base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const mask = opts.mask;
    if (mask) opts.validate = value => value.search(mask) >= 0;
    super._update(opts);
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedRegExp = MaskedRegExp;




/***/ }),

/***/ 474:
/*!*************************************************!*\
  !*** ./node_modules/imask/esm/masked/repeat.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RepeatBlock)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/change-details.js */ 472);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 885);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factory.js */ 471);
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pattern.js */ 867);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils.js */ 938);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.js */ 168);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 476);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern/input-definition.js */ 260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./regexp.js */ 136);













/** Pattern mask */
class RepeatBlock extends _pattern_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  get repeatFrom() {
    var _ref;
    return (_ref = Array.isArray(this.repeat) ? this.repeat[0] : this.repeat === Infinity ? 0 : this.repeat) != null ? _ref : 0;
  }
  get repeatTo() {
    var _ref2;
    return (_ref2 = Array.isArray(this.repeat) ? this.repeat[1] : this.repeat) != null ? _ref2 : Infinity;
  }
  constructor(opts) {
    super(opts);
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    var _ref3, _ref4, _this$_blocks;
    const {
      repeat,
      ...blockOpts
    } = (0,_factory_js__WEBPACK_IMPORTED_MODULE_2__.normalizeOpts)(opts); // TODO type
    this._blockOpts = Object.assign({}, this._blockOpts, blockOpts);
    const block = (0,_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this._blockOpts);
    this.repeat = (_ref3 = (_ref4 = repeat != null ? repeat : block.repeat) != null ? _ref4 : this.repeat) != null ? _ref3 : Infinity; // TODO type

    super._update({
      mask: 'm'.repeat(Math.max(this.repeatTo === Infinity && ((_this$_blocks = this._blocks) == null ? void 0 : _this$_blocks.length) || 0, this.repeatFrom)),
      blocks: {
        m: block
      },
      eager: block.eager,
      overwrite: block.overwrite,
      skipInvalid: block.skipInvalid,
      lazy: block.lazy,
      placeholderChar: block.placeholderChar,
      displayChar: block.displayChar
    });
  }
  _allocateBlock(bi) {
    if (bi < this._blocks.length) return this._blocks[bi];
    if (this.repeatTo === Infinity || this._blocks.length < this.repeatTo) {
      this._blocks.push((0,_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this._blockOpts));
      this.mask += 'm';
      return this._blocks[this._blocks.length - 1];
    }
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    for (let bi = (_this$_mapPosToBlock$ = (_this$_mapPosToBlock = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : _this$_mapPosToBlock.index) != null ? _this$_mapPosToBlock$ : Math.max(this._blocks.length - 1, 0), block, allocated;
    // try to get a block or
    // try to allocate a new block if not allocated already
    block = (_this$_blocks$bi = this._blocks[bi]) != null ? _this$_blocks$bi : allocated = !allocated && this._allocateBlock(bi); ++bi) {
      var _this$_mapPosToBlock$, _this$_mapPosToBlock, _this$_blocks$bi, _flags$_beforeTailSta;
      const blockDetails = block._appendChar(ch, {
        ...flags,
        _beforeTailState: (_flags$_beforeTailSta = flags._beforeTailState) == null || (_flags$_beforeTailSta = _flags$_beforeTailSta._blocks) == null ? void 0 : _flags$_beforeTailSta[bi]
      });
      if (blockDetails.skip && allocated) {
        // remove the last allocated block and break
        this._blocks.pop();
        this.mask = this.mask.slice(1);
        break;
      }
      details.aggregate(blockDetails);
      if (blockDetails.consumed) break; // go next char
    }
    return details;
  }
  _trimEmptyTail(fromPos, toPos) {
    var _this$_mapPosToBlock2, _this$_mapPosToBlock3;
    if (fromPos === void 0) {
      fromPos = 0;
    }
    const firstBlockIndex = Math.max(((_this$_mapPosToBlock2 = this._mapPosToBlock(fromPos)) == null ? void 0 : _this$_mapPosToBlock2.index) || 0, this.repeatFrom, 0);
    let lastBlockIndex;
    if (toPos != null) lastBlockIndex = (_this$_mapPosToBlock3 = this._mapPosToBlock(toPos)) == null ? void 0 : _this$_mapPosToBlock3.index;
    if (lastBlockIndex == null) lastBlockIndex = this._blocks.length - 1;
    let removeCount = 0;
    for (let blockIndex = lastBlockIndex; firstBlockIndex <= blockIndex; --blockIndex, ++removeCount) {
      if (this._blocks[blockIndex].unmaskedValue) break;
    }
    if (removeCount) {
      this._blocks.splice(lastBlockIndex - removeCount + 1, removeCount);
      this.mask = this.mask.slice(removeCount);
    }
  }
  reset() {
    super.reset();
    this._trimEmptyTail();
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const removeDetails = super.remove(fromPos, toPos);
    this._trimEmptyTail(fromPos, toPos);
    return removeDetails;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos == null && this.repeatTo === Infinity) return Infinity;
    return super.totalInputPositions(fromPos, toPos);
  }
  get state() {
    return super.state;
  }
  set state(state) {
    this._blocks.length = state._blocks.length;
    this.mask = this.mask.slice(0, this._blocks.length);
    super.state = state;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].RepeatBlock = RepeatBlock;




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQUs7O0FBRStCOzs7Ozs7Ozs7Ozs7Ozs7QUM5Q3BDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNEM7Ozs7Ozs7Ozs7Ozs7OztBQ3RENUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ041QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0RBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLGFBQWEsOERBQWM7QUFDM0IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGNBQWM7QUFDN0IsYUFBYSxjQUFjO0FBQzNCO0FBQ0EsS0FBSyxnREFBTTtBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5R0FBeUcscURBQVM7QUFDbEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUhBQXVILHFEQUFTO0FBQ2hJO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQUs7O0FBRStCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwVks7QUFDSDtBQUNnQjtBQUNUO0FBQzBCO0FBQ3BEO0FBQ0c7QUFDbUI7QUFDWjtBQUNVO0FBQ0E7QUFDbEI7O0FBRXJCO0FBQ0EseUJBQXlCLG1EQUFhO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxHQUFHO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELHFEQUFTO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLCtEQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsd0VBQXFCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsK0RBQWE7QUFDbkQsd0RBQXdELHFEQUFTO0FBQ2pFO0FBQ0Esd0JBQXdCLFVBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLG1EQUFhO0FBQ2xCO0FBQ0E7QUFDQSx1REFBSzs7QUFFNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRzJCO0FBQ3RCOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyx1REFBSztBQUMxQyxNQUFNLHdEQUFRLGVBQWUsdURBQUs7QUFDbEMsNEJBQTRCLHVEQUFLO0FBQ2pDLDhCQUE4Qix1REFBSztBQUNuQyxvREFBb0QsdURBQUs7QUFDekQsTUFBTSx1REFBSyxxQ0FBcUMsdURBQUs7QUFDckQsTUFBTSx1REFBSywyQkFBMkIsdURBQUs7QUFDM0MsdUNBQXVDLHVEQUFLO0FBQzVDLGlEQUFpRDtBQUNqRCxTQUFTLHVEQUFLO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1REFBSztBQUNYLGtDQUFrQyx1REFBSztBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sa0JBQWtCLHVEQUFLO0FBQzdCO0FBQ0EsTUFBTSxFQUFFLHdEQUFRLCtCQUErQix1REFBSztBQUNwRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLG9EQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyx3REFBUTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsY0FBYztBQUMvQjtBQUNBLE1BQU0sdURBQUssMkJBQTJCLHVEQUFLO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQUs7O0FBRXdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hIOUI7QUFDTztBQUNIO0FBQ1M7QUFDbEI7O0FBRTFCO0FBQ0EsNkJBQTZCLGdEQUFNO0FBQ25DOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx1REFBSzs7QUFFZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJzQjtBQUNMO0FBQ3ZCO0FBQ087QUFDTTs7QUFFNUM7QUFDQTtBQUNBLDJCQUEyQixnREFBTTtBQUNqQzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDREQUFZLG9CQUFvQixxQkFBcUI7QUFDekY7QUFDQSxrRUFBa0Usd0RBQVk7QUFDOUUsZ0RBQWdELDREQUFZO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLEVBQUU7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsVUFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0RBQWE7QUFDdkMsTUFBTTtBQUNOLDBCQUEwQiwrREFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsK0RBQWE7QUFDNUI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHFEQUFTO0FBQ3BCLFdBQVcscURBQVM7QUFDcEIsV0FBVyxxREFBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlIQUFpSCxxREFBUztBQUMxSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxREFBUztBQUNwQixXQUFXLHFEQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUMsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGdEQUFNO0FBQ3RDO0FBQ0EsS0FBSyxnREFBTTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsdURBQUs7O0FBRThCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pUbUI7QUFDaEI7QUFDTztBQUNkO0FBQzBCO0FBQ087QUFDaEI7QUFDbUI7QUFDQTtBQUM5QztBQUN1Qjs7QUFFNUM7QUFDQSw0QkFBNEIsZ0RBQU07QUFDbEM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsRUFBRSxvRUFBc0I7QUFDM0QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0JBQW9CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksRUFBRSwwREFBYSxzQkFBc0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCx1REFBSyxxQ0FBcUMsdURBQVU7QUFDdkc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLG9FQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVywwREFBYTtBQUN4QjtBQUNBLE9BQU8sUUFBUSxvRUFBc0I7QUFDckM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUFhO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQywwQkFBMEI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBLDBDQUEwQywwQkFBMEI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsc0VBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msc0VBQWlCO0FBQ2pEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHlCQUF5QjtBQUM5QztBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwQkFBMEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msd0JBQXdCO0FBQ3ZFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHFEQUFTO0FBQzNCO0FBQ0E7QUFDQSx1QkFBdUIsMERBQWE7QUFDcEMsc0JBQXNCLHFEQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IscURBQVMsdUJBQXVCLHFEQUFTO0FBQy9EO0FBQ0Esd0JBQXdCLHFEQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLHFEQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscURBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFEQUFTLHdCQUF3QixxREFBUztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixxREFBUzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxxREFBUztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGdEQUFNO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxvRUFBc0I7QUFDdEQsZ0NBQWdDLG9FQUFzQjtBQUN0RCx1REFBSzs7QUFFK0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvY3FCO0FBQ1Y7QUFDMkI7QUFDakM7O0FBRXpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFRLGtCQUFrQix3RUFBcUI7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHdFQUFxQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVEQUFLO0FBQ2pDLHVCQUF1Qix3RUFBcUI7QUFDNUM7QUFDQTtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQyxxQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUTtBQUNSO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLHVFQUF1RSx3RUFBcUI7QUFDNUY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFd0M7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SlE7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIseUNBQXlDO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELHFEQUFTO0FBQ3JFO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQscURBQVM7QUFDckU7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQscURBQVM7QUFDckU7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQscURBQVM7QUFDckU7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0REFBNEQscURBQVM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDREQUE0RCxxREFBUztBQUNyRTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xJcUI7QUFDQztBQUNnQjtBQUM1Qzs7QUFFOUI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLCtEQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixxREFBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscURBQVM7QUFDcEIsV0FBVyxxREFBUztBQUNwQjtBQUNBLFdBQVcscURBQVM7QUFDcEIsV0FBVyxxREFBUztBQUNwQixXQUFXLHFEQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsK0RBQWE7QUFDL0M7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUFhO0FBQ3JDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3RUFBcUI7QUFDcEM7QUFDQTtBQUNBLFFBQVEsd0RBQVEsbUJBQW1CLHdFQUFxQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpOO0FBQ2tCO0FBQ1Q7QUFDbEI7O0FBRTlCO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGtCQUFrQix1REFBVTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsK0RBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQywrREFBYTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwrREFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELCtEQUFhO0FBQ2xFO0FBQ0EsZUFBZSwrREFBYTtBQUM1QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZUFBZSwrREFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscURBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscURBQVM7QUFDcEIsV0FBVyxxREFBUztBQUNwQjtBQUNBLFdBQVcscURBQVM7QUFDcEIsV0FBVyxxREFBUztBQUNwQjtBQUNBLFdBQVcscURBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrREFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxTFA7QUFDQTtBQUNaOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVEQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFLO0FBQ0wsdURBQUs7QUFDTCx1REFBSzs7QUFFa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDZTtBQUNoQjtBQUNHO0FBQ2Y7QUFDUDtBQUN5QjtBQUN0QjtBQUNtQjtBQUNaO0FBQ1U7QUFDQTtBQUNsQjs7QUFFckI7QUFDQSwwQkFBMEIsbURBQWE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0RBQWE7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQUs7O0FBRTZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZISDtBQUNPO0FBQ0g7QUFDUztBQUNsQjs7QUFFMUI7QUFDQSwyQkFBMkIsZ0RBQU07QUFDakM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQUs7O0FBRThCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Qm1CO0FBQ2hCO0FBQ21CO0FBQ2hCO0FBQ2Y7QUFDUDtBQUN5QjtBQUNIO0FBQ1o7QUFDVTtBQUNBO0FBQ2xCOztBQUVyQjtBQUNBLDBCQUEwQixtREFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sRUFBRSwwREFBYSxRQUFRO0FBQzdCLHNDQUFzQztBQUN0QyxrQkFBa0IsdURBQVU7QUFDNUIsdUlBQXVJOztBQUV2STtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdURBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBO0FBQ0E7QUFDQSxrSUFBa0k7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsK0JBQStCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBSzs7QUFFNkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZmxhdHBpY2tyL2Rpc3QvZXNtL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9mbGF0cGlja3IvZGlzdC9lc20vbDEwbi9kZWZhdWx0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9mbGF0cGlja3IvZGlzdC9lc20vdHlwZXMvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZmxhdHBpY2tyL2Rpc3QvZXNtL3V0aWxzL2RhdGVzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9mbGF0cGlja3IvZGlzdC9lc20vdXRpbHMvZG9tLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9mbGF0cGlja3IvZGlzdC9lc20vdXRpbHMvZm9ybWF0dGluZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZmxhdHBpY2tyL2Rpc3QvZXNtL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9mbGF0cGlja3IvZGlzdC9lc20vdXRpbHMvcG9seWZpbGxzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vY29udHJvbHMvaHRtbC1jb250ZW50ZWRpdGFibGUtbWFzay1lbGVtZW50LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vY29udHJvbHMvaHRtbC1pbnB1dC1tYXNrLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9jb250cm9scy9odG1sLW1hc2stZWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2NvbnRyb2xzL2lucHV0LWhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9jb250cm9scy9pbnB1dC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2NvbnRyb2xzL21hc2stZWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2NvcmUvYWN0aW9uLWRldGFpbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2NvcmUvaG9sZGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vY29yZS91dGlscy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL2Jhc2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvZGF0ZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9keW5hbWljLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL2VudW0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9udW1iZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvcGF0dGVybi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9wYXR0ZXJuL2NodW5rLXRhaWwtZGV0YWlscy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9wYXR0ZXJuL2N1cnNvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9wYXR0ZXJuL2ZpeGVkLWRlZmluaXRpb24uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvcGF0dGVybi9pbnB1dC1kZWZpbml0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL3BpcGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvcmVnZXhwLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL3JlcGVhdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcbiAgICByZXR1cm4gcjtcbn07XG5pbXBvcnQgeyBkZWZhdWx0cyBhcyBkZWZhdWx0T3B0aW9ucywgSE9PS1MsIH0gZnJvbSBcIi4vdHlwZXMvb3B0aW9uc1wiO1xuaW1wb3J0IEVuZ2xpc2ggZnJvbSBcIi4vbDEwbi9kZWZhdWx0XCI7XG5pbXBvcnQgeyBhcnJheWlmeSwgZGVib3VuY2UsIGludCwgcGFkIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCB7IGNsZWFyTm9kZSwgY3JlYXRlRWxlbWVudCwgY3JlYXRlTnVtYmVySW5wdXQsIGZpbmRQYXJlbnQsIHRvZ2dsZUNsYXNzLCBnZXRFdmVudFRhcmdldCwgfSBmcm9tIFwiLi91dGlscy9kb21cIjtcbmltcG9ydCB7IGNvbXBhcmVEYXRlcywgY3JlYXRlRGF0ZVBhcnNlciwgY3JlYXRlRGF0ZUZvcm1hdHRlciwgZHVyYXRpb24sIGlzQmV0d2VlbiwgZ2V0RGVmYXVsdEhvdXJzLCBjYWxjdWxhdGVTZWNvbmRzU2luY2VNaWRuaWdodCwgcGFyc2VTZWNvbmRzLCB9IGZyb20gXCIuL3V0aWxzL2RhdGVzXCI7XG5pbXBvcnQgeyB0b2tlblJlZ2V4LCBtb250aFRvU3RyIH0gZnJvbSBcIi4vdXRpbHMvZm9ybWF0dGluZ1wiO1xuaW1wb3J0IFwiLi91dGlscy9wb2x5ZmlsbHNcIjtcbnZhciBERUJPVU5DRURfQ0hBTkdFX01TID0gMzAwO1xuZnVuY3Rpb24gRmxhdHBpY2tySW5zdGFuY2UoZWxlbWVudCwgaW5zdGFuY2VDb25maWcpIHtcbiAgICB2YXIgc2VsZiA9IHtcbiAgICAgICAgY29uZmlnOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMpLCBmbGF0cGlja3IuZGVmYXVsdENvbmZpZyksXG4gICAgICAgIGwxMG46IEVuZ2xpc2gsXG4gICAgfTtcbiAgICBzZWxmLnBhcnNlRGF0ZSA9IGNyZWF0ZURhdGVQYXJzZXIoeyBjb25maWc6IHNlbGYuY29uZmlnLCBsMTBuOiBzZWxmLmwxMG4gfSk7XG4gICAgc2VsZi5faGFuZGxlcnMgPSBbXTtcbiAgICBzZWxmLnBsdWdpbkVsZW1lbnRzID0gW107XG4gICAgc2VsZi5sb2FkZWRQbHVnaW5zID0gW107XG4gICAgc2VsZi5fYmluZCA9IGJpbmQ7XG4gICAgc2VsZi5fc2V0SG91cnNGcm9tRGF0ZSA9IHNldEhvdXJzRnJvbURhdGU7XG4gICAgc2VsZi5fcG9zaXRpb25DYWxlbmRhciA9IHBvc2l0aW9uQ2FsZW5kYXI7XG4gICAgc2VsZi5jaGFuZ2VNb250aCA9IGNoYW5nZU1vbnRoO1xuICAgIHNlbGYuY2hhbmdlWWVhciA9IGNoYW5nZVllYXI7XG4gICAgc2VsZi5jbGVhciA9IGNsZWFyO1xuICAgIHNlbGYuY2xvc2UgPSBjbG9zZTtcbiAgICBzZWxmLm9uTW91c2VPdmVyID0gb25Nb3VzZU92ZXI7XG4gICAgc2VsZi5fY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG4gICAgc2VsZi5jcmVhdGVEYXkgPSBjcmVhdGVEYXk7XG4gICAgc2VsZi5kZXN0cm95ID0gZGVzdHJveTtcbiAgICBzZWxmLmlzRW5hYmxlZCA9IGlzRW5hYmxlZDtcbiAgICBzZWxmLmp1bXBUb0RhdGUgPSBqdW1wVG9EYXRlO1xuICAgIHNlbGYudXBkYXRlVmFsdWUgPSB1cGRhdGVWYWx1ZTtcbiAgICBzZWxmLm9wZW4gPSBvcGVuO1xuICAgIHNlbGYucmVkcmF3ID0gcmVkcmF3O1xuICAgIHNlbGYuc2V0ID0gc2V0O1xuICAgIHNlbGYuc2V0RGF0ZSA9IHNldERhdGU7XG4gICAgc2VsZi50b2dnbGUgPSB0b2dnbGU7XG4gICAgZnVuY3Rpb24gc2V0dXBIZWxwZXJGdW5jdGlvbnMoKSB7XG4gICAgICAgIHNlbGYudXRpbHMgPSB7XG4gICAgICAgICAgICBnZXREYXlzSW5Nb250aDogZnVuY3Rpb24gKG1vbnRoLCB5cikge1xuICAgICAgICAgICAgICAgIGlmIChtb250aCA9PT0gdm9pZCAwKSB7IG1vbnRoID0gc2VsZi5jdXJyZW50TW9udGg7IH1cbiAgICAgICAgICAgICAgICBpZiAoeXIgPT09IHZvaWQgMCkgeyB5ciA9IHNlbGYuY3VycmVudFllYXI7IH1cbiAgICAgICAgICAgICAgICBpZiAobW9udGggPT09IDEgJiYgKCh5ciAlIDQgPT09IDAgJiYgeXIgJSAxMDAgIT09IDApIHx8IHlyICUgNDAwID09PSAwKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDI5O1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmwxMG4uZGF5c0luTW9udGhbbW9udGhdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgc2VsZi5lbGVtZW50ID0gc2VsZi5pbnB1dCA9IGVsZW1lbnQ7XG4gICAgICAgIHNlbGYuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHBhcnNlQ29uZmlnKCk7XG4gICAgICAgIHNldHVwTG9jYWxlKCk7XG4gICAgICAgIHNldHVwSW5wdXRzKCk7XG4gICAgICAgIHNldHVwRGF0ZXMoKTtcbiAgICAgICAgc2V0dXBIZWxwZXJGdW5jdGlvbnMoKTtcbiAgICAgICAgaWYgKCFzZWxmLmlzTW9iaWxlKVxuICAgICAgICAgICAgYnVpbGQoKTtcbiAgICAgICAgYmluZEV2ZW50cygpO1xuICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCB8fCBzZWxmLmNvbmZpZy5ub0NhbGVuZGFyKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgICAgIHNldEhvdXJzRnJvbURhdGUoc2VsZi5jb25maWcubm9DYWxlbmRhciA/IHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZVZhbHVlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRDYWxlbmRhcldpZHRoKCk7XG4gICAgICAgIHZhciBpc1NhZmFyaSA9IC9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIGlmICghc2VsZi5pc01vYmlsZSAmJiBpc1NhZmFyaSkge1xuICAgICAgICAgICAgcG9zaXRpb25DYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgICAgIHRyaWdnZXJFdmVudChcIm9uUmVhZHlcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldENsb3Nlc3RBY3RpdmVFbGVtZW50KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoKChfYSA9IHNlbGYuY2FsZW5kYXJDb250YWluZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRSb290Tm9kZSgpKVxuICAgICAgICAgICAgLmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJpbmRUb0luc3RhbmNlKGZuKSB7XG4gICAgICAgIHJldHVybiBmbi5iaW5kKHNlbGYpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRDYWxlbmRhcldpZHRoKCkge1xuICAgICAgICB2YXIgY29uZmlnID0gc2VsZi5jb25maWc7XG4gICAgICAgIGlmIChjb25maWcud2Vla051bWJlcnMgPT09IGZhbHNlICYmIGNvbmZpZy5zaG93TW9udGhzID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnLm5vQ2FsZW5kYXIgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNhbGVuZGFyQ29udGFpbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXlzQ29udGFpbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRheXNXaWR0aCA9IChzZWxmLmRheXMub2Zmc2V0V2lkdGggKyAxKSAqIGNvbmZpZy5zaG93TW9udGhzO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRheXNDb250YWluZXIuc3R5bGUud2lkdGggPSBkYXlzV2lkdGggKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUud2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5c1dpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc2VsZi53ZWVrV3JhcHBlciAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gc2VsZi53ZWVrV3JhcHBlci5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInB4XCI7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ2aXNpYmlsaXR5XCIpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lKGUpIHtcbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0RGF0ZSA9IHNlbGYuY29uZmlnLm1pbkRhdGUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAgIGNvbXBhcmVEYXRlcyhuZXcgRGF0ZSgpLCBzZWxmLmNvbmZpZy5taW5EYXRlKSA+PSAwXG4gICAgICAgICAgICAgICAgPyBuZXcgRGF0ZSgpXG4gICAgICAgICAgICAgICAgOiBuZXcgRGF0ZShzZWxmLmNvbmZpZy5taW5EYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMgPSBnZXREZWZhdWx0SG91cnMoc2VsZi5jb25maWcpO1xuICAgICAgICAgICAgZGVmYXVsdERhdGUuc2V0SG91cnMoZGVmYXVsdHMuaG91cnMsIGRlZmF1bHRzLm1pbnV0ZXMsIGRlZmF1bHRzLnNlY29uZHMsIGRlZmF1bHREYXRlLmdldE1pbGxpc2Vjb25kcygpKTtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcyA9IFtkZWZhdWx0RGF0ZV07XG4gICAgICAgICAgICBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiA9IGRlZmF1bHREYXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlICE9PSB1bmRlZmluZWQgJiYgZS50eXBlICE9PSBcImJsdXJcIikge1xuICAgICAgICAgICAgdGltZVdyYXBwZXIoZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZWYWx1ZSA9IHNlbGYuX2lucHV0LnZhbHVlO1xuICAgICAgICBzZXRIb3Vyc0Zyb21JbnB1dHMoKTtcbiAgICAgICAgdXBkYXRlVmFsdWUoKTtcbiAgICAgICAgaWYgKHNlbGYuX2lucHV0LnZhbHVlICE9PSBwcmV2VmFsdWUpIHtcbiAgICAgICAgICAgIHNlbGYuX2RlYm91bmNlZENoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFtcG0ybWlsaXRhcnkoaG91ciwgYW1QTSkge1xuICAgICAgICByZXR1cm4gKGhvdXIgJSAxMikgKyAxMiAqIGludChhbVBNID09PSBzZWxmLmwxMG4uYW1QTVsxXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1pbGl0YXJ5MmFtcG0oaG91cikge1xuICAgICAgICBzd2l0Y2ggKGhvdXIgJSAyNCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gMTI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBob3VyICUgMTI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0SG91cnNGcm9tSW5wdXRzKCkge1xuICAgICAgICBpZiAoc2VsZi5ob3VyRWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8IHNlbGYubWludXRlRWxlbWVudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgaG91cnMgPSAocGFyc2VJbnQoc2VsZi5ob3VyRWxlbWVudC52YWx1ZS5zbGljZSgtMiksIDEwKSB8fCAwKSAlIDI0LCBtaW51dGVzID0gKHBhcnNlSW50KHNlbGYubWludXRlRWxlbWVudC52YWx1ZSwgMTApIHx8IDApICUgNjAsIHNlY29uZHMgPSBzZWxmLnNlY29uZEVsZW1lbnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyAocGFyc2VJbnQoc2VsZi5zZWNvbmRFbGVtZW50LnZhbHVlLCAxMCkgfHwgMCkgJSA2MFxuICAgICAgICAgICAgOiAwO1xuICAgICAgICBpZiAoc2VsZi5hbVBNICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGhvdXJzID0gYW1wbTJtaWxpdGFyeShob3Vycywgc2VsZi5hbVBNLnRleHRDb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGltaXRNaW5Ib3VycyA9IHNlbGYuY29uZmlnLm1pblRpbWUgIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1pbkRhdGUgJiZcbiAgICAgICAgICAgICAgICBzZWxmLm1pbkRhdGVIYXNUaW1lICYmXG4gICAgICAgICAgICAgICAgc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogJiZcbiAgICAgICAgICAgICAgICBjb21wYXJlRGF0ZXMoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmosIHNlbGYuY29uZmlnLm1pbkRhdGUsIHRydWUpID09PVxuICAgICAgICAgICAgICAgICAgICAwKTtcbiAgICAgICAgdmFyIGxpbWl0TWF4SG91cnMgPSBzZWxmLmNvbmZpZy5tYXhUaW1lICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIChzZWxmLmNvbmZpZy5tYXhEYXRlICYmXG4gICAgICAgICAgICAgICAgc2VsZi5tYXhEYXRlSGFzVGltZSAmJlxuICAgICAgICAgICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqICYmXG4gICAgICAgICAgICAgICAgY29tcGFyZURhdGVzKHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqLCBzZWxmLmNvbmZpZy5tYXhEYXRlLCB0cnVlKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgMCk7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tYXhUaW1lICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1pblRpbWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgc2VsZi5jb25maWcubWluVGltZSA+IHNlbGYuY29uZmlnLm1heFRpbWUpIHtcbiAgICAgICAgICAgIHZhciBtaW5Cb3VuZCA9IGNhbGN1bGF0ZVNlY29uZHNTaW5jZU1pZG5pZ2h0KHNlbGYuY29uZmlnLm1pblRpbWUuZ2V0SG91cnMoKSwgc2VsZi5jb25maWcubWluVGltZS5nZXRNaW51dGVzKCksIHNlbGYuY29uZmlnLm1pblRpbWUuZ2V0U2Vjb25kcygpKTtcbiAgICAgICAgICAgIHZhciBtYXhCb3VuZCA9IGNhbGN1bGF0ZVNlY29uZHNTaW5jZU1pZG5pZ2h0KHNlbGYuY29uZmlnLm1heFRpbWUuZ2V0SG91cnMoKSwgc2VsZi5jb25maWcubWF4VGltZS5nZXRNaW51dGVzKCksIHNlbGYuY29uZmlnLm1heFRpbWUuZ2V0U2Vjb25kcygpKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9IGNhbGN1bGF0ZVNlY29uZHNTaW5jZU1pZG5pZ2h0KGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGltZSA+IG1heEJvdW5kICYmIGN1cnJlbnRUaW1lIDwgbWluQm91bmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcGFyc2VTZWNvbmRzKG1pbkJvdW5kKTtcbiAgICAgICAgICAgICAgICBob3VycyA9IHJlc3VsdFswXTtcbiAgICAgICAgICAgICAgICBtaW51dGVzID0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgICAgIHNlY29uZHMgPSByZXN1bHRbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAobGltaXRNYXhIb3Vycykge1xuICAgICAgICAgICAgICAgIHZhciBtYXhUaW1lID0gc2VsZi5jb25maWcubWF4VGltZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcubWF4VGltZVxuICAgICAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLm1heERhdGU7XG4gICAgICAgICAgICAgICAgaG91cnMgPSBNYXRoLm1pbihob3VycywgbWF4VGltZS5nZXRIb3VycygpKTtcbiAgICAgICAgICAgICAgICBpZiAoaG91cnMgPT09IG1heFRpbWUuZ2V0SG91cnMoKSlcbiAgICAgICAgICAgICAgICAgICAgbWludXRlcyA9IE1hdGgubWluKG1pbnV0ZXMsIG1heFRpbWUuZ2V0TWludXRlcygpKTtcbiAgICAgICAgICAgICAgICBpZiAobWludXRlcyA9PT0gbWF4VGltZS5nZXRNaW51dGVzKCkpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBNYXRoLm1pbihzZWNvbmRzLCBtYXhUaW1lLmdldFNlY29uZHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGltaXRNaW5Ib3Vycykge1xuICAgICAgICAgICAgICAgIHZhciBtaW5UaW1lID0gc2VsZi5jb25maWcubWluVGltZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcubWluVGltZVxuICAgICAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLm1pbkRhdGU7XG4gICAgICAgICAgICAgICAgaG91cnMgPSBNYXRoLm1heChob3VycywgbWluVGltZS5nZXRIb3VycygpKTtcbiAgICAgICAgICAgICAgICBpZiAoaG91cnMgPT09IG1pblRpbWUuZ2V0SG91cnMoKSAmJiBtaW51dGVzIDwgbWluVGltZS5nZXRNaW51dGVzKCkpXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBtaW5UaW1lLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAobWludXRlcyA9PT0gbWluVGltZS5nZXRNaW51dGVzKCkpXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBNYXRoLm1heChzZWNvbmRzLCBtaW5UaW1lLmdldFNlY29uZHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2V0SG91cnMoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRIb3Vyc0Zyb21EYXRlKGRhdGVPYmopIHtcbiAgICAgICAgdmFyIGRhdGUgPSBkYXRlT2JqIHx8IHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqO1xuICAgICAgICBpZiAoZGF0ZSAmJiBkYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSwgZGF0ZS5nZXRTZWNvbmRzKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSB7XG4gICAgICAgIGlmIChzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iai5zZXRIb3Vycyhob3VycyAlIDI0LCBtaW51dGVzLCBzZWNvbmRzIHx8IDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2VsZi5ob3VyRWxlbWVudCB8fCAhc2VsZi5taW51dGVFbGVtZW50IHx8IHNlbGYuaXNNb2JpbGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHNlbGYuaG91ckVsZW1lbnQudmFsdWUgPSBwYWQoIXNlbGYuY29uZmlnLnRpbWVfMjRoclxuICAgICAgICAgICAgPyAoKDEyICsgaG91cnMpICUgMTIpICsgMTIgKiBpbnQoaG91cnMgJSAxMiA9PT0gMClcbiAgICAgICAgICAgIDogaG91cnMpO1xuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQudmFsdWUgPSBwYWQobWludXRlcyk7XG4gICAgICAgIGlmIChzZWxmLmFtUE0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNlbGYuYW1QTS50ZXh0Q29udGVudCA9IHNlbGYubDEwbi5hbVBNW2ludChob3VycyA+PSAxMildO1xuICAgICAgICBpZiAoc2VsZi5zZWNvbmRFbGVtZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZWxmLnNlY29uZEVsZW1lbnQudmFsdWUgPSBwYWQoc2Vjb25kcyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uWWVhcklucHV0KGV2ZW50KSB7XG4gICAgICAgIHZhciBldmVudFRhcmdldCA9IGdldEV2ZW50VGFyZ2V0KGV2ZW50KTtcbiAgICAgICAgdmFyIHllYXIgPSBwYXJzZUludChldmVudFRhcmdldC52YWx1ZSkgKyAoZXZlbnQuZGVsdGEgfHwgMCk7XG4gICAgICAgIGlmICh5ZWFyIC8gMTAwMCA+IDEgfHxcbiAgICAgICAgICAgIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiAmJiAhL1teXFxkXS8udGVzdCh5ZWFyLnRvU3RyaW5nKCkpKSkge1xuICAgICAgICAgICAgY2hhbmdlWWVhcih5ZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBiaW5kKGVsZW1lbnQsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmZvckVhY2goZnVuY3Rpb24gKGV2KSB7IHJldHVybiBiaW5kKGVsZW1lbnQsIGV2LCBoYW5kbGVyLCBvcHRpb25zKTsgfSk7XG4gICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gYmluZChlbCwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpOyB9KTtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgc2VsZi5faGFuZGxlcnMucHVzaCh7XG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7IH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmlnZ2VyQ2hhbmdlKCkge1xuICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkNoYW5nZVwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cygpIHtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLndyYXApIHtcbiAgICAgICAgICAgIFtcIm9wZW5cIiwgXCJjbG9zZVwiLCBcInRvZ2dsZVwiLCBcImNsZWFyXCJdLmZvckVhY2goZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoc2VsZi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1cIiArIGV2dCArIFwiXVwiKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5kKGVsLCBcImNsaWNrXCIsIHNlbGZbZXZ0XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5pc01vYmlsZSkge1xuICAgICAgICAgICAgc2V0dXBNb2JpbGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVib3VuY2VkUmVzaXplID0gZGVib3VuY2Uob25SZXNpemUsIDUwKTtcbiAgICAgICAgc2VsZi5fZGVib3VuY2VkQ2hhbmdlID0gZGVib3VuY2UodHJpZ2dlckNoYW5nZSwgREVCT1VOQ0VEX0NIQU5HRV9NUyk7XG4gICAgICAgIGlmIChzZWxmLmRheXNDb250YWluZXIgJiYgIS9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSlcbiAgICAgICAgICAgIGJpbmQoc2VsZi5kYXlzQ29udGFpbmVyLCBcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIpXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyKGdldEV2ZW50VGFyZ2V0KGUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBiaW5kKHNlbGYuX2lucHV0LCBcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICAgICAgaWYgKHNlbGYuY2FsZW5kYXJDb250YWluZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYmluZChzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlbGYuY29uZmlnLmlubGluZSAmJiAhc2VsZi5jb25maWcuc3RhdGljKVxuICAgICAgICAgICAgYmluZCh3aW5kb3csIFwicmVzaXplXCIsIGRlYm91bmNlZFJlc2l6ZSk7XG4gICAgICAgIGlmICh3aW5kb3cub250b3VjaHN0YXJ0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBiaW5kKHdpbmRvdy5kb2N1bWVudCwgXCJ0b3VjaHN0YXJ0XCIsIGRvY3VtZW50Q2xpY2spO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBiaW5kKHdpbmRvdy5kb2N1bWVudCwgXCJtb3VzZWRvd25cIiwgZG9jdW1lbnRDbGljayk7XG4gICAgICAgIGJpbmQod2luZG93LmRvY3VtZW50LCBcImZvY3VzXCIsIGRvY3VtZW50Q2xpY2ssIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmNsaWNrT3BlbnMgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGJpbmQoc2VsZi5faW5wdXQsIFwiZm9jdXNcIiwgc2VsZi5vcGVuKTtcbiAgICAgICAgICAgIGJpbmQoc2VsZi5faW5wdXQsIFwiY2xpY2tcIiwgc2VsZi5vcGVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5kYXlzQ29udGFpbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJpbmQoc2VsZi5tb250aE5hdiwgXCJjbGlja1wiLCBvbk1vbnRoTmF2Q2xpY2spO1xuICAgICAgICAgICAgYmluZChzZWxmLm1vbnRoTmF2LCBbXCJrZXl1cFwiLCBcImluY3JlbWVudFwiXSwgb25ZZWFySW5wdXQpO1xuICAgICAgICAgICAgYmluZChzZWxmLmRheXNDb250YWluZXIsIFwiY2xpY2tcIiwgc2VsZWN0RGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYudGltZUNvbnRhaW5lciAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgc2VsZi5ob3VyRWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgc2VsVGV4dCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEV2ZW50VGFyZ2V0KGUpLnNlbGVjdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGJpbmQoc2VsZi50aW1lQ29udGFpbmVyLCBbXCJpbmNyZW1lbnRcIl0sIHVwZGF0ZVRpbWUpO1xuICAgICAgICAgICAgYmluZChzZWxmLnRpbWVDb250YWluZXIsIFwiYmx1clwiLCB1cGRhdGVUaW1lLCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gICAgICAgICAgICBiaW5kKHNlbGYudGltZUNvbnRhaW5lciwgXCJjbGlja1wiLCB0aW1lSW5jcmVtZW50KTtcbiAgICAgICAgICAgIGJpbmQoW3NlbGYuaG91ckVsZW1lbnQsIHNlbGYubWludXRlRWxlbWVudF0sIFtcImZvY3VzXCIsIFwiY2xpY2tcIl0sIHNlbFRleHQpO1xuICAgICAgICAgICAgaWYgKHNlbGYuc2Vjb25kRWxlbWVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGJpbmQoc2VsZi5zZWNvbmRFbGVtZW50LCBcImZvY3VzXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuc2Vjb25kRWxlbWVudCAmJiBzZWxmLnNlY29uZEVsZW1lbnQuc2VsZWN0KCk7IH0pO1xuICAgICAgICAgICAgaWYgKHNlbGYuYW1QTSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYmluZChzZWxmLmFtUE0sIFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGltZShlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5jb25maWcuYWxsb3dJbnB1dCkge1xuICAgICAgICAgICAgYmluZChzZWxmLl9pbnB1dCwgXCJibHVyXCIsIG9uQmx1cik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24ganVtcFRvRGF0ZShqdW1wRGF0ZSwgdHJpZ2dlckNoYW5nZSkge1xuICAgICAgICB2YXIganVtcFRvID0ganVtcERhdGUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBzZWxmLnBhcnNlRGF0ZShqdW1wRGF0ZSlcbiAgICAgICAgICAgIDogc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogfHxcbiAgICAgICAgICAgICAgICAoc2VsZi5jb25maWcubWluRGF0ZSAmJiBzZWxmLmNvbmZpZy5taW5EYXRlID4gc2VsZi5ub3dcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5taW5EYXRlXG4gICAgICAgICAgICAgICAgICAgIDogc2VsZi5jb25maWcubWF4RGF0ZSAmJiBzZWxmLmNvbmZpZy5tYXhEYXRlIDwgc2VsZi5ub3dcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcubWF4RGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzZWxmLm5vdyk7XG4gICAgICAgIHZhciBvbGRZZWFyID0gc2VsZi5jdXJyZW50WWVhcjtcbiAgICAgICAgdmFyIG9sZE1vbnRoID0gc2VsZi5jdXJyZW50TW9udGg7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoanVtcFRvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID0ganVtcFRvLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50TW9udGggPSBqdW1wVG8uZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZS5tZXNzYWdlID0gXCJJbnZhbGlkIGRhdGUgc3VwcGxpZWQ6IFwiICsganVtcFRvO1xuICAgICAgICAgICAgc2VsZi5jb25maWcuZXJyb3JIYW5kbGVyKGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlICYmIHNlbGYuY3VycmVudFllYXIgIT09IG9sZFllYXIpIHtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uWWVhckNoYW5nZVwiKTtcbiAgICAgICAgICAgIGJ1aWxkTW9udGhTd2l0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSAmJlxuICAgICAgICAgICAgKHNlbGYuY3VycmVudFllYXIgIT09IG9sZFllYXIgfHwgc2VsZi5jdXJyZW50TW9udGggIT09IG9sZE1vbnRoKSkge1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25Nb250aENoYW5nZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0aW1lSW5jcmVtZW50KGUpIHtcbiAgICAgICAgdmFyIGV2ZW50VGFyZ2V0ID0gZ2V0RXZlbnRUYXJnZXQoZSk7XG4gICAgICAgIGlmICh+ZXZlbnRUYXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoXCJhcnJvd1wiKSlcbiAgICAgICAgICAgIGluY3JlbWVudE51bUlucHV0KGUsIGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFycm93VXBcIikgPyAxIDogLTEpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbmNyZW1lbnROdW1JbnB1dChlLCBkZWx0YSwgaW5wdXRFbGVtKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSBlICYmIGdldEV2ZW50VGFyZ2V0KGUpO1xuICAgICAgICB2YXIgaW5wdXQgPSBpbnB1dEVsZW0gfHxcbiAgICAgICAgICAgICh0YXJnZXQgJiYgdGFyZ2V0LnBhcmVudE5vZGUgJiYgdGFyZ2V0LnBhcmVudE5vZGUuZmlyc3RDaGlsZCk7XG4gICAgICAgIHZhciBldmVudCA9IGNyZWF0ZUV2ZW50KFwiaW5jcmVtZW50XCIpO1xuICAgICAgICBldmVudC5kZWx0YSA9IGRlbHRhO1xuICAgICAgICBpbnB1dCAmJiBpbnB1dC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGQoKSB7XG4gICAgICAgIHZhciBmcmFnbWVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLWNhbGVuZGFyXCIpO1xuICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnRhYkluZGV4ID0gLTE7XG4gICAgICAgIGlmICghc2VsZi5jb25maWcubm9DYWxlbmRhcikge1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYnVpbGRNb250aE5hdigpKTtcbiAgICAgICAgICAgIHNlbGYuaW5uZXJDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLWlubmVyQ29udGFpbmVyXCIpO1xuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLndlZWtOdW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0gYnVpbGRXZWVrcygpLCB3ZWVrV3JhcHBlciA9IF9hLndlZWtXcmFwcGVyLCB3ZWVrTnVtYmVycyA9IF9hLndlZWtOdW1iZXJzO1xuICAgICAgICAgICAgICAgIHNlbGYuaW5uZXJDb250YWluZXIuYXBwZW5kQ2hpbGQod2Vla1dyYXBwZXIpO1xuICAgICAgICAgICAgICAgIHNlbGYud2Vla051bWJlcnMgPSB3ZWVrTnVtYmVycztcbiAgICAgICAgICAgICAgICBzZWxmLndlZWtXcmFwcGVyID0gd2Vla1dyYXBwZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnJDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXJDb250YWluZXJcIik7XG4gICAgICAgICAgICBzZWxmLnJDb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRXZWVrZGF5cygpKTtcbiAgICAgICAgICAgIGlmICghc2VsZi5kYXlzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kYXlzQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1kYXlzXCIpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGF5c0NvbnRhaW5lci50YWJJbmRleCA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVpbGREYXlzKCk7XG4gICAgICAgICAgICBzZWxmLnJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5kYXlzQ29udGFpbmVyKTtcbiAgICAgICAgICAgIHNlbGYuaW5uZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5yQ29udGFpbmVyKTtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHNlbGYuaW5uZXJDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5lbmFibGVUaW1lKSB7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChidWlsZFRpbWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJyYW5nZU1vZGVcIiwgc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKTtcbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJhbmltYXRlXCIsIHNlbGYuY29uZmlnLmFuaW1hdGUgPT09IHRydWUpO1xuICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcIm11bHRpTW9udGhcIiwgc2VsZi5jb25maWcuc2hvd01vbnRocyA+IDEpO1xuICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICAgICAgdmFyIGN1c3RvbUFwcGVuZCA9IHNlbGYuY29uZmlnLmFwcGVuZFRvICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLmFwcGVuZFRvLm5vZGVUeXBlICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5pbmxpbmUgfHwgc2VsZi5jb25maWcuc3RhdGljKSB7XG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoc2VsZi5jb25maWcuaW5saW5lID8gXCJpbmxpbmVcIiA6IFwic3RhdGljXCIpO1xuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmlubGluZSkge1xuICAgICAgICAgICAgICAgIGlmICghY3VzdG9tQXBwZW5kICYmIHNlbGYuZWxlbWVudC5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgc2VsZi5faW5wdXQubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGYuY29uZmlnLmFwcGVuZFRvICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLmFwcGVuZFRvLmFwcGVuZENoaWxkKHNlbGYuY2FsZW5kYXJDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLnN0YXRpYykge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci13cmFwcGVyXCIpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmVsZW1lbnQucGFyZW50Tm9kZSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIHNlbGYuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmFsdElucHV0KVxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGYuYWx0SW5wdXQpO1xuICAgICAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2VsZi5jYWxlbmRhckNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5zdGF0aWMgJiYgIXNlbGYuY29uZmlnLmlubGluZSlcbiAgICAgICAgICAgIChzZWxmLmNvbmZpZy5hcHBlbmRUbyAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5hcHBlbmRUb1xuICAgICAgICAgICAgICAgIDogd2luZG93LmRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHNlbGYuY2FsZW5kYXJDb250YWluZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVEYXkoY2xhc3NOYW1lLCBkYXRlLCBfZGF5TnVtYmVyLCBpKSB7XG4gICAgICAgIHZhciBkYXRlSXNFbmFibGVkID0gaXNFbmFibGVkKGRhdGUsIHRydWUpLCBkYXlFbGVtZW50ID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgY2xhc3NOYW1lLCBkYXRlLmdldERhdGUoKS50b1N0cmluZygpKTtcbiAgICAgICAgZGF5RWxlbWVudC5kYXRlT2JqID0gZGF0ZTtcbiAgICAgICAgZGF5RWxlbWVudC4kaSA9IGk7XG4gICAgICAgIGRheUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBzZWxmLmZvcm1hdERhdGUoZGF0ZSwgc2VsZi5jb25maWcuYXJpYURhdGVGb3JtYXQpKTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZS5pbmRleE9mKFwiaGlkZGVuXCIpID09PSAtMSAmJlxuICAgICAgICAgICAgY29tcGFyZURhdGVzKGRhdGUsIHNlbGYubm93KSA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi50b2RheURhdGVFbGVtID0gZGF5RWxlbWVudDtcbiAgICAgICAgICAgIGRheUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZGF5XCIpO1xuICAgICAgICAgICAgZGF5RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWN1cnJlbnRcIiwgXCJkYXRlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRlSXNFbmFibGVkKSB7XG4gICAgICAgICAgICBkYXlFbGVtZW50LnRhYkluZGV4ID0gLTE7XG4gICAgICAgICAgICBpZiAoaXNEYXRlU2VsZWN0ZWQoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBkYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZUVsZW0gPSBkYXlFbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZGF5RWxlbWVudCwgXCJzdGFydFJhbmdlXCIsIHNlbGYuc2VsZWN0ZWREYXRlc1swXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyZURhdGVzKGRhdGUsIHNlbGYuc2VsZWN0ZWREYXRlc1swXSwgdHJ1ZSkgPT09IDApO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhkYXlFbGVtZW50LCBcImVuZFJhbmdlXCIsIHNlbGYuc2VsZWN0ZWREYXRlc1sxXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyZURhdGVzKGRhdGUsIHNlbGYuc2VsZWN0ZWREYXRlc1sxXSwgdHJ1ZSkgPT09IDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09PSBcIm5leHRNb250aERheVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW5SYW5nZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmbGF0cGlja3ItZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1vZGUgPT09IFwicmFuZ2VcIikge1xuICAgICAgICAgICAgaWYgKGlzRGF0ZUluUmFuZ2UoZGF0ZSkgJiYgIWlzRGF0ZVNlbGVjdGVkKGRhdGUpKVxuICAgICAgICAgICAgICAgIGRheUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImluUmFuZ2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYud2Vla051bWJlcnMgJiZcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLnNob3dNb250aHMgPT09IDEgJiZcbiAgICAgICAgICAgIGNsYXNzTmFtZSAhPT0gXCJwcmV2TW9udGhEYXlcIiAmJlxuICAgICAgICAgICAgaSAlIDcgPT09IDYpIHtcbiAgICAgICAgICAgIHNlbGYud2Vla051bWJlcnMuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIFwiPHNwYW4gY2xhc3M9J2ZsYXRwaWNrci1kYXknPlwiICsgc2VsZi5jb25maWcuZ2V0V2VlayhkYXRlKSArIFwiPC9zcGFuPlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkRheUNyZWF0ZVwiLCBkYXlFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGRheUVsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZvY3VzT25EYXlFbGVtKHRhcmdldE5vZGUpIHtcbiAgICAgICAgdGFyZ2V0Tm9kZS5mb2N1cygpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKVxuICAgICAgICAgICAgb25Nb3VzZU92ZXIodGFyZ2V0Tm9kZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEZpcnN0QXZhaWxhYmxlRGF5KGRlbHRhKSB7XG4gICAgICAgIHZhciBzdGFydE1vbnRoID0gZGVsdGEgPiAwID8gMCA6IHNlbGYuY29uZmlnLnNob3dNb250aHMgLSAxO1xuICAgICAgICB2YXIgZW5kTW9udGggPSBkZWx0YSA+IDAgPyBzZWxmLmNvbmZpZy5zaG93TW9udGhzIDogLTE7XG4gICAgICAgIGZvciAodmFyIG0gPSBzdGFydE1vbnRoOyBtICE9IGVuZE1vbnRoOyBtICs9IGRlbHRhKSB7XG4gICAgICAgICAgICB2YXIgbW9udGggPSBzZWxmLmRheXNDb250YWluZXIuY2hpbGRyZW5bbV07XG4gICAgICAgICAgICB2YXIgc3RhcnRJbmRleCA9IGRlbHRhID4gMCA/IDAgOiBtb250aC5jaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICAgICAgdmFyIGVuZEluZGV4ID0gZGVsdGEgPiAwID8gbW9udGguY2hpbGRyZW4ubGVuZ3RoIDogLTE7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSAhPSBlbmRJbmRleDsgaSArPSBkZWx0YSkge1xuICAgICAgICAgICAgICAgIHZhciBjID0gbW9udGguY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgaWYgKGMuY2xhc3NOYW1lLmluZGV4T2YoXCJoaWRkZW5cIikgPT09IC0xICYmIGlzRW5hYmxlZChjLmRhdGVPYmopKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXROZXh0QXZhaWxhYmxlRGF5KGN1cnJlbnQsIGRlbHRhKSB7XG4gICAgICAgIHZhciBnaXZlbk1vbnRoID0gY3VycmVudC5jbGFzc05hbWUuaW5kZXhPZihcIk1vbnRoXCIpID09PSAtMVxuICAgICAgICAgICAgPyBjdXJyZW50LmRhdGVPYmouZ2V0TW9udGgoKVxuICAgICAgICAgICAgOiBzZWxmLmN1cnJlbnRNb250aDtcbiAgICAgICAgdmFyIGVuZE1vbnRoID0gZGVsdGEgPiAwID8gc2VsZi5jb25maWcuc2hvd01vbnRocyA6IC0xO1xuICAgICAgICB2YXIgbG9vcERlbHRhID0gZGVsdGEgPiAwID8gMSA6IC0xO1xuICAgICAgICBmb3IgKHZhciBtID0gZ2l2ZW5Nb250aCAtIHNlbGYuY3VycmVudE1vbnRoOyBtICE9IGVuZE1vbnRoOyBtICs9IGxvb3BEZWx0YSkge1xuICAgICAgICAgICAgdmFyIG1vbnRoID0gc2VsZi5kYXlzQ29udGFpbmVyLmNoaWxkcmVuW21dO1xuICAgICAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBnaXZlbk1vbnRoIC0gc2VsZi5jdXJyZW50TW9udGggPT09IG1cbiAgICAgICAgICAgICAgICA/IGN1cnJlbnQuJGkgKyBkZWx0YVxuICAgICAgICAgICAgICAgIDogZGVsdGEgPCAwXG4gICAgICAgICAgICAgICAgICAgID8gbW9udGguY2hpbGRyZW4ubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICA6IDA7XG4gICAgICAgICAgICB2YXIgbnVtTW9udGhEYXlzID0gbW9udGguY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXg7IGkgPj0gMCAmJiBpIDwgbnVtTW9udGhEYXlzICYmIGkgIT0gKGRlbHRhID4gMCA/IG51bU1vbnRoRGF5cyA6IC0xKTsgaSArPSBsb29wRGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYyA9IG1vbnRoLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGlmIChjLmNsYXNzTmFtZS5pbmRleE9mKFwiaGlkZGVuXCIpID09PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICBpc0VuYWJsZWQoYy5kYXRlT2JqKSAmJlxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhjdXJyZW50LiRpIC0gaSkgPj0gTWF0aC5hYnMoZGVsdGEpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXNPbkRheUVsZW0oYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5jaGFuZ2VNb250aChsb29wRGVsdGEpO1xuICAgICAgICBmb2N1c09uRGF5KGdldEZpcnN0QXZhaWxhYmxlRGF5KGxvb3BEZWx0YSksIDApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmb2N1c09uRGF5KGN1cnJlbnQsIG9mZnNldCkge1xuICAgICAgICB2YXIgYWN0aXZlRWxlbWVudCA9IGdldENsb3Nlc3RBY3RpdmVFbGVtZW50KCk7XG4gICAgICAgIHZhciBkYXlGb2N1c2VkID0gaXNJblZpZXcoYWN0aXZlRWxlbWVudCB8fCBkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgdmFyIHN0YXJ0RWxlbSA9IGN1cnJlbnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBjdXJyZW50XG4gICAgICAgICAgICA6IGRheUZvY3VzZWRcbiAgICAgICAgICAgICAgICA/IGFjdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICA6IHNlbGYuc2VsZWN0ZWREYXRlRWxlbSAhPT0gdW5kZWZpbmVkICYmIGlzSW5WaWV3KHNlbGYuc2VsZWN0ZWREYXRlRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLnNlbGVjdGVkRGF0ZUVsZW1cbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLnRvZGF5RGF0ZUVsZW0gIT09IHVuZGVmaW5lZCAmJiBpc0luVmlldyhzZWxmLnRvZGF5RGF0ZUVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNlbGYudG9kYXlEYXRlRWxlbVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBnZXRGaXJzdEF2YWlsYWJsZURheShvZmZzZXQgPiAwID8gMSA6IC0xKTtcbiAgICAgICAgaWYgKHN0YXJ0RWxlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZWxmLl9pbnB1dC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFkYXlGb2N1c2VkKSB7XG4gICAgICAgICAgICBmb2N1c09uRGF5RWxlbShzdGFydEVsZW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2V0TmV4dEF2YWlsYWJsZURheShzdGFydEVsZW0sIG9mZnNldCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRNb250aERheXMoeWVhciwgbW9udGgpIHtcbiAgICAgICAgdmFyIGZpcnN0T2ZNb250aCA9IChuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMSkuZ2V0RGF5KCkgLSBzZWxmLmwxMG4uZmlyc3REYXlPZldlZWsgKyA3KSAlIDc7XG4gICAgICAgIHZhciBwcmV2TW9udGhEYXlzID0gc2VsZi51dGlscy5nZXREYXlzSW5Nb250aCgobW9udGggLSAxICsgMTIpICUgMTIsIHllYXIpO1xuICAgICAgICB2YXIgZGF5c0luTW9udGggPSBzZWxmLnV0aWxzLmdldERheXNJbk1vbnRoKG1vbnRoLCB5ZWFyKSwgZGF5cyA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksIGlzTXVsdGlNb250aCA9IHNlbGYuY29uZmlnLnNob3dNb250aHMgPiAxLCBwcmV2TW9udGhEYXlDbGFzcyA9IGlzTXVsdGlNb250aCA/IFwicHJldk1vbnRoRGF5IGhpZGRlblwiIDogXCJwcmV2TW9udGhEYXlcIiwgbmV4dE1vbnRoRGF5Q2xhc3MgPSBpc011bHRpTW9udGggPyBcIm5leHRNb250aERheSBoaWRkZW5cIiA6IFwibmV4dE1vbnRoRGF5XCI7XG4gICAgICAgIHZhciBkYXlOdW1iZXIgPSBwcmV2TW9udGhEYXlzICsgMSAtIGZpcnN0T2ZNb250aCwgZGF5SW5kZXggPSAwO1xuICAgICAgICBmb3IgKDsgZGF5TnVtYmVyIDw9IHByZXZNb250aERheXM7IGRheU51bWJlcisrLCBkYXlJbmRleCsrKSB7XG4gICAgICAgICAgICBkYXlzLmFwcGVuZENoaWxkKGNyZWF0ZURheShcImZsYXRwaWNrci1kYXkgXCIgKyBwcmV2TW9udGhEYXlDbGFzcywgbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXlOdW1iZXIpLCBkYXlOdW1iZXIsIGRheUluZGV4KSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChkYXlOdW1iZXIgPSAxOyBkYXlOdW1iZXIgPD0gZGF5c0luTW9udGg7IGRheU51bWJlcisrLCBkYXlJbmRleCsrKSB7XG4gICAgICAgICAgICBkYXlzLmFwcGVuZENoaWxkKGNyZWF0ZURheShcImZsYXRwaWNrci1kYXlcIiwgbmV3IERhdGUoeWVhciwgbW9udGgsIGRheU51bWJlciksIGRheU51bWJlciwgZGF5SW5kZXgpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBkYXlOdW0gPSBkYXlzSW5Nb250aCArIDE7IGRheU51bSA8PSA0MiAtIGZpcnN0T2ZNb250aCAmJlxuICAgICAgICAgICAgKHNlbGYuY29uZmlnLnNob3dNb250aHMgPT09IDEgfHwgZGF5SW5kZXggJSA3ICE9PSAwKTsgZGF5TnVtKyssIGRheUluZGV4KyspIHtcbiAgICAgICAgICAgIGRheXMuYXBwZW5kQ2hpbGQoY3JlYXRlRGF5KFwiZmxhdHBpY2tyLWRheSBcIiArIG5leHRNb250aERheUNsYXNzLCBuZXcgRGF0ZSh5ZWFyLCBtb250aCArIDEsIGRheU51bSAlIGRheXNJbk1vbnRoKSwgZGF5TnVtLCBkYXlJbmRleCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXlDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZGF5Q29udGFpbmVyXCIpO1xuICAgICAgICBkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoZGF5cyk7XG4gICAgICAgIHJldHVybiBkYXlDb250YWluZXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkRGF5cygpIHtcbiAgICAgICAgaWYgKHNlbGYuZGF5c0NvbnRhaW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJOb2RlKHNlbGYuZGF5c0NvbnRhaW5lcik7XG4gICAgICAgIGlmIChzZWxmLndlZWtOdW1iZXJzKVxuICAgICAgICAgICAgY2xlYXJOb2RlKHNlbGYud2Vla051bWJlcnMpO1xuICAgICAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLmNvbmZpZy5zaG93TW9udGhzOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2VsZi5jdXJyZW50WWVhciwgc2VsZi5jdXJyZW50TW9udGgsIDEpO1xuICAgICAgICAgICAgZC5zZXRNb250aChzZWxmLmN1cnJlbnRNb250aCArIGkpO1xuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChidWlsZE1vbnRoRGF5cyhkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSkpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZGF5c0NvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnKTtcbiAgICAgICAgc2VsZi5kYXlzID0gc2VsZi5kYXlzQ29udGFpbmVyLmZpcnN0Q2hpbGQ7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIgJiYgc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgb25Nb3VzZU92ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBidWlsZE1vbnRoU3dpdGNoKCkge1xuICAgICAgICBpZiAoc2VsZi5jb25maWcuc2hvd01vbnRocyA+IDEgfHxcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1vbnRoU2VsZWN0b3JUeXBlICE9PSBcImRyb3Bkb3duXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBzaG91bGRCdWlsZE1vbnRoID0gZnVuY3Rpb24gKG1vbnRoKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcubWluRGF0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhciA9PT0gc2VsZi5jb25maWcubWluRGF0ZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICAgICAgICAgICAgbW9udGggPCBzZWxmLmNvbmZpZy5taW5EYXRlLmdldE1vbnRoKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gIShzZWxmLmNvbmZpZy5tYXhEYXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID09PSBzZWxmLmNvbmZpZy5tYXhEYXRlLmdldEZ1bGxZZWFyKCkgJiZcbiAgICAgICAgICAgICAgICBtb250aCA+IHNlbGYuY29uZmlnLm1heERhdGUuZ2V0TW9udGgoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHNlbGYubW9udGhzRHJvcGRvd25Db250YWluZXIudGFiSW5kZXggPSAtMTtcbiAgICAgICAgc2VsZi5tb250aHNEcm9wZG93bkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghc2hvdWxkQnVpbGRNb250aChpKSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciBtb250aCA9IGNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgXCJmbGF0cGlja3ItbW9udGhEcm9wZG93bi1tb250aFwiKTtcbiAgICAgICAgICAgIG1vbnRoLnZhbHVlID0gbmV3IERhdGUoc2VsZi5jdXJyZW50WWVhciwgaSkuZ2V0TW9udGgoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgbW9udGgudGV4dENvbnRlbnQgPSBtb250aFRvU3RyKGksIHNlbGYuY29uZmlnLnNob3J0aGFuZEN1cnJlbnRNb250aCwgc2VsZi5sMTBuKTtcbiAgICAgICAgICAgIG1vbnRoLnRhYkluZGV4ID0gLTE7XG4gICAgICAgICAgICBpZiAoc2VsZi5jdXJyZW50TW9udGggPT09IGkpIHtcbiAgICAgICAgICAgICAgICBtb250aC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLm1vbnRoc0Ryb3Bkb3duQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vbnRoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBidWlsZE1vbnRoKCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1tb250aFwiKTtcbiAgICAgICAgdmFyIG1vbnRoTmF2RnJhZ21lbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB2YXIgbW9udGhFbGVtZW50O1xuICAgICAgICBpZiAoc2VsZi5jb25maWcuc2hvd01vbnRocyA+IDEgfHxcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1vbnRoU2VsZWN0b3JUeXBlID09PSBcInN0YXRpY1wiKSB7XG4gICAgICAgICAgICBtb250aEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImN1ci1tb250aFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYubW9udGhzRHJvcGRvd25Db250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIFwiZmxhdHBpY2tyLW1vbnRoRHJvcGRvd24tbW9udGhzXCIpO1xuICAgICAgICAgICAgc2VsZi5tb250aHNEcm9wZG93bkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHNlbGYubDEwbi5tb250aEFyaWFMYWJlbCk7XG4gICAgICAgICAgICBiaW5kKHNlbGYubW9udGhzRHJvcGRvd25Db250YWluZXIsIFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGdldEV2ZW50VGFyZ2V0KGUpO1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZE1vbnRoID0gcGFyc2VJbnQodGFyZ2V0LnZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VNb250aChzZWxlY3RlZE1vbnRoIC0gc2VsZi5jdXJyZW50TW9udGgpO1xuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uTW9udGhDaGFuZ2VcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJ1aWxkTW9udGhTd2l0Y2goKTtcbiAgICAgICAgICAgIG1vbnRoRWxlbWVudCA9IHNlbGYubW9udGhzRHJvcGRvd25Db250YWluZXI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHllYXJJbnB1dCA9IGNyZWF0ZU51bWJlcklucHV0KFwiY3VyLXllYXJcIiwgeyB0YWJpbmRleDogXCItMVwiIH0pO1xuICAgICAgICB2YXIgeWVhckVsZW1lbnQgPSB5ZWFySW5wdXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgeWVhckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBzZWxmLmwxMG4ueWVhckFyaWFMYWJlbCk7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5taW5EYXRlKSB7XG4gICAgICAgICAgICB5ZWFyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgc2VsZi5jb25maWcubWluRGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tYXhEYXRlKSB7XG4gICAgICAgICAgICB5ZWFyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgc2VsZi5jb25maWcubWF4RGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgeWVhckVsZW1lbnQuZGlzYWJsZWQgPVxuICAgICAgICAgICAgICAgICEhc2VsZi5jb25maWcubWluRGF0ZSAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5taW5EYXRlLmdldEZ1bGxZZWFyKCkgPT09IHNlbGYuY29uZmlnLm1heERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VycmVudE1vbnRoID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1jdXJyZW50LW1vbnRoXCIpO1xuICAgICAgICBjdXJyZW50TW9udGguYXBwZW5kQ2hpbGQobW9udGhFbGVtZW50KTtcbiAgICAgICAgY3VycmVudE1vbnRoLmFwcGVuZENoaWxkKHllYXJJbnB1dCk7XG4gICAgICAgIG1vbnRoTmF2RnJhZ21lbnQuYXBwZW5kQ2hpbGQoY3VycmVudE1vbnRoKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1vbnRoTmF2RnJhZ21lbnQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgICAgICB5ZWFyRWxlbWVudDogeWVhckVsZW1lbnQsXG4gICAgICAgICAgICBtb250aEVsZW1lbnQ6IG1vbnRoRWxlbWVudCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRNb250aHMoKSB7XG4gICAgICAgIGNsZWFyTm9kZShzZWxmLm1vbnRoTmF2KTtcbiAgICAgICAgc2VsZi5tb250aE5hdi5hcHBlbmRDaGlsZChzZWxmLnByZXZNb250aE5hdik7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5zaG93TW9udGhzKSB7XG4gICAgICAgICAgICBzZWxmLnllYXJFbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgc2VsZi5tb250aEVsZW1lbnRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgbSA9IHNlbGYuY29uZmlnLnNob3dNb250aHM7IG0tLTspIHtcbiAgICAgICAgICAgIHZhciBtb250aCA9IGJ1aWxkTW9udGgoKTtcbiAgICAgICAgICAgIHNlbGYueWVhckVsZW1lbnRzLnB1c2gobW9udGgueWVhckVsZW1lbnQpO1xuICAgICAgICAgICAgc2VsZi5tb250aEVsZW1lbnRzLnB1c2gobW9udGgubW9udGhFbGVtZW50KTtcbiAgICAgICAgICAgIHNlbGYubW9udGhOYXYuYXBwZW5kQ2hpbGQobW9udGguY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLm1vbnRoTmF2LmFwcGVuZENoaWxkKHNlbGYubmV4dE1vbnRoTmF2KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRNb250aE5hdigpIHtcbiAgICAgICAgc2VsZi5tb250aE5hdiA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3ItbW9udGhzXCIpO1xuICAgICAgICBzZWxmLnllYXJFbGVtZW50cyA9IFtdO1xuICAgICAgICBzZWxmLm1vbnRoRWxlbWVudHMgPSBbXTtcbiAgICAgICAgc2VsZi5wcmV2TW9udGhOYXYgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImZsYXRwaWNrci1wcmV2LW1vbnRoXCIpO1xuICAgICAgICBzZWxmLnByZXZNb250aE5hdi5pbm5lckhUTUwgPSBzZWxmLmNvbmZpZy5wcmV2QXJyb3c7XG4gICAgICAgIHNlbGYubmV4dE1vbnRoTmF2ID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJmbGF0cGlja3ItbmV4dC1tb250aFwiKTtcbiAgICAgICAgc2VsZi5uZXh0TW9udGhOYXYuaW5uZXJIVE1MID0gc2VsZi5jb25maWcubmV4dEFycm93O1xuICAgICAgICBidWlsZE1vbnRocygpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgXCJfaGlkZVByZXZNb250aEFycm93XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5fX2hpZGVQcmV2TW9udGhBcnJvdzsgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGJvb2wpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fX2hpZGVQcmV2TW9udGhBcnJvdyAhPT0gYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLnByZXZNb250aE5hdiwgXCJmbGF0cGlja3ItZGlzYWJsZWRcIiwgYm9vbCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX19oaWRlUHJldk1vbnRoQXJyb3cgPSBib29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgXCJfaGlkZU5leHRNb250aEFycm93XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5fX2hpZGVOZXh0TW9udGhBcnJvdzsgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGJvb2wpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5fX2hpZGVOZXh0TW9udGhBcnJvdyAhPT0gYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLm5leHRNb250aE5hdiwgXCJmbGF0cGlja3ItZGlzYWJsZWRcIiwgYm9vbCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX19oaWRlTmV4dE1vbnRoQXJyb3cgPSBib29sO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudCA9IHNlbGYueWVhckVsZW1lbnRzWzBdO1xuICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uQ3VycmVudE1vbnRoKCk7XG4gICAgICAgIHJldHVybiBzZWxmLm1vbnRoTmF2O1xuICAgIH1cbiAgICBmdW5jdGlvbiBidWlsZFRpbWUoKSB7XG4gICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhhc1RpbWVcIik7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5ub0NhbGVuZGFyKVxuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibm9DYWxlbmRhclwiKTtcbiAgICAgICAgdmFyIGRlZmF1bHRzID0gZ2V0RGVmYXVsdEhvdXJzKHNlbGYuY29uZmlnKTtcbiAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci10aW1lXCIpO1xuICAgICAgICBzZWxmLnRpbWVDb250YWluZXIudGFiSW5kZXggPSAtMTtcbiAgICAgICAgdmFyIHNlcGFyYXRvciA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLXRpbWUtc2VwYXJhdG9yXCIsIFwiOlwiKTtcbiAgICAgICAgdmFyIGhvdXJJbnB1dCA9IGNyZWF0ZU51bWJlcklucHV0KFwiZmxhdHBpY2tyLWhvdXJcIiwge1xuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHNlbGYubDEwbi5ob3VyQXJpYUxhYmVsLFxuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5ob3VyRWxlbWVudCA9IGhvdXJJbnB1dC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdO1xuICAgICAgICB2YXIgbWludXRlSW5wdXQgPSBjcmVhdGVOdW1iZXJJbnB1dChcImZsYXRwaWNrci1taW51dGVcIiwge1xuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHNlbGYubDEwbi5taW51dGVBcmlhTGFiZWwsXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQgPSBtaW51dGVJbnB1dC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdO1xuICAgICAgICBzZWxmLmhvdXJFbGVtZW50LnRhYkluZGV4ID0gc2VsZi5taW51dGVFbGVtZW50LnRhYkluZGV4ID0gLTE7XG4gICAgICAgIHNlbGYuaG91ckVsZW1lbnQudmFsdWUgPSBwYWQoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmpcbiAgICAgICAgICAgID8gc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmouZ2V0SG91cnMoKVxuICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy50aW1lXzI0aHJcbiAgICAgICAgICAgICAgICA/IGRlZmF1bHRzLmhvdXJzXG4gICAgICAgICAgICAgICAgOiBtaWxpdGFyeTJhbXBtKGRlZmF1bHRzLmhvdXJzKSk7XG4gICAgICAgIHNlbGYubWludXRlRWxlbWVudC52YWx1ZSA9IHBhZChzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9ialxuICAgICAgICAgICAgPyBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iai5nZXRNaW51dGVzKClcbiAgICAgICAgICAgIDogZGVmYXVsdHMubWludXRlcyk7XG4gICAgICAgIHNlbGYuaG91ckVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3RlcFwiLCBzZWxmLmNvbmZpZy5ob3VySW5jcmVtZW50LnRvU3RyaW5nKCkpO1xuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3RlcFwiLCBzZWxmLmNvbmZpZy5taW51dGVJbmNyZW1lbnQudG9TdHJpbmcoKSk7XG4gICAgICAgIHNlbGYuaG91ckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWluXCIsIHNlbGYuY29uZmlnLnRpbWVfMjRociA/IFwiMFwiIDogXCIxXCIpO1xuICAgICAgICBzZWxmLmhvdXJFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1heFwiLCBzZWxmLmNvbmZpZy50aW1lXzI0aHIgPyBcIjIzXCIgOiBcIjEyXCIpO1xuICAgICAgICBzZWxmLmhvdXJFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBcIjJcIik7XG4gICAgICAgIHNlbGYubWludXRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgXCIwXCIpO1xuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWF4XCIsIFwiNTlcIik7XG4gICAgICAgIHNlbGYubWludXRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgXCIyXCIpO1xuICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91cklucHV0KTtcbiAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlcGFyYXRvcik7XG4gICAgICAgIHNlbGYudGltZUNvbnRhaW5lci5hcHBlbmRDaGlsZChtaW51dGVJbnB1dCk7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy50aW1lXzI0aHIpXG4gICAgICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRpbWUyNGhyXCIpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcuZW5hYmxlU2Vjb25kcykge1xuICAgICAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoYXNTZWNvbmRzXCIpO1xuICAgICAgICAgICAgdmFyIHNlY29uZElucHV0ID0gY3JlYXRlTnVtYmVySW5wdXQoXCJmbGF0cGlja3Itc2Vjb25kXCIpO1xuICAgICAgICAgICAgc2VsZi5zZWNvbmRFbGVtZW50ID0gc2Vjb25kSW5wdXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudC52YWx1ZSA9IHBhZChzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9ialxuICAgICAgICAgICAgICAgID8gc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmouZ2V0U2Vjb25kcygpXG4gICAgICAgICAgICAgICAgOiBkZWZhdWx0cy5zZWNvbmRzKTtcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdGVwXCIsIHNlbGYubWludXRlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJzdGVwXCIpKTtcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtaW5cIiwgXCIwXCIpO1xuICAgICAgICAgICAgc2VsZi5zZWNvbmRFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1heFwiLCBcIjU5XCIpO1xuICAgICAgICAgICAgc2VsZi5zZWNvbmRFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLCBcIjJcIik7XG4gICAgICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJmbGF0cGlja3ItdGltZS1zZXBhcmF0b3JcIiwgXCI6XCIpKTtcbiAgICAgICAgICAgIHNlbGYudGltZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWNvbmRJbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy50aW1lXzI0aHIpIHtcbiAgICAgICAgICAgIHNlbGYuYW1QTSA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLWFtLXBtXCIsIHNlbGYubDEwbi5hbVBNW2ludCgoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmpcbiAgICAgICAgICAgICAgICA/IHNlbGYuaG91ckVsZW1lbnQudmFsdWVcbiAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLmRlZmF1bHRIb3VyKSA+IDExKV0pO1xuICAgICAgICAgICAgc2VsZi5hbVBNLnRpdGxlID0gc2VsZi5sMTBuLnRvZ2dsZVRpdGxlO1xuICAgICAgICAgICAgc2VsZi5hbVBNLnRhYkluZGV4ID0gLTE7XG4gICAgICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5hbVBNKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZi50aW1lQ29udGFpbmVyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBidWlsZFdlZWtkYXlzKCkge1xuICAgICAgICBpZiAoIXNlbGYud2Vla2RheUNvbnRhaW5lcilcbiAgICAgICAgICAgIHNlbGYud2Vla2RheUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3Itd2Vla2RheXNcIik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNsZWFyTm9kZShzZWxmLndlZWtkYXlDb250YWluZXIpO1xuICAgICAgICBmb3IgKHZhciBpID0gc2VsZi5jb25maWcuc2hvd01vbnRoczsgaS0tOykge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3Itd2Vla2RheWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIHNlbGYud2Vla2RheUNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZVdlZWtkYXlzKCk7XG4gICAgICAgIHJldHVybiBzZWxmLndlZWtkYXlDb250YWluZXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVdlZWtkYXlzKCkge1xuICAgICAgICBpZiAoIXNlbGYud2Vla2RheUNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaXJzdERheU9mV2VlayA9IHNlbGYubDEwbi5maXJzdERheU9mV2VlaztcbiAgICAgICAgdmFyIHdlZWtkYXlzID0gX19zcHJlYWRBcnJheXMoc2VsZi5sMTBuLndlZWtkYXlzLnNob3J0aGFuZCk7XG4gICAgICAgIGlmIChmaXJzdERheU9mV2VlayA+IDAgJiYgZmlyc3REYXlPZldlZWsgPCB3ZWVrZGF5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHdlZWtkYXlzID0gX19zcHJlYWRBcnJheXMod2Vla2RheXMuc3BsaWNlKGZpcnN0RGF5T2ZXZWVrLCB3ZWVrZGF5cy5sZW5ndGgpLCB3ZWVrZGF5cy5zcGxpY2UoMCwgZmlyc3REYXlPZldlZWspKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gc2VsZi5jb25maWcuc2hvd01vbnRoczsgaS0tOykge1xuICAgICAgICAgICAgc2VsZi53ZWVrZGF5Q29udGFpbmVyLmNoaWxkcmVuW2ldLmlubmVySFRNTCA9IFwiXFxuICAgICAgPHNwYW4gY2xhc3M9J2ZsYXRwaWNrci13ZWVrZGF5Jz5cXG4gICAgICAgIFwiICsgd2Vla2RheXMuam9pbihcIjwvc3Bhbj48c3BhbiBjbGFzcz0nZmxhdHBpY2tyLXdlZWtkYXknPlwiKSArIFwiXFxuICAgICAgPC9zcGFuPlxcbiAgICAgIFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkV2Vla3MoKSB7XG4gICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhhc1dlZWtzXCIpO1xuICAgICAgICB2YXIgd2Vla1dyYXBwZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXdlZWt3cmFwcGVyXCIpO1xuICAgICAgICB3ZWVrV3JhcHBlci5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImZsYXRwaWNrci13ZWVrZGF5XCIsIHNlbGYubDEwbi53ZWVrQWJicmV2aWF0aW9uKSk7XG4gICAgICAgIHZhciB3ZWVrTnVtYmVycyA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3Itd2Vla3NcIik7XG4gICAgICAgIHdlZWtXcmFwcGVyLmFwcGVuZENoaWxkKHdlZWtOdW1iZXJzKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdlZWtXcmFwcGVyOiB3ZWVrV3JhcHBlcixcbiAgICAgICAgICAgIHdlZWtOdW1iZXJzOiB3ZWVrTnVtYmVycyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hhbmdlTW9udGgodmFsdWUsIGlzT2Zmc2V0KSB7XG4gICAgICAgIGlmIChpc09mZnNldCA9PT0gdm9pZCAwKSB7IGlzT2Zmc2V0ID0gdHJ1ZTsgfVxuICAgICAgICB2YXIgZGVsdGEgPSBpc09mZnNldCA/IHZhbHVlIDogdmFsdWUgLSBzZWxmLmN1cnJlbnRNb250aDtcbiAgICAgICAgaWYgKChkZWx0YSA8IDAgJiYgc2VsZi5faGlkZVByZXZNb250aEFycm93ID09PSB0cnVlKSB8fFxuICAgICAgICAgICAgKGRlbHRhID4gMCAmJiBzZWxmLl9oaWRlTmV4dE1vbnRoQXJyb3cgPT09IHRydWUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzZWxmLmN1cnJlbnRNb250aCArPSBkZWx0YTtcbiAgICAgICAgaWYgKHNlbGYuY3VycmVudE1vbnRoIDwgMCB8fCBzZWxmLmN1cnJlbnRNb250aCA+IDExKSB7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyICs9IHNlbGYuY3VycmVudE1vbnRoID4gMTEgPyAxIDogLTE7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IChzZWxmLmN1cnJlbnRNb250aCArIDEyKSAlIDEyO1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25ZZWFyQ2hhbmdlXCIpO1xuICAgICAgICAgICAgYnVpbGRNb250aFN3aXRjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGJ1aWxkRGF5cygpO1xuICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbk1vbnRoQ2hhbmdlXCIpO1xuICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uQ3VycmVudE1vbnRoKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsZWFyKHRyaWdnZXJDaGFuZ2VFdmVudCwgdG9Jbml0aWFsKSB7XG4gICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlRXZlbnQgPT09IHZvaWQgMCkgeyB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSB0cnVlOyB9XG4gICAgICAgIGlmICh0b0luaXRpYWwgPT09IHZvaWQgMCkgeyB0b0luaXRpYWwgPSB0cnVlOyB9XG4gICAgICAgIHNlbGYuaW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICBpZiAoc2VsZi5hbHRJbnB1dCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGlmIChzZWxmLm1vYmlsZUlucHV0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzID0gW107XG4gICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodG9Jbml0aWFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID0gc2VsZi5faW5pdGlhbERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudE1vbnRoID0gc2VsZi5faW5pdGlhbERhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5jb25maWcuZW5hYmxlVGltZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIF9hID0gZ2V0RGVmYXVsdEhvdXJzKHNlbGYuY29uZmlnKSwgaG91cnMgPSBfYS5ob3VycywgbWludXRlcyA9IF9hLm1pbnV0ZXMsIHNlY29uZHMgPSBfYS5zZWNvbmRzO1xuICAgICAgICAgICAgc2V0SG91cnMoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlRXZlbnQpXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkNoYW5nZVwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIHNlbGYuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIGlmICghc2VsZi5pc01vYmlsZSkge1xuICAgICAgICAgICAgaWYgKHNlbGYuY2FsZW5kYXJDb250YWluZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZi5faW5wdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2lucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJpZ2dlckV2ZW50KFwib25DbG9zZVwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkRlc3Ryb3lcIik7XG4gICAgICAgIGZvciAodmFyIGkgPSBzZWxmLl9oYW5kbGVycy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIHNlbGYuX2hhbmRsZXJzW2ldLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuX2hhbmRsZXJzID0gW107XG4gICAgICAgIGlmIChzZWxmLm1vYmlsZUlucHV0KSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5tb2JpbGVJbnB1dC5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzZWxmLm1vYmlsZUlucHV0KTtcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZi5jYWxlbmRhckNvbnRhaW5lciAmJiBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5zdGF0aWMgJiYgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgd3JhcHBlci5sYXN0Q2hpbGQgJiYgd3JhcHBlci5yZW1vdmVDaGlsZCh3cmFwcGVyLmxhc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKHdyYXBwZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAod3JhcHBlci5maXJzdENoaWxkKVxuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLmZpcnN0Q2hpbGQsIHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod3JhcHBlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzZWxmLmNhbGVuZGFyQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5hbHRJbnB1dCkge1xuICAgICAgICAgICAgc2VsZi5pbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgICAgICBpZiAoc2VsZi5hbHRJbnB1dC5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzZWxmLmFsdElucHV0KTtcbiAgICAgICAgICAgIGRlbGV0ZSBzZWxmLmFsdElucHV0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmlucHV0KSB7XG4gICAgICAgICAgICBzZWxmLmlucHV0LnR5cGUgPSBzZWxmLmlucHV0Ll90eXBlO1xuICAgICAgICAgICAgc2VsZi5pbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiZmxhdHBpY2tyLWlucHV0XCIpO1xuICAgICAgICAgICAgc2VsZi5pbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKTtcbiAgICAgICAgfVxuICAgICAgICBbXG4gICAgICAgICAgICBcIl9zaG93VGltZUlucHV0XCIsXG4gICAgICAgICAgICBcImxhdGVzdFNlbGVjdGVkRGF0ZU9ialwiLFxuICAgICAgICAgICAgXCJfaGlkZU5leHRNb250aEFycm93XCIsXG4gICAgICAgICAgICBcIl9oaWRlUHJldk1vbnRoQXJyb3dcIixcbiAgICAgICAgICAgIFwiX19oaWRlTmV4dE1vbnRoQXJyb3dcIixcbiAgICAgICAgICAgIFwiX19oaWRlUHJldk1vbnRoQXJyb3dcIixcbiAgICAgICAgICAgIFwiaXNNb2JpbGVcIixcbiAgICAgICAgICAgIFwiaXNPcGVuXCIsXG4gICAgICAgICAgICBcInNlbGVjdGVkRGF0ZUVsZW1cIixcbiAgICAgICAgICAgIFwibWluRGF0ZUhhc1RpbWVcIixcbiAgICAgICAgICAgIFwibWF4RGF0ZUhhc1RpbWVcIixcbiAgICAgICAgICAgIFwiZGF5c1wiLFxuICAgICAgICAgICAgXCJkYXlzQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBcIl9pbnB1dFwiLFxuICAgICAgICAgICAgXCJfcG9zaXRpb25FbGVtZW50XCIsXG4gICAgICAgICAgICBcImlubmVyQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBcInJDb250YWluZXJcIixcbiAgICAgICAgICAgIFwibW9udGhOYXZcIixcbiAgICAgICAgICAgIFwidG9kYXlEYXRlRWxlbVwiLFxuICAgICAgICAgICAgXCJjYWxlbmRhckNvbnRhaW5lclwiLFxuICAgICAgICAgICAgXCJ3ZWVrZGF5Q29udGFpbmVyXCIsXG4gICAgICAgICAgICBcInByZXZNb250aE5hdlwiLFxuICAgICAgICAgICAgXCJuZXh0TW9udGhOYXZcIixcbiAgICAgICAgICAgIFwibW9udGhzRHJvcGRvd25Db250YWluZXJcIixcbiAgICAgICAgICAgIFwiY3VycmVudE1vbnRoRWxlbWVudFwiLFxuICAgICAgICAgICAgXCJjdXJyZW50WWVhckVsZW1lbnRcIixcbiAgICAgICAgICAgIFwibmF2aWdhdGlvbkN1cnJlbnRNb250aFwiLFxuICAgICAgICAgICAgXCJzZWxlY3RlZERhdGVFbGVtXCIsXG4gICAgICAgICAgICBcImNvbmZpZ1wiLFxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNlbGZba107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoXykgeyB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0NhbGVuZGFyRWxlbShlbGVtKSB7XG4gICAgICAgIHJldHVybiBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLmNvbnRhaW5zKGVsZW0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb2N1bWVudENsaWNrKGUpIHtcbiAgICAgICAgaWYgKHNlbGYuaXNPcGVuICYmICFzZWxmLmNvbmZpZy5pbmxpbmUpIHtcbiAgICAgICAgICAgIHZhciBldmVudFRhcmdldF8xID0gZ2V0RXZlbnRUYXJnZXQoZSk7XG4gICAgICAgICAgICB2YXIgaXNDYWxlbmRhckVsZW1lbnQgPSBpc0NhbGVuZGFyRWxlbShldmVudFRhcmdldF8xKTtcbiAgICAgICAgICAgIHZhciBpc0lucHV0ID0gZXZlbnRUYXJnZXRfMSA9PT0gc2VsZi5pbnB1dCB8fFxuICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0XzEgPT09IHNlbGYuYWx0SW5wdXQgfHxcbiAgICAgICAgICAgICAgICBzZWxmLmVsZW1lbnQuY29udGFpbnMoZXZlbnRUYXJnZXRfMSkgfHxcbiAgICAgICAgICAgICAgICAoZS5wYXRoICYmXG4gICAgICAgICAgICAgICAgICAgIGUucGF0aC5pbmRleE9mICYmXG4gICAgICAgICAgICAgICAgICAgICh+ZS5wYXRoLmluZGV4T2Yoc2VsZi5pbnB1dCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIH5lLnBhdGguaW5kZXhPZihzZWxmLmFsdElucHV0KSkpO1xuICAgICAgICAgICAgdmFyIGxvc3RGb2N1cyA9ICFpc0lucHV0ICYmXG4gICAgICAgICAgICAgICAgIWlzQ2FsZW5kYXJFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgIWlzQ2FsZW5kYXJFbGVtKGUucmVsYXRlZFRhcmdldCk7XG4gICAgICAgICAgICB2YXIgaXNJZ25vcmVkID0gIXNlbGYuY29uZmlnLmlnbm9yZWRGb2N1c0VsZW1lbnRzLnNvbWUoZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbS5jb250YWlucyhldmVudFRhcmdldF8xKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGxvc3RGb2N1cyAmJiBpc0lnbm9yZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuYWxsb3dJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUoc2VsZi5faW5wdXQudmFsdWUsIGZhbHNlLCBzZWxmLmNvbmZpZy5hbHRJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5hbHRGb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc2VsZi5jb25maWcuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnRpbWVDb250YWluZXIgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhvdXJFbGVtZW50ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dC52YWx1ZSAhPT0gXCJcIiAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmlucHV0LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGltZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnICYmXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1vZGUgPT09IFwicmFuZ2VcIiAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNsZWFyKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBjaGFuZ2VZZWFyKG5ld1llYXIpIHtcbiAgICAgICAgaWYgKCFuZXdZZWFyIHx8XG4gICAgICAgICAgICAoc2VsZi5jb25maWcubWluRGF0ZSAmJiBuZXdZZWFyIDwgc2VsZi5jb25maWcubWluRGF0ZS5nZXRGdWxsWWVhcigpKSB8fFxuICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1heERhdGUgJiYgbmV3WWVhciA+IHNlbGYuY29uZmlnLm1heERhdGUuZ2V0RnVsbFllYXIoKSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBuZXdZZWFyTnVtID0gbmV3WWVhciwgaXNOZXdZZWFyID0gc2VsZi5jdXJyZW50WWVhciAhPT0gbmV3WWVhck51bTtcbiAgICAgICAgc2VsZi5jdXJyZW50WWVhciA9IG5ld1llYXJOdW0gfHwgc2VsZi5jdXJyZW50WWVhcjtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1heERhdGUgJiZcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFllYXIgPT09IHNlbGYuY29uZmlnLm1heERhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50TW9udGggPSBNYXRoLm1pbihzZWxmLmNvbmZpZy5tYXhEYXRlLmdldE1vbnRoKCksIHNlbGYuY3VycmVudE1vbnRoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxmLmNvbmZpZy5taW5EYXRlICYmXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID09PSBzZWxmLmNvbmZpZy5taW5EYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudE1vbnRoID0gTWF0aC5tYXgoc2VsZi5jb25maWcubWluRGF0ZS5nZXRNb250aCgpLCBzZWxmLmN1cnJlbnRNb250aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTmV3WWVhcikge1xuICAgICAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uWWVhckNoYW5nZVwiKTtcbiAgICAgICAgICAgIGJ1aWxkTW9udGhTd2l0Y2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBpc0VuYWJsZWQoZGF0ZSwgdGltZWxlc3MpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGltZWxlc3MgPT09IHZvaWQgMCkgeyB0aW1lbGVzcyA9IHRydWU7IH1cbiAgICAgICAgdmFyIGRhdGVUb0NoZWNrID0gc2VsZi5wYXJzZURhdGUoZGF0ZSwgdW5kZWZpbmVkLCB0aW1lbGVzcyk7XG4gICAgICAgIGlmICgoc2VsZi5jb25maWcubWluRGF0ZSAmJlxuICAgICAgICAgICAgZGF0ZVRvQ2hlY2sgJiZcbiAgICAgICAgICAgIGNvbXBhcmVEYXRlcyhkYXRlVG9DaGVjaywgc2VsZi5jb25maWcubWluRGF0ZSwgdGltZWxlc3MgIT09IHVuZGVmaW5lZCA/IHRpbWVsZXNzIDogIXNlbGYubWluRGF0ZUhhc1RpbWUpIDwgMCkgfHxcbiAgICAgICAgICAgIChzZWxmLmNvbmZpZy5tYXhEYXRlICYmXG4gICAgICAgICAgICAgICAgZGF0ZVRvQ2hlY2sgJiZcbiAgICAgICAgICAgICAgICBjb21wYXJlRGF0ZXMoZGF0ZVRvQ2hlY2ssIHNlbGYuY29uZmlnLm1heERhdGUsIHRpbWVsZXNzICE9PSB1bmRlZmluZWQgPyB0aW1lbGVzcyA6ICFzZWxmLm1heERhdGVIYXNUaW1lKSA+IDApKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXNlbGYuY29uZmlnLmVuYWJsZSAmJiBzZWxmLmNvbmZpZy5kaXNhYmxlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoZGF0ZVRvQ2hlY2sgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGJvb2wgPSAhIXNlbGYuY29uZmlnLmVuYWJsZSwgYXJyYXkgPSAoX2EgPSBzZWxmLmNvbmZpZy5lbmFibGUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHNlbGYuY29uZmlnLmRpc2FibGU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBkID0gdm9pZCAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGQgPSBhcnJheVtpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZCA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICAgICAgZChkYXRlVG9DaGVjaykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvb2w7XG4gICAgICAgICAgICBlbHNlIGlmIChkIGluc3RhbmNlb2YgRGF0ZSAmJlxuICAgICAgICAgICAgICAgIGRhdGVUb0NoZWNrICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBkLmdldFRpbWUoKSA9PT0gZGF0ZVRvQ2hlY2suZ2V0VGltZSgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBib29sO1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VkID0gc2VsZi5wYXJzZURhdGUoZCwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VkICYmIHBhcnNlZC5nZXRUaW1lKCkgPT09IGRhdGVUb0NoZWNrLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgICAgICA/IGJvb2xcbiAgICAgICAgICAgICAgICAgICAgOiAhYm9vbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgZGF0ZVRvQ2hlY2sgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIGQuZnJvbSAmJlxuICAgICAgICAgICAgICAgIGQudG8gJiZcbiAgICAgICAgICAgICAgICBkYXRlVG9DaGVjay5nZXRUaW1lKCkgPj0gZC5mcm9tLmdldFRpbWUoKSAmJlxuICAgICAgICAgICAgICAgIGRhdGVUb0NoZWNrLmdldFRpbWUoKSA8PSBkLnRvLmdldFRpbWUoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9vbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gIWJvb2w7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzSW5WaWV3KGVsZW0pIHtcbiAgICAgICAgaWYgKHNlbGYuZGF5c0NvbnRhaW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIChlbGVtLmNsYXNzTmFtZS5pbmRleE9mKFwiaGlkZGVuXCIpID09PSAtMSAmJlxuICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lLmluZGV4T2YoXCJmbGF0cGlja3ItZGlzYWJsZWRcIikgPT09IC0xICYmXG4gICAgICAgICAgICAgICAgc2VsZi5kYXlzQ29udGFpbmVyLmNvbnRhaW5zKGVsZW0pKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkJsdXIoZSkge1xuICAgICAgICB2YXIgaXNJbnB1dCA9IGUudGFyZ2V0ID09PSBzZWxmLl9pbnB1dDtcbiAgICAgICAgdmFyIHZhbHVlQ2hhbmdlZCA9IHNlbGYuX2lucHV0LnZhbHVlLnRyaW1FbmQoKSAhPT0gZ2V0RGF0ZVN0cigpO1xuICAgICAgICBpZiAoaXNJbnB1dCAmJlxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkICYmXG4gICAgICAgICAgICAhKGUucmVsYXRlZFRhcmdldCAmJiBpc0NhbGVuZGFyRWxlbShlLnJlbGF0ZWRUYXJnZXQpKSkge1xuICAgICAgICAgICAgc2VsZi5zZXREYXRlKHNlbGYuX2lucHV0LnZhbHVlLCB0cnVlLCBlLnRhcmdldCA9PT0gc2VsZi5hbHRJbnB1dFxuICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcuYWx0Rm9ybWF0XG4gICAgICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5kYXRlRm9ybWF0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbktleURvd24oZSkge1xuICAgICAgICB2YXIgZXZlbnRUYXJnZXQgPSBnZXRFdmVudFRhcmdldChlKTtcbiAgICAgICAgdmFyIGlzSW5wdXQgPSBzZWxmLmNvbmZpZy53cmFwXG4gICAgICAgICAgICA/IGVsZW1lbnQuY29udGFpbnMoZXZlbnRUYXJnZXQpXG4gICAgICAgICAgICA6IGV2ZW50VGFyZ2V0ID09PSBzZWxmLl9pbnB1dDtcbiAgICAgICAgdmFyIGFsbG93SW5wdXQgPSBzZWxmLmNvbmZpZy5hbGxvd0lucHV0O1xuICAgICAgICB2YXIgYWxsb3dLZXlkb3duID0gc2VsZi5pc09wZW4gJiYgKCFhbGxvd0lucHV0IHx8ICFpc0lucHV0KTtcbiAgICAgICAgdmFyIGFsbG93SW5saW5lS2V5ZG93biA9IHNlbGYuY29uZmlnLmlubGluZSAmJiBpc0lucHV0ICYmICFhbGxvd0lucHV0O1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBpc0lucHV0KSB7XG4gICAgICAgICAgICBpZiAoYWxsb3dJbnB1dCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShzZWxmLl9pbnB1dC52YWx1ZSwgdHJ1ZSwgZXZlbnRUYXJnZXQgPT09IHNlbGYuYWx0SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5hbHRGb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5kYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50VGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQ2FsZW5kYXJFbGVtKGV2ZW50VGFyZ2V0KSB8fFxuICAgICAgICAgICAgYWxsb3dLZXlkb3duIHx8XG4gICAgICAgICAgICBhbGxvd0lubGluZUtleWRvd24pIHtcbiAgICAgICAgICAgIHZhciBpc1RpbWVPYmogPSAhIXNlbGYudGltZUNvbnRhaW5lciAmJlxuICAgICAgICAgICAgICAgIHNlbGYudGltZUNvbnRhaW5lci5jb250YWlucyhldmVudFRhcmdldCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzQW5kQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3REYXRlKGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzQW5kQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIGNhc2UgNDY6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0lucHV0ICYmICFzZWxmLmNvbmZpZy5hbGxvd0lucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzVGltZU9iaiAmJiAhaXNJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSBnZXRDbG9zZXN0QWN0aXZlRWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF5c0NvbnRhaW5lciAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGFsbG93SW5wdXQgPT09IGZhbHNlIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhY3RpdmVFbGVtZW50ICYmIGlzSW5WaWV3KGFjdGl2ZUVsZW1lbnQpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVsdGFfMSA9IGUua2V5Q29kZSA9PT0gMzkgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlLmN0cmxLZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzT25EYXkodW5kZWZpbmVkLCBkZWx0YV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlTW9udGgoZGVsdGFfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzT25EYXkoZ2V0Rmlyc3RBdmFpbGFibGVEYXkoMSksIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxmLmhvdXJFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ob3VyRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gZS5rZXlDb2RlID09PSA0MCA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzZWxmLmRheXNDb250YWluZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0LiRpICE9PSB1bmRlZmluZWQpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFRhcmdldCA9PT0gc2VsZi5pbnB1dCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQgPT09IHNlbGYuYWx0SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVllYXIoc2VsZi5jdXJyZW50WWVhciAtIGRlbHRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c09uRGF5KGdldEZpcnN0QXZhaWxhYmxlRGF5KDEpLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFpc1RpbWVPYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNPbkRheSh1bmRlZmluZWQsIGRlbHRhICogNyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnRUYXJnZXQgPT09IHNlbGYuY3VycmVudFllYXJFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VZZWFyKHNlbGYuY3VycmVudFllYXIgLSBkZWx0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5jb25maWcuZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVPYmogJiYgc2VsZi5ob3VyRWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvdXJFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVUaW1lKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGVib3VuY2VkQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUaW1lT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ob3VyRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWNvbmRFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYW1QTSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHNlbGYucGx1Z2luRWxlbWVudHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geDsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGVsZW1zLmluZGV4T2YoZXZlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGVsZW1zW2kgKyAoZS5zaGlmdEtleSA/IC0xIDogMSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGFyZ2V0IHx8IHNlbGYuX2lucHV0KS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFzZWxmLmNvbmZpZy5ub0NhbGVuZGFyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRheXNDb250YWluZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF5c0NvbnRhaW5lci5jb250YWlucyhldmVudFRhcmdldCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2lucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuYW1QTSAhPT0gdW5kZWZpbmVkICYmIGV2ZW50VGFyZ2V0ID09PSBzZWxmLmFtUE0pIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZS5rZXkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHNlbGYubDEwbi5hbVBNWzBdLmNoYXJBdCgwKTpcbiAgICAgICAgICAgICAgICBjYXNlIHNlbGYubDEwbi5hbVBNWzBdLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpOlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFtUE0udGV4dENvbnRlbnQgPSBzZWxmLmwxMG4uYW1QTVswXTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SG91cnNGcm9tSW5wdXRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5sMTBuLmFtUE1bMV0uY2hhckF0KDApOlxuICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5sMTBuLmFtUE1bMV0uY2hhckF0KDApLnRvTG93ZXJDYXNlKCk6XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYW1QTS50ZXh0Q29udGVudCA9IHNlbGYubDEwbi5hbVBNWzFdO1xuICAgICAgICAgICAgICAgICAgICBzZXRIb3Vyc0Zyb21JbnB1dHMoKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSW5wdXQgfHwgaXNDYWxlbmRhckVsZW0oZXZlbnRUYXJnZXQpKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbktleURvd25cIiwgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZU92ZXIoZWxlbSwgY2VsbENsYXNzKSB7XG4gICAgICAgIGlmIChjZWxsQ2xhc3MgPT09IHZvaWQgMCkgeyBjZWxsQ2xhc3MgPSBcImZsYXRwaWNrci1kYXlcIjsgfVxuICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCAhPT0gMSB8fFxuICAgICAgICAgICAgKGVsZW0gJiZcbiAgICAgICAgICAgICAgICAoIWVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNlbGxDbGFzcykgfHxcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJmbGF0cGlja3ItZGlzYWJsZWRcIikpKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGhvdmVyRGF0ZSA9IGVsZW1cbiAgICAgICAgICAgID8gZWxlbS5kYXRlT2JqLmdldFRpbWUoKVxuICAgICAgICAgICAgOiBzZWxmLmRheXMuZmlyc3RFbGVtZW50Q2hpbGQuZGF0ZU9iai5nZXRUaW1lKCksIGluaXRpYWxEYXRlID0gc2VsZi5wYXJzZURhdGUoc2VsZi5zZWxlY3RlZERhdGVzWzBdLCB1bmRlZmluZWQsIHRydWUpLmdldFRpbWUoKSwgcmFuZ2VTdGFydERhdGUgPSBNYXRoLm1pbihob3ZlckRhdGUsIHNlbGYuc2VsZWN0ZWREYXRlc1swXS5nZXRUaW1lKCkpLCByYW5nZUVuZERhdGUgPSBNYXRoLm1heChob3ZlckRhdGUsIHNlbGYuc2VsZWN0ZWREYXRlc1swXS5nZXRUaW1lKCkpO1xuICAgICAgICB2YXIgY29udGFpbnNEaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgbWluUmFuZ2UgPSAwLCBtYXhSYW5nZSA9IDA7XG4gICAgICAgIGZvciAodmFyIHQgPSByYW5nZVN0YXJ0RGF0ZTsgdCA8IHJhbmdlRW5kRGF0ZTsgdCArPSBkdXJhdGlvbi5EQVkpIHtcbiAgICAgICAgICAgIGlmICghaXNFbmFibGVkKG5ldyBEYXRlKHQpLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5zRGlzYWJsZWQgPVxuICAgICAgICAgICAgICAgICAgICBjb250YWluc0Rpc2FibGVkIHx8ICh0ID4gcmFuZ2VTdGFydERhdGUgJiYgdCA8IHJhbmdlRW5kRGF0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHQgPCBpbml0aWFsRGF0ZSAmJiAoIW1pblJhbmdlIHx8IHQgPiBtaW5SYW5nZSkpXG4gICAgICAgICAgICAgICAgICAgIG1pblJhbmdlID0gdDtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0ID4gaW5pdGlhbERhdGUgJiYgKCFtYXhSYW5nZSB8fCB0IDwgbWF4UmFuZ2UpKVxuICAgICAgICAgICAgICAgICAgICBtYXhSYW5nZSA9IHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhvdmVyYWJsZUNlbGxzID0gQXJyYXkuZnJvbShzZWxmLnJDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIio6bnRoLWNoaWxkKC1uK1wiICsgc2VsZi5jb25maWcuc2hvd01vbnRocyArIFwiKSA+IC5cIiArIGNlbGxDbGFzcykpO1xuICAgICAgICBob3ZlcmFibGVDZWxscy5mb3JFYWNoKGZ1bmN0aW9uIChkYXlFbGVtKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IGRheUVsZW0uZGF0ZU9iajtcbiAgICAgICAgICAgIHZhciB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBvdXRPZlJhbmdlID0gKG1pblJhbmdlID4gMCAmJiB0aW1lc3RhbXAgPCBtaW5SYW5nZSkgfHxcbiAgICAgICAgICAgICAgICAobWF4UmFuZ2UgPiAwICYmIHRpbWVzdGFtcCA+IG1heFJhbmdlKTtcbiAgICAgICAgICAgIGlmIChvdXRPZlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgZGF5RWxlbS5jbGFzc0xpc3QuYWRkKFwibm90QWxsb3dlZFwiKTtcbiAgICAgICAgICAgICAgICBbXCJpblJhbmdlXCIsIFwic3RhcnRSYW5nZVwiLCBcImVuZFJhbmdlXCJdLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5RWxlbS5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbnRhaW5zRGlzYWJsZWQgJiYgIW91dE9mUmFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgW1wic3RhcnRSYW5nZVwiLCBcImluUmFuZ2VcIiwgXCJlbmRSYW5nZVwiLCBcIm5vdEFsbG93ZWRcIl0uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIGRheUVsZW0uY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGVsZW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChob3ZlckRhdGUgPD0gc2VsZi5zZWxlY3RlZERhdGVzWzBdLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgICAgICA/IFwic3RhcnRSYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJlbmRSYW5nZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbERhdGUgPCBob3ZlckRhdGUgJiYgdGltZXN0YW1wID09PSBpbml0aWFsRGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgZGF5RWxlbS5jbGFzc0xpc3QuYWRkKFwic3RhcnRSYW5nZVwiKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbml0aWFsRGF0ZSA+IGhvdmVyRGF0ZSAmJiB0aW1lc3RhbXAgPT09IGluaXRpYWxEYXRlKVxuICAgICAgICAgICAgICAgICAgICBkYXlFbGVtLmNsYXNzTGlzdC5hZGQoXCJlbmRSYW5nZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAodGltZXN0YW1wID49IG1pblJhbmdlICYmXG4gICAgICAgICAgICAgICAgICAgIChtYXhSYW5nZSA9PT0gMCB8fCB0aW1lc3RhbXAgPD0gbWF4UmFuZ2UpICYmXG4gICAgICAgICAgICAgICAgICAgIGlzQmV0d2Vlbih0aW1lc3RhbXAsIGluaXRpYWxEYXRlLCBob3ZlckRhdGUpKVxuICAgICAgICAgICAgICAgICAgICBkYXlFbGVtLmNsYXNzTGlzdC5hZGQoXCJpblJhbmdlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgICAgIGlmIChzZWxmLmlzT3BlbiAmJiAhc2VsZi5jb25maWcuc3RhdGljICYmICFzZWxmLmNvbmZpZy5pbmxpbmUpXG4gICAgICAgICAgICBwb3NpdGlvbkNhbGVuZGFyKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9wZW4oZSwgcG9zaXRpb25FbGVtZW50KSB7XG4gICAgICAgIGlmIChwb3NpdGlvbkVsZW1lbnQgPT09IHZvaWQgMCkgeyBwb3NpdGlvbkVsZW1lbnQgPSBzZWxmLl9wb3NpdGlvbkVsZW1lbnQ7IH1cbiAgICAgICAgaWYgKHNlbGYuaXNNb2JpbGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZhciBldmVudFRhcmdldCA9IGdldEV2ZW50VGFyZ2V0KGUpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudFRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudFRhcmdldC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYubW9iaWxlSW5wdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0LmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbk9wZW5cIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZi5faW5wdXQuZGlzYWJsZWQgfHwgc2VsZi5jb25maWcuaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdhc09wZW4gPSBzZWxmLmlzT3BlbjtcbiAgICAgICAgc2VsZi5pc09wZW4gPSB0cnVlO1xuICAgICAgICBpZiAoIXdhc09wZW4pIHtcbiAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XG4gICAgICAgICAgICBzZWxmLl9pbnB1dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25PcGVuXCIpO1xuICAgICAgICAgICAgcG9zaXRpb25DYWxlbmRhcihwb3NpdGlvbkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5lbmFibGVUaW1lID09PSB0cnVlICYmIHNlbGYuY29uZmlnLm5vQ2FsZW5kYXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5hbGxvd0lucHV0ID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgIChlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgIXNlbGYudGltZUNvbnRhaW5lci5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5ob3VyRWxlbWVudC5zZWxlY3QoKTsgfSwgNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1pbk1heERhdGVTZXR0ZXIodHlwZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgICAgIHZhciBkYXRlT2JqID0gKHNlbGYuY29uZmlnW1wiX1wiICsgdHlwZSArIFwiRGF0ZVwiXSA9IHNlbGYucGFyc2VEYXRlKGRhdGUsIHNlbGYuY29uZmlnLmRhdGVGb3JtYXQpKTtcbiAgICAgICAgICAgIHZhciBpbnZlcnNlRGF0ZU9iaiA9IHNlbGYuY29uZmlnW1wiX1wiICsgKHR5cGUgPT09IFwibWluXCIgPyBcIm1heFwiIDogXCJtaW5cIikgKyBcIkRhdGVcIl07XG4gICAgICAgICAgICBpZiAoZGF0ZU9iaiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZlt0eXBlID09PSBcIm1pblwiID8gXCJtaW5EYXRlSGFzVGltZVwiIDogXCJtYXhEYXRlSGFzVGltZVwiXSA9XG4gICAgICAgICAgICAgICAgICAgIGRhdGVPYmouZ2V0SG91cnMoKSA+IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVPYmouZ2V0TWludXRlcygpID4gMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZU9iai5nZXRTZWNvbmRzKCkgPiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcykge1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcyA9IHNlbGYuc2VsZWN0ZWREYXRlcy5maWx0ZXIoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGlzRW5hYmxlZChkKTsgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoICYmIHR5cGUgPT09IFwibWluXCIpXG4gICAgICAgICAgICAgICAgICAgIHNldEhvdXJzRnJvbURhdGUoZGF0ZU9iaik7XG4gICAgICAgICAgICAgICAgdXBkYXRlVmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLmRheXNDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICByZWRyYXcoKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZU9iaiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudFt0eXBlXSA9IGRhdGVPYmouZ2V0RnVsbFllYXIoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhckVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHR5cGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFllYXJFbGVtZW50LmRpc2FibGVkID1cbiAgICAgICAgICAgICAgICAgICAgISFpbnZlcnNlRGF0ZU9iaiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZU9iaiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlcnNlRGF0ZU9iai5nZXRGdWxsWWVhcigpID09PSBkYXRlT2JqLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlQ29uZmlnKCkge1xuICAgICAgICB2YXIgYm9vbE9wdHMgPSBbXG4gICAgICAgICAgICBcIndyYXBcIixcbiAgICAgICAgICAgIFwid2Vla051bWJlcnNcIixcbiAgICAgICAgICAgIFwiYWxsb3dJbnB1dFwiLFxuICAgICAgICAgICAgXCJhbGxvd0ludmFsaWRQcmVsb2FkXCIsXG4gICAgICAgICAgICBcImNsaWNrT3BlbnNcIixcbiAgICAgICAgICAgIFwidGltZV8yNGhyXCIsXG4gICAgICAgICAgICBcImVuYWJsZVRpbWVcIixcbiAgICAgICAgICAgIFwibm9DYWxlbmRhclwiLFxuICAgICAgICAgICAgXCJhbHRJbnB1dFwiLFxuICAgICAgICAgICAgXCJzaG9ydGhhbmRDdXJyZW50TW9udGhcIixcbiAgICAgICAgICAgIFwiaW5saW5lXCIsXG4gICAgICAgICAgICBcInN0YXRpY1wiLFxuICAgICAgICAgICAgXCJlbmFibGVTZWNvbmRzXCIsXG4gICAgICAgICAgICBcImRpc2FibGVNb2JpbGVcIixcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIHVzZXJDb25maWcgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlbGVtZW50LmRhdGFzZXQgfHwge30pKSksIGluc3RhbmNlQ29uZmlnKTtcbiAgICAgICAgdmFyIGZvcm1hdHMgPSB7fTtcbiAgICAgICAgc2VsZi5jb25maWcucGFyc2VEYXRlID0gdXNlckNvbmZpZy5wYXJzZURhdGU7XG4gICAgICAgIHNlbGYuY29uZmlnLmZvcm1hdERhdGUgPSB1c2VyQ29uZmlnLmZvcm1hdERhdGU7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLmNvbmZpZywgXCJlbmFibGVcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLmNvbmZpZy5fZW5hYmxlOyB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5fZW5hYmxlID0gcGFyc2VEYXRlUnVsZXMoZGF0ZXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLmNvbmZpZywgXCJkaXNhYmxlXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5jb25maWcuX2Rpc2FibGU7IH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlcykge1xuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLl9kaXNhYmxlID0gcGFyc2VEYXRlUnVsZXMoZGF0ZXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB0aW1lTW9kZSA9IHVzZXJDb25maWcubW9kZSA9PT0gXCJ0aW1lXCI7XG4gICAgICAgIGlmICghdXNlckNvbmZpZy5kYXRlRm9ybWF0ICYmICh1c2VyQ29uZmlnLmVuYWJsZVRpbWUgfHwgdGltZU1vZGUpKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdERhdGVGb3JtYXQgPSBmbGF0cGlja3IuZGVmYXVsdENvbmZpZy5kYXRlRm9ybWF0IHx8IGRlZmF1bHRPcHRpb25zLmRhdGVGb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXRzLmRhdGVGb3JtYXQgPVxuICAgICAgICAgICAgICAgIHVzZXJDb25maWcubm9DYWxlbmRhciB8fCB0aW1lTW9kZVxuICAgICAgICAgICAgICAgICAgICA/IFwiSDppXCIgKyAodXNlckNvbmZpZy5lbmFibGVTZWNvbmRzID8gXCI6U1wiIDogXCJcIilcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RGF0ZUZvcm1hdCArIFwiIEg6aVwiICsgKHVzZXJDb25maWcuZW5hYmxlU2Vjb25kcyA/IFwiOlNcIiA6IFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VyQ29uZmlnLmFsdElucHV0ICYmXG4gICAgICAgICAgICAodXNlckNvbmZpZy5lbmFibGVUaW1lIHx8IHRpbWVNb2RlKSAmJlxuICAgICAgICAgICAgIXVzZXJDb25maWcuYWx0Rm9ybWF0KSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdEFsdEZvcm1hdCA9IGZsYXRwaWNrci5kZWZhdWx0Q29uZmlnLmFsdEZvcm1hdCB8fCBkZWZhdWx0T3B0aW9ucy5hbHRGb3JtYXQ7XG4gICAgICAgICAgICBmb3JtYXRzLmFsdEZvcm1hdCA9XG4gICAgICAgICAgICAgICAgdXNlckNvbmZpZy5ub0NhbGVuZGFyIHx8IHRpbWVNb2RlXG4gICAgICAgICAgICAgICAgICAgID8gXCJoOmlcIiArICh1c2VyQ29uZmlnLmVuYWJsZVNlY29uZHMgPyBcIjpTIEtcIiA6IFwiIEtcIilcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0QWx0Rm9ybWF0ICsgKFwiIGg6aVwiICsgKHVzZXJDb25maWcuZW5hYmxlU2Vjb25kcyA/IFwiOlNcIiA6IFwiXCIpICsgXCIgS1wiKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5jb25maWcsIFwibWluRGF0ZVwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuY29uZmlnLl9taW5EYXRlOyB9LFxuICAgICAgICAgICAgc2V0OiBtaW5NYXhEYXRlU2V0dGVyKFwibWluXCIpLFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuY29uZmlnLCBcIm1heERhdGVcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLmNvbmZpZy5fbWF4RGF0ZTsgfSxcbiAgICAgICAgICAgIHNldDogbWluTWF4RGF0ZVNldHRlcihcIm1heFwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBtaW5NYXhUaW1lU2V0dGVyID0gZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHNlbGYuY29uZmlnW3R5cGUgPT09IFwibWluXCIgPyBcIl9taW5UaW1lXCIgOiBcIl9tYXhUaW1lXCJdID0gc2VsZi5wYXJzZURhdGUodmFsLCBcIkg6aTpTXCIpO1xuICAgICAgICB9OyB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5jb25maWcsIFwibWluVGltZVwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuY29uZmlnLl9taW5UaW1lOyB9LFxuICAgICAgICAgICAgc2V0OiBtaW5NYXhUaW1lU2V0dGVyKFwibWluXCIpLFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuY29uZmlnLCBcIm1heFRpbWVcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLmNvbmZpZy5fbWF4VGltZTsgfSxcbiAgICAgICAgICAgIHNldDogbWluTWF4VGltZVNldHRlcihcIm1heFwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh1c2VyQ29uZmlnLm1vZGUgPT09IFwidGltZVwiKSB7XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5ub0NhbGVuZGFyID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLmVuYWJsZVRpbWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24oc2VsZi5jb25maWcsIGZvcm1hdHMsIHVzZXJDb25maWcpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvb2xPcHRzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgc2VsZi5jb25maWdbYm9vbE9wdHNbaV1dID1cbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZ1tib29sT3B0c1tpXV0gPT09IHRydWUgfHxcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWdbYm9vbE9wdHNbaV1dID09PSBcInRydWVcIjtcbiAgICAgICAgSE9PS1MuZmlsdGVyKGZ1bmN0aW9uIChob29rKSB7IHJldHVybiBzZWxmLmNvbmZpZ1tob29rXSAhPT0gdW5kZWZpbmVkOyB9KS5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gICAgICAgICAgICBzZWxmLmNvbmZpZ1tob29rXSA9IGFycmF5aWZ5KHNlbGYuY29uZmlnW2hvb2tdIHx8IFtdKS5tYXAoYmluZFRvSW5zdGFuY2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5pc01vYmlsZSA9XG4gICAgICAgICAgICAhc2VsZi5jb25maWcuZGlzYWJsZU1vYmlsZSAmJlxuICAgICAgICAgICAgICAgICFzZWxmLmNvbmZpZy5pbmxpbmUgJiZcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5tb2RlID09PSBcInNpbmdsZVwiICYmXG4gICAgICAgICAgICAgICAgIXNlbGYuY29uZmlnLmRpc2FibGUubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgIXNlbGYuY29uZmlnLmVuYWJsZSAmJlxuICAgICAgICAgICAgICAgICFzZWxmLmNvbmZpZy53ZWVrTnVtYmVycyAmJlxuICAgICAgICAgICAgICAgIC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLmNvbmZpZy5wbHVnaW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGx1Z2luQ29uZiA9IHNlbGYuY29uZmlnLnBsdWdpbnNbaV0oc2VsZikgfHwge307XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcGx1Z2luQ29uZikge1xuICAgICAgICAgICAgICAgIGlmIChIT09LUy5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZ1trZXldID0gYXJyYXlpZnkocGx1Z2luQ29uZltrZXldKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChiaW5kVG9JbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoc2VsZi5jb25maWdba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB1c2VyQ29uZmlnW2tleV0gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnW2tleV0gPSBwbHVnaW5Db25mW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1c2VyQ29uZmlnLmFsdElucHV0Q2xhc3MpIHtcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLmFsdElucHV0Q2xhc3MgPVxuICAgICAgICAgICAgICAgIGdldElucHV0RWxlbSgpLmNsYXNzTmFtZSArIFwiIFwiICsgc2VsZi5jb25maWcuYWx0SW5wdXRDbGFzcztcbiAgICAgICAgfVxuICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvblBhcnNlQ29uZmlnXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRJbnB1dEVsZW0oKSB7XG4gICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy53cmFwXG4gICAgICAgICAgICA/IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWlucHV0XVwiKVxuICAgICAgICAgICAgOiBlbGVtZW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXR1cExvY2FsZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmNvbmZpZy5sb2NhbGUgIT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIHR5cGVvZiBmbGF0cGlja3IubDEwbnNbc2VsZi5jb25maWcubG9jYWxlXSA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLmVycm9ySGFuZGxlcihuZXcgRXJyb3IoXCJmbGF0cGlja3I6IGludmFsaWQgbG9jYWxlIFwiICsgc2VsZi5jb25maWcubG9jYWxlKSk7XG4gICAgICAgIHNlbGYubDEwbiA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBmbGF0cGlja3IubDEwbnMuZGVmYXVsdCksICh0eXBlb2Ygc2VsZi5jb25maWcubG9jYWxlID09PSBcIm9iamVjdFwiXG4gICAgICAgICAgICA/IHNlbGYuY29uZmlnLmxvY2FsZVxuICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5sb2NhbGUgIT09IFwiZGVmYXVsdFwiXG4gICAgICAgICAgICAgICAgPyBmbGF0cGlja3IubDEwbnNbc2VsZi5jb25maWcubG9jYWxlXVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkKSk7XG4gICAgICAgIHRva2VuUmVnZXguRCA9IFwiKFwiICsgc2VsZi5sMTBuLndlZWtkYXlzLnNob3J0aGFuZC5qb2luKFwifFwiKSArIFwiKVwiO1xuICAgICAgICB0b2tlblJlZ2V4LmwgPSBcIihcIiArIHNlbGYubDEwbi53ZWVrZGF5cy5sb25naGFuZC5qb2luKFwifFwiKSArIFwiKVwiO1xuICAgICAgICB0b2tlblJlZ2V4Lk0gPSBcIihcIiArIHNlbGYubDEwbi5tb250aHMuc2hvcnRoYW5kLmpvaW4oXCJ8XCIpICsgXCIpXCI7XG4gICAgICAgIHRva2VuUmVnZXguRiA9IFwiKFwiICsgc2VsZi5sMTBuLm1vbnRocy5sb25naGFuZC5qb2luKFwifFwiKSArIFwiKVwiO1xuICAgICAgICB0b2tlblJlZ2V4LksgPSBcIihcIiArIHNlbGYubDEwbi5hbVBNWzBdICsgXCJ8XCIgKyBzZWxmLmwxMG4uYW1QTVsxXSArIFwifFwiICsgc2VsZi5sMTBuLmFtUE1bMF0udG9Mb3dlckNhc2UoKSArIFwifFwiICsgc2VsZi5sMTBuLmFtUE1bMV0udG9Mb3dlckNhc2UoKSArIFwiKVwiO1xuICAgICAgICB2YXIgdXNlckNvbmZpZyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBpbnN0YW5jZUNvbmZpZyksIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZWxlbWVudC5kYXRhc2V0IHx8IHt9KSkpO1xuICAgICAgICBpZiAodXNlckNvbmZpZy50aW1lXzI0aHIgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgZmxhdHBpY2tyLmRlZmF1bHRDb25maWcudGltZV8yNGhyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLnRpbWVfMjRociA9IHNlbGYubDEwbi50aW1lXzI0aHI7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5mb3JtYXREYXRlID0gY3JlYXRlRGF0ZUZvcm1hdHRlcihzZWxmKTtcbiAgICAgICAgc2VsZi5wYXJzZURhdGUgPSBjcmVhdGVEYXRlUGFyc2VyKHsgY29uZmlnOiBzZWxmLmNvbmZpZywgbDEwbjogc2VsZi5sMTBuIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb3NpdGlvbkNhbGVuZGFyKGN1c3RvbVBvc2l0aW9uRWxlbWVudCkge1xuICAgICAgICBpZiAodHlwZW9mIHNlbGYuY29uZmlnLnBvc2l0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIHNlbGYuY29uZmlnLnBvc2l0aW9uKHNlbGYsIGN1c3RvbVBvc2l0aW9uRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuY2FsZW5kYXJDb250YWluZXIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdHJpZ2dlckV2ZW50KFwib25QcmVDYWxlbmRhclBvc2l0aW9uXCIpO1xuICAgICAgICB2YXIgcG9zaXRpb25FbGVtZW50ID0gY3VzdG9tUG9zaXRpb25FbGVtZW50IHx8IHNlbGYuX3Bvc2l0aW9uRWxlbWVudDtcbiAgICAgICAgdmFyIGNhbGVuZGFySGVpZ2h0ID0gQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2hpbGRyZW4sIChmdW5jdGlvbiAoYWNjLCBjaGlsZCkgeyByZXR1cm4gYWNjICsgY2hpbGQub2Zmc2V0SGVpZ2h0OyB9KSwgMCksIGNhbGVuZGFyV2lkdGggPSBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLm9mZnNldFdpZHRoLCBjb25maWdQb3MgPSBzZWxmLmNvbmZpZy5wb3NpdGlvbi5zcGxpdChcIiBcIiksIGNvbmZpZ1Bvc1ZlcnRpY2FsID0gY29uZmlnUG9zWzBdLCBjb25maWdQb3NIb3Jpem9udGFsID0gY29uZmlnUG9zLmxlbmd0aCA+IDEgPyBjb25maWdQb3NbMV0gOiBudWxsLCBpbnB1dEJvdW5kcyA9IHBvc2l0aW9uRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgZGlzdGFuY2VGcm9tQm90dG9tID0gd2luZG93LmlubmVySGVpZ2h0IC0gaW5wdXRCb3VuZHMuYm90dG9tLCBzaG93T25Ub3AgPSBjb25maWdQb3NWZXJ0aWNhbCA9PT0gXCJhYm92ZVwiIHx8XG4gICAgICAgICAgICAoY29uZmlnUG9zVmVydGljYWwgIT09IFwiYmVsb3dcIiAmJlxuICAgICAgICAgICAgICAgIGRpc3RhbmNlRnJvbUJvdHRvbSA8IGNhbGVuZGFySGVpZ2h0ICYmXG4gICAgICAgICAgICAgICAgaW5wdXRCb3VuZHMudG9wID4gY2FsZW5kYXJIZWlnaHQpO1xuICAgICAgICB2YXIgdG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0ICtcbiAgICAgICAgICAgIGlucHV0Qm91bmRzLnRvcCArXG4gICAgICAgICAgICAoIXNob3dPblRvcCA/IHBvc2l0aW9uRWxlbWVudC5vZmZzZXRIZWlnaHQgKyAyIDogLWNhbGVuZGFySGVpZ2h0IC0gMik7XG4gICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwiYXJyb3dUb3BcIiwgIXNob3dPblRvcCk7XG4gICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwiYXJyb3dCb3R0b21cIiwgc2hvd09uVG9wKTtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmlubGluZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGxlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgKyBpbnB1dEJvdW5kcy5sZWZ0O1xuICAgICAgICB2YXIgaXNDZW50ZXIgPSBmYWxzZTtcbiAgICAgICAgdmFyIGlzUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGNvbmZpZ1Bvc0hvcml6b250YWwgPT09IFwiY2VudGVyXCIpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gKGNhbGVuZGFyV2lkdGggLSBpbnB1dEJvdW5kcy53aWR0aCkgLyAyO1xuICAgICAgICAgICAgaXNDZW50ZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZ1Bvc0hvcml6b250YWwgPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgbGVmdCAtPSBjYWxlbmRhcldpZHRoIC0gaW5wdXRCb3VuZHMud2lkdGg7XG4gICAgICAgICAgICBpc1JpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcImFycm93TGVmdFwiLCAhaXNDZW50ZXIgJiYgIWlzUmlnaHQpO1xuICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcImFycm93Q2VudGVyXCIsIGlzQ2VudGVyKTtcbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJhcnJvd1JpZ2h0XCIsIGlzUmlnaHQpO1xuICAgICAgICB2YXIgcmlnaHQgPSB3aW5kb3cuZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAtXG4gICAgICAgICAgICAod2luZG93LnBhZ2VYT2Zmc2V0ICsgaW5wdXRCb3VuZHMucmlnaHQpO1xuICAgICAgICB2YXIgcmlnaHRNb3N0ID0gbGVmdCArIGNhbGVuZGFyV2lkdGggPiB3aW5kb3cuZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aDtcbiAgICAgICAgdmFyIGNlbnRlck1vc3QgPSByaWdodCArIGNhbGVuZGFyV2lkdGggPiB3aW5kb3cuZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aDtcbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJyaWdodE1vc3RcIiwgcmlnaHRNb3N0KTtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLnN0YXRpYylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS50b3AgPSB0b3AgKyBcInB4XCI7XG4gICAgICAgIGlmICghcmlnaHRNb3N0KSB7XG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgXCJweFwiO1xuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS5yaWdodCA9IFwiYXV0b1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFjZW50ZXJNb3N0KSB7XG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBcImF1dG9cIjtcbiAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUucmlnaHQgPSByaWdodCArIFwicHhcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkb2MgPSBnZXREb2N1bWVudFN0eWxlU2hlZXQoKTtcbiAgICAgICAgICAgIGlmIChkb2MgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgYm9keVdpZHRoID0gd2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICB2YXIgY2VudGVyTGVmdCA9IE1hdGgubWF4KDAsIGJvZHlXaWR0aCAvIDIgLSBjYWxlbmRhcldpZHRoIC8gMik7XG4gICAgICAgICAgICB2YXIgY2VudGVyQmVmb3JlID0gXCIuZmxhdHBpY2tyLWNhbGVuZGFyLmNlbnRlck1vc3Q6YmVmb3JlXCI7XG4gICAgICAgICAgICB2YXIgY2VudGVyQWZ0ZXIgPSBcIi5mbGF0cGlja3ItY2FsZW5kYXIuY2VudGVyTW9zdDphZnRlclwiO1xuICAgICAgICAgICAgdmFyIGNlbnRlckluZGV4ID0gZG9jLmNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjZW50ZXJTdHlsZSA9IFwie2xlZnQ6XCIgKyBpbnB1dEJvdW5kcy5sZWZ0ICsgXCJweDtyaWdodDphdXRvO31cIjtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwicmlnaHRNb3N0XCIsIGZhbHNlKTtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwiY2VudGVyTW9zdFwiLCB0cnVlKTtcbiAgICAgICAgICAgIGRvYy5pbnNlcnRSdWxlKGNlbnRlckJlZm9yZSArIFwiLFwiICsgY2VudGVyQWZ0ZXIgKyBjZW50ZXJTdHlsZSwgY2VudGVySW5kZXgpO1xuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gY2VudGVyTGVmdCArIFwicHhcIjtcbiAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREb2N1bWVudFN0eWxlU2hlZXQoKSB7XG4gICAgICAgIHZhciBlZGl0YWJsZVNoZWV0ID0gbnVsbDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2N1bWVudC5zdHlsZVNoZWV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNoZWV0ID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbaV07XG4gICAgICAgICAgICBpZiAoIXNoZWV0LmNzc1J1bGVzKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzaGVldC5jc3NSdWxlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVkaXRhYmxlU2hlZXQgPSBzaGVldDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlZGl0YWJsZVNoZWV0ICE9IG51bGwgPyBlZGl0YWJsZVNoZWV0IDogY3JlYXRlU3R5bGVTaGVldCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVTdHlsZVNoZWV0KCkge1xuICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgICAgICByZXR1cm4gc3R5bGUuc2hlZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlZHJhdygpIHtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm5vQ2FsZW5kYXIgfHwgc2VsZi5pc01vYmlsZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYnVpbGRNb250aFN3aXRjaCgpO1xuICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uQ3VycmVudE1vbnRoKCk7XG4gICAgICAgIGJ1aWxkRGF5cygpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmb2N1c0FuZENsb3NlKCkge1xuICAgICAgICBzZWxmLl9pbnB1dC5mb2N1cygpO1xuICAgICAgICBpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT09IC0xIHx8XG4gICAgICAgICAgICBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHNlbGYuY2xvc2UsIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNlbGVjdERhdGUoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHZhciBpc1NlbGVjdGFibGUgPSBmdW5jdGlvbiAoZGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gZGF5LmNsYXNzTGlzdCAmJlxuICAgICAgICAgICAgICAgIGRheS5jbGFzc0xpc3QuY29udGFpbnMoXCJmbGF0cGlja3ItZGF5XCIpICYmXG4gICAgICAgICAgICAgICAgIWRheS5jbGFzc0xpc3QuY29udGFpbnMoXCJmbGF0cGlja3ItZGlzYWJsZWRcIikgJiZcbiAgICAgICAgICAgICAgICAhZGF5LmNsYXNzTGlzdC5jb250YWlucyhcIm5vdEFsbG93ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB0ID0gZmluZFBhcmVudChnZXRFdmVudFRhcmdldChlKSwgaXNTZWxlY3RhYmxlKTtcbiAgICAgICAgaWYgKHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHRhcmdldCA9IHQ7XG4gICAgICAgIHZhciBzZWxlY3RlZERhdGUgPSAoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogPSBuZXcgRGF0ZSh0YXJnZXQuZGF0ZU9iai5nZXRUaW1lKCkpKTtcbiAgICAgICAgdmFyIHNob3VsZENoYW5nZU1vbnRoID0gKHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpIDwgc2VsZi5jdXJyZW50TW9udGggfHxcbiAgICAgICAgICAgIHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpID5cbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRNb250aCArIHNlbGYuY29uZmlnLnNob3dNb250aHMgLSAxKSAmJlxuICAgICAgICAgICAgc2VsZi5jb25maWcubW9kZSAhPT0gXCJyYW5nZVwiO1xuICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZUVsZW0gPSB0YXJnZXQ7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInNpbmdsZVwiKVxuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzID0gW3NlbGVjdGVkRGF0ZV07XG4gICAgICAgIGVsc2UgaWYgKHNlbGYuY29uZmlnLm1vZGUgPT09IFwibXVsdGlwbGVcIikge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSW5kZXggPSBpc0RhdGVTZWxlY3RlZChzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXgpXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLnNwbGljZShwYXJzZUludChzZWxlY3RlZEluZGV4KSwgMSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLnB1c2goc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jbGVhcihmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogPSBzZWxlY3RlZERhdGU7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMucHVzaChzZWxlY3RlZERhdGUpO1xuICAgICAgICAgICAgaWYgKGNvbXBhcmVEYXRlcyhzZWxlY3RlZERhdGUsIHNlbGYuc2VsZWN0ZWREYXRlc1swXSwgdHJ1ZSkgIT09IDApXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuZ2V0VGltZSgpIC0gYi5nZXRUaW1lKCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHNldEhvdXJzRnJvbUlucHV0cygpO1xuICAgICAgICBpZiAoc2hvdWxkQ2hhbmdlTW9udGgpIHtcbiAgICAgICAgICAgIHZhciBpc05ld1llYXIgPSBzZWxmLmN1cnJlbnRZZWFyICE9PSBzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFllYXIgPSBzZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudE1vbnRoID0gc2VsZWN0ZWREYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICBpZiAoaXNOZXdZZWFyKSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25ZZWFyQ2hhbmdlXCIpO1xuICAgICAgICAgICAgICAgIGJ1aWxkTW9udGhTd2l0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uTW9udGhDaGFuZ2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlTmF2aWdhdGlvbkN1cnJlbnRNb250aCgpO1xuICAgICAgICBidWlsZERheXMoKTtcbiAgICAgICAgdXBkYXRlVmFsdWUoKTtcbiAgICAgICAgaWYgKCFzaG91bGRDaGFuZ2VNb250aCAmJlxuICAgICAgICAgICAgc2VsZi5jb25maWcubW9kZSAhPT0gXCJyYW5nZVwiICYmXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5zaG93TW9udGhzID09PSAxKVxuICAgICAgICAgICAgZm9jdXNPbkRheUVsZW0odGFyZ2V0KTtcbiAgICAgICAgZWxzZSBpZiAoc2VsZi5zZWxlY3RlZERhdGVFbGVtICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHNlbGYuaG91ckVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVFbGVtICYmIHNlbGYuc2VsZWN0ZWREYXRlRWxlbS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmhvdXJFbGVtZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZWxmLmhvdXJFbGVtZW50ICE9PSB1bmRlZmluZWQgJiYgc2VsZi5ob3VyRWxlbWVudC5mb2N1cygpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcuY2xvc2VPblNlbGVjdCkge1xuICAgICAgICAgICAgdmFyIHNpbmdsZSA9IHNlbGYuY29uZmlnLm1vZGUgPT09IFwic2luZ2xlXCIgJiYgIXNlbGYuY29uZmlnLmVuYWJsZVRpbWU7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIgJiZcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09PSAyICYmXG4gICAgICAgICAgICAgICAgIXNlbGYuY29uZmlnLmVuYWJsZVRpbWU7XG4gICAgICAgICAgICBpZiAoc2luZ2xlIHx8IHJhbmdlKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNBbmRDbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyaWdnZXJDaGFuZ2UoKTtcbiAgICB9XG4gICAgdmFyIENBTExCQUNLUyA9IHtcbiAgICAgICAgbG9jYWxlOiBbc2V0dXBMb2NhbGUsIHVwZGF0ZVdlZWtkYXlzXSxcbiAgICAgICAgc2hvd01vbnRoczogW2J1aWxkTW9udGhzLCBzZXRDYWxlbmRhcldpZHRoLCBidWlsZFdlZWtkYXlzXSxcbiAgICAgICAgbWluRGF0ZTogW2p1bXBUb0RhdGVdLFxuICAgICAgICBtYXhEYXRlOiBbanVtcFRvRGF0ZV0sXG4gICAgICAgIHBvc2l0aW9uRWxlbWVudDogW3VwZGF0ZVBvc2l0aW9uRWxlbWVudF0sXG4gICAgICAgIGNsaWNrT3BlbnM6IFtcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuY2xpY2tPcGVucyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBiaW5kKHNlbGYuX2lucHV0LCBcImZvY3VzXCIsIHNlbGYub3Blbik7XG4gICAgICAgICAgICAgICAgICAgIGJpbmQoc2VsZi5faW5wdXQsIFwiY2xpY2tcIiwgc2VsZi5vcGVuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2lucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBzZWxmLm9wZW4pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZi5vcGVuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH07XG4gICAgZnVuY3Rpb24gc2V0KG9wdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG9wdGlvbiAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0aW9uID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHNlbGYuY29uZmlnLCBvcHRpb24pO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChDQUxMQkFDS1Nba2V5XSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBDQUxMQkFDS1Nba2V5XS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4KCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5jb25maWdbb3B0aW9uXSA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKENBTExCQUNLU1tvcHRpb25dICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgQ0FMTEJBQ0tTW29wdGlvbl0uZm9yRWFjaChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCgpOyB9KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKEhPT0tTLmluZGV4T2Yob3B0aW9uKSA+IC0xKVxuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnW29wdGlvbl0gPSBhcnJheWlmeSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICAgICAgdXBkYXRlVmFsdWUodHJ1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFNlbGVjdGVkRGF0ZShpbnB1dERhdGUsIGZvcm1hdCkge1xuICAgICAgICB2YXIgZGF0ZXMgPSBbXTtcbiAgICAgICAgaWYgKGlucHV0RGF0ZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgZGF0ZXMgPSBpbnB1dERhdGUubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiBzZWxmLnBhcnNlRGF0ZShkLCBmb3JtYXQpOyB9KTtcbiAgICAgICAgZWxzZSBpZiAoaW5wdXREYXRlIGluc3RhbmNlb2YgRGF0ZSB8fCB0eXBlb2YgaW5wdXREYXRlID09PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgZGF0ZXMgPSBbc2VsZi5wYXJzZURhdGUoaW5wdXREYXRlLCBmb3JtYXQpXTtcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGlucHV0RGF0ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgc3dpdGNoIChzZWxmLmNvbmZpZy5tb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNpbmdsZVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0aW1lXCI6XG4gICAgICAgICAgICAgICAgICAgIGRhdGVzID0gW3NlbGYucGFyc2VEYXRlKGlucHV0RGF0ZSwgZm9ybWF0KV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtdWx0aXBsZVwiOlxuICAgICAgICAgICAgICAgICAgICBkYXRlcyA9IGlucHV0RGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KHNlbGYuY29uZmlnLmNvbmp1bmN0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gc2VsZi5wYXJzZURhdGUoZGF0ZSwgZm9ybWF0KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyYW5nZVwiOlxuICAgICAgICAgICAgICAgICAgICBkYXRlcyA9IGlucHV0RGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KHNlbGYubDEwbi5yYW5nZVNlcGFyYXRvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHNlbGYucGFyc2VEYXRlKGRhdGUsIGZvcm1hdCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5lcnJvckhhbmRsZXIobmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIHN1cHBsaWVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGlucHV0RGF0ZSkpKTtcbiAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzID0gKHNlbGYuY29uZmlnLmFsbG93SW52YWxpZFByZWxvYWRcbiAgICAgICAgICAgID8gZGF0ZXNcbiAgICAgICAgICAgIDogZGF0ZXMuZmlsdGVyKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkIGluc3RhbmNlb2YgRGF0ZSAmJiBpc0VuYWJsZWQoZCwgZmFsc2UpOyB9KSk7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIpXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5nZXRUaW1lKCkgLSBiLmdldFRpbWUoKTsgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldERhdGUoZGF0ZSwgdHJpZ2dlckNoYW5nZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlID09PSB2b2lkIDApIHsgdHJpZ2dlckNoYW5nZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChmb3JtYXQgPT09IHZvaWQgMCkgeyBmb3JtYXQgPSBzZWxmLmNvbmZpZy5kYXRlRm9ybWF0OyB9XG4gICAgICAgIGlmICgoZGF0ZSAhPT0gMCAmJiAhZGF0ZSkgfHwgKGRhdGUgaW5zdGFuY2VvZiBBcnJheSAmJiBkYXRlLmxlbmd0aCA9PT0gMCkpXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5jbGVhcih0cmlnZ2VyQ2hhbmdlKTtcbiAgICAgICAgc2V0U2VsZWN0ZWREYXRlKGRhdGUsIGZvcm1hdCk7XG4gICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqID1cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlc1tzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoIC0gMV07XG4gICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgIGp1bXBUb0RhdGUodW5kZWZpbmVkLCB0cmlnZ2VyQ2hhbmdlKTtcbiAgICAgICAgc2V0SG91cnNGcm9tRGF0ZSgpO1xuICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi5jbGVhcihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlVmFsdWUodHJpZ2dlckNoYW5nZSk7XG4gICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlKVxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25DaGFuZ2VcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlRGF0ZVJ1bGVzKGFycikge1xuICAgICAgICByZXR1cm4gYXJyXG4gICAgICAgICAgICAuc2xpY2UoKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBydWxlID09PSBcInN0cmluZ1wiIHx8XG4gICAgICAgICAgICAgICAgdHlwZW9mIHJ1bGUgPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgICAgICBydWxlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnBhcnNlRGF0ZShydWxlLCB1bmRlZmluZWQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocnVsZSAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBydWxlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgcnVsZS5mcm9tICYmXG4gICAgICAgICAgICAgICAgcnVsZS50bylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmcm9tOiBzZWxmLnBhcnNlRGF0ZShydWxlLmZyb20sIHVuZGVmaW5lZCksXG4gICAgICAgICAgICAgICAgICAgIHRvOiBzZWxmLnBhcnNlRGF0ZShydWxlLnRvLCB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gcnVsZTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXR1cERhdGVzKCkge1xuICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMgPSBbXTtcbiAgICAgICAgc2VsZi5ub3cgPSBzZWxmLnBhcnNlRGF0ZShzZWxmLmNvbmZpZy5ub3cpIHx8IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBwcmVsb2FkZWREYXRlID0gc2VsZi5jb25maWcuZGVmYXVsdERhdGUgfHxcbiAgICAgICAgICAgICgoc2VsZi5pbnB1dC5ub2RlTmFtZSA9PT0gXCJJTlBVVFwiIHx8XG4gICAgICAgICAgICAgICAgc2VsZi5pbnB1dC5ub2RlTmFtZSA9PT0gXCJURVhUQVJFQVwiKSAmJlxuICAgICAgICAgICAgICAgIHNlbGYuaW5wdXQucGxhY2Vob2xkZXIgJiZcbiAgICAgICAgICAgICAgICBzZWxmLmlucHV0LnZhbHVlID09PSBzZWxmLmlucHV0LnBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgICAgPyBudWxsXG4gICAgICAgICAgICAgICAgOiBzZWxmLmlucHV0LnZhbHVlKTtcbiAgICAgICAgaWYgKHByZWxvYWRlZERhdGUpXG4gICAgICAgICAgICBzZXRTZWxlY3RlZERhdGUocHJlbG9hZGVkRGF0ZSwgc2VsZi5jb25maWcuZGF0ZUZvcm1hdCk7XG4gICAgICAgIHNlbGYuX2luaXRpYWxEYXRlID1cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyBzZWxmLnNlbGVjdGVkRGF0ZXNbMF1cbiAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLm1pbkRhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcubWluRGF0ZS5nZXRUaW1lKCkgPiBzZWxmLm5vdy5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5taW5EYXRlXG4gICAgICAgICAgICAgICAgICAgIDogc2VsZi5jb25maWcubWF4RGF0ZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcubWF4RGF0ZS5nZXRUaW1lKCkgPCBzZWxmLm5vdy5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcubWF4RGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzZWxmLm5vdztcbiAgICAgICAgc2VsZi5jdXJyZW50WWVhciA9IHNlbGYuX2luaXRpYWxEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHNlbGYuY3VycmVudE1vbnRoID0gc2VsZi5faW5pdGlhbERhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogPSBzZWxmLnNlbGVjdGVkRGF0ZXNbMF07XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5taW5UaW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5taW5UaW1lID0gc2VsZi5wYXJzZURhdGUoc2VsZi5jb25maWcubWluVGltZSwgXCJIOmlcIik7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tYXhUaW1lICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5tYXhUaW1lID0gc2VsZi5wYXJzZURhdGUoc2VsZi5jb25maWcubWF4VGltZSwgXCJIOmlcIik7XG4gICAgICAgIHNlbGYubWluRGF0ZUhhc1RpbWUgPVxuICAgICAgICAgICAgISFzZWxmLmNvbmZpZy5taW5EYXRlICYmXG4gICAgICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0SG91cnMoKSA+IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcubWluRGF0ZS5nZXRNaW51dGVzKCkgPiAwIHx8XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0U2Vjb25kcygpID4gMCk7XG4gICAgICAgIHNlbGYubWF4RGF0ZUhhc1RpbWUgPVxuICAgICAgICAgICAgISFzZWxmLmNvbmZpZy5tYXhEYXRlICYmXG4gICAgICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1heERhdGUuZ2V0SG91cnMoKSA+IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcubWF4RGF0ZS5nZXRNaW51dGVzKCkgPiAwIHx8XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1heERhdGUuZ2V0U2Vjb25kcygpID4gMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldHVwSW5wdXRzKCkge1xuICAgICAgICBzZWxmLmlucHV0ID0gZ2V0SW5wdXRFbGVtKCk7XG4gICAgICAgIGlmICghc2VsZi5pbnB1dCkge1xuICAgICAgICAgICAgc2VsZi5jb25maWcuZXJyb3JIYW5kbGVyKG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgZWxlbWVudCBzcGVjaWZpZWRcIikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5wdXQuX3R5cGUgPSBzZWxmLmlucHV0LnR5cGU7XG4gICAgICAgIHNlbGYuaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBzZWxmLmlucHV0LmNsYXNzTGlzdC5hZGQoXCJmbGF0cGlja3ItaW5wdXRcIik7XG4gICAgICAgIHNlbGYuX2lucHV0ID0gc2VsZi5pbnB1dDtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmFsdElucHV0KSB7XG4gICAgICAgICAgICBzZWxmLmFsdElucHV0ID0gY3JlYXRlRWxlbWVudChzZWxmLmlucHV0Lm5vZGVOYW1lLCBzZWxmLmNvbmZpZy5hbHRJbnB1dENsYXNzKTtcbiAgICAgICAgICAgIHNlbGYuX2lucHV0ID0gc2VsZi5hbHRJbnB1dDtcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQucGxhY2Vob2xkZXIgPSBzZWxmLmlucHV0LnBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dC5kaXNhYmxlZCA9IHNlbGYuaW5wdXQuZGlzYWJsZWQ7XG4gICAgICAgICAgICBzZWxmLmFsdElucHV0LnJlcXVpcmVkID0gc2VsZi5pbnB1dC5yZXF1aXJlZDtcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQudGFiSW5kZXggPSBzZWxmLmlucHV0LnRhYkluZGV4O1xuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgICAgICBzZWxmLmlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgICBpZiAoIXNlbGYuY29uZmlnLnN0YXRpYyAmJiBzZWxmLmlucHV0LnBhcmVudE5vZGUpXG4gICAgICAgICAgICAgICAgc2VsZi5pbnB1dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzZWxmLmFsdElucHV0LCBzZWxmLmlucHV0Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlbGYuY29uZmlnLmFsbG93SW5wdXQpXG4gICAgICAgICAgICBzZWxmLl9pbnB1dC5zZXRBdHRyaWJ1dGUoXCJyZWFkb25seVwiLCBcInJlYWRvbmx5XCIpO1xuICAgICAgICB1cGRhdGVQb3NpdGlvbkVsZW1lbnQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlUG9zaXRpb25FbGVtZW50KCkge1xuICAgICAgICBzZWxmLl9wb3NpdGlvbkVsZW1lbnQgPSBzZWxmLmNvbmZpZy5wb3NpdGlvbkVsZW1lbnQgfHwgc2VsZi5faW5wdXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldHVwTW9iaWxlKCkge1xuICAgICAgICB2YXIgaW5wdXRUeXBlID0gc2VsZi5jb25maWcuZW5hYmxlVGltZVxuICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5ub0NhbGVuZGFyXG4gICAgICAgICAgICAgICAgPyBcInRpbWVcIlxuICAgICAgICAgICAgICAgIDogXCJkYXRldGltZS1sb2NhbFwiXG4gICAgICAgICAgICA6IFwiZGF0ZVwiO1xuICAgICAgICBzZWxmLm1vYmlsZUlucHV0ID0gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHNlbGYuaW5wdXQuY2xhc3NOYW1lICsgXCIgZmxhdHBpY2tyLW1vYmlsZVwiKTtcbiAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC50YWJJbmRleCA9IDE7XG4gICAgICAgIHNlbGYubW9iaWxlSW5wdXQudHlwZSA9IGlucHV0VHlwZTtcbiAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC5kaXNhYmxlZCA9IHNlbGYuaW5wdXQuZGlzYWJsZWQ7XG4gICAgICAgIHNlbGYubW9iaWxlSW5wdXQucmVxdWlyZWQgPSBzZWxmLmlucHV0LnJlcXVpcmVkO1xuICAgICAgICBzZWxmLm1vYmlsZUlucHV0LnBsYWNlaG9sZGVyID0gc2VsZi5pbnB1dC5wbGFjZWhvbGRlcjtcbiAgICAgICAgc2VsZi5tb2JpbGVGb3JtYXRTdHIgPVxuICAgICAgICAgICAgaW5wdXRUeXBlID09PSBcImRhdGV0aW1lLWxvY2FsXCJcbiAgICAgICAgICAgICAgICA/IFwiWS1tLWRcXFxcVEg6aTpTXCJcbiAgICAgICAgICAgICAgICA6IGlucHV0VHlwZSA9PT0gXCJkYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgPyBcIlktbS1kXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcIkg6aTpTXCI7XG4gICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC5kZWZhdWx0VmFsdWUgPSBzZWxmLm1vYmlsZUlucHV0LnZhbHVlID0gc2VsZi5mb3JtYXREYXRlKHNlbGYuc2VsZWN0ZWREYXRlc1swXSwgc2VsZi5tb2JpbGVGb3JtYXRTdHIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5taW5EYXRlKVxuICAgICAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC5taW4gPSBzZWxmLmZvcm1hdERhdGUoc2VsZi5jb25maWcubWluRGF0ZSwgXCJZLW0tZFwiKTtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1heERhdGUpXG4gICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0Lm1heCA9IHNlbGYuZm9ybWF0RGF0ZShzZWxmLmNvbmZpZy5tYXhEYXRlLCBcIlktbS1kXCIpO1xuICAgICAgICBpZiAoc2VsZi5pbnB1dC5nZXRBdHRyaWJ1dGUoXCJzdGVwXCIpKVxuICAgICAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC5zdGVwID0gU3RyaW5nKHNlbGYuaW5wdXQuZ2V0QXR0cmlidXRlKFwic3RlcFwiKSk7XG4gICAgICAgIHNlbGYuaW5wdXQudHlwZSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIGlmIChzZWxmLmFsdElucHV0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZWxmLmFsdElucHV0LnR5cGUgPSBcImhpZGRlblwiO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHNlbGYuaW5wdXQucGFyZW50Tm9kZSlcbiAgICAgICAgICAgICAgICBzZWxmLmlucHV0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNlbGYubW9iaWxlSW5wdXQsIHNlbGYuaW5wdXQubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfYSkgeyB9XG4gICAgICAgIGJpbmQoc2VsZi5tb2JpbGVJbnB1dCwgXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShnZXRFdmVudFRhcmdldChlKS52YWx1ZSwgZmFsc2UsIHNlbGYubW9iaWxlRm9ybWF0U3RyKTtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uQ2hhbmdlXCIpO1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25DbG9zZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvZ2dsZShlKSB7XG4gICAgICAgIGlmIChzZWxmLmlzT3BlbiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNsb3NlKCk7XG4gICAgICAgIHNlbGYub3BlbihlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJpZ2dlckV2ZW50KGV2ZW50LCBkYXRhKSB7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgaG9va3MgPSBzZWxmLmNvbmZpZ1tldmVudF07XG4gICAgICAgIGlmIChob29rcyAhPT0gdW5kZWZpbmVkICYmIGhvb2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBob29rc1tpXSAmJiBpIDwgaG9va3MubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgaG9va3NbaV0oc2VsZi5zZWxlY3RlZERhdGVzLCBzZWxmLmlucHV0LnZhbHVlLCBzZWxmLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQgPT09IFwib25DaGFuZ2VcIikge1xuICAgICAgICAgICAgc2VsZi5pbnB1dC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KFwiY2hhbmdlXCIpKTtcbiAgICAgICAgICAgIHNlbGYuaW5wdXQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudChcImlucHV0XCIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVFdmVudChuYW1lKSB7XG4gICAgICAgIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudFwiKTtcbiAgICAgICAgZS5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0RhdGVTZWxlY3RlZChkYXRlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWREYXRlID0gc2VsZi5zZWxlY3RlZERhdGVzW2ldO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZSBpbnN0YW5jZW9mIERhdGUgJiZcbiAgICAgICAgICAgICAgICBjb21wYXJlRGF0ZXMoc2VsZWN0ZWREYXRlLCBkYXRlKSA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIiArIGk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0RhdGVJblJhbmdlKGRhdGUpIHtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1vZGUgIT09IFwicmFuZ2VcIiB8fCBzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoIDwgMilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIChjb21wYXJlRGF0ZXMoZGF0ZSwgc2VsZi5zZWxlY3RlZERhdGVzWzBdKSA+PSAwICYmXG4gICAgICAgICAgICBjb21wYXJlRGF0ZXMoZGF0ZSwgc2VsZi5zZWxlY3RlZERhdGVzWzFdKSA8PSAwKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlTmF2aWdhdGlvbkN1cnJlbnRNb250aCgpIHtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm5vQ2FsZW5kYXIgfHwgc2VsZi5pc01vYmlsZSB8fCAhc2VsZi5tb250aE5hdilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc2VsZi55ZWFyRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoeWVhckVsZW1lbnQsIGkpIHtcbiAgICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoc2VsZi5jdXJyZW50WWVhciwgc2VsZi5jdXJyZW50TW9udGgsIDEpO1xuICAgICAgICAgICAgZC5zZXRNb250aChzZWxmLmN1cnJlbnRNb250aCArIGkpO1xuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLnNob3dNb250aHMgPiAxIHx8XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcubW9udGhTZWxlY3RvclR5cGUgPT09IFwic3RhdGljXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1vbnRoRWxlbWVudHNbaV0udGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgICAgICAgICBtb250aFRvU3RyKGQuZ2V0TW9udGgoKSwgc2VsZi5jb25maWcuc2hvcnRoYW5kQ3VycmVudE1vbnRoLCBzZWxmLmwxMG4pICsgXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1vbnRoc0Ryb3Bkb3duQ29udGFpbmVyLnZhbHVlID0gZC5nZXRNb250aCgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5ZWFyRWxlbWVudC52YWx1ZSA9IGQuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5faGlkZVByZXZNb250aEFycm93ID1cbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1pbkRhdGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIChzZWxmLmN1cnJlbnRZZWFyID09PSBzZWxmLmNvbmZpZy5taW5EYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmN1cnJlbnRNb250aCA8PSBzZWxmLmNvbmZpZy5taW5EYXRlLmdldE1vbnRoKClcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLmN1cnJlbnRZZWFyIDwgc2VsZi5jb25maWcubWluRGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgc2VsZi5faGlkZU5leHRNb250aEFycm93ID1cbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1heERhdGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIChzZWxmLmN1cnJlbnRZZWFyID09PSBzZWxmLmNvbmZpZy5tYXhEYXRlLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmN1cnJlbnRNb250aCArIDEgPiBzZWxmLmNvbmZpZy5tYXhEYXRlLmdldE1vbnRoKClcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLmN1cnJlbnRZZWFyID4gc2VsZi5jb25maWcubWF4RGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVN0cihzcGVjaWZpY0Zvcm1hdCkge1xuICAgICAgICB2YXIgZm9ybWF0ID0gc3BlY2lmaWNGb3JtYXQgfHxcbiAgICAgICAgICAgIChzZWxmLmNvbmZpZy5hbHRJbnB1dCA/IHNlbGYuY29uZmlnLmFsdEZvcm1hdCA6IHNlbGYuY29uZmlnLmRhdGVGb3JtYXQpO1xuICAgICAgICByZXR1cm4gc2VsZi5zZWxlY3RlZERhdGVzXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChkT2JqKSB7IHJldHVybiBzZWxmLmZvcm1hdERhdGUoZE9iaiwgZm9ybWF0KTsgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGQsIGksIGFycikge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuY29uZmlnLm1vZGUgIT09IFwicmFuZ2VcIiB8fFxuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLmVuYWJsZVRpbWUgfHxcbiAgICAgICAgICAgICAgICBhcnIuaW5kZXhPZihkKSA9PT0gaTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKHNlbGYuY29uZmlnLm1vZGUgIT09IFwicmFuZ2VcIlxuICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5jb25qdW5jdGlvblxuICAgICAgICAgICAgOiBzZWxmLmwxMG4ucmFuZ2VTZXBhcmF0b3IpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVWYWx1ZSh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlID09PSB2b2lkIDApIHsgdHJpZ2dlckNoYW5nZSA9IHRydWU7IH1cbiAgICAgICAgaWYgKHNlbGYubW9iaWxlSW5wdXQgIT09IHVuZGVmaW5lZCAmJiBzZWxmLm1vYmlsZUZvcm1hdFN0cikge1xuICAgICAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC52YWx1ZSA9XG4gICAgICAgICAgICAgICAgc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA/IHNlbGYuZm9ybWF0RGF0ZShzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiwgc2VsZi5tb2JpbGVGb3JtYXRTdHIpXG4gICAgICAgICAgICAgICAgICAgIDogXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmlucHV0LnZhbHVlID0gZ2V0RGF0ZVN0cihzZWxmLmNvbmZpZy5kYXRlRm9ybWF0KTtcbiAgICAgICAgaWYgKHNlbGYuYWx0SW5wdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dC52YWx1ZSA9IGdldERhdGVTdHIoc2VsZi5jb25maWcuYWx0Rm9ybWF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSAhPT0gZmFsc2UpXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvblZhbHVlVXBkYXRlXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vbnRoTmF2Q2xpY2soZSkge1xuICAgICAgICB2YXIgZXZlbnRUYXJnZXQgPSBnZXRFdmVudFRhcmdldChlKTtcbiAgICAgICAgdmFyIGlzUHJldk1vbnRoID0gc2VsZi5wcmV2TW9udGhOYXYuY29udGFpbnMoZXZlbnRUYXJnZXQpO1xuICAgICAgICB2YXIgaXNOZXh0TW9udGggPSBzZWxmLm5leHRNb250aE5hdi5jb250YWlucyhldmVudFRhcmdldCk7XG4gICAgICAgIGlmIChpc1ByZXZNb250aCB8fCBpc05leHRNb250aCkge1xuICAgICAgICAgICAgY2hhbmdlTW9udGgoaXNQcmV2TW9udGggPyAtMSA6IDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGYueWVhckVsZW1lbnRzLmluZGV4T2YoZXZlbnRUYXJnZXQpID49IDApIHtcbiAgICAgICAgICAgIGV2ZW50VGFyZ2V0LnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFycm93VXBcIikpIHtcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlWWVhcihzZWxmLmN1cnJlbnRZZWFyICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXJyb3dEb3duXCIpKSB7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVllYXIoc2VsZi5jdXJyZW50WWVhciAtIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRpbWVXcmFwcGVyKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgaXNLZXlEb3duID0gZS50eXBlID09PSBcImtleWRvd25cIiwgZXZlbnRUYXJnZXQgPSBnZXRFdmVudFRhcmdldChlKSwgaW5wdXQgPSBldmVudFRhcmdldDtcbiAgICAgICAgaWYgKHNlbGYuYW1QTSAhPT0gdW5kZWZpbmVkICYmIGV2ZW50VGFyZ2V0ID09PSBzZWxmLmFtUE0pIHtcbiAgICAgICAgICAgIHNlbGYuYW1QTS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICAgICAgc2VsZi5sMTBuLmFtUE1baW50KHNlbGYuYW1QTS50ZXh0Q29udGVudCA9PT0gc2VsZi5sMTBuLmFtUE1bMF0pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWluID0gcGFyc2VGbG9hdChpbnB1dC5nZXRBdHRyaWJ1dGUoXCJtaW5cIikpLCBtYXggPSBwYXJzZUZsb2F0KGlucHV0LmdldEF0dHJpYnV0ZShcIm1heFwiKSksIHN0ZXAgPSBwYXJzZUZsb2F0KGlucHV0LmdldEF0dHJpYnV0ZShcInN0ZXBcIikpLCBjdXJWYWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlLCAxMCksIGRlbHRhID0gZS5kZWx0YSB8fFxuICAgICAgICAgICAgKGlzS2V5RG93biA/IChlLndoaWNoID09PSAzOCA/IDEgOiAtMSkgOiAwKTtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gY3VyVmFsdWUgKyBzdGVwICogZGVsdGE7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQudmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgaW5wdXQudmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIgaXNIb3VyRWxlbSA9IGlucHV0ID09PSBzZWxmLmhvdXJFbGVtZW50LCBpc01pbnV0ZUVsZW0gPSBpbnB1dCA9PT0gc2VsZi5taW51dGVFbGVtZW50O1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlIDwgbWluKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPVxuICAgICAgICAgICAgICAgICAgICBtYXggK1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgaW50KCFpc0hvdXJFbGVtKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW50KGlzSG91ckVsZW0pICYmIGludCghc2VsZi5hbVBNKSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzTWludXRlRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50TnVtSW5wdXQodW5kZWZpbmVkLCAtMSwgc2VsZi5ob3VyRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSA+IG1heCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPT09IHNlbGYuaG91ckVsZW1lbnQgPyBuZXdWYWx1ZSAtIG1heCAtIGludCghc2VsZi5hbVBNKSA6IG1pbjtcbiAgICAgICAgICAgICAgICBpZiAoaXNNaW51dGVFbGVtKVxuICAgICAgICAgICAgICAgICAgICBpbmNyZW1lbnROdW1JbnB1dCh1bmRlZmluZWQsIDEsIHNlbGYuaG91ckVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuYW1QTSAmJlxuICAgICAgICAgICAgICAgIGlzSG91ckVsZW0gJiZcbiAgICAgICAgICAgICAgICAoc3RlcCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICA/IG5ld1ZhbHVlICsgY3VyVmFsdWUgPT09IDIzXG4gICAgICAgICAgICAgICAgICAgIDogTWF0aC5hYnMobmV3VmFsdWUgLSBjdXJWYWx1ZSkgPiBzdGVwKSkge1xuICAgICAgICAgICAgICAgIHNlbGYuYW1QTS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubDEwbi5hbVBNW2ludChzZWxmLmFtUE0udGV4dENvbnRlbnQgPT09IHNlbGYubDEwbi5hbVBNWzBdKV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHBhZChuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCgpO1xuICAgIHJldHVybiBzZWxmO1xufVxuZnVuY3Rpb24gX2ZsYXRwaWNrcihub2RlTGlzdCwgY29uZmlnKSB7XG4gICAgdmFyIG5vZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAgIC5jYWxsKG5vZGVMaXN0KVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7IH0pO1xuICAgIHZhciBpbnN0YW5jZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBub2RlID0gbm9kZXNbaV07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZwLW9taXRcIikgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAobm9kZS5fZmxhdHBpY2tyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBub2RlLl9mbGF0cGlja3IuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIG5vZGUuX2ZsYXRwaWNrciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuX2ZsYXRwaWNrciA9IEZsYXRwaWNrckluc3RhbmNlKG5vZGUsIGNvbmZpZyB8fCB7fSk7XG4gICAgICAgICAgICBpbnN0YW5jZXMucHVzaChub2RlLl9mbGF0cGlja3IpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZXMubGVuZ3RoID09PSAxID8gaW5zdGFuY2VzWzBdIDogaW5zdGFuY2VzO1xufVxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBIVE1MQ29sbGVjdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBOb2RlTGlzdCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS5mbGF0cGlja3IgPSBOb2RlTGlzdC5wcm90b3R5cGUuZmxhdHBpY2tyID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gX2ZsYXRwaWNrcih0aGlzLCBjb25maWcpO1xuICAgIH07XG4gICAgSFRNTEVsZW1lbnQucHJvdG90eXBlLmZsYXRwaWNrciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIF9mbGF0cGlja3IoW3RoaXNdLCBjb25maWcpO1xuICAgIH07XG59XG52YXIgZmxhdHBpY2tyID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb25maWcpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBfZmxhdHBpY2tyKHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgY29uZmlnKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIHJldHVybiBfZmxhdHBpY2tyKFtzZWxlY3Rvcl0sIGNvbmZpZyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gX2ZsYXRwaWNrcihzZWxlY3RvciwgY29uZmlnKTtcbiAgICB9XG59O1xuZmxhdHBpY2tyLmRlZmF1bHRDb25maWcgPSB7fTtcbmZsYXRwaWNrci5sMTBucyA9IHtcbiAgICBlbjogX19hc3NpZ24oe30sIEVuZ2xpc2gpLFxuICAgIGRlZmF1bHQ6IF9fYXNzaWduKHt9LCBFbmdsaXNoKSxcbn07XG5mbGF0cGlja3IubG9jYWxpemUgPSBmdW5jdGlvbiAobDEwbikge1xuICAgIGZsYXRwaWNrci5sMTBucy5kZWZhdWx0ID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGZsYXRwaWNrci5sMTBucy5kZWZhdWx0KSwgbDEwbik7XG59O1xuZmxhdHBpY2tyLnNldERlZmF1bHRzID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGZsYXRwaWNrci5kZWZhdWx0Q29uZmlnID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGZsYXRwaWNrci5kZWZhdWx0Q29uZmlnKSwgY29uZmlnKTtcbn07XG5mbGF0cGlja3IucGFyc2VEYXRlID0gY3JlYXRlRGF0ZVBhcnNlcih7fSk7XG5mbGF0cGlja3IuZm9ybWF0RGF0ZSA9IGNyZWF0ZURhdGVGb3JtYXR0ZXIoe30pO1xuZmxhdHBpY2tyLmNvbXBhcmVEYXRlcyA9IGNvbXBhcmVEYXRlcztcbmlmICh0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBqUXVlcnkuZm4gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBqUXVlcnkuZm4uZmxhdHBpY2tyID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gX2ZsYXRwaWNrcih0aGlzLCBjb25maWcpO1xuICAgIH07XG59XG5EYXRlLnByb3RvdHlwZS5mcF9pbmNyID0gZnVuY3Rpb24gKGRheXMpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIHRoaXMuZ2V0RGF0ZSgpICsgKHR5cGVvZiBkYXlzID09PSBcInN0cmluZ1wiID8gcGFyc2VJbnQoZGF5cywgMTApIDogZGF5cykpO1xufTtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luZG93LmZsYXRwaWNrciA9IGZsYXRwaWNrcjtcbn1cbmV4cG9ydCBkZWZhdWx0IGZsYXRwaWNrcjtcbiIsImV4cG9ydCB2YXIgZW5nbGlzaCA9IHtcbiAgICB3ZWVrZGF5czoge1xuICAgICAgICBzaG9ydGhhbmQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICAgICAgbG9uZ2hhbmQ6IFtcbiAgICAgICAgICAgIFwiU3VuZGF5XCIsXG4gICAgICAgICAgICBcIk1vbmRheVwiLFxuICAgICAgICAgICAgXCJUdWVzZGF5XCIsXG4gICAgICAgICAgICBcIldlZG5lc2RheVwiLFxuICAgICAgICAgICAgXCJUaHVyc2RheVwiLFxuICAgICAgICAgICAgXCJGcmlkYXlcIixcbiAgICAgICAgICAgIFwiU2F0dXJkYXlcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIG1vbnRoczoge1xuICAgICAgICBzaG9ydGhhbmQ6IFtcbiAgICAgICAgICAgIFwiSmFuXCIsXG4gICAgICAgICAgICBcIkZlYlwiLFxuICAgICAgICAgICAgXCJNYXJcIixcbiAgICAgICAgICAgIFwiQXByXCIsXG4gICAgICAgICAgICBcIk1heVwiLFxuICAgICAgICAgICAgXCJKdW5cIixcbiAgICAgICAgICAgIFwiSnVsXCIsXG4gICAgICAgICAgICBcIkF1Z1wiLFxuICAgICAgICAgICAgXCJTZXBcIixcbiAgICAgICAgICAgIFwiT2N0XCIsXG4gICAgICAgICAgICBcIk5vdlwiLFxuICAgICAgICAgICAgXCJEZWNcIixcbiAgICAgICAgXSxcbiAgICAgICAgbG9uZ2hhbmQ6IFtcbiAgICAgICAgICAgIFwiSmFudWFyeVwiLFxuICAgICAgICAgICAgXCJGZWJydWFyeVwiLFxuICAgICAgICAgICAgXCJNYXJjaFwiLFxuICAgICAgICAgICAgXCJBcHJpbFwiLFxuICAgICAgICAgICAgXCJNYXlcIixcbiAgICAgICAgICAgIFwiSnVuZVwiLFxuICAgICAgICAgICAgXCJKdWx5XCIsXG4gICAgICAgICAgICBcIkF1Z3VzdFwiLFxuICAgICAgICAgICAgXCJTZXB0ZW1iZXJcIixcbiAgICAgICAgICAgIFwiT2N0b2JlclwiLFxuICAgICAgICAgICAgXCJOb3ZlbWJlclwiLFxuICAgICAgICAgICAgXCJEZWNlbWJlclwiLFxuICAgICAgICBdLFxuICAgIH0sXG4gICAgZGF5c0luTW9udGg6IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcbiAgICBmaXJzdERheU9mV2VlazogMCxcbiAgICBvcmRpbmFsOiBmdW5jdGlvbiAobnRoKSB7XG4gICAgICAgIHZhciBzID0gbnRoICUgMTAwO1xuICAgICAgICBpZiAocyA+IDMgJiYgcyA8IDIxKVxuICAgICAgICAgICAgcmV0dXJuIFwidGhcIjtcbiAgICAgICAgc3dpdGNoIChzICUgMTApIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdFwiO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5kXCI7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicmRcIjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidGhcIjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmFuZ2VTZXBhcmF0b3I6IFwiIHRvIFwiLFxuICAgIHdlZWtBYmJyZXZpYXRpb246IFwiV2tcIixcbiAgICBzY3JvbGxUaXRsZTogXCJTY3JvbGwgdG8gaW5jcmVtZW50XCIsXG4gICAgdG9nZ2xlVGl0bGU6IFwiQ2xpY2sgdG8gdG9nZ2xlXCIsXG4gICAgYW1QTTogW1wiQU1cIiwgXCJQTVwiXSxcbiAgICB5ZWFyQXJpYUxhYmVsOiBcIlllYXJcIixcbiAgICBtb250aEFyaWFMYWJlbDogXCJNb250aFwiLFxuICAgIGhvdXJBcmlhTGFiZWw6IFwiSG91clwiLFxuICAgIG1pbnV0ZUFyaWFMYWJlbDogXCJNaW51dGVcIixcbiAgICB0aW1lXzI0aHI6IGZhbHNlLFxufTtcbmV4cG9ydCBkZWZhdWx0IGVuZ2xpc2g7XG4iLCJleHBvcnQgdmFyIEhPT0tTID0gW1xuICAgIFwib25DaGFuZ2VcIixcbiAgICBcIm9uQ2xvc2VcIixcbiAgICBcIm9uRGF5Q3JlYXRlXCIsXG4gICAgXCJvbkRlc3Ryb3lcIixcbiAgICBcIm9uS2V5RG93blwiLFxuICAgIFwib25Nb250aENoYW5nZVwiLFxuICAgIFwib25PcGVuXCIsXG4gICAgXCJvblBhcnNlQ29uZmlnXCIsXG4gICAgXCJvblJlYWR5XCIsXG4gICAgXCJvblZhbHVlVXBkYXRlXCIsXG4gICAgXCJvblllYXJDaGFuZ2VcIixcbiAgICBcIm9uUHJlQ2FsZW5kYXJQb3NpdGlvblwiLFxuXTtcbmV4cG9ydCB2YXIgZGVmYXVsdHMgPSB7XG4gICAgX2Rpc2FibGU6IFtdLFxuICAgIGFsbG93SW5wdXQ6IGZhbHNlLFxuICAgIGFsbG93SW52YWxpZFByZWxvYWQ6IGZhbHNlLFxuICAgIGFsdEZvcm1hdDogXCJGIGosIFlcIixcbiAgICBhbHRJbnB1dDogZmFsc2UsXG4gICAgYWx0SW5wdXRDbGFzczogXCJmb3JtLWNvbnRyb2wgaW5wdXRcIixcbiAgICBhbmltYXRlOiB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpID09PSAtMSxcbiAgICBhcmlhRGF0ZUZvcm1hdDogXCJGIGosIFlcIixcbiAgICBhdXRvRmlsbERlZmF1bHRUaW1lOiB0cnVlLFxuICAgIGNsaWNrT3BlbnM6IHRydWUsXG4gICAgY2xvc2VPblNlbGVjdDogdHJ1ZSxcbiAgICBjb25qdW5jdGlvbjogXCIsIFwiLFxuICAgIGRhdGVGb3JtYXQ6IFwiWS1tLWRcIixcbiAgICBkZWZhdWx0SG91cjogMTIsXG4gICAgZGVmYXVsdE1pbnV0ZTogMCxcbiAgICBkZWZhdWx0U2Vjb25kczogMCxcbiAgICBkaXNhYmxlOiBbXSxcbiAgICBkaXNhYmxlTW9iaWxlOiBmYWxzZSxcbiAgICBlbmFibGVTZWNvbmRzOiBmYWxzZSxcbiAgICBlbmFibGVUaW1lOiBmYWxzZSxcbiAgICBlcnJvckhhbmRsZXI6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2FybihlcnIpO1xuICAgIH0sXG4gICAgZ2V0V2VlazogZnVuY3Rpb24gKGdpdmVuRGF0ZSkge1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGdpdmVuRGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAzIC0gKChkYXRlLmdldERheSgpICsgNikgJSA3KSk7XG4gICAgICAgIHZhciB3ZWVrMSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgNCk7XG4gICAgICAgIHJldHVybiAoMSArXG4gICAgICAgICAgICBNYXRoLnJvdW5kKCgoZGF0ZS5nZXRUaW1lKCkgLSB3ZWVrMS5nZXRUaW1lKCkpIC8gODY0MDAwMDAgLVxuICAgICAgICAgICAgICAgIDMgK1xuICAgICAgICAgICAgICAgICgod2VlazEuZ2V0RGF5KCkgKyA2KSAlIDcpKSAvXG4gICAgICAgICAgICAgICAgNykpO1xuICAgIH0sXG4gICAgaG91ckluY3JlbWVudDogMSxcbiAgICBpZ25vcmVkRm9jdXNFbGVtZW50czogW10sXG4gICAgaW5saW5lOiBmYWxzZSxcbiAgICBsb2NhbGU6IFwiZGVmYXVsdFwiLFxuICAgIG1pbnV0ZUluY3JlbWVudDogNSxcbiAgICBtb2RlOiBcInNpbmdsZVwiLFxuICAgIG1vbnRoU2VsZWN0b3JUeXBlOiBcImRyb3Bkb3duXCIsXG4gICAgbmV4dEFycm93OiBcIjxzdmcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB2aWV3Qm94PScwIDAgMTcgMTcnPjxnPjwvZz48cGF0aCBkPSdNMTMuMjA3IDguNDcybC03Ljg1NCA3Ljg1NC0wLjcwNy0wLjcwNyA3LjE0Ni03LjE0Ni03LjE0Ni03LjE0OCAwLjcwNy0wLjcwNyA3Ljg1NCA3Ljg1NHonIC8+PC9zdmc+XCIsXG4gICAgbm9DYWxlbmRhcjogZmFsc2UsXG4gICAgbm93OiBuZXcgRGF0ZSgpLFxuICAgIG9uQ2hhbmdlOiBbXSxcbiAgICBvbkNsb3NlOiBbXSxcbiAgICBvbkRheUNyZWF0ZTogW10sXG4gICAgb25EZXN0cm95OiBbXSxcbiAgICBvbktleURvd246IFtdLFxuICAgIG9uTW9udGhDaGFuZ2U6IFtdLFxuICAgIG9uT3BlbjogW10sXG4gICAgb25QYXJzZUNvbmZpZzogW10sXG4gICAgb25SZWFkeTogW10sXG4gICAgb25WYWx1ZVVwZGF0ZTogW10sXG4gICAgb25ZZWFyQ2hhbmdlOiBbXSxcbiAgICBvblByZUNhbGVuZGFyUG9zaXRpb246IFtdLFxuICAgIHBsdWdpbnM6IFtdLFxuICAgIHBvc2l0aW9uOiBcImF1dG9cIixcbiAgICBwb3NpdGlvbkVsZW1lbnQ6IHVuZGVmaW5lZCxcbiAgICBwcmV2QXJyb3c6IFwiPHN2ZyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHZpZXdCb3g9JzAgMCAxNyAxNyc+PGc+PC9nPjxwYXRoIGQ9J001LjIwNyA4LjQ3MWw3LjE0NiA3LjE0Ny0wLjcwNyAwLjcwNy03Ljg1My03Ljg1NCA3Ljg1NC03Ljg1MyAwLjcwNyAwLjcwNy03LjE0NyA3LjE0NnonIC8+PC9zdmc+XCIsXG4gICAgc2hvcnRoYW5kQ3VycmVudE1vbnRoOiBmYWxzZSxcbiAgICBzaG93TW9udGhzOiAxLFxuICAgIHN0YXRpYzogZmFsc2UsXG4gICAgdGltZV8yNGhyOiBmYWxzZSxcbiAgICB3ZWVrTnVtYmVyczogZmFsc2UsXG4gICAgd3JhcDogZmFsc2UsXG59O1xuIiwiaW1wb3J0IHsgdG9rZW5SZWdleCwgcmV2Rm9ybWF0LCBmb3JtYXRzLCB9IGZyb20gXCIuL2Zvcm1hdHRpbmdcIjtcbmltcG9ydCB7IGRlZmF1bHRzIH0gZnJvbSBcIi4uL3R5cGVzL29wdGlvbnNcIjtcbmltcG9ydCB7IGVuZ2xpc2ggfSBmcm9tIFwiLi4vbDEwbi9kZWZhdWx0XCI7XG5leHBvcnQgdmFyIGNyZWF0ZURhdGVGb3JtYXR0ZXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgX2IgPSBfYS5jb25maWcsIGNvbmZpZyA9IF9iID09PSB2b2lkIDAgPyBkZWZhdWx0cyA6IF9iLCBfYyA9IF9hLmwxMG4sIGwxMG4gPSBfYyA9PT0gdm9pZCAwID8gZW5nbGlzaCA6IF9jLCBfZCA9IF9hLmlzTW9iaWxlLCBpc01vYmlsZSA9IF9kID09PSB2b2lkIDAgPyBmYWxzZSA6IF9kO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0ZU9iaiwgZnJtdCwgb3ZlcnJpZGVMb2NhbGUpIHtcbiAgICAgICAgdmFyIGxvY2FsZSA9IG92ZXJyaWRlTG9jYWxlIHx8IGwxMG47XG4gICAgICAgIGlmIChjb25maWcuZm9ybWF0RGF0ZSAhPT0gdW5kZWZpbmVkICYmICFpc01vYmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5mb3JtYXREYXRlKGRhdGVPYmosIGZybXQsIGxvY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZybXRcbiAgICAgICAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoYywgaSwgYXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0c1tjXSAmJiBhcnJbaSAtIDFdICE9PSBcIlxcXFxcIlxuICAgICAgICAgICAgICAgID8gZm9ybWF0c1tjXShkYXRlT2JqLCBsb2NhbGUsIGNvbmZpZylcbiAgICAgICAgICAgICAgICA6IGMgIT09IFwiXFxcXFwiXG4gICAgICAgICAgICAgICAgICAgID8gY1xuICAgICAgICAgICAgICAgICAgICA6IFwiXCI7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihcIlwiKTtcbiAgICB9O1xufTtcbmV4cG9ydCB2YXIgY3JlYXRlRGF0ZVBhcnNlciA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBfYiA9IF9hLmNvbmZpZywgY29uZmlnID0gX2IgPT09IHZvaWQgMCA/IGRlZmF1bHRzIDogX2IsIF9jID0gX2EubDEwbiwgbDEwbiA9IF9jID09PSB2b2lkIDAgPyBlbmdsaXNoIDogX2M7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBnaXZlbkZvcm1hdCwgdGltZWxlc3MsIGN1c3RvbUxvY2FsZSkge1xuICAgICAgICBpZiAoZGF0ZSAhPT0gMCAmJiAhZGF0ZSlcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBsb2NhbGUgPSBjdXN0b21Mb2NhbGUgfHwgbDEwbjtcbiAgICAgICAgdmFyIHBhcnNlZERhdGU7XG4gICAgICAgIHZhciBkYXRlT3JpZyA9IGRhdGU7XG4gICAgICAgIGlmIChkYXRlIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRlICE9PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICBkYXRlLnRvRml4ZWQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGRhdGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHZhciBmb3JtYXQgPSBnaXZlbkZvcm1hdCB8fCAoY29uZmlnIHx8IGRlZmF1bHRzKS5kYXRlRm9ybWF0O1xuICAgICAgICAgICAgdmFyIGRhdGVzdHIgPSBTdHJpbmcoZGF0ZSkudHJpbSgpO1xuICAgICAgICAgICAgaWYgKGRhdGVzdHIgPT09IFwidG9kYXlcIikge1xuICAgICAgICAgICAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRpbWVsZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZyAmJiBjb25maWcucGFyc2VEYXRlKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkRGF0ZSA9IGNvbmZpZy5wYXJzZURhdGUoZGF0ZSwgZm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKC9aJC8udGVzdChkYXRlc3RyKSB8fFxuICAgICAgICAgICAgICAgIC9HTVQkLy50ZXN0KGRhdGVzdHIpKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoZWQgPSB2b2lkIDAsIG9wcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXRjaEluZGV4ID0gMCwgcmVnZXhTdHIgPSBcIlwiOyBpIDwgZm9ybWF0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IGZvcm1hdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQmFja1NsYXNoID0gdG9rZW4gPT09IFwiXFxcXFwiO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXNjYXBlZCA9IGZvcm1hdFtpIC0gMV0gPT09IFwiXFxcXFwiIHx8IGlzQmFja1NsYXNoO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5SZWdleFt0b2tlbl0gJiYgIWVzY2FwZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4U3RyICs9IHRva2VuUmVnZXhbdG9rZW5dO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gbmV3IFJlZ0V4cChyZWdleFN0cikuZXhlYyhkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiAobWF0Y2hlZCA9IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BzW3Rva2VuICE9PSBcIllcIiA/IFwicHVzaFwiIDogXCJ1bnNoaWZ0XCJdKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IHJldkZvcm1hdFt0b2tlbl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogbWF0Y2hbKyttYXRjaEluZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghaXNCYWNrU2xhc2gpXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleFN0ciArPSBcIi5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyc2VkRGF0ZSA9XG4gICAgICAgICAgICAgICAgICAgICFjb25maWcgfHwgIWNvbmZpZy5ub0NhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSwgMCwgMSwgMCwgMCwgMCwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IERhdGUobmV3IERhdGUoKS5zZXRIb3VycygwLCAwLCAwLCAwKSk7XG4gICAgICAgICAgICAgICAgb3BzLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IF9hLmZuLCB2YWwgPSBfYS52YWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocGFyc2VkRGF0ZSA9IGZuKHBhcnNlZERhdGUsIHZhbCwgbG9jYWxlKSB8fCBwYXJzZWREYXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwYXJzZWREYXRlID0gbWF0Y2hlZCA/IHBhcnNlZERhdGUgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEocGFyc2VkRGF0ZSBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKHBhcnNlZERhdGUuZ2V0VGltZSgpKSkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5lcnJvckhhbmRsZXIobmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIHByb3ZpZGVkOiBcIiArIGRhdGVPcmlnKSk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aW1lbGVzcyA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHBhcnNlZERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIHJldHVybiBwYXJzZWREYXRlO1xuICAgIH07XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVEYXRlcyhkYXRlMSwgZGF0ZTIsIHRpbWVsZXNzKSB7XG4gICAgaWYgKHRpbWVsZXNzID09PSB2b2lkIDApIHsgdGltZWxlc3MgPSB0cnVlOyB9XG4gICAgaWYgKHRpbWVsZXNzICE9PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKGRhdGUxLmdldFRpbWUoKSkuc2V0SG91cnMoMCwgMCwgMCwgMCkgLVxuICAgICAgICAgICAgbmV3IERhdGUoZGF0ZTIuZ2V0VGltZSgpKS5zZXRIb3VycygwLCAwLCAwLCAwKSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRlMS5nZXRUaW1lKCkgLSBkYXRlMi5nZXRUaW1lKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVRpbWVzKGRhdGUxLCBkYXRlMikge1xuICAgIHJldHVybiAoMzYwMCAqIChkYXRlMS5nZXRIb3VycygpIC0gZGF0ZTIuZ2V0SG91cnMoKSkgK1xuICAgICAgICA2MCAqIChkYXRlMS5nZXRNaW51dGVzKCkgLSBkYXRlMi5nZXRNaW51dGVzKCkpICtcbiAgICAgICAgZGF0ZTEuZ2V0U2Vjb25kcygpIC1cbiAgICAgICAgZGF0ZTIuZ2V0U2Vjb25kcygpKTtcbn1cbmV4cG9ydCB2YXIgaXNCZXR3ZWVuID0gZnVuY3Rpb24gKHRzLCB0czEsIHRzMikge1xuICAgIHJldHVybiB0cyA+IE1hdGgubWluKHRzMSwgdHMyKSAmJiB0cyA8IE1hdGgubWF4KHRzMSwgdHMyKTtcbn07XG5leHBvcnQgdmFyIGNhbGN1bGF0ZVNlY29uZHNTaW5jZU1pZG5pZ2h0ID0gZnVuY3Rpb24gKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSB7XG4gICAgcmV0dXJuIGhvdXJzICogMzYwMCArIG1pbnV0ZXMgKiA2MCArIHNlY29uZHM7XG59O1xuZXhwb3J0IHZhciBwYXJzZVNlY29uZHMgPSBmdW5jdGlvbiAoc2Vjb25kc1NpbmNlTWlkbmlnaHQpIHtcbiAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHNTaW5jZU1pZG5pZ2h0IC8gMzYwMCksIG1pbnV0ZXMgPSAoc2Vjb25kc1NpbmNlTWlkbmlnaHQgLSBob3VycyAqIDM2MDApIC8gNjA7XG4gICAgcmV0dXJuIFtob3VycywgbWludXRlcywgc2Vjb25kc1NpbmNlTWlkbmlnaHQgLSBob3VycyAqIDM2MDAgLSBtaW51dGVzICogNjBdO1xufTtcbmV4cG9ydCB2YXIgZHVyYXRpb24gPSB7XG4gICAgREFZOiA4NjQwMDAwMCxcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdEhvdXJzKGNvbmZpZykge1xuICAgIHZhciBob3VycyA9IGNvbmZpZy5kZWZhdWx0SG91cjtcbiAgICB2YXIgbWludXRlcyA9IGNvbmZpZy5kZWZhdWx0TWludXRlO1xuICAgIHZhciBzZWNvbmRzID0gY29uZmlnLmRlZmF1bHRTZWNvbmRzO1xuICAgIGlmIChjb25maWcubWluRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtaW5Ib3VyID0gY29uZmlnLm1pbkRhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgdmFyIG1pbk1pbnV0ZXMgPSBjb25maWcubWluRGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgIHZhciBtaW5TZWNvbmRzID0gY29uZmlnLm1pbkRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICBpZiAoaG91cnMgPCBtaW5Ib3VyKSB7XG4gICAgICAgICAgICBob3VycyA9IG1pbkhvdXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXJzID09PSBtaW5Ib3VyICYmIG1pbnV0ZXMgPCBtaW5NaW51dGVzKSB7XG4gICAgICAgICAgICBtaW51dGVzID0gbWluTWludXRlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG91cnMgPT09IG1pbkhvdXIgJiYgbWludXRlcyA9PT0gbWluTWludXRlcyAmJiBzZWNvbmRzIDwgbWluU2Vjb25kcylcbiAgICAgICAgICAgIHNlY29uZHMgPSBjb25maWcubWluRGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgfVxuICAgIGlmIChjb25maWcubWF4RGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtYXhIciA9IGNvbmZpZy5tYXhEYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtYXhNaW51dGVzID0gY29uZmlnLm1heERhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICBob3VycyA9IE1hdGgubWluKGhvdXJzLCBtYXhIcik7XG4gICAgICAgIGlmIChob3VycyA9PT0gbWF4SHIpXG4gICAgICAgICAgICBtaW51dGVzID0gTWF0aC5taW4obWF4TWludXRlcywgbWludXRlcyk7XG4gICAgICAgIGlmIChob3VycyA9PT0gbWF4SHIgJiYgbWludXRlcyA9PT0gbWF4TWludXRlcylcbiAgICAgICAgICAgIHNlY29uZHMgPSBjb25maWcubWF4RGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgfVxuICAgIHJldHVybiB7IGhvdXJzOiBob3VycywgbWludXRlczogbWludXRlcywgc2Vjb25kczogc2Vjb25kcyB9O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW0sIGNsYXNzTmFtZSwgYm9vbCkge1xuICAgIGlmIChib29sID09PSB0cnVlKVxuICAgICAgICByZXR1cm4gZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZSwgY29udGVudCkge1xuICAgIHZhciBlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUgfHwgXCJcIjtcbiAgICBjb250ZW50ID0gY29udGVudCB8fCBcIlwiO1xuICAgIGUuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIGlmIChjb250ZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIHJldHVybiBlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyTm9kZShub2RlKSB7XG4gICAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZClcbiAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQYXJlbnQobm9kZSwgY29uZGl0aW9uKSB7XG4gICAgaWYgKGNvbmRpdGlvbihub2RlKSlcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgZWxzZSBpZiAobm9kZS5wYXJlbnROb2RlKVxuICAgICAgICByZXR1cm4gZmluZFBhcmVudChub2RlLnBhcmVudE5vZGUsIGNvbmRpdGlvbik7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOdW1iZXJJbnB1dChpbnB1dENsYXNzTmFtZSwgb3B0cykge1xuICAgIHZhciB3cmFwcGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcIm51bUlucHV0V3JhcHBlclwiKSwgbnVtSW5wdXQgPSBjcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgXCJudW1JbnB1dCBcIiArIGlucHV0Q2xhc3NOYW1lKSwgYXJyb3dVcCA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiYXJyb3dVcFwiKSwgYXJyb3dEb3duID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJhcnJvd0Rvd25cIik7XG4gICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUUgOS4wXCIpID09PSAtMSkge1xuICAgICAgICBudW1JbnB1dC50eXBlID0gXCJudW1iZXJcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG51bUlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgbnVtSW5wdXQucGF0dGVybiA9IFwiXFxcXGQqXCI7XG4gICAgfVxuICAgIGlmIChvcHRzICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRzKVxuICAgICAgICAgICAgbnVtSW5wdXQuc2V0QXR0cmlidXRlKGtleSwgb3B0c1trZXldKTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKG51bUlucHV0KTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGFycm93VXApO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoYXJyb3dEb3duKTtcbiAgICByZXR1cm4gd3JhcHBlcjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRFdmVudFRhcmdldChldmVudCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQuY29tcG9zZWRQYXRoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gZXZlbnQuY29tcG9zZWRQYXRoKCk7XG4gICAgICAgICAgICByZXR1cm4gcGF0aFswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0O1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBpbnQsIHBhZCB9IGZyb20gXCIuLi91dGlsc1wiO1xudmFyIGRvTm90aGluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfTtcbmV4cG9ydCB2YXIgbW9udGhUb1N0ciA9IGZ1bmN0aW9uIChtb250aE51bWJlciwgc2hvcnRoYW5kLCBsb2NhbGUpIHsgcmV0dXJuIGxvY2FsZS5tb250aHNbc2hvcnRoYW5kID8gXCJzaG9ydGhhbmRcIiA6IFwibG9uZ2hhbmRcIl1bbW9udGhOdW1iZXJdOyB9O1xuZXhwb3J0IHZhciByZXZGb3JtYXQgPSB7XG4gICAgRDogZG9Ob3RoaW5nLFxuICAgIEY6IGZ1bmN0aW9uIChkYXRlT2JqLCBtb250aE5hbWUsIGxvY2FsZSkge1xuICAgICAgICBkYXRlT2JqLnNldE1vbnRoKGxvY2FsZS5tb250aHMubG9uZ2hhbmQuaW5kZXhPZihtb250aE5hbWUpKTtcbiAgICB9LFxuICAgIEc6IGZ1bmN0aW9uIChkYXRlT2JqLCBob3VyKSB7XG4gICAgICAgIGRhdGVPYmouc2V0SG91cnMoKGRhdGVPYmouZ2V0SG91cnMoKSA+PSAxMiA/IDEyIDogMCkgKyBwYXJzZUZsb2F0KGhvdXIpKTtcbiAgICB9LFxuICAgIEg6IGZ1bmN0aW9uIChkYXRlT2JqLCBob3VyKSB7XG4gICAgICAgIGRhdGVPYmouc2V0SG91cnMocGFyc2VGbG9hdChob3VyKSk7XG4gICAgfSxcbiAgICBKOiBmdW5jdGlvbiAoZGF0ZU9iaiwgZGF5KSB7XG4gICAgICAgIGRhdGVPYmouc2V0RGF0ZShwYXJzZUZsb2F0KGRheSkpO1xuICAgIH0sXG4gICAgSzogZnVuY3Rpb24gKGRhdGVPYmosIGFtUE0sIGxvY2FsZSkge1xuICAgICAgICBkYXRlT2JqLnNldEhvdXJzKChkYXRlT2JqLmdldEhvdXJzKCkgJSAxMikgK1xuICAgICAgICAgICAgMTIgKiBpbnQobmV3IFJlZ0V4cChsb2NhbGUuYW1QTVsxXSwgXCJpXCIpLnRlc3QoYW1QTSkpKTtcbiAgICB9LFxuICAgIE06IGZ1bmN0aW9uIChkYXRlT2JqLCBzaG9ydE1vbnRoLCBsb2NhbGUpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRNb250aChsb2NhbGUubW9udGhzLnNob3J0aGFuZC5pbmRleE9mKHNob3J0TW9udGgpKTtcbiAgICB9LFxuICAgIFM6IGZ1bmN0aW9uIChkYXRlT2JqLCBzZWNvbmRzKSB7XG4gICAgICAgIGRhdGVPYmouc2V0U2Vjb25kcyhwYXJzZUZsb2F0KHNlY29uZHMpKTtcbiAgICB9LFxuICAgIFU6IGZ1bmN0aW9uIChfLCB1bml4U2Vjb25kcykgeyByZXR1cm4gbmV3IERhdGUocGFyc2VGbG9hdCh1bml4U2Vjb25kcykgKiAxMDAwKTsgfSxcbiAgICBXOiBmdW5jdGlvbiAoZGF0ZU9iaiwgd2Vla051bSwgbG9jYWxlKSB7XG4gICAgICAgIHZhciB3ZWVrTnVtYmVyID0gcGFyc2VJbnQod2Vla051bSk7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZU9iai5nZXRGdWxsWWVhcigpLCAwLCAyICsgKHdlZWtOdW1iZXIgLSAxKSAqIDcsIDAsIDAsIDAsIDApO1xuICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSBkYXRlLmdldERheSgpICsgbG9jYWxlLmZpcnN0RGF5T2ZXZWVrKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfSxcbiAgICBZOiBmdW5jdGlvbiAoZGF0ZU9iaiwgeWVhcikge1xuICAgICAgICBkYXRlT2JqLnNldEZ1bGxZZWFyKHBhcnNlRmxvYXQoeWVhcikpO1xuICAgIH0sXG4gICAgWjogZnVuY3Rpb24gKF8sIElTT0RhdGUpIHsgcmV0dXJuIG5ldyBEYXRlKElTT0RhdGUpOyB9LFxuICAgIGQ6IGZ1bmN0aW9uIChkYXRlT2JqLCBkYXkpIHtcbiAgICAgICAgZGF0ZU9iai5zZXREYXRlKHBhcnNlRmxvYXQoZGF5KSk7XG4gICAgfSxcbiAgICBoOiBmdW5jdGlvbiAoZGF0ZU9iaiwgaG91cikge1xuICAgICAgICBkYXRlT2JqLnNldEhvdXJzKChkYXRlT2JqLmdldEhvdXJzKCkgPj0gMTIgPyAxMiA6IDApICsgcGFyc2VGbG9hdChob3VyKSk7XG4gICAgfSxcbiAgICBpOiBmdW5jdGlvbiAoZGF0ZU9iaiwgbWludXRlcykge1xuICAgICAgICBkYXRlT2JqLnNldE1pbnV0ZXMocGFyc2VGbG9hdChtaW51dGVzKSk7XG4gICAgfSxcbiAgICBqOiBmdW5jdGlvbiAoZGF0ZU9iaiwgZGF5KSB7XG4gICAgICAgIGRhdGVPYmouc2V0RGF0ZShwYXJzZUZsb2F0KGRheSkpO1xuICAgIH0sXG4gICAgbDogZG9Ob3RoaW5nLFxuICAgIG06IGZ1bmN0aW9uIChkYXRlT2JqLCBtb250aCkge1xuICAgICAgICBkYXRlT2JqLnNldE1vbnRoKHBhcnNlRmxvYXQobW9udGgpIC0gMSk7XG4gICAgfSxcbiAgICBuOiBmdW5jdGlvbiAoZGF0ZU9iaiwgbW9udGgpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRNb250aChwYXJzZUZsb2F0KG1vbnRoKSAtIDEpO1xuICAgIH0sXG4gICAgczogZnVuY3Rpb24gKGRhdGVPYmosIHNlY29uZHMpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRTZWNvbmRzKHBhcnNlRmxvYXQoc2Vjb25kcykpO1xuICAgIH0sXG4gICAgdTogZnVuY3Rpb24gKF8sIHVuaXhNaWxsU2Vjb25kcykge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUocGFyc2VGbG9hdCh1bml4TWlsbFNlY29uZHMpKTtcbiAgICB9LFxuICAgIHc6IGRvTm90aGluZyxcbiAgICB5OiBmdW5jdGlvbiAoZGF0ZU9iaiwgeWVhcikge1xuICAgICAgICBkYXRlT2JqLnNldEZ1bGxZZWFyKDIwMDAgKyBwYXJzZUZsb2F0KHllYXIpKTtcbiAgICB9LFxufTtcbmV4cG9ydCB2YXIgdG9rZW5SZWdleCA9IHtcbiAgICBEOiBcIlwiLFxuICAgIEY6IFwiXCIsXG4gICAgRzogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICBIOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxuICAgIEo6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXFxcXHcrXCIsXG4gICAgSzogXCJcIixcbiAgICBNOiBcIlwiLFxuICAgIFM6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXG4gICAgVTogXCIoLispXCIsXG4gICAgVzogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICBZOiBcIihcXFxcZHs0fSlcIixcbiAgICBaOiBcIiguKylcIixcbiAgICBkOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxuICAgIGg6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXG4gICAgaTogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICBqOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxuICAgIGw6IFwiXCIsXG4gICAgbTogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICBuOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxuICAgIHM6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXG4gICAgdTogXCIoLispXCIsXG4gICAgdzogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICB5OiBcIihcXFxcZHsyfSlcIixcbn07XG5leHBvcnQgdmFyIGZvcm1hdHMgPSB7XG4gICAgWjogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKTsgfSxcbiAgICBEOiBmdW5jdGlvbiAoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXMuc2hvcnRoYW5kW2Zvcm1hdHMudyhkYXRlLCBsb2NhbGUsIG9wdGlvbnMpXTtcbiAgICB9LFxuICAgIEY6IGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG1vbnRoVG9TdHIoZm9ybWF0cy5uKGRhdGUsIGxvY2FsZSwgb3B0aW9ucykgLSAxLCBmYWxzZSwgbG9jYWxlKTtcbiAgICB9LFxuICAgIEc6IGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHBhZChmb3JtYXRzLmgoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKSk7XG4gICAgfSxcbiAgICBIOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gcGFkKGRhdGUuZ2V0SG91cnMoKSk7IH0sXG4gICAgSjogZnVuY3Rpb24gKGRhdGUsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLm9yZGluYWwgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBkYXRlLmdldERhdGUoKSArIGxvY2FsZS5vcmRpbmFsKGRhdGUuZ2V0RGF0ZSgpKVxuICAgICAgICAgICAgOiBkYXRlLmdldERhdGUoKTtcbiAgICB9LFxuICAgIEs6IGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUpIHsgcmV0dXJuIGxvY2FsZS5hbVBNW2ludChkYXRlLmdldEhvdXJzKCkgPiAxMSldOyB9LFxuICAgIE06IGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIG1vbnRoVG9TdHIoZGF0ZS5nZXRNb250aCgpLCB0cnVlLCBsb2NhbGUpO1xuICAgIH0sXG4gICAgUzogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHBhZChkYXRlLmdldFNlY29uZHMoKSk7IH0sXG4gICAgVTogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC8gMTAwMDsgfSxcbiAgICBXOiBmdW5jdGlvbiAoZGF0ZSwgXywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5nZXRXZWVrKGRhdGUpO1xuICAgIH0sXG4gICAgWTogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHBhZChkYXRlLmdldEZ1bGxZZWFyKCksIDQpOyB9LFxuICAgIGQ6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBwYWQoZGF0ZS5nZXREYXRlKCkpOyB9LFxuICAgIGg6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiAoZGF0ZS5nZXRIb3VycygpICUgMTIgPyBkYXRlLmdldEhvdXJzKCkgJSAxMiA6IDEyKTsgfSxcbiAgICBpOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gcGFkKGRhdGUuZ2V0TWludXRlcygpKTsgfSxcbiAgICBqOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXREYXRlKCk7IH0sXG4gICAgbDogZnVuY3Rpb24gKGRhdGUsIGxvY2FsZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzLmxvbmdoYW5kW2RhdGUuZ2V0RGF5KCldO1xuICAgIH0sXG4gICAgbTogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHBhZChkYXRlLmdldE1vbnRoKCkgKyAxKTsgfSxcbiAgICBuOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMTsgfSxcbiAgICBzOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7IH0sXG4gICAgdTogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0VGltZSgpOyB9LFxuICAgIHc6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBkYXRlLmdldERheSgpOyB9LFxuICAgIHk6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKS5zdWJzdHJpbmcoMik7IH0sXG59O1xuIiwiZXhwb3J0IHZhciBwYWQgPSBmdW5jdGlvbiAobnVtYmVyLCBsZW5ndGgpIHtcbiAgICBpZiAobGVuZ3RoID09PSB2b2lkIDApIHsgbGVuZ3RoID0gMjsgfVxuICAgIHJldHVybiAoXCIwMDBcIiArIG51bWJlcikuc2xpY2UobGVuZ3RoICogLTEpO1xufTtcbmV4cG9ydCB2YXIgaW50ID0gZnVuY3Rpb24gKGJvb2wpIHsgcmV0dXJuIChib29sID09PSB0cnVlID8gMSA6IDApOyB9O1xuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlKGZuLCB3YWl0KSB7XG4gICAgdmFyIHQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gZm4uYXBwbHkoX3RoaXMsIGFyZ3MpOyB9LCB3YWl0KTtcbiAgICB9O1xufVxuZXhwb3J0IHZhciBhcnJheWlmeSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgQXJyYXkgPyBvYmogOiBbb2JqXTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcIkNhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gKHRhcmdldFtrZXldID0gc291cmNlW2tleV0pOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBhcmdzXzEgPSBhcmdzOyBfYSA8IGFyZ3NfMS5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhcmdzXzFbX2FdO1xuICAgICAgICAgICAgX2xvb3BfMShzb3VyY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcbn1cbiIsImltcG9ydCBIVE1MTWFza0VsZW1lbnQgZnJvbSAnLi9odG1sLW1hc2stZWxlbWVudC5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0ICcuL21hc2stZWxlbWVudC5qcyc7XG5cbmNsYXNzIEhUTUxDb250ZW50ZWRpdGFibGVNYXNrRWxlbWVudCBleHRlbmRzIEhUTUxNYXNrRWxlbWVudCB7XG4gIC8qKiBSZXR1cm5zIEhUTUxFbGVtZW50IHNlbGVjdGlvbiBzdGFydCAqL1xuICBnZXQgX3Vuc2FmZVNlbGVjdGlvblN0YXJ0KCkge1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHJvb3QuZ2V0U2VsZWN0aW9uICYmIHJvb3QuZ2V0U2VsZWN0aW9uKCk7XG4gICAgY29uc3QgYW5jaG9yT2Zmc2V0ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5hbmNob3JPZmZzZXQ7XG4gICAgY29uc3QgZm9jdXNPZmZzZXQgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmZvY3VzT2Zmc2V0O1xuICAgIGlmIChmb2N1c09mZnNldCA9PSBudWxsIHx8IGFuY2hvck9mZnNldCA9PSBudWxsIHx8IGFuY2hvck9mZnNldCA8IGZvY3VzT2Zmc2V0KSB7XG4gICAgICByZXR1cm4gYW5jaG9yT2Zmc2V0O1xuICAgIH1cbiAgICByZXR1cm4gZm9jdXNPZmZzZXQ7XG4gIH1cblxuICAvKiogUmV0dXJucyBIVE1MRWxlbWVudCBzZWxlY3Rpb24gZW5kICovXG4gIGdldCBfdW5zYWZlU2VsZWN0aW9uRW5kKCkge1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHJvb3QuZ2V0U2VsZWN0aW9uICYmIHJvb3QuZ2V0U2VsZWN0aW9uKCk7XG4gICAgY29uc3QgYW5jaG9yT2Zmc2V0ID0gc2VsZWN0aW9uICYmIHNlbGVjdGlvbi5hbmNob3JPZmZzZXQ7XG4gICAgY29uc3QgZm9jdXNPZmZzZXQgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmZvY3VzT2Zmc2V0O1xuICAgIGlmIChmb2N1c09mZnNldCA9PSBudWxsIHx8IGFuY2hvck9mZnNldCA9PSBudWxsIHx8IGFuY2hvck9mZnNldCA+IGZvY3VzT2Zmc2V0KSB7XG4gICAgICByZXR1cm4gYW5jaG9yT2Zmc2V0O1xuICAgIH1cbiAgICByZXR1cm4gZm9jdXNPZmZzZXQ7XG4gIH1cblxuICAvKiogU2V0cyBIVE1MRWxlbWVudCBzZWxlY3Rpb24gKi9cbiAgX3Vuc2FmZVNlbGVjdChzdGFydCwgZW5kKSB7XG4gICAgaWYgKCF0aGlzLnJvb3RFbGVtZW50LmNyZWF0ZVJhbmdlKSByZXR1cm47XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLnJvb3RFbGVtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2V0U3RhcnQodGhpcy5pbnB1dC5maXJzdENoaWxkIHx8IHRoaXMuaW5wdXQsIHN0YXJ0KTtcbiAgICByYW5nZS5zZXRFbmQodGhpcy5pbnB1dC5sYXN0Q2hpbGQgfHwgdGhpcy5pbnB1dCwgZW5kKTtcbiAgICBjb25zdCByb290ID0gdGhpcy5yb290RWxlbWVudDtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSByb290LmdldFNlbGVjdGlvbiAmJiByb290LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhUTUxFbGVtZW50IHZhbHVlICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC50ZXh0Q29udGVudCB8fCAnJztcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmlucHV0LnRleHRDb250ZW50ID0gdmFsdWU7XG4gIH1cbn1cbklNYXNrLkhUTUxDb250ZW50ZWRpdGFibGVNYXNrRWxlbWVudCA9IEhUTUxDb250ZW50ZWRpdGFibGVNYXNrRWxlbWVudDtcblxuZXhwb3J0IHsgSFRNTENvbnRlbnRlZGl0YWJsZU1hc2tFbGVtZW50IGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBIVE1MTWFza0VsZW1lbnQgZnJvbSAnLi9odG1sLW1hc2stZWxlbWVudC5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0ICcuL21hc2stZWxlbWVudC5qcyc7XG5cbi8qKiBCcmlkZ2UgYmV0d2VlbiBJbnB1dEVsZW1lbnQgYW5kIHtAbGluayBNYXNrZWR9ICovXG5jbGFzcyBIVE1MSW5wdXRNYXNrRWxlbWVudCBleHRlbmRzIEhUTUxNYXNrRWxlbWVudCB7XG4gIC8qKiBJbnB1dEVsZW1lbnQgdG8gdXNlIG1hc2sgb24gKi9cblxuICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgIHN1cGVyKGlucHV0KTtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gIH1cblxuICAvKiogUmV0dXJucyBJbnB1dEVsZW1lbnQgc2VsZWN0aW9uIHN0YXJ0ICovXG4gIGdldCBfdW5zYWZlU2VsZWN0aW9uU3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCA/IHRoaXMuaW5wdXQuc2VsZWN0aW9uU3RhcnQgOiB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIElucHV0RWxlbWVudCBzZWxlY3Rpb24gZW5kICovXG4gIGdldCBfdW5zYWZlU2VsZWN0aW9uRW5kKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0LnNlbGVjdGlvbkVuZDtcbiAgfVxuXG4gIC8qKiBTZXRzIElucHV0RWxlbWVudCBzZWxlY3Rpb24gKi9cbiAgX3Vuc2FmZVNlbGVjdChzdGFydCwgZW5kKSB7XG4gICAgdGhpcy5pbnB1dC5zZXRTZWxlY3Rpb25SYW5nZShzdGFydCwgZW5kKTtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQudmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5pbnB1dC52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5JTWFzay5IVE1MTWFza0VsZW1lbnQgPSBIVE1MTWFza0VsZW1lbnQ7XG5cbmV4cG9ydCB7IEhUTUxJbnB1dE1hc2tFbGVtZW50IGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBNYXNrRWxlbWVudCBmcm9tICcuL21hc2stZWxlbWVudC5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuXG5jb25zdCBLRVlfWiA9IDkwO1xuY29uc3QgS0VZX1kgPSA4OTtcblxuLyoqIEJyaWRnZSBiZXR3ZWVuIEhUTUxFbGVtZW50IGFuZCB7QGxpbmsgTWFza2VkfSAqL1xuY2xhc3MgSFRNTE1hc2tFbGVtZW50IGV4dGVuZHMgTWFza0VsZW1lbnQge1xuICAvKiogSFRNTEVsZW1lbnQgdG8gdXNlIG1hc2sgb24gKi9cblxuICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICAgIHRoaXMuX29uS2V5ZG93biA9IHRoaXMuX29uS2V5ZG93bi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uSW5wdXQgPSB0aGlzLl9vbklucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25CZWZvcmVpbnB1dCA9IHRoaXMuX29uQmVmb3JlaW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkNvbXBvc2l0aW9uRW5kID0gdGhpcy5fb25Db21wb3NpdGlvbkVuZC5iaW5kKHRoaXMpO1xuICB9XG4gIGdldCByb290RWxlbWVudCgpIHtcbiAgICB2YXIgX3RoaXMkaW5wdXQkZ2V0Um9vdE5vLCBfdGhpcyRpbnB1dCRnZXRSb290Tm8yLCBfdGhpcyRpbnB1dDtcbiAgICByZXR1cm4gKF90aGlzJGlucHV0JGdldFJvb3RObyA9IChfdGhpcyRpbnB1dCRnZXRSb290Tm8yID0gKF90aGlzJGlucHV0ID0gdGhpcy5pbnB1dCkuZ2V0Um9vdE5vZGUpID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRpbnB1dCRnZXRSb290Tm8yLmNhbGwoX3RoaXMkaW5wdXQpKSAhPSBudWxsID8gX3RoaXMkaW5wdXQkZ2V0Um9vdE5vIDogZG9jdW1lbnQ7XG4gIH1cblxuICAvKiogSXMgZWxlbWVudCBpbiBmb2N1cyAqL1xuICBnZXQgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQgPT09IHRoaXMucm9vdEVsZW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKiBCaW5kcyBIVE1MRWxlbWVudCBldmVudHMgdG8gbWFzayBpbnRlcm5hbCBldmVudHMgKi9cbiAgYmluZEV2ZW50cyhoYW5kbGVycykge1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX29uSW5wdXQpO1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JlaW5wdXQnLCB0aGlzLl9vbkJlZm9yZWlucHV0KTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uZW5kJywgdGhpcy5fb25Db21wb3NpdGlvbkVuZCk7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgaGFuZGxlcnMuZHJvcCk7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXJzLmNsaWNrKTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgaGFuZGxlcnMuZm9jdXMpO1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGhhbmRsZXJzLmNvbW1pdCk7XG4gICAgdGhpcy5faGFuZGxlcnMgPSBoYW5kbGVycztcbiAgfVxuICBfb25LZXlkb3duKGUpIHtcbiAgICBpZiAodGhpcy5faGFuZGxlcnMucmVkbyAmJiAoZS5rZXlDb2RlID09PSBLRVlfWiAmJiBlLnNoaWZ0S2V5ICYmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSB8fCBlLmtleUNvZGUgPT09IEtFWV9ZICYmIGUuY3RybEtleSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVycy5yZWRvKGUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFuZGxlcnMudW5kbyAmJiBlLmtleUNvZGUgPT09IEtFWV9aICYmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzLnVuZG8oZSk7XG4gICAgfVxuICAgIGlmICghZS5pc0NvbXBvc2luZykgdGhpcy5faGFuZGxlcnMuc2VsZWN0aW9uQ2hhbmdlKGUpO1xuICB9XG4gIF9vbkJlZm9yZWlucHV0KGUpIHtcbiAgICBpZiAoZS5pbnB1dFR5cGUgPT09ICdoaXN0b3J5VW5kbycgJiYgdGhpcy5faGFuZGxlcnMudW5kbykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzLnVuZG8oZSk7XG4gICAgfVxuICAgIGlmIChlLmlucHV0VHlwZSA9PT0gJ2hpc3RvcnlSZWRvJyAmJiB0aGlzLl9oYW5kbGVycy5yZWRvKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gdGhpcy5faGFuZGxlcnMucmVkbyhlKTtcbiAgICB9XG4gIH1cbiAgX29uQ29tcG9zaXRpb25FbmQoZSkge1xuICAgIHRoaXMuX2hhbmRsZXJzLmlucHV0KGUpO1xuICB9XG4gIF9vbklucHV0KGUpIHtcbiAgICBpZiAoIWUuaXNDb21wb3NpbmcpIHRoaXMuX2hhbmRsZXJzLmlucHV0KGUpO1xuICB9XG5cbiAgLyoqIFVuYmluZHMgSFRNTEVsZW1lbnQgZXZlbnRzIHRvIG1hc2sgaW50ZXJuYWwgZXZlbnRzICovXG4gIHVuYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbktleWRvd24pO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLl9vbklucHV0KTtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JlZm9yZWlucHV0JywgdGhpcy5fb25CZWZvcmVpbnB1dCk7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wb3NpdGlvbmVuZCcsIHRoaXMuX29uQ29tcG9zaXRpb25FbmQpO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuX2hhbmRsZXJzLmRyb3ApO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVycy5jbGljayk7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX2hhbmRsZXJzLmZvY3VzKTtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9oYW5kbGVycy5jb21taXQpO1xuICAgIHRoaXMuX2hhbmRsZXJzID0ge307XG4gIH1cbn1cbklNYXNrLkhUTUxNYXNrRWxlbWVudCA9IEhUTUxNYXNrRWxlbWVudDtcblxuZXhwb3J0IHsgSFRNTE1hc2tFbGVtZW50IGFzIGRlZmF1bHQgfTtcbiIsImNsYXNzIElucHV0SGlzdG9yeSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3RhdGVzID0gW107XG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xuICB9XG4gIGdldCBjdXJyZW50U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzW3RoaXMuY3VycmVudEluZGV4XTtcbiAgfVxuICBnZXQgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMubGVuZ3RoID09PSAwO1xuICB9XG4gIHB1c2goc3RhdGUpIHtcbiAgICAvLyBpZiBjdXJyZW50IGluZGV4IHBvaW50cyBiZWZvcmUgdGhlIGxhc3QgZWxlbWVudCB0aGVuIHJlbW92ZSB0aGUgZnV0dXJlXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMSkgdGhpcy5zdGF0ZXMubGVuZ3RoID0gdGhpcy5jdXJyZW50SW5kZXggKyAxO1xuICAgIHRoaXMuc3RhdGVzLnB1c2goc3RhdGUpO1xuICAgIGlmICh0aGlzLnN0YXRlcy5sZW5ndGggPiBJbnB1dEhpc3RvcnkuTUFYX0xFTkdUSCkgdGhpcy5zdGF0ZXMuc2hpZnQoKTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuc3RhdGVzLmxlbmd0aCAtIDE7XG4gIH1cbiAgZ28oc3RlcHMpIHtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMuY3VycmVudEluZGV4ICsgc3RlcHMsIDApLCB0aGlzLnN0YXRlcy5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGU7XG4gIH1cbiAgdW5kbygpIHtcbiAgICByZXR1cm4gdGhpcy5nbygtMSk7XG4gIH1cbiAgcmVkbygpIHtcbiAgICByZXR1cm4gdGhpcy5nbygrMSk7XG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5zdGF0ZXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gIH1cbn1cbklucHV0SGlzdG9yeS5NQVhfTEVOR1RIID0gMTAwO1xuXG5leHBvcnQgeyBJbnB1dEhpc3RvcnkgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi4vY29yZS91dGlscy5qcyc7XG5pbXBvcnQgQWN0aW9uRGV0YWlscyBmcm9tICcuLi9jb3JlL2FjdGlvbi1kZXRhaWxzLmpzJztcbmltcG9ydCBjcmVhdGVNYXNrLCB7IG1hc2tlZENsYXNzIH0gZnJvbSAnLi4vbWFza2VkL2ZhY3RvcnkuanMnO1xuaW1wb3J0IE1hc2tFbGVtZW50IGZyb20gJy4vbWFzay1lbGVtZW50LmpzJztcbmltcG9ydCBIVE1MSW5wdXRNYXNrRWxlbWVudCBmcm9tICcuL2h0bWwtaW5wdXQtbWFzay1lbGVtZW50LmpzJztcbmltcG9ydCBIVE1MQ29udGVudGVkaXRhYmxlTWFza0VsZW1lbnQgZnJvbSAnLi9odG1sLWNvbnRlbnRlZGl0YWJsZS1tYXNrLWVsZW1lbnQuanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uL2NvcmUvaG9sZGVyLmpzJztcbmltcG9ydCBJbnB1dEhpc3RvcnkgZnJvbSAnLi9pbnB1dC1oaXN0b3J5LmpzJztcbmltcG9ydCAnLi9odG1sLW1hc2stZWxlbWVudC5qcyc7XG5cbi8qKiBMaXN0ZW5zIHRvIGVsZW1lbnQgZXZlbnRzIGFuZCBjb250cm9scyBjaGFuZ2VzIGJldHdlZW4gZWxlbWVudCBhbmQge0BsaW5rIE1hc2tlZH0gKi9cbmNsYXNzIElucHV0TWFzayB7XG4gIC8qKlxuICAgIFZpZXcgZWxlbWVudFxuICAqL1xuXG4gIC8qKiBJbnRlcm5hbCB7QGxpbmsgTWFza2VkfSBtb2RlbCAqL1xuXG4gIGNvbnN0cnVjdG9yKGVsLCBvcHRzKSB7XG4gICAgdGhpcy5lbCA9IGVsIGluc3RhbmNlb2YgTWFza0VsZW1lbnQgPyBlbCA6IGVsLmlzQ29udGVudEVkaXRhYmxlICYmIGVsLnRhZ05hbWUgIT09ICdJTlBVVCcgJiYgZWwudGFnTmFtZSAhPT0gJ1RFWFRBUkVBJyA/IG5ldyBIVE1MQ29udGVudGVkaXRhYmxlTWFza0VsZW1lbnQoZWwpIDogbmV3IEhUTUxJbnB1dE1hc2tFbGVtZW50KGVsKTtcbiAgICB0aGlzLm1hc2tlZCA9IGNyZWF0ZU1hc2sob3B0cyk7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICB0aGlzLl91bm1hc2tlZFZhbHVlID0gJyc7XG4gICAgdGhpcy5fcmF3SW5wdXRWYWx1ZSA9ICcnO1xuICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBJbnB1dEhpc3RvcnkoKTtcbiAgICB0aGlzLl9zYXZlU2VsZWN0aW9uID0gdGhpcy5fc2F2ZVNlbGVjdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uSW5wdXQgPSB0aGlzLl9vbklucHV0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSB0aGlzLl9vbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRHJvcCA9IHRoaXMuX29uRHJvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uRm9jdXMgPSB0aGlzLl9vbkZvY3VzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25DbGljayA9IHRoaXMuX29uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vblVuZG8gPSB0aGlzLl9vblVuZG8uYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vblJlZG8gPSB0aGlzLl9vblJlZG8uYmluZCh0aGlzKTtcbiAgICB0aGlzLmFsaWduQ3Vyc29yID0gdGhpcy5hbGlnbkN1cnNvci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWxpZ25DdXJzb3JGcmllbmRseSA9IHRoaXMuYWxpZ25DdXJzb3JGcmllbmRseS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcblxuICAgIC8vIHJlZnJlc2hcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gICAgdGhpcy5fb25DaGFuZ2UoKTtcbiAgfVxuICBtYXNrRXF1YWxzKG1hc2spIHtcbiAgICB2YXIgX3RoaXMkbWFza2VkO1xuICAgIHJldHVybiBtYXNrID09IG51bGwgfHwgKChfdGhpcyRtYXNrZWQgPSB0aGlzLm1hc2tlZCkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJG1hc2tlZC5tYXNrRXF1YWxzKG1hc2spKTtcbiAgfVxuXG4gIC8qKiBNYXNrZWQgKi9cbiAgZ2V0IG1hc2soKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLm1hc2s7XG4gIH1cbiAgc2V0IG1hc2sobWFzaykge1xuICAgIGlmICh0aGlzLm1hc2tFcXVhbHMobWFzaykpIHJldHVybjtcbiAgICBpZiAoIShtYXNrIGluc3RhbmNlb2YgSU1hc2suTWFza2VkKSAmJiB0aGlzLm1hc2tlZC5jb25zdHJ1Y3RvciA9PT0gbWFza2VkQ2xhc3MobWFzaykpIHtcbiAgICAgIC8vIFRPRE8gXCJhbnlcIiBubyBpZGVhXG4gICAgICB0aGlzLm1hc2tlZC51cGRhdGVPcHRpb25zKHtcbiAgICAgICAgbWFza1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1hc2tlZCA9IG1hc2sgaW5zdGFuY2VvZiBJTWFzay5NYXNrZWQgPyBtYXNrIDogY3JlYXRlTWFzayh7XG4gICAgICBtYXNrXG4gICAgfSk7XG4gICAgbWFza2VkLnVubWFza2VkVmFsdWUgPSB0aGlzLm1hc2tlZC51bm1hc2tlZFZhbHVlO1xuICAgIHRoaXMubWFza2VkID0gbWFza2VkO1xuICB9XG5cbiAgLyoqIFJhdyB2YWx1ZSAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZShzdHIpIHtcbiAgICBpZiAodGhpcy52YWx1ZSA9PT0gc3RyKSByZXR1cm47XG4gICAgdGhpcy5tYXNrZWQudmFsdWUgPSBzdHI7XG4gICAgdGhpcy51cGRhdGVDb250cm9sKCdhdXRvJyk7XG4gIH1cblxuICAvKiogVW5tYXNrZWQgdmFsdWUgKi9cbiAgZ2V0IHVubWFza2VkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VubWFza2VkVmFsdWU7XG4gIH1cbiAgc2V0IHVubWFza2VkVmFsdWUoc3RyKSB7XG4gICAgaWYgKHRoaXMudW5tYXNrZWRWYWx1ZSA9PT0gc3RyKSByZXR1cm47XG4gICAgdGhpcy5tYXNrZWQudW5tYXNrZWRWYWx1ZSA9IHN0cjtcbiAgICB0aGlzLnVwZGF0ZUNvbnRyb2woJ2F1dG8nKTtcbiAgfVxuXG4gIC8qKiBSYXcgaW5wdXQgdmFsdWUgKi9cbiAgZ2V0IHJhd0lucHV0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jhd0lucHV0VmFsdWU7XG4gIH1cbiAgc2V0IHJhd0lucHV0VmFsdWUoc3RyKSB7XG4gICAgaWYgKHRoaXMucmF3SW5wdXRWYWx1ZSA9PT0gc3RyKSByZXR1cm47XG4gICAgdGhpcy5tYXNrZWQucmF3SW5wdXRWYWx1ZSA9IHN0cjtcbiAgICB0aGlzLnVwZGF0ZUNvbnRyb2woKTtcbiAgICB0aGlzLmFsaWduQ3Vyc29yKCk7XG4gIH1cblxuICAvKiogVHlwZWQgdW5tYXNrZWQgdmFsdWUgKi9cbiAgZ2V0IHR5cGVkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLnR5cGVkVmFsdWU7XG4gIH1cbiAgc2V0IHR5cGVkVmFsdWUodmFsKSB7XG4gICAgaWYgKHRoaXMubWFza2VkLnR5cGVkVmFsdWVFcXVhbHModmFsKSkgcmV0dXJuO1xuICAgIHRoaXMubWFza2VkLnR5cGVkVmFsdWUgPSB2YWw7XG4gICAgdGhpcy51cGRhdGVDb250cm9sKCdhdXRvJyk7XG4gIH1cblxuICAvKiogRGlzcGxheSB2YWx1ZSAqL1xuICBnZXQgZGlzcGxheVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLm1hc2tlZC5kaXNwbGF5VmFsdWU7XG4gIH1cblxuICAvKiogU3RhcnRzIGxpc3RlbmluZyB0byBlbGVtZW50IGV2ZW50cyAqL1xuICBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmVsLmJpbmRFdmVudHMoe1xuICAgICAgc2VsZWN0aW9uQ2hhbmdlOiB0aGlzLl9zYXZlU2VsZWN0aW9uLFxuICAgICAgaW5wdXQ6IHRoaXMuX29uSW5wdXQsXG4gICAgICBkcm9wOiB0aGlzLl9vbkRyb3AsXG4gICAgICBjbGljazogdGhpcy5fb25DbGljayxcbiAgICAgIGZvY3VzOiB0aGlzLl9vbkZvY3VzLFxuICAgICAgY29tbWl0OiB0aGlzLl9vbkNoYW5nZSxcbiAgICAgIHVuZG86IHRoaXMuX29uVW5kbyxcbiAgICAgIHJlZG86IHRoaXMuX29uUmVkb1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIFN0b3BzIGxpc3RlbmluZyB0byBlbGVtZW50IGV2ZW50cyAqL1xuICBfdW5iaW5kRXZlbnRzKCkge1xuICAgIGlmICh0aGlzLmVsKSB0aGlzLmVsLnVuYmluZEV2ZW50cygpO1xuICB9XG5cbiAgLyoqIEZpcmVzIGN1c3RvbSBldmVudCAqL1xuICBfZmlyZUV2ZW50KGV2LCBlKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzW2V2XTtcbiAgICBpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xuICAgIGxpc3RlbmVycy5mb3JFYWNoKGwgPT4gbChlKSk7XG4gIH1cblxuICAvKiogQ3VycmVudCBzZWxlY3Rpb24gc3RhcnQgKi9cbiAgZ2V0IHNlbGVjdGlvblN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJzb3JDaGFuZ2luZyA/IHRoaXMuX2NoYW5naW5nQ3Vyc29yUG9zIDogdGhpcy5lbC5zZWxlY3Rpb25TdGFydDtcbiAgfVxuXG4gIC8qKiBDdXJyZW50IGN1cnNvciBwb3NpdGlvbiAqL1xuICBnZXQgY3Vyc29yUG9zKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJzb3JDaGFuZ2luZyA/IHRoaXMuX2NoYW5naW5nQ3Vyc29yUG9zIDogdGhpcy5lbC5zZWxlY3Rpb25FbmQ7XG4gIH1cbiAgc2V0IGN1cnNvclBvcyhwb3MpIHtcbiAgICBpZiAoIXRoaXMuZWwgfHwgIXRoaXMuZWwuaXNBY3RpdmUpIHJldHVybjtcbiAgICB0aGlzLmVsLnNlbGVjdChwb3MsIHBvcyk7XG4gICAgdGhpcy5fc2F2ZVNlbGVjdGlvbigpO1xuICB9XG5cbiAgLyoqIFN0b3JlcyBjdXJyZW50IHNlbGVjdGlvbiAqL1xuICBfc2F2ZVNlbGVjdGlvbiggLyogZXYgKi9cbiAgKSB7XG4gICAgaWYgKHRoaXMuZGlzcGxheVZhbHVlICE9PSB0aGlzLmVsLnZhbHVlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0VsZW1lbnQgdmFsdWUgd2FzIGNoYW5nZWQgb3V0c2lkZSBvZiBtYXNrLiBTeW5jcm9uaXplIG1hc2sgdXNpbmcgYG1hc2sudXBkYXRlVmFsdWUoKWAgdG8gd29yayBwcm9wZXJseS4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGlvbiA9IHtcbiAgICAgIHN0YXJ0OiB0aGlzLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kOiB0aGlzLmN1cnNvclBvc1xuICAgIH07XG4gIH1cblxuICAvKiogU3luY3Jvbml6ZXMgbW9kZWwgdmFsdWUgZnJvbSB2aWV3ICovXG4gIHVwZGF0ZVZhbHVlKCkge1xuICAgIHRoaXMubWFza2VkLnZhbHVlID0gdGhpcy5lbC52YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMubWFza2VkLnZhbHVlO1xuICB9XG5cbiAgLyoqIFN5bmNyb25pemVzIHZpZXcgZnJvbSBtb2RlbCB2YWx1ZSwgZmlyZXMgY2hhbmdlIGV2ZW50cyAqL1xuICB1cGRhdGVDb250cm9sKGN1cnNvclBvcykge1xuICAgIGNvbnN0IG5ld1VubWFza2VkVmFsdWUgPSB0aGlzLm1hc2tlZC51bm1hc2tlZFZhbHVlO1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5tYXNrZWQudmFsdWU7XG4gICAgY29uc3QgbmV3UmF3SW5wdXRWYWx1ZSA9IHRoaXMubWFza2VkLnJhd0lucHV0VmFsdWU7XG4gICAgY29uc3QgbmV3RGlzcGxheVZhbHVlID0gdGhpcy5kaXNwbGF5VmFsdWU7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gdGhpcy51bm1hc2tlZFZhbHVlICE9PSBuZXdVbm1hc2tlZFZhbHVlIHx8IHRoaXMudmFsdWUgIT09IG5ld1ZhbHVlIHx8IHRoaXMuX3Jhd0lucHV0VmFsdWUgIT09IG5ld1Jhd0lucHV0VmFsdWU7XG4gICAgdGhpcy5fdW5tYXNrZWRWYWx1ZSA9IG5ld1VubWFza2VkVmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLl9yYXdJbnB1dFZhbHVlID0gbmV3UmF3SW5wdXRWYWx1ZTtcbiAgICBpZiAodGhpcy5lbC52YWx1ZSAhPT0gbmV3RGlzcGxheVZhbHVlKSB0aGlzLmVsLnZhbHVlID0gbmV3RGlzcGxheVZhbHVlO1xuICAgIGlmIChjdXJzb3JQb3MgPT09ICdhdXRvJykgdGhpcy5hbGlnbkN1cnNvcigpO2Vsc2UgaWYgKGN1cnNvclBvcyAhPSBudWxsKSB0aGlzLmN1cnNvclBvcyA9IGN1cnNvclBvcztcbiAgICBpZiAoaXNDaGFuZ2VkKSB0aGlzLl9maXJlQ2hhbmdlRXZlbnRzKCk7XG4gICAgaWYgKCF0aGlzLl9oaXN0b3J5Q2hhbmdpbmcgJiYgKGlzQ2hhbmdlZCB8fCB0aGlzLmhpc3RvcnkuaXNFbXB0eSkpIHRoaXMuaGlzdG9yeS5wdXNoKHtcbiAgICAgIHVubWFza2VkVmFsdWU6IG5ld1VubWFza2VkVmFsdWUsXG4gICAgICBzZWxlY3Rpb246IHtcbiAgICAgICAgc3RhcnQ6IHRoaXMuc2VsZWN0aW9uU3RhcnQsXG4gICAgICAgIGVuZDogdGhpcy5jdXJzb3JQb3NcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBVcGRhdGVzIG9wdGlvbnMgd2l0aCBkZWVwIGVxdWFsIGNoZWNrLCByZWNyZWF0ZXMge0BsaW5rIE1hc2tlZH0gbW9kZWwgaWYgbWFzayB0eXBlIGNoYW5nZXMgKi9cbiAgdXBkYXRlT3B0aW9ucyhvcHRzKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWFzayxcbiAgICAgIC4uLnJlc3RPcHRzXG4gICAgfSA9IG9wdHM7IC8vIFRPRE8gdHlwZXMsIHllcywgbWFzayBpcyBvcHRpb25hbFxuXG4gICAgY29uc3QgdXBkYXRlTWFzayA9ICF0aGlzLm1hc2tFcXVhbHMobWFzayk7XG4gICAgY29uc3QgdXBkYXRlT3B0cyA9IHRoaXMubWFza2VkLm9wdGlvbnNJc0NoYW5nZWQocmVzdE9wdHMpO1xuICAgIGlmICh1cGRhdGVNYXNrKSB0aGlzLm1hc2sgPSBtYXNrO1xuICAgIGlmICh1cGRhdGVPcHRzKSB0aGlzLm1hc2tlZC51cGRhdGVPcHRpb25zKHJlc3RPcHRzKTsgLy8gVE9ET1xuXG4gICAgaWYgKHVwZGF0ZU1hc2sgfHwgdXBkYXRlT3B0cykgdGhpcy51cGRhdGVDb250cm9sKCk7XG4gIH1cblxuICAvKiogVXBkYXRlcyBjdXJzb3IgKi9cbiAgdXBkYXRlQ3Vyc29yKGN1cnNvclBvcykge1xuICAgIGlmIChjdXJzb3JQb3MgPT0gbnVsbCkgcmV0dXJuO1xuICAgIHRoaXMuY3Vyc29yUG9zID0gY3Vyc29yUG9zO1xuXG4gICAgLy8gYWxzbyBxdWV1ZSBjaGFuZ2UgY3Vyc29yIGZvciBtb2JpbGUgYnJvd3NlcnNcbiAgICB0aGlzLl9kZWxheVVwZGF0ZUN1cnNvcihjdXJzb3JQb3MpO1xuICB9XG5cbiAgLyoqIERlbGF5cyBjdXJzb3IgdXBkYXRlIHRvIHN1cHBvcnQgbW9iaWxlIGJyb3dzZXJzICovXG4gIF9kZWxheVVwZGF0ZUN1cnNvcihjdXJzb3JQb3MpIHtcbiAgICB0aGlzLl9hYm9ydFVwZGF0ZUN1cnNvcigpO1xuICAgIHRoaXMuX2NoYW5naW5nQ3Vyc29yUG9zID0gY3Vyc29yUG9zO1xuICAgIHRoaXMuX2N1cnNvckNoYW5naW5nID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZWwpIHJldHVybjsgLy8gaWYgd2FzIGRlc3Ryb3llZFxuICAgICAgdGhpcy5jdXJzb3JQb3MgPSB0aGlzLl9jaGFuZ2luZ0N1cnNvclBvcztcbiAgICAgIHRoaXMuX2Fib3J0VXBkYXRlQ3Vyc29yKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLyoqIEZpcmVzIGN1c3RvbSBldmVudHMgKi9cbiAgX2ZpcmVDaGFuZ2VFdmVudHMoKSB7XG4gICAgdGhpcy5fZmlyZUV2ZW50KCdhY2NlcHQnLCB0aGlzLl9pbnB1dEV2ZW50KTtcbiAgICBpZiAodGhpcy5tYXNrZWQuaXNDb21wbGV0ZSkgdGhpcy5fZmlyZUV2ZW50KCdjb21wbGV0ZScsIHRoaXMuX2lucHV0RXZlbnQpO1xuICB9XG5cbiAgLyoqIEFib3J0cyBkZWxheWVkIGN1cnNvciB1cGRhdGUgKi9cbiAgX2Fib3J0VXBkYXRlQ3Vyc29yKCkge1xuICAgIGlmICh0aGlzLl9jdXJzb3JDaGFuZ2luZykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2N1cnNvckNoYW5naW5nKTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9jdXJzb3JDaGFuZ2luZztcbiAgICB9XG4gIH1cblxuICAvKiogQWxpZ25zIGN1cnNvciB0byBuZWFyZXN0IGF2YWlsYWJsZSBwb3NpdGlvbiAqL1xuICBhbGlnbkN1cnNvcigpIHtcbiAgICB0aGlzLmN1cnNvclBvcyA9IHRoaXMubWFza2VkLm5lYXJlc3RJbnB1dFBvcyh0aGlzLm1hc2tlZC5uZWFyZXN0SW5wdXRQb3ModGhpcy5jdXJzb3JQb3MsIERJUkVDVElPTi5MRUZUKSk7XG4gIH1cblxuICAvKiogQWxpZ25zIGN1cnNvciBvbmx5IGlmIHNlbGVjdGlvbiBpcyBlbXB0eSAqL1xuICBhbGlnbkN1cnNvckZyaWVuZGx5KCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGlvblN0YXJ0ICE9PSB0aGlzLmN1cnNvclBvcykgcmV0dXJuOyAvLyBza2lwIGlmIHJhbmdlIGlzIHNlbGVjdGVkXG4gICAgdGhpcy5hbGlnbkN1cnNvcigpO1xuICB9XG5cbiAgLyoqIEFkZHMgbGlzdGVuZXIgb24gY3VzdG9tIGV2ZW50ICovXG4gIG9uKGV2LCBoYW5kbGVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbZXZdKSB0aGlzLl9saXN0ZW5lcnNbZXZdID0gW107XG4gICAgdGhpcy5fbGlzdGVuZXJzW2V2XS5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIFJlbW92ZXMgY3VzdG9tIGV2ZW50IGxpc3RlbmVyICovXG4gIG9mZihldiwgaGFuZGxlcikge1xuICAgIGlmICghdGhpcy5fbGlzdGVuZXJzW2V2XSkgcmV0dXJuIHRoaXM7XG4gICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW2V2XTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjb25zdCBoSW5kZXggPSB0aGlzLl9saXN0ZW5lcnNbZXZdLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGhJbmRleCA+PSAwKSB0aGlzLl9saXN0ZW5lcnNbZXZdLnNwbGljZShoSW5kZXgsIDEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgdmlldyBpbnB1dCBldmVudCAqL1xuICBfb25JbnB1dChlKSB7XG4gICAgdGhpcy5faW5wdXRFdmVudCA9IGU7XG4gICAgdGhpcy5fYWJvcnRVcGRhdGVDdXJzb3IoKTtcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IEFjdGlvbkRldGFpbHMoe1xuICAgICAgLy8gbmV3IHN0YXRlXG4gICAgICB2YWx1ZTogdGhpcy5lbC52YWx1ZSxcbiAgICAgIGN1cnNvclBvczogdGhpcy5jdXJzb3JQb3MsXG4gICAgICAvLyBvbGQgc3RhdGVcbiAgICAgIG9sZFZhbHVlOiB0aGlzLmRpc3BsYXlWYWx1ZSxcbiAgICAgIG9sZFNlbGVjdGlvbjogdGhpcy5fc2VsZWN0aW9uXG4gICAgfSk7XG4gICAgY29uc3Qgb2xkUmF3VmFsdWUgPSB0aGlzLm1hc2tlZC5yYXdJbnB1dFZhbHVlO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMubWFza2VkLnNwbGljZShkZXRhaWxzLnN0YXJ0Q2hhbmdlUG9zLCBkZXRhaWxzLnJlbW92ZWQubGVuZ3RoLCBkZXRhaWxzLmluc2VydGVkLCBkZXRhaWxzLnJlbW92ZURpcmVjdGlvbiwge1xuICAgICAgaW5wdXQ6IHRydWUsXG4gICAgICByYXc6IHRydWVcbiAgICB9KS5vZmZzZXQ7XG5cbiAgICAvLyBmb3JjZSBhbGlnbiBpbiByZW1vdmUgZGlyZWN0aW9uIG9ubHkgaWYgbm8gaW5wdXQgY2hhcnMgd2VyZSByZW1vdmVkXG4gICAgLy8gb3RoZXJ3aXNlIHdlIHN0aWxsIG5lZWQgdG8gYWxpZ24gd2l0aCBOT05FICh0byBnZXQgb3V0IGZyb20gZml4ZWQgc3ltYm9scyBmb3IgaW5zdGFuY2UpXG4gICAgY29uc3QgcmVtb3ZlRGlyZWN0aW9uID0gb2xkUmF3VmFsdWUgPT09IHRoaXMubWFza2VkLnJhd0lucHV0VmFsdWUgPyBkZXRhaWxzLnJlbW92ZURpcmVjdGlvbiA6IERJUkVDVElPTi5OT05FO1xuICAgIGxldCBjdXJzb3JQb3MgPSB0aGlzLm1hc2tlZC5uZWFyZXN0SW5wdXRQb3MoZGV0YWlscy5zdGFydENoYW5nZVBvcyArIG9mZnNldCwgcmVtb3ZlRGlyZWN0aW9uKTtcbiAgICBpZiAocmVtb3ZlRGlyZWN0aW9uICE9PSBESVJFQ1RJT04uTk9ORSkgY3Vyc29yUG9zID0gdGhpcy5tYXNrZWQubmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgRElSRUNUSU9OLk5PTkUpO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbChjdXJzb3JQb3MpO1xuICAgIGRlbGV0ZSB0aGlzLl9pbnB1dEV2ZW50O1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgdmlldyBjaGFuZ2UgZXZlbnQgYW5kIGNvbW1pdHMgbW9kZWwgdmFsdWUgKi9cbiAgX29uQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLmRpc3BsYXlWYWx1ZSAhPT0gdGhpcy5lbC52YWx1ZSkge1xuICAgICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICAgIH1cbiAgICB0aGlzLm1hc2tlZC5kb0NvbW1pdCgpO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbCgpO1xuICAgIHRoaXMuX3NhdmVTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIHZpZXcgZHJvcCBldmVudCwgcHJldmVudHMgYnkgZGVmYXVsdCAqL1xuICBfb25Ecm9wKGV2KSB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIC8qKiBSZXN0b3JlIGxhc3Qgc2VsZWN0aW9uIG9uIGZvY3VzICovXG4gIF9vbkZvY3VzKGV2KSB7XG4gICAgdGhpcy5hbGlnbkN1cnNvckZyaWVuZGx5KCk7XG4gIH1cblxuICAvKiogUmVzdG9yZSBsYXN0IHNlbGVjdGlvbiBvbiBmb2N1cyAqL1xuICBfb25DbGljayhldikge1xuICAgIHRoaXMuYWxpZ25DdXJzb3JGcmllbmRseSgpO1xuICB9XG4gIF9vblVuZG8oKSB7XG4gICAgdGhpcy5fYXBwbHlIaXN0b3J5U3RhdGUodGhpcy5oaXN0b3J5LnVuZG8oKSk7XG4gIH1cbiAgX29uUmVkbygpIHtcbiAgICB0aGlzLl9hcHBseUhpc3RvcnlTdGF0ZSh0aGlzLmhpc3RvcnkucmVkbygpKTtcbiAgfVxuICBfYXBwbHlIaXN0b3J5U3RhdGUoc3RhdGUpIHtcbiAgICBpZiAoIXN0YXRlKSByZXR1cm47XG4gICAgdGhpcy5faGlzdG9yeUNoYW5naW5nID0gdHJ1ZTtcbiAgICB0aGlzLnVubWFza2VkVmFsdWUgPSBzdGF0ZS51bm1hc2tlZFZhbHVlO1xuICAgIHRoaXMuZWwuc2VsZWN0KHN0YXRlLnNlbGVjdGlvbi5zdGFydCwgc3RhdGUuc2VsZWN0aW9uLmVuZCk7XG4gICAgdGhpcy5fc2F2ZVNlbGVjdGlvbigpO1xuICAgIHRoaXMuX2hpc3RvcnlDaGFuZ2luZyA9IGZhbHNlO1xuICB9XG5cbiAgLyoqIFVuYmluZCB2aWV3IGV2ZW50cyBhbmQgcmVtb3ZlcyBlbGVtZW50IHJlZmVyZW5jZSAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX3VuYmluZEV2ZW50cygpO1xuICAgIHRoaXMuX2xpc3RlbmVycy5sZW5ndGggPSAwO1xuICAgIGRlbGV0ZSB0aGlzLmVsO1xuICB9XG59XG5JTWFzay5JbnB1dE1hc2sgPSBJbnB1dE1hc2s7XG5cbmV4cG9ydCB7IElucHV0TWFzayBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuXG4vKiogIEdlbmVyaWMgZWxlbWVudCBBUEkgdG8gdXNlIHdpdGggbWFzayAqL1xuY2xhc3MgTWFza0VsZW1lbnQge1xuICAvKiogKi9cblxuICAvKiogKi9cblxuICAvKiogKi9cblxuICAvKiogU2FmZWx5IHJldHVybnMgc2VsZWN0aW9uIHN0YXJ0ICovXG4gIGdldCBzZWxlY3Rpb25TdGFydCgpIHtcbiAgICBsZXQgc3RhcnQ7XG4gICAgdHJ5IHtcbiAgICAgIHN0YXJ0ID0gdGhpcy5fdW5zYWZlU2VsZWN0aW9uU3RhcnQ7XG4gICAgfSBjYXRjaCB7fVxuICAgIHJldHVybiBzdGFydCAhPSBudWxsID8gc3RhcnQgOiB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgfVxuXG4gIC8qKiBTYWZlbHkgcmV0dXJucyBzZWxlY3Rpb24gZW5kICovXG4gIGdldCBzZWxlY3Rpb25FbmQoKSB7XG4gICAgbGV0IGVuZDtcbiAgICB0cnkge1xuICAgICAgZW5kID0gdGhpcy5fdW5zYWZlU2VsZWN0aW9uRW5kO1xuICAgIH0gY2F0Y2gge31cbiAgICByZXR1cm4gZW5kICE9IG51bGwgPyBlbmQgOiB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgfVxuXG4gIC8qKiBTYWZlbHkgc2V0cyBlbGVtZW50IHNlbGVjdGlvbiAqL1xuICBzZWxlY3Qoc3RhcnQsIGVuZCkge1xuICAgIGlmIChzdGFydCA9PSBudWxsIHx8IGVuZCA9PSBudWxsIHx8IHN0YXJ0ID09PSB0aGlzLnNlbGVjdGlvblN0YXJ0ICYmIGVuZCA9PT0gdGhpcy5zZWxlY3Rpb25FbmQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fdW5zYWZlU2VsZWN0KHN0YXJ0LCBlbmQpO1xuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8qKiAqL1xuICBnZXQgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xufVxuSU1hc2suTWFza0VsZW1lbnQgPSBNYXNrRWxlbWVudDtcblxuZXhwb3J0IHsgTWFza0VsZW1lbnQgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbi8qKiBQcm92aWRlcyBkZXRhaWxzIG9mIGNoYW5naW5nIGlucHV0ICovXG5jbGFzcyBBY3Rpb25EZXRhaWxzIHtcbiAgLyoqIEN1cnJlbnQgaW5wdXQgdmFsdWUgKi9cblxuICAvKiogQ3VycmVudCBjdXJzb3IgcG9zaXRpb24gKi9cblxuICAvKiogT2xkIGlucHV0IHZhbHVlICovXG5cbiAgLyoqIE9sZCBzZWxlY3Rpb24gKi9cblxuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBvcHRzKTtcblxuICAgIC8vIGRvdWJsZSBjaGVjayBpZiBsZWZ0IHBhcnQgd2FzIGNoYW5nZWQgKGF1dG9maWxsaW5nLCBvdGhlciBub24tc3RhbmRhcmQgaW5wdXQgdHJpZ2dlcnMpXG4gICAgd2hpbGUgKHRoaXMudmFsdWUuc2xpY2UoMCwgdGhpcy5zdGFydENoYW5nZVBvcykgIT09IHRoaXMub2xkVmFsdWUuc2xpY2UoMCwgdGhpcy5zdGFydENoYW5nZVBvcykpIHtcbiAgICAgIC0tdGhpcy5vbGRTZWxlY3Rpb24uc3RhcnQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmluc2VydGVkQ291bnQpIHtcbiAgICAgIC8vIGRvdWJsZSBjaGVjayByaWdodCBwYXJ0XG4gICAgICB3aGlsZSAodGhpcy52YWx1ZS5zbGljZSh0aGlzLmN1cnNvclBvcykgIT09IHRoaXMub2xkVmFsdWUuc2xpY2UodGhpcy5vbGRTZWxlY3Rpb24uZW5kKSkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggLSB0aGlzLmN1cnNvclBvcyA8IHRoaXMub2xkVmFsdWUubGVuZ3RoIC0gdGhpcy5vbGRTZWxlY3Rpb24uZW5kKSArK3RoaXMub2xkU2VsZWN0aW9uLmVuZDtlbHNlICsrdGhpcy5jdXJzb3JQb3M7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIFN0YXJ0IGNoYW5naW5nIHBvc2l0aW9uICovXG4gIGdldCBzdGFydENoYW5nZVBvcygpIHtcbiAgICByZXR1cm4gTWF0aC5taW4odGhpcy5jdXJzb3JQb3MsIHRoaXMub2xkU2VsZWN0aW9uLnN0YXJ0KTtcbiAgfVxuXG4gIC8qKiBJbnNlcnRlZCBzeW1ib2xzIGNvdW50ICovXG4gIGdldCBpbnNlcnRlZENvdW50KCkge1xuICAgIHJldHVybiB0aGlzLmN1cnNvclBvcyAtIHRoaXMuc3RhcnRDaGFuZ2VQb3M7XG4gIH1cblxuICAvKiogSW5zZXJ0ZWQgc3ltYm9scyAqL1xuICBnZXQgaW5zZXJ0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUuc3Vic3RyKHRoaXMuc3RhcnRDaGFuZ2VQb3MsIHRoaXMuaW5zZXJ0ZWRDb3VudCk7XG4gIH1cblxuICAvKiogUmVtb3ZlZCBzeW1ib2xzIGNvdW50ICovXG4gIGdldCByZW1vdmVkQ291bnQoKSB7XG4gICAgLy8gTWF0aC5tYXggZm9yIG9wcG9zaXRlIG9wZXJhdGlvblxuICAgIHJldHVybiBNYXRoLm1heCh0aGlzLm9sZFNlbGVjdGlvbi5lbmQgLSB0aGlzLnN0YXJ0Q2hhbmdlUG9zIHx8XG4gICAgLy8gZm9yIERlbGV0ZVxuICAgIHRoaXMub2xkVmFsdWUubGVuZ3RoIC0gdGhpcy52YWx1ZS5sZW5ndGgsIDApO1xuICB9XG5cbiAgLyoqIFJlbW92ZWQgc3ltYm9scyAqL1xuICBnZXQgcmVtb3ZlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5vbGRWYWx1ZS5zdWJzdHIodGhpcy5zdGFydENoYW5nZVBvcywgdGhpcy5yZW1vdmVkQ291bnQpO1xuICB9XG5cbiAgLyoqIFVuY2hhbmdlZCBoZWFkIHN5bWJvbHMgKi9cbiAgZ2V0IGhlYWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUuc3Vic3RyaW5nKDAsIHRoaXMuc3RhcnRDaGFuZ2VQb3MpO1xuICB9XG5cbiAgLyoqIFVuY2hhbmdlZCB0YWlsIHN5bWJvbHMgKi9cbiAgZ2V0IHRhaWwoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWUuc3Vic3RyaW5nKHRoaXMuc3RhcnRDaGFuZ2VQb3MgKyB0aGlzLmluc2VydGVkQ291bnQpO1xuICB9XG5cbiAgLyoqIFJlbW92ZSBkaXJlY3Rpb24gKi9cbiAgZ2V0IHJlbW92ZURpcmVjdGlvbigpIHtcbiAgICBpZiAoIXRoaXMucmVtb3ZlZENvdW50IHx8IHRoaXMuaW5zZXJ0ZWRDb3VudCkgcmV0dXJuIERJUkVDVElPTi5OT05FO1xuXG4gICAgLy8gYWxpZ24gcmlnaHQgaWYgZGVsZXRlIGF0IHJpZ2h0XG4gICAgcmV0dXJuICh0aGlzLm9sZFNlbGVjdGlvbi5lbmQgPT09IHRoaXMuY3Vyc29yUG9zIHx8IHRoaXMub2xkU2VsZWN0aW9uLnN0YXJ0ID09PSB0aGlzLmN1cnNvclBvcykgJiZcbiAgICAvLyBpZiBub3QgcmFuZ2UgcmVtb3ZlZCAoZXZlbnQgd2l0aCBiYWNrc3BhY2UpXG4gICAgdGhpcy5vbGRTZWxlY3Rpb24uZW5kID09PSB0aGlzLm9sZFNlbGVjdGlvbi5zdGFydCA/IERJUkVDVElPTi5SSUdIVCA6IERJUkVDVElPTi5MRUZUO1xuICB9XG59XG5cbmV4cG9ydCB7IEFjdGlvbkRldGFpbHMgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IElNYXNrIGZyb20gJy4vaG9sZGVyLmpzJztcblxuLyoqIFByb3ZpZGVzIGRldGFpbHMgb2YgY2hhbmdpbmcgbW9kZWwgdmFsdWUgKi9cbmNsYXNzIENoYW5nZURldGFpbHMge1xuICAvKiogSW5zZXJ0ZWQgc3ltYm9scyAqL1xuXG4gIC8qKiBBZGRpdGlvbmFsIG9mZnNldCBpZiBhbnkgY2hhbmdlcyBvY2N1cnJlZCBiZWZvcmUgdGFpbCAqL1xuXG4gIC8qKiBSYXcgaW5zZXJ0ZWQgaXMgdXNlZCBieSBkeW5hbWljIG1hc2sgKi9cblxuICAvKiogQ2FuIHNraXAgY2hhcnMgKi9cblxuICBzdGF0aWMgbm9ybWFsaXplKHByZXApIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwcmVwKSA/IHByZXAgOiBbcHJlcCwgbmV3IENoYW5nZURldGFpbHMoKV07XG4gIH1cbiAgY29uc3RydWN0b3IoZGV0YWlscykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgaW5zZXJ0ZWQ6ICcnLFxuICAgICAgcmF3SW5zZXJ0ZWQ6ICcnLFxuICAgICAgdGFpbFNoaWZ0OiAwLFxuICAgICAgc2tpcDogZmFsc2VcbiAgICB9LCBkZXRhaWxzKTtcbiAgfVxuXG4gIC8qKiBBZ2dyZWdhdGUgY2hhbmdlcyAqL1xuICBhZ2dyZWdhdGUoZGV0YWlscykge1xuICAgIHRoaXMuaW5zZXJ0ZWQgKz0gZGV0YWlscy5pbnNlcnRlZDtcbiAgICB0aGlzLnJhd0luc2VydGVkICs9IGRldGFpbHMucmF3SW5zZXJ0ZWQ7XG4gICAgdGhpcy50YWlsU2hpZnQgKz0gZGV0YWlscy50YWlsU2hpZnQ7XG4gICAgdGhpcy5za2lwID0gdGhpcy5za2lwIHx8IGRldGFpbHMuc2tpcDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKiBUb3RhbCBvZmZzZXQgY29uc2lkZXJpbmcgYWxsIGNoYW5nZXMgKi9cbiAgZ2V0IG9mZnNldCgpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsU2hpZnQgKyB0aGlzLmluc2VydGVkLmxlbmd0aDtcbiAgfVxuICBnZXQgY29uc3VtZWQoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5yYXdJbnNlcnRlZCkgfHwgdGhpcy5za2lwO1xuICB9XG4gIGVxdWFscyhkZXRhaWxzKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0ZWQgPT09IGRldGFpbHMuaW5zZXJ0ZWQgJiYgdGhpcy50YWlsU2hpZnQgPT09IGRldGFpbHMudGFpbFNoaWZ0ICYmIHRoaXMucmF3SW5zZXJ0ZWQgPT09IGRldGFpbHMucmF3SW5zZXJ0ZWQgJiYgdGhpcy5za2lwID09PSBkZXRhaWxzLnNraXA7XG4gIH1cbn1cbklNYXNrLkNoYW5nZURldGFpbHMgPSBDaGFuZ2VEZXRhaWxzO1xuXG5leHBvcnQgeyBDaGFuZ2VEZXRhaWxzIGFzIGRlZmF1bHQgfTtcbiIsIi8qKiBQcm92aWRlcyBkZXRhaWxzIG9mIGNvbnRpbnVvdXMgZXh0cmFjdGVkIHRhaWwgKi9cbmNsYXNzIENvbnRpbnVvdXNUYWlsRGV0YWlscyB7XG4gIC8qKiBUYWlsIHZhbHVlIGFzIHN0cmluZyAqL1xuXG4gIC8qKiBUYWlsIHN0YXJ0IHBvc2l0aW9uICovXG5cbiAgLyoqIFN0YXJ0IHBvc2l0aW9uICovXG5cbiAgY29uc3RydWN0b3IodmFsdWUsIGZyb20sIHN0b3ApIHtcbiAgICBpZiAodmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgdmFsdWUgPSAnJztcbiAgICB9XG4gICAgaWYgKGZyb20gPT09IHZvaWQgMCkge1xuICAgICAgZnJvbSA9IDA7XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgIHRoaXMuc3RvcCA9IHN0b3A7XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cbiAgZXh0ZW5kKHRhaWwpIHtcbiAgICB0aGlzLnZhbHVlICs9IFN0cmluZyh0YWlsKTtcbiAgfVxuICBhcHBlbmRUbyhtYXNrZWQpIHtcbiAgICByZXR1cm4gbWFza2VkLmFwcGVuZCh0aGlzLnRvU3RyaW5nKCksIHtcbiAgICAgIHRhaWw6IHRydWVcbiAgICB9KS5hZ2dyZWdhdGUobWFza2VkLl9hcHBlbmRQbGFjZWhvbGRlcigpKTtcbiAgfVxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgZnJvbTogdGhpcy5mcm9tLFxuICAgICAgc3RvcDogdGhpcy5zdG9wXG4gICAgfTtcbiAgfVxuICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHN0YXRlKTtcbiAgfVxuICB1bnNoaWZ0KGJlZm9yZVBvcykge1xuICAgIGlmICghdGhpcy52YWx1ZS5sZW5ndGggfHwgYmVmb3JlUG9zICE9IG51bGwgJiYgdGhpcy5mcm9tID49IGJlZm9yZVBvcykgcmV0dXJuICcnO1xuICAgIGNvbnN0IHNoaWZ0Q2hhciA9IHRoaXMudmFsdWVbMF07XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuc2xpY2UoMSk7XG4gICAgcmV0dXJuIHNoaWZ0Q2hhcjtcbiAgfVxuICBzaGlmdCgpIHtcbiAgICBpZiAoIXRoaXMudmFsdWUubGVuZ3RoKSByZXR1cm4gJyc7XG4gICAgY29uc3Qgc2hpZnRDaGFyID0gdGhpcy52YWx1ZVt0aGlzLnZhbHVlLmxlbmd0aCAtIDFdO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLnNsaWNlKDAsIC0xKTtcbiAgICByZXR1cm4gc2hpZnRDaGFyO1xuICB9XG59XG5cbmV4cG9ydCB7IENvbnRpbnVvdXNUYWlsRGV0YWlscyBhcyBkZWZhdWx0IH07XG4iLCIvKiogQXBwbGllcyBtYXNrIG9uIGVsZW1lbnQgKi9cbmZ1bmN0aW9uIElNYXNrKGVsLCBvcHRzKSB7XG4gIC8vIGN1cnJlbnRseSBhdmFpbGFibGUgb25seSBmb3IgaW5wdXQtbGlrZSBlbGVtZW50c1xuICByZXR1cm4gbmV3IElNYXNrLklucHV0TWFzayhlbCwgb3B0cyk7XG59XG5cbmV4cG9ydCB7IElNYXNrIGFzIGRlZmF1bHQgfTtcbiIsIi8qKiBDaGVja3MgaWYgdmFsdWUgaXMgc3RyaW5nICovXG5mdW5jdGlvbiBpc1N0cmluZyhzdHIpIHtcbiAgcmV0dXJuIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnIHx8IHN0ciBpbnN0YW5jZW9mIFN0cmluZztcbn1cblxuLyoqIENoZWNrcyBpZiB2YWx1ZSBpcyBvYmplY3QgKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICB2YXIgX29iaiRjb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPSBudWxsICYmIChvYmogPT0gbnVsbCB8fCAoX29iaiRjb25zdHJ1Y3RvciA9IG9iai5jb25zdHJ1Y3RvcikgPT0gbnVsbCA/IHZvaWQgMCA6IF9vYmokY29uc3RydWN0b3IubmFtZSkgPT09ICdPYmplY3QnO1xufVxuZnVuY3Rpb24gcGljayhvYmosIGtleXMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoa2V5cykpIHJldHVybiBwaWNrKG9iaiwgKF8sIGspID0+IGtleXMuaW5jbHVkZXMoaykpO1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMob2JqKS5yZWR1Y2UoKGFjYywgX3JlZikgPT4ge1xuICAgIGxldCBbaywgdl0gPSBfcmVmO1xuICAgIGlmIChrZXlzKHYsIGspKSBhY2Nba10gPSB2O1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn1cblxuLyoqIERpcmVjdGlvbiAqL1xuY29uc3QgRElSRUNUSU9OID0ge1xuICBOT05FOiAnTk9ORScsXG4gIExFRlQ6ICdMRUZUJyxcbiAgRk9SQ0VfTEVGVDogJ0ZPUkNFX0xFRlQnLFxuICBSSUdIVDogJ1JJR0hUJyxcbiAgRk9SQ0VfUklHSFQ6ICdGT1JDRV9SSUdIVCdcbn07XG5cbi8qKiBEaXJlY3Rpb24gKi9cblxuZnVuY3Rpb24gZm9yY2VEaXJlY3Rpb24oZGlyZWN0aW9uKSB7XG4gIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgY2FzZSBESVJFQ1RJT04uTEVGVDpcbiAgICAgIHJldHVybiBESVJFQ1RJT04uRk9SQ0VfTEVGVDtcbiAgICBjYXNlIERJUkVDVElPTi5SSUdIVDpcbiAgICAgIHJldHVybiBESVJFQ1RJT04uRk9SQ0VfUklHSFQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gIH1cbn1cblxuLyoqIEVzY2FwZXMgcmVndWxhciBleHByZXNzaW9uIGNvbnRyb2wgY2hhcnMgKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4qKz9ePSE6JHt9KCl8W1xcXS9cXFxcXSkvZywgJ1xcXFwkMScpO1xufVxuXG4vLyBjbG9uZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZXBvYmVyZXpraW4vZmFzdC1kZWVwLWVxdWFsIHdpdGggc21hbGwgY2hhbmdlc1xuZnVuY3Rpb24gb2JqZWN0SW5jbHVkZXMoYiwgYSkge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG4gIGNvbnN0IGFyckEgPSBBcnJheS5pc0FycmF5KGEpLFxuICAgIGFyckIgPSBBcnJheS5pc0FycmF5KGIpO1xuICBsZXQgaTtcbiAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgIGlmIChhLmxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSBpZiAoIW9iamVjdEluY2x1ZGVzKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlLFxuICAgICAgZGF0ZUIgPSBiIGluc3RhbmNlb2YgRGF0ZTtcbiAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBhLmdldFRpbWUoKSA9PSBiLmdldFRpbWUoKTtcbiAgICBpZiAoZGF0ZUEgIT0gZGF0ZUIpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCByZWdleHBBID0gYSBpbnN0YW5jZW9mIFJlZ0V4cCxcbiAgICAgIHJlZ2V4cEIgPSBiIGluc3RhbmNlb2YgUmVnRXhwO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuICAgIGlmIChyZWdleHBBICE9IHJlZ2V4cEIpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gICAgLy8gaWYgKGtleXMubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSBpZiAoIW9iamVjdEluY2x1ZGVzKGJba2V5c1tpXV0sIGFba2V5c1tpXV0pKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGEudG9TdHJpbmcoKSA9PT0gYi50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqIFNlbGVjdGlvbiByYW5nZSAqL1xuXG5leHBvcnQgeyBESVJFQ1RJT04sIGVzY2FwZVJlZ0V4cCwgZm9yY2VEaXJlY3Rpb24sIGlzT2JqZWN0LCBpc1N0cmluZywgb2JqZWN0SW5jbHVkZXMsIHBpY2sgfTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgSW5wdXRNYXNrIH0gZnJvbSAnLi9jb250cm9scy9pbnB1dC5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi9jb3JlL2hvbGRlci5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEhUTUxDb250ZW50ZWRpdGFibGVNYXNrRWxlbWVudCB9IGZyb20gJy4vY29udHJvbHMvaHRtbC1jb250ZW50ZWRpdGFibGUtbWFzay1lbGVtZW50LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSFRNTElucHV0TWFza0VsZW1lbnQgfSBmcm9tICcuL2NvbnRyb2xzL2h0bWwtaW5wdXQtbWFzay1lbGVtZW50LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSFRNTE1hc2tFbGVtZW50IH0gZnJvbSAnLi9jb250cm9scy9odG1sLW1hc2stZWxlbWVudC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hc2tFbGVtZW50IH0gZnJvbSAnLi9jb250cm9scy9tYXNrLWVsZW1lbnQuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDaGFuZ2VEZXRhaWxzIH0gZnJvbSAnLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmV4cG9ydCB7IERJUkVDVElPTiwgZm9yY2VEaXJlY3Rpb24gfSBmcm9tICcuL2NvcmUvdXRpbHMuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXNrZWQgfSBmcm9tICcuL21hc2tlZC9iYXNlLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFza2VkRGF0ZSB9IGZyb20gJy4vbWFza2VkL2RhdGUuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXNrZWREeW5hbWljIH0gZnJvbSAnLi9tYXNrZWQvZHluYW1pYy5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hc2tlZEVudW0gfSBmcm9tICcuL21hc2tlZC9lbnVtLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgY3JlYXRlTWFzaywgbm9ybWFsaXplT3B0cyB9IGZyb20gJy4vbWFza2VkL2ZhY3RvcnkuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXNrZWRGdW5jdGlvbiB9IGZyb20gJy4vbWFza2VkL2Z1bmN0aW9uLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFza2VkTnVtYmVyIH0gZnJvbSAnLi9tYXNrZWQvbnVtYmVyLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFza2VkUGF0dGVybiB9IGZyb20gJy4vbWFza2VkL3BhdHRlcm4uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBDaHVua3NUYWlsRGV0YWlscyB9IGZyb20gJy4vbWFza2VkL3BhdHRlcm4vY2h1bmstdGFpbC1kZXRhaWxzLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF0dGVybkZpeGVkRGVmaW5pdGlvbiB9IGZyb20gJy4vbWFza2VkL3BhdHRlcm4vZml4ZWQtZGVmaW5pdGlvbi5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFBhdHRlcm5JbnB1dERlZmluaXRpb24gfSBmcm9tICcuL21hc2tlZC9wYXR0ZXJuL2lucHV0LWRlZmluaXRpb24uanMnO1xuZXhwb3J0IHsgUElQRV9UWVBFLCBjcmVhdGVQaXBlLCBwaXBlIH0gZnJvbSAnLi9tYXNrZWQvcGlwZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hc2tlZFJhbmdlIH0gZnJvbSAnLi9tYXNrZWQvcmFuZ2UuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXNrZWRSZWdFeHAgfSBmcm9tICcuL21hc2tlZC9yZWdleHAuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBSZXBlYXRCbG9jayB9IGZyb20gJy4vbWFza2VkL3JlcGVhdC5qcyc7XG5pbXBvcnQgJy4vY29yZS9hY3Rpb24tZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vY29udHJvbHMvaW5wdXQtaGlzdG9yeS5qcyc7XG5pbXBvcnQgJy4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vbWFza2VkL3BhdHRlcm4vY3Vyc29yLmpzJztcblxudHJ5IHtcbiAgZ2xvYmFsVGhpcy5JTWFzayA9IElNYXNrO1xufSBjYXRjaCB7fVxuXG5leHBvcnQgeyBJTWFzayBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgQ2hhbmdlRGV0YWlscyBmcm9tICcuLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCBDb250aW51b3VzVGFpbERldGFpbHMgZnJvbSAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgeyBpc1N0cmluZywgRElSRUNUSU9OLCBvYmplY3RJbmNsdWRlcywgZm9yY2VEaXJlY3Rpb24gfSBmcm9tICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5cbi8qKiBBcHBlbmQgZmxhZ3MgKi9cblxuLyoqIEV4dHJhY3QgZmxhZ3MgKi9cblxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNjIyM1xuXG4vKiogUHJvdmlkZXMgY29tbW9uIG1hc2tpbmcgc3R1ZmYgKi9cbmNsYXNzIE1hc2tlZCB7XG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiBUcmFuc2Zvcm1zIHZhbHVlIGJlZm9yZSBtYXNrIHByb2Nlc3NpbmcgKi9cblxuICAvKiogVHJhbnNmb3JtcyBlYWNoIGNoYXIgYmVmb3JlIG1hc2sgcHJvY2Vzc2luZyAqL1xuXG4gIC8qKiBWYWxpZGF0ZXMgaWYgdmFsdWUgaXMgYWNjZXB0YWJsZSAqL1xuXG4gIC8qKiBEb2VzIGFkZGl0aW9uYWwgcHJvY2Vzc2luZyBhdCB0aGUgZW5kIG9mIGVkaXRpbmcgKi9cblxuICAvKiogRm9ybWF0IHR5cGVkIHZhbHVlIHRvIHN0cmluZyAqL1xuXG4gIC8qKiBQYXJzZSBzdHJpbmcgdG8gZ2V0IHR5cGVkIHZhbHVlICovXG5cbiAgLyoqIEVuYWJsZSBjaGFyYWN0ZXJzIG92ZXJ3cml0aW5nICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gICAgdGhpcy5fdXBkYXRlKHtcbiAgICAgIC4uLk1hc2tlZC5ERUZBVUxUUyxcbiAgICAgIC4uLm9wdHNcbiAgICB9KTtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKiogU2V0cyBhbmQgYXBwbGllcyBuZXcgb3B0aW9ucyAqL1xuICB1cGRhdGVPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9uc0lzQ2hhbmdlZChvcHRzKSkgcmV0dXJuO1xuICAgIHRoaXMud2l0aFZhbHVlUmVmcmVzaCh0aGlzLl91cGRhdGUuYmluZCh0aGlzLCBvcHRzKSk7XG4gIH1cblxuICAvKiogU2V0cyBuZXcgb3B0aW9ucyAqL1xuICBfdXBkYXRlKG9wdHMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdHMpO1xuICB9XG5cbiAgLyoqIE1hc2sgc3RhdGUgKi9cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBfdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBfcmF3SW5wdXRWYWx1ZTogdGhpcy5yYXdJbnB1dFZhbHVlXG4gICAgfTtcbiAgfVxuICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHN0YXRlLl92YWx1ZTtcbiAgfVxuXG4gIC8qKiBSZXNldHMgdmFsdWUgKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMucmVzb2x2ZSh2YWx1ZSwge1xuICAgICAgaW5wdXQ6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBSZXNvbHZlIG5ldyB2YWx1ZSAqL1xuICByZXNvbHZlKHZhbHVlLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHtcbiAgICAgICAgaW5wdXQ6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLmFwcGVuZCh2YWx1ZSwgZmxhZ3MsICcnKTtcbiAgICB0aGlzLmRvQ29tbWl0KCk7XG4gIH1cbiAgZ2V0IHVubWFza2VkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cbiAgc2V0IHVubWFza2VkVmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnJlc29sdmUodmFsdWUsIHt9KTtcbiAgfVxuICBnZXQgdHlwZWRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZSA/IHRoaXMucGFyc2UodGhpcy52YWx1ZSwgdGhpcykgOiB0aGlzLnVubWFza2VkVmFsdWU7XG4gIH1cbiAgc2V0IHR5cGVkVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5mb3JtYXQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmZvcm1hdCh2YWx1ZSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5tYXNrZWRWYWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFZhbHVlIHRoYXQgaW5jbHVkZXMgcmF3IHVzZXIgaW5wdXQgKi9cbiAgZ2V0IHJhd0lucHV0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0cmFjdElucHV0KDAsIHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aCwge1xuICAgICAgcmF3OiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgc2V0IHJhd0lucHV0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLnJlc29sdmUodmFsdWUsIHtcbiAgICAgIHJhdzogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cbiAgZ2V0IGlzQ29tcGxldGUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZ2V0IGlzRmlsbGVkKCkge1xuICAgIHJldHVybiB0aGlzLmlzQ29tcGxldGU7XG4gIH1cblxuICAvKiogRmluZHMgbmVhcmVzdCBpbnB1dCBwb3NpdGlvbiBpbiBkaXJlY3Rpb24gKi9cbiAgbmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgZGlyZWN0aW9uKSB7XG4gICAgcmV0dXJuIGN1cnNvclBvcztcbiAgfVxuICB0b3RhbElucHV0UG9zaXRpb25zKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWluKHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aCwgdG9Qb3MgLSBmcm9tUG9zKTtcbiAgfVxuXG4gIC8qKiBFeHRyYWN0cyB2YWx1ZSBpbiByYW5nZSBjb25zaWRlcmluZyBmbGFncyAqL1xuICBleHRyYWN0SW5wdXQoZnJvbVBvcywgdG9Qb3MsIGZsYWdzKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheVZhbHVlLnNsaWNlKGZyb21Qb3MsIHRvUG9zKTtcbiAgfVxuXG4gIC8qKiBFeHRyYWN0cyB0YWlsIGluIHJhbmdlICovXG4gIGV4dHJhY3RUYWlsKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDb250aW51b3VzVGFpbERldGFpbHModGhpcy5leHRyYWN0SW5wdXQoZnJvbVBvcywgdG9Qb3MpLCBmcm9tUG9zKTtcbiAgfVxuXG4gIC8qKiBBcHBlbmRzIHRhaWwgKi9cbiAgYXBwZW5kVGFpbCh0YWlsKSB7XG4gICAgaWYgKGlzU3RyaW5nKHRhaWwpKSB0YWlsID0gbmV3IENvbnRpbnVvdXNUYWlsRGV0YWlscyhTdHJpbmcodGFpbCkpO1xuICAgIHJldHVybiB0YWlsLmFwcGVuZFRvKHRoaXMpO1xuICB9XG5cbiAgLyoqIEFwcGVuZHMgY2hhciAqL1xuICBfYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpIHtcbiAgICBpZiAoIWNoKSByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICB0aGlzLl92YWx1ZSArPSBjaDtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoe1xuICAgICAgaW5zZXJ0ZWQ6IGNoLFxuICAgICAgcmF3SW5zZXJ0ZWQ6IGNoXG4gICAgfSk7XG4gIH1cblxuICAvKiogQXBwZW5kcyBjaGFyICovXG4gIF9hcHBlbmRDaGFyKGNoLCBmbGFncywgY2hlY2tUYWlsKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGNvbnN0IGNvbnNpc3RlbnRTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IGRldGFpbHM7XG4gICAgW2NoLCBkZXRhaWxzXSA9IHRoaXMuZG9QcmVwYXJlQ2hhcihjaCwgZmxhZ3MpO1xuICAgIGlmIChjaCkge1xuICAgICAgZGV0YWlscyA9IGRldGFpbHMuYWdncmVnYXRlKHRoaXMuX2FwcGVuZENoYXJSYXcoY2gsIGZsYWdzKSk7XG5cbiAgICAgIC8vIFRPRE8gaGFuZGxlIGBza2lwYD9cblxuICAgICAgLy8gdHJ5IGBhdXRvZml4YCBsb29rYWhlYWRcbiAgICAgIGlmICghZGV0YWlscy5yYXdJbnNlcnRlZCAmJiB0aGlzLmF1dG9maXggPT09ICdwYWQnKSB7XG4gICAgICAgIGNvbnN0IG5vRml4U3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICB0aGlzLnN0YXRlID0gY29uc2lzdGVudFN0YXRlO1xuICAgICAgICBsZXQgZml4RGV0YWlscyA9IHRoaXMucGFkKGZsYWdzKTtcbiAgICAgICAgY29uc3QgY2hEZXRhaWxzID0gdGhpcy5fYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpO1xuICAgICAgICBmaXhEZXRhaWxzID0gZml4RGV0YWlscy5hZ2dyZWdhdGUoY2hEZXRhaWxzKTtcblxuICAgICAgICAvLyBpZiBmaXggd2FzIGFwcGxpZWQgb3JcbiAgICAgICAgLy8gaWYgZGV0YWlscyBhcmUgZXF1YWwgdXNlIHNraXAgcmVzdG9yaW5nIHN0YXRlIG9wdGltaXphdGlvblxuICAgICAgICBpZiAoY2hEZXRhaWxzLnJhd0luc2VydGVkIHx8IGZpeERldGFpbHMuZXF1YWxzKGRldGFpbHMpKSB7XG4gICAgICAgICAgZGV0YWlscyA9IGZpeERldGFpbHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IG5vRml4U3RhdGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRldGFpbHMuaW5zZXJ0ZWQpIHtcbiAgICAgIGxldCBjb25zaXN0ZW50VGFpbDtcbiAgICAgIGxldCBhcHBlbmRlZCA9IHRoaXMuZG9WYWxpZGF0ZShmbGFncykgIT09IGZhbHNlO1xuICAgICAgaWYgKGFwcGVuZGVkICYmIGNoZWNrVGFpbCAhPSBudWxsKSB7XG4gICAgICAgIC8vIHZhbGlkYXRpb24gb2ssIGNoZWNrIHRhaWxcbiAgICAgICAgY29uc3QgYmVmb3JlVGFpbFN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgaWYgKHRoaXMub3ZlcndyaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc2lzdGVudFRhaWwgPSBjaGVja1RhaWwuc3RhdGU7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXRhaWxzLnJhd0luc2VydGVkLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjaGVja1RhaWwudW5zaGlmdCh0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGggLSBkZXRhaWxzLnRhaWxTaGlmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB0YWlsRGV0YWlscyA9IHRoaXMuYXBwZW5kVGFpbChjaGVja1RhaWwpO1xuICAgICAgICBhcHBlbmRlZCA9IHRhaWxEZXRhaWxzLnJhd0luc2VydGVkLmxlbmd0aCA9PT0gY2hlY2tUYWlsLnRvU3RyaW5nKCkubGVuZ3RoO1xuXG4gICAgICAgIC8vIG5vdCBvaywgdHJ5IHNoaWZ0XG4gICAgICAgIGlmICghKGFwcGVuZGVkICYmIHRhaWxEZXRhaWxzLmluc2VydGVkKSAmJiB0aGlzLm92ZXJ3cml0ZSA9PT0gJ3NoaWZ0Jykge1xuICAgICAgICAgIHRoaXMuc3RhdGUgPSBiZWZvcmVUYWlsU3RhdGU7XG4gICAgICAgICAgY29uc2lzdGVudFRhaWwgPSBjaGVja1RhaWwuc3RhdGU7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXRhaWxzLnJhd0luc2VydGVkLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjaGVja1RhaWwuc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFpbERldGFpbHMgPSB0aGlzLmFwcGVuZFRhaWwoY2hlY2tUYWlsKTtcbiAgICAgICAgICBhcHBlbmRlZCA9IHRhaWxEZXRhaWxzLnJhd0luc2VydGVkLmxlbmd0aCA9PT0gY2hlY2tUYWlsLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgb2ssIHJvbGxiYWNrIHN0YXRlIGFmdGVyIHRhaWxcbiAgICAgICAgaWYgKGFwcGVuZGVkICYmIHRhaWxEZXRhaWxzLmluc2VydGVkKSB0aGlzLnN0YXRlID0gYmVmb3JlVGFpbFN0YXRlO1xuICAgICAgfVxuXG4gICAgICAvLyByZXZlcnQgYWxsIGlmIHNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICBpZiAoIWFwcGVuZGVkKSB7XG4gICAgICAgIGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgICAgICB0aGlzLnN0YXRlID0gY29uc2lzdGVudFN0YXRlO1xuICAgICAgICBpZiAoY2hlY2tUYWlsICYmIGNvbnNpc3RlbnRUYWlsKSBjaGVja1RhaWwuc3RhdGUgPSBjb25zaXN0ZW50VGFpbDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cblxuICAvKiogQXBwZW5kcyBvcHRpb25hbCBwbGFjZWhvbGRlciBhdCB0aGUgZW5kICovXG4gIF9hcHBlbmRQbGFjZWhvbGRlcigpIHtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgfVxuXG4gIC8qKiBBcHBlbmRzIG9wdGlvbmFsIGVhZ2VyIHBsYWNlaG9sZGVyIGF0IHRoZSBlbmQgKi9cbiAgX2FwcGVuZEVhZ2VyKCkge1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICB9XG5cbiAgLyoqIEFwcGVuZHMgc3ltYm9scyBjb25zaWRlcmluZyBmbGFncyAqL1xuICBhcHBlbmQoc3RyLCBmbGFncywgdGFpbCkge1xuICAgIGlmICghaXNTdHJpbmcoc3RyKSkgdGhyb3cgbmV3IEVycm9yKCd2YWx1ZSBzaG91bGQgYmUgc3RyaW5nJyk7XG4gICAgY29uc3QgY2hlY2tUYWlsID0gaXNTdHJpbmcodGFpbCkgPyBuZXcgQ29udGludW91c1RhaWxEZXRhaWxzKFN0cmluZyh0YWlsKSkgOiB0YWlsO1xuICAgIGlmIChmbGFncyAhPSBudWxsICYmIGZsYWdzLnRhaWwpIGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgIGxldCBkZXRhaWxzO1xuICAgIFtzdHIsIGRldGFpbHNdID0gdGhpcy5kb1ByZXBhcmUoc3RyLCBmbGFncyk7XG4gICAgZm9yIChsZXQgY2kgPSAwOyBjaSA8IHN0ci5sZW5ndGg7ICsrY2kpIHtcbiAgICAgIGNvbnN0IGQgPSB0aGlzLl9hcHBlbmRDaGFyKHN0cltjaV0sIGZsYWdzLCBjaGVja1RhaWwpO1xuICAgICAgaWYgKCFkLnJhd0luc2VydGVkICYmICF0aGlzLmRvU2tpcEludmFsaWQoc3RyW2NpXSwgZmxhZ3MsIGNoZWNrVGFpbCkpIGJyZWFrO1xuICAgICAgZGV0YWlscy5hZ2dyZWdhdGUoZCk7XG4gICAgfVxuICAgIGlmICgodGhpcy5lYWdlciA9PT0gdHJ1ZSB8fCB0aGlzLmVhZ2VyID09PSAnYXBwZW5kJykgJiYgZmxhZ3MgIT0gbnVsbCAmJiBmbGFncy5pbnB1dCAmJiBzdHIpIHtcbiAgICAgIGRldGFpbHMuYWdncmVnYXRlKHRoaXMuX2FwcGVuZEVhZ2VyKCkpO1xuICAgIH1cblxuICAgIC8vIGFwcGVuZCB0YWlsIGJ1dCBhZ2dyZWdhdGUgb25seSB0YWlsU2hpZnRcbiAgICBpZiAoY2hlY2tUYWlsICE9IG51bGwpIHtcbiAgICAgIGRldGFpbHMudGFpbFNoaWZ0ICs9IHRoaXMuYXBwZW5kVGFpbChjaGVja1RhaWwpLnRhaWxTaGlmdDtcbiAgICAgIC8vIFRPRE8gaXQncyBhIGdvb2QgaWRlYSB0byBjbGVhciBzdGF0ZSBhZnRlciBhcHBlbmRpbmcgZW5kc1xuICAgICAgLy8gYnV0IGl0IGNhdXNlcyBidWdzIHdoZW4gb25lIGFwcGVuZCBjYWxscyBhbm90aGVyICh3aGVuIGR5bmFtaWMgZGlzcGF0Y2ggc2V0IHJhd0lucHV0VmFsdWUpXG4gICAgICAvLyB0aGlzLl9yZXNldEJlZm9yZVRhaWxTdGF0ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICByZW1vdmUoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuZGlzcGxheVZhbHVlLnNsaWNlKDAsIGZyb21Qb3MpICsgdGhpcy5kaXNwbGF5VmFsdWUuc2xpY2UodG9Qb3MpO1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICB9XG5cbiAgLyoqIENhbGxzIGZ1bmN0aW9uIGFuZCByZWFwcGxpZXMgY3VycmVudCB2YWx1ZSAqL1xuICB3aXRoVmFsdWVSZWZyZXNoKGZuKSB7XG4gICAgaWYgKHRoaXMuX3JlZnJlc2hpbmcgfHwgIXRoaXMuX2luaXRpYWxpemVkKSByZXR1cm4gZm4oKTtcbiAgICB0aGlzLl9yZWZyZXNoaW5nID0gdHJ1ZTtcbiAgICBjb25zdCByYXdJbnB1dCA9IHRoaXMucmF3SW5wdXRWYWx1ZTtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgcmV0ID0gZm4oKTtcbiAgICB0aGlzLnJhd0lucHV0VmFsdWUgPSByYXdJbnB1dDtcbiAgICAvLyBhcHBlbmQgbG9zdCB0cmFpbGluZyBjaGFycyBhdCB0aGUgZW5kXG4gICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZSAhPT0gdmFsdWUgJiYgdmFsdWUuaW5kZXhPZih0aGlzLnZhbHVlKSA9PT0gMCkge1xuICAgICAgdGhpcy5hcHBlbmQodmFsdWUuc2xpY2UodGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoKSwge30sICcnKTtcbiAgICAgIHRoaXMuZG9Db21taXQoKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuX3JlZnJlc2hpbmc7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBydW5Jc29sYXRlZChmbikge1xuICAgIGlmICh0aGlzLl9pc29sYXRlZCB8fCAhdGhpcy5faW5pdGlhbGl6ZWQpIHJldHVybiBmbih0aGlzKTtcbiAgICB0aGlzLl9pc29sYXRlZCA9IHRydWU7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHJldCA9IGZuKHRoaXMpO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICBkZWxldGUgdGhpcy5faXNvbGF0ZWQ7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBkb1NraXBJbnZhbGlkKGNoLCBmbGFncywgY2hlY2tUYWlsKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5za2lwSW52YWxpZCk7XG4gIH1cblxuICAvKiogUHJlcGFyZXMgc3RyaW5nIGJlZm9yZSBtYXNrIHByb2Nlc3NpbmcgKi9cbiAgZG9QcmVwYXJlKHN0ciwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIENoYW5nZURldGFpbHMubm9ybWFsaXplKHRoaXMucHJlcGFyZSA/IHRoaXMucHJlcGFyZShzdHIsIHRoaXMsIGZsYWdzKSA6IHN0cik7XG4gIH1cblxuICAvKiogUHJlcGFyZXMgZWFjaCBjaGFyIGJlZm9yZSBtYXNrIHByb2Nlc3NpbmcgKi9cbiAgZG9QcmVwYXJlQ2hhcihzdHIsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIHJldHVybiBDaGFuZ2VEZXRhaWxzLm5vcm1hbGl6ZSh0aGlzLnByZXBhcmVDaGFyID8gdGhpcy5wcmVwYXJlQ2hhcihzdHIsIHRoaXMsIGZsYWdzKSA6IHN0cik7XG4gIH1cblxuICAvKiogVmFsaWRhdGVzIGlmIHZhbHVlIGlzIGFjY2VwdGFibGUgKi9cbiAgZG9WYWxpZGF0ZShmbGFncykge1xuICAgIHJldHVybiAoIXRoaXMudmFsaWRhdGUgfHwgdGhpcy52YWxpZGF0ZSh0aGlzLnZhbHVlLCB0aGlzLCBmbGFncykpICYmICghdGhpcy5wYXJlbnQgfHwgdGhpcy5wYXJlbnQuZG9WYWxpZGF0ZShmbGFncykpO1xuICB9XG5cbiAgLyoqIERvZXMgYWRkaXRpb25hbCBwcm9jZXNzaW5nIGF0IHRoZSBlbmQgb2YgZWRpdGluZyAqL1xuICBkb0NvbW1pdCgpIHtcbiAgICBpZiAodGhpcy5jb21taXQpIHRoaXMuY29tbWl0KHRoaXMudmFsdWUsIHRoaXMpO1xuICB9XG4gIHNwbGljZShzdGFydCwgZGVsZXRlQ291bnQsIGluc2VydGVkLCByZW1vdmVEaXJlY3Rpb24sIGZsYWdzKSB7XG4gICAgaWYgKGluc2VydGVkID09PSB2b2lkIDApIHtcbiAgICAgIGluc2VydGVkID0gJyc7XG4gICAgfVxuICAgIGlmIChyZW1vdmVEaXJlY3Rpb24gPT09IHZvaWQgMCkge1xuICAgICAgcmVtb3ZlRGlyZWN0aW9uID0gRElSRUNUSU9OLk5PTkU7XG4gICAgfVxuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHtcbiAgICAgICAgaW5wdXQ6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHRhaWxQb3MgPSBzdGFydCArIGRlbGV0ZUNvdW50O1xuICAgIGNvbnN0IHRhaWwgPSB0aGlzLmV4dHJhY3RUYWlsKHRhaWxQb3MpO1xuICAgIGNvbnN0IGVhZ2VyUmVtb3ZlID0gdGhpcy5lYWdlciA9PT0gdHJ1ZSB8fCB0aGlzLmVhZ2VyID09PSAncmVtb3ZlJztcbiAgICBsZXQgb2xkUmF3VmFsdWU7XG4gICAgaWYgKGVhZ2VyUmVtb3ZlKSB7XG4gICAgICByZW1vdmVEaXJlY3Rpb24gPSBmb3JjZURpcmVjdGlvbihyZW1vdmVEaXJlY3Rpb24pO1xuICAgICAgb2xkUmF3VmFsdWUgPSB0aGlzLmV4dHJhY3RJbnB1dCgwLCB0YWlsUG9zLCB7XG4gICAgICAgIHJhdzogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGxldCBzdGFydENoYW5nZVBvcyA9IHN0YXJ0O1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuXG4gICAgLy8gaWYgaXQgaXMganVzdCBkZWxldGlvbiB3aXRob3V0IGluc2VydGlvblxuICAgIGlmIChyZW1vdmVEaXJlY3Rpb24gIT09IERJUkVDVElPTi5OT05FKSB7XG4gICAgICBzdGFydENoYW5nZVBvcyA9IHRoaXMubmVhcmVzdElucHV0UG9zKHN0YXJ0LCBkZWxldGVDb3VudCA+IDEgJiYgc3RhcnQgIT09IDAgJiYgIWVhZ2VyUmVtb3ZlID8gRElSRUNUSU9OLk5PTkUgOiByZW1vdmVEaXJlY3Rpb24pO1xuXG4gICAgICAvLyBhZGp1c3QgdGFpbFNoaWZ0IGlmIHN0YXJ0IHdhcyBhbGlnbmVkXG4gICAgICBkZXRhaWxzLnRhaWxTaGlmdCA9IHN0YXJ0Q2hhbmdlUG9zIC0gc3RhcnQ7XG4gICAgfVxuICAgIGRldGFpbHMuYWdncmVnYXRlKHRoaXMucmVtb3ZlKHN0YXJ0Q2hhbmdlUG9zKSk7XG4gICAgaWYgKGVhZ2VyUmVtb3ZlICYmIHJlbW92ZURpcmVjdGlvbiAhPT0gRElSRUNUSU9OLk5PTkUgJiYgb2xkUmF3VmFsdWUgPT09IHRoaXMucmF3SW5wdXRWYWx1ZSkge1xuICAgICAgaWYgKHJlbW92ZURpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkZPUkNFX0xFRlQpIHtcbiAgICAgICAgbGV0IHZhbExlbmd0aDtcbiAgICAgICAgd2hpbGUgKG9sZFJhd1ZhbHVlID09PSB0aGlzLnJhd0lucHV0VmFsdWUgJiYgKHZhbExlbmd0aCA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aCkpIHtcbiAgICAgICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZShuZXcgQ2hhbmdlRGV0YWlscyh7XG4gICAgICAgICAgICB0YWlsU2hpZnQ6IC0xXG4gICAgICAgICAgfSkpLmFnZ3JlZ2F0ZSh0aGlzLnJlbW92ZSh2YWxMZW5ndGggLSAxKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVtb3ZlRGlyZWN0aW9uID09PSBESVJFQ1RJT04uRk9SQ0VfUklHSFQpIHtcbiAgICAgICAgdGFpbC51bnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzLmFnZ3JlZ2F0ZSh0aGlzLmFwcGVuZChpbnNlcnRlZCwgZmxhZ3MsIHRhaWwpKTtcbiAgfVxuICBtYXNrRXF1YWxzKG1hc2spIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrID09PSBtYXNrO1xuICB9XG4gIG9wdGlvbnNJc0NoYW5nZWQob3B0cykge1xuICAgIHJldHVybiAhb2JqZWN0SW5jbHVkZXModGhpcywgb3B0cyk7XG4gIH1cbiAgdHlwZWRWYWx1ZUVxdWFscyh2YWx1ZSkge1xuICAgIGNvbnN0IHR2YWwgPSB0aGlzLnR5cGVkVmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlID09PSB0dmFsIHx8IE1hc2tlZC5FTVBUWV9WQUxVRVMuaW5jbHVkZXModmFsdWUpICYmIE1hc2tlZC5FTVBUWV9WQUxVRVMuaW5jbHVkZXModHZhbCkgfHwgKHRoaXMuZm9ybWF0ID8gdGhpcy5mb3JtYXQodmFsdWUsIHRoaXMpID09PSB0aGlzLmZvcm1hdCh0aGlzLnR5cGVkVmFsdWUsIHRoaXMpIDogZmFsc2UpO1xuICB9XG4gIHBhZChmbGFncykge1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICB9XG59XG5NYXNrZWQuREVGQVVMVFMgPSB7XG4gIHNraXBJbnZhbGlkOiB0cnVlXG59O1xuTWFza2VkLkVNUFRZX1ZBTFVFUyA9IFt1bmRlZmluZWQsIG51bGwsICcnXTtcbklNYXNrLk1hc2tlZCA9IE1hc2tlZDtcblxuZXhwb3J0IHsgTWFza2VkIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBNYXNrZWRQYXR0ZXJuIGZyb20gJy4vcGF0dGVybi5qcyc7XG5pbXBvcnQgTWFza2VkUmFuZ2UgZnJvbSAnLi9yYW5nZS5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCAnLi4vY29yZS9jaGFuZ2UtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vYmFzZS5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvY29udGludW91cy10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuL2ZhY3RvcnkuanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vY2h1bmstdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2N1cnNvci5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9maXhlZC1kZWZpbml0aW9uLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2lucHV0LWRlZmluaXRpb24uanMnO1xuaW1wb3J0ICcuL3JlZ2V4cC5qcyc7XG5cbi8qKiBEYXRlIG1hc2sgKi9cbmNsYXNzIE1hc2tlZERhdGUgZXh0ZW5kcyBNYXNrZWRQYXR0ZXJuIHtcbiAgc3RhdGljIGV4dHJhY3RQYXR0ZXJuT3B0aW9ucyhvcHRzKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWFzayxcbiAgICAgIHBhdHRlcm4sXG4gICAgICAuLi5wYXR0ZXJuT3B0c1xuICAgIH0gPSBvcHRzO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5wYXR0ZXJuT3B0cyxcbiAgICAgIG1hc2s6IGlzU3RyaW5nKG1hc2spID8gbWFzayA6IHBhdHRlcm5cbiAgICB9O1xuICB9XG5cbiAgLyoqIFBhdHRlcm4gbWFzayBmb3IgZGF0ZSBhY2NvcmRpbmcgdG8ge0BsaW5rIE1hc2tlZERhdGUjZm9ybWF0fSAqL1xuXG4gIC8qKiBTdGFydCBkYXRlICovXG5cbiAgLyoqIEVuZCBkYXRlICovXG5cbiAgLyoqIEZvcm1hdCB0eXBlZCB2YWx1ZSB0byBzdHJpbmcgKi9cblxuICAvKiogUGFyc2Ugc3RyaW5nIHRvIGdldCB0eXBlZCB2YWx1ZSAqL1xuXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBzdXBlcihNYXNrZWREYXRlLmV4dHJhY3RQYXR0ZXJuT3B0aW9ucyh7XG4gICAgICAuLi5NYXNrZWREYXRlLkRFRkFVTFRTLFxuICAgICAgLi4ub3B0c1xuICAgIH0pKTtcbiAgfVxuICB1cGRhdGVPcHRpb25zKG9wdHMpIHtcbiAgICBzdXBlci51cGRhdGVPcHRpb25zKG9wdHMpO1xuICB9XG4gIF91cGRhdGUob3B0cykge1xuICAgIGNvbnN0IHtcbiAgICAgIG1hc2ssXG4gICAgICBwYXR0ZXJuLFxuICAgICAgYmxvY2tzLFxuICAgICAgLi4ucGF0dGVybk9wdHNcbiAgICB9ID0ge1xuICAgICAgLi4uTWFza2VkRGF0ZS5ERUZBVUxUUyxcbiAgICAgIC4uLm9wdHNcbiAgICB9O1xuICAgIGNvbnN0IHBhdHRlcm5CbG9ja3MgPSBPYmplY3QuYXNzaWduKHt9LCBNYXNrZWREYXRlLkdFVF9ERUZBVUxUX0JMT0NLUygpKTtcbiAgICAvLyBhZGp1c3QgeWVhciBibG9ja1xuICAgIGlmIChvcHRzLm1pbikgcGF0dGVybkJsb2Nrcy5ZLmZyb20gPSBvcHRzLm1pbi5nZXRGdWxsWWVhcigpO1xuICAgIGlmIChvcHRzLm1heCkgcGF0dGVybkJsb2Nrcy5ZLnRvID0gb3B0cy5tYXguZ2V0RnVsbFllYXIoKTtcbiAgICBpZiAob3B0cy5taW4gJiYgb3B0cy5tYXggJiYgcGF0dGVybkJsb2Nrcy5ZLmZyb20gPT09IHBhdHRlcm5CbG9ja3MuWS50bykge1xuICAgICAgcGF0dGVybkJsb2Nrcy5tLmZyb20gPSBvcHRzLm1pbi5nZXRNb250aCgpICsgMTtcbiAgICAgIHBhdHRlcm5CbG9ja3MubS50byA9IG9wdHMubWF4LmdldE1vbnRoKCkgKyAxO1xuICAgICAgaWYgKHBhdHRlcm5CbG9ja3MubS5mcm9tID09PSBwYXR0ZXJuQmxvY2tzLm0udG8pIHtcbiAgICAgICAgcGF0dGVybkJsb2Nrcy5kLmZyb20gPSBvcHRzLm1pbi5nZXREYXRlKCk7XG4gICAgICAgIHBhdHRlcm5CbG9ja3MuZC50byA9IG9wdHMubWF4LmdldERhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihwYXR0ZXJuQmxvY2tzLCB0aGlzLmJsb2NrcywgYmxvY2tzKTtcbiAgICBzdXBlci5fdXBkYXRlKHtcbiAgICAgIC4uLnBhdHRlcm5PcHRzLFxuICAgICAgbWFzazogaXNTdHJpbmcobWFzaykgPyBtYXNrIDogcGF0dGVybixcbiAgICAgIGJsb2NrczogcGF0dGVybkJsb2Nrc1xuICAgIH0pO1xuICB9XG4gIGRvVmFsaWRhdGUoZmxhZ3MpIHtcbiAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlO1xuICAgIHJldHVybiBzdXBlci5kb1ZhbGlkYXRlKGZsYWdzKSAmJiAoIXRoaXMuaXNDb21wbGV0ZSB8fCB0aGlzLmlzRGF0ZUV4aXN0KHRoaXMudmFsdWUpICYmIGRhdGUgIT0gbnVsbCAmJiAodGhpcy5taW4gPT0gbnVsbCB8fCB0aGlzLm1pbiA8PSBkYXRlKSAmJiAodGhpcy5tYXggPT0gbnVsbCB8fCBkYXRlIDw9IHRoaXMubWF4KSk7XG4gIH1cblxuICAvKiogQ2hlY2tzIGlmIGRhdGUgaXMgZXhpc3RzICovXG4gIGlzRGF0ZUV4aXN0KHN0cikge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLnBhcnNlKHN0ciwgdGhpcyksIHRoaXMpLmluZGV4T2Yoc3RyKSA+PSAwO1xuICB9XG5cbiAgLyoqIFBhcnNlZCBEYXRlICovXG4gIGdldCBkYXRlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGVkVmFsdWU7XG4gIH1cbiAgc2V0IGRhdGUoZGF0ZSkge1xuICAgIHRoaXMudHlwZWRWYWx1ZSA9IGRhdGU7XG4gIH1cbiAgZ2V0IHR5cGVkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb21wbGV0ZSA/IHN1cGVyLnR5cGVkVmFsdWUgOiBudWxsO1xuICB9XG4gIHNldCB0eXBlZFZhbHVlKHZhbHVlKSB7XG4gICAgc3VwZXIudHlwZWRWYWx1ZSA9IHZhbHVlO1xuICB9XG4gIG1hc2tFcXVhbHMobWFzaykge1xuICAgIHJldHVybiBtYXNrID09PSBEYXRlIHx8IHN1cGVyLm1hc2tFcXVhbHMobWFzayk7XG4gIH1cbiAgb3B0aW9uc0lzQ2hhbmdlZChvcHRzKSB7XG4gICAgcmV0dXJuIHN1cGVyLm9wdGlvbnNJc0NoYW5nZWQoTWFza2VkRGF0ZS5leHRyYWN0UGF0dGVybk9wdGlvbnMob3B0cykpO1xuICB9XG59XG5NYXNrZWREYXRlLkdFVF9ERUZBVUxUX0JMT0NLUyA9ICgpID0+ICh7XG4gIGQ6IHtcbiAgICBtYXNrOiBNYXNrZWRSYW5nZSxcbiAgICBmcm9tOiAxLFxuICAgIHRvOiAzMSxcbiAgICBtYXhMZW5ndGg6IDJcbiAgfSxcbiAgbToge1xuICAgIG1hc2s6IE1hc2tlZFJhbmdlLFxuICAgIGZyb206IDEsXG4gICAgdG86IDEyLFxuICAgIG1heExlbmd0aDogMlxuICB9LFxuICBZOiB7XG4gICAgbWFzazogTWFza2VkUmFuZ2UsXG4gICAgZnJvbTogMTkwMCxcbiAgICB0bzogOTk5OVxuICB9XG59KTtcbk1hc2tlZERhdGUuREVGQVVMVFMgPSB7XG4gIC4uLk1hc2tlZFBhdHRlcm4uREVGQVVMVFMsXG4gIG1hc2s6IERhdGUsXG4gIHBhdHRlcm46ICdkey59YG17Ln1gWScsXG4gIGZvcm1hdDogKGRhdGUsIG1hc2tlZCkgPT4ge1xuICAgIGlmICghZGF0ZSkgcmV0dXJuICcnO1xuICAgIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgcmV0dXJuIFtkYXksIG1vbnRoLCB5ZWFyXS5qb2luKCcuJyk7XG4gIH0sXG4gIHBhcnNlOiAoc3RyLCBtYXNrZWQpID0+IHtcbiAgICBjb25zdCBbZGF5LCBtb250aCwgeWVhcl0gPSBzdHIuc3BsaXQoJy4nKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG59O1xuSU1hc2suTWFza2VkRGF0ZSA9IE1hc2tlZERhdGU7XG5cbmV4cG9ydCB7IE1hc2tlZERhdGUgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IHsgRElSRUNUSU9OLCBvYmplY3RJbmNsdWRlcyB9IGZyb20gJy4uL2NvcmUvdXRpbHMuanMnO1xuaW1wb3J0IENoYW5nZURldGFpbHMgZnJvbSAnLi4vY29yZS9jaGFuZ2UtZGV0YWlscy5qcyc7XG5pbXBvcnQgY3JlYXRlTWFzaywgeyBub3JtYWxpemVPcHRzIH0gZnJvbSAnLi9mYWN0b3J5LmpzJztcbmltcG9ydCBNYXNrZWQgZnJvbSAnLi9iYXNlLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvY29udGludW91cy10YWlsLWRldGFpbHMuanMnO1xuXG4vKiogRHluYW1pYyBtYXNrIGZvciBjaG9vc2luZyBhcHByb3ByaWF0ZSBtYXNrIGluIHJ1bi10aW1lICovXG5jbGFzcyBNYXNrZWREeW5hbWljIGV4dGVuZHMgTWFza2VkIHtcbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHN1cGVyKHtcbiAgICAgIC4uLk1hc2tlZER5bmFtaWMuREVGQVVMVFMsXG4gICAgICAuLi5vcHRzXG4gICAgfSk7XG4gICAgdGhpcy5jdXJyZW50TWFzayA9IHVuZGVmaW5lZDtcbiAgfVxuICB1cGRhdGVPcHRpb25zKG9wdHMpIHtcbiAgICBzdXBlci51cGRhdGVPcHRpb25zKG9wdHMpO1xuICB9XG4gIF91cGRhdGUob3B0cykge1xuICAgIHN1cGVyLl91cGRhdGUob3B0cyk7XG4gICAgaWYgKCdtYXNrJyBpbiBvcHRzKSB7XG4gICAgICB0aGlzLmV4cG9zZU1hc2sgPSB1bmRlZmluZWQ7XG4gICAgICAvLyBtYXNrIGNvdWxkIGJlIHRvdGFsbHkgZHluYW1pYyB3aXRoIG9ubHkgYGRpc3BhdGNoYCBvcHRpb25cbiAgICAgIHRoaXMuY29tcGlsZWRNYXNrcyA9IEFycmF5LmlzQXJyYXkob3B0cy5tYXNrKSA/IG9wdHMubWFzay5tYXAobSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBleHBvc2UsXG4gICAgICAgICAgLi4ubWFza09wdHNcbiAgICAgICAgfSA9IG5vcm1hbGl6ZU9wdHMobSk7XG4gICAgICAgIGNvbnN0IG1hc2tlZCA9IGNyZWF0ZU1hc2soe1xuICAgICAgICAgIG92ZXJ3cml0ZTogdGhpcy5fb3ZlcndyaXRlLFxuICAgICAgICAgIGVhZ2VyOiB0aGlzLl9lYWdlcixcbiAgICAgICAgICBza2lwSW52YWxpZDogdGhpcy5fc2tpcEludmFsaWQsXG4gICAgICAgICAgLi4ubWFza09wdHNcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChleHBvc2UpIHRoaXMuZXhwb3NlTWFzayA9IG1hc2tlZDtcbiAgICAgICAgcmV0dXJuIG1hc2tlZDtcbiAgICAgIH0pIDogW107XG5cbiAgICAgIC8vIHRoaXMuY3VycmVudE1hc2sgPSB0aGlzLmRvRGlzcGF0Y2goJycpOyAvLyBwcm9iYWJseSBub3QgbmVlZGVkIGJ1dCBsZXRzIHNlZVxuICAgIH1cbiAgfVxuICBfYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgZGV0YWlscyA9IHRoaXMuX2FwcGx5RGlzcGF0Y2goY2gsIGZsYWdzKTtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFzaykge1xuICAgICAgZGV0YWlscy5hZ2dyZWdhdGUodGhpcy5jdXJyZW50TWFzay5fYXBwZW5kQ2hhcihjaCwgdGhpcy5jdXJyZW50TWFza0ZsYWdzKGZsYWdzKSkpO1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBfYXBwbHlEaXNwYXRjaChhcHBlbmRlZCwgZmxhZ3MsIHRhaWwpIHtcbiAgICBpZiAoYXBwZW5kZWQgPT09IHZvaWQgMCkge1xuICAgICAgYXBwZW5kZWQgPSAnJztcbiAgICB9XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGlmICh0YWlsID09PSB2b2lkIDApIHtcbiAgICAgIHRhaWwgPSAnJztcbiAgICB9XG4gICAgY29uc3QgcHJldlZhbHVlQmVmb3JlVGFpbCA9IGZsYWdzLnRhaWwgJiYgZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSAhPSBudWxsID8gZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZS5fdmFsdWUgOiB0aGlzLnZhbHVlO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSB0aGlzLnJhd0lucHV0VmFsdWU7XG4gICAgY29uc3QgaW5zZXJ0VmFsdWUgPSBmbGFncy50YWlsICYmIGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUgIT0gbnVsbCA/IGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUuX3Jhd0lucHV0VmFsdWUgOiBpbnB1dFZhbHVlO1xuICAgIGNvbnN0IHRhaWxWYWx1ZSA9IGlucHV0VmFsdWUuc2xpY2UoaW5zZXJ0VmFsdWUubGVuZ3RoKTtcbiAgICBjb25zdCBwcmV2TWFzayA9IHRoaXMuY3VycmVudE1hc2s7XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgY29uc3QgcHJldk1hc2tTdGF0ZSA9IHByZXZNYXNrID09IG51bGwgPyB2b2lkIDAgOiBwcmV2TWFzay5zdGF0ZTtcblxuICAgIC8vIGNsb25lIGZsYWdzIHRvIHByZXZlbnQgb3ZlcndyaXRpbmcgYF9iZWZvcmVUYWlsU3RhdGVgXG4gICAgdGhpcy5jdXJyZW50TWFzayA9IHRoaXMuZG9EaXNwYXRjaChhcHBlbmRlZCwge1xuICAgICAgLi4uZmxhZ3NcbiAgICB9LCB0YWlsKTtcblxuICAgIC8vIHJlc3RvcmUgc3RhdGUgYWZ0ZXIgZGlzcGF0Y2hcbiAgICBpZiAodGhpcy5jdXJyZW50TWFzaykge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE1hc2sgIT09IHByZXZNYXNrKSB7XG4gICAgICAgIC8vIGlmIG1hc2sgY2hhbmdlZCByZWFwcGx5IGlucHV0XG4gICAgICAgIHRoaXMuY3VycmVudE1hc2sucmVzZXQoKTtcbiAgICAgICAgaWYgKGluc2VydFZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50TWFzay5hcHBlbmQoaW5zZXJ0VmFsdWUsIHtcbiAgICAgICAgICAgIHJhdzogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGRldGFpbHMudGFpbFNoaWZ0ID0gdGhpcy5jdXJyZW50TWFzay52YWx1ZS5sZW5ndGggLSBwcmV2VmFsdWVCZWZvcmVUYWlsLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFpbFZhbHVlKSB7XG4gICAgICAgICAgZGV0YWlscy50YWlsU2hpZnQgKz0gdGhpcy5jdXJyZW50TWFzay5hcHBlbmQodGFpbFZhbHVlLCB7XG4gICAgICAgICAgICByYXc6IHRydWUsXG4gICAgICAgICAgICB0YWlsOiB0cnVlXG4gICAgICAgICAgfSkudGFpbFNoaWZ0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByZXZNYXNrU3RhdGUpIHtcbiAgICAgICAgLy8gRGlzcGF0Y2ggY2FuIGRvIHNvbWV0aGluZyBiYWQgd2l0aCBzdGF0ZSwgc29cbiAgICAgICAgLy8gcmVzdG9yZSBwcmV2IG1hc2sgc3RhdGVcbiAgICAgICAgdGhpcy5jdXJyZW50TWFzay5zdGF0ZSA9IHByZXZNYXNrU3RhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIF9hcHBlbmRQbGFjZWhvbGRlcigpIHtcbiAgICBjb25zdCBkZXRhaWxzID0gdGhpcy5fYXBwbHlEaXNwYXRjaCgpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXNrKSB7XG4gICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZSh0aGlzLmN1cnJlbnRNYXNrLl9hcHBlbmRQbGFjZWhvbGRlcigpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbiAgX2FwcGVuZEVhZ2VyKCkge1xuICAgIGNvbnN0IGRldGFpbHMgPSB0aGlzLl9hcHBseURpc3BhdGNoKCk7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hc2spIHtcbiAgICAgIGRldGFpbHMuYWdncmVnYXRlKHRoaXMuY3VycmVudE1hc2suX2FwcGVuZEVhZ2VyKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBhcHBlbmRUYWlsKHRhaWwpIHtcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBpZiAodGFpbCkgZGV0YWlscy5hZ2dyZWdhdGUodGhpcy5fYXBwbHlEaXNwYXRjaCgnJywge30sIHRhaWwpKTtcbiAgICByZXR1cm4gZGV0YWlscy5hZ2dyZWdhdGUodGhpcy5jdXJyZW50TWFzayA/IHRoaXMuY3VycmVudE1hc2suYXBwZW5kVGFpbCh0YWlsKSA6IHN1cGVyLmFwcGVuZFRhaWwodGFpbCkpO1xuICB9XG4gIGN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpIHtcbiAgICB2YXIgX2ZsYWdzJF9iZWZvcmVUYWlsU3RhLCBfZmxhZ3MkX2JlZm9yZVRhaWxTdGEyO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5mbGFncyxcbiAgICAgIF9iZWZvcmVUYWlsU3RhdGU6ICgoX2ZsYWdzJF9iZWZvcmVUYWlsU3RhID0gZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9mbGFncyRfYmVmb3JlVGFpbFN0YS5jdXJyZW50TWFza1JlZikgPT09IHRoaXMuY3VycmVudE1hc2sgJiYgKChfZmxhZ3MkX2JlZm9yZVRhaWxTdGEyID0gZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9mbGFncyRfYmVmb3JlVGFpbFN0YTIuY3VycmVudE1hc2spIHx8IGZsYWdzLl9iZWZvcmVUYWlsU3RhdGVcbiAgICB9O1xuICB9XG4gIGRvRGlzcGF0Y2goYXBwZW5kZWQsIGZsYWdzLCB0YWlsKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGlmICh0YWlsID09PSB2b2lkIDApIHtcbiAgICAgIHRhaWwgPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2goYXBwZW5kZWQsIHRoaXMsIGZsYWdzLCB0YWlsKTtcbiAgfVxuICBkb1ZhbGlkYXRlKGZsYWdzKSB7XG4gICAgcmV0dXJuIHN1cGVyLmRvVmFsaWRhdGUoZmxhZ3MpICYmICghdGhpcy5jdXJyZW50TWFzayB8fCB0aGlzLmN1cnJlbnRNYXNrLmRvVmFsaWRhdGUodGhpcy5jdXJyZW50TWFza0ZsYWdzKGZsYWdzKSkpO1xuICB9XG4gIGRvUHJlcGFyZShzdHIsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGxldCBbcywgZGV0YWlsc10gPSBzdXBlci5kb1ByZXBhcmUoc3RyLCBmbGFncyk7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hc2spIHtcbiAgICAgIGxldCBjdXJyZW50RGV0YWlscztcbiAgICAgIFtzLCBjdXJyZW50RGV0YWlsc10gPSBzdXBlci5kb1ByZXBhcmUocywgdGhpcy5jdXJyZW50TWFza0ZsYWdzKGZsYWdzKSk7XG4gICAgICBkZXRhaWxzID0gZGV0YWlscy5hZ2dyZWdhdGUoY3VycmVudERldGFpbHMpO1xuICAgIH1cbiAgICByZXR1cm4gW3MsIGRldGFpbHNdO1xuICB9XG4gIGRvUHJlcGFyZUNoYXIoc3RyLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBsZXQgW3MsIGRldGFpbHNdID0gc3VwZXIuZG9QcmVwYXJlQ2hhcihzdHIsIGZsYWdzKTtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFzaykge1xuICAgICAgbGV0IGN1cnJlbnREZXRhaWxzO1xuICAgICAgW3MsIGN1cnJlbnREZXRhaWxzXSA9IHN1cGVyLmRvUHJlcGFyZUNoYXIocywgdGhpcy5jdXJyZW50TWFza0ZsYWdzKGZsYWdzKSk7XG4gICAgICBkZXRhaWxzID0gZGV0YWlscy5hZ2dyZWdhdGUoY3VycmVudERldGFpbHMpO1xuICAgIH1cbiAgICByZXR1cm4gW3MsIGRldGFpbHNdO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHZhciBfdGhpcyRjdXJyZW50TWFzaztcbiAgICAoX3RoaXMkY3VycmVudE1hc2sgPSB0aGlzLmN1cnJlbnRNYXNrKSA9PSBudWxsIHx8IF90aGlzJGN1cnJlbnRNYXNrLnJlc2V0KCk7XG4gICAgdGhpcy5jb21waWxlZE1hc2tzLmZvckVhY2gobSA9PiBtLnJlc2V0KCkpO1xuICB9XG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5leHBvc2VNYXNrID8gdGhpcy5leHBvc2VNYXNrLnZhbHVlIDogdGhpcy5jdXJyZW50TWFzayA/IHRoaXMuY3VycmVudE1hc2sudmFsdWUgOiAnJztcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5leHBvc2VNYXNrKSB7XG4gICAgICB0aGlzLmV4cG9zZU1hc2sudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY3VycmVudE1hc2sgPSB0aGlzLmV4cG9zZU1hc2s7XG4gICAgICB0aGlzLl9hcHBseURpc3BhdGNoKCk7XG4gICAgfSBlbHNlIHN1cGVyLnZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHVubWFza2VkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb3NlTWFzayA/IHRoaXMuZXhwb3NlTWFzay51bm1hc2tlZFZhbHVlIDogdGhpcy5jdXJyZW50TWFzayA/IHRoaXMuY3VycmVudE1hc2sudW5tYXNrZWRWYWx1ZSA6ICcnO1xuICB9XG4gIHNldCB1bm1hc2tlZFZhbHVlKHVubWFza2VkVmFsdWUpIHtcbiAgICBpZiAodGhpcy5leHBvc2VNYXNrKSB7XG4gICAgICB0aGlzLmV4cG9zZU1hc2sudW5tYXNrZWRWYWx1ZSA9IHVubWFza2VkVmFsdWU7XG4gICAgICB0aGlzLmN1cnJlbnRNYXNrID0gdGhpcy5leHBvc2VNYXNrO1xuICAgICAgdGhpcy5fYXBwbHlEaXNwYXRjaCgpO1xuICAgIH0gZWxzZSBzdXBlci51bm1hc2tlZFZhbHVlID0gdW5tYXNrZWRWYWx1ZTtcbiAgfVxuICBnZXQgdHlwZWRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5leHBvc2VNYXNrID8gdGhpcy5leHBvc2VNYXNrLnR5cGVkVmFsdWUgOiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay50eXBlZFZhbHVlIDogJyc7XG4gIH1cbiAgc2V0IHR5cGVkVmFsdWUodHlwZWRWYWx1ZSkge1xuICAgIGlmICh0aGlzLmV4cG9zZU1hc2spIHtcbiAgICAgIHRoaXMuZXhwb3NlTWFzay50eXBlZFZhbHVlID0gdHlwZWRWYWx1ZTtcbiAgICAgIHRoaXMuY3VycmVudE1hc2sgPSB0aGlzLmV4cG9zZU1hc2s7XG4gICAgICB0aGlzLl9hcHBseURpc3BhdGNoKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB1bm1hc2tlZFZhbHVlID0gU3RyaW5nKHR5cGVkVmFsdWUpO1xuXG4gICAgLy8gZG91YmxlIGNoZWNrIGl0XG4gICAgaWYgKHRoaXMuY3VycmVudE1hc2spIHtcbiAgICAgIHRoaXMuY3VycmVudE1hc2sudHlwZWRWYWx1ZSA9IHR5cGVkVmFsdWU7XG4gICAgICB1bm1hc2tlZFZhbHVlID0gdGhpcy5jdXJyZW50TWFzay51bm1hc2tlZFZhbHVlO1xuICAgIH1cbiAgICB0aGlzLnVubWFza2VkVmFsdWUgPSB1bm1hc2tlZFZhbHVlO1xuICB9XG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1hc2sgPyB0aGlzLmN1cnJlbnRNYXNrLmRpc3BsYXlWYWx1ZSA6ICcnO1xuICB9XG4gIGdldCBpc0NvbXBsZXRlKCkge1xuICAgIHZhciBfdGhpcyRjdXJyZW50TWFzazI7XG4gICAgcmV0dXJuIEJvb2xlYW4oKF90aGlzJGN1cnJlbnRNYXNrMiA9IHRoaXMuY3VycmVudE1hc2spID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRjdXJyZW50TWFzazIuaXNDb21wbGV0ZSk7XG4gIH1cbiAgZ2V0IGlzRmlsbGVkKCkge1xuICAgIHZhciBfdGhpcyRjdXJyZW50TWFzazM7XG4gICAgcmV0dXJuIEJvb2xlYW4oKF90aGlzJGN1cnJlbnRNYXNrMyA9IHRoaXMuY3VycmVudE1hc2spID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRjdXJyZW50TWFzazMuaXNGaWxsZWQpO1xuICB9XG4gIHJlbW92ZShmcm9tUG9zLCB0b1Bvcykge1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXNrKSB7XG4gICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZSh0aGlzLmN1cnJlbnRNYXNrLnJlbW92ZShmcm9tUG9zLCB0b1BvcykpXG4gICAgICAvLyB1cGRhdGUgd2l0aCBkaXNwYXRjaFxuICAgICAgLmFnZ3JlZ2F0ZSh0aGlzLl9hcHBseURpc3BhdGNoKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBnZXQgc3RhdGUoKSB7XG4gICAgdmFyIF90aGlzJGN1cnJlbnRNYXNrNDtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuc3RhdGUsXG4gICAgICBfcmF3SW5wdXRWYWx1ZTogdGhpcy5yYXdJbnB1dFZhbHVlLFxuICAgICAgY29tcGlsZWRNYXNrczogdGhpcy5jb21waWxlZE1hc2tzLm1hcChtID0+IG0uc3RhdGUpLFxuICAgICAgY3VycmVudE1hc2tSZWY6IHRoaXMuY3VycmVudE1hc2ssXG4gICAgICBjdXJyZW50TWFzazogKF90aGlzJGN1cnJlbnRNYXNrNCA9IHRoaXMuY3VycmVudE1hc2spID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRjdXJyZW50TWFzazQuc3RhdGVcbiAgICB9O1xuICB9XG4gIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbXBpbGVkTWFza3MsXG4gICAgICBjdXJyZW50TWFza1JlZixcbiAgICAgIGN1cnJlbnRNYXNrLFxuICAgICAgLi4ubWFza2VkU3RhdGVcbiAgICB9ID0gc3RhdGU7XG4gICAgaWYgKGNvbXBpbGVkTWFza3MpIHRoaXMuY29tcGlsZWRNYXNrcy5mb3JFYWNoKChtLCBtaSkgPT4gbS5zdGF0ZSA9IGNvbXBpbGVkTWFza3NbbWldKTtcbiAgICBpZiAoY3VycmVudE1hc2tSZWYgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jdXJyZW50TWFzayA9IGN1cnJlbnRNYXNrUmVmO1xuICAgICAgdGhpcy5jdXJyZW50TWFzay5zdGF0ZSA9IGN1cnJlbnRNYXNrO1xuICAgIH1cbiAgICBzdXBlci5zdGF0ZSA9IG1hc2tlZFN0YXRlO1xuICB9XG4gIGV4dHJhY3RJbnB1dChmcm9tUG9zLCB0b1BvcywgZmxhZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFzayA/IHRoaXMuY3VycmVudE1hc2suZXh0cmFjdElucHV0KGZyb21Qb3MsIHRvUG9zLCBmbGFncykgOiAnJztcbiAgfVxuICBleHRyYWN0VGFpbChmcm9tUG9zLCB0b1Bvcykge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay5leHRyYWN0VGFpbChmcm9tUG9zLCB0b1BvcykgOiBzdXBlci5leHRyYWN0VGFpbChmcm9tUG9zLCB0b1Bvcyk7XG4gIH1cbiAgZG9Db21taXQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hc2spIHRoaXMuY3VycmVudE1hc2suZG9Db21taXQoKTtcbiAgICBzdXBlci5kb0NvbW1pdCgpO1xuICB9XG4gIG5lYXJlc3RJbnB1dFBvcyhjdXJzb3JQb3MsIGRpcmVjdGlvbikge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay5uZWFyZXN0SW5wdXRQb3MoY3Vyc29yUG9zLCBkaXJlY3Rpb24pIDogc3VwZXIubmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgZGlyZWN0aW9uKTtcbiAgfVxuICBnZXQgb3ZlcndyaXRlKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay5vdmVyd3JpdGUgOiB0aGlzLl9vdmVyd3JpdGU7XG4gIH1cbiAgc2V0IG92ZXJ3cml0ZShvdmVyd3JpdGUpIHtcbiAgICB0aGlzLl9vdmVyd3JpdGUgPSBvdmVyd3JpdGU7XG4gIH1cbiAgZ2V0IGVhZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay5lYWdlciA6IHRoaXMuX2VhZ2VyO1xuICB9XG4gIHNldCBlYWdlcihlYWdlcikge1xuICAgIHRoaXMuX2VhZ2VyID0gZWFnZXI7XG4gIH1cbiAgZ2V0IHNraXBJbnZhbGlkKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay5za2lwSW52YWxpZCA6IHRoaXMuX3NraXBJbnZhbGlkO1xuICB9XG4gIHNldCBza2lwSW52YWxpZChza2lwSW52YWxpZCkge1xuICAgIHRoaXMuX3NraXBJbnZhbGlkID0gc2tpcEludmFsaWQ7XG4gIH1cbiAgZ2V0IGF1dG9maXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1hc2sgPyB0aGlzLmN1cnJlbnRNYXNrLmF1dG9maXggOiB0aGlzLl9hdXRvZml4O1xuICB9XG4gIHNldCBhdXRvZml4KGF1dG9maXgpIHtcbiAgICB0aGlzLl9hdXRvZml4ID0gYXV0b2ZpeDtcbiAgfVxuICBtYXNrRXF1YWxzKG1hc2spIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShtYXNrKSA/IHRoaXMuY29tcGlsZWRNYXNrcy5ldmVyeSgobSwgbWkpID0+IHtcbiAgICAgIGlmICghbWFza1ttaV0pIHJldHVybjtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFzazogb2xkTWFzayxcbiAgICAgICAgLi4ucmVzdE9wdHNcbiAgICAgIH0gPSBtYXNrW21pXTtcbiAgICAgIHJldHVybiBvYmplY3RJbmNsdWRlcyhtLCByZXN0T3B0cykgJiYgbS5tYXNrRXF1YWxzKG9sZE1hc2spO1xuICAgIH0pIDogc3VwZXIubWFza0VxdWFscyhtYXNrKTtcbiAgfVxuICB0eXBlZFZhbHVlRXF1YWxzKHZhbHVlKSB7XG4gICAgdmFyIF90aGlzJGN1cnJlbnRNYXNrNTtcbiAgICByZXR1cm4gQm9vbGVhbigoX3RoaXMkY3VycmVudE1hc2s1ID0gdGhpcy5jdXJyZW50TWFzaykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJGN1cnJlbnRNYXNrNS50eXBlZFZhbHVlRXF1YWxzKHZhbHVlKSk7XG4gIH1cbn1cbi8qKiBDdXJyZW50bHkgY2hvc2VuIG1hc2sgKi9cbi8qKiBDdXJyZW50bHkgY2hvc2VuIG1hc2sgKi9cbi8qKiBDb21wbGlsZWQge0BsaW5rIE1hc2tlZH0gb3B0aW9ucyAqL1xuLyoqIENob29zZXMge0BsaW5rIE1hc2tlZH0gZGVwZW5kaW5nIG9uIGlucHV0IHZhbHVlICovXG5NYXNrZWREeW5hbWljLkRFRkFVTFRTID0ge1xuICAuLi5NYXNrZWQuREVGQVVMVFMsXG4gIGRpc3BhdGNoOiAoYXBwZW5kZWQsIG1hc2tlZCwgZmxhZ3MsIHRhaWwpID0+IHtcbiAgICBpZiAoIW1hc2tlZC5jb21waWxlZE1hc2tzLmxlbmd0aCkgcmV0dXJuO1xuICAgIGNvbnN0IGlucHV0VmFsdWUgPSBtYXNrZWQucmF3SW5wdXRWYWx1ZTtcblxuICAgIC8vIHNpbXVsYXRlIGlucHV0XG4gICAgY29uc3QgaW5wdXRzID0gbWFza2VkLmNvbXBpbGVkTWFza3MubWFwKChtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaXNDdXJyZW50ID0gbWFza2VkLmN1cnJlbnRNYXNrID09PSBtO1xuICAgICAgY29uc3Qgc3RhcnRJbnB1dFBvcyA9IGlzQ3VycmVudCA/IG0uZGlzcGxheVZhbHVlLmxlbmd0aCA6IG0ubmVhcmVzdElucHV0UG9zKG0uZGlzcGxheVZhbHVlLmxlbmd0aCwgRElSRUNUSU9OLkZPUkNFX0xFRlQpO1xuICAgICAgaWYgKG0ucmF3SW5wdXRWYWx1ZSAhPT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICBtLnJlc2V0KCk7XG4gICAgICAgIG0uYXBwZW5kKGlucHV0VmFsdWUsIHtcbiAgICAgICAgICByYXc6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKCFpc0N1cnJlbnQpIHtcbiAgICAgICAgbS5yZW1vdmUoc3RhcnRJbnB1dFBvcyk7XG4gICAgICB9XG4gICAgICBtLmFwcGVuZChhcHBlbmRlZCwgbWFza2VkLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpKTtcbiAgICAgIG0uYXBwZW5kVGFpbCh0YWlsKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICB3ZWlnaHQ6IG0ucmF3SW5wdXRWYWx1ZS5sZW5ndGgsXG4gICAgICAgIHRvdGFsSW5wdXRQb3NpdGlvbnM6IG0udG90YWxJbnB1dFBvc2l0aW9ucygwLCBNYXRoLm1heChzdGFydElucHV0UG9zLCBtLm5lYXJlc3RJbnB1dFBvcyhtLmRpc3BsYXlWYWx1ZS5sZW5ndGgsIERJUkVDVElPTi5GT1JDRV9MRUZUKSkpXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy8gcG9wIG1hc2tzIHdpdGggbG9uZ2VyIHZhbHVlcyBmaXJzdFxuICAgIGlucHV0cy5zb3J0KChpMSwgaTIpID0+IGkyLndlaWdodCAtIGkxLndlaWdodCB8fCBpMi50b3RhbElucHV0UG9zaXRpb25zIC0gaTEudG90YWxJbnB1dFBvc2l0aW9ucyk7XG4gICAgcmV0dXJuIG1hc2tlZC5jb21waWxlZE1hc2tzW2lucHV0c1swXS5pbmRleF07XG4gIH1cbn07XG5JTWFzay5NYXNrZWREeW5hbWljID0gTWFza2VkRHluYW1pYztcblxuZXhwb3J0IHsgTWFza2VkRHluYW1pYyBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgTWFza2VkUGF0dGVybiBmcm9tICcuL3BhdHRlcm4uanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uL2NvcmUvaG9sZGVyLmpzJztcbmltcG9ydCBDaGFuZ2VEZXRhaWxzIGZyb20gJy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi4vY29yZS91dGlscy5qcyc7XG5pbXBvcnQgQ29udGludW91c1RhaWxEZXRhaWxzIGZyb20gJy4uL2NvcmUvY29udGludW91cy10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuL2Jhc2UuanMnO1xuaW1wb3J0ICcuL2ZhY3RvcnkuanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vY2h1bmstdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2N1cnNvci5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9maXhlZC1kZWZpbml0aW9uLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2lucHV0LWRlZmluaXRpb24uanMnO1xuaW1wb3J0ICcuL3JlZ2V4cC5qcyc7XG5cbi8qKiBQYXR0ZXJuIHdoaWNoIHZhbGlkYXRlcyBlbnVtIHZhbHVlcyAqL1xuY2xhc3MgTWFza2VkRW51bSBleHRlbmRzIE1hc2tlZFBhdHRlcm4ge1xuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgc3VwZXIoe1xuICAgICAgLi4uTWFza2VkRW51bS5ERUZBVUxUUyxcbiAgICAgIC4uLm9wdHNcbiAgICB9KTsgLy8gbWFzayB3aWxsIGJlIGNyZWF0ZWQgaW4gX3VwZGF0ZVxuICB9XG4gIHVwZGF0ZU9wdGlvbnMob3B0cykge1xuICAgIHN1cGVyLnVwZGF0ZU9wdGlvbnMob3B0cyk7XG4gIH1cbiAgX3VwZGF0ZShvcHRzKSB7XG4gICAgY29uc3Qge1xuICAgICAgZW51bTogZW51bV8sXG4gICAgICAuLi5lb3B0c1xuICAgIH0gPSBvcHRzO1xuICAgIGlmIChlbnVtXykge1xuICAgICAgY29uc3QgbGVuZ3RocyA9IGVudW1fLm1hcChlID0+IGUubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHJlcXVpcmVkTGVuZ3RoID0gTWF0aC5taW4oLi4ubGVuZ3Rocyk7XG4gICAgICBjb25zdCBvcHRpb25hbExlbmd0aCA9IE1hdGgubWF4KC4uLmxlbmd0aHMpIC0gcmVxdWlyZWRMZW5ndGg7XG4gICAgICBlb3B0cy5tYXNrID0gJyonLnJlcGVhdChyZXF1aXJlZExlbmd0aCk7XG4gICAgICBpZiAob3B0aW9uYWxMZW5ndGgpIGVvcHRzLm1hc2sgKz0gJ1snICsgJyonLnJlcGVhdChvcHRpb25hbExlbmd0aCkgKyAnXSc7XG4gICAgICB0aGlzLmVudW0gPSBlbnVtXztcbiAgICB9XG4gICAgc3VwZXIuX3VwZGF0ZShlb3B0cyk7XG4gIH1cbiAgX2FwcGVuZENoYXJSYXcoY2gsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoRnJvbSA9IE1hdGgubWluKHRoaXMubmVhcmVzdElucHV0UG9zKDAsIERJUkVDVElPTi5GT1JDRV9SSUdIVCksIHRoaXMudmFsdWUubGVuZ3RoKTtcbiAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5lbnVtLmZpbHRlcihlID0+IHRoaXMubWF0Y2hWYWx1ZShlLCB0aGlzLnVubWFza2VkVmFsdWUgKyBjaCwgbWF0Y2hGcm9tKSk7XG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoKSB7XG4gICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5fZm9yRWFjaEJsb2Nrc0luUmFuZ2UoMCwgdGhpcy52YWx1ZS5sZW5ndGgsIChiLCBiaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1jaCA9IG1hdGNoZXNbMF1bYmldO1xuICAgICAgICAgIGlmIChiaSA+PSB0aGlzLnZhbHVlLmxlbmd0aCB8fCBtY2ggPT09IGIudmFsdWUpIHJldHVybjtcbiAgICAgICAgICBiLnJlc2V0KCk7XG4gICAgICAgICAgYi5fYXBwZW5kQ2hhcihtY2gsIGZsYWdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBkID0gc3VwZXIuX2FwcGVuZENoYXJSYXcobWF0Y2hlc1swXVt0aGlzLnZhbHVlLmxlbmd0aF0sIGZsYWdzKTtcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtYXRjaGVzWzBdLnNsaWNlKHRoaXMudW5tYXNrZWRWYWx1ZS5sZW5ndGgpLnNwbGl0KCcnKS5mb3JFYWNoKG1jaCA9PiBkLmFnZ3JlZ2F0ZShzdXBlci5fYXBwZW5kQ2hhclJhdyhtY2gpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gIH1cbiAgZXh0cmFjdFRhaWwoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICAvLyBqdXN0IGRyb3AgdGFpbFxuICAgIHJldHVybiBuZXcgQ29udGludW91c1RhaWxEZXRhaWxzKCcnLCBmcm9tUG9zKTtcbiAgfVxuICByZW1vdmUoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoZnJvbVBvcyA9PT0gdG9Qb3MpIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIGNvbnN0IG1hdGNoRnJvbSA9IE1hdGgubWluKHN1cGVyLm5lYXJlc3RJbnB1dFBvcygwLCBESVJFQ1RJT04uRk9SQ0VfUklHSFQpLCB0aGlzLnZhbHVlLmxlbmd0aCk7XG4gICAgbGV0IHBvcztcbiAgICBmb3IgKHBvcyA9IGZyb21Qb3M7IHBvcyA+PSAwOyAtLXBvcykge1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IHRoaXMuZW51bS5maWx0ZXIoZSA9PiB0aGlzLm1hdGNoVmFsdWUoZSwgdGhpcy52YWx1ZS5zbGljZShtYXRjaEZyb20sIHBvcyksIG1hdGNoRnJvbSkpO1xuICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID4gMSkgYnJlYWs7XG4gICAgfVxuICAgIGNvbnN0IGRldGFpbHMgPSBzdXBlci5yZW1vdmUocG9zLCB0b1Bvcyk7XG4gICAgZGV0YWlscy50YWlsU2hpZnQgKz0gcG9zIC0gZnJvbVBvcztcbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxufVxuLyoqIE1hdGNoIGVudW0gdmFsdWUgKi9cbk1hc2tlZEVudW0uREVGQVVMVFMgPSB7XG4gIC4uLk1hc2tlZFBhdHRlcm4uREVGQVVMVFMsXG4gIG1hdGNoVmFsdWU6IChlc3RyLCBpc3RyLCBtYXRjaEZyb20pID0+IGVzdHIuaW5kZXhPZihpc3RyLCBtYXRjaEZyb20pID09PSBtYXRjaEZyb21cbn07XG5JTWFzay5NYXNrZWRFbnVtID0gTWFza2VkRW51bTtcblxuZXhwb3J0IHsgTWFza2VkRW51bSBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgeyBpc1N0cmluZywgaXNPYmplY3QsIHBpY2sgfSBmcm9tICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5cbi8vIFRPRE8gY2FuJ3QgdXNlIG92ZXJsb2FkcyBoZXJlIGJlY2F1c2Ugb2YgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy81MDc1NFxuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHN0cmluZyk6IHR5cGVvZiBNYXNrZWRQYXR0ZXJuO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IERhdGVDb25zdHJ1Y3Rvcik6IHR5cGVvZiBNYXNrZWREYXRlO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE51bWJlckNvbnN0cnVjdG9yKTogdHlwZW9mIE1hc2tlZE51bWJlcjtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiBBcnJheTxhbnk+IHwgQXJyYXlDb25zdHJ1Y3Rvcik6IHR5cGVvZiBNYXNrZWREeW5hbWljO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE1hc2tlZERhdGUpOiB0eXBlb2YgTWFza2VkRGF0ZTtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiBNYXNrZWROdW1iZXIpOiB0eXBlb2YgTWFza2VkTnVtYmVyO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE1hc2tlZEVudW0pOiB0eXBlb2YgTWFza2VkRW51bTtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiBNYXNrZWRSYW5nZSk6IHR5cGVvZiBNYXNrZWRSYW5nZTtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiBNYXNrZWRSZWdFeHApOiB0eXBlb2YgTWFza2VkUmVnRXhwO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE1hc2tlZEZ1bmN0aW9uKTogdHlwZW9mIE1hc2tlZEZ1bmN0aW9uO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE1hc2tlZFBhdHRlcm4pOiB0eXBlb2YgTWFza2VkUGF0dGVybjtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiBNYXNrZWREeW5hbWljKTogdHlwZW9mIE1hc2tlZER5bmFtaWM7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogTWFza2VkKTogdHlwZW9mIE1hc2tlZDtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiB0eXBlb2YgTWFza2VkKTogdHlwZW9mIE1hc2tlZDtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiB0eXBlb2YgTWFza2VkRGF0ZSk6IHR5cGVvZiBNYXNrZWREYXRlO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHR5cGVvZiBNYXNrZWROdW1iZXIpOiB0eXBlb2YgTWFza2VkTnVtYmVyO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHR5cGVvZiBNYXNrZWRFbnVtKTogdHlwZW9mIE1hc2tlZEVudW07XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogdHlwZW9mIE1hc2tlZFJhbmdlKTogdHlwZW9mIE1hc2tlZFJhbmdlO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHR5cGVvZiBNYXNrZWRSZWdFeHApOiB0eXBlb2YgTWFza2VkUmVnRXhwO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHR5cGVvZiBNYXNrZWRGdW5jdGlvbik6IHR5cGVvZiBNYXNrZWRGdW5jdGlvbjtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiB0eXBlb2YgTWFza2VkUGF0dGVybik6IHR5cGVvZiBNYXNrZWRQYXR0ZXJuO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHR5cGVvZiBNYXNrZWREeW5hbWljKTogdHlwZW9mIE1hc2tlZER5bmFtaWM7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3M8TWFzayBleHRlbmRzIHR5cGVvZiBNYXNrZWQ+IChtYXNrOiBNYXNrKTogTWFzaztcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiBSZWdFeHApOiB0eXBlb2YgTWFza2VkUmVnRXhwO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6ICh2YWx1ZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4gYm9vbGVhbik6IHR5cGVvZiBNYXNrZWRGdW5jdGlvbjtcblxuLyoqIEdldCBNYXNrZWQgY2xhc3MgYnkgbWFzayB0eXBlICovXG5mdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrKSAvKiBUT0RPICove1xuICBpZiAobWFzayA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ21hc2sgcHJvcGVydHkgc2hvdWxkIGJlIGRlZmluZWQnKTtcbiAgaWYgKG1hc2sgaW5zdGFuY2VvZiBSZWdFeHApIHJldHVybiBJTWFzay5NYXNrZWRSZWdFeHA7XG4gIGlmIChpc1N0cmluZyhtYXNrKSkgcmV0dXJuIElNYXNrLk1hc2tlZFBhdHRlcm47XG4gIGlmIChtYXNrID09PSBEYXRlKSByZXR1cm4gSU1hc2suTWFza2VkRGF0ZTtcbiAgaWYgKG1hc2sgPT09IE51bWJlcikgcmV0dXJuIElNYXNrLk1hc2tlZE51bWJlcjtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFzaykgfHwgbWFzayA9PT0gQXJyYXkpIHJldHVybiBJTWFzay5NYXNrZWREeW5hbWljO1xuICBpZiAoSU1hc2suTWFza2VkICYmIG1hc2sucHJvdG90eXBlIGluc3RhbmNlb2YgSU1hc2suTWFza2VkKSByZXR1cm4gbWFzaztcbiAgaWYgKElNYXNrLk1hc2tlZCAmJiBtYXNrIGluc3RhbmNlb2YgSU1hc2suTWFza2VkKSByZXR1cm4gbWFzay5jb25zdHJ1Y3RvcjtcbiAgaWYgKG1hc2sgaW5zdGFuY2VvZiBGdW5jdGlvbikgcmV0dXJuIElNYXNrLk1hc2tlZEZ1bmN0aW9uO1xuICBjb25zb2xlLndhcm4oJ01hc2sgbm90IGZvdW5kIGZvciBtYXNrJywgbWFzayk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICByZXR1cm4gSU1hc2suTWFza2VkO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplT3B0cyhvcHRzKSB7XG4gIGlmICghb3B0cykgdGhyb3cgbmV3IEVycm9yKCdPcHRpb25zIGluIG5vdCBkZWZpbmVkJyk7XG4gIGlmIChJTWFzay5NYXNrZWQpIHtcbiAgICBpZiAob3B0cy5wcm90b3R5cGUgaW5zdGFuY2VvZiBJTWFzay5NYXNrZWQpIHJldHVybiB7XG4gICAgICBtYXNrOiBvcHRzXG4gICAgfTtcblxuICAgIC8qXG4gICAgICBoYW5kbGUgY2FzZXMgbGlrZTpcbiAgICAgIDEpIG9wdHMgPSBNYXNrZWRcbiAgICAgIDIpIG9wdHMgPSB7IG1hc2s6IE1hc2tlZCwgLi4uaW5zdGFuY2VPcHRzIH1cbiAgICAqL1xuICAgIGNvbnN0IHtcbiAgICAgIG1hc2sgPSB1bmRlZmluZWQsXG4gICAgICAuLi5pbnN0YW5jZU9wdHNcbiAgICB9ID0gb3B0cyBpbnN0YW5jZW9mIElNYXNrLk1hc2tlZCA/IHtcbiAgICAgIG1hc2s6IG9wdHNcbiAgICB9IDogaXNPYmplY3Qob3B0cykgJiYgb3B0cy5tYXNrIGluc3RhbmNlb2YgSU1hc2suTWFza2VkID8gb3B0cyA6IHt9O1xuICAgIGlmIChtYXNrKSB7XG4gICAgICBjb25zdCBfbWFzayA9IG1hc2subWFzaztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnBpY2sobWFzaywgKF8sIGspID0+ICFrLnN0YXJ0c1dpdGgoJ18nKSksXG4gICAgICAgIG1hc2s6IG1hc2suY29uc3RydWN0b3IsXG4gICAgICAgIF9tYXNrLFxuICAgICAgICAuLi5pbnN0YW5jZU9wdHNcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGlmICghaXNPYmplY3Qob3B0cykpIHJldHVybiB7XG4gICAgbWFzazogb3B0c1xuICB9O1xuICByZXR1cm4ge1xuICAgIC4uLm9wdHNcbiAgfTtcbn1cblxuLy8gVE9ETyBjYW4ndCB1c2Ugb3ZlcmxvYWRzIGhlcmUgYmVjYXVzZSBvZiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzUwNzU0XG5cbi8vIEZyb20gbWFza2VkXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWQsIFJldHVybk1hc2tlZD1PcHRzPiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIC8vIEZyb20gbWFza2VkIGNsYXNzXG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWQ+LCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWQ9SW5zdGFuY2VUeXBlPE9wdHNbJ21hc2snXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczx0eXBlb2YgTWFza2VkRGF0ZT4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZERhdGU9TWFza2VkRGF0ZTxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczx0eXBlb2YgTWFza2VkTnVtYmVyPiwgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkTnVtYmVyPU1hc2tlZE51bWJlcjxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczx0eXBlb2YgTWFza2VkRW51bT4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZEVudW09TWFza2VkRW51bTxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczx0eXBlb2YgTWFza2VkUmFuZ2U+LCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWRSYW5nZT1NYXNrZWRSYW5nZTxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczx0eXBlb2YgTWFza2VkUmVnRXhwPiwgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkUmVnRXhwPU1hc2tlZFJlZ0V4cDxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczx0eXBlb2YgTWFza2VkRnVuY3Rpb24+LCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWRGdW5jdGlvbj1NYXNrZWRGdW5jdGlvbjxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczx0eXBlb2YgTWFza2VkUGF0dGVybj4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZFBhdHRlcm49TWFza2VkUGF0dGVybjxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczx0eXBlb2YgTWFza2VkRHluYW1pYz4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZER5bmFtaWM9TWFza2VkRHluYW1pYzxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gLy8gRnJvbSBtYXNrIG9wdHNcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZE9wdGlvbnM8TWFza2VkPiwgUmV0dXJuTWFza2VkPU9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPGluZmVyIE0+ID8gTSA6IG5ldmVyPiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZE51bWJlck9wdGlvbnMsIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZE51bWJlcj1NYXNrZWROdW1iZXI8T3B0c1sncGFyZW50J10+PiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZERhdGVGYWN0b3J5T3B0aW9ucywgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkRGF0ZT1NYXNrZWREYXRlPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRFbnVtT3B0aW9ucywgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkRW51bT1NYXNrZWRFbnVtPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRSYW5nZU9wdGlvbnMsIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZFJhbmdlPU1hc2tlZFJhbmdlPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRQYXR0ZXJuT3B0aW9ucywgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkUGF0dGVybj1NYXNrZWRQYXR0ZXJuPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWREeW5hbWljT3B0aW9ucywgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkRHluYW1pYz1NYXNrZWREeW5hbWljPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPFJlZ0V4cD4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZFJlZ0V4cD1NYXNrZWRSZWdFeHA8T3B0c1sncGFyZW50J10+PiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZE9wdGlvbnM8RnVuY3Rpb24+LCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWRGdW5jdGlvbj1NYXNrZWRGdW5jdGlvbjxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuXG4vKiogQ3JlYXRlcyBuZXcge0BsaW5rIE1hc2tlZH0gZGVwZW5kaW5nIG9uIG1hc2sgdHlwZSAqL1xuZnVuY3Rpb24gY3JlYXRlTWFzayhvcHRzKSB7XG4gIGlmIChJTWFzay5NYXNrZWQgJiYgb3B0cyBpbnN0YW5jZW9mIElNYXNrLk1hc2tlZCkgcmV0dXJuIG9wdHM7XG4gIGNvbnN0IG5PcHRzID0gbm9ybWFsaXplT3B0cyhvcHRzKTtcbiAgY29uc3QgTWFza2VkQ2xhc3MgPSBtYXNrZWRDbGFzcyhuT3B0cy5tYXNrKTtcbiAgaWYgKCFNYXNrZWRDbGFzcykgdGhyb3cgbmV3IEVycm9yKFwiTWFza2VkIGNsYXNzIGlzIG5vdCBmb3VuZCBmb3IgcHJvdmlkZWQgbWFzayBcIiArIG5PcHRzLm1hc2sgKyBcIiwgYXBwcm9wcmlhdGUgbW9kdWxlIG5lZWRzIHRvIGJlIGltcG9ydGVkIG1hbnVhbGx5IGJlZm9yZSBjcmVhdGluZyBtYXNrLlwiKTtcbiAgaWYgKG5PcHRzLm1hc2sgPT09IE1hc2tlZENsYXNzKSBkZWxldGUgbk9wdHMubWFzaztcbiAgaWYgKG5PcHRzLl9tYXNrKSB7XG4gICAgbk9wdHMubWFzayA9IG5PcHRzLl9tYXNrO1xuICAgIGRlbGV0ZSBuT3B0cy5fbWFzaztcbiAgfVxuICByZXR1cm4gbmV3IE1hc2tlZENsYXNzKG5PcHRzKTtcbn1cbklNYXNrLmNyZWF0ZU1hc2sgPSBjcmVhdGVNYXNrO1xuXG5leHBvcnQgeyBjcmVhdGVNYXNrIGFzIGRlZmF1bHQsIG1hc2tlZENsYXNzLCBub3JtYWxpemVPcHRzIH07XG4iLCJpbXBvcnQgTWFza2VkIGZyb20gJy4vYmFzZS5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0ICcuLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvdXRpbHMuanMnO1xuXG4vKiogTWFza2luZyBieSBjdXN0b20gRnVuY3Rpb24gKi9cbmNsYXNzIE1hc2tlZEZ1bmN0aW9uIGV4dGVuZHMgTWFza2VkIHtcbiAgLyoqICovXG5cbiAgLyoqIEVuYWJsZSBjaGFyYWN0ZXJzIG92ZXJ3cml0aW5nICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgdXBkYXRlT3B0aW9ucyhvcHRzKSB7XG4gICAgc3VwZXIudXBkYXRlT3B0aW9ucyhvcHRzKTtcbiAgfVxuICBfdXBkYXRlKG9wdHMpIHtcbiAgICBzdXBlci5fdXBkYXRlKHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICB2YWxpZGF0ZTogb3B0cy5tYXNrXG4gICAgfSk7XG4gIH1cbn1cbklNYXNrLk1hc2tlZEZ1bmN0aW9uID0gTWFza2VkRnVuY3Rpb247XG5cbmV4cG9ydCB7IE1hc2tlZEZ1bmN0aW9uIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCB7IGVzY2FwZVJlZ0V4cCwgRElSRUNUSU9OIH0gZnJvbSAnLi4vY29yZS91dGlscy5qcyc7XG5pbXBvcnQgQ2hhbmdlRGV0YWlscyBmcm9tICcuLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCBNYXNrZWQgZnJvbSAnLi9iYXNlLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvY29udGludW91cy10YWlsLWRldGFpbHMuanMnO1xuXG52YXIgX01hc2tlZE51bWJlcjtcbi8qKiBOdW1iZXIgbWFzayAqL1xuY2xhc3MgTWFza2VkTnVtYmVyIGV4dGVuZHMgTWFza2VkIHtcbiAgLyoqIFNpbmdsZSBjaGFyICovXG5cbiAgLyoqIFNpbmdsZSBjaGFyICovXG5cbiAgLyoqIEFycmF5IG9mIHNpbmdsZSBjaGFycyAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiBEaWdpdHMgYWZ0ZXIgcG9pbnQgKi9cblxuICAvKiogRmxhZyB0byByZW1vdmUgbGVhZGluZyBhbmQgdHJhaWxpbmcgemVyb3MgaW4gdGhlIGVuZCBvZiBlZGl0aW5nICovXG5cbiAgLyoqIEZsYWcgdG8gcGFkIHRyYWlsaW5nIHplcm9zIGFmdGVyIHBvaW50IGluIHRoZSBlbmQgb2YgZWRpdGluZyAqL1xuXG4gIC8qKiBFbmFibGUgY2hhcmFjdGVycyBvdmVyd3JpdGluZyAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiBGb3JtYXQgdHlwZWQgdmFsdWUgdG8gc3RyaW5nICovXG5cbiAgLyoqIFBhcnNlIHN0cmluZyB0byBnZXQgdHlwZWQgdmFsdWUgKi9cblxuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgc3VwZXIoe1xuICAgICAgLi4uTWFza2VkTnVtYmVyLkRFRkFVTFRTLFxuICAgICAgLi4ub3B0c1xuICAgIH0pO1xuICB9XG4gIHVwZGF0ZU9wdGlvbnMob3B0cykge1xuICAgIHN1cGVyLnVwZGF0ZU9wdGlvbnMob3B0cyk7XG4gIH1cbiAgX3VwZGF0ZShvcHRzKSB7XG4gICAgc3VwZXIuX3VwZGF0ZShvcHRzKTtcbiAgICB0aGlzLl91cGRhdGVSZWdFeHBzKCk7XG4gIH1cbiAgX3VwZGF0ZVJlZ0V4cHMoKSB7XG4gICAgY29uc3Qgc3RhcnQgPSAnXicgKyAodGhpcy5hbGxvd05lZ2F0aXZlID8gJ1srfFxcXFwtXT8nIDogJycpO1xuICAgIGNvbnN0IG1pZCA9ICdcXFxcZConO1xuICAgIGNvbnN0IGVuZCA9ICh0aGlzLnNjYWxlID8gXCIoXCIgKyBlc2NhcGVSZWdFeHAodGhpcy5yYWRpeCkgKyBcIlxcXFxkezAsXCIgKyB0aGlzLnNjYWxlICsgXCJ9KT9cIiA6ICcnKSArICckJztcbiAgICB0aGlzLl9udW1iZXJSZWdFeHAgPSBuZXcgUmVnRXhwKHN0YXJ0ICsgbWlkICsgZW5kKTtcbiAgICB0aGlzLl9tYXBUb1JhZGl4UmVnRXhwID0gbmV3IFJlZ0V4cChcIltcIiArIHRoaXMubWFwVG9SYWRpeC5tYXAoZXNjYXBlUmVnRXhwKS5qb2luKCcnKSArIFwiXVwiLCAnZycpO1xuICAgIHRoaXMuX3Rob3VzYW5kc1NlcGFyYXRvclJlZ0V4cCA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yKSwgJ2cnKTtcbiAgfVxuICBfcmVtb3ZlVGhvdXNhbmRzU2VwYXJhdG9ycyh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKHRoaXMuX3Rob3VzYW5kc1NlcGFyYXRvclJlZ0V4cCwgJycpO1xuICB9XG4gIF9pbnNlcnRUaG91c2FuZHNTZXBhcmF0b3JzKHZhbHVlKSB7XG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjkwMTEwMi9ob3ctdG8tcHJpbnQtYS1udW1iZXItd2l0aC1jb21tYXMtYXMtdGhvdXNhbmRzLXNlcGFyYXRvcnMtaW4tamF2YXNjcmlwdFxuICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQodGhpcy5yYWRpeCk7XG4gICAgcGFydHNbMF0gPSBwYXJ0c1swXS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCB0aGlzLnRob3VzYW5kc1NlcGFyYXRvcik7XG4gICAgcmV0dXJuIHBhcnRzLmpvaW4odGhpcy5yYWRpeCk7XG4gIH1cbiAgZG9QcmVwYXJlQ2hhcihjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgW3ByZXBDaCwgZGV0YWlsc10gPSBzdXBlci5kb1ByZXBhcmVDaGFyKHRoaXMuX3JlbW92ZVRob3VzYW5kc1NlcGFyYXRvcnModGhpcy5zY2FsZSAmJiB0aGlzLm1hcFRvUmFkaXgubGVuZ3RoICYmIChcbiAgICAvKlxuICAgICAgcmFkaXggc2hvdWxkIGJlIG1hcHBlZCB3aGVuXG4gICAgICAxKSBpbnB1dCBpcyBkb25lIGZyb20ga2V5Ym9hcmQgPSBmbGFncy5pbnB1dCAmJiBmbGFncy5yYXdcbiAgICAgIDIpIHVubWFza2VkIHZhbHVlIGlzIHNldCA9ICFmbGFncy5pbnB1dCAmJiAhZmxhZ3MucmF3XG4gICAgICBhbmQgc2hvdWxkIG5vdCBiZSBtYXBwZWQgd2hlblxuICAgICAgMSkgdmFsdWUgaXMgc2V0ID0gZmxhZ3MuaW5wdXQgJiYgIWZsYWdzLnJhd1xuICAgICAgMikgcmF3IHZhbHVlIGlzIHNldCA9ICFmbGFncy5pbnB1dCAmJiBmbGFncy5yYXdcbiAgICAqL1xuICAgIGZsYWdzLmlucHV0ICYmIGZsYWdzLnJhdyB8fCAhZmxhZ3MuaW5wdXQgJiYgIWZsYWdzLnJhdykgPyBjaC5yZXBsYWNlKHRoaXMuX21hcFRvUmFkaXhSZWdFeHAsIHRoaXMucmFkaXgpIDogY2gpLCBmbGFncyk7XG4gICAgaWYgKGNoICYmICFwcmVwQ2gpIGRldGFpbHMuc2tpcCA9IHRydWU7XG4gICAgaWYgKHByZXBDaCAmJiAhdGhpcy5hbGxvd1Bvc2l0aXZlICYmICF0aGlzLnZhbHVlICYmIHByZXBDaCAhPT0gJy0nKSBkZXRhaWxzLmFnZ3JlZ2F0ZSh0aGlzLl9hcHBlbmRDaGFyKCctJykpO1xuICAgIHJldHVybiBbcHJlcENoLCBkZXRhaWxzXTtcbiAgfVxuICBfc2VwYXJhdG9yc0NvdW50KHRvLCBleHRlbmRPblNlcGFyYXRvcnMpIHtcbiAgICBpZiAoZXh0ZW5kT25TZXBhcmF0b3JzID09PSB2b2lkIDApIHtcbiAgICAgIGV4dGVuZE9uU2VwYXJhdG9ycyA9IGZhbHNlO1xuICAgIH1cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IHBvcyA9IDA7IHBvcyA8IHRvOyArK3Bvcykge1xuICAgICAgaWYgKHRoaXMuX3ZhbHVlLmluZGV4T2YodGhpcy50aG91c2FuZHNTZXBhcmF0b3IsIHBvcykgPT09IHBvcykge1xuICAgICAgICArK2NvdW50O1xuICAgICAgICBpZiAoZXh0ZW5kT25TZXBhcmF0b3JzKSB0byArPSB0aGlzLnRob3VzYW5kc1NlcGFyYXRvci5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3VudDtcbiAgfVxuICBfc2VwYXJhdG9yc0NvdW50RnJvbVNsaWNlKHNsaWNlKSB7XG4gICAgaWYgKHNsaWNlID09PSB2b2lkIDApIHtcbiAgICAgIHNsaWNlID0gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zZXBhcmF0b3JzQ291bnQodGhpcy5fcmVtb3ZlVGhvdXNhbmRzU2VwYXJhdG9ycyhzbGljZSkubGVuZ3RoLCB0cnVlKTtcbiAgfVxuICBleHRyYWN0SW5wdXQoZnJvbVBvcywgdG9Qb3MsIGZsYWdzKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgW2Zyb21Qb3MsIHRvUG9zXSA9IHRoaXMuX2FkanVzdFJhbmdlV2l0aFNlcGFyYXRvcnMoZnJvbVBvcywgdG9Qb3MpO1xuICAgIHJldHVybiB0aGlzLl9yZW1vdmVUaG91c2FuZHNTZXBhcmF0b3JzKHN1cGVyLmV4dHJhY3RJbnB1dChmcm9tUG9zLCB0b1BvcywgZmxhZ3MpKTtcbiAgfVxuICBfYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgcHJldkJlZm9yZVRhaWxWYWx1ZSA9IGZsYWdzLnRhaWwgJiYgZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSA/IGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUuX3ZhbHVlIDogdGhpcy5fdmFsdWU7XG4gICAgY29uc3QgcHJldkJlZm9yZVRhaWxTZXBhcmF0b3JzQ291bnQgPSB0aGlzLl9zZXBhcmF0b3JzQ291bnRGcm9tU2xpY2UocHJldkJlZm9yZVRhaWxWYWx1ZSk7XG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLl9yZW1vdmVUaG91c2FuZHNTZXBhcmF0b3JzKHRoaXMudmFsdWUpO1xuICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgKz0gY2g7XG4gICAgY29uc3QgbnVtID0gdGhpcy5udW1iZXI7XG4gICAgbGV0IGFjY2VwdGVkID0gIWlzTmFOKG51bSk7XG4gICAgbGV0IHNraXAgPSBmYWxzZTtcbiAgICBpZiAoYWNjZXB0ZWQpIHtcbiAgICAgIGxldCBmaXhlZE51bTtcbiAgICAgIGlmICh0aGlzLm1pbiAhPSBudWxsICYmIHRoaXMubWluIDwgMCAmJiB0aGlzLm51bWJlciA8IHRoaXMubWluKSBmaXhlZE51bSA9IHRoaXMubWluO1xuICAgICAgaWYgKHRoaXMubWF4ICE9IG51bGwgJiYgdGhpcy5tYXggPiAwICYmIHRoaXMubnVtYmVyID4gdGhpcy5tYXgpIGZpeGVkTnVtID0gdGhpcy5tYXg7XG4gICAgICBpZiAoZml4ZWROdW0gIT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvZml4KSB7XG4gICAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLmZvcm1hdChmaXhlZE51bSwgdGhpcykucmVwbGFjZShNYXNrZWROdW1iZXIuVU5NQVNLRURfUkFESVgsIHRoaXMucmFkaXgpO1xuICAgICAgICAgIHNraXAgfHwgKHNraXAgPSBvbGRWYWx1ZSA9PT0gdGhpcy5fdmFsdWUgJiYgIWZsYWdzLnRhaWwpOyAvLyBpZiBub3QgY2hhbmdlZCBvbiB0YWlsIGl0J3Mgc3RpbGwgb2sgdG8gcHJvY2VlZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjY2VwdGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFjY2VwdGVkICYmIChhY2NlcHRlZCA9IEJvb2xlYW4odGhpcy5fdmFsdWUubWF0Y2godGhpcy5fbnVtYmVyUmVnRXhwKSkpO1xuICAgIH1cbiAgICBsZXQgYXBwZW5kRGV0YWlscztcbiAgICBpZiAoIWFjY2VwdGVkKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IG9sZFZhbHVlO1xuICAgICAgYXBwZW5kRGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcGVuZERldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscyh7XG4gICAgICAgIGluc2VydGVkOiB0aGlzLl92YWx1ZS5zbGljZShvbGRWYWx1ZS5sZW5ndGgpLFxuICAgICAgICByYXdJbnNlcnRlZDogc2tpcCA/ICcnIDogY2gsXG4gICAgICAgIHNraXBcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuX2luc2VydFRob3VzYW5kc1NlcGFyYXRvcnModGhpcy5fdmFsdWUpO1xuICAgIGNvbnN0IGJlZm9yZVRhaWxWYWx1ZSA9IGZsYWdzLnRhaWwgJiYgZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSA/IGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUuX3ZhbHVlIDogdGhpcy5fdmFsdWU7XG4gICAgY29uc3QgYmVmb3JlVGFpbFNlcGFyYXRvcnNDb3VudCA9IHRoaXMuX3NlcGFyYXRvcnNDb3VudEZyb21TbGljZShiZWZvcmVUYWlsVmFsdWUpO1xuICAgIGFwcGVuZERldGFpbHMudGFpbFNoaWZ0ICs9IChiZWZvcmVUYWlsU2VwYXJhdG9yc0NvdW50IC0gcHJldkJlZm9yZVRhaWxTZXBhcmF0b3JzQ291bnQpICogdGhpcy50aG91c2FuZHNTZXBhcmF0b3IubGVuZ3RoO1xuICAgIHJldHVybiBhcHBlbmREZXRhaWxzO1xuICB9XG4gIF9maW5kU2VwYXJhdG9yQXJvdW5kKHBvcykge1xuICAgIGlmICh0aGlzLnRob3VzYW5kc1NlcGFyYXRvcikge1xuICAgICAgY29uc3Qgc2VhcmNoRnJvbSA9IHBvcyAtIHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLmxlbmd0aCArIDE7XG4gICAgICBjb25zdCBzZXBhcmF0b3JQb3MgPSB0aGlzLnZhbHVlLmluZGV4T2YodGhpcy50aG91c2FuZHNTZXBhcmF0b3IsIHNlYXJjaEZyb20pO1xuICAgICAgaWYgKHNlcGFyYXRvclBvcyA8PSBwb3MpIHJldHVybiBzZXBhcmF0b3JQb3M7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuICBfYWRqdXN0UmFuZ2VXaXRoU2VwYXJhdG9ycyhmcm9tLCB0bykge1xuICAgIGNvbnN0IHNlcGFyYXRvckFyb3VuZEZyb21Qb3MgPSB0aGlzLl9maW5kU2VwYXJhdG9yQXJvdW5kKGZyb20pO1xuICAgIGlmIChzZXBhcmF0b3JBcm91bmRGcm9tUG9zID49IDApIGZyb20gPSBzZXBhcmF0b3JBcm91bmRGcm9tUG9zO1xuICAgIGNvbnN0IHNlcGFyYXRvckFyb3VuZFRvUG9zID0gdGhpcy5fZmluZFNlcGFyYXRvckFyb3VuZCh0byk7XG4gICAgaWYgKHNlcGFyYXRvckFyb3VuZFRvUG9zID49IDApIHRvID0gc2VwYXJhdG9yQXJvdW5kVG9Qb3MgKyB0aGlzLnRob3VzYW5kc1NlcGFyYXRvci5sZW5ndGg7XG4gICAgcmV0dXJuIFtmcm9tLCB0b107XG4gIH1cbiAgcmVtb3ZlKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgW2Zyb21Qb3MsIHRvUG9zXSA9IHRoaXMuX2FkanVzdFJhbmdlV2l0aFNlcGFyYXRvcnMoZnJvbVBvcywgdG9Qb3MpO1xuICAgIGNvbnN0IHZhbHVlQmVmb3JlUG9zID0gdGhpcy52YWx1ZS5zbGljZSgwLCBmcm9tUG9zKTtcbiAgICBjb25zdCB2YWx1ZUFmdGVyUG9zID0gdGhpcy52YWx1ZS5zbGljZSh0b1Bvcyk7XG4gICAgY29uc3QgcHJldkJlZm9yZVRhaWxTZXBhcmF0b3JzQ291bnQgPSB0aGlzLl9zZXBhcmF0b3JzQ291bnQodmFsdWVCZWZvcmVQb3MubGVuZ3RoKTtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuX2luc2VydFRob3VzYW5kc1NlcGFyYXRvcnModGhpcy5fcmVtb3ZlVGhvdXNhbmRzU2VwYXJhdG9ycyh2YWx1ZUJlZm9yZVBvcyArIHZhbHVlQWZ0ZXJQb3MpKTtcbiAgICBjb25zdCBiZWZvcmVUYWlsU2VwYXJhdG9yc0NvdW50ID0gdGhpcy5fc2VwYXJhdG9yc0NvdW50RnJvbVNsaWNlKHZhbHVlQmVmb3JlUG9zKTtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoe1xuICAgICAgdGFpbFNoaWZ0OiAoYmVmb3JlVGFpbFNlcGFyYXRvcnNDb3VudCAtIHByZXZCZWZvcmVUYWlsU2VwYXJhdG9yc0NvdW50KSAqIHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLmxlbmd0aFxuICAgIH0pO1xuICB9XG4gIG5lYXJlc3RJbnB1dFBvcyhjdXJzb3JQb3MsIGRpcmVjdGlvbikge1xuICAgIGlmICghdGhpcy50aG91c2FuZHNTZXBhcmF0b3IpIHJldHVybiBjdXJzb3JQb3M7XG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgRElSRUNUSU9OLk5PTkU6XG4gICAgICBjYXNlIERJUkVDVElPTi5MRUZUOlxuICAgICAgY2FzZSBESVJFQ1RJT04uRk9SQ0VfTEVGVDpcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IHNlcGFyYXRvckF0TGVmdFBvcyA9IHRoaXMuX2ZpbmRTZXBhcmF0b3JBcm91bmQoY3Vyc29yUG9zIC0gMSk7XG4gICAgICAgICAgaWYgKHNlcGFyYXRvckF0TGVmdFBvcyA+PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBzZXBhcmF0b3JBdExlZnRFbmRQb3MgPSBzZXBhcmF0b3JBdExlZnRQb3MgKyB0aGlzLnRob3VzYW5kc1NlcGFyYXRvci5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoY3Vyc29yUG9zIDwgc2VwYXJhdG9yQXRMZWZ0RW5kUG9zIHx8IHRoaXMudmFsdWUubGVuZ3RoIDw9IHNlcGFyYXRvckF0TGVmdEVuZFBvcyB8fCBkaXJlY3Rpb24gPT09IERJUkVDVElPTi5GT1JDRV9MRUZUKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZXBhcmF0b3JBdExlZnRQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlIERJUkVDVElPTi5SSUdIVDpcbiAgICAgIGNhc2UgRElSRUNUSU9OLkZPUkNFX1JJR0hUOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3Qgc2VwYXJhdG9yQXRSaWdodFBvcyA9IHRoaXMuX2ZpbmRTZXBhcmF0b3JBcm91bmQoY3Vyc29yUG9zKTtcbiAgICAgICAgICBpZiAoc2VwYXJhdG9yQXRSaWdodFBvcyA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VwYXJhdG9yQXRSaWdodFBvcyArIHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN1cnNvclBvcztcbiAgfVxuICBkb0NvbW1pdCgpIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgY29uc3QgbnVtYmVyID0gdGhpcy5udW1iZXI7XG4gICAgICBsZXQgdmFsaWRudW0gPSBudW1iZXI7XG5cbiAgICAgIC8vIGNoZWNrIGJvdW5kc1xuICAgICAgaWYgKHRoaXMubWluICE9IG51bGwpIHZhbGlkbnVtID0gTWF0aC5tYXgodmFsaWRudW0sIHRoaXMubWluKTtcbiAgICAgIGlmICh0aGlzLm1heCAhPSBudWxsKSB2YWxpZG51bSA9IE1hdGgubWluKHZhbGlkbnVtLCB0aGlzLm1heCk7XG4gICAgICBpZiAodmFsaWRudW0gIT09IG51bWJlcikgdGhpcy51bm1hc2tlZFZhbHVlID0gdGhpcy5mb3JtYXQodmFsaWRudW0sIHRoaXMpO1xuICAgICAgbGV0IGZvcm1hdHRlZCA9IHRoaXMudmFsdWU7XG4gICAgICBpZiAodGhpcy5ub3JtYWxpemVaZXJvcykgZm9ybWF0dGVkID0gdGhpcy5fbm9ybWFsaXplWmVyb3MoZm9ybWF0dGVkKTtcbiAgICAgIGlmICh0aGlzLnBhZEZyYWN0aW9uYWxaZXJvcyAmJiB0aGlzLnNjYWxlID4gMCkgZm9ybWF0dGVkID0gdGhpcy5fcGFkRnJhY3Rpb25hbFplcm9zKGZvcm1hdHRlZCk7XG4gICAgICB0aGlzLl92YWx1ZSA9IGZvcm1hdHRlZDtcbiAgICB9XG4gICAgc3VwZXIuZG9Db21taXQoKTtcbiAgfVxuICBfbm9ybWFsaXplWmVyb3ModmFsdWUpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHRoaXMuX3JlbW92ZVRob3VzYW5kc1NlcGFyYXRvcnModmFsdWUpLnNwbGl0KHRoaXMucmFkaXgpO1xuXG4gICAgLy8gcmVtb3ZlIGxlYWRpbmcgemVyb3NcbiAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnJlcGxhY2UoL14oXFxEKikoMCopKFxcZCopLywgKG1hdGNoLCBzaWduLCB6ZXJvcywgbnVtKSA9PiBzaWduICsgbnVtKTtcbiAgICAvLyBhZGQgbGVhZGluZyB6ZXJvXG4gICAgaWYgKHZhbHVlLmxlbmd0aCAmJiAhL1xcZCQvLnRlc3QocGFydHNbMF0pKSBwYXJ0c1swXSA9IHBhcnRzWzBdICsgJzAnO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICBwYXJ0c1sxXSA9IHBhcnRzWzFdLnJlcGxhY2UoLzAqJC8sICcnKTsgLy8gcmVtb3ZlIHRyYWlsaW5nIHplcm9zXG4gICAgICBpZiAoIXBhcnRzWzFdLmxlbmd0aCkgcGFydHMubGVuZ3RoID0gMTsgLy8gcmVtb3ZlIGZyYWN0aW9uYWxcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2luc2VydFRob3VzYW5kc1NlcGFyYXRvcnMocGFydHMuam9pbih0aGlzLnJhZGl4KSk7XG4gIH1cbiAgX3BhZEZyYWN0aW9uYWxaZXJvcyh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpIHJldHVybiB2YWx1ZTtcbiAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KHRoaXMucmFkaXgpO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggPCAyKSBwYXJ0cy5wdXNoKCcnKTtcbiAgICBwYXJ0c1sxXSA9IHBhcnRzWzFdLnBhZEVuZCh0aGlzLnNjYWxlLCAnMCcpO1xuICAgIHJldHVybiBwYXJ0cy5qb2luKHRoaXMucmFkaXgpO1xuICB9XG4gIGRvU2tpcEludmFsaWQoY2gsIGZsYWdzLCBjaGVja1RhaWwpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgZHJvcEZyYWN0aW9uYWwgPSB0aGlzLnNjYWxlID09PSAwICYmIGNoICE9PSB0aGlzLnRob3VzYW5kc1NlcGFyYXRvciAmJiAoY2ggPT09IHRoaXMucmFkaXggfHwgY2ggPT09IE1hc2tlZE51bWJlci5VTk1BU0tFRF9SQURJWCB8fCB0aGlzLm1hcFRvUmFkaXguaW5jbHVkZXMoY2gpKTtcbiAgICByZXR1cm4gc3VwZXIuZG9Ta2lwSW52YWxpZChjaCwgZmxhZ3MsIGNoZWNrVGFpbCkgJiYgIWRyb3BGcmFjdGlvbmFsO1xuICB9XG4gIGdldCB1bm1hc2tlZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZW1vdmVUaG91c2FuZHNTZXBhcmF0b3JzKHRoaXMuX25vcm1hbGl6ZVplcm9zKHRoaXMudmFsdWUpKS5yZXBsYWNlKHRoaXMucmFkaXgsIE1hc2tlZE51bWJlci5VTk1BU0tFRF9SQURJWCk7XG4gIH1cbiAgc2V0IHVubWFza2VkVmFsdWUodW5tYXNrZWRWYWx1ZSkge1xuICAgIHN1cGVyLnVubWFza2VkVmFsdWUgPSB1bm1hc2tlZFZhbHVlO1xuICB9XG4gIGdldCB0eXBlZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlKHRoaXMudW5tYXNrZWRWYWx1ZSwgdGhpcyk7XG4gIH1cbiAgc2V0IHR5cGVkVmFsdWUobikge1xuICAgIHRoaXMucmF3SW5wdXRWYWx1ZSA9IHRoaXMuZm9ybWF0KG4sIHRoaXMpLnJlcGxhY2UoTWFza2VkTnVtYmVyLlVOTUFTS0VEX1JBRElYLCB0aGlzLnJhZGl4KTtcbiAgfVxuXG4gIC8qKiBQYXJzZWQgTnVtYmVyICovXG4gIGdldCBudW1iZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZWRWYWx1ZTtcbiAgfVxuICBzZXQgbnVtYmVyKG51bWJlcikge1xuICAgIHRoaXMudHlwZWRWYWx1ZSA9IG51bWJlcjtcbiAgfVxuICBnZXQgYWxsb3dOZWdhdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5taW4gIT0gbnVsbCAmJiB0aGlzLm1pbiA8IDAgfHwgdGhpcy5tYXggIT0gbnVsbCAmJiB0aGlzLm1heCA8IDA7XG4gIH1cbiAgZ2V0IGFsbG93UG9zaXRpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWluICE9IG51bGwgJiYgdGhpcy5taW4gPiAwIHx8IHRoaXMubWF4ICE9IG51bGwgJiYgdGhpcy5tYXggPiAwO1xuICB9XG4gIHR5cGVkVmFsdWVFcXVhbHModmFsdWUpIHtcbiAgICAvLyBoYW5kbGUgIDAgLT4gJycgY2FzZSAodHlwZWQgPSAwIGV2ZW4gaWYgdmFsdWUgPSAnJylcbiAgICAvLyBmb3IgZGV0YWlscyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3VObUFuTmVSL2ltYXNranMvaXNzdWVzLzEzNFxuICAgIHJldHVybiAoc3VwZXIudHlwZWRWYWx1ZUVxdWFscyh2YWx1ZSkgfHwgTWFza2VkTnVtYmVyLkVNUFRZX1ZBTFVFUy5pbmNsdWRlcyh2YWx1ZSkgJiYgTWFza2VkTnVtYmVyLkVNUFRZX1ZBTFVFUy5pbmNsdWRlcyh0aGlzLnR5cGVkVmFsdWUpKSAmJiAhKHZhbHVlID09PSAwICYmIHRoaXMudmFsdWUgPT09ICcnKTtcbiAgfVxufVxuX01hc2tlZE51bWJlciA9IE1hc2tlZE51bWJlcjtcbk1hc2tlZE51bWJlci5VTk1BU0tFRF9SQURJWCA9ICcuJztcbk1hc2tlZE51bWJlci5FTVBUWV9WQUxVRVMgPSBbLi4uTWFza2VkLkVNUFRZX1ZBTFVFUywgMF07XG5NYXNrZWROdW1iZXIuREVGQVVMVFMgPSB7XG4gIC4uLk1hc2tlZC5ERUZBVUxUUyxcbiAgbWFzazogTnVtYmVyLFxuICByYWRpeDogJywnLFxuICB0aG91c2FuZHNTZXBhcmF0b3I6ICcnLFxuICBtYXBUb1JhZGl4OiBbX01hc2tlZE51bWJlci5VTk1BU0tFRF9SQURJWF0sXG4gIG1pbjogTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIsXG4gIG1heDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXG4gIHNjYWxlOiAyLFxuICBub3JtYWxpemVaZXJvczogdHJ1ZSxcbiAgcGFkRnJhY3Rpb25hbFplcm9zOiBmYWxzZSxcbiAgcGFyc2U6IE51bWJlcixcbiAgZm9ybWF0OiBuID0+IG4udG9Mb2NhbGVTdHJpbmcoJ2VuLVVTJywge1xuICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIwXG4gIH0pXG59O1xuSU1hc2suTWFza2VkTnVtYmVyID0gTWFza2VkTnVtYmVyO1xuXG5leHBvcnQgeyBNYXNrZWROdW1iZXIgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IENoYW5nZURldGFpbHMgZnJvbSAnLi4vY29yZS9jaGFuZ2UtZGV0YWlscy5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi4vY29yZS91dGlscy5qcyc7XG5pbXBvcnQgTWFza2VkIGZyb20gJy4vYmFzZS5qcyc7XG5pbXBvcnQgY3JlYXRlTWFzaywgeyBub3JtYWxpemVPcHRzIH0gZnJvbSAnLi9mYWN0b3J5LmpzJztcbmltcG9ydCBDaHVua3NUYWlsRGV0YWlscyBmcm9tICcuL3BhdHRlcm4vY2h1bmstdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCBQYXR0ZXJuQ3Vyc29yIGZyb20gJy4vcGF0dGVybi9jdXJzb3IuanMnO1xuaW1wb3J0IFBhdHRlcm5GaXhlZERlZmluaXRpb24gZnJvbSAnLi9wYXR0ZXJuL2ZpeGVkLWRlZmluaXRpb24uanMnO1xuaW1wb3J0IFBhdHRlcm5JbnB1dERlZmluaXRpb24gZnJvbSAnLi9wYXR0ZXJuL2lucHV0LWRlZmluaXRpb24uanMnO1xuaW1wb3J0ICcuL3JlZ2V4cC5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvY29udGludW91cy10YWlsLWRldGFpbHMuanMnO1xuXG4vKiogUGF0dGVybiBtYXNrICovXG5jbGFzcyBNYXNrZWRQYXR0ZXJuIGV4dGVuZHMgTWFza2VkIHtcbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqIFNpbmdsZSBjaGFyIGZvciBlbXB0eSBpbnB1dCAqL1xuXG4gIC8qKiBTaW5nbGUgY2hhciBmb3IgZmlsbGVkIGlucHV0ICovXG5cbiAgLyoqIFNob3cgcGxhY2Vob2xkZXIgb25seSB3aGVuIG5lZWRlZCAqL1xuXG4gIC8qKiBFbmFibGUgY2hhcmFjdGVycyBvdmVyd3JpdGluZyAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBzdXBlcih7XG4gICAgICAuLi5NYXNrZWRQYXR0ZXJuLkRFRkFVTFRTLFxuICAgICAgLi4ub3B0cyxcbiAgICAgIGRlZmluaXRpb25zOiBPYmplY3QuYXNzaWduKHt9LCBQYXR0ZXJuSW5wdXREZWZpbml0aW9uLkRFRkFVTFRfREVGSU5JVElPTlMsIG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdHMuZGVmaW5pdGlvbnMpXG4gICAgfSk7XG4gIH1cbiAgdXBkYXRlT3B0aW9ucyhvcHRzKSB7XG4gICAgc3VwZXIudXBkYXRlT3B0aW9ucyhvcHRzKTtcbiAgfVxuICBfdXBkYXRlKG9wdHMpIHtcbiAgICBvcHRzLmRlZmluaXRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZpbml0aW9ucywgb3B0cy5kZWZpbml0aW9ucyk7XG4gICAgc3VwZXIuX3VwZGF0ZShvcHRzKTtcbiAgICB0aGlzLl9yZWJ1aWxkTWFzaygpO1xuICB9XG4gIF9yZWJ1aWxkTWFzaygpIHtcbiAgICBjb25zdCBkZWZzID0gdGhpcy5kZWZpbml0aW9ucztcbiAgICB0aGlzLl9ibG9ja3MgPSBbXTtcbiAgICB0aGlzLmV4cG9zZUJsb2NrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3N0b3BzID0gW107XG4gICAgdGhpcy5fbWFza2VkQmxvY2tzID0ge307XG4gICAgY29uc3QgcGF0dGVybiA9IHRoaXMubWFzaztcbiAgICBpZiAoIXBhdHRlcm4gfHwgIWRlZnMpIHJldHVybjtcbiAgICBsZXQgdW5tYXNraW5nQmxvY2sgPSBmYWxzZTtcbiAgICBsZXQgb3B0aW9uYWxCbG9jayA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7ICsraSkge1xuICAgICAgaWYgKHRoaXMuYmxvY2tzKSB7XG4gICAgICAgIGNvbnN0IHAgPSBwYXR0ZXJuLnNsaWNlKGkpO1xuICAgICAgICBjb25zdCBiTmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmJsb2NrcykuZmlsdGVyKGJOYW1lID0+IHAuaW5kZXhPZihiTmFtZSkgPT09IDApO1xuICAgICAgICAvLyBvcmRlciBieSBrZXkgbGVuZ3RoXG4gICAgICAgIGJOYW1lcy5zb3J0KChhLCBiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKTtcbiAgICAgICAgLy8gdXNlIGJsb2NrIG5hbWUgd2l0aCBtYXggbGVuZ3RoXG4gICAgICAgIGNvbnN0IGJOYW1lID0gYk5hbWVzWzBdO1xuICAgICAgICBpZiAoYk5hbWUpIHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBleHBvc2UsXG4gICAgICAgICAgICByZXBlYXQsXG4gICAgICAgICAgICAuLi5iT3B0c1xuICAgICAgICAgIH0gPSBub3JtYWxpemVPcHRzKHRoaXMuYmxvY2tzW2JOYW1lXSk7IC8vIFRPRE8gdHlwZSBPcHRzPEFyZyAmIEV4dHJhPlxuICAgICAgICAgIGNvbnN0IGJsb2NrT3B0cyA9IHtcbiAgICAgICAgICAgIGxhenk6IHRoaXMubGF6eSxcbiAgICAgICAgICAgIGVhZ2VyOiB0aGlzLmVhZ2VyLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiB0aGlzLnBsYWNlaG9sZGVyQ2hhcixcbiAgICAgICAgICAgIGRpc3BsYXlDaGFyOiB0aGlzLmRpc3BsYXlDaGFyLFxuICAgICAgICAgICAgb3ZlcndyaXRlOiB0aGlzLm92ZXJ3cml0ZSxcbiAgICAgICAgICAgIGF1dG9maXg6IHRoaXMuYXV0b2ZpeCxcbiAgICAgICAgICAgIC4uLmJPcHRzLFxuICAgICAgICAgICAgcmVwZWF0LFxuICAgICAgICAgICAgcGFyZW50OiB0aGlzXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCBtYXNrZWRCbG9jayA9IHJlcGVhdCAhPSBudWxsID8gbmV3IElNYXNrLlJlcGVhdEJsb2NrKGJsb2NrT3B0cyAvKiBUT0RPICovKSA6IGNyZWF0ZU1hc2soYmxvY2tPcHRzKTtcbiAgICAgICAgICBpZiAobWFza2VkQmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2Jsb2Nrcy5wdXNoKG1hc2tlZEJsb2NrKTtcbiAgICAgICAgICAgIGlmIChleHBvc2UpIHRoaXMuZXhwb3NlQmxvY2sgPSBtYXNrZWRCbG9jaztcblxuICAgICAgICAgICAgLy8gc3RvcmUgYmxvY2sgaW5kZXhcbiAgICAgICAgICAgIGlmICghdGhpcy5fbWFza2VkQmxvY2tzW2JOYW1lXSkgdGhpcy5fbWFza2VkQmxvY2tzW2JOYW1lXSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWFza2VkQmxvY2tzW2JOYW1lXS5wdXNoKHRoaXMuX2Jsb2Nrcy5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaSArPSBiTmFtZS5sZW5ndGggLSAxO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgY2hhciA9IHBhdHRlcm5baV07XG4gICAgICBsZXQgaXNJbnB1dCA9IChjaGFyIGluIGRlZnMpO1xuICAgICAgaWYgKGNoYXIgPT09IE1hc2tlZFBhdHRlcm4uU1RPUF9DSEFSKSB7XG4gICAgICAgIHRoaXMuX3N0b3BzLnB1c2godGhpcy5fYmxvY2tzLmxlbmd0aCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGNoYXIgPT09ICd7JyB8fCBjaGFyID09PSAnfScpIHtcbiAgICAgICAgdW5tYXNraW5nQmxvY2sgPSAhdW5tYXNraW5nQmxvY2s7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGNoYXIgPT09ICdbJyB8fCBjaGFyID09PSAnXScpIHtcbiAgICAgICAgb3B0aW9uYWxCbG9jayA9ICFvcHRpb25hbEJsb2NrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFyID09PSBNYXNrZWRQYXR0ZXJuLkVTQ0FQRV9DSEFSKSB7XG4gICAgICAgICsraTtcbiAgICAgICAgY2hhciA9IHBhdHRlcm5baV07XG4gICAgICAgIGlmICghY2hhcikgYnJlYWs7XG4gICAgICAgIGlzSW5wdXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRlZiA9IGlzSW5wdXQgPyBuZXcgUGF0dGVybklucHV0RGVmaW5pdGlvbih7XG4gICAgICAgIGlzT3B0aW9uYWw6IG9wdGlvbmFsQmxvY2ssXG4gICAgICAgIGxhenk6IHRoaXMubGF6eSxcbiAgICAgICAgZWFnZXI6IHRoaXMuZWFnZXIsXG4gICAgICAgIHBsYWNlaG9sZGVyQ2hhcjogdGhpcy5wbGFjZWhvbGRlckNoYXIsXG4gICAgICAgIGRpc3BsYXlDaGFyOiB0aGlzLmRpc3BsYXlDaGFyLFxuICAgICAgICAuLi5ub3JtYWxpemVPcHRzKGRlZnNbY2hhcl0pLFxuICAgICAgICBwYXJlbnQ6IHRoaXNcbiAgICAgIH0pIDogbmV3IFBhdHRlcm5GaXhlZERlZmluaXRpb24oe1xuICAgICAgICBjaGFyLFxuICAgICAgICBlYWdlcjogdGhpcy5lYWdlcixcbiAgICAgICAgaXNVbm1hc2tpbmc6IHVubWFza2luZ0Jsb2NrXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2Jsb2Nrcy5wdXNoKGRlZik7XG4gICAgfVxuICB9XG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuc3RhdGUsXG4gICAgICBfYmxvY2tzOiB0aGlzLl9ibG9ja3MubWFwKGIgPT4gYi5zdGF0ZSlcbiAgICB9O1xuICB9XG4gIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgX2Jsb2NrcyxcbiAgICAgIC4uLm1hc2tlZFN0YXRlXG4gICAgfSA9IHN0YXRlO1xuICAgIHRoaXMuX2Jsb2Nrcy5mb3JFYWNoKChiLCBiaSkgPT4gYi5zdGF0ZSA9IF9ibG9ja3NbYmldKTtcbiAgICBzdXBlci5zdGF0ZSA9IG1hc2tlZFN0YXRlO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHN1cGVyLnJlc2V0KCk7XG4gICAgdGhpcy5fYmxvY2tzLmZvckVhY2goYiA9PiBiLnJlc2V0KCkpO1xuICB9XG4gIGdldCBpc0NvbXBsZXRlKCkge1xuICAgIHJldHVybiB0aGlzLmV4cG9zZUJsb2NrID8gdGhpcy5leHBvc2VCbG9jay5pc0NvbXBsZXRlIDogdGhpcy5fYmxvY2tzLmV2ZXJ5KGIgPT4gYi5pc0NvbXBsZXRlKTtcbiAgfVxuICBnZXQgaXNGaWxsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jsb2Nrcy5ldmVyeShiID0+IGIuaXNGaWxsZWQpO1xuICB9XG4gIGdldCBpc0ZpeGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9ibG9ja3MuZXZlcnkoYiA9PiBiLmlzRml4ZWQpO1xuICB9XG4gIGdldCBpc09wdGlvbmFsKCkge1xuICAgIHJldHVybiB0aGlzLl9ibG9ja3MuZXZlcnkoYiA9PiBiLmlzT3B0aW9uYWwpO1xuICB9XG4gIGRvQ29tbWl0KCkge1xuICAgIHRoaXMuX2Jsb2Nrcy5mb3JFYWNoKGIgPT4gYi5kb0NvbW1pdCgpKTtcbiAgICBzdXBlci5kb0NvbW1pdCgpO1xuICB9XG4gIGdldCB1bm1hc2tlZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmV4cG9zZUJsb2NrID8gdGhpcy5leHBvc2VCbG9jay51bm1hc2tlZFZhbHVlIDogdGhpcy5fYmxvY2tzLnJlZHVjZSgoc3RyLCBiKSA9PiBzdHIgKz0gYi51bm1hc2tlZFZhbHVlLCAnJyk7XG4gIH1cbiAgc2V0IHVubWFza2VkVmFsdWUodW5tYXNrZWRWYWx1ZSkge1xuICAgIGlmICh0aGlzLmV4cG9zZUJsb2NrKSB7XG4gICAgICBjb25zdCB0YWlsID0gdGhpcy5leHRyYWN0VGFpbCh0aGlzLl9ibG9ja1N0YXJ0UG9zKHRoaXMuX2Jsb2Nrcy5pbmRleE9mKHRoaXMuZXhwb3NlQmxvY2spKSArIHRoaXMuZXhwb3NlQmxvY2suZGlzcGxheVZhbHVlLmxlbmd0aCk7XG4gICAgICB0aGlzLmV4cG9zZUJsb2NrLnVubWFza2VkVmFsdWUgPSB1bm1hc2tlZFZhbHVlO1xuICAgICAgdGhpcy5hcHBlbmRUYWlsKHRhaWwpO1xuICAgICAgdGhpcy5kb0NvbW1pdCgpO1xuICAgIH0gZWxzZSBzdXBlci51bm1hc2tlZFZhbHVlID0gdW5tYXNrZWRWYWx1ZTtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb3NlQmxvY2sgPyB0aGlzLmV4cG9zZUJsb2NrLnZhbHVlIDpcbiAgICAvLyBUT0RPIHJldHVybiBfdmFsdWUgd2hlbiBub3QgaW4gY2hhbmdlP1xuICAgIHRoaXMuX2Jsb2Nrcy5yZWR1Y2UoKHN0ciwgYikgPT4gc3RyICs9IGIudmFsdWUsICcnKTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5leHBvc2VCbG9jaykge1xuICAgICAgY29uc3QgdGFpbCA9IHRoaXMuZXh0cmFjdFRhaWwodGhpcy5fYmxvY2tTdGFydFBvcyh0aGlzLl9ibG9ja3MuaW5kZXhPZih0aGlzLmV4cG9zZUJsb2NrKSkgKyB0aGlzLmV4cG9zZUJsb2NrLmRpc3BsYXlWYWx1ZS5sZW5ndGgpO1xuICAgICAgdGhpcy5leHBvc2VCbG9jay52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5hcHBlbmRUYWlsKHRhaWwpO1xuICAgICAgdGhpcy5kb0NvbW1pdCgpO1xuICAgIH0gZWxzZSBzdXBlci52YWx1ZSA9IHZhbHVlO1xuICB9XG4gIGdldCB0eXBlZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmV4cG9zZUJsb2NrID8gdGhpcy5leHBvc2VCbG9jay50eXBlZFZhbHVlIDogc3VwZXIudHlwZWRWYWx1ZTtcbiAgfVxuICBzZXQgdHlwZWRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmV4cG9zZUJsb2NrKSB7XG4gICAgICBjb25zdCB0YWlsID0gdGhpcy5leHRyYWN0VGFpbCh0aGlzLl9ibG9ja1N0YXJ0UG9zKHRoaXMuX2Jsb2Nrcy5pbmRleE9mKHRoaXMuZXhwb3NlQmxvY2spKSArIHRoaXMuZXhwb3NlQmxvY2suZGlzcGxheVZhbHVlLmxlbmd0aCk7XG4gICAgICB0aGlzLmV4cG9zZUJsb2NrLnR5cGVkVmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuYXBwZW5kVGFpbCh0YWlsKTtcbiAgICAgIHRoaXMuZG9Db21taXQoKTtcbiAgICB9IGVsc2Ugc3VwZXIudHlwZWRWYWx1ZSA9IHZhbHVlO1xuICB9XG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jsb2Nrcy5yZWR1Y2UoKHN0ciwgYikgPT4gc3RyICs9IGIuZGlzcGxheVZhbHVlLCAnJyk7XG4gIH1cbiAgYXBwZW5kVGFpbCh0YWlsKSB7XG4gICAgcmV0dXJuIHN1cGVyLmFwcGVuZFRhaWwodGFpbCkuYWdncmVnYXRlKHRoaXMuX2FwcGVuZFBsYWNlaG9sZGVyKCkpO1xuICB9XG4gIF9hcHBlbmRFYWdlcigpIHtcbiAgICB2YXIgX3RoaXMkX21hcFBvc1RvQmxvY2s7XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgbGV0IHN0YXJ0QmxvY2tJbmRleCA9IChfdGhpcyRfbWFwUG9zVG9CbG9jayA9IHRoaXMuX21hcFBvc1RvQmxvY2sodGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJF9tYXBQb3NUb0Jsb2NrLmluZGV4O1xuICAgIGlmIChzdGFydEJsb2NrSW5kZXggPT0gbnVsbCkgcmV0dXJuIGRldGFpbHM7XG5cbiAgICAvLyBUT0RPIHRlc3QgaWYgaXQgd29ya3MgZm9yIG5lc3RlZCBwYXR0ZXJuIG1hc2tzXG4gICAgaWYgKHRoaXMuX2Jsb2Nrc1tzdGFydEJsb2NrSW5kZXhdLmlzRmlsbGVkKSArK3N0YXJ0QmxvY2tJbmRleDtcbiAgICBmb3IgKGxldCBiaSA9IHN0YXJ0QmxvY2tJbmRleDsgYmkgPCB0aGlzLl9ibG9ja3MubGVuZ3RoOyArK2JpKSB7XG4gICAgICBjb25zdCBkID0gdGhpcy5fYmxvY2tzW2JpXS5fYXBwZW5kRWFnZXIoKTtcbiAgICAgIGlmICghZC5pbnNlcnRlZCkgYnJlYWs7XG4gICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZShkKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbiAgX2FwcGVuZENoYXJSYXcoY2gsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGNvbnN0IGJsb2NrSXRlciA9IHRoaXMuX21hcFBvc1RvQmxvY2sodGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoKTtcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBpZiAoIWJsb2NrSXRlcikgcmV0dXJuIGRldGFpbHM7XG4gICAgZm9yIChsZXQgYmkgPSBibG9ja0l0ZXIuaW5kZXgsIGJsb2NrOyBibG9jayA9IHRoaXMuX2Jsb2Nrc1tiaV07ICsrYmkpIHtcbiAgICAgIHZhciBfZmxhZ3MkX2JlZm9yZVRhaWxTdGE7XG4gICAgICBjb25zdCBibG9ja0RldGFpbHMgPSBibG9jay5fYXBwZW5kQ2hhcihjaCwge1xuICAgICAgICAuLi5mbGFncyxcbiAgICAgICAgX2JlZm9yZVRhaWxTdGF0ZTogKF9mbGFncyRfYmVmb3JlVGFpbFN0YSA9IGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUpID09IG51bGwgfHwgKF9mbGFncyRfYmVmb3JlVGFpbFN0YSA9IF9mbGFncyRfYmVmb3JlVGFpbFN0YS5fYmxvY2tzKSA9PSBudWxsID8gdm9pZCAwIDogX2ZsYWdzJF9iZWZvcmVUYWlsU3RhW2JpXVxuICAgICAgfSk7XG4gICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZShibG9ja0RldGFpbHMpO1xuICAgICAgaWYgKGJsb2NrRGV0YWlscy5jb25zdW1lZCkgYnJlYWs7IC8vIGdvIG5leHQgY2hhclxuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBleHRyYWN0VGFpbChmcm9tUG9zLCB0b1Bvcykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGNvbnN0IGNodW5rVGFpbCA9IG5ldyBDaHVua3NUYWlsRGV0YWlscygpO1xuICAgIGlmIChmcm9tUG9zID09PSB0b1BvcykgcmV0dXJuIGNodW5rVGFpbDtcbiAgICB0aGlzLl9mb3JFYWNoQmxvY2tzSW5SYW5nZShmcm9tUG9zLCB0b1BvcywgKGIsIGJpLCBiRnJvbVBvcywgYlRvUG9zKSA9PiB7XG4gICAgICBjb25zdCBibG9ja0NodW5rID0gYi5leHRyYWN0VGFpbChiRnJvbVBvcywgYlRvUG9zKTtcbiAgICAgIGJsb2NrQ2h1bmsuc3RvcCA9IHRoaXMuX2ZpbmRTdG9wQmVmb3JlKGJpKTtcbiAgICAgIGJsb2NrQ2h1bmsuZnJvbSA9IHRoaXMuX2Jsb2NrU3RhcnRQb3MoYmkpO1xuICAgICAgaWYgKGJsb2NrQ2h1bmsgaW5zdGFuY2VvZiBDaHVua3NUYWlsRGV0YWlscykgYmxvY2tDaHVuay5ibG9ja0luZGV4ID0gYmk7XG4gICAgICBjaHVua1RhaWwuZXh0ZW5kKGJsb2NrQ2h1bmspO1xuICAgIH0pO1xuICAgIHJldHVybiBjaHVua1RhaWw7XG4gIH1cbiAgZXh0cmFjdElucHV0KGZyb21Qb3MsIHRvUG9zLCBmbGFncykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBpZiAoZnJvbVBvcyA9PT0gdG9Qb3MpIHJldHVybiAnJztcbiAgICBsZXQgaW5wdXQgPSAnJztcbiAgICB0aGlzLl9mb3JFYWNoQmxvY2tzSW5SYW5nZShmcm9tUG9zLCB0b1BvcywgKGIsIF8sIGZyb21Qb3MsIHRvUG9zKSA9PiB7XG4gICAgICBpbnB1dCArPSBiLmV4dHJhY3RJbnB1dChmcm9tUG9zLCB0b1BvcywgZmxhZ3MpO1xuICAgIH0pO1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxuICBfZmluZFN0b3BCZWZvcmUoYmxvY2tJbmRleCkge1xuICAgIGxldCBzdG9wQmVmb3JlO1xuICAgIGZvciAobGV0IHNpID0gMDsgc2kgPCB0aGlzLl9zdG9wcy5sZW5ndGg7ICsrc2kpIHtcbiAgICAgIGNvbnN0IHN0b3AgPSB0aGlzLl9zdG9wc1tzaV07XG4gICAgICBpZiAoc3RvcCA8PSBibG9ja0luZGV4KSBzdG9wQmVmb3JlID0gc3RvcDtlbHNlIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gc3RvcEJlZm9yZTtcbiAgfVxuXG4gIC8qKiBBcHBlbmRzIHBsYWNlaG9sZGVyIGRlcGVuZGluZyBvbiBsYXppbmVzcyAqL1xuICBfYXBwZW5kUGxhY2Vob2xkZXIodG9CbG9ja0luZGV4KSB7XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgaWYgKHRoaXMubGF6eSAmJiB0b0Jsb2NrSW5kZXggPT0gbnVsbCkgcmV0dXJuIGRldGFpbHM7XG4gICAgY29uc3Qgc3RhcnRCbG9ja0l0ZXIgPSB0aGlzLl9tYXBQb3NUb0Jsb2NrKHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aCk7XG4gICAgaWYgKCFzdGFydEJsb2NrSXRlcikgcmV0dXJuIGRldGFpbHM7XG4gICAgY29uc3Qgc3RhcnRCbG9ja0luZGV4ID0gc3RhcnRCbG9ja0l0ZXIuaW5kZXg7XG4gICAgY29uc3QgZW5kQmxvY2tJbmRleCA9IHRvQmxvY2tJbmRleCAhPSBudWxsID8gdG9CbG9ja0luZGV4IDogdGhpcy5fYmxvY2tzLmxlbmd0aDtcbiAgICB0aGlzLl9ibG9ja3Muc2xpY2Uoc3RhcnRCbG9ja0luZGV4LCBlbmRCbG9ja0luZGV4KS5mb3JFYWNoKGIgPT4ge1xuICAgICAgaWYgKCFiLmxhenkgfHwgdG9CbG9ja0luZGV4ICE9IG51bGwpIHtcbiAgICAgICAgdmFyIF9ibG9ja3MyO1xuICAgICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZShiLl9hcHBlbmRQbGFjZWhvbGRlcigoX2Jsb2NrczIgPSBiLl9ibG9ja3MpID09IG51bGwgPyB2b2lkIDAgOiBfYmxvY2tzMi5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuXG4gIC8qKiBGaW5kcyBibG9jayBpbiBwb3MgKi9cbiAgX21hcFBvc1RvQmxvY2socG9zKSB7XG4gICAgbGV0IGFjY1ZhbCA9ICcnO1xuICAgIGZvciAobGV0IGJpID0gMDsgYmkgPCB0aGlzLl9ibG9ja3MubGVuZ3RoOyArK2JpKSB7XG4gICAgICBjb25zdCBibG9jayA9IHRoaXMuX2Jsb2Nrc1tiaV07XG4gICAgICBjb25zdCBibG9ja1N0YXJ0UG9zID0gYWNjVmFsLmxlbmd0aDtcbiAgICAgIGFjY1ZhbCArPSBibG9jay5kaXNwbGF5VmFsdWU7XG4gICAgICBpZiAocG9zIDw9IGFjY1ZhbC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmRleDogYmksXG4gICAgICAgICAgb2Zmc2V0OiBwb3MgLSBibG9ja1N0YXJ0UG9zXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9ibG9ja1N0YXJ0UG9zKGJsb2NrSW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmxvY2tzLnNsaWNlKDAsIGJsb2NrSW5kZXgpLnJlZHVjZSgocG9zLCBiKSA9PiBwb3MgKz0gYi5kaXNwbGF5VmFsdWUubGVuZ3RoLCAwKTtcbiAgfVxuICBfZm9yRWFjaEJsb2Nrc0luUmFuZ2UoZnJvbVBvcywgdG9Qb3MsIGZuKSB7XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICBjb25zdCBmcm9tQmxvY2tJdGVyID0gdGhpcy5fbWFwUG9zVG9CbG9jayhmcm9tUG9zKTtcbiAgICBpZiAoZnJvbUJsb2NrSXRlcikge1xuICAgICAgY29uc3QgdG9CbG9ja0l0ZXIgPSB0aGlzLl9tYXBQb3NUb0Jsb2NrKHRvUG9zKTtcbiAgICAgIC8vIHByb2Nlc3MgZmlyc3QgYmxvY2tcbiAgICAgIGNvbnN0IGlzU2FtZUJsb2NrID0gdG9CbG9ja0l0ZXIgJiYgZnJvbUJsb2NrSXRlci5pbmRleCA9PT0gdG9CbG9ja0l0ZXIuaW5kZXg7XG4gICAgICBjb25zdCBmcm9tQmxvY2tTdGFydFBvcyA9IGZyb21CbG9ja0l0ZXIub2Zmc2V0O1xuICAgICAgY29uc3QgZnJvbUJsb2NrRW5kUG9zID0gdG9CbG9ja0l0ZXIgJiYgaXNTYW1lQmxvY2sgPyB0b0Jsb2NrSXRlci5vZmZzZXQgOiB0aGlzLl9ibG9ja3NbZnJvbUJsb2NrSXRlci5pbmRleF0uZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICAgIGZuKHRoaXMuX2Jsb2Nrc1tmcm9tQmxvY2tJdGVyLmluZGV4XSwgZnJvbUJsb2NrSXRlci5pbmRleCwgZnJvbUJsb2NrU3RhcnRQb3MsIGZyb21CbG9ja0VuZFBvcyk7XG4gICAgICBpZiAodG9CbG9ja0l0ZXIgJiYgIWlzU2FtZUJsb2NrKSB7XG4gICAgICAgIC8vIHByb2Nlc3MgaW50ZXJtZWRpYXRlIGJsb2Nrc1xuICAgICAgICBmb3IgKGxldCBiaSA9IGZyb21CbG9ja0l0ZXIuaW5kZXggKyAxOyBiaSA8IHRvQmxvY2tJdGVyLmluZGV4OyArK2JpKSB7XG4gICAgICAgICAgZm4odGhpcy5fYmxvY2tzW2JpXSwgYmksIDAsIHRoaXMuX2Jsb2Nrc1tiaV0uZGlzcGxheVZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcm9jZXNzIGxhc3QgYmxvY2tcbiAgICAgICAgZm4odGhpcy5fYmxvY2tzW3RvQmxvY2tJdGVyLmluZGV4XSwgdG9CbG9ja0l0ZXIuaW5kZXgsIDAsIHRvQmxvY2tJdGVyLm9mZnNldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlbW92ZShmcm9tUG9zLCB0b1Bvcykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGNvbnN0IHJlbW92ZURldGFpbHMgPSBzdXBlci5yZW1vdmUoZnJvbVBvcywgdG9Qb3MpO1xuICAgIHRoaXMuX2ZvckVhY2hCbG9ja3NJblJhbmdlKGZyb21Qb3MsIHRvUG9zLCAoYiwgXywgYkZyb21Qb3MsIGJUb1BvcykgPT4ge1xuICAgICAgcmVtb3ZlRGV0YWlscy5hZ2dyZWdhdGUoYi5yZW1vdmUoYkZyb21Qb3MsIGJUb1BvcykpO1xuICAgIH0pO1xuICAgIHJldHVybiByZW1vdmVEZXRhaWxzO1xuICB9XG4gIG5lYXJlc3RJbnB1dFBvcyhjdXJzb3JQb3MsIGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IHZvaWQgMCkge1xuICAgICAgZGlyZWN0aW9uID0gRElSRUNUSU9OLk5PTkU7XG4gICAgfVxuICAgIGlmICghdGhpcy5fYmxvY2tzLmxlbmd0aCkgcmV0dXJuIDA7XG4gICAgY29uc3QgY3Vyc29yID0gbmV3IFBhdHRlcm5DdXJzb3IodGhpcywgY3Vyc29yUG9zKTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBESVJFQ1RJT04uTk9ORSkge1xuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgLy8gTk9ORSBzaG91bGQgb25seSBnbyBvdXQgZnJvbSBmaXhlZCB0byB0aGUgcmlnaHQhXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBpZiAoY3Vyc29yLnB1c2hSaWdodEJlZm9yZUlucHV0KCkpIHJldHVybiBjdXJzb3IucG9zO1xuICAgICAgY3Vyc29yLnBvcFN0YXRlKCk7XG4gICAgICBpZiAoY3Vyc29yLnB1c2hMZWZ0QmVmb3JlSW5wdXQoKSkgcmV0dXJuIGN1cnNvci5wb3M7XG4gICAgICByZXR1cm4gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIEZPUkNFIGlzIG9ubHkgYWJvdXQgYXwqIG90aGVyd2lzZSBpcyAwXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkxFRlQgfHwgZGlyZWN0aW9uID09PSBESVJFQ1RJT04uRk9SQ0VfTEVGVCkge1xuICAgICAgLy8gdHJ5IHRvIGJyZWFrIGZhc3Qgd2hlbiAqfGFcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IERJUkVDVElPTi5MRUZUKSB7XG4gICAgICAgIGN1cnNvci5wdXNoUmlnaHRCZWZvcmVGaWxsZWQoKTtcbiAgICAgICAgaWYgKGN1cnNvci5vayAmJiBjdXJzb3IucG9zID09PSBjdXJzb3JQb3MpIHJldHVybiBjdXJzb3JQb3M7XG4gICAgICAgIGN1cnNvci5wb3BTdGF0ZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBmb3J3YXJkIGZsb3dcbiAgICAgIGN1cnNvci5wdXNoTGVmdEJlZm9yZUlucHV0KCk7XG4gICAgICBjdXJzb3IucHVzaExlZnRCZWZvcmVSZXF1aXJlZCgpO1xuICAgICAgY3Vyc29yLnB1c2hMZWZ0QmVmb3JlRmlsbGVkKCk7XG5cbiAgICAgIC8vIGJhY2t3YXJkIGZsb3dcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IERJUkVDVElPTi5MRUZUKSB7XG4gICAgICAgIGN1cnNvci5wdXNoUmlnaHRCZWZvcmVJbnB1dCgpO1xuICAgICAgICBjdXJzb3IucHVzaFJpZ2h0QmVmb3JlUmVxdWlyZWQoKTtcbiAgICAgICAgaWYgKGN1cnNvci5vayAmJiBjdXJzb3IucG9zIDw9IGN1cnNvclBvcykgcmV0dXJuIGN1cnNvci5wb3M7XG4gICAgICAgIGN1cnNvci5wb3BTdGF0ZSgpO1xuICAgICAgICBpZiAoY3Vyc29yLm9rICYmIGN1cnNvci5wb3MgPD0gY3Vyc29yUG9zKSByZXR1cm4gY3Vyc29yLnBvcztcbiAgICAgICAgY3Vyc29yLnBvcFN0YXRlKCk7XG4gICAgICB9XG4gICAgICBpZiAoY3Vyc29yLm9rKSByZXR1cm4gY3Vyc29yLnBvcztcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IERJUkVDVElPTi5GT1JDRV9MRUZUKSByZXR1cm4gMDtcbiAgICAgIGN1cnNvci5wb3BTdGF0ZSgpO1xuICAgICAgaWYgKGN1cnNvci5vaykgcmV0dXJuIGN1cnNvci5wb3M7XG4gICAgICBjdXJzb3IucG9wU3RhdGUoKTtcbiAgICAgIGlmIChjdXJzb3Iub2spIHJldHVybiBjdXJzb3IucG9zO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09IERJUkVDVElPTi5SSUdIVCB8fCBkaXJlY3Rpb24gPT09IERJUkVDVElPTi5GT1JDRV9SSUdIVCkge1xuICAgICAgLy8gZm9yd2FyZCBmbG93XG4gICAgICBjdXJzb3IucHVzaFJpZ2h0QmVmb3JlSW5wdXQoKTtcbiAgICAgIGN1cnNvci5wdXNoUmlnaHRCZWZvcmVSZXF1aXJlZCgpO1xuICAgICAgaWYgKGN1cnNvci5wdXNoUmlnaHRCZWZvcmVGaWxsZWQoKSkgcmV0dXJuIGN1cnNvci5wb3M7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBESVJFQ1RJT04uRk9SQ0VfUklHSFQpIHJldHVybiB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG5cbiAgICAgIC8vIGJhY2t3YXJkIGZsb3dcbiAgICAgIGN1cnNvci5wb3BTdGF0ZSgpO1xuICAgICAgaWYgKGN1cnNvci5vaykgcmV0dXJuIGN1cnNvci5wb3M7XG4gICAgICBjdXJzb3IucG9wU3RhdGUoKTtcbiAgICAgIGlmIChjdXJzb3Iub2spIHJldHVybiBjdXJzb3IucG9zO1xuICAgICAgcmV0dXJuIHRoaXMubmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgRElSRUNUSU9OLkxFRlQpO1xuICAgIH1cbiAgICByZXR1cm4gY3Vyc29yUG9zO1xuICB9XG4gIHRvdGFsSW5wdXRQb3NpdGlvbnMoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIHRoaXMuX2ZvckVhY2hCbG9ja3NJblJhbmdlKGZyb21Qb3MsIHRvUG9zLCAoYiwgXywgYkZyb21Qb3MsIGJUb1BvcykgPT4ge1xuICAgICAgdG90YWwgKz0gYi50b3RhbElucHV0UG9zaXRpb25zKGJGcm9tUG9zLCBiVG9Qb3MpO1xuICAgIH0pO1xuICAgIHJldHVybiB0b3RhbDtcbiAgfVxuXG4gIC8qKiBHZXQgYmxvY2sgYnkgbmFtZSAqL1xuICBtYXNrZWRCbG9jayhuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkQmxvY2tzKG5hbWUpWzBdO1xuICB9XG5cbiAgLyoqIEdldCBhbGwgYmxvY2tzIGJ5IG5hbWUgKi9cbiAgbWFza2VkQmxvY2tzKG5hbWUpIHtcbiAgICBjb25zdCBpbmRpY2VzID0gdGhpcy5fbWFza2VkQmxvY2tzW25hbWVdO1xuICAgIGlmICghaW5kaWNlcykgcmV0dXJuIFtdO1xuICAgIHJldHVybiBpbmRpY2VzLm1hcChnaSA9PiB0aGlzLl9ibG9ja3NbZ2ldKTtcbiAgfVxuICBwYWQoZmxhZ3MpIHtcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICB0aGlzLl9mb3JFYWNoQmxvY2tzSW5SYW5nZSgwLCB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGgsIGIgPT4gZGV0YWlscy5hZ2dyZWdhdGUoYi5wYWQoZmxhZ3MpKSk7XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbn1cbk1hc2tlZFBhdHRlcm4uREVGQVVMVFMgPSB7XG4gIC4uLk1hc2tlZC5ERUZBVUxUUyxcbiAgbGF6eTogdHJ1ZSxcbiAgcGxhY2Vob2xkZXJDaGFyOiAnXydcbn07XG5NYXNrZWRQYXR0ZXJuLlNUT1BfQ0hBUiA9ICdgJztcbk1hc2tlZFBhdHRlcm4uRVNDQVBFX0NIQVIgPSAnXFxcXCc7XG5NYXNrZWRQYXR0ZXJuLklucHV0RGVmaW5pdGlvbiA9IFBhdHRlcm5JbnB1dERlZmluaXRpb247XG5NYXNrZWRQYXR0ZXJuLkZpeGVkRGVmaW5pdGlvbiA9IFBhdHRlcm5GaXhlZERlZmluaXRpb247XG5JTWFzay5NYXNrZWRQYXR0ZXJuID0gTWFza2VkUGF0dGVybjtcblxuZXhwb3J0IHsgTWFza2VkUGF0dGVybiBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgQ2hhbmdlRGV0YWlscyBmcm9tICcuLi8uLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vLi4vY29yZS91dGlscy5qcyc7XG5pbXBvcnQgQ29udGludW91c1RhaWxEZXRhaWxzIGZyb20gJy4uLy4uL2NvcmUvY29udGludW91cy10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uLy4uL2NvcmUvaG9sZGVyLmpzJztcblxuY2xhc3MgQ2h1bmtzVGFpbERldGFpbHMge1xuICAvKiogKi9cblxuICBjb25zdHJ1Y3RvcihjaHVua3MsIGZyb20pIHtcbiAgICBpZiAoY2h1bmtzID09PSB2b2lkIDApIHtcbiAgICAgIGNodW5rcyA9IFtdO1xuICAgIH1cbiAgICBpZiAoZnJvbSA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tID0gMDtcbiAgICB9XG4gICAgdGhpcy5jaHVua3MgPSBjaHVua3M7XG4gICAgdGhpcy5mcm9tID0gZnJvbTtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5jaHVua3MubWFwKFN0cmluZykuam9pbignJyk7XG4gIH1cbiAgZXh0ZW5kKHRhaWxDaHVuaykge1xuICAgIGlmICghU3RyaW5nKHRhaWxDaHVuaykpIHJldHVybjtcbiAgICB0YWlsQ2h1bmsgPSBpc1N0cmluZyh0YWlsQ2h1bmspID8gbmV3IENvbnRpbnVvdXNUYWlsRGV0YWlscyhTdHJpbmcodGFpbENodW5rKSkgOiB0YWlsQ2h1bms7XG4gICAgY29uc3QgbGFzdENodW5rID0gdGhpcy5jaHVua3NbdGhpcy5jaHVua3MubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgZXh0ZW5kTGFzdCA9IGxhc3RDaHVuayAmJiAoXG4gICAgLy8gaWYgc3RvcHMgYXJlIHNhbWUgb3IgdGFpbCBoYXMgbm8gc3RvcFxuICAgIGxhc3RDaHVuay5zdG9wID09PSB0YWlsQ2h1bmsuc3RvcCB8fCB0YWlsQ2h1bmsuc3RvcCA9PSBudWxsKSAmJlxuICAgIC8vIGlmIHRhaWwgY2h1bmsgZ29lcyBqdXN0IGFmdGVyIGxhc3QgY2h1bmtcbiAgICB0YWlsQ2h1bmsuZnJvbSA9PT0gbGFzdENodW5rLmZyb20gKyBsYXN0Q2h1bmsudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgaWYgKHRhaWxDaHVuayBpbnN0YW5jZW9mIENvbnRpbnVvdXNUYWlsRGV0YWlscykge1xuICAgICAgLy8gY2hlY2sgdGhlIGFiaWxpdHkgdG8gZXh0ZW5kIHByZXZpb3VzIGNodW5rXG4gICAgICBpZiAoZXh0ZW5kTGFzdCkge1xuICAgICAgICAvLyBleHRlbmQgcHJldmlvdXMgY2h1bmtcbiAgICAgICAgbGFzdENodW5rLmV4dGVuZCh0YWlsQ2h1bmsudG9TdHJpbmcoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhcHBlbmQgbmV3IGNodW5rXG4gICAgICAgIHRoaXMuY2h1bmtzLnB1c2godGFpbENodW5rKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRhaWxDaHVuayBpbnN0YW5jZW9mIENodW5rc1RhaWxEZXRhaWxzKSB7XG4gICAgICBpZiAodGFpbENodW5rLnN0b3AgPT0gbnVsbCkge1xuICAgICAgICAvLyB1bndyYXAgZmxvYXRpbmcgY2h1bmtzIHRvIHBhcmVudCwga2VlcGluZyBgZnJvbWAgcG9zXG4gICAgICAgIGxldCBmaXJzdFRhaWxDaHVuaztcbiAgICAgICAgd2hpbGUgKHRhaWxDaHVuay5jaHVua3MubGVuZ3RoICYmIHRhaWxDaHVuay5jaHVua3NbMF0uc3RvcCA9PSBudWxsKSB7XG4gICAgICAgICAgZmlyc3RUYWlsQ2h1bmsgPSB0YWlsQ2h1bmsuY2h1bmtzLnNoaWZ0KCk7IC8vIG5vdCBwb3NzaWJsZSB0byBiZSBgdW5kZWZpbmVkYCBiZWNhdXNlIGxlbmd0aCB3YXMgY2hlY2tlZCBhYm92ZVxuICAgICAgICAgIGZpcnN0VGFpbENodW5rLmZyb20gKz0gdGFpbENodW5rLmZyb207XG4gICAgICAgICAgdGhpcy5leHRlbmQoZmlyc3RUYWlsQ2h1bmspO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRhaWwgY2h1bmsgc3RpbGwgaGFzIHZhbHVlXG4gICAgICBpZiAodGFpbENodW5rLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgLy8gaWYgY2h1bmtzIGNvbnRhaW5zIHN0b3BzLCB0aGVuIHBvcHVwIHN0b3AgdG8gY29udGFpbmVyXG4gICAgICAgIHRhaWxDaHVuay5zdG9wID0gdGFpbENodW5rLmJsb2NrSW5kZXg7XG4gICAgICAgIHRoaXMuY2h1bmtzLnB1c2godGFpbENodW5rKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYXBwZW5kVG8obWFza2VkKSB7XG4gICAgaWYgKCEobWFza2VkIGluc3RhbmNlb2YgSU1hc2suTWFza2VkUGF0dGVybikpIHtcbiAgICAgIGNvbnN0IHRhaWwgPSBuZXcgQ29udGludW91c1RhaWxEZXRhaWxzKHRoaXMudG9TdHJpbmcoKSk7XG4gICAgICByZXR1cm4gdGFpbC5hcHBlbmRUbyhtYXNrZWQpO1xuICAgIH1cbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBmb3IgKGxldCBjaSA9IDA7IGNpIDwgdGhpcy5jaHVua3MubGVuZ3RoOyArK2NpKSB7XG4gICAgICBjb25zdCBjaHVuayA9IHRoaXMuY2h1bmtzW2NpXTtcbiAgICAgIGNvbnN0IGxhc3RCbG9ja0l0ZXIgPSBtYXNrZWQuX21hcFBvc1RvQmxvY2sobWFza2VkLmRpc3BsYXlWYWx1ZS5sZW5ndGgpO1xuICAgICAgY29uc3Qgc3RvcCA9IGNodW5rLnN0b3A7XG4gICAgICBsZXQgY2h1bmtCbG9jaztcbiAgICAgIGlmIChzdG9wICE9IG51bGwgJiYgKFxuICAgICAgLy8gaWYgYmxvY2sgbm90IGZvdW5kIG9yIHN0b3AgaXMgYmVoaW5kIGxhc3RCbG9ja1xuICAgICAgIWxhc3RCbG9ja0l0ZXIgfHwgbGFzdEJsb2NrSXRlci5pbmRleCA8PSBzdG9wKSkge1xuICAgICAgICBpZiAoY2h1bmsgaW5zdGFuY2VvZiBDaHVua3NUYWlsRGV0YWlscyB8fFxuICAgICAgICAvLyBmb3IgY29udGludW91cyBibG9jayBhbHNvIGNoZWNrIGlmIHN0b3AgaXMgZXhpc3RcbiAgICAgICAgbWFza2VkLl9zdG9wcy5pbmRleE9mKHN0b3ApID49IDApIHtcbiAgICAgICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZShtYXNrZWQuX2FwcGVuZFBsYWNlaG9sZGVyKHN0b3ApKTtcbiAgICAgICAgfVxuICAgICAgICBjaHVua0Jsb2NrID0gY2h1bmsgaW5zdGFuY2VvZiBDaHVua3NUYWlsRGV0YWlscyAmJiBtYXNrZWQuX2Jsb2Nrc1tzdG9wXTtcbiAgICAgIH1cbiAgICAgIGlmIChjaHVua0Jsb2NrKSB7XG4gICAgICAgIGNvbnN0IHRhaWxEZXRhaWxzID0gY2h1bmtCbG9jay5hcHBlbmRUYWlsKGNodW5rKTtcbiAgICAgICAgZGV0YWlscy5hZ2dyZWdhdGUodGFpbERldGFpbHMpO1xuXG4gICAgICAgIC8vIGdldCBub3QgaW5zZXJ0ZWQgY2hhcnNcbiAgICAgICAgY29uc3QgcmVtYWluQ2hhcnMgPSBjaHVuay50b1N0cmluZygpLnNsaWNlKHRhaWxEZXRhaWxzLnJhd0luc2VydGVkLmxlbmd0aCk7XG4gICAgICAgIGlmIChyZW1haW5DaGFycykgZGV0YWlscy5hZ2dyZWdhdGUobWFza2VkLmFwcGVuZChyZW1haW5DaGFycywge1xuICAgICAgICAgIHRhaWw6IHRydWVcbiAgICAgICAgfSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGV0YWlscy5hZ2dyZWdhdGUobWFza2VkLmFwcGVuZChjaHVuay50b1N0cmluZygpLCB7XG4gICAgICAgICAgdGFpbDogdHJ1ZVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2h1bmtzOiB0aGlzLmNodW5rcy5tYXAoYyA9PiBjLnN0YXRlKSxcbiAgICAgIGZyb206IHRoaXMuZnJvbSxcbiAgICAgIHN0b3A6IHRoaXMuc3RvcCxcbiAgICAgIGJsb2NrSW5kZXg6IHRoaXMuYmxvY2tJbmRleFxuICAgIH07XG4gIH1cbiAgc2V0IHN0YXRlKHN0YXRlKSB7XG4gICAgY29uc3Qge1xuICAgICAgY2h1bmtzLFxuICAgICAgLi4ucHJvcHNcbiAgICB9ID0gc3RhdGU7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wcyk7XG4gICAgdGhpcy5jaHVua3MgPSBjaHVua3MubWFwKGNzdGF0ZSA9PiB7XG4gICAgICBjb25zdCBjaHVuayA9IFwiY2h1bmtzXCIgaW4gY3N0YXRlID8gbmV3IENodW5rc1RhaWxEZXRhaWxzKCkgOiBuZXcgQ29udGludW91c1RhaWxEZXRhaWxzKCk7XG4gICAgICBjaHVuay5zdGF0ZSA9IGNzdGF0ZTtcbiAgICAgIHJldHVybiBjaHVuaztcbiAgICB9KTtcbiAgfVxuICB1bnNoaWZ0KGJlZm9yZVBvcykge1xuICAgIGlmICghdGhpcy5jaHVua3MubGVuZ3RoIHx8IGJlZm9yZVBvcyAhPSBudWxsICYmIHRoaXMuZnJvbSA+PSBiZWZvcmVQb3MpIHJldHVybiAnJztcbiAgICBjb25zdCBjaHVua1NoaWZ0UG9zID0gYmVmb3JlUG9zICE9IG51bGwgPyBiZWZvcmVQb3MgLSB0aGlzLmZyb20gOiBiZWZvcmVQb3M7XG4gICAgbGV0IGNpID0gMDtcbiAgICB3aGlsZSAoY2kgPCB0aGlzLmNodW5rcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5jaHVua3NbY2ldO1xuICAgICAgY29uc3Qgc2hpZnRDaGFyID0gY2h1bmsudW5zaGlmdChjaHVua1NoaWZ0UG9zKTtcbiAgICAgIGlmIChjaHVuay50b1N0cmluZygpKSB7XG4gICAgICAgIC8vIGNodW5rIHN0aWxsIGNvbnRhaW5zIHZhbHVlXG4gICAgICAgIC8vIGJ1dCBub3Qgc2hpZnRlZCAtIG1lYW5zIG5vIG1vcmUgYXZhaWxhYmxlIGNoYXJzIHRvIHNoaWZ0XG4gICAgICAgIGlmICghc2hpZnRDaGFyKSBicmVhaztcbiAgICAgICAgKytjaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNsZWFuIGlmIGNodW5rIGhhcyBubyB2YWx1ZVxuICAgICAgICB0aGlzLmNodW5rcy5zcGxpY2UoY2ksIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHNoaWZ0Q2hhcikgcmV0dXJuIHNoaWZ0Q2hhcjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHNoaWZ0KCkge1xuICAgIGlmICghdGhpcy5jaHVua3MubGVuZ3RoKSByZXR1cm4gJyc7XG4gICAgbGV0IGNpID0gdGhpcy5jaHVua3MubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoMCA8PSBjaSkge1xuICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLmNodW5rc1tjaV07XG4gICAgICBjb25zdCBzaGlmdENoYXIgPSBjaHVuay5zaGlmdCgpO1xuICAgICAgaWYgKGNodW5rLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgLy8gY2h1bmsgc3RpbGwgY29udGFpbnMgdmFsdWVcbiAgICAgICAgLy8gYnV0IG5vdCBzaGlmdGVkIC0gbWVhbnMgbm8gbW9yZSBhdmFpbGFibGUgY2hhcnMgdG8gc2hpZnRcbiAgICAgICAgaWYgKCFzaGlmdENoYXIpIGJyZWFrO1xuICAgICAgICAtLWNpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2xlYW4gaWYgY2h1bmsgaGFzIG5vIHZhbHVlXG4gICAgICAgIHRoaXMuY2h1bmtzLnNwbGljZShjaSwgMSk7XG4gICAgICB9XG4gICAgICBpZiAoc2hpZnRDaGFyKSByZXR1cm4gc2hpZnRDaGFyO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ2h1bmtzVGFpbERldGFpbHMgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi4vLi4vY29yZS91dGlscy5qcyc7XG5cbmNsYXNzIFBhdHRlcm5DdXJzb3Ige1xuICBjb25zdHJ1Y3RvcihtYXNrZWQsIHBvcykge1xuICAgIHRoaXMubWFza2VkID0gbWFza2VkO1xuICAgIHRoaXMuX2xvZyA9IFtdO1xuICAgIGNvbnN0IHtcbiAgICAgIG9mZnNldCxcbiAgICAgIGluZGV4XG4gICAgfSA9IG1hc2tlZC5fbWFwUG9zVG9CbG9jayhwb3MpIHx8IChwb3MgPCAwID9cbiAgICAvLyBmaXJzdFxuICAgIHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgb2Zmc2V0OiAwXG4gICAgfSA6XG4gICAgLy8gbGFzdFxuICAgIHtcbiAgICAgIGluZGV4OiB0aGlzLm1hc2tlZC5fYmxvY2tzLmxlbmd0aCxcbiAgICAgIG9mZnNldDogMFxuICAgIH0pO1xuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLm9rID0gZmFsc2U7XG4gIH1cbiAgZ2V0IGJsb2NrKCkge1xuICAgIHJldHVybiB0aGlzLm1hc2tlZC5fYmxvY2tzW3RoaXMuaW5kZXhdO1xuICB9XG4gIGdldCBwb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLl9ibG9ja1N0YXJ0UG9zKHRoaXMuaW5kZXgpICsgdGhpcy5vZmZzZXQ7XG4gIH1cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQsXG4gICAgICBvazogdGhpcy5va1xuICAgIH07XG4gIH1cbiAgc2V0IHN0YXRlKHMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHMpO1xuICB9XG4gIHB1c2hTdGF0ZSgpIHtcbiAgICB0aGlzLl9sb2cucHVzaCh0aGlzLnN0YXRlKTtcbiAgfVxuICBwb3BTdGF0ZSgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5fbG9nLnBvcCgpO1xuICAgIGlmIChzKSB0aGlzLnN0YXRlID0gcztcbiAgICByZXR1cm4gcztcbiAgfVxuICBiaW5kQmxvY2soKSB7XG4gICAgaWYgKHRoaXMuYmxvY2spIHJldHVybjtcbiAgICBpZiAodGhpcy5pbmRleCA8IDApIHtcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbmRleCA+PSB0aGlzLm1hc2tlZC5fYmxvY2tzLmxlbmd0aCkge1xuICAgICAgdGhpcy5pbmRleCA9IHRoaXMubWFza2VkLl9ibG9ja3MubGVuZ3RoIC0gMTtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5ibG9jay5kaXNwbGF5VmFsdWUubGVuZ3RoOyAvLyBUT0RPIHRoaXMgaXMgc3R1cGlkIHR5cGUgZXJyb3IsIGBibG9ja2AgZGVwZW5kcyBvbiBpbmRleCB0aGF0IHdhcyBjaGFuZ2VkIGFib3ZlXG4gICAgfVxuICB9XG4gIF9wdXNoTGVmdChmbikge1xuICAgIHRoaXMucHVzaFN0YXRlKCk7XG4gICAgZm9yICh0aGlzLmJpbmRCbG9jaygpOyAwIDw9IHRoaXMuaW5kZXg7IC0tdGhpcy5pbmRleCwgdGhpcy5vZmZzZXQgPSAoKF90aGlzJGJsb2NrID0gdGhpcy5ibG9jaykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJGJsb2NrLmRpc3BsYXlWYWx1ZS5sZW5ndGgpIHx8IDApIHtcbiAgICAgIHZhciBfdGhpcyRibG9jaztcbiAgICAgIGlmIChmbigpKSByZXR1cm4gdGhpcy5vayA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9rID0gZmFsc2U7XG4gIH1cbiAgX3B1c2hSaWdodChmbikge1xuICAgIHRoaXMucHVzaFN0YXRlKCk7XG4gICAgZm9yICh0aGlzLmJpbmRCbG9jaygpOyB0aGlzLmluZGV4IDwgdGhpcy5tYXNrZWQuX2Jsb2Nrcy5sZW5ndGg7ICsrdGhpcy5pbmRleCwgdGhpcy5vZmZzZXQgPSAwKSB7XG4gICAgICBpZiAoZm4oKSkgcmV0dXJuIHRoaXMub2sgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vayA9IGZhbHNlO1xuICB9XG4gIHB1c2hMZWZ0QmVmb3JlRmlsbGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoTGVmdCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ibG9jay5pc0ZpeGVkIHx8ICF0aGlzLmJsb2NrLnZhbHVlKSByZXR1cm47XG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuYmxvY2submVhcmVzdElucHV0UG9zKHRoaXMub2Zmc2V0LCBESVJFQ1RJT04uRk9SQ0VfTEVGVCk7XG4gICAgICBpZiAodGhpcy5vZmZzZXQgIT09IDApIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG4gIHB1c2hMZWZ0QmVmb3JlSW5wdXQoKSB7XG4gICAgLy8gY2FzZXM6XG4gICAgLy8gZmlsbGVkIGlucHV0OiAwMHxcbiAgICAvLyBvcHRpb25hbCBlbXB0eSBpbnB1dDogMDBbXXxcbiAgICAvLyBuZXN0ZWQgYmxvY2s6IFhYPFtdPnxcbiAgICByZXR1cm4gdGhpcy5fcHVzaExlZnQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYmxvY2suaXNGaXhlZCkgcmV0dXJuO1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmJsb2NrLm5lYXJlc3RJbnB1dFBvcyh0aGlzLm9mZnNldCwgRElSRUNUSU9OLkxFRlQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cbiAgcHVzaExlZnRCZWZvcmVSZXF1aXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaExlZnQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYmxvY2suaXNGaXhlZCB8fCB0aGlzLmJsb2NrLmlzT3B0aW9uYWwgJiYgIXRoaXMuYmxvY2sudmFsdWUpIHJldHVybjtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5ibG9jay5uZWFyZXN0SW5wdXRQb3ModGhpcy5vZmZzZXQsIERJUkVDVElPTi5MRUZUKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG4gIHB1c2hSaWdodEJlZm9yZUZpbGxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaFJpZ2h0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmJsb2NrLmlzRml4ZWQgfHwgIXRoaXMuYmxvY2sudmFsdWUpIHJldHVybjtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5ibG9jay5uZWFyZXN0SW5wdXRQb3ModGhpcy5vZmZzZXQsIERJUkVDVElPTi5GT1JDRV9SSUdIVCk7XG4gICAgICBpZiAodGhpcy5vZmZzZXQgIT09IHRoaXMuYmxvY2sudmFsdWUubGVuZ3RoKSByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuICBwdXNoUmlnaHRCZWZvcmVJbnB1dCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaFJpZ2h0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmJsb2NrLmlzRml4ZWQpIHJldHVybjtcblxuICAgICAgLy8gY29uc3QgbyA9IHRoaXMub2Zmc2V0O1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmJsb2NrLm5lYXJlc3RJbnB1dFBvcyh0aGlzLm9mZnNldCwgRElSRUNUSU9OLk5PTkUpO1xuICAgICAgLy8gSEFDSyBjYXNlcyBsaWtlIChTVElMTCBET0VTIE5PVCBXT1JLIEZPUiBORVNURUQpXG4gICAgICAvLyBhYXxYXG4gICAgICAvLyBhYTxYfFtdPlhfICAgIC0gdGhpcyB3aWxsIG5vdCB3b3JrXG4gICAgICAvLyBpZiAobyAmJiBvID09PSB0aGlzLm9mZnNldCAmJiB0aGlzLmJsb2NrIGluc3RhbmNlb2YgUGF0dGVybklucHV0RGVmaW5pdGlvbikgY29udGludWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuICBwdXNoUmlnaHRCZWZvcmVSZXF1aXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHVzaFJpZ2h0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmJsb2NrLmlzRml4ZWQgfHwgdGhpcy5ibG9jay5pc09wdGlvbmFsICYmICF0aGlzLmJsb2NrLnZhbHVlKSByZXR1cm47XG5cbiAgICAgIC8vIFRPRE8gY2hlY2sgfFsqXVhYX1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmJsb2NrLm5lYXJlc3RJbnB1dFBvcyh0aGlzLm9mZnNldCwgRElSRUNUSU9OLk5PTkUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGF0dGVybkN1cnNvciBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgQ2hhbmdlRGV0YWlscyBmcm9tICcuLi8uLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCB7IERJUkVDVElPTiwgaXNTdHJpbmcgfSBmcm9tICcuLi8uLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCBDb250aW51b3VzVGFpbERldGFpbHMgZnJvbSAnLi4vLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4uLy4uL2NvcmUvaG9sZGVyLmpzJztcblxuY2xhc3MgUGF0dGVybkZpeGVkRGVmaW5pdGlvbiB7XG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdHMpO1xuICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gICAgdGhpcy5pc0ZpeGVkID0gdHJ1ZTtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIGdldCB1bm1hc2tlZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmlzVW5tYXNraW5nID8gdGhpcy52YWx1ZSA6ICcnO1xuICB9XG4gIGdldCByYXdJbnB1dFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Jhd0lucHV0ID8gdGhpcy52YWx1ZSA6ICcnO1xuICB9XG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5faXNSYXdJbnB1dCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gIH1cbiAgcmVtb3ZlKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuX3ZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLl92YWx1ZS5zbGljZSgwLCBmcm9tUG9zKSArIHRoaXMuX3ZhbHVlLnNsaWNlKHRvUG9zKTtcbiAgICBpZiAoIXRoaXMuX3ZhbHVlKSB0aGlzLl9pc1Jhd0lucHV0ID0gZmFsc2U7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gIH1cbiAgbmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICBkaXJlY3Rpb24gPSBESVJFQ1RJT04uTk9ORTtcbiAgICB9XG4gICAgY29uc3QgbWluUG9zID0gMDtcbiAgICBjb25zdCBtYXhQb3MgPSB0aGlzLl92YWx1ZS5sZW5ndGg7XG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgRElSRUNUSU9OLkxFRlQ6XG4gICAgICBjYXNlIERJUkVDVElPTi5GT1JDRV9MRUZUOlxuICAgICAgICByZXR1cm4gbWluUG9zO1xuICAgICAgY2FzZSBESVJFQ1RJT04uTk9ORTpcbiAgICAgIGNhc2UgRElSRUNUSU9OLlJJR0hUOlxuICAgICAgY2FzZSBESVJFQ1RJT04uRk9SQ0VfUklHSFQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbWF4UG9zO1xuICAgIH1cbiAgfVxuICB0b3RhbElucHV0UG9zaXRpb25zKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuX3ZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2lzUmF3SW5wdXQgPyB0b1BvcyAtIGZyb21Qb3MgOiAwO1xuICB9XG4gIGV4dHJhY3RJbnB1dChmcm9tUG9zLCB0b1BvcywgZmxhZ3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5fdmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIGZsYWdzLnJhdyAmJiB0aGlzLl9pc1Jhd0lucHV0ICYmIHRoaXMuX3ZhbHVlLnNsaWNlKGZyb21Qb3MsIHRvUG9zKSB8fCAnJztcbiAgfVxuICBnZXQgaXNDb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBnZXQgaXNGaWxsZWQoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5fdmFsdWUpO1xuICB9XG4gIF9hcHBlbmRDaGFyKGNoLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0ZpbGxlZCkgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgY29uc3QgYXBwZW5kRWFnZXIgPSB0aGlzLmVhZ2VyID09PSB0cnVlIHx8IHRoaXMuZWFnZXIgPT09ICdhcHBlbmQnO1xuICAgIGNvbnN0IGFwcGVuZGVkID0gdGhpcy5jaGFyID09PSBjaDtcbiAgICBjb25zdCBpc1Jlc29sdmVkID0gYXBwZW5kZWQgJiYgKHRoaXMuaXNVbm1hc2tpbmcgfHwgZmxhZ3MuaW5wdXQgfHwgZmxhZ3MucmF3KSAmJiAoIWZsYWdzLnJhdyB8fCAhYXBwZW5kRWFnZXIpICYmICFmbGFncy50YWlsO1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscyh7XG4gICAgICBpbnNlcnRlZDogdGhpcy5jaGFyLFxuICAgICAgcmF3SW5zZXJ0ZWQ6IGlzUmVzb2x2ZWQgPyB0aGlzLmNoYXIgOiAnJ1xuICAgIH0pO1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5jaGFyO1xuICAgIHRoaXMuX2lzUmF3SW5wdXQgPSBpc1Jlc29sdmVkICYmIChmbGFncy5yYXcgfHwgZmxhZ3MuaW5wdXQpO1xuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIF9hcHBlbmRFYWdlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZW5kQ2hhcih0aGlzLmNoYXIsIHtcbiAgICAgIHRhaWw6IHRydWVcbiAgICB9KTtcbiAgfVxuICBfYXBwZW5kUGxhY2Vob2xkZXIoKSB7XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgaWYgKHRoaXMuaXNGaWxsZWQpIHJldHVybiBkZXRhaWxzO1xuICAgIHRoaXMuX3ZhbHVlID0gZGV0YWlscy5pbnNlcnRlZCA9IHRoaXMuY2hhcjtcbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBleHRyYWN0VGFpbCgpIHtcbiAgICByZXR1cm4gbmV3IENvbnRpbnVvdXNUYWlsRGV0YWlscygnJyk7XG4gIH1cbiAgYXBwZW5kVGFpbCh0YWlsKSB7XG4gICAgaWYgKGlzU3RyaW5nKHRhaWwpKSB0YWlsID0gbmV3IENvbnRpbnVvdXNUYWlsRGV0YWlscyhTdHJpbmcodGFpbCkpO1xuICAgIHJldHVybiB0YWlsLmFwcGVuZFRvKHRoaXMpO1xuICB9XG4gIGFwcGVuZChzdHIsIGZsYWdzLCB0YWlsKSB7XG4gICAgY29uc3QgZGV0YWlscyA9IHRoaXMuX2FwcGVuZENoYXIoc3RyWzBdLCBmbGFncyk7XG4gICAgaWYgKHRhaWwgIT0gbnVsbCkge1xuICAgICAgZGV0YWlscy50YWlsU2hpZnQgKz0gdGhpcy5hcHBlbmRUYWlsKHRhaWwpLnRhaWxTaGlmdDtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbiAgZG9Db21taXQoKSB7fVxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF92YWx1ZTogdGhpcy5fdmFsdWUsXG4gICAgICBfcmF3SW5wdXRWYWx1ZTogdGhpcy5yYXdJbnB1dFZhbHVlXG4gICAgfTtcbiAgfVxuICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHN0YXRlLl92YWx1ZTtcbiAgICB0aGlzLl9pc1Jhd0lucHV0ID0gQm9vbGVhbihzdGF0ZS5fcmF3SW5wdXRWYWx1ZSk7XG4gIH1cbiAgcGFkKGZsYWdzKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGVuZFBsYWNlaG9sZGVyKCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGF0dGVybkZpeGVkRGVmaW5pdGlvbiBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgY3JlYXRlTWFzayBmcm9tICcuLi9mYWN0b3J5LmpzJztcbmltcG9ydCBDaGFuZ2VEZXRhaWxzIGZyb20gJy4uLy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0IHsgRElSRUNUSU9OIH0gZnJvbSAnLi4vLi4vY29yZS91dGlscy5qcyc7XG5pbXBvcnQgJy4uLy4uL2NvcmUvaG9sZGVyLmpzJztcblxuY2xhc3MgUGF0dGVybklucHV0RGVmaW5pdGlvbiB7XG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBwYXJlbnQsXG4gICAgICBpc09wdGlvbmFsLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyLFxuICAgICAgZGlzcGxheUNoYXIsXG4gICAgICBsYXp5LFxuICAgICAgZWFnZXIsXG4gICAgICAuLi5tYXNrT3B0c1xuICAgIH0gPSBvcHRzO1xuICAgIHRoaXMubWFza2VkID0gY3JlYXRlTWFzayhtYXNrT3B0cyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICBwYXJlbnQsXG4gICAgICBpc09wdGlvbmFsLFxuICAgICAgcGxhY2Vob2xkZXJDaGFyLFxuICAgICAgZGlzcGxheUNoYXIsXG4gICAgICBsYXp5LFxuICAgICAgZWFnZXJcbiAgICB9KTtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLmlzRmlsbGVkID0gZmFsc2U7XG4gICAgdGhpcy5tYXNrZWQucmVzZXQoKTtcbiAgfVxuICByZW1vdmUoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy52YWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGlmIChmcm9tUG9zID09PSAwICYmIHRvUG9zID49IDEpIHtcbiAgICAgIHRoaXMuaXNGaWxsZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzLm1hc2tlZC5yZW1vdmUoZnJvbVBvcywgdG9Qb3MpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgfVxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLnZhbHVlIHx8ICh0aGlzLmlzRmlsbGVkICYmICF0aGlzLmlzT3B0aW9uYWwgPyB0aGlzLnBsYWNlaG9sZGVyQ2hhciA6ICcnKTtcbiAgfVxuICBnZXQgdW5tYXNrZWRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQudW5tYXNrZWRWYWx1ZTtcbiAgfVxuICBnZXQgcmF3SW5wdXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQucmF3SW5wdXRWYWx1ZTtcbiAgfVxuICBnZXQgZGlzcGxheVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLm1hc2tlZC52YWx1ZSAmJiB0aGlzLmRpc3BsYXlDaGFyIHx8IHRoaXMudmFsdWU7XG4gIH1cbiAgZ2V0IGlzQ29tcGxldGUoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5tYXNrZWQudmFsdWUpIHx8IHRoaXMuaXNPcHRpb25hbDtcbiAgfVxuICBfYXBwZW5kQ2hhcihjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNGaWxsZWQpIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5tYXNrZWQuc3RhdGU7XG4gICAgLy8gc2ltdWxhdGUgaW5wdXRcbiAgICBsZXQgZGV0YWlscyA9IHRoaXMubWFza2VkLl9hcHBlbmRDaGFyKGNoLCB0aGlzLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpKTtcbiAgICBpZiAoZGV0YWlscy5pbnNlcnRlZCAmJiB0aGlzLmRvVmFsaWRhdGUoZmxhZ3MpID09PSBmYWxzZSkge1xuICAgICAgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgICB0aGlzLm1hc2tlZC5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cbiAgICBpZiAoIWRldGFpbHMuaW5zZXJ0ZWQgJiYgIXRoaXMuaXNPcHRpb25hbCAmJiAhdGhpcy5sYXp5ICYmICFmbGFncy5pbnB1dCkge1xuICAgICAgZGV0YWlscy5pbnNlcnRlZCA9IHRoaXMucGxhY2Vob2xkZXJDaGFyO1xuICAgIH1cbiAgICBkZXRhaWxzLnNraXAgPSAhZGV0YWlscy5pbnNlcnRlZCAmJiAhdGhpcy5pc09wdGlvbmFsO1xuICAgIHRoaXMuaXNGaWxsZWQgPSBCb29sZWFuKGRldGFpbHMuaW5zZXJ0ZWQpO1xuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIGFwcGVuZChzdHIsIGZsYWdzLCB0YWlsKSB7XG4gICAgLy8gVE9ETyBwcm9iYWJseSBzaG91bGQgYmUgZG9uZSB2aWEgX2FwcGVuZENoYXJcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQuYXBwZW5kKHN0ciwgdGhpcy5jdXJyZW50TWFza0ZsYWdzKGZsYWdzKSwgdGFpbCk7XG4gIH1cbiAgX2FwcGVuZFBsYWNlaG9sZGVyKCkge1xuICAgIGlmICh0aGlzLmlzRmlsbGVkIHx8IHRoaXMuaXNPcHRpb25hbCkgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgdGhpcy5pc0ZpbGxlZCA9IHRydWU7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKHtcbiAgICAgIGluc2VydGVkOiB0aGlzLnBsYWNlaG9sZGVyQ2hhclxuICAgIH0pO1xuICB9XG4gIF9hcHBlbmRFYWdlcigpIHtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgfVxuICBleHRyYWN0VGFpbChmcm9tUG9zLCB0b1Bvcykge1xuICAgIHJldHVybiB0aGlzLm1hc2tlZC5leHRyYWN0VGFpbChmcm9tUG9zLCB0b1Bvcyk7XG4gIH1cbiAgYXBwZW5kVGFpbCh0YWlsKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLmFwcGVuZFRhaWwodGFpbCk7XG4gIH1cbiAgZXh0cmFjdElucHV0KGZyb21Qb3MsIHRvUG9zLCBmbGFncykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLmV4dHJhY3RJbnB1dChmcm9tUG9zLCB0b1BvcywgZmxhZ3MpO1xuICB9XG4gIG5lYXJlc3RJbnB1dFBvcyhjdXJzb3JQb3MsIGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IHZvaWQgMCkge1xuICAgICAgZGlyZWN0aW9uID0gRElSRUNUSU9OLk5PTkU7XG4gICAgfVxuICAgIGNvbnN0IG1pblBvcyA9IDA7XG4gICAgY29uc3QgbWF4UG9zID0gdGhpcy52YWx1ZS5sZW5ndGg7XG4gICAgY29uc3QgYm91bmRQb3MgPSBNYXRoLm1pbihNYXRoLm1heChjdXJzb3JQb3MsIG1pblBvcyksIG1heFBvcyk7XG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgRElSRUNUSU9OLkxFRlQ6XG4gICAgICBjYXNlIERJUkVDVElPTi5GT1JDRV9MRUZUOlxuICAgICAgICByZXR1cm4gdGhpcy5pc0NvbXBsZXRlID8gYm91bmRQb3MgOiBtaW5Qb3M7XG4gICAgICBjYXNlIERJUkVDVElPTi5SSUdIVDpcbiAgICAgIGNhc2UgRElSRUNUSU9OLkZPUkNFX1JJR0hUOlxuICAgICAgICByZXR1cm4gdGhpcy5pc0NvbXBsZXRlID8gYm91bmRQb3MgOiBtYXhQb3M7XG4gICAgICBjYXNlIERJUkVDVElPTi5OT05FOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGJvdW5kUG9zO1xuICAgIH1cbiAgfVxuICB0b3RhbElucHV0UG9zaXRpb25zKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMudmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWx1ZS5zbGljZShmcm9tUG9zLCB0b1BvcykubGVuZ3RoO1xuICB9XG4gIGRvVmFsaWRhdGUoZmxhZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQuZG9WYWxpZGF0ZSh0aGlzLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpKSAmJiAoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmRvVmFsaWRhdGUodGhpcy5jdXJyZW50TWFza0ZsYWdzKGZsYWdzKSkpO1xuICB9XG4gIGRvQ29tbWl0KCkge1xuICAgIHRoaXMubWFza2VkLmRvQ29tbWl0KCk7XG4gIH1cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBfdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBfcmF3SW5wdXRWYWx1ZTogdGhpcy5yYXdJbnB1dFZhbHVlLFxuICAgICAgbWFza2VkOiB0aGlzLm1hc2tlZC5zdGF0ZSxcbiAgICAgIGlzRmlsbGVkOiB0aGlzLmlzRmlsbGVkXG4gICAgfTtcbiAgfVxuICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLm1hc2tlZC5zdGF0ZSA9IHN0YXRlLm1hc2tlZDtcbiAgICB0aGlzLmlzRmlsbGVkID0gc3RhdGUuaXNGaWxsZWQ7XG4gIH1cbiAgY3VycmVudE1hc2tGbGFncyhmbGFncykge1xuICAgIHZhciBfZmxhZ3MkX2JlZm9yZVRhaWxTdGE7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmZsYWdzLFxuICAgICAgX2JlZm9yZVRhaWxTdGF0ZTogKGZsYWdzID09IG51bGwgfHwgKF9mbGFncyRfYmVmb3JlVGFpbFN0YSA9IGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUpID09IG51bGwgPyB2b2lkIDAgOiBfZmxhZ3MkX2JlZm9yZVRhaWxTdGEubWFza2VkKSB8fCAoZmxhZ3MgPT0gbnVsbCA/IHZvaWQgMCA6IGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUpXG4gICAgfTtcbiAgfVxuICBwYWQoZmxhZ3MpIHtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgfVxufVxuUGF0dGVybklucHV0RGVmaW5pdGlvbi5ERUZBVUxUX0RFRklOSVRJT05TID0ge1xuICAnMCc6IC9cXGQvLFxuICAnYSc6IC9bXFx1MDA0MS1cXHUwMDVBXFx1MDA2MS1cXHUwMDdBXFx1MDBBQVxcdTAwQjVcXHUwMEJBXFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMkMxXFx1MDJDNi1cXHUwMkQxXFx1MDJFMC1cXHUwMkU0XFx1MDJFQ1xcdTAyRUVcXHUwMzcwLVxcdTAzNzRcXHUwMzc2XFx1MDM3N1xcdTAzN0EtXFx1MDM3RFxcdTAzODZcXHUwMzg4LVxcdTAzOEFcXHUwMzhDXFx1MDM4RS1cXHUwM0ExXFx1MDNBMy1cXHUwM0Y1XFx1MDNGNy1cXHUwNDgxXFx1MDQ4QS1cXHUwNTI3XFx1MDUzMS1cXHUwNTU2XFx1MDU1OVxcdTA1NjEtXFx1MDU4N1xcdTA1RDAtXFx1MDVFQVxcdTA1RjAtXFx1MDVGMlxcdTA2MjAtXFx1MDY0QVxcdTA2NkVcXHUwNjZGXFx1MDY3MS1cXHUwNkQzXFx1MDZENVxcdTA2RTVcXHUwNkU2XFx1MDZFRVxcdTA2RUZcXHUwNkZBLVxcdTA2RkNcXHUwNkZGXFx1MDcxMFxcdTA3MTItXFx1MDcyRlxcdTA3NEQtXFx1MDdBNVxcdTA3QjFcXHUwN0NBLVxcdTA3RUFcXHUwN0Y0XFx1MDdGNVxcdTA3RkFcXHUwODAwLVxcdTA4MTVcXHUwODFBXFx1MDgyNFxcdTA4MjhcXHUwODQwLVxcdTA4NThcXHUwOEEwXFx1MDhBMi1cXHUwOEFDXFx1MDkwNC1cXHUwOTM5XFx1MDkzRFxcdTA5NTBcXHUwOTU4LVxcdTA5NjFcXHUwOTcxLVxcdTA5NzdcXHUwOTc5LVxcdTA5N0ZcXHUwOTg1LVxcdTA5OENcXHUwOThGXFx1MDk5MFxcdTA5OTMtXFx1MDlBOFxcdTA5QUEtXFx1MDlCMFxcdTA5QjJcXHUwOUI2LVxcdTA5QjlcXHUwOUJEXFx1MDlDRVxcdTA5RENcXHUwOUREXFx1MDlERi1cXHUwOUUxXFx1MDlGMFxcdTA5RjFcXHUwQTA1LVxcdTBBMEFcXHUwQTBGXFx1MEExMFxcdTBBMTMtXFx1MEEyOFxcdTBBMkEtXFx1MEEzMFxcdTBBMzJcXHUwQTMzXFx1MEEzNVxcdTBBMzZcXHUwQTM4XFx1MEEzOVxcdTBBNTktXFx1MEE1Q1xcdTBBNUVcXHUwQTcyLVxcdTBBNzRcXHUwQTg1LVxcdTBBOERcXHUwQThGLVxcdTBBOTFcXHUwQTkzLVxcdTBBQThcXHUwQUFBLVxcdTBBQjBcXHUwQUIyXFx1MEFCM1xcdTBBQjUtXFx1MEFCOVxcdTBBQkRcXHUwQUQwXFx1MEFFMFxcdTBBRTFcXHUwQjA1LVxcdTBCMENcXHUwQjBGXFx1MEIxMFxcdTBCMTMtXFx1MEIyOFxcdTBCMkEtXFx1MEIzMFxcdTBCMzJcXHUwQjMzXFx1MEIzNS1cXHUwQjM5XFx1MEIzRFxcdTBCNUNcXHUwQjVEXFx1MEI1Ri1cXHUwQjYxXFx1MEI3MVxcdTBCODNcXHUwQjg1LVxcdTBCOEFcXHUwQjhFLVxcdTBCOTBcXHUwQjkyLVxcdTBCOTVcXHUwQjk5XFx1MEI5QVxcdTBCOUNcXHUwQjlFXFx1MEI5RlxcdTBCQTNcXHUwQkE0XFx1MEJBOC1cXHUwQkFBXFx1MEJBRS1cXHUwQkI5XFx1MEJEMFxcdTBDMDUtXFx1MEMwQ1xcdTBDMEUtXFx1MEMxMFxcdTBDMTItXFx1MEMyOFxcdTBDMkEtXFx1MEMzM1xcdTBDMzUtXFx1MEMzOVxcdTBDM0RcXHUwQzU4XFx1MEM1OVxcdTBDNjBcXHUwQzYxXFx1MEM4NS1cXHUwQzhDXFx1MEM4RS1cXHUwQzkwXFx1MEM5Mi1cXHUwQ0E4XFx1MENBQS1cXHUwQ0IzXFx1MENCNS1cXHUwQ0I5XFx1MENCRFxcdTBDREVcXHUwQ0UwXFx1MENFMVxcdTBDRjFcXHUwQ0YyXFx1MEQwNS1cXHUwRDBDXFx1MEQwRS1cXHUwRDEwXFx1MEQxMi1cXHUwRDNBXFx1MEQzRFxcdTBENEVcXHUwRDYwXFx1MEQ2MVxcdTBEN0EtXFx1MEQ3RlxcdTBEODUtXFx1MEQ5NlxcdTBEOUEtXFx1MERCMVxcdTBEQjMtXFx1MERCQlxcdTBEQkRcXHUwREMwLVxcdTBEQzZcXHUwRTAxLVxcdTBFMzBcXHUwRTMyXFx1MEUzM1xcdTBFNDAtXFx1MEU0NlxcdTBFODFcXHUwRTgyXFx1MEU4NFxcdTBFODdcXHUwRTg4XFx1MEU4QVxcdTBFOERcXHUwRTk0LVxcdTBFOTdcXHUwRTk5LVxcdTBFOUZcXHUwRUExLVxcdTBFQTNcXHUwRUE1XFx1MEVBN1xcdTBFQUFcXHUwRUFCXFx1MEVBRC1cXHUwRUIwXFx1MEVCMlxcdTBFQjNcXHUwRUJEXFx1MEVDMC1cXHUwRUM0XFx1MEVDNlxcdTBFREMtXFx1MEVERlxcdTBGMDBcXHUwRjQwLVxcdTBGNDdcXHUwRjQ5LVxcdTBGNkNcXHUwRjg4LVxcdTBGOENcXHUxMDAwLVxcdTEwMkFcXHUxMDNGXFx1MTA1MC1cXHUxMDU1XFx1MTA1QS1cXHUxMDVEXFx1MTA2MVxcdTEwNjVcXHUxMDY2XFx1MTA2RS1cXHUxMDcwXFx1MTA3NS1cXHUxMDgxXFx1MTA4RVxcdTEwQTAtXFx1MTBDNVxcdTEwQzdcXHUxMENEXFx1MTBEMC1cXHUxMEZBXFx1MTBGQy1cXHUxMjQ4XFx1MTI0QS1cXHUxMjREXFx1MTI1MC1cXHUxMjU2XFx1MTI1OFxcdTEyNUEtXFx1MTI1RFxcdTEyNjAtXFx1MTI4OFxcdTEyOEEtXFx1MTI4RFxcdTEyOTAtXFx1MTJCMFxcdTEyQjItXFx1MTJCNVxcdTEyQjgtXFx1MTJCRVxcdTEyQzBcXHUxMkMyLVxcdTEyQzVcXHUxMkM4LVxcdTEyRDZcXHUxMkQ4LVxcdTEzMTBcXHUxMzEyLVxcdTEzMTVcXHUxMzE4LVxcdTEzNUFcXHUxMzgwLVxcdTEzOEZcXHUxM0EwLVxcdTEzRjRcXHUxNDAxLVxcdTE2NkNcXHUxNjZGLVxcdTE2N0ZcXHUxNjgxLVxcdTE2OUFcXHUxNkEwLVxcdTE2RUFcXHUxNzAwLVxcdTE3MENcXHUxNzBFLVxcdTE3MTFcXHUxNzIwLVxcdTE3MzFcXHUxNzQwLVxcdTE3NTFcXHUxNzYwLVxcdTE3NkNcXHUxNzZFLVxcdTE3NzBcXHUxNzgwLVxcdTE3QjNcXHUxN0Q3XFx1MTdEQ1xcdTE4MjAtXFx1MTg3N1xcdTE4ODAtXFx1MThBOFxcdTE4QUFcXHUxOEIwLVxcdTE4RjVcXHUxOTAwLVxcdTE5MUNcXHUxOTUwLVxcdTE5NkRcXHUxOTcwLVxcdTE5NzRcXHUxOTgwLVxcdTE5QUJcXHUxOUMxLVxcdTE5QzdcXHUxQTAwLVxcdTFBMTZcXHUxQTIwLVxcdTFBNTRcXHUxQUE3XFx1MUIwNS1cXHUxQjMzXFx1MUI0NS1cXHUxQjRCXFx1MUI4My1cXHUxQkEwXFx1MUJBRVxcdTFCQUZcXHUxQkJBLVxcdTFCRTVcXHUxQzAwLVxcdTFDMjNcXHUxQzRELVxcdTFDNEZcXHUxQzVBLVxcdTFDN0RcXHUxQ0U5LVxcdTFDRUNcXHUxQ0VFLVxcdTFDRjFcXHUxQ0Y1XFx1MUNGNlxcdTFEMDAtXFx1MURCRlxcdTFFMDAtXFx1MUYxNVxcdTFGMTgtXFx1MUYxRFxcdTFGMjAtXFx1MUY0NVxcdTFGNDgtXFx1MUY0RFxcdTFGNTAtXFx1MUY1N1xcdTFGNTlcXHUxRjVCXFx1MUY1RFxcdTFGNUYtXFx1MUY3RFxcdTFGODAtXFx1MUZCNFxcdTFGQjYtXFx1MUZCQ1xcdTFGQkVcXHUxRkMyLVxcdTFGQzRcXHUxRkM2LVxcdTFGQ0NcXHUxRkQwLVxcdTFGRDNcXHUxRkQ2LVxcdTFGREJcXHUxRkUwLVxcdTFGRUNcXHUxRkYyLVxcdTFGRjRcXHUxRkY2LVxcdTFGRkNcXHUyMDcxXFx1MjA3RlxcdTIwOTAtXFx1MjA5Q1xcdTIxMDJcXHUyMTA3XFx1MjEwQS1cXHUyMTEzXFx1MjExNVxcdTIxMTktXFx1MjExRFxcdTIxMjRcXHUyMTI2XFx1MjEyOFxcdTIxMkEtXFx1MjEyRFxcdTIxMkYtXFx1MjEzOVxcdTIxM0MtXFx1MjEzRlxcdTIxNDUtXFx1MjE0OVxcdTIxNEVcXHUyMTgzXFx1MjE4NFxcdTJDMDAtXFx1MkMyRVxcdTJDMzAtXFx1MkM1RVxcdTJDNjAtXFx1MkNFNFxcdTJDRUItXFx1MkNFRVxcdTJDRjJcXHUyQ0YzXFx1MkQwMC1cXHUyRDI1XFx1MkQyN1xcdTJEMkRcXHUyRDMwLVxcdTJENjdcXHUyRDZGXFx1MkQ4MC1cXHUyRDk2XFx1MkRBMC1cXHUyREE2XFx1MkRBOC1cXHUyREFFXFx1MkRCMC1cXHUyREI2XFx1MkRCOC1cXHUyREJFXFx1MkRDMC1cXHUyREM2XFx1MkRDOC1cXHUyRENFXFx1MkREMC1cXHUyREQ2XFx1MkREOC1cXHUyRERFXFx1MkUyRlxcdTMwMDVcXHUzMDA2XFx1MzAzMS1cXHUzMDM1XFx1MzAzQlxcdTMwM0NcXHUzMDQxLVxcdTMwOTZcXHUzMDlELVxcdTMwOUZcXHUzMEExLVxcdTMwRkFcXHUzMEZDLVxcdTMwRkZcXHUzMTA1LVxcdTMxMkRcXHUzMTMxLVxcdTMxOEVcXHUzMUEwLVxcdTMxQkFcXHUzMUYwLVxcdTMxRkZcXHUzNDAwLVxcdTREQjVcXHU0RTAwLVxcdTlGQ0NcXHVBMDAwLVxcdUE0OENcXHVBNEQwLVxcdUE0RkRcXHVBNTAwLVxcdUE2MENcXHVBNjEwLVxcdUE2MUZcXHVBNjJBXFx1QTYyQlxcdUE2NDAtXFx1QTY2RVxcdUE2N0YtXFx1QTY5N1xcdUE2QTAtXFx1QTZFNVxcdUE3MTctXFx1QTcxRlxcdUE3MjItXFx1QTc4OFxcdUE3OEItXFx1QTc4RVxcdUE3OTAtXFx1QTc5M1xcdUE3QTAtXFx1QTdBQVxcdUE3RjgtXFx1QTgwMVxcdUE4MDMtXFx1QTgwNVxcdUE4MDctXFx1QTgwQVxcdUE4MEMtXFx1QTgyMlxcdUE4NDAtXFx1QTg3M1xcdUE4ODItXFx1QThCM1xcdUE4RjItXFx1QThGN1xcdUE4RkJcXHVBOTBBLVxcdUE5MjVcXHVBOTMwLVxcdUE5NDZcXHVBOTYwLVxcdUE5N0NcXHVBOTg0LVxcdUE5QjJcXHVBOUNGXFx1QUEwMC1cXHVBQTI4XFx1QUE0MC1cXHVBQTQyXFx1QUE0NC1cXHVBQTRCXFx1QUE2MC1cXHVBQTc2XFx1QUE3QVxcdUFBODAtXFx1QUFBRlxcdUFBQjFcXHVBQUI1XFx1QUFCNlxcdUFBQjktXFx1QUFCRFxcdUFBQzBcXHVBQUMyXFx1QUFEQi1cXHVBQUREXFx1QUFFMC1cXHVBQUVBXFx1QUFGMi1cXHVBQUY0XFx1QUIwMS1cXHVBQjA2XFx1QUIwOS1cXHVBQjBFXFx1QUIxMS1cXHVBQjE2XFx1QUIyMC1cXHVBQjI2XFx1QUIyOC1cXHVBQjJFXFx1QUJDMC1cXHVBQkUyXFx1QUMwMC1cXHVEN0EzXFx1RDdCMC1cXHVEN0M2XFx1RDdDQi1cXHVEN0ZCXFx1RjkwMC1cXHVGQTZEXFx1RkE3MC1cXHVGQUQ5XFx1RkIwMC1cXHVGQjA2XFx1RkIxMy1cXHVGQjE3XFx1RkIxRFxcdUZCMUYtXFx1RkIyOFxcdUZCMkEtXFx1RkIzNlxcdUZCMzgtXFx1RkIzQ1xcdUZCM0VcXHVGQjQwXFx1RkI0MVxcdUZCNDNcXHVGQjQ0XFx1RkI0Ni1cXHVGQkIxXFx1RkJEMy1cXHVGRDNEXFx1RkQ1MC1cXHVGRDhGXFx1RkQ5Mi1cXHVGREM3XFx1RkRGMC1cXHVGREZCXFx1RkU3MC1cXHVGRTc0XFx1RkU3Ni1cXHVGRUZDXFx1RkYyMS1cXHVGRjNBXFx1RkY0MS1cXHVGRjVBXFx1RkY2Ni1cXHVGRkJFXFx1RkZDMi1cXHVGRkM3XFx1RkZDQS1cXHVGRkNGXFx1RkZEMi1cXHVGRkQ3XFx1RkZEQS1cXHVGRkRDXS8sXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyMDc1MDcwXG4gICcqJzogLy4vXG59O1xuXG5leHBvcnQgeyBQYXR0ZXJuSW5wdXREZWZpbml0aW9uIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBjcmVhdGVNYXNrIGZyb20gJy4vZmFjdG9yeS5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0ICcuLi9jb3JlL3V0aWxzLmpzJztcblxuLyoqIE1hc2sgcGlwZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIHR5cGVzICovXG5jb25zdCBQSVBFX1RZUEUgPSB7XG4gIE1BU0tFRDogJ3ZhbHVlJyxcbiAgVU5NQVNLRUQ6ICd1bm1hc2tlZFZhbHVlJyxcbiAgVFlQRUQ6ICd0eXBlZFZhbHVlJ1xufTtcbi8qKiBDcmVhdGVzIG5ldyBwaXBlIGZ1bmN0aW9uIGRlcGVuZGluZyBvbiBtYXNrIHR5cGUsIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gb3B0aW9ucyAqL1xuZnVuY3Rpb24gY3JlYXRlUGlwZShhcmcsIGZyb20sIHRvKSB7XG4gIGlmIChmcm9tID09PSB2b2lkIDApIHtcbiAgICBmcm9tID0gUElQRV9UWVBFLk1BU0tFRDtcbiAgfVxuICBpZiAodG8gPT09IHZvaWQgMCkge1xuICAgIHRvID0gUElQRV9UWVBFLk1BU0tFRDtcbiAgfVxuICBjb25zdCBtYXNrZWQgPSBjcmVhdGVNYXNrKGFyZyk7XG4gIHJldHVybiB2YWx1ZSA9PiBtYXNrZWQucnVuSXNvbGF0ZWQobSA9PiB7XG4gICAgbVtmcm9tXSA9IHZhbHVlO1xuICAgIHJldHVybiBtW3RvXTtcbiAgfSk7XG59XG5cbi8qKiBQaXBlcyB2YWx1ZSB0aHJvdWdoIG1hc2sgZGVwZW5kaW5nIG9uIG1hc2sgdHlwZSwgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBvcHRpb25zICovXG5mdW5jdGlvbiBwaXBlKHZhbHVlLCBtYXNrLCBmcm9tLCB0bykge1xuICByZXR1cm4gY3JlYXRlUGlwZShtYXNrLCBmcm9tLCB0bykodmFsdWUpO1xufVxuSU1hc2suUElQRV9UWVBFID0gUElQRV9UWVBFO1xuSU1hc2suY3JlYXRlUGlwZSA9IGNyZWF0ZVBpcGU7XG5JTWFzay5waXBlID0gcGlwZTtcblxuZXhwb3J0IHsgUElQRV9UWVBFLCBjcmVhdGVQaXBlLCBwaXBlIH07XG4iLCJpbXBvcnQgQ2hhbmdlRGV0YWlscyBmcm9tICcuLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgTWFza2VkUGF0dGVybiBmcm9tICcuL3BhdHRlcm4uanMnO1xuaW1wb3J0ICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCAnLi9iYXNlLmpzJztcbmltcG9ydCAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vZmFjdG9yeS5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9jaHVuay10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vY3Vyc29yLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2ZpeGVkLWRlZmluaXRpb24uanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vaW5wdXQtZGVmaW5pdGlvbi5qcyc7XG5pbXBvcnQgJy4vcmVnZXhwLmpzJztcblxuLyoqIFBhdHRlcm4gd2hpY2ggYWNjZXB0cyByYW5nZXMgKi9cbmNsYXNzIE1hc2tlZFJhbmdlIGV4dGVuZHMgTWFza2VkUGF0dGVybiB7XG4gIC8qKlxuICAgIE9wdGlvbmFsbHkgc2V0cyBtYXggbGVuZ3RoIG9mIHBhdHRlcm4uXG4gICAgVXNlZCB3aGVuIHBhdHRlcm4gbGVuZ3RoIGlzIGxvbmdlciB0aGVuIGB0b2AgcGFyYW0gbGVuZ3RoLiBQYWRzIHplcm9zIGF0IHN0YXJ0IGluIHRoaXMgY2FzZS5cbiAgKi9cblxuICAvKiogTWluIGJvdW5kICovXG5cbiAgLyoqIE1heCBib3VuZCAqL1xuXG4gIGdldCBfbWF0Y2hGcm9tKCkge1xuICAgIHJldHVybiB0aGlzLm1heExlbmd0aCAtIFN0cmluZyh0aGlzLmZyb20pLmxlbmd0aDtcbiAgfVxuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgc3VwZXIob3B0cyk7IC8vIG1hc2sgd2lsbCBiZSBjcmVhdGVkIGluIF91cGRhdGVcbiAgfVxuICB1cGRhdGVPcHRpb25zKG9wdHMpIHtcbiAgICBzdXBlci51cGRhdGVPcHRpb25zKG9wdHMpO1xuICB9XG4gIF91cGRhdGUob3B0cykge1xuICAgIGNvbnN0IHtcbiAgICAgIHRvID0gdGhpcy50byB8fCAwLFxuICAgICAgZnJvbSA9IHRoaXMuZnJvbSB8fCAwLFxuICAgICAgbWF4TGVuZ3RoID0gdGhpcy5tYXhMZW5ndGggfHwgMCxcbiAgICAgIGF1dG9maXggPSB0aGlzLmF1dG9maXgsXG4gICAgICAuLi5wYXR0ZXJuT3B0c1xuICAgIH0gPSBvcHRzO1xuICAgIHRoaXMudG8gPSB0bztcbiAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgIHRoaXMubWF4TGVuZ3RoID0gTWF0aC5tYXgoU3RyaW5nKHRvKS5sZW5ndGgsIG1heExlbmd0aCk7XG4gICAgdGhpcy5hdXRvZml4ID0gYXV0b2ZpeDtcbiAgICBjb25zdCBmcm9tU3RyID0gU3RyaW5nKHRoaXMuZnJvbSkucGFkU3RhcnQodGhpcy5tYXhMZW5ndGgsICcwJyk7XG4gICAgY29uc3QgdG9TdHIgPSBTdHJpbmcodGhpcy50bykucGFkU3RhcnQodGhpcy5tYXhMZW5ndGgsICcwJyk7XG4gICAgbGV0IHNhbWVDaGFyc0NvdW50ID0gMDtcbiAgICB3aGlsZSAoc2FtZUNoYXJzQ291bnQgPCB0b1N0ci5sZW5ndGggJiYgdG9TdHJbc2FtZUNoYXJzQ291bnRdID09PSBmcm9tU3RyW3NhbWVDaGFyc0NvdW50XSkgKytzYW1lQ2hhcnNDb3VudDtcbiAgICBwYXR0ZXJuT3B0cy5tYXNrID0gdG9TdHIuc2xpY2UoMCwgc2FtZUNoYXJzQ291bnQpLnJlcGxhY2UoLzAvZywgJ1xcXFwwJykgKyAnMCcucmVwZWF0KHRoaXMubWF4TGVuZ3RoIC0gc2FtZUNoYXJzQ291bnQpO1xuICAgIHN1cGVyLl91cGRhdGUocGF0dGVybk9wdHMpO1xuICB9XG4gIGdldCBpc0NvbXBsZXRlKCkge1xuICAgIHJldHVybiBzdXBlci5pc0NvbXBsZXRlICYmIEJvb2xlYW4odGhpcy52YWx1ZSk7XG4gIH1cbiAgYm91bmRhcmllcyhzdHIpIHtcbiAgICBsZXQgbWluc3RyID0gJyc7XG4gICAgbGV0IG1heHN0ciA9ICcnO1xuICAgIGNvbnN0IFssIHBsYWNlaG9sZGVyLCBudW1dID0gc3RyLm1hdGNoKC9eKFxcRCopKFxcZCopKFxcRCopLykgfHwgW107XG4gICAgaWYgKG51bSkge1xuICAgICAgbWluc3RyID0gJzAnLnJlcGVhdChwbGFjZWhvbGRlci5sZW5ndGgpICsgbnVtO1xuICAgICAgbWF4c3RyID0gJzknLnJlcGVhdChwbGFjZWhvbGRlci5sZW5ndGgpICsgbnVtO1xuICAgIH1cbiAgICBtaW5zdHIgPSBtaW5zdHIucGFkRW5kKHRoaXMubWF4TGVuZ3RoLCAnMCcpO1xuICAgIG1heHN0ciA9IG1heHN0ci5wYWRFbmQodGhpcy5tYXhMZW5ndGgsICc5Jyk7XG4gICAgcmV0dXJuIFttaW5zdHIsIG1heHN0cl07XG4gIH1cbiAgZG9QcmVwYXJlQ2hhcihjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgbGV0IGRldGFpbHM7XG4gICAgW2NoLCBkZXRhaWxzXSA9IHN1cGVyLmRvUHJlcGFyZUNoYXIoY2gucmVwbGFjZSgvXFxEL2csICcnKSwgZmxhZ3MpO1xuICAgIGlmICghY2gpIGRldGFpbHMuc2tpcCA9ICF0aGlzLmlzQ29tcGxldGU7XG4gICAgcmV0dXJuIFtjaCwgZGV0YWlsc107XG4gIH1cbiAgX2FwcGVuZENoYXJSYXcoY2gsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGlmICghdGhpcy5hdXRvZml4IHx8IHRoaXMudmFsdWUubGVuZ3RoICsgMSA+IHRoaXMubWF4TGVuZ3RoKSByZXR1cm4gc3VwZXIuX2FwcGVuZENoYXJSYXcoY2gsIGZsYWdzKTtcbiAgICBjb25zdCBmcm9tU3RyID0gU3RyaW5nKHRoaXMuZnJvbSkucGFkU3RhcnQodGhpcy5tYXhMZW5ndGgsICcwJyk7XG4gICAgY29uc3QgdG9TdHIgPSBTdHJpbmcodGhpcy50bykucGFkU3RhcnQodGhpcy5tYXhMZW5ndGgsICcwJyk7XG4gICAgY29uc3QgW21pbnN0ciwgbWF4c3RyXSA9IHRoaXMuYm91bmRhcmllcyh0aGlzLnZhbHVlICsgY2gpO1xuICAgIGlmIChOdW1iZXIobWF4c3RyKSA8IHRoaXMuZnJvbSkgcmV0dXJuIHN1cGVyLl9hcHBlbmRDaGFyUmF3KGZyb21TdHJbdGhpcy52YWx1ZS5sZW5ndGhdLCBmbGFncyk7XG4gICAgaWYgKE51bWJlcihtaW5zdHIpID4gdGhpcy50bykge1xuICAgICAgaWYgKCFmbGFncy50YWlsICYmIHRoaXMuYXV0b2ZpeCA9PT0gJ3BhZCcgJiYgdGhpcy52YWx1ZS5sZW5ndGggKyAxIDwgdGhpcy5tYXhMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLl9hcHBlbmRDaGFyUmF3KGZyb21TdHJbdGhpcy52YWx1ZS5sZW5ndGhdLCBmbGFncykuYWdncmVnYXRlKHRoaXMuX2FwcGVuZENoYXJSYXcoY2gsIGZsYWdzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VwZXIuX2FwcGVuZENoYXJSYXcodG9TdHJbdGhpcy52YWx1ZS5sZW5ndGhdLCBmbGFncyk7XG4gICAgfVxuICAgIHJldHVybiBzdXBlci5fYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpO1xuICB9XG4gIGRvVmFsaWRhdGUoZmxhZ3MpIHtcbiAgICBjb25zdCBzdHIgPSB0aGlzLnZhbHVlO1xuICAgIGNvbnN0IGZpcnN0Tm9uWmVybyA9IHN0ci5zZWFyY2goL1teMF0vKTtcbiAgICBpZiAoZmlyc3ROb25aZXJvID09PSAtMSAmJiBzdHIubGVuZ3RoIDw9IHRoaXMuX21hdGNoRnJvbSkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgW21pbnN0ciwgbWF4c3RyXSA9IHRoaXMuYm91bmRhcmllcyhzdHIpO1xuICAgIHJldHVybiB0aGlzLmZyb20gPD0gTnVtYmVyKG1heHN0cikgJiYgTnVtYmVyKG1pbnN0cikgPD0gdGhpcy50byAmJiBzdXBlci5kb1ZhbGlkYXRlKGZsYWdzKTtcbiAgfVxuICBwYWQoZmxhZ3MpIHtcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggPT09IHRoaXMubWF4TGVuZ3RoKSByZXR1cm4gZGV0YWlscztcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgcGFkTGVuZ3RoID0gdGhpcy5tYXhMZW5ndGggLSB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICBpZiAocGFkTGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZExlbmd0aDsgKytpKSB7XG4gICAgICAgIGRldGFpbHMuYWdncmVnYXRlKHN1cGVyLl9hcHBlbmRDaGFyUmF3KCcwJywgZmxhZ3MpKTtcbiAgICAgIH1cblxuICAgICAgLy8gYXBwZW5kIHRhaWxcbiAgICAgIHZhbHVlLnNwbGl0KCcnKS5mb3JFYWNoKGNoID0+IHRoaXMuX2FwcGVuZENoYXJSYXcoY2gpKTtcbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbn1cbklNYXNrLk1hc2tlZFJhbmdlID0gTWFza2VkUmFuZ2U7XG5cbmV4cG9ydCB7IE1hc2tlZFJhbmdlIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBNYXNrZWQgZnJvbSAnLi9iYXNlLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuLi9jb3JlL2NvbnRpbnVvdXMtdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi4vY29yZS91dGlscy5qcyc7XG5cbi8qKiBNYXNraW5nIGJ5IFJlZ0V4cCAqL1xuY2xhc3MgTWFza2VkUmVnRXhwIGV4dGVuZHMgTWFza2VkIHtcbiAgLyoqICovXG5cbiAgLyoqIEVuYWJsZSBjaGFyYWN0ZXJzIG92ZXJ3cml0aW5nICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgdXBkYXRlT3B0aW9ucyhvcHRzKSB7XG4gICAgc3VwZXIudXBkYXRlT3B0aW9ucyhvcHRzKTtcbiAgfVxuICBfdXBkYXRlKG9wdHMpIHtcbiAgICBjb25zdCBtYXNrID0gb3B0cy5tYXNrO1xuICAgIGlmIChtYXNrKSBvcHRzLnZhbGlkYXRlID0gdmFsdWUgPT4gdmFsdWUuc2VhcmNoKG1hc2spID49IDA7XG4gICAgc3VwZXIuX3VwZGF0ZShvcHRzKTtcbiAgfVxufVxuSU1hc2suTWFza2VkUmVnRXhwID0gTWFza2VkUmVnRXhwO1xuXG5leHBvcnQgeyBNYXNrZWRSZWdFeHAgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IENoYW5nZURldGFpbHMgZnJvbSAnLi4vY29yZS9jaGFuZ2UtZGV0YWlscy5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0IGNyZWF0ZU1hc2ssIHsgbm9ybWFsaXplT3B0cyB9IGZyb20gJy4vZmFjdG9yeS5qcyc7XG5pbXBvcnQgTWFza2VkUGF0dGVybiBmcm9tICcuL3BhdHRlcm4uanMnO1xuaW1wb3J0ICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCAnLi9iYXNlLmpzJztcbmltcG9ydCAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9jaHVuay10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vY3Vyc29yLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2ZpeGVkLWRlZmluaXRpb24uanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vaW5wdXQtZGVmaW5pdGlvbi5qcyc7XG5pbXBvcnQgJy4vcmVnZXhwLmpzJztcblxuLyoqIFBhdHRlcm4gbWFzayAqL1xuY2xhc3MgUmVwZWF0QmxvY2sgZXh0ZW5kcyBNYXNrZWRQYXR0ZXJuIHtcbiAgZ2V0IHJlcGVhdEZyb20oKSB7XG4gICAgdmFyIF9yZWY7XG4gICAgcmV0dXJuIChfcmVmID0gQXJyYXkuaXNBcnJheSh0aGlzLnJlcGVhdCkgPyB0aGlzLnJlcGVhdFswXSA6IHRoaXMucmVwZWF0ID09PSBJbmZpbml0eSA/IDAgOiB0aGlzLnJlcGVhdCkgIT0gbnVsbCA/IF9yZWYgOiAwO1xuICB9XG4gIGdldCByZXBlYXRUbygpIHtcbiAgICB2YXIgX3JlZjI7XG4gICAgcmV0dXJuIChfcmVmMiA9IEFycmF5LmlzQXJyYXkodGhpcy5yZXBlYXQpID8gdGhpcy5yZXBlYXRbMV0gOiB0aGlzLnJlcGVhdCkgIT0gbnVsbCA/IF9yZWYyIDogSW5maW5pdHk7XG4gIH1cbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHN1cGVyKG9wdHMpO1xuICB9XG4gIHVwZGF0ZU9wdGlvbnMob3B0cykge1xuICAgIHN1cGVyLnVwZGF0ZU9wdGlvbnMob3B0cyk7XG4gIH1cbiAgX3VwZGF0ZShvcHRzKSB7XG4gICAgdmFyIF9yZWYzLCBfcmVmNCwgX3RoaXMkX2Jsb2NrcztcbiAgICBjb25zdCB7XG4gICAgICByZXBlYXQsXG4gICAgICAuLi5ibG9ja09wdHNcbiAgICB9ID0gbm9ybWFsaXplT3B0cyhvcHRzKTsgLy8gVE9ETyB0eXBlXG4gICAgdGhpcy5fYmxvY2tPcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fYmxvY2tPcHRzLCBibG9ja09wdHMpO1xuICAgIGNvbnN0IGJsb2NrID0gY3JlYXRlTWFzayh0aGlzLl9ibG9ja09wdHMpO1xuICAgIHRoaXMucmVwZWF0ID0gKF9yZWYzID0gKF9yZWY0ID0gcmVwZWF0ICE9IG51bGwgPyByZXBlYXQgOiBibG9jay5yZXBlYXQpICE9IG51bGwgPyBfcmVmNCA6IHRoaXMucmVwZWF0KSAhPSBudWxsID8gX3JlZjMgOiBJbmZpbml0eTsgLy8gVE9ETyB0eXBlXG5cbiAgICBzdXBlci5fdXBkYXRlKHtcbiAgICAgIG1hc2s6ICdtJy5yZXBlYXQoTWF0aC5tYXgodGhpcy5yZXBlYXRUbyA9PT0gSW5maW5pdHkgJiYgKChfdGhpcyRfYmxvY2tzID0gdGhpcy5fYmxvY2tzKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkX2Jsb2Nrcy5sZW5ndGgpIHx8IDAsIHRoaXMucmVwZWF0RnJvbSkpLFxuICAgICAgYmxvY2tzOiB7XG4gICAgICAgIG06IGJsb2NrXG4gICAgICB9LFxuICAgICAgZWFnZXI6IGJsb2NrLmVhZ2VyLFxuICAgICAgb3ZlcndyaXRlOiBibG9jay5vdmVyd3JpdGUsXG4gICAgICBza2lwSW52YWxpZDogYmxvY2suc2tpcEludmFsaWQsXG4gICAgICBsYXp5OiBibG9jay5sYXp5LFxuICAgICAgcGxhY2Vob2xkZXJDaGFyOiBibG9jay5wbGFjZWhvbGRlckNoYXIsXG4gICAgICBkaXNwbGF5Q2hhcjogYmxvY2suZGlzcGxheUNoYXJcbiAgICB9KTtcbiAgfVxuICBfYWxsb2NhdGVCbG9jayhiaSkge1xuICAgIGlmIChiaSA8IHRoaXMuX2Jsb2Nrcy5sZW5ndGgpIHJldHVybiB0aGlzLl9ibG9ja3NbYmldO1xuICAgIGlmICh0aGlzLnJlcGVhdFRvID09PSBJbmZpbml0eSB8fCB0aGlzLl9ibG9ja3MubGVuZ3RoIDwgdGhpcy5yZXBlYXRUbykge1xuICAgICAgdGhpcy5fYmxvY2tzLnB1c2goY3JlYXRlTWFzayh0aGlzLl9ibG9ja09wdHMpKTtcbiAgICAgIHRoaXMubWFzayArPSAnbSc7XG4gICAgICByZXR1cm4gdGhpcy5fYmxvY2tzW3RoaXMuX2Jsb2Nrcy5sZW5ndGggLSAxXTtcbiAgICB9XG4gIH1cbiAgX2FwcGVuZENoYXJSYXcoY2gsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIGZvciAobGV0IGJpID0gKF90aGlzJF9tYXBQb3NUb0Jsb2NrJCA9IChfdGhpcyRfbWFwUG9zVG9CbG9jayA9IHRoaXMuX21hcFBvc1RvQmxvY2sodGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJF9tYXBQb3NUb0Jsb2NrLmluZGV4KSAhPSBudWxsID8gX3RoaXMkX21hcFBvc1RvQmxvY2skIDogTWF0aC5tYXgodGhpcy5fYmxvY2tzLmxlbmd0aCAtIDEsIDApLCBibG9jaywgYWxsb2NhdGVkO1xuICAgIC8vIHRyeSB0byBnZXQgYSBibG9jayBvclxuICAgIC8vIHRyeSB0byBhbGxvY2F0ZSBhIG5ldyBibG9jayBpZiBub3QgYWxsb2NhdGVkIGFscmVhZHlcbiAgICBibG9jayA9IChfdGhpcyRfYmxvY2tzJGJpID0gdGhpcy5fYmxvY2tzW2JpXSkgIT0gbnVsbCA/IF90aGlzJF9ibG9ja3MkYmkgOiBhbGxvY2F0ZWQgPSAhYWxsb2NhdGVkICYmIHRoaXMuX2FsbG9jYXRlQmxvY2soYmkpOyArK2JpKSB7XG4gICAgICB2YXIgX3RoaXMkX21hcFBvc1RvQmxvY2skLCBfdGhpcyRfbWFwUG9zVG9CbG9jaywgX3RoaXMkX2Jsb2NrcyRiaSwgX2ZsYWdzJF9iZWZvcmVUYWlsU3RhO1xuICAgICAgY29uc3QgYmxvY2tEZXRhaWxzID0gYmxvY2suX2FwcGVuZENoYXIoY2gsIHtcbiAgICAgICAgLi4uZmxhZ3MsXG4gICAgICAgIF9iZWZvcmVUYWlsU3RhdGU6IChfZmxhZ3MkX2JlZm9yZVRhaWxTdGEgPSBmbGFncy5fYmVmb3JlVGFpbFN0YXRlKSA9PSBudWxsIHx8IChfZmxhZ3MkX2JlZm9yZVRhaWxTdGEgPSBfZmxhZ3MkX2JlZm9yZVRhaWxTdGEuX2Jsb2NrcykgPT0gbnVsbCA/IHZvaWQgMCA6IF9mbGFncyRfYmVmb3JlVGFpbFN0YVtiaV1cbiAgICAgIH0pO1xuICAgICAgaWYgKGJsb2NrRGV0YWlscy5za2lwICYmIGFsbG9jYXRlZCkge1xuICAgICAgICAvLyByZW1vdmUgdGhlIGxhc3QgYWxsb2NhdGVkIGJsb2NrIGFuZCBicmVha1xuICAgICAgICB0aGlzLl9ibG9ja3MucG9wKCk7XG4gICAgICAgIHRoaXMubWFzayA9IHRoaXMubWFzay5zbGljZSgxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZShibG9ja0RldGFpbHMpO1xuICAgICAgaWYgKGJsb2NrRGV0YWlscy5jb25zdW1lZCkgYnJlYWs7IC8vIGdvIG5leHQgY2hhclxuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBfdHJpbUVtcHR5VGFpbChmcm9tUG9zLCB0b1Bvcykge1xuICAgIHZhciBfdGhpcyRfbWFwUG9zVG9CbG9jazIsIF90aGlzJF9tYXBQb3NUb0Jsb2NrMztcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgY29uc3QgZmlyc3RCbG9ja0luZGV4ID0gTWF0aC5tYXgoKChfdGhpcyRfbWFwUG9zVG9CbG9jazIgPSB0aGlzLl9tYXBQb3NUb0Jsb2NrKGZyb21Qb3MpKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkX21hcFBvc1RvQmxvY2syLmluZGV4KSB8fCAwLCB0aGlzLnJlcGVhdEZyb20sIDApO1xuICAgIGxldCBsYXN0QmxvY2tJbmRleDtcbiAgICBpZiAodG9Qb3MgIT0gbnVsbCkgbGFzdEJsb2NrSW5kZXggPSAoX3RoaXMkX21hcFBvc1RvQmxvY2szID0gdGhpcy5fbWFwUG9zVG9CbG9jayh0b1BvcykpID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRfbWFwUG9zVG9CbG9jazMuaW5kZXg7XG4gICAgaWYgKGxhc3RCbG9ja0luZGV4ID09IG51bGwpIGxhc3RCbG9ja0luZGV4ID0gdGhpcy5fYmxvY2tzLmxlbmd0aCAtIDE7XG4gICAgbGV0IHJlbW92ZUNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBibG9ja0luZGV4ID0gbGFzdEJsb2NrSW5kZXg7IGZpcnN0QmxvY2tJbmRleCA8PSBibG9ja0luZGV4OyAtLWJsb2NrSW5kZXgsICsrcmVtb3ZlQ291bnQpIHtcbiAgICAgIGlmICh0aGlzLl9ibG9ja3NbYmxvY2tJbmRleF0udW5tYXNrZWRWYWx1ZSkgYnJlYWs7XG4gICAgfVxuICAgIGlmIChyZW1vdmVDb3VudCkge1xuICAgICAgdGhpcy5fYmxvY2tzLnNwbGljZShsYXN0QmxvY2tJbmRleCAtIHJlbW92ZUNvdW50ICsgMSwgcmVtb3ZlQ291bnQpO1xuICAgICAgdGhpcy5tYXNrID0gdGhpcy5tYXNrLnNsaWNlKHJlbW92ZUNvdW50KTtcbiAgICB9XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgc3VwZXIucmVzZXQoKTtcbiAgICB0aGlzLl90cmltRW1wdHlUYWlsKCk7XG4gIH1cbiAgcmVtb3ZlKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgY29uc3QgcmVtb3ZlRGV0YWlscyA9IHN1cGVyLnJlbW92ZShmcm9tUG9zLCB0b1Bvcyk7XG4gICAgdGhpcy5fdHJpbUVtcHR5VGFpbChmcm9tUG9zLCB0b1Bvcyk7XG4gICAgcmV0dXJuIHJlbW92ZURldGFpbHM7XG4gIH1cbiAgdG90YWxJbnB1dFBvc2l0aW9ucyhmcm9tUG9zLCB0b1Bvcykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT0gbnVsbCAmJiB0aGlzLnJlcGVhdFRvID09PSBJbmZpbml0eSkgcmV0dXJuIEluZmluaXR5O1xuICAgIHJldHVybiBzdXBlci50b3RhbElucHV0UG9zaXRpb25zKGZyb21Qb3MsIHRvUG9zKTtcbiAgfVxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHN1cGVyLnN0YXRlO1xuICB9XG4gIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuX2Jsb2Nrcy5sZW5ndGggPSBzdGF0ZS5fYmxvY2tzLmxlbmd0aDtcbiAgICB0aGlzLm1hc2sgPSB0aGlzLm1hc2suc2xpY2UoMCwgdGhpcy5fYmxvY2tzLmxlbmd0aCk7XG4gICAgc3VwZXIuc3RhdGUgPSBzdGF0ZTtcbiAgfVxufVxuSU1hc2suUmVwZWF0QmxvY2sgPSBSZXBlYXRCbG9jaztcblxuZXhwb3J0IHsgUmVwZWF0QmxvY2sgYXMgZGVmYXVsdCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9