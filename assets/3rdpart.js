(self["webpackChunktodo_list"] = self["webpackChunktodo_list"] || []).push([["3rdpart"],{

/***/ 5840:
/*!**************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/options */ 5008);
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./l10n/default */ 2853);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ 5714);
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/dom */ 9682);
/* harmony import */ var _utils_dates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dates */ 6947);
/* harmony import */ var _utils_formatting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/formatting */ 7703);
/* harmony import */ var _utils_polyfills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/polyfills */ 5990);
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

/***/ 2853:
/*!*********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/l10n/default.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 5008:
/*!**********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/types/options.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 6947:
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dates.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _formatting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formatting */ 7703);
/* harmony import */ var _types_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/options */ 5008);
/* harmony import */ var _l10n_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../l10n/default */ 2853);



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

/***/ 9682:
/*!******************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/dom.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 7703:
/*!*************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/formatting.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formats: () => (/* binding */ formats),
/* harmony export */   monthToStr: () => (/* binding */ monthToStr),
/* harmony export */   revFormat: () => (/* binding */ revFormat),
/* harmony export */   tokenRegex: () => (/* binding */ tokenRegex)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ 5714);

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

/***/ 5714:
/*!********************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 5990:
/*!************************************************************!*\
  !*** ./node_modules/flatpickr/dist/esm/utils/polyfills.js ***!
  \************************************************************/
/***/ (() => {

"use strict";

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

/***/ 450:
/*!************************************************!*\
  !*** ./node_modules/flatpickr/dist/l10n/pt.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
   true ? factory(exports) :
  0;
}(this, (function (exports) { 'use strict';

  var fp = typeof window !== "undefined" && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {},
      };
  var Portuguese = {
      weekdays: {
          shorthand: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          longhand: [
              "Domingo",
              "Segunda-feira",
              "Terça-feira",
              "Quarta-feira",
              "Quinta-feira",
              "Sexta-feira",
              "Sábado",
          ],
      },
      months: {
          shorthand: [
              "Jan",
              "Fev",
              "Mar",
              "Abr",
              "Mai",
              "Jun",
              "Jul",
              "Ago",
              "Set",
              "Out",
              "Nov",
              "Dez",
          ],
          longhand: [
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
          ],
      },
      rangeSeparator: " até ",
      time_24hr: true,
  };
  fp.l10ns.pt = Portuguese;
  var pt = fp.l10ns;

  exports.Portuguese = Portuguese;
  exports.default = pt;

  Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ 622:
/*!********************************************************!*\
  !*** ./node_modules/date-fns/_lib/addLeadingZeros.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addLeadingZeros: () => (/* binding */ addLeadingZeros)
/* harmony export */ });
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}


/***/ }),

/***/ 2695:
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ 6465:
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/formatters.mjs ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatters: () => (/* binding */ formatters)
/* harmony export */ });
/* harmony import */ var _getDayOfYear_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../getDayOfYear.mjs */ 3875);
/* harmony import */ var _getISOWeek_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../getISOWeek.mjs */ 6514);
/* harmony import */ var _getISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../getISOWeekYear.mjs */ 5961);
/* harmony import */ var _getWeek_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../getWeek.mjs */ 175);
/* harmony import */ var _getWeekYear_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../getWeekYear.mjs */ 9220);
/* harmony import */ var _addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addLeadingZeros.mjs */ 622);
/* harmony import */ var _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lightFormatters.mjs */ 9021);








const dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = (0,_getWeekYear_mjs__WEBPACK_IMPORTED_MODULE_1__.getWeekYear)(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = (0,_getISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_3__.getISOWeekYear)(date);

    // Padding
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = (0,_getWeek_mjs__WEBPACK_IMPORTED_MODULE_4__.getWeek)(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = (0,_getISOWeek_mjs__WEBPACK_IMPORTED_MODULE_5__.getISOWeek)(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = (0,_getDayOfYear_mjs__WEBPACK_IMPORTED_MODULE_6__.getDayOfYear)(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return _lightFormatters_mjs__WEBPACK_IMPORTED_MODULE_0__.lightFormatters.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1000);
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    const timestamp = date.getTime();
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(timestamp, token.length);
  },
};

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(Math.trunc(absOffset / 60), 2);
  const minutes = (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_2__.addLeadingZeros)(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}


/***/ }),

/***/ 9021:
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/lightFormatters.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lightFormatters: () => (/* binding */ lightFormatters)
/* harmony export */ });
/* harmony import */ var _addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../addLeadingZeros.mjs */ 622);


/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(token === "yy" ? year % 100 : year, token.length);
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getHours() % 12 || 12, token.length);
  },

  // Hour [0-23]
  H(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return (0,_addLeadingZeros_mjs__WEBPACK_IMPORTED_MODULE_0__.addLeadingZeros)(fractionalSeconds, token.length);
  },
};


/***/ }),

/***/ 6847:
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/_lib/format/longFormatters.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   longFormatters: () => (/* binding */ longFormatters)
/* harmony export */ });
const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
};


/***/ }),

/***/ 215:
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTimezoneOffsetInMilliseconds: () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toDate.mjs */ 2642);


/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}


/***/ }),

/***/ 6992:
/*!********************************************************!*\
  !*** ./node_modules/date-fns/_lib/protectedTokens.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isProtectedDayOfYearToken: () => (/* binding */ isProtectedDayOfYearToken),
/* harmony export */   isProtectedWeekYearToken: () => (/* binding */ isProtectedWeekYearToken),
/* harmony export */   warnOrThrowProtectedError: () => (/* binding */ warnOrThrowProtectedError)
/* harmony export */ });
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}


/***/ }),

/***/ 2940:
/*!*********************************************!*\
  !*** ./node_modules/date-fns/constants.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   daysInWeek: () => (/* binding */ daysInWeek),
/* harmony export */   daysInYear: () => (/* binding */ daysInYear),
/* harmony export */   maxTime: () => (/* binding */ maxTime),
/* harmony export */   millisecondsInDay: () => (/* binding */ millisecondsInDay),
/* harmony export */   millisecondsInHour: () => (/* binding */ millisecondsInHour),
/* harmony export */   millisecondsInMinute: () => (/* binding */ millisecondsInMinute),
/* harmony export */   millisecondsInSecond: () => (/* binding */ millisecondsInSecond),
/* harmony export */   millisecondsInWeek: () => (/* binding */ millisecondsInWeek),
/* harmony export */   minTime: () => (/* binding */ minTime),
/* harmony export */   minutesInDay: () => (/* binding */ minutesInDay),
/* harmony export */   minutesInHour: () => (/* binding */ minutesInHour),
/* harmony export */   minutesInMonth: () => (/* binding */ minutesInMonth),
/* harmony export */   minutesInYear: () => (/* binding */ minutesInYear),
/* harmony export */   monthsInQuarter: () => (/* binding */ monthsInQuarter),
/* harmony export */   monthsInYear: () => (/* binding */ monthsInYear),
/* harmony export */   quartersInYear: () => (/* binding */ quartersInYear),
/* harmony export */   secondsInDay: () => (/* binding */ secondsInDay),
/* harmony export */   secondsInHour: () => (/* binding */ secondsInHour),
/* harmony export */   secondsInMinute: () => (/* binding */ secondsInMinute),
/* harmony export */   secondsInMonth: () => (/* binding */ secondsInMonth),
/* harmony export */   secondsInQuarter: () => (/* binding */ secondsInQuarter),
/* harmony export */   secondsInWeek: () => (/* binding */ secondsInWeek),
/* harmony export */   secondsInYear: () => (/* binding */ secondsInYear)
/* harmony export */ });
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occures every 4 years, except for years that are divisable by 100 and not divisable by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;


/***/ }),

/***/ 3459:
/*!*************************************************!*\
  !*** ./node_modules/date-fns/constructFrom.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   constructFrom: () => (/* binding */ constructFrom),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from 'date-fns'
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use contrustor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   )
 * }
 */
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constructFrom);


/***/ }),

/***/ 514:
/*!************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarDays.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   differenceInCalendarDays: () => (/* binding */ differenceInCalendarDays)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.mjs */ 2940);
/* harmony import */ var _startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfDay.mjs */ 1730);
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/getTimezoneOffsetInMilliseconds.mjs */ 215);




/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateLeft);
  const startOfDayRight = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateRight);

  const timestampLeft =
    +startOfDayLeft - (0,_lib_getTimezoneOffsetInMilliseconds_mjs__WEBPACK_IMPORTED_MODULE_1__.getTimezoneOffsetInMilliseconds)(startOfDayLeft);
  const timestampRight =
    +startOfDayRight - (0,_lib_getTimezoneOffsetInMilliseconds_mjs__WEBPACK_IMPORTED_MODULE_1__.getTimezoneOffsetInMilliseconds)(startOfDayRight);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((timestampLeft - timestampRight) / _constants_mjs__WEBPACK_IMPORTED_MODULE_2__.millisecondsInDay);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (differenceInCalendarDays);


/***/ }),

/***/ 876:
/*!******************************************!*\
  !*** ./node_modules/date-fns/format.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   format: () => (/* binding */ format),
/* harmony export */   formatDate: () => (/* binding */ format),
/* harmony export */   formatters: () => (/* reexport safe */ _lib_format_formatters_mjs__WEBPACK_IMPORTED_MODULE_0__.formatters),
/* harmony export */   longFormatters: () => (/* reexport safe */ _lib_format_longFormatters_mjs__WEBPACK_IMPORTED_MODULE_1__.longFormatters)
/* harmony export */ });
/* harmony import */ var _lib_defaultLocale_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/defaultLocale.mjs */ 7348);
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ 2695);
/* harmony import */ var _lib_format_formatters_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/format/formatters.mjs */ 6465);
/* harmony import */ var _lib_format_longFormatters_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/format/longFormatters.mjs */ 6847);
/* harmony import */ var _lib_protectedTokens_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_lib/protectedTokens.mjs */ 6992);
/* harmony import */ var _isValid_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isValid.mjs */ 1649);
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toDate.mjs */ 2642);








// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874


// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;



/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_2__.getDefaultOptions)();
  const locale = options?.locale ?? defaultOptions.locale ?? _lib_defaultLocale_mjs__WEBPACK_IMPORTED_MODULE_3__.enUS;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_4__.toDate)(date);

  if (!(0,_isValid_mjs__WEBPACK_IMPORTED_MODULE_5__.isValid)(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = _lib_format_longFormatters_mjs__WEBPACK_IMPORTED_MODULE_1__.longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }

      if (_lib_format_formatters_mjs__WEBPACK_IMPORTED_MODULE_0__.formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          (0,_lib_protectedTokens_mjs__WEBPACK_IMPORTED_MODULE_6__.isProtectedWeekYearToken)(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          (0,_lib_protectedTokens_mjs__WEBPACK_IMPORTED_MODULE_6__.isProtectedDayOfYearToken)(token))
      ) {
        (0,_lib_protectedTokens_mjs__WEBPACK_IMPORTED_MODULE_6__.warnOrThrowProtectedError)(token, formatStr, String(date));
      }

      const formatter = _lib_format_formatters_mjs__WEBPACK_IMPORTED_MODULE_0__.formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp, "'");
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (format);


/***/ }),

/***/ 3875:
/*!************************************************!*\
  !*** ./node_modules/date-fns/getDayOfYear.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getDayOfYear: () => (/* binding */ getDayOfYear)
/* harmony export */ });
/* harmony import */ var _differenceInCalendarDays_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./differenceInCalendarDays.mjs */ 514);
/* harmony import */ var _startOfYear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfYear.mjs */ 6823);
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ 2642);




/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const diff = (0,_differenceInCalendarDays_mjs__WEBPACK_IMPORTED_MODULE_1__.differenceInCalendarDays)(_date, (0,_startOfYear_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfYear)(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDayOfYear);


/***/ }),

/***/ 6514:
/*!**********************************************!*\
  !*** ./node_modules/date-fns/getISOWeek.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getISOWeek: () => (/* binding */ getISOWeek)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.mjs */ 2940);
/* harmony import */ var _startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./startOfISOWeek.mjs */ 3787);
/* harmony import */ var _startOfISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfISOWeekYear.mjs */ 7848);
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ 2642);





/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const diff = +(0,_startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_1__.startOfISOWeek)(_date) - +(0,_startOfISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfISOWeekYear)(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.millisecondsInWeek) + 1;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getISOWeek);


/***/ }),

/***/ 5961:
/*!**************************************************!*\
  !*** ./node_modules/date-fns/getISOWeekYear.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getISOWeekYear: () => (/* binding */ getISOWeekYear)
/* harmony export */ });
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.mjs */ 3459);
/* harmony import */ var _startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfISOWeek.mjs */ 3787);
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ 2642);




/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0,_startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfISOWeek)(fourthOfJanuaryOfNextYear);

  const fourthOfJanuaryOfThisYear = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0,_startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfISOWeek)(fourthOfJanuaryOfThisYear);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getISOWeekYear);


/***/ }),

/***/ 175:
/*!*******************************************!*\
  !*** ./node_modules/date-fns/getWeek.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getWeek: () => (/* binding */ getWeek)
/* harmony export */ });
/* harmony import */ var _constants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.mjs */ 2940);
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./startOfWeek.mjs */ 2528);
/* harmony import */ var _startOfWeekYear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfWeekYear.mjs */ 5563);
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ 2642);





/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */

function getWeek(date, options) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const diff = +(0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_1__.startOfWeek)(_date, options) - +(0,_startOfWeekYear_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfWeekYear)(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / _constants_mjs__WEBPACK_IMPORTED_MODULE_3__.millisecondsInWeek) + 1;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWeek);


/***/ }),

/***/ 9220:
/*!***********************************************!*\
  !*** ./node_modules/date-fns/getWeekYear.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getWeekYear: () => (/* binding */ getWeekYear)
/* harmony export */ });
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constructFrom.mjs */ 3459);
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./startOfWeek.mjs */ 2528);
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ 2642);
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ 2695);





/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const year = _date.getFullYear();

  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__.constructFrom)(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__.startOfWeek)(firstWeekOfNextYear, options);

  const firstWeekOfThisYear = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__.constructFrom)(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__.startOfWeek)(firstWeekOfThisYear, options);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getWeekYear);


/***/ }),

/***/ 2833:
/*!******************************************!*\
  !*** ./node_modules/date-fns/isDate.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isDate: () => (/* binding */ isDate)
/* harmony export */ });
/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isDate);


/***/ }),

/***/ 1649:
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isValid.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isValid: () => (/* binding */ isValid)
/* harmony export */ });
/* harmony import */ var _isDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isDate.mjs */ 2833);
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ 2642);



/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  if (!(0,_isDate_mjs__WEBPACK_IMPORTED_MODULE_0__.isDate)(date) && typeof date !== "number") {
    return false;
  }
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  return !isNaN(Number(_date));
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isValid);


/***/ }),

/***/ 7404:
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildFormatLongFn: () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}


/***/ }),

/***/ 9574:
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildLocalizeFn: () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
/* eslint-disable no-unused-vars */

/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}


/***/ }),

/***/ 8094:
/*!************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchFn.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMatchFn: () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}


/***/ }),

/***/ 1296:
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildMatchPatternFn: () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}


/***/ }),

/***/ 7348:
/*!************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   enUS: () => (/* binding */ enUS)
/* harmony export */ });
/* harmony import */ var _en_US_lib_formatDistance_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en-US/_lib/formatDistance.mjs */ 1582);
/* harmony import */ var _en_US_lib_formatLong_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./en-US/_lib/formatLong.mjs */ 6229);
/* harmony import */ var _en_US_lib_formatRelative_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./en-US/_lib/formatRelative.mjs */ 3475);
/* harmony import */ var _en_US_lib_localize_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./en-US/_lib/localize.mjs */ 9523);
/* harmony import */ var _en_US_lib_match_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./en-US/_lib/match.mjs */ 5577);






/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: _en_US_lib_formatDistance_mjs__WEBPACK_IMPORTED_MODULE_0__.formatDistance,
  formatLong: _en_US_lib_formatLong_mjs__WEBPACK_IMPORTED_MODULE_1__.formatLong,
  formatRelative: _en_US_lib_formatRelative_mjs__WEBPACK_IMPORTED_MODULE_2__.formatRelative,
  localize: _en_US_lib_localize_mjs__WEBPACK_IMPORTED_MODULE_3__.localize,
  match: _en_US_lib_match_mjs__WEBPACK_IMPORTED_MODULE_4__.match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enUS);


/***/ }),

/***/ 1582:
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDistance: () => (/* binding */ formatDistance)
/* harmony export */ });
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};


/***/ }),

/***/ 6229:
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatLong.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatLong: () => (/* binding */ formatLong)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildFormatLongFn.mjs */ 7404);


const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = {
  date: (0,_lib_buildFormatLongFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: (0,_lib_buildFormatLongFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: (0,_lib_buildFormatLongFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildFormatLongFn)({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
};


/***/ }),

/***/ 3475:
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatRelative: () => (/* binding */ formatRelative)
/* harmony export */ });
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];


/***/ }),

/***/ 9523:
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/localize.mjs ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   localize: () => (/* binding */ localize)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildLocalizeFn.mjs */ 9574);


const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
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

  wide: [
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
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = {
  ordinalNumber,

  era: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: (0,_lib_buildLocalizeFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildLocalizeFn)({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};


/***/ }),

/***/ 5577:
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/match.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   match: () => (/* binding */ match)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_lib/buildMatchFn.mjs */ 8094);
/* harmony import */ var _lib_buildMatchPatternFn_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_lib/buildMatchPatternFn.mjs */ 1296);



const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_mjs__WEBPACK_IMPORTED_MODULE_0__.buildMatchPatternFn)({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: (0,_lib_buildMatchFn_mjs__WEBPACK_IMPORTED_MODULE_1__.buildMatchFn)({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};


/***/ }),

/***/ 1730:
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfDay: () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ 2642);


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfDay);


/***/ }),

/***/ 3787:
/*!**************************************************!*\
  !*** ./node_modules/date-fns/startOfISOWeek.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfISOWeek: () => (/* binding */ startOfISOWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfWeek.mjs */ 2528);


/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date) {
  return (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfWeek)(date, { weekStartsOn: 1 });
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfISOWeek);


/***/ }),

/***/ 7848:
/*!******************************************************!*\
  !*** ./node_modules/date-fns/startOfISOWeekYear.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfISOWeekYear: () => (/* binding */ startOfISOWeekYear)
/* harmony export */ });
/* harmony import */ var _getISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getISOWeekYear.mjs */ 5961);
/* harmony import */ var _startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./startOfISOWeek.mjs */ 3787);
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.mjs */ 3459);




/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date) {
  const year = (0,_getISOWeekYear_mjs__WEBPACK_IMPORTED_MODULE_0__.getISOWeekYear)(date);
  const fourthOfJanuary = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return (0,_startOfISOWeek_mjs__WEBPACK_IMPORTED_MODULE_2__.startOfISOWeek)(fourthOfJanuary);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfISOWeekYear);


/***/ }),

/***/ 2528:
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeek: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ 2642);
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ 2695);



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeek);


/***/ }),

/***/ 5563:
/*!***************************************************!*\
  !*** ./node_modules/date-fns/startOfWeekYear.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeekYear: () => (/* binding */ startOfWeekYear)
/* harmony export */ });
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constructFrom.mjs */ 3459);
/* harmony import */ var _getWeekYear_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWeekYear.mjs */ 9220);
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./startOfWeek.mjs */ 2528);
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ 2695);





/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = (0,_getWeekYear_mjs__WEBPACK_IMPORTED_MODULE_1__.getWeekYear)(date, options);
  const firstWeek = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_2__.constructFrom)(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_3__.startOfWeek)(firstWeek, options);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeekYear);


/***/ }),

/***/ 6823:
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfYear.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfYear: () => (/* binding */ startOfYear)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ 2642);
/* harmony import */ var _constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructFrom.mjs */ 3459);



/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date) {
  const cleanDate = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  const _date = (0,_constructFrom_mjs__WEBPACK_IMPORTED_MODULE_1__.constructFrom)(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfYear);


/***/ }),

/***/ 2642:
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === "object" && argStr === "[object Date]")
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (
    typeof argument === "number" ||
    argStr === "[object Number]" ||
    typeof argument === "string" ||
    argStr === "[object String]"
  ) {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);


/***/ }),

/***/ 7367:
/*!******************************************************************************!*\
  !*** ./node_modules/imask/esm/controls/html-contenteditable-mask-element.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLContenteditableMaskElement)
/* harmony export */ });
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-mask-element.js */ 8911);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mask-element.js */ 3529);




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

/***/ 3560:
/*!********************************************************************!*\
  !*** ./node_modules/imask/esm/controls/html-input-mask-element.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLInputMaskElement)
/* harmony export */ });
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-mask-element.js */ 8911);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mask-element.js */ 3529);




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

/***/ 8911:
/*!**************************************************************!*\
  !*** ./node_modules/imask/esm/controls/html-mask-element.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLMaskElement)
/* harmony export */ });
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask-element.js */ 3529);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);



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

/***/ 5571:
/*!**********************************************************!*\
  !*** ./node_modules/imask/esm/controls/input-history.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 1866:
/*!**************************************************!*\
  !*** ./node_modules/imask/esm/controls/input.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputMask)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _core_action_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/action-details.js */ 4234);
/* harmony import */ var _masked_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../masked/factory.js */ 7471);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mask-element.js */ 3529);
/* harmony import */ var _html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./html-input-mask-element.js */ 3560);
/* harmony import */ var _html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./html-contenteditable-mask-element.js */ 7367);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _input_history_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./input-history.js */ 5571);
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html-mask-element.js */ 8911);










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

/***/ 3529:
/*!*********************************************************!*\
  !*** ./node_modules/imask/esm/controls/mask-element.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskElement)
/* harmony export */ });
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/holder.js */ 5885);


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

/***/ 4234:
/*!*******************************************************!*\
  !*** ./node_modules/imask/esm/core/action-details.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ActionDetails)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ 5938);


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

/***/ 4472:
/*!*******************************************************!*\
  !*** ./node_modules/imask/esm/core/change-details.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChangeDetails)
/* harmony export */ });
/* harmony import */ var _holder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./holder.js */ 5885);


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

/***/ 6476:
/*!****************************************************************!*\
  !*** ./node_modules/imask/esm/core/continuous-tail-details.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 5885:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/core/holder.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 5938:
/*!**********************************************!*\
  !*** ./node_modules/imask/esm/core/utils.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 3303:
/*!*****************************************!*\
  !*** ./node_modules/imask/esm/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _controls_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controls/input.js */ 1866);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/holder.js */ 5885);
/* harmony import */ var _controls_html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls/html-contenteditable-mask-element.js */ 7367);
/* harmony import */ var _controls_html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controls/html-input-mask-element.js */ 3560);
/* harmony import */ var _controls_html_mask_element_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls/html-mask-element.js */ 8911);
/* harmony import */ var _controls_mask_element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls/mask-element.js */ 3529);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/change-details.js */ 4472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/utils.js */ 5938);
/* harmony import */ var _masked_base_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./masked/base.js */ 7168);
/* harmony import */ var _masked_date_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./masked/date.js */ 773);
/* harmony import */ var _masked_dynamic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./masked/dynamic.js */ 1536);
/* harmony import */ var _masked_enum_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./masked/enum.js */ 9180);
/* harmony import */ var _masked_factory_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./masked/factory.js */ 7471);
/* harmony import */ var _masked_function_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./masked/function.js */ 2357);
/* harmony import */ var _masked_number_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./masked/number.js */ 7024);
/* harmony import */ var _masked_pattern_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./masked/pattern.js */ 1867);
/* harmony import */ var _masked_pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./masked/pattern/chunk-tail-details.js */ 2403);
/* harmony import */ var _masked_pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./masked/pattern/fixed-definition.js */ 7370);
/* harmony import */ var _masked_pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./masked/pattern/input-definition.js */ 1260);
/* harmony import */ var _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./masked/pipe.js */ 5509);
/* harmony import */ var _masked_range_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./masked/range.js */ 9600);
/* harmony import */ var _masked_regexp_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./masked/regexp.js */ 2136);
/* harmony import */ var _masked_repeat_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./masked/repeat.js */ 7474);
/* harmony import */ var _core_action_details_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./core/action-details.js */ 4234);
/* harmony import */ var _controls_input_history_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./controls/input-history.js */ 5571);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./core/continuous-tail-details.js */ 6476);
/* harmony import */ var _masked_pattern_cursor_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./masked/pattern/cursor.js */ 976);




























try {
  globalThis.IMask = _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"];
} catch {}




/***/ }),

/***/ 7168:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/masked/base.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Masked)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/holder.js */ 5885);





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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedDate)
/* harmony export */ });
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern.js */ 1867);
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range.js */ 9600);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./factory.js */ 7471);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 2403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 7370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pattern/input-definition.js */ 1260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./regexp.js */ 2136);














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

/***/ 1536:
/*!**************************************************!*\
  !*** ./node_modules/imask/esm/masked/dynamic.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedDynamic)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factory.js */ 7471);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);







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

/***/ 9180:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/masked/enum.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedEnum)
/* harmony export */ });
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pattern.js */ 1867);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factory.js */ 7471);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 2403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 7370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern/input-definition.js */ 1260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./regexp.js */ 2136);













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

/***/ 7471:
/*!**************************************************!*\
  !*** ./node_modules/imask/esm/masked/factory.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMask),
/* harmony export */   maskedClass: () => (/* binding */ maskedClass),
/* harmony export */   normalizeOpts: () => (/* binding */ normalizeOpts)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);



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

/***/ 2357:
/*!***************************************************!*\
  !*** ./node_modules/imask/esm/masked/function.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedFunction)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils.js */ 5938);






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

/***/ 7024:
/*!*************************************************!*\
  !*** ./node_modules/imask/esm/masked/number.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedNumber)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);






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

/***/ 1867:
/*!**************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedPattern)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factory.js */ 7471);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 2403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 7370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/input-definition.js */ 1260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./regexp.js */ 2136);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);












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

/***/ 2403:
/*!*********************************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern/chunk-tail-details.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChunksTailDetails)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/change-details.js */ 4472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils.js */ 5938);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/holder.js */ 5885);





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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternCursor)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils.js */ 5938);


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

/***/ 7370:
/*!*******************************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern/fixed-definition.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternFixedDefinition)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/change-details.js */ 4472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils.js */ 5938);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/holder.js */ 5885);





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

/***/ 1260:
/*!*******************************************************************!*\
  !*** ./node_modules/imask/esm/masked/pattern/input-definition.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternInputDefinition)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factory.js */ 7471);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/change-details.js */ 4472);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils.js */ 5938);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/holder.js */ 5885);





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

/***/ 5509:
/*!***********************************************!*\
  !*** ./node_modules/imask/esm/masked/pipe.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PIPE_TYPE: () => (/* binding */ PIPE_TYPE),
/* harmony export */   createPipe: () => (/* binding */ createPipe),
/* harmony export */   pipe: () => (/* binding */ pipe)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory.js */ 7471);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ 5938);




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

/***/ 9600:
/*!************************************************!*\
  !*** ./node_modules/imask/esm/masked/range.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedRange)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pattern.js */ 1867);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factory.js */ 7471);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 2403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 7370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern/input-definition.js */ 1260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./regexp.js */ 2136);













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

/***/ 2136:
/*!*************************************************!*\
  !*** ./node_modules/imask/esm/masked/regexp.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedRegExp)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils.js */ 5938);






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

/***/ 7474:
/*!*************************************************!*\
  !*** ./node_modules/imask/esm/masked/repeat.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RepeatBlock)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/change-details.js */ 4472);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/holder.js */ 5885);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factory.js */ 7471);
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pattern.js */ 1867);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils.js */ 5938);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base.js */ 7168);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/continuous-tail-details.js */ 6476);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pattern/chunk-tail-details.js */ 2403);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pattern/cursor.js */ 976);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern/fixed-definition.js */ 7370);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pattern/input-definition.js */ 1260);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./regexp.js */ 2136);













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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHFFQUFlO0FBQzlCO0FBQ0E7QUFDQSx3REFBd0QsYUFBYTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUVBQWU7QUFDOUI7QUFDQTtBQUNBLHNEQUFzRCxhQUFhO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBLGlFQUFlLHdCQUF3QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRGlCO0FBQ0s7QUFDSjtBQUNRO0FBSzlCO0FBQ0k7QUFDRjs7QUFFdEM7QUFDQTtBQUNzQzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFZ0M7O0FBRWhDO0FBQ0EsUUFBUSxjQUFjO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixhQUFhLDhEQUFjO0FBQzNCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxjQUFjO0FBQzdCLGFBQWEsY0FBYztBQUMzQjtBQUNBLEtBQUssZ0RBQU07QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUdBQXlHLHFEQUFTO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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RXZJO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1REFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtEQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLGtJQUFrSTtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQywrQkFBK0I7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFLOztBQUU2QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9mbGF0cGlja3IvZGlzdC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ZsYXRwaWNrci9kaXN0L2VzbS9sMTBuL2RlZmF1bHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ZsYXRwaWNrci9kaXN0L2VzbS90eXBlcy9vcHRpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9mbGF0cGlja3IvZGlzdC9lc20vdXRpbHMvZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ZsYXRwaWNrci9kaXN0L2VzbS91dGlscy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ZsYXRwaWNrci9kaXN0L2VzbS91dGlscy9mb3JtYXR0aW5nLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9mbGF0cGlja3IvZGlzdC9lc20vdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ZsYXRwaWNrci9kaXN0L2VzbS91dGlscy9wb2x5ZmlsbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ZsYXRwaWNrci9kaXN0L2wxMG4vcHQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvYWRkTGVhZGluZ1plcm9zLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9kZWZhdWx0T3B0aW9ucy5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZm9ybWF0L2Zvcm1hdHRlcnMubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2Zvcm1hdC9saWdodEZvcm1hdHRlcnMubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL19saWIvcHJvdGVjdGVkVG9rZW5zLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RhbnRzLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvY29uc3RydWN0RnJvbS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2RpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cy5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2Zvcm1hdC5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldERheU9mWWVhci5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldElTT1dlZWsubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRJU09XZWVrWWVhci5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2dldFdlZWsubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9nZXRXZWVrWWVhci5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzRGF0ZS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzVmFsaWQubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvX2xpYi9idWlsZEZvcm1hdExvbmdGbi5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTG9jYWxpemVGbi5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hGbi5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4ubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdExvbmcubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2xvY2FsZS9lbi1VUy9fbGliL2xvY2FsaXplLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvbG9jYWxlL2VuLVVTL19saWIvbWF0Y2gubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mRGF5Lm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvc3RhcnRPZklTT1dlZWsubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mSVNPV2Vla1llYXIubWpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mV2Vlay5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZXZWVrWWVhci5tanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZZZWFyLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvdG9EYXRlLm1qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2NvbnRyb2xzL2h0bWwtY29udGVudGVkaXRhYmxlLW1hc2stZWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2NvbnRyb2xzL2h0bWwtaW5wdXQtbWFzay1lbGVtZW50LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vY29udHJvbHMvaHRtbC1tYXNrLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9jb250cm9scy9pbnB1dC1oaXN0b3J5LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vY29udHJvbHMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9jb250cm9scy9tYXNrLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9jb3JlL2FjdGlvbi1kZXRhaWxzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vY29yZS9jaGFuZ2UtZGV0YWlscy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2NvcmUvY29udGludW91cy10YWlsLWRldGFpbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9jb3JlL2hvbGRlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL2NvcmUvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9iYXNlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvZHluYW1pYy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9lbnVtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvbnVtYmVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL3BhdHRlcm4uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvcGF0dGVybi9jaHVuay10YWlsLWRldGFpbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvcGF0dGVybi9jdXJzb3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2ltYXNrL2VzbS9tYXNrZWQvcGF0dGVybi9maXhlZC1kZWZpbml0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL3BhdHRlcm4vaW5wdXQtZGVmaW5pdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9waXBlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL3JhbmdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9pbWFzay9lc20vbWFza2VkL3JlZ2V4cC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvaW1hc2svZXNtL21hc2tlZC9yZXBlYXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgICAgcltrXSA9IGFbal07XG4gICAgcmV0dXJuIHI7XG59O1xuaW1wb3J0IHsgZGVmYXVsdHMgYXMgZGVmYXVsdE9wdGlvbnMsIEhPT0tTLCB9IGZyb20gXCIuL3R5cGVzL29wdGlvbnNcIjtcbmltcG9ydCBFbmdsaXNoIGZyb20gXCIuL2wxMG4vZGVmYXVsdFwiO1xuaW1wb3J0IHsgYXJyYXlpZnksIGRlYm91bmNlLCBpbnQsIHBhZCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBjbGVhck5vZGUsIGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZU51bWJlcklucHV0LCBmaW5kUGFyZW50LCB0b2dnbGVDbGFzcywgZ2V0RXZlbnRUYXJnZXQsIH0gZnJvbSBcIi4vdXRpbHMvZG9tXCI7XG5pbXBvcnQgeyBjb21wYXJlRGF0ZXMsIGNyZWF0ZURhdGVQYXJzZXIsIGNyZWF0ZURhdGVGb3JtYXR0ZXIsIGR1cmF0aW9uLCBpc0JldHdlZW4sIGdldERlZmF1bHRIb3VycywgY2FsY3VsYXRlU2Vjb25kc1NpbmNlTWlkbmlnaHQsIHBhcnNlU2Vjb25kcywgfSBmcm9tIFwiLi91dGlscy9kYXRlc1wiO1xuaW1wb3J0IHsgdG9rZW5SZWdleCwgbW9udGhUb1N0ciB9IGZyb20gXCIuL3V0aWxzL2Zvcm1hdHRpbmdcIjtcbmltcG9ydCBcIi4vdXRpbHMvcG9seWZpbGxzXCI7XG52YXIgREVCT1VOQ0VEX0NIQU5HRV9NUyA9IDMwMDtcbmZ1bmN0aW9uIEZsYXRwaWNrckluc3RhbmNlKGVsZW1lbnQsIGluc3RhbmNlQ29uZmlnKSB7XG4gICAgdmFyIHNlbGYgPSB7XG4gICAgICAgIGNvbmZpZzogX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zKSwgZmxhdHBpY2tyLmRlZmF1bHRDb25maWcpLFxuICAgICAgICBsMTBuOiBFbmdsaXNoLFxuICAgIH07XG4gICAgc2VsZi5wYXJzZURhdGUgPSBjcmVhdGVEYXRlUGFyc2VyKHsgY29uZmlnOiBzZWxmLmNvbmZpZywgbDEwbjogc2VsZi5sMTBuIH0pO1xuICAgIHNlbGYuX2hhbmRsZXJzID0gW107XG4gICAgc2VsZi5wbHVnaW5FbGVtZW50cyA9IFtdO1xuICAgIHNlbGYubG9hZGVkUGx1Z2lucyA9IFtdO1xuICAgIHNlbGYuX2JpbmQgPSBiaW5kO1xuICAgIHNlbGYuX3NldEhvdXJzRnJvbURhdGUgPSBzZXRIb3Vyc0Zyb21EYXRlO1xuICAgIHNlbGYuX3Bvc2l0aW9uQ2FsZW5kYXIgPSBwb3NpdGlvbkNhbGVuZGFyO1xuICAgIHNlbGYuY2hhbmdlTW9udGggPSBjaGFuZ2VNb250aDtcbiAgICBzZWxmLmNoYW5nZVllYXIgPSBjaGFuZ2VZZWFyO1xuICAgIHNlbGYuY2xlYXIgPSBjbGVhcjtcbiAgICBzZWxmLmNsb3NlID0gY2xvc2U7XG4gICAgc2VsZi5vbk1vdXNlT3ZlciA9IG9uTW91c2VPdmVyO1xuICAgIHNlbGYuX2NyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50O1xuICAgIHNlbGYuY3JlYXRlRGF5ID0gY3JlYXRlRGF5O1xuICAgIHNlbGYuZGVzdHJveSA9IGRlc3Ryb3k7XG4gICAgc2VsZi5pc0VuYWJsZWQgPSBpc0VuYWJsZWQ7XG4gICAgc2VsZi5qdW1wVG9EYXRlID0ganVtcFRvRGF0ZTtcbiAgICBzZWxmLnVwZGF0ZVZhbHVlID0gdXBkYXRlVmFsdWU7XG4gICAgc2VsZi5vcGVuID0gb3BlbjtcbiAgICBzZWxmLnJlZHJhdyA9IHJlZHJhdztcbiAgICBzZWxmLnNldCA9IHNldDtcbiAgICBzZWxmLnNldERhdGUgPSBzZXREYXRlO1xuICAgIHNlbGYudG9nZ2xlID0gdG9nZ2xlO1xuICAgIGZ1bmN0aW9uIHNldHVwSGVscGVyRnVuY3Rpb25zKCkge1xuICAgICAgICBzZWxmLnV0aWxzID0ge1xuICAgICAgICAgICAgZ2V0RGF5c0luTW9udGg6IGZ1bmN0aW9uIChtb250aCwgeXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9udGggPT09IHZvaWQgMCkgeyBtb250aCA9IHNlbGYuY3VycmVudE1vbnRoOyB9XG4gICAgICAgICAgICAgICAgaWYgKHlyID09PSB2b2lkIDApIHsgeXIgPSBzZWxmLmN1cnJlbnRZZWFyOyB9XG4gICAgICAgICAgICAgICAgaWYgKG1vbnRoID09PSAxICYmICgoeXIgJSA0ID09PSAwICYmIHlyICUgMTAwICE9PSAwKSB8fCB5ciAlIDQwMCA9PT0gMCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyOTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5sMTBuLmRheXNJbk1vbnRoW21vbnRoXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHNlbGYuZWxlbWVudCA9IHNlbGYuaW5wdXQgPSBlbGVtZW50O1xuICAgICAgICBzZWxmLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICBwYXJzZUNvbmZpZygpO1xuICAgICAgICBzZXR1cExvY2FsZSgpO1xuICAgICAgICBzZXR1cElucHV0cygpO1xuICAgICAgICBzZXR1cERhdGVzKCk7XG4gICAgICAgIHNldHVwSGVscGVyRnVuY3Rpb25zKCk7XG4gICAgICAgIGlmICghc2VsZi5pc01vYmlsZSlcbiAgICAgICAgICAgIGJ1aWxkKCk7XG4gICAgICAgIGJpbmRFdmVudHMoKTtcbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggfHwgc2VsZi5jb25maWcubm9DYWxlbmRhcikge1xuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmVuYWJsZVRpbWUpIHtcbiAgICAgICAgICAgICAgICBzZXRIb3Vyc0Zyb21EYXRlKHNlbGYuY29uZmlnLm5vQ2FsZW5kYXIgPyBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVWYWx1ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0Q2FsZW5kYXJXaWR0aCgpO1xuICAgICAgICB2YXIgaXNTYWZhcmkgPSAvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICBpZiAoIXNlbGYuaXNNb2JpbGUgJiYgaXNTYWZhcmkpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uQ2FsZW5kYXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvblJlYWR5XCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRDbG9zZXN0QWN0aXZlRWxlbWVudCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKCgoX2EgPSBzZWxmLmNhbGVuZGFyQ29udGFpbmVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0Um9vdE5vZGUoKSlcbiAgICAgICAgICAgIC5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBiaW5kVG9JbnN0YW5jZShmbikge1xuICAgICAgICByZXR1cm4gZm4uYmluZChzZWxmKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0Q2FsZW5kYXJXaWR0aCgpIHtcbiAgICAgICAgdmFyIGNvbmZpZyA9IHNlbGYuY29uZmlnO1xuICAgICAgICBpZiAoY29uZmlnLndlZWtOdW1iZXJzID09PSBmYWxzZSAmJiBjb25maWcuc2hvd01vbnRocyA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbmZpZy5ub0NhbGVuZGFyICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jYWxlbmRhckNvbnRhaW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF5c0NvbnRhaW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXlzV2lkdGggPSAoc2VsZi5kYXlzLm9mZnNldFdpZHRoICsgMSkgKiBjb25maWcuc2hvd01vbnRocztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXlzQ29udGFpbmVyLnN0eWxlLndpZHRoID0gZGF5c1dpZHRoICsgXCJweFwiO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLndpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRheXNXaWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGYud2Vla1dyYXBwZXIgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHNlbGYud2Vla1dyYXBwZXIub2Zmc2V0V2lkdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAwKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJweFwiO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwidmlzaWJpbGl0eVwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZShlKSB7XG4gICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdERhdGUgPSBzZWxmLmNvbmZpZy5taW5EYXRlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgICBjb21wYXJlRGF0ZXMobmV3IERhdGUoKSwgc2VsZi5jb25maWcubWluRGF0ZSkgPj0gMFxuICAgICAgICAgICAgICAgID8gbmV3IERhdGUoKVxuICAgICAgICAgICAgICAgIDogbmV3IERhdGUoc2VsZi5jb25maWcubWluRGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRzID0gZ2V0RGVmYXVsdEhvdXJzKHNlbGYuY29uZmlnKTtcbiAgICAgICAgICAgIGRlZmF1bHREYXRlLnNldEhvdXJzKGRlZmF1bHRzLmhvdXJzLCBkZWZhdWx0cy5taW51dGVzLCBkZWZhdWx0cy5zZWNvbmRzLCBkZWZhdWx0RGF0ZS5nZXRNaWxsaXNlY29uZHMoKSk7XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMgPSBbZGVmYXVsdERhdGVdO1xuICAgICAgICAgICAgc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogPSBkZWZhdWx0RGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZSAhPT0gdW5kZWZpbmVkICYmIGUudHlwZSAhPT0gXCJibHVyXCIpIHtcbiAgICAgICAgICAgIHRpbWVXcmFwcGVyKGUpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2VmFsdWUgPSBzZWxmLl9pbnB1dC52YWx1ZTtcbiAgICAgICAgc2V0SG91cnNGcm9tSW5wdXRzKCk7XG4gICAgICAgIHVwZGF0ZVZhbHVlKCk7XG4gICAgICAgIGlmIChzZWxmLl9pbnB1dC52YWx1ZSAhPT0gcHJldlZhbHVlKSB7XG4gICAgICAgICAgICBzZWxmLl9kZWJvdW5jZWRDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBhbXBtMm1pbGl0YXJ5KGhvdXIsIGFtUE0pIHtcbiAgICAgICAgcmV0dXJuIChob3VyICUgMTIpICsgMTIgKiBpbnQoYW1QTSA9PT0gc2VsZi5sMTBuLmFtUE1bMV0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtaWxpdGFyeTJhbXBtKGhvdXIpIHtcbiAgICAgICAgc3dpdGNoIChob3VyICUgMjQpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gaG91ciAlIDEyO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldEhvdXJzRnJvbUlucHV0cygpIHtcbiAgICAgICAgaWYgKHNlbGYuaG91ckVsZW1lbnQgPT09IHVuZGVmaW5lZCB8fCBzZWxmLm1pbnV0ZUVsZW1lbnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGhvdXJzID0gKHBhcnNlSW50KHNlbGYuaG91ckVsZW1lbnQudmFsdWUuc2xpY2UoLTIpLCAxMCkgfHwgMCkgJSAyNCwgbWludXRlcyA9IChwYXJzZUludChzZWxmLm1pbnV0ZUVsZW1lbnQudmFsdWUsIDEwKSB8fCAwKSAlIDYwLCBzZWNvbmRzID0gc2VsZi5zZWNvbmRFbGVtZW50ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gKHBhcnNlSW50KHNlbGYuc2Vjb25kRWxlbWVudC52YWx1ZSwgMTApIHx8IDApICUgNjBcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgaWYgKHNlbGYuYW1QTSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBob3VycyA9IGFtcG0ybWlsaXRhcnkoaG91cnMsIHNlbGYuYW1QTS50ZXh0Q29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbWl0TWluSG91cnMgPSBzZWxmLmNvbmZpZy5taW5UaW1lICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIChzZWxmLmNvbmZpZy5taW5EYXRlICYmXG4gICAgICAgICAgICAgICAgc2VsZi5taW5EYXRlSGFzVGltZSAmJlxuICAgICAgICAgICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqICYmXG4gICAgICAgICAgICAgICAgY29tcGFyZURhdGVzKHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqLCBzZWxmLmNvbmZpZy5taW5EYXRlLCB0cnVlKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgMCk7XG4gICAgICAgIHZhciBsaW1pdE1heEhvdXJzID0gc2VsZi5jb25maWcubWF4VGltZSAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAoc2VsZi5jb25maWcubWF4RGF0ZSAmJlxuICAgICAgICAgICAgICAgIHNlbGYubWF4RGF0ZUhhc1RpbWUgJiZcbiAgICAgICAgICAgICAgICBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiAmJlxuICAgICAgICAgICAgICAgIGNvbXBhcmVEYXRlcyhzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiwgc2VsZi5jb25maWcubWF4RGF0ZSwgdHJ1ZSkgPT09XG4gICAgICAgICAgICAgICAgICAgIDApO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubWF4VGltZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5taW5UaW1lICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1pblRpbWUgPiBzZWxmLmNvbmZpZy5tYXhUaW1lKSB7XG4gICAgICAgICAgICB2YXIgbWluQm91bmQgPSBjYWxjdWxhdGVTZWNvbmRzU2luY2VNaWRuaWdodChzZWxmLmNvbmZpZy5taW5UaW1lLmdldEhvdXJzKCksIHNlbGYuY29uZmlnLm1pblRpbWUuZ2V0TWludXRlcygpLCBzZWxmLmNvbmZpZy5taW5UaW1lLmdldFNlY29uZHMoKSk7XG4gICAgICAgICAgICB2YXIgbWF4Qm91bmQgPSBjYWxjdWxhdGVTZWNvbmRzU2luY2VNaWRuaWdodChzZWxmLmNvbmZpZy5tYXhUaW1lLmdldEhvdXJzKCksIHNlbGYuY29uZmlnLm1heFRpbWUuZ2V0TWludXRlcygpLCBzZWxmLmNvbmZpZy5tYXhUaW1lLmdldFNlY29uZHMoKSk7XG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBjYWxjdWxhdGVTZWNvbmRzU2luY2VNaWRuaWdodChob3VycywgbWludXRlcywgc2Vjb25kcyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPiBtYXhCb3VuZCAmJiBjdXJyZW50VGltZSA8IG1pbkJvdW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHBhcnNlU2Vjb25kcyhtaW5Cb3VuZCk7XG4gICAgICAgICAgICAgICAgaG91cnMgPSByZXN1bHRbMF07XG4gICAgICAgICAgICAgICAgbWludXRlcyA9IHJlc3VsdFsxXTtcbiAgICAgICAgICAgICAgICBzZWNvbmRzID0gcmVzdWx0WzJdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGxpbWl0TWF4SG91cnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF4VGltZSA9IHNlbGYuY29uZmlnLm1heFRpbWUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLm1heFRpbWVcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5tYXhEYXRlO1xuICAgICAgICAgICAgICAgIGhvdXJzID0gTWF0aC5taW4oaG91cnMsIG1heFRpbWUuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXJzID09PSBtYXhUaW1lLmdldEhvdXJzKCkpXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBNYXRoLm1pbihtaW51dGVzLCBtYXhUaW1lLmdldE1pbnV0ZXMoKSk7XG4gICAgICAgICAgICAgICAgaWYgKG1pbnV0ZXMgPT09IG1heFRpbWUuZ2V0TWludXRlcygpKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gTWF0aC5taW4oc2Vjb25kcywgbWF4VGltZS5nZXRTZWNvbmRzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbWl0TWluSG91cnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWluVGltZSA9IHNlbGYuY29uZmlnLm1pblRpbWUgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLm1pblRpbWVcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5taW5EYXRlO1xuICAgICAgICAgICAgICAgIGhvdXJzID0gTWF0aC5tYXgoaG91cnMsIG1pblRpbWUuZ2V0SG91cnMoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGhvdXJzID09PSBtaW5UaW1lLmdldEhvdXJzKCkgJiYgbWludXRlcyA8IG1pblRpbWUuZ2V0TWludXRlcygpKVxuICAgICAgICAgICAgICAgICAgICBtaW51dGVzID0gbWluVGltZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1pbnV0ZXMgPT09IG1pblRpbWUuZ2V0TWludXRlcygpKVxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gTWF0aC5tYXgoc2Vjb25kcywgbWluVGltZS5nZXRTZWNvbmRzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0SG91cnNGcm9tRGF0ZShkYXRlT2JqKSB7XG4gICAgICAgIHZhciBkYXRlID0gZGF0ZU9iaiB8fCBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iajtcbiAgICAgICAgaWYgKGRhdGUgJiYgZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIHNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRIb3Vycyhob3VycywgbWludXRlcywgc2Vjb25kcykge1xuICAgICAgICBpZiAoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmouc2V0SG91cnMoaG91cnMgJSAyNCwgbWludXRlcywgc2Vjb25kcyB8fCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlbGYuaG91ckVsZW1lbnQgfHwgIXNlbGYubWludXRlRWxlbWVudCB8fCBzZWxmLmlzTW9iaWxlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzZWxmLmhvdXJFbGVtZW50LnZhbHVlID0gcGFkKCFzZWxmLmNvbmZpZy50aW1lXzI0aHJcbiAgICAgICAgICAgID8gKCgxMiArIGhvdXJzKSAlIDEyKSArIDEyICogaW50KGhvdXJzICUgMTIgPT09IDApXG4gICAgICAgICAgICA6IGhvdXJzKTtcbiAgICAgICAgc2VsZi5taW51dGVFbGVtZW50LnZhbHVlID0gcGFkKG1pbnV0ZXMpO1xuICAgICAgICBpZiAoc2VsZi5hbVBNICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzZWxmLmFtUE0udGV4dENvbnRlbnQgPSBzZWxmLmwxMG4uYW1QTVtpbnQoaG91cnMgPj0gMTIpXTtcbiAgICAgICAgaWYgKHNlbGYuc2Vjb25kRWxlbWVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2VsZi5zZWNvbmRFbGVtZW50LnZhbHVlID0gcGFkKHNlY29uZHMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblllYXJJbnB1dChldmVudCkge1xuICAgICAgICB2YXIgZXZlbnRUYXJnZXQgPSBnZXRFdmVudFRhcmdldChldmVudCk7XG4gICAgICAgIHZhciB5ZWFyID0gcGFyc2VJbnQoZXZlbnRUYXJnZXQudmFsdWUpICsgKGV2ZW50LmRlbHRhIHx8IDApO1xuICAgICAgICBpZiAoeWVhciAvIDEwMDAgPiAxIHx8XG4gICAgICAgICAgICAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgJiYgIS9bXlxcZF0vLnRlc3QoeWVhci50b1N0cmluZygpKSkpIHtcbiAgICAgICAgICAgIGNoYW5nZVllYXIoeWVhcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYmluZChlbGVtZW50LCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBldmVudC5mb3JFYWNoKGZ1bmN0aW9uIChldikgeyByZXR1cm4gYmluZChlbGVtZW50LCBldiwgaGFuZGxlciwgb3B0aW9ucyk7IH0pO1xuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGJpbmQoZWwsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTsgfSk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIHNlbGYuX2hhbmRsZXJzLnB1c2goe1xuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpOyB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJpZ2dlckNoYW5nZSgpIHtcbiAgICAgICAgdHJpZ2dlckV2ZW50KFwib25DaGFuZ2VcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy53cmFwKSB7XG4gICAgICAgICAgICBbXCJvcGVuXCIsIFwiY2xvc2VcIiwgXCJ0b2dnbGVcIiwgXCJjbGVhclwiXS5mb3JFYWNoKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHNlbGYuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtXCIgKyBldnQgKyBcIl1cIiksIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluZChlbCwgXCJjbGlja1wiLCBzZWxmW2V2dF0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHNldHVwTW9iaWxlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlYm91bmNlZFJlc2l6ZSA9IGRlYm91bmNlKG9uUmVzaXplLCA1MCk7XG4gICAgICAgIHNlbGYuX2RlYm91bmNlZENoYW5nZSA9IGRlYm91bmNlKHRyaWdnZXJDaGFuZ2UsIERFQk9VTkNFRF9DSEFOR0VfTVMpO1xuICAgICAgICBpZiAoc2VsZi5kYXlzQ29udGFpbmVyICYmICEvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpXG4gICAgICAgICAgICBiaW5kKHNlbGYuZGF5c0NvbnRhaW5lciwgXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKVxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3ZlcihnZXRFdmVudFRhcmdldChlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgYmluZChzZWxmLl9pbnB1dCwgXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgICAgIGlmIChzZWxmLmNhbGVuZGFyQ29udGFpbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGJpbmQoc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5pbmxpbmUgJiYgIXNlbGYuY29uZmlnLnN0YXRpYylcbiAgICAgICAgICAgIGJpbmQod2luZG93LCBcInJlc2l6ZVwiLCBkZWJvdW5jZWRSZXNpemUpO1xuICAgICAgICBpZiAod2luZG93Lm9udG91Y2hzdGFydCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgYmluZCh3aW5kb3cuZG9jdW1lbnQsIFwidG91Y2hzdGFydFwiLCBkb2N1bWVudENsaWNrKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYmluZCh3aW5kb3cuZG9jdW1lbnQsIFwibW91c2Vkb3duXCIsIGRvY3VtZW50Q2xpY2spO1xuICAgICAgICBiaW5kKHdpbmRvdy5kb2N1bWVudCwgXCJmb2N1c1wiLCBkb2N1bWVudENsaWNrLCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5jbGlja09wZW5zID09PSB0cnVlKSB7XG4gICAgICAgICAgICBiaW5kKHNlbGYuX2lucHV0LCBcImZvY3VzXCIsIHNlbGYub3Blbik7XG4gICAgICAgICAgICBiaW5kKHNlbGYuX2lucHV0LCBcImNsaWNrXCIsIHNlbGYub3Blbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuZGF5c0NvbnRhaW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBiaW5kKHNlbGYubW9udGhOYXYsIFwiY2xpY2tcIiwgb25Nb250aE5hdkNsaWNrKTtcbiAgICAgICAgICAgIGJpbmQoc2VsZi5tb250aE5hdiwgW1wia2V5dXBcIiwgXCJpbmNyZW1lbnRcIl0sIG9uWWVhcklucHV0KTtcbiAgICAgICAgICAgIGJpbmQoc2VsZi5kYXlzQ29udGFpbmVyLCBcImNsaWNrXCIsIHNlbGVjdERhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLnRpbWVDb250YWluZXIgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgc2VsZi5taW51dGVFbGVtZW50ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHNlbGYuaG91ckVsZW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIHNlbFRleHQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRFdmVudFRhcmdldChlKS5zZWxlY3QoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBiaW5kKHNlbGYudGltZUNvbnRhaW5lciwgW1wiaW5jcmVtZW50XCJdLCB1cGRhdGVUaW1lKTtcbiAgICAgICAgICAgIGJpbmQoc2VsZi50aW1lQ29udGFpbmVyLCBcImJsdXJcIiwgdXBkYXRlVGltZSwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgICAgICAgICAgYmluZChzZWxmLnRpbWVDb250YWluZXIsIFwiY2xpY2tcIiwgdGltZUluY3JlbWVudCk7XG4gICAgICAgICAgICBiaW5kKFtzZWxmLmhvdXJFbGVtZW50LCBzZWxmLm1pbnV0ZUVsZW1lbnRdLCBbXCJmb2N1c1wiLCBcImNsaWNrXCJdLCBzZWxUZXh0KTtcbiAgICAgICAgICAgIGlmIChzZWxmLnNlY29uZEVsZW1lbnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBiaW5kKHNlbGYuc2Vjb25kRWxlbWVudCwgXCJmb2N1c1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLnNlY29uZEVsZW1lbnQgJiYgc2VsZi5zZWNvbmRFbGVtZW50LnNlbGVjdCgpOyB9KTtcbiAgICAgICAgICAgIGlmIChzZWxmLmFtUE0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGJpbmQoc2VsZi5hbVBNLCBcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWUoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmFsbG93SW5wdXQpIHtcbiAgICAgICAgICAgIGJpbmQoc2VsZi5faW5wdXQsIFwiYmx1clwiLCBvbkJsdXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGp1bXBUb0RhdGUoanVtcERhdGUsIHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgdmFyIGp1bXBUbyA9IGp1bXBEYXRlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gc2VsZi5wYXJzZURhdGUoanVtcERhdGUpXG4gICAgICAgICAgICA6IHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqIHx8XG4gICAgICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1pbkRhdGUgJiYgc2VsZi5jb25maWcubWluRGF0ZSA+IHNlbGYubm93XG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcubWluRGF0ZVxuICAgICAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLm1heERhdGUgJiYgc2VsZi5jb25maWcubWF4RGF0ZSA8IHNlbGYubm93XG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLm1heERhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc2VsZi5ub3cpO1xuICAgICAgICB2YXIgb2xkWWVhciA9IHNlbGYuY3VycmVudFllYXI7XG4gICAgICAgIHZhciBvbGRNb250aCA9IHNlbGYuY3VycmVudE1vbnRoO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGp1bXBUbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhciA9IGp1bXBUby5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudE1vbnRoID0ganVtcFRvLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGUubWVzc2FnZSA9IFwiSW52YWxpZCBkYXRlIHN1cHBsaWVkOiBcIiArIGp1bXBUbztcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLmVycm9ySGFuZGxlcihlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSAmJiBzZWxmLmN1cnJlbnRZZWFyICE9PSBvbGRZZWFyKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvblllYXJDaGFuZ2VcIik7XG4gICAgICAgICAgICBidWlsZE1vbnRoU3dpdGNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2UgJiZcbiAgICAgICAgICAgIChzZWxmLmN1cnJlbnRZZWFyICE9PSBvbGRZZWFyIHx8IHNlbGYuY3VycmVudE1vbnRoICE9PSBvbGRNb250aCkpIHtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uTW9udGhDaGFuZ2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5yZWRyYXcoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGltZUluY3JlbWVudChlKSB7XG4gICAgICAgIHZhciBldmVudFRhcmdldCA9IGdldEV2ZW50VGFyZ2V0KGUpO1xuICAgICAgICBpZiAofmV2ZW50VGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKFwiYXJyb3dcIikpXG4gICAgICAgICAgICBpbmNyZW1lbnROdW1JbnB1dChlLCBldmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhcnJvd1VwXCIpID8gMSA6IC0xKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5jcmVtZW50TnVtSW5wdXQoZSwgZGVsdGEsIGlucHV0RWxlbSkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZSAmJiBnZXRFdmVudFRhcmdldChlKTtcbiAgICAgICAgdmFyIGlucHV0ID0gaW5wdXRFbGVtIHx8XG4gICAgICAgICAgICAodGFyZ2V0ICYmIHRhcmdldC5wYXJlbnROb2RlICYmIHRhcmdldC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQpO1xuICAgICAgICB2YXIgZXZlbnQgPSBjcmVhdGVFdmVudChcImluY3JlbWVudFwiKTtcbiAgICAgICAgZXZlbnQuZGVsdGEgPSBkZWx0YTtcbiAgICAgICAgaW5wdXQgJiYgaW5wdXQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkKCkge1xuICAgICAgICB2YXIgZnJhZ21lbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1jYWxlbmRhclwiKTtcbiAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci50YWJJbmRleCA9IC0xO1xuICAgICAgICBpZiAoIXNlbGYuY29uZmlnLm5vQ2FsZW5kYXIpIHtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGJ1aWxkTW9udGhOYXYoKSk7XG4gICAgICAgICAgICBzZWxmLmlubmVyQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1pbm5lckNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy53ZWVrTnVtYmVycykge1xuICAgICAgICAgICAgICAgIHZhciBfYSA9IGJ1aWxkV2Vla3MoKSwgd2Vla1dyYXBwZXIgPSBfYS53ZWVrV3JhcHBlciwgd2Vla051bWJlcnMgPSBfYS53ZWVrTnVtYmVycztcbiAgICAgICAgICAgICAgICBzZWxmLmlubmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlZWtXcmFwcGVyKTtcbiAgICAgICAgICAgICAgICBzZWxmLndlZWtOdW1iZXJzID0gd2Vla051bWJlcnM7XG4gICAgICAgICAgICAgICAgc2VsZi53ZWVrV3JhcHBlciA9IHdlZWtXcmFwcGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5yQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1yQ29udGFpbmVyXCIpO1xuICAgICAgICAgICAgc2VsZi5yQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkV2Vla2RheXMoKSk7XG4gICAgICAgICAgICBpZiAoIXNlbGYuZGF5c0NvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHNlbGYuZGF5c0NvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3ItZGF5c1wiKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRheXNDb250YWluZXIudGFiSW5kZXggPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1aWxkRGF5cygpO1xuICAgICAgICAgICAgc2VsZi5yQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF5c0NvbnRhaW5lcik7XG4gICAgICAgICAgICBzZWxmLmlubmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuckNvbnRhaW5lcik7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChzZWxmLmlubmVyQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5jb25maWcuZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoYnVpbGRUaW1lKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwicmFuZ2VNb2RlXCIsIHNlbGYuY29uZmlnLm1vZGUgPT09IFwicmFuZ2VcIik7XG4gICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwiYW5pbWF0ZVwiLCBzZWxmLmNvbmZpZy5hbmltYXRlID09PSB0cnVlKTtcbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJtdWx0aU1vbnRoXCIsIHNlbGYuY29uZmlnLnNob3dNb250aHMgPiAxKTtcbiAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgICAgIHZhciBjdXN0b21BcHBlbmQgPSBzZWxmLmNvbmZpZy5hcHBlbmRUbyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5hcHBlbmRUby5ub2RlVHlwZSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcuaW5saW5lIHx8IHNlbGYuY29uZmlnLnN0YXRpYykge1xuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHNlbGYuY29uZmlnLmlubGluZSA/IFwiaW5saW5lXCIgOiBcInN0YXRpY1wiKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5pbmxpbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1c3RvbUFwcGVuZCAmJiBzZWxmLmVsZW1lbnQucGFyZW50Tm9kZSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIHNlbGYuX2lucHV0Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxmLmNvbmZpZy5hcHBlbmRUbyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5hcHBlbmRUby5hcHBlbmRDaGlsZChzZWxmLmNhbGVuZGFyQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5zdGF0aWMpIHtcbiAgICAgICAgICAgICAgICB2YXIgd3JhcHBlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3Itd3JhcHBlclwiKTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5lbGVtZW50LnBhcmVudE5vZGUpXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCBzZWxmLmVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5hbHRJbnB1dClcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChzZWxmLmFsdElucHV0KTtcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGYuY2FsZW5kYXJDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghc2VsZi5jb25maWcuc3RhdGljICYmICFzZWxmLmNvbmZpZy5pbmxpbmUpXG4gICAgICAgICAgICAoc2VsZi5jb25maWcuYXBwZW5kVG8gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcuYXBwZW5kVG9cbiAgICAgICAgICAgICAgICA6IHdpbmRvdy5kb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChzZWxmLmNhbGVuZGFyQ29udGFpbmVyKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRGF5KGNsYXNzTmFtZSwgZGF0ZSwgX2RheU51bWJlciwgaSkge1xuICAgICAgICB2YXIgZGF0ZUlzRW5hYmxlZCA9IGlzRW5hYmxlZChkYXRlLCB0cnVlKSwgZGF5RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGNsYXNzTmFtZSwgZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKSk7XG4gICAgICAgIGRheUVsZW1lbnQuZGF0ZU9iaiA9IGRhdGU7XG4gICAgICAgIGRheUVsZW1lbnQuJGkgPSBpO1xuICAgICAgICBkYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgc2VsZi5mb3JtYXREYXRlKGRhdGUsIHNlbGYuY29uZmlnLmFyaWFEYXRlRm9ybWF0KSk7XG4gICAgICAgIGlmIChjbGFzc05hbWUuaW5kZXhPZihcImhpZGRlblwiKSA9PT0gLTEgJiZcbiAgICAgICAgICAgIGNvbXBhcmVEYXRlcyhkYXRlLCBzZWxmLm5vdykgPT09IDApIHtcbiAgICAgICAgICAgIHNlbGYudG9kYXlEYXRlRWxlbSA9IGRheUVsZW1lbnQ7XG4gICAgICAgICAgICBkYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RheVwiKTtcbiAgICAgICAgICAgIGRheUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1jdXJyZW50XCIsIFwiZGF0ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZUlzRW5hYmxlZCkge1xuICAgICAgICAgICAgZGF5RWxlbWVudC50YWJJbmRleCA9IC0xO1xuICAgICAgICAgICAgaWYgKGlzRGF0ZVNlbGVjdGVkKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgZGF5RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVFbGVtID0gZGF5RWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGRheUVsZW1lbnQsIFwic3RhcnRSYW5nZVwiLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMF0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmVEYXRlcyhkYXRlLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMF0sIHRydWUpID09PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZGF5RWxlbWVudCwgXCJlbmRSYW5nZVwiLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMV0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmVEYXRlcyhkYXRlLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMV0sIHRydWUpID09PSAwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PT0gXCJuZXh0TW9udGhEYXlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRheUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImluUmFuZ2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF5RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZmxhdHBpY2tyLWRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIpIHtcbiAgICAgICAgICAgIGlmIChpc0RhdGVJblJhbmdlKGRhdGUpICYmICFpc0RhdGVTZWxlY3RlZChkYXRlKSlcbiAgICAgICAgICAgICAgICBkYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpblJhbmdlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLndlZWtOdW1iZXJzICYmXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5zaG93TW9udGhzID09PSAxICYmXG4gICAgICAgICAgICBjbGFzc05hbWUgIT09IFwicHJldk1vbnRoRGF5XCIgJiZcbiAgICAgICAgICAgIGkgJSA3ID09PSA2KSB7XG4gICAgICAgICAgICBzZWxmLndlZWtOdW1iZXJzLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBcIjxzcGFuIGNsYXNzPSdmbGF0cGlja3ItZGF5Jz5cIiArIHNlbGYuY29uZmlnLmdldFdlZWsoZGF0ZSkgKyBcIjwvc3Bhbj5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdHJpZ2dlckV2ZW50KFwib25EYXlDcmVhdGVcIiwgZGF5RWxlbWVudCk7XG4gICAgICAgIHJldHVybiBkYXlFbGVtZW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBmb2N1c09uRGF5RWxlbSh0YXJnZXROb2RlKSB7XG4gICAgICAgIHRhcmdldE5vZGUuZm9jdXMoKTtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1vZGUgPT09IFwicmFuZ2VcIilcbiAgICAgICAgICAgIG9uTW91c2VPdmVyKHRhcmdldE5vZGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRGaXJzdEF2YWlsYWJsZURheShkZWx0YSkge1xuICAgICAgICB2YXIgc3RhcnRNb250aCA9IGRlbHRhID4gMCA/IDAgOiBzZWxmLmNvbmZpZy5zaG93TW9udGhzIC0gMTtcbiAgICAgICAgdmFyIGVuZE1vbnRoID0gZGVsdGEgPiAwID8gc2VsZi5jb25maWcuc2hvd01vbnRocyA6IC0xO1xuICAgICAgICBmb3IgKHZhciBtID0gc3RhcnRNb250aDsgbSAhPSBlbmRNb250aDsgbSArPSBkZWx0YSkge1xuICAgICAgICAgICAgdmFyIG1vbnRoID0gc2VsZi5kYXlzQ29udGFpbmVyLmNoaWxkcmVuW21dO1xuICAgICAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBkZWx0YSA+IDAgPyAwIDogbW9udGguY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHZhciBlbmRJbmRleCA9IGRlbHRhID4gMCA/IG1vbnRoLmNoaWxkcmVuLmxlbmd0aCA6IC0xO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXg7IGkgIT0gZW5kSW5kZXg7IGkgKz0gZGVsdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYyA9IG1vbnRoLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGlmIChjLmNsYXNzTmFtZS5pbmRleE9mKFwiaGlkZGVuXCIpID09PSAtMSAmJiBpc0VuYWJsZWQoYy5kYXRlT2JqKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0TmV4dEF2YWlsYWJsZURheShjdXJyZW50LCBkZWx0YSkge1xuICAgICAgICB2YXIgZ2l2ZW5Nb250aCA9IGN1cnJlbnQuY2xhc3NOYW1lLmluZGV4T2YoXCJNb250aFwiKSA9PT0gLTFcbiAgICAgICAgICAgID8gY3VycmVudC5kYXRlT2JqLmdldE1vbnRoKClcbiAgICAgICAgICAgIDogc2VsZi5jdXJyZW50TW9udGg7XG4gICAgICAgIHZhciBlbmRNb250aCA9IGRlbHRhID4gMCA/IHNlbGYuY29uZmlnLnNob3dNb250aHMgOiAtMTtcbiAgICAgICAgdmFyIGxvb3BEZWx0YSA9IGRlbHRhID4gMCA/IDEgOiAtMTtcbiAgICAgICAgZm9yICh2YXIgbSA9IGdpdmVuTW9udGggLSBzZWxmLmN1cnJlbnRNb250aDsgbSAhPSBlbmRNb250aDsgbSArPSBsb29wRGVsdGEpIHtcbiAgICAgICAgICAgIHZhciBtb250aCA9IHNlbGYuZGF5c0NvbnRhaW5lci5jaGlsZHJlblttXTtcbiAgICAgICAgICAgIHZhciBzdGFydEluZGV4ID0gZ2l2ZW5Nb250aCAtIHNlbGYuY3VycmVudE1vbnRoID09PSBtXG4gICAgICAgICAgICAgICAgPyBjdXJyZW50LiRpICsgZGVsdGFcbiAgICAgICAgICAgICAgICA6IGRlbHRhIDwgMFxuICAgICAgICAgICAgICAgICAgICA/IG1vbnRoLmNoaWxkcmVuLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICAgICAgOiAwO1xuICAgICAgICAgICAgdmFyIG51bU1vbnRoRGF5cyA9IG1vbnRoLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpID49IDAgJiYgaSA8IG51bU1vbnRoRGF5cyAmJiBpICE9IChkZWx0YSA+IDAgPyBudW1Nb250aERheXMgOiAtMSk7IGkgKz0gbG9vcERlbHRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSBtb250aC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoYy5jbGFzc05hbWUuaW5kZXhPZihcImhpZGRlblwiKSA9PT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkKGMuZGF0ZU9iaikgJiZcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoY3VycmVudC4kaSAtIGkpID49IE1hdGguYWJzKGRlbHRhKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzT25EYXlFbGVtKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuY2hhbmdlTW9udGgobG9vcERlbHRhKTtcbiAgICAgICAgZm9jdXNPbkRheShnZXRGaXJzdEF2YWlsYWJsZURheShsb29wRGVsdGEpLCAwKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZm9jdXNPbkRheShjdXJyZW50LCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSBnZXRDbG9zZXN0QWN0aXZlRWxlbWVudCgpO1xuICAgICAgICB2YXIgZGF5Rm9jdXNlZCA9IGlzSW5WaWV3KGFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIHZhciBzdGFydEVsZW0gPSBjdXJyZW50ICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gY3VycmVudFxuICAgICAgICAgICAgOiBkYXlGb2N1c2VkXG4gICAgICAgICAgICAgICAgPyBhY3RpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgOiBzZWxmLnNlbGVjdGVkRGF0ZUVsZW0gIT09IHVuZGVmaW5lZCAmJiBpc0luVmlldyhzZWxmLnNlbGVjdGVkRGF0ZUVsZW0pXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5zZWxlY3RlZERhdGVFbGVtXG4gICAgICAgICAgICAgICAgICAgIDogc2VsZi50b2RheURhdGVFbGVtICE9PSB1bmRlZmluZWQgJiYgaXNJblZpZXcoc2VsZi50b2RheURhdGVFbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBzZWxmLnRvZGF5RGF0ZUVsZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIDogZ2V0Rmlyc3RBdmFpbGFibGVEYXkob2Zmc2V0ID4gMCA/IDEgOiAtMSk7XG4gICAgICAgIGlmIChzdGFydEVsZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VsZi5faW5wdXQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghZGF5Rm9jdXNlZCkge1xuICAgICAgICAgICAgZm9jdXNPbkRheUVsZW0oc3RhcnRFbGVtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdldE5leHRBdmFpbGFibGVEYXkoc3RhcnRFbGVtLCBvZmZzZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkTW9udGhEYXlzKHllYXIsIG1vbnRoKSB7XG4gICAgICAgIHZhciBmaXJzdE9mTW9udGggPSAobmV3IERhdGUoeWVhciwgbW9udGgsIDEpLmdldERheSgpIC0gc2VsZi5sMTBuLmZpcnN0RGF5T2ZXZWVrICsgNykgJSA3O1xuICAgICAgICB2YXIgcHJldk1vbnRoRGF5cyA9IHNlbGYudXRpbHMuZ2V0RGF5c0luTW9udGgoKG1vbnRoIC0gMSArIDEyKSAlIDEyLCB5ZWFyKTtcbiAgICAgICAgdmFyIGRheXNJbk1vbnRoID0gc2VsZi51dGlscy5nZXREYXlzSW5Nb250aChtb250aCwgeWVhciksIGRheXMgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLCBpc011bHRpTW9udGggPSBzZWxmLmNvbmZpZy5zaG93TW9udGhzID4gMSwgcHJldk1vbnRoRGF5Q2xhc3MgPSBpc011bHRpTW9udGggPyBcInByZXZNb250aERheSBoaWRkZW5cIiA6IFwicHJldk1vbnRoRGF5XCIsIG5leHRNb250aERheUNsYXNzID0gaXNNdWx0aU1vbnRoID8gXCJuZXh0TW9udGhEYXkgaGlkZGVuXCIgOiBcIm5leHRNb250aERheVwiO1xuICAgICAgICB2YXIgZGF5TnVtYmVyID0gcHJldk1vbnRoRGF5cyArIDEgLSBmaXJzdE9mTW9udGgsIGRheUluZGV4ID0gMDtcbiAgICAgICAgZm9yICg7IGRheU51bWJlciA8PSBwcmV2TW9udGhEYXlzOyBkYXlOdW1iZXIrKywgZGF5SW5kZXgrKykge1xuICAgICAgICAgICAgZGF5cy5hcHBlbmRDaGlsZChjcmVhdGVEYXkoXCJmbGF0cGlja3ItZGF5IFwiICsgcHJldk1vbnRoRGF5Q2xhc3MsIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5TnVtYmVyKSwgZGF5TnVtYmVyLCBkYXlJbmRleCkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoZGF5TnVtYmVyID0gMTsgZGF5TnVtYmVyIDw9IGRheXNJbk1vbnRoOyBkYXlOdW1iZXIrKywgZGF5SW5kZXgrKykge1xuICAgICAgICAgICAgZGF5cy5hcHBlbmRDaGlsZChjcmVhdGVEYXkoXCJmbGF0cGlja3ItZGF5XCIsIG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXlOdW1iZXIpLCBkYXlOdW1iZXIsIGRheUluZGV4KSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgZGF5TnVtID0gZGF5c0luTW9udGggKyAxOyBkYXlOdW0gPD0gNDIgLSBmaXJzdE9mTW9udGggJiZcbiAgICAgICAgICAgIChzZWxmLmNvbmZpZy5zaG93TW9udGhzID09PSAxIHx8IGRheUluZGV4ICUgNyAhPT0gMCk7IGRheU51bSsrLCBkYXlJbmRleCsrKSB7XG4gICAgICAgICAgICBkYXlzLmFwcGVuZENoaWxkKGNyZWF0ZURheShcImZsYXRwaWNrci1kYXkgXCIgKyBuZXh0TW9udGhEYXlDbGFzcywgbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCBkYXlOdW0gJSBkYXlzSW5Nb250aCksIGRheU51bSwgZGF5SW5kZXgpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF5Q29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImRheUNvbnRhaW5lclwiKTtcbiAgICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGRheXMpO1xuICAgICAgICByZXR1cm4gZGF5Q29udGFpbmVyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBidWlsZERheXMoKSB7XG4gICAgICAgIGlmIChzZWxmLmRheXNDb250YWluZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyTm9kZShzZWxmLmRheXNDb250YWluZXIpO1xuICAgICAgICBpZiAoc2VsZi53ZWVrTnVtYmVycylcbiAgICAgICAgICAgIGNsZWFyTm9kZShzZWxmLndlZWtOdW1iZXJzKTtcbiAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5jb25maWcuc2hvd01vbnRoczsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKHNlbGYuY3VycmVudFllYXIsIHNlbGYuY3VycmVudE1vbnRoLCAxKTtcbiAgICAgICAgICAgIGQuc2V0TW9udGgoc2VsZi5jdXJyZW50TW9udGggKyBpKTtcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoYnVpbGRNb250aERheXMoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCkpKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmRheXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZyk7XG4gICAgICAgIHNlbGYuZGF5cyA9IHNlbGYuZGF5c0NvbnRhaW5lci5maXJzdENoaWxkO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiICYmIHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIG9uTW91c2VPdmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRNb250aFN3aXRjaCgpIHtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLnNob3dNb250aHMgPiAxIHx8XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5tb250aFNlbGVjdG9yVHlwZSAhPT0gXCJkcm9wZG93blwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgc2hvdWxkQnVpbGRNb250aCA9IGZ1bmN0aW9uIChtb250aCkge1xuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1pbkRhdGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFllYXIgPT09IHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSAmJlxuICAgICAgICAgICAgICAgIG1vbnRoIDwgc2VsZi5jb25maWcubWluRGF0ZS5nZXRNb250aCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICEoc2VsZi5jb25maWcubWF4RGF0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhciA9PT0gc2VsZi5jb25maWcubWF4RGF0ZS5nZXRGdWxsWWVhcigpICYmXG4gICAgICAgICAgICAgICAgbW9udGggPiBzZWxmLmNvbmZpZy5tYXhEYXRlLmdldE1vbnRoKCkpO1xuICAgICAgICB9O1xuICAgICAgICBzZWxmLm1vbnRoc0Ryb3Bkb3duQ29udGFpbmVyLnRhYkluZGV4ID0gLTE7XG4gICAgICAgIHNlbGYubW9udGhzRHJvcGRvd25Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXNob3VsZEJ1aWxkTW9udGgoaSkpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB2YXIgbW9udGggPSBjcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIFwiZmxhdHBpY2tyLW1vbnRoRHJvcGRvd24tbW9udGhcIik7XG4gICAgICAgICAgICBtb250aC52YWx1ZSA9IG5ldyBEYXRlKHNlbGYuY3VycmVudFllYXIsIGkpLmdldE1vbnRoKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIG1vbnRoLnRleHRDb250ZW50ID0gbW9udGhUb1N0cihpLCBzZWxmLmNvbmZpZy5zaG9ydGhhbmRDdXJyZW50TW9udGgsIHNlbGYubDEwbik7XG4gICAgICAgICAgICBtb250aC50YWJJbmRleCA9IC0xO1xuICAgICAgICAgICAgaWYgKHNlbGYuY3VycmVudE1vbnRoID09PSBpKSB7XG4gICAgICAgICAgICAgICAgbW9udGguc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5tb250aHNEcm9wZG93bkNvbnRhaW5lci5hcHBlbmRDaGlsZChtb250aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRNb250aCgpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3ItbW9udGhcIik7XG4gICAgICAgIHZhciBtb250aE5hdkZyYWdtZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgdmFyIG1vbnRoRWxlbWVudDtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLnNob3dNb250aHMgPiAxIHx8XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5tb250aFNlbGVjdG9yVHlwZSA9PT0gXCJzdGF0aWNcIikge1xuICAgICAgICAgICAgbW9udGhFbGVtZW50ID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJjdXItbW9udGhcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxmLm1vbnRoc0Ryb3Bkb3duQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCBcImZsYXRwaWNrci1tb250aERyb3Bkb3duLW1vbnRoc1wiKTtcbiAgICAgICAgICAgIHNlbGYubW9udGhzRHJvcGRvd25Db250YWluZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBzZWxmLmwxMG4ubW9udGhBcmlhTGFiZWwpO1xuICAgICAgICAgICAgYmluZChzZWxmLm1vbnRoc0Ryb3Bkb3duQ29udGFpbmVyLCBcImNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBnZXRFdmVudFRhcmdldChlKTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0ZWRNb250aCA9IHBhcnNlSW50KHRhcmdldC52YWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgIHNlbGYuY2hhbmdlTW9udGgoc2VsZWN0ZWRNb250aCAtIHNlbGYuY3VycmVudE1vbnRoKTtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbk1vbnRoQ2hhbmdlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBidWlsZE1vbnRoU3dpdGNoKCk7XG4gICAgICAgICAgICBtb250aEVsZW1lbnQgPSBzZWxmLm1vbnRoc0Ryb3Bkb3duQ29udGFpbmVyO1xuICAgICAgICB9XG4gICAgICAgIHZhciB5ZWFySW5wdXQgPSBjcmVhdGVOdW1iZXJJbnB1dChcImN1ci15ZWFyXCIsIHsgdGFiaW5kZXg6IFwiLTFcIiB9KTtcbiAgICAgICAgdmFyIHllYXJFbGVtZW50ID0geWVhcklucHV0LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIilbMF07XG4gICAgICAgIHllYXJFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgc2VsZi5sMTBuLnllYXJBcmlhTGFiZWwpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubWluRGF0ZSkge1xuICAgICAgICAgICAgeWVhckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWluXCIsIHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5jb25maWcubWF4RGF0ZSkge1xuICAgICAgICAgICAgeWVhckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWF4XCIsIHNlbGYuY29uZmlnLm1heERhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHllYXJFbGVtZW50LmRpc2FibGVkID1cbiAgICAgICAgICAgICAgICAhIXNlbGYuY29uZmlnLm1pbkRhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcubWluRGF0ZS5nZXRGdWxsWWVhcigpID09PSBzZWxmLmNvbmZpZy5tYXhEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnJlbnRNb250aCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3ItY3VycmVudC1tb250aFwiKTtcbiAgICAgICAgY3VycmVudE1vbnRoLmFwcGVuZENoaWxkKG1vbnRoRWxlbWVudCk7XG4gICAgICAgIGN1cnJlbnRNb250aC5hcHBlbmRDaGlsZCh5ZWFySW5wdXQpO1xuICAgICAgICBtb250aE5hdkZyYWdtZW50LmFwcGVuZENoaWxkKGN1cnJlbnRNb250aCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtb250aE5hdkZyYWdtZW50KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICAgICAgeWVhckVsZW1lbnQ6IHllYXJFbGVtZW50LFxuICAgICAgICAgICAgbW9udGhFbGVtZW50OiBtb250aEVsZW1lbnQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkTW9udGhzKCkge1xuICAgICAgICBjbGVhck5vZGUoc2VsZi5tb250aE5hdik7XG4gICAgICAgIHNlbGYubW9udGhOYXYuYXBwZW5kQ2hpbGQoc2VsZi5wcmV2TW9udGhOYXYpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcuc2hvd01vbnRocykge1xuICAgICAgICAgICAgc2VsZi55ZWFyRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIHNlbGYubW9udGhFbGVtZW50cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIG0gPSBzZWxmLmNvbmZpZy5zaG93TW9udGhzOyBtLS07KSB7XG4gICAgICAgICAgICB2YXIgbW9udGggPSBidWlsZE1vbnRoKCk7XG4gICAgICAgICAgICBzZWxmLnllYXJFbGVtZW50cy5wdXNoKG1vbnRoLnllYXJFbGVtZW50KTtcbiAgICAgICAgICAgIHNlbGYubW9udGhFbGVtZW50cy5wdXNoKG1vbnRoLm1vbnRoRWxlbWVudCk7XG4gICAgICAgICAgICBzZWxmLm1vbnRoTmF2LmFwcGVuZENoaWxkKG1vbnRoLmNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5tb250aE5hdi5hcHBlbmRDaGlsZChzZWxmLm5leHRNb250aE5hdik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJ1aWxkTW9udGhOYXYoKSB7XG4gICAgICAgIHNlbGYubW9udGhOYXYgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLW1vbnRoc1wiKTtcbiAgICAgICAgc2VsZi55ZWFyRWxlbWVudHMgPSBbXTtcbiAgICAgICAgc2VsZi5tb250aEVsZW1lbnRzID0gW107XG4gICAgICAgIHNlbGYucHJldk1vbnRoTmF2ID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJmbGF0cGlja3ItcHJldi1tb250aFwiKTtcbiAgICAgICAgc2VsZi5wcmV2TW9udGhOYXYuaW5uZXJIVE1MID0gc2VsZi5jb25maWcucHJldkFycm93O1xuICAgICAgICBzZWxmLm5leHRNb250aE5hdiA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLW5leHQtbW9udGhcIik7XG4gICAgICAgIHNlbGYubmV4dE1vbnRoTmF2LmlubmVySFRNTCA9IHNlbGYuY29uZmlnLm5leHRBcnJvdztcbiAgICAgICAgYnVpbGRNb250aHMoKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIFwiX2hpZGVQcmV2TW9udGhBcnJvd1wiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuX19oaWRlUHJldk1vbnRoQXJyb3c7IH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChib29sKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX19oaWRlUHJldk1vbnRoQXJyb3cgIT09IGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5wcmV2TW9udGhOYXYsIFwiZmxhdHBpY2tyLWRpc2FibGVkXCIsIGJvb2wpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9faGlkZVByZXZNb250aEFycm93ID0gYm9vbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIFwiX2hpZGVOZXh0TW9udGhBcnJvd1wiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuX19oaWRlTmV4dE1vbnRoQXJyb3c7IH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChib29sKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX19oaWRlTmV4dE1vbnRoQXJyb3cgIT09IGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5uZXh0TW9udGhOYXYsIFwiZmxhdHBpY2tyLWRpc2FibGVkXCIsIGJvb2wpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9faGlkZU5leHRNb250aEFycm93ID0gYm9vbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5jdXJyZW50WWVhckVsZW1lbnQgPSBzZWxmLnllYXJFbGVtZW50c1swXTtcbiAgICAgICAgdXBkYXRlTmF2aWdhdGlvbkN1cnJlbnRNb250aCgpO1xuICAgICAgICByZXR1cm4gc2VsZi5tb250aE5hdjtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRUaW1lKCkge1xuICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoYXNUaW1lXCIpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubm9DYWxlbmRhcilcbiAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5vQ2FsZW5kYXJcIik7XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IGdldERlZmF1bHRIb3VycyhzZWxmLmNvbmZpZyk7XG4gICAgICAgIHNlbGYudGltZUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3ItdGltZVwiKTtcbiAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLnRhYkluZGV4ID0gLTE7XG4gICAgICAgIHZhciBzZXBhcmF0b3IgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImZsYXRwaWNrci10aW1lLXNlcGFyYXRvclwiLCBcIjpcIik7XG4gICAgICAgIHZhciBob3VySW5wdXQgPSBjcmVhdGVOdW1iZXJJbnB1dChcImZsYXRwaWNrci1ob3VyXCIsIHtcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBzZWxmLmwxMG4uaG91ckFyaWFMYWJlbCxcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuaG91ckVsZW1lbnQgPSBob3VySW5wdXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgdmFyIG1pbnV0ZUlucHV0ID0gY3JlYXRlTnVtYmVySW5wdXQoXCJmbGF0cGlja3ItbWludXRlXCIsIHtcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBzZWxmLmwxMG4ubWludXRlQXJpYUxhYmVsLFxuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5taW51dGVFbGVtZW50ID0gbWludXRlSW5wdXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXTtcbiAgICAgICAgc2VsZi5ob3VyRWxlbWVudC50YWJJbmRleCA9IHNlbGYubWludXRlRWxlbWVudC50YWJJbmRleCA9IC0xO1xuICAgICAgICBzZWxmLmhvdXJFbGVtZW50LnZhbHVlID0gcGFkKHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqXG4gICAgICAgICAgICA/IHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqLmdldEhvdXJzKClcbiAgICAgICAgICAgIDogc2VsZi5jb25maWcudGltZV8yNGhyXG4gICAgICAgICAgICAgICAgPyBkZWZhdWx0cy5ob3Vyc1xuICAgICAgICAgICAgICAgIDogbWlsaXRhcnkyYW1wbShkZWZhdWx0cy5ob3VycykpO1xuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQudmFsdWUgPSBwYWQoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmpcbiAgICAgICAgICAgID8gc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmouZ2V0TWludXRlcygpXG4gICAgICAgICAgICA6IGRlZmF1bHRzLm1pbnV0ZXMpO1xuICAgICAgICBzZWxmLmhvdXJFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0ZXBcIiwgc2VsZi5jb25maWcuaG91ckluY3JlbWVudC50b1N0cmluZygpKTtcbiAgICAgICAgc2VsZi5taW51dGVFbGVtZW50LnNldEF0dHJpYnV0ZShcInN0ZXBcIiwgc2VsZi5jb25maWcubWludXRlSW5jcmVtZW50LnRvU3RyaW5nKCkpO1xuICAgICAgICBzZWxmLmhvdXJFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1pblwiLCBzZWxmLmNvbmZpZy50aW1lXzI0aHIgPyBcIjBcIiA6IFwiMVwiKTtcbiAgICAgICAgc2VsZi5ob3VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgc2VsZi5jb25maWcudGltZV8yNGhyID8gXCIyM1wiIDogXCIxMlwiKTtcbiAgICAgICAgc2VsZi5ob3VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgXCIyXCIpO1xuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWluXCIsIFwiMFwiKTtcbiAgICAgICAgc2VsZi5taW51dGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1heFwiLCBcIjU5XCIpO1xuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsIFwiMlwiKTtcbiAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJJbnB1dCk7XG4gICAgICAgIHNlbGYudGltZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzZXBhcmF0b3IpO1xuICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQobWludXRlSW5wdXQpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcudGltZV8yNGhyKVxuICAgICAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0aW1lMjRoclwiKTtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmVuYWJsZVNlY29uZHMpIHtcbiAgICAgICAgICAgIHNlbGYudGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGFzU2Vjb25kc1wiKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmRJbnB1dCA9IGNyZWF0ZU51bWJlcklucHV0KFwiZmxhdHBpY2tyLXNlY29uZFwiKTtcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudCA9IHNlY29uZElucHV0LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIilbMF07XG4gICAgICAgICAgICBzZWxmLnNlY29uZEVsZW1lbnQudmFsdWUgPSBwYWQoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmpcbiAgICAgICAgICAgICAgICA/IHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqLmdldFNlY29uZHMoKVxuICAgICAgICAgICAgICAgIDogZGVmYXVsdHMuc2Vjb25kcyk7XG4gICAgICAgICAgICBzZWxmLnNlY29uZEVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3RlcFwiLCBzZWxmLm1pbnV0ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3RlcFwiKSk7XG4gICAgICAgICAgICBzZWxmLnNlY29uZEVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWluXCIsIFwiMFwiKTtcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtYXhcIiwgXCI1OVwiKTtcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtYXhsZW5ndGhcIiwgXCIyXCIpO1xuICAgICAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLXRpbWUtc2VwYXJhdG9yXCIsIFwiOlwiKSk7XG4gICAgICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2Vjb25kSW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2VsZi5jb25maWcudGltZV8yNGhyKSB7XG4gICAgICAgICAgICBzZWxmLmFtUE0gPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImZsYXRwaWNrci1hbS1wbVwiLCBzZWxmLmwxMG4uYW1QTVtpbnQoKHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqXG4gICAgICAgICAgICAgICAgPyBzZWxmLmhvdXJFbGVtZW50LnZhbHVlXG4gICAgICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5kZWZhdWx0SG91cikgPiAxMSldKTtcbiAgICAgICAgICAgIHNlbGYuYW1QTS50aXRsZSA9IHNlbGYubDEwbi50b2dnbGVUaXRsZTtcbiAgICAgICAgICAgIHNlbGYuYW1QTS50YWJJbmRleCA9IC0xO1xuICAgICAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuYW1QTSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGYudGltZUNvbnRhaW5lcjtcbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRXZWVrZGF5cygpIHtcbiAgICAgICAgaWYgKCFzZWxmLndlZWtkYXlDb250YWluZXIpXG4gICAgICAgICAgICBzZWxmLndlZWtkYXlDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXdlZWtkYXlzXCIpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjbGVhck5vZGUoc2VsZi53ZWVrZGF5Q29udGFpbmVyKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHNlbGYuY29uZmlnLnNob3dNb250aHM7IGktLTspIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXdlZWtkYXljb250YWluZXJcIik7XG4gICAgICAgICAgICBzZWxmLndlZWtkYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVXZWVrZGF5cygpO1xuICAgICAgICByZXR1cm4gc2VsZi53ZWVrZGF5Q29udGFpbmVyO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVXZWVrZGF5cygpIHtcbiAgICAgICAgaWYgKCFzZWxmLndlZWtkYXlDb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyc3REYXlPZldlZWsgPSBzZWxmLmwxMG4uZmlyc3REYXlPZldlZWs7XG4gICAgICAgIHZhciB3ZWVrZGF5cyA9IF9fc3ByZWFkQXJyYXlzKHNlbGYubDEwbi53ZWVrZGF5cy5zaG9ydGhhbmQpO1xuICAgICAgICBpZiAoZmlyc3REYXlPZldlZWsgPiAwICYmIGZpcnN0RGF5T2ZXZWVrIDwgd2Vla2RheXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB3ZWVrZGF5cyA9IF9fc3ByZWFkQXJyYXlzKHdlZWtkYXlzLnNwbGljZShmaXJzdERheU9mV2Vlaywgd2Vla2RheXMubGVuZ3RoKSwgd2Vla2RheXMuc3BsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IHNlbGYuY29uZmlnLnNob3dNb250aHM7IGktLTspIHtcbiAgICAgICAgICAgIHNlbGYud2Vla2RheUNvbnRhaW5lci5jaGlsZHJlbltpXS5pbm5lckhUTUwgPSBcIlxcbiAgICAgIDxzcGFuIGNsYXNzPSdmbGF0cGlja3Itd2Vla2RheSc+XFxuICAgICAgICBcIiArIHdlZWtkYXlzLmpvaW4oXCI8L3NwYW4+PHNwYW4gY2xhc3M9J2ZsYXRwaWNrci13ZWVrZGF5Jz5cIikgKyBcIlxcbiAgICAgIDwvc3Bhbj5cXG4gICAgICBcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBidWlsZFdlZWtzKCkge1xuICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJoYXNXZWVrc1wiKTtcbiAgICAgICAgdmFyIHdlZWtXcmFwcGVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci13ZWVrd3JhcHBlclwiKTtcbiAgICAgICAgd2Vla1dyYXBwZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJmbGF0cGlja3Itd2Vla2RheVwiLCBzZWxmLmwxMG4ud2Vla0FiYnJldmlhdGlvbikpO1xuICAgICAgICB2YXIgd2Vla051bWJlcnMgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXdlZWtzXCIpO1xuICAgICAgICB3ZWVrV3JhcHBlci5hcHBlbmRDaGlsZCh3ZWVrTnVtYmVycyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3ZWVrV3JhcHBlcjogd2Vla1dyYXBwZXIsXG4gICAgICAgICAgICB3ZWVrTnVtYmVyczogd2Vla051bWJlcnMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoYW5nZU1vbnRoKHZhbHVlLCBpc09mZnNldCkge1xuICAgICAgICBpZiAoaXNPZmZzZXQgPT09IHZvaWQgMCkgeyBpc09mZnNldCA9IHRydWU7IH1cbiAgICAgICAgdmFyIGRlbHRhID0gaXNPZmZzZXQgPyB2YWx1ZSA6IHZhbHVlIC0gc2VsZi5jdXJyZW50TW9udGg7XG4gICAgICAgIGlmICgoZGVsdGEgPCAwICYmIHNlbGYuX2hpZGVQcmV2TW9udGhBcnJvdyA9PT0gdHJ1ZSkgfHxcbiAgICAgICAgICAgIChkZWx0YSA+IDAgJiYgc2VsZi5faGlkZU5leHRNb250aEFycm93ID09PSB0cnVlKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc2VsZi5jdXJyZW50TW9udGggKz0gZGVsdGE7XG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRNb250aCA8IDAgfHwgc2VsZi5jdXJyZW50TW9udGggPiAxMSkge1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhciArPSBzZWxmLmN1cnJlbnRNb250aCA+IDExID8gMSA6IC0xO1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50TW9udGggPSAoc2VsZi5jdXJyZW50TW9udGggKyAxMikgJSAxMjtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uWWVhckNoYW5nZVwiKTtcbiAgICAgICAgICAgIGJ1aWxkTW9udGhTd2l0Y2goKTtcbiAgICAgICAgfVxuICAgICAgICBidWlsZERheXMoKTtcbiAgICAgICAgdHJpZ2dlckV2ZW50KFwib25Nb250aENoYW5nZVwiKTtcbiAgICAgICAgdXBkYXRlTmF2aWdhdGlvbkN1cnJlbnRNb250aCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbGVhcih0cmlnZ2VyQ2hhbmdlRXZlbnQsIHRvSW5pdGlhbCkge1xuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZUV2ZW50ID09PSB2b2lkIDApIHsgdHJpZ2dlckNoYW5nZUV2ZW50ID0gdHJ1ZTsgfVxuICAgICAgICBpZiAodG9Jbml0aWFsID09PSB2b2lkIDApIHsgdG9Jbml0aWFsID0gdHJ1ZTsgfVxuICAgICAgICBzZWxmLmlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgaWYgKHNlbGYuYWx0SW5wdXQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQudmFsdWUgPSBcIlwiO1xuICAgICAgICBpZiAoc2VsZi5tb2JpbGVJbnB1dCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcyA9IFtdO1xuICAgICAgICBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHRvSW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhciA9IHNlbGYuX2luaXRpYWxEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IHNlbGYuX2luaXRpYWxEYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmVuYWJsZVRpbWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGdldERlZmF1bHRIb3VycyhzZWxmLmNvbmZpZyksIGhvdXJzID0gX2EuaG91cnMsIG1pbnV0ZXMgPSBfYS5taW51dGVzLCBzZWNvbmRzID0gX2Euc2Vjb25kcztcbiAgICAgICAgICAgIHNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZUV2ZW50KVxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25DaGFuZ2VcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBzZWxmLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICBpZiAoIXNlbGYuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIGlmIChzZWxmLmNhbGVuZGFyQ29udGFpbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGYuX2lucHV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9pbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyaWdnZXJFdmVudChcIm9uQ2xvc2VcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25EZXN0cm95XCIpO1xuICAgICAgICBmb3IgKHZhciBpID0gc2VsZi5faGFuZGxlcnMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBzZWxmLl9oYW5kbGVyc1tpXS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLl9oYW5kbGVycyA9IFtdO1xuICAgICAgICBpZiAoc2VsZi5tb2JpbGVJbnB1dCkge1xuICAgICAgICAgICAgaWYgKHNlbGYubW9iaWxlSW5wdXQucGFyZW50Tm9kZSlcbiAgICAgICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5tb2JpbGVJbnB1dCk7XG4gICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGYuY2FsZW5kYXJDb250YWluZXIgJiYgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuc3RhdGljICYmIHNlbGYuY2FsZW5kYXJDb250YWluZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciB3cmFwcGVyID0gc2VsZi5jYWxlbmRhckNvbnRhaW5lci5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHdyYXBwZXIubGFzdENoaWxkICYmIHdyYXBwZXIucmVtb3ZlQ2hpbGQod3JhcHBlci5sYXN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmICh3cmFwcGVyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHdyYXBwZXIuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlci5maXJzdENoaWxkLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHdyYXBwZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5jYWxlbmRhckNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuYWx0SW5wdXQpIHtcbiAgICAgICAgICAgIHNlbGYuaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICAgICAgaWYgKHNlbGYuYWx0SW5wdXQucGFyZW50Tm9kZSlcbiAgICAgICAgICAgICAgICBzZWxmLmFsdElucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5hbHRJbnB1dCk7XG4gICAgICAgICAgICBkZWxldGUgc2VsZi5hbHRJbnB1dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5pbnB1dCkge1xuICAgICAgICAgICAgc2VsZi5pbnB1dC50eXBlID0gc2VsZi5pbnB1dC5fdHlwZTtcbiAgICAgICAgICAgIHNlbGYuaW5wdXQuY2xhc3NMaXN0LnJlbW92ZShcImZsYXRwaWNrci1pbnB1dFwiKTtcbiAgICAgICAgICAgIHNlbGYuaW5wdXQucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XG4gICAgICAgIH1cbiAgICAgICAgW1xuICAgICAgICAgICAgXCJfc2hvd1RpbWVJbnB1dFwiLFxuICAgICAgICAgICAgXCJsYXRlc3RTZWxlY3RlZERhdGVPYmpcIixcbiAgICAgICAgICAgIFwiX2hpZGVOZXh0TW9udGhBcnJvd1wiLFxuICAgICAgICAgICAgXCJfaGlkZVByZXZNb250aEFycm93XCIsXG4gICAgICAgICAgICBcIl9faGlkZU5leHRNb250aEFycm93XCIsXG4gICAgICAgICAgICBcIl9faGlkZVByZXZNb250aEFycm93XCIsXG4gICAgICAgICAgICBcImlzTW9iaWxlXCIsXG4gICAgICAgICAgICBcImlzT3BlblwiLFxuICAgICAgICAgICAgXCJzZWxlY3RlZERhdGVFbGVtXCIsXG4gICAgICAgICAgICBcIm1pbkRhdGVIYXNUaW1lXCIsXG4gICAgICAgICAgICBcIm1heERhdGVIYXNUaW1lXCIsXG4gICAgICAgICAgICBcImRheXNcIixcbiAgICAgICAgICAgIFwiZGF5c0NvbnRhaW5lclwiLFxuICAgICAgICAgICAgXCJfaW5wdXRcIixcbiAgICAgICAgICAgIFwiX3Bvc2l0aW9uRWxlbWVudFwiLFxuICAgICAgICAgICAgXCJpbm5lckNvbnRhaW5lclwiLFxuICAgICAgICAgICAgXCJyQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBcIm1vbnRoTmF2XCIsXG4gICAgICAgICAgICBcInRvZGF5RGF0ZUVsZW1cIixcbiAgICAgICAgICAgIFwiY2FsZW5kYXJDb250YWluZXJcIixcbiAgICAgICAgICAgIFwid2Vla2RheUNvbnRhaW5lclwiLFxuICAgICAgICAgICAgXCJwcmV2TW9udGhOYXZcIixcbiAgICAgICAgICAgIFwibmV4dE1vbnRoTmF2XCIsXG4gICAgICAgICAgICBcIm1vbnRoc0Ryb3Bkb3duQ29udGFpbmVyXCIsXG4gICAgICAgICAgICBcImN1cnJlbnRNb250aEVsZW1lbnRcIixcbiAgICAgICAgICAgIFwiY3VycmVudFllYXJFbGVtZW50XCIsXG4gICAgICAgICAgICBcIm5hdmlnYXRpb25DdXJyZW50TW9udGhcIixcbiAgICAgICAgICAgIFwic2VsZWN0ZWREYXRlRWxlbVwiLFxuICAgICAgICAgICAgXCJjb25maWdcIixcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmW2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKF8pIHsgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNDYWxlbmRhckVsZW0oZWxlbSkge1xuICAgICAgICByZXR1cm4gc2VsZi5jYWxlbmRhckNvbnRhaW5lci5jb250YWlucyhlbGVtKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9jdW1lbnRDbGljayhlKSB7XG4gICAgICAgIGlmIChzZWxmLmlzT3BlbiAmJiAhc2VsZi5jb25maWcuaW5saW5lKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRUYXJnZXRfMSA9IGdldEV2ZW50VGFyZ2V0KGUpO1xuICAgICAgICAgICAgdmFyIGlzQ2FsZW5kYXJFbGVtZW50ID0gaXNDYWxlbmRhckVsZW0oZXZlbnRUYXJnZXRfMSk7XG4gICAgICAgICAgICB2YXIgaXNJbnB1dCA9IGV2ZW50VGFyZ2V0XzEgPT09IHNlbGYuaW5wdXQgfHxcbiAgICAgICAgICAgICAgICBldmVudFRhcmdldF8xID09PSBzZWxmLmFsdElucHV0IHx8XG4gICAgICAgICAgICAgICAgc2VsZi5lbGVtZW50LmNvbnRhaW5zKGV2ZW50VGFyZ2V0XzEpIHx8XG4gICAgICAgICAgICAgICAgKGUucGF0aCAmJlxuICAgICAgICAgICAgICAgICAgICBlLnBhdGguaW5kZXhPZiAmJlxuICAgICAgICAgICAgICAgICAgICAofmUucGF0aC5pbmRleE9mKHNlbGYuaW5wdXQpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB+ZS5wYXRoLmluZGV4T2Yoc2VsZi5hbHRJbnB1dCkpKTtcbiAgICAgICAgICAgIHZhciBsb3N0Rm9jdXMgPSAhaXNJbnB1dCAmJlxuICAgICAgICAgICAgICAgICFpc0NhbGVuZGFyRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgICFpc0NhbGVuZGFyRWxlbShlLnJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICAgICAgdmFyIGlzSWdub3JlZCA9ICFzZWxmLmNvbmZpZy5pZ25vcmVkRm9jdXNFbGVtZW50cy5zb21lKGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uY29udGFpbnMoZXZlbnRUYXJnZXRfMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsb3N0Rm9jdXMgJiYgaXNJZ25vcmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmFsbG93SW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXREYXRlKHNlbGYuX2lucHV0LnZhbHVlLCBmYWxzZSwgc2VsZi5jb25maWcuYWx0SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcuYWx0Rm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLmRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi50aW1lQ29udGFpbmVyICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5taW51dGVFbGVtZW50ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5ob3VyRWxlbWVudCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaW5wdXQudmFsdWUgIT09IFwiXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbnB1dC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZyAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbGVhcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY2hhbmdlWWVhcihuZXdZZWFyKSB7XG4gICAgICAgIGlmICghbmV3WWVhciB8fFxuICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1pbkRhdGUgJiYgbmV3WWVhciA8IHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSkgfHxcbiAgICAgICAgICAgIChzZWxmLmNvbmZpZy5tYXhEYXRlICYmIG5ld1llYXIgPiBzZWxmLmNvbmZpZy5tYXhEYXRlLmdldEZ1bGxZZWFyKCkpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgbmV3WWVhck51bSA9IG5ld1llYXIsIGlzTmV3WWVhciA9IHNlbGYuY3VycmVudFllYXIgIT09IG5ld1llYXJOdW07XG4gICAgICAgIHNlbGYuY3VycmVudFllYXIgPSBuZXdZZWFyTnVtIHx8IHNlbGYuY3VycmVudFllYXI7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tYXhEYXRlICYmXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID09PSBzZWxmLmNvbmZpZy5tYXhEYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgICAgIHNlbGYuY3VycmVudE1vbnRoID0gTWF0aC5taW4oc2VsZi5jb25maWcubWF4RGF0ZS5nZXRNb250aCgpLCBzZWxmLmN1cnJlbnRNb250aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZi5jb25maWcubWluRGF0ZSAmJlxuICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhciA9PT0gc2VsZi5jb25maWcubWluRGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IE1hdGgubWF4KHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0TW9udGgoKSwgc2VsZi5jdXJyZW50TW9udGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc05ld1llYXIpIHtcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvblllYXJDaGFuZ2VcIik7XG4gICAgICAgICAgICBidWlsZE1vbnRoU3dpdGNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaXNFbmFibGVkKGRhdGUsIHRpbWVsZXNzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRpbWVsZXNzID09PSB2b2lkIDApIHsgdGltZWxlc3MgPSB0cnVlOyB9XG4gICAgICAgIHZhciBkYXRlVG9DaGVjayA9IHNlbGYucGFyc2VEYXRlKGRhdGUsIHVuZGVmaW5lZCwgdGltZWxlc3MpO1xuICAgICAgICBpZiAoKHNlbGYuY29uZmlnLm1pbkRhdGUgJiZcbiAgICAgICAgICAgIGRhdGVUb0NoZWNrICYmXG4gICAgICAgICAgICBjb21wYXJlRGF0ZXMoZGF0ZVRvQ2hlY2ssIHNlbGYuY29uZmlnLm1pbkRhdGUsIHRpbWVsZXNzICE9PSB1bmRlZmluZWQgPyB0aW1lbGVzcyA6ICFzZWxmLm1pbkRhdGVIYXNUaW1lKSA8IDApIHx8XG4gICAgICAgICAgICAoc2VsZi5jb25maWcubWF4RGF0ZSAmJlxuICAgICAgICAgICAgICAgIGRhdGVUb0NoZWNrICYmXG4gICAgICAgICAgICAgICAgY29tcGFyZURhdGVzKGRhdGVUb0NoZWNrLCBzZWxmLmNvbmZpZy5tYXhEYXRlLCB0aW1lbGVzcyAhPT0gdW5kZWZpbmVkID8gdGltZWxlc3MgOiAhc2VsZi5tYXhEYXRlSGFzVGltZSkgPiAwKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5lbmFibGUgJiYgc2VsZi5jb25maWcuZGlzYWJsZS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKGRhdGVUb0NoZWNrID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBib29sID0gISFzZWxmLmNvbmZpZy5lbmFibGUsIGFycmF5ID0gKF9hID0gc2VsZi5jb25maWcuZW5hYmxlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBzZWxmLmNvbmZpZy5kaXNhYmxlO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgZCA9IHZvaWQgMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkID0gYXJyYXlbaV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIGQgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgIGQoZGF0ZVRvQ2hlY2spKVxuICAgICAgICAgICAgICAgIHJldHVybiBib29sO1xuICAgICAgICAgICAgZWxzZSBpZiAoZCBpbnN0YW5jZW9mIERhdGUgJiZcbiAgICAgICAgICAgICAgICBkYXRlVG9DaGVjayAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgZC5nZXRUaW1lKCkgPT09IGRhdGVUb0NoZWNrLmdldFRpbWUoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYm9vbDtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlZCA9IHNlbGYucGFyc2VEYXRlKGQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlZCAmJiBwYXJzZWQuZ2V0VGltZSgpID09PSBkYXRlVG9DaGVjay5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgPyBib29sXG4gICAgICAgICAgICAgICAgICAgIDogIWJvb2w7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZCA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgIGRhdGVUb0NoZWNrICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBkLmZyb20gJiZcbiAgICAgICAgICAgICAgICBkLnRvICYmXG4gICAgICAgICAgICAgICAgZGF0ZVRvQ2hlY2suZ2V0VGltZSgpID49IGQuZnJvbS5nZXRUaW1lKCkgJiZcbiAgICAgICAgICAgICAgICBkYXRlVG9DaGVjay5nZXRUaW1lKCkgPD0gZC50by5nZXRUaW1lKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvb2w7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICFib29sO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0luVmlldyhlbGVtKSB7XG4gICAgICAgIGlmIChzZWxmLmRheXNDb250YWluZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiAoZWxlbS5jbGFzc05hbWUuaW5kZXhPZihcImhpZGRlblwiKSA9PT0gLTEgJiZcbiAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTmFtZS5pbmRleE9mKFwiZmxhdHBpY2tyLWRpc2FibGVkXCIpID09PSAtMSAmJlxuICAgICAgICAgICAgICAgIHNlbGYuZGF5c0NvbnRhaW5lci5jb250YWlucyhlbGVtKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25CbHVyKGUpIHtcbiAgICAgICAgdmFyIGlzSW5wdXQgPSBlLnRhcmdldCA9PT0gc2VsZi5faW5wdXQ7XG4gICAgICAgIHZhciB2YWx1ZUNoYW5nZWQgPSBzZWxmLl9pbnB1dC52YWx1ZS50cmltRW5kKCkgIT09IGdldERhdGVTdHIoKTtcbiAgICAgICAgaWYgKGlzSW5wdXQgJiZcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCAmJlxuICAgICAgICAgICAgIShlLnJlbGF0ZWRUYXJnZXQgJiYgaXNDYWxlbmRhckVsZW0oZS5yZWxhdGVkVGFyZ2V0KSkpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShzZWxmLl9pbnB1dC52YWx1ZSwgdHJ1ZSwgZS50YXJnZXQgPT09IHNlbGYuYWx0SW5wdXRcbiAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLmFsdEZvcm1hdFxuICAgICAgICAgICAgICAgIDogc2VsZi5jb25maWcuZGF0ZUZvcm1hdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25LZXlEb3duKGUpIHtcbiAgICAgICAgdmFyIGV2ZW50VGFyZ2V0ID0gZ2V0RXZlbnRUYXJnZXQoZSk7XG4gICAgICAgIHZhciBpc0lucHV0ID0gc2VsZi5jb25maWcud3JhcFxuICAgICAgICAgICAgPyBlbGVtZW50LmNvbnRhaW5zKGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgOiBldmVudFRhcmdldCA9PT0gc2VsZi5faW5wdXQ7XG4gICAgICAgIHZhciBhbGxvd0lucHV0ID0gc2VsZi5jb25maWcuYWxsb3dJbnB1dDtcbiAgICAgICAgdmFyIGFsbG93S2V5ZG93biA9IHNlbGYuaXNPcGVuICYmICghYWxsb3dJbnB1dCB8fCAhaXNJbnB1dCk7XG4gICAgICAgIHZhciBhbGxvd0lubGluZUtleWRvd24gPSBzZWxmLmNvbmZpZy5pbmxpbmUgJiYgaXNJbnB1dCAmJiAhYWxsb3dJbnB1dDtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgaXNJbnB1dCkge1xuICAgICAgICAgICAgaWYgKGFsbG93SW5wdXQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldERhdGUoc2VsZi5faW5wdXQudmFsdWUsIHRydWUsIGV2ZW50VGFyZ2V0ID09PSBzZWxmLmFsdElucHV0XG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcuYWx0Rm9ybWF0XG4gICAgICAgICAgICAgICAgICAgIDogc2VsZi5jb25maWcuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBldmVudFRhcmdldC5ibHVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0NhbGVuZGFyRWxlbShldmVudFRhcmdldCkgfHxcbiAgICAgICAgICAgIGFsbG93S2V5ZG93biB8fFxuICAgICAgICAgICAgYWxsb3dJbmxpbmVLZXlkb3duKSB7XG4gICAgICAgICAgICB2YXIgaXNUaW1lT2JqID0gISFzZWxmLnRpbWVDb250YWluZXIgJiZcbiAgICAgICAgICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuY29udGFpbnMoZXZlbnRUYXJnZXQpO1xuICAgICAgICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUaW1lT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c0FuZENsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0RGF0ZShlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBmb2N1c0FuZENsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICBjYXNlIDQ2OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNJbnB1dCAmJiAhc2VsZi5jb25maWcuYWxsb3dJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVPYmogJiYgIWlzSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gZ2V0Q2xvc2VzdEFjdGl2ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmRheXNDb250YWluZXIgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhbGxvd0lucHV0ID09PSBmYWxzZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYWN0aXZlRWxlbWVudCAmJiBpc0luVmlldyhhY3RpdmVFbGVtZW50KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhXzEgPSBlLmtleUNvZGUgPT09IDM5ID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZS5jdHJsS2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c09uRGF5KHVuZGVmaW5lZCwgZGVsdGFfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZU1vbnRoKGRlbHRhXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c09uRGF5KGdldEZpcnN0QXZhaWxhYmxlRGF5KDEpLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5ob3VyRWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaG91ckVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWx0YSA9IGUua2V5Q29kZSA9PT0gNDAgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoc2VsZi5kYXlzQ29udGFpbmVyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFRhcmdldC4kaSAhPT0gdW5kZWZpbmVkKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQgPT09IHNlbGYuaW5wdXQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGFyZ2V0ID09PSBzZWxmLmFsdElucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VZZWFyKHNlbGYuY3VycmVudFllYXIgLSBkZWx0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNPbkRheShnZXRGaXJzdEF2YWlsYWJsZURheSgxKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghaXNUaW1lT2JqKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzT25EYXkodW5kZWZpbmVkLCBkZWx0YSAqIDcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50VGFyZ2V0ID09PSBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlWWVhcihzZWxmLmN1cnJlbnRZZWFyIC0gZGVsdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGYuY29uZmlnLmVuYWJsZVRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNUaW1lT2JqICYmIHNlbGYuaG91ckVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5ob3VyRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGltZShlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2RlYm91bmNlZENoYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVGltZU9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1zID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaG91ckVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5taW51dGVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFtUE0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChzZWxmLnBsdWdpbkVsZW1lbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBlbGVtcy5pbmRleE9mKGV2ZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlbGVtc1tpICsgKGUuc2hpZnRLZXkgPyAtMSA6IDEpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldCB8fCBzZWxmLl9pbnB1dCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghc2VsZi5jb25maWcubm9DYWxlbmRhciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXlzQ29udGFpbmVyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRheXNDb250YWluZXIuY29udGFpbnMoZXZlbnRUYXJnZXQpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9pbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmFtUE0gIT09IHVuZGVmaW5lZCAmJiBldmVudFRhcmdldCA9PT0gc2VsZi5hbVBNKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSBzZWxmLmwxMG4uYW1QTVswXS5jaGFyQXQoMCk6XG4gICAgICAgICAgICAgICAgY2FzZSBzZWxmLmwxMG4uYW1QTVswXS5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKTpcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hbVBNLnRleHRDb250ZW50ID0gc2VsZi5sMTBuLmFtUE1bMF07XG4gICAgICAgICAgICAgICAgICAgIHNldEhvdXJzRnJvbUlucHV0cygpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHNlbGYubDEwbi5hbVBNWzFdLmNoYXJBdCgwKTpcbiAgICAgICAgICAgICAgICBjYXNlIHNlbGYubDEwbi5hbVBNWzFdLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpOlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFtUE0udGV4dENvbnRlbnQgPSBzZWxmLmwxMG4uYW1QTVsxXTtcbiAgICAgICAgICAgICAgICAgICAgc2V0SG91cnNGcm9tSW5wdXRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0lucHV0IHx8IGlzQ2FsZW5kYXJFbGVtKGV2ZW50VGFyZ2V0KSkge1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25LZXlEb3duXCIsIGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uTW91c2VPdmVyKGVsZW0sIGNlbGxDbGFzcykge1xuICAgICAgICBpZiAoY2VsbENsYXNzID09PSB2b2lkIDApIHsgY2VsbENsYXNzID0gXCJmbGF0cGlja3ItZGF5XCI7IH1cbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggIT09IDEgfHxcbiAgICAgICAgICAgIChlbGVtICYmXG4gICAgICAgICAgICAgICAgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhjZWxsQ2xhc3MpIHx8XG4gICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxhdHBpY2tyLWRpc2FibGVkXCIpKSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBob3ZlckRhdGUgPSBlbGVtXG4gICAgICAgICAgICA/IGVsZW0uZGF0ZU9iai5nZXRUaW1lKClcbiAgICAgICAgICAgIDogc2VsZi5kYXlzLmZpcnN0RWxlbWVudENoaWxkLmRhdGVPYmouZ2V0VGltZSgpLCBpbml0aWFsRGF0ZSA9IHNlbGYucGFyc2VEYXRlKHNlbGYuc2VsZWN0ZWREYXRlc1swXSwgdW5kZWZpbmVkLCB0cnVlKS5nZXRUaW1lKCksIHJhbmdlU3RhcnREYXRlID0gTWF0aC5taW4oaG92ZXJEYXRlLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMF0uZ2V0VGltZSgpKSwgcmFuZ2VFbmREYXRlID0gTWF0aC5tYXgoaG92ZXJEYXRlLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMF0uZ2V0VGltZSgpKTtcbiAgICAgICAgdmFyIGNvbnRhaW5zRGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIG1pblJhbmdlID0gMCwgbWF4UmFuZ2UgPSAwO1xuICAgICAgICBmb3IgKHZhciB0ID0gcmFuZ2VTdGFydERhdGU7IHQgPCByYW5nZUVuZERhdGU7IHQgKz0gZHVyYXRpb24uREFZKSB7XG4gICAgICAgICAgICBpZiAoIWlzRW5hYmxlZChuZXcgRGF0ZSh0KSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBjb250YWluc0Rpc2FibGVkID1cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbnNEaXNhYmxlZCB8fCAodCA+IHJhbmdlU3RhcnREYXRlICYmIHQgPCByYW5nZUVuZERhdGUpO1xuICAgICAgICAgICAgICAgIGlmICh0IDwgaW5pdGlhbERhdGUgJiYgKCFtaW5SYW5nZSB8fCB0ID4gbWluUmFuZ2UpKVxuICAgICAgICAgICAgICAgICAgICBtaW5SYW5nZSA9IHQ7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodCA+IGluaXRpYWxEYXRlICYmICghbWF4UmFuZ2UgfHwgdCA8IG1heFJhbmdlKSlcbiAgICAgICAgICAgICAgICAgICAgbWF4UmFuZ2UgPSB0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBob3ZlcmFibGVDZWxscyA9IEFycmF5LmZyb20oc2VsZi5yQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIqOm50aC1jaGlsZCgtbitcIiArIHNlbGYuY29uZmlnLnNob3dNb250aHMgKyBcIikgPiAuXCIgKyBjZWxsQ2xhc3MpKTtcbiAgICAgICAgaG92ZXJhYmxlQ2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoZGF5RWxlbSkge1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBkYXlFbGVtLmRhdGVPYmo7XG4gICAgICAgICAgICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgb3V0T2ZSYW5nZSA9IChtaW5SYW5nZSA+IDAgJiYgdGltZXN0YW1wIDwgbWluUmFuZ2UpIHx8XG4gICAgICAgICAgICAgICAgKG1heFJhbmdlID4gMCAmJiB0aW1lc3RhbXAgPiBtYXhSYW5nZSk7XG4gICAgICAgICAgICBpZiAob3V0T2ZSYW5nZSkge1xuICAgICAgICAgICAgICAgIGRheUVsZW0uY2xhc3NMaXN0LmFkZChcIm5vdEFsbG93ZWRcIik7XG4gICAgICAgICAgICAgICAgW1wiaW5SYW5nZVwiLCBcInN0YXJ0UmFuZ2VcIiwgXCJlbmRSYW5nZVwiXS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGRheUVsZW0uY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb250YWluc0Rpc2FibGVkICYmICFvdXRPZlJhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIFtcInN0YXJ0UmFuZ2VcIiwgXCJpblJhbmdlXCIsIFwiZW5kUmFuZ2VcIiwgXCJub3RBbGxvd2VkXCJdLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBkYXlFbGVtLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChlbGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtLmNsYXNzTGlzdC5hZGQoaG92ZXJEYXRlIDw9IHNlbGYuc2VsZWN0ZWREYXRlc1swXS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgPyBcInN0YXJ0UmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICA6IFwiZW5kUmFuZ2VcIik7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxEYXRlIDwgaG92ZXJEYXRlICYmIHRpbWVzdGFtcCA9PT0gaW5pdGlhbERhdGUpXG4gICAgICAgICAgICAgICAgICAgIGRheUVsZW0uY2xhc3NMaXN0LmFkZChcInN0YXJ0UmFuZ2VcIik7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5pdGlhbERhdGUgPiBob3ZlckRhdGUgJiYgdGltZXN0YW1wID09PSBpbml0aWFsRGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgZGF5RWxlbS5jbGFzc0xpc3QuYWRkKFwiZW5kUmFuZ2VcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVzdGFtcCA+PSBtaW5SYW5nZSAmJlxuICAgICAgICAgICAgICAgICAgICAobWF4UmFuZ2UgPT09IDAgfHwgdGltZXN0YW1wIDw9IG1heFJhbmdlKSAmJlxuICAgICAgICAgICAgICAgICAgICBpc0JldHdlZW4odGltZXN0YW1wLCBpbml0aWFsRGF0ZSwgaG92ZXJEYXRlKSlcbiAgICAgICAgICAgICAgICAgICAgZGF5RWxlbS5jbGFzc0xpc3QuYWRkKFwiaW5SYW5nZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uUmVzaXplKCkge1xuICAgICAgICBpZiAoc2VsZi5pc09wZW4gJiYgIXNlbGYuY29uZmlnLnN0YXRpYyAmJiAhc2VsZi5jb25maWcuaW5saW5lKVxuICAgICAgICAgICAgcG9zaXRpb25DYWxlbmRhcigpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvcGVuKGUsIHBvc2l0aW9uRWxlbWVudCkge1xuICAgICAgICBpZiAocG9zaXRpb25FbGVtZW50ID09PSB2b2lkIDApIHsgcG9zaXRpb25FbGVtZW50ID0gc2VsZi5fcG9zaXRpb25FbGVtZW50OyB9XG4gICAgICAgIGlmIChzZWxmLmlzTW9iaWxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRUYXJnZXQgPSBnZXRFdmVudFRhcmdldChlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUYXJnZXQuYmx1cigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLm1vYmlsZUlucHV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25PcGVuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNlbGYuX2lucHV0LmRpc2FibGVkIHx8IHNlbGYuY29uZmlnLmlubGluZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3YXNPcGVuID0gc2VsZi5pc09wZW47XG4gICAgICAgIHNlbGYuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgaWYgKCF3YXNPcGVuKSB7XG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuICAgICAgICAgICAgc2VsZi5faW5wdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uT3BlblwiKTtcbiAgICAgICAgICAgIHBvc2l0aW9uQ2FsZW5kYXIocG9zaXRpb25FbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5jb25maWcuZW5hYmxlVGltZSA9PT0gdHJ1ZSAmJiBzZWxmLmNvbmZpZy5ub0NhbGVuZGFyID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcuYWxsb3dJbnB1dCA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgICAgICAoZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgICAgICAgICFzZWxmLnRpbWVDb250YWluZXIuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuaG91ckVsZW1lbnQuc2VsZWN0KCk7IH0sIDUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtaW5NYXhEYXRlU2V0dGVyKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZU9iaiA9IChzZWxmLmNvbmZpZ1tcIl9cIiArIHR5cGUgKyBcIkRhdGVcIl0gPSBzZWxmLnBhcnNlRGF0ZShkYXRlLCBzZWxmLmNvbmZpZy5kYXRlRm9ybWF0KSk7XG4gICAgICAgICAgICB2YXIgaW52ZXJzZURhdGVPYmogPSBzZWxmLmNvbmZpZ1tcIl9cIiArICh0eXBlID09PSBcIm1pblwiID8gXCJtYXhcIiA6IFwibWluXCIpICsgXCJEYXRlXCJdO1xuICAgICAgICAgICAgaWYgKGRhdGVPYmogIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNlbGZbdHlwZSA9PT0gXCJtaW5cIiA/IFwibWluRGF0ZUhhc1RpbWVcIiA6IFwibWF4RGF0ZUhhc1RpbWVcIl0gPVxuICAgICAgICAgICAgICAgICAgICBkYXRlT2JqLmdldEhvdXJzKCkgPiAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlT2JqLmdldE1pbnV0ZXMoKSA+IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVPYmouZ2V0U2Vjb25kcygpID4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMgPSBzZWxmLnNlbGVjdGVkRGF0ZXMuZmlsdGVyKGZ1bmN0aW9uIChkKSB7IHJldHVybiBpc0VuYWJsZWQoZCk7IH0pO1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCAmJiB0eXBlID09PSBcIm1pblwiKVxuICAgICAgICAgICAgICAgICAgICBzZXRIb3Vyc0Zyb21EYXRlKGRhdGVPYmopO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVZhbHVlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZi5kYXlzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgcmVkcmF3KCk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGVPYmogIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhckVsZW1lbnRbdHlwZV0gPSBkYXRlT2JqLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY3VycmVudFllYXJFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSh0eXBlKTtcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudC5kaXNhYmxlZCA9XG4gICAgICAgICAgICAgICAgICAgICEhaW52ZXJzZURhdGVPYmogJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVPYmogIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgaW52ZXJzZURhdGVPYmouZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZU9iai5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZUNvbmZpZygpIHtcbiAgICAgICAgdmFyIGJvb2xPcHRzID0gW1xuICAgICAgICAgICAgXCJ3cmFwXCIsXG4gICAgICAgICAgICBcIndlZWtOdW1iZXJzXCIsXG4gICAgICAgICAgICBcImFsbG93SW5wdXRcIixcbiAgICAgICAgICAgIFwiYWxsb3dJbnZhbGlkUHJlbG9hZFwiLFxuICAgICAgICAgICAgXCJjbGlja09wZW5zXCIsXG4gICAgICAgICAgICBcInRpbWVfMjRoclwiLFxuICAgICAgICAgICAgXCJlbmFibGVUaW1lXCIsXG4gICAgICAgICAgICBcIm5vQ2FsZW5kYXJcIixcbiAgICAgICAgICAgIFwiYWx0SW5wdXRcIixcbiAgICAgICAgICAgIFwic2hvcnRoYW5kQ3VycmVudE1vbnRoXCIsXG4gICAgICAgICAgICBcImlubGluZVwiLFxuICAgICAgICAgICAgXCJzdGF0aWNcIixcbiAgICAgICAgICAgIFwiZW5hYmxlU2Vjb25kc1wiLFxuICAgICAgICAgICAgXCJkaXNhYmxlTW9iaWxlXCIsXG4gICAgICAgIF07XG4gICAgICAgIHZhciB1c2VyQ29uZmlnID0gX19hc3NpZ24oX19hc3NpZ24oe30sIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZWxlbWVudC5kYXRhc2V0IHx8IHt9KSkpLCBpbnN0YW5jZUNvbmZpZyk7XG4gICAgICAgIHZhciBmb3JtYXRzID0ge307XG4gICAgICAgIHNlbGYuY29uZmlnLnBhcnNlRGF0ZSA9IHVzZXJDb25maWcucGFyc2VEYXRlO1xuICAgICAgICBzZWxmLmNvbmZpZy5mb3JtYXREYXRlID0gdXNlckNvbmZpZy5mb3JtYXREYXRlO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5jb25maWcsIFwiZW5hYmxlXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5jb25maWcuX2VuYWJsZTsgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGRhdGVzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcuX2VuYWJsZSA9IHBhcnNlRGF0ZVJ1bGVzKGRhdGVzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5jb25maWcsIFwiZGlzYWJsZVwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuY29uZmlnLl9kaXNhYmxlOyB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5fZGlzYWJsZSA9IHBhcnNlRGF0ZVJ1bGVzKGRhdGVzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdGltZU1vZGUgPSB1c2VyQ29uZmlnLm1vZGUgPT09IFwidGltZVwiO1xuICAgICAgICBpZiAoIXVzZXJDb25maWcuZGF0ZUZvcm1hdCAmJiAodXNlckNvbmZpZy5lbmFibGVUaW1lIHx8IHRpbWVNb2RlKSkge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHREYXRlRm9ybWF0ID0gZmxhdHBpY2tyLmRlZmF1bHRDb25maWcuZGF0ZUZvcm1hdCB8fCBkZWZhdWx0T3B0aW9ucy5kYXRlRm9ybWF0O1xuICAgICAgICAgICAgZm9ybWF0cy5kYXRlRm9ybWF0ID1cbiAgICAgICAgICAgICAgICB1c2VyQ29uZmlnLm5vQ2FsZW5kYXIgfHwgdGltZU1vZGVcbiAgICAgICAgICAgICAgICAgICAgPyBcIkg6aVwiICsgKHVzZXJDb25maWcuZW5hYmxlU2Vjb25kcyA/IFwiOlNcIiA6IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdERhdGVGb3JtYXQgKyBcIiBIOmlcIiArICh1c2VyQ29uZmlnLmVuYWJsZVNlY29uZHMgPyBcIjpTXCIgOiBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNlckNvbmZpZy5hbHRJbnB1dCAmJlxuICAgICAgICAgICAgKHVzZXJDb25maWcuZW5hYmxlVGltZSB8fCB0aW1lTW9kZSkgJiZcbiAgICAgICAgICAgICF1c2VyQ29uZmlnLmFsdEZvcm1hdCkge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRBbHRGb3JtYXQgPSBmbGF0cGlja3IuZGVmYXVsdENvbmZpZy5hbHRGb3JtYXQgfHwgZGVmYXVsdE9wdGlvbnMuYWx0Rm9ybWF0O1xuICAgICAgICAgICAgZm9ybWF0cy5hbHRGb3JtYXQgPVxuICAgICAgICAgICAgICAgIHVzZXJDb25maWcubm9DYWxlbmRhciB8fCB0aW1lTW9kZVxuICAgICAgICAgICAgICAgICAgICA/IFwiaDppXCIgKyAodXNlckNvbmZpZy5lbmFibGVTZWNvbmRzID8gXCI6UyBLXCIgOiBcIiBLXCIpXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdEFsdEZvcm1hdCArIChcIiBoOmlcIiArICh1c2VyQ29uZmlnLmVuYWJsZVNlY29uZHMgPyBcIjpTXCIgOiBcIlwiKSArIFwiIEtcIik7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuY29uZmlnLCBcIm1pbkRhdGVcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLmNvbmZpZy5fbWluRGF0ZTsgfSxcbiAgICAgICAgICAgIHNldDogbWluTWF4RGF0ZVNldHRlcihcIm1pblwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLmNvbmZpZywgXCJtYXhEYXRlXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5jb25maWcuX21heERhdGU7IH0sXG4gICAgICAgICAgICBzZXQ6IG1pbk1heERhdGVTZXR0ZXIoXCJtYXhcIiksXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbWluTWF4VGltZVNldHRlciA9IGZ1bmN0aW9uICh0eXBlKSB7IHJldHVybiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBzZWxmLmNvbmZpZ1t0eXBlID09PSBcIm1pblwiID8gXCJfbWluVGltZVwiIDogXCJfbWF4VGltZVwiXSA9IHNlbGYucGFyc2VEYXRlKHZhbCwgXCJIOmk6U1wiKTtcbiAgICAgICAgfTsgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuY29uZmlnLCBcIm1pblRpbWVcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLmNvbmZpZy5fbWluVGltZTsgfSxcbiAgICAgICAgICAgIHNldDogbWluTWF4VGltZVNldHRlcihcIm1pblwiKSxcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLmNvbmZpZywgXCJtYXhUaW1lXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5jb25maWcuX21heFRpbWU7IH0sXG4gICAgICAgICAgICBzZXQ6IG1pbk1heFRpbWVTZXR0ZXIoXCJtYXhcIiksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodXNlckNvbmZpZy5tb2RlID09PSBcInRpbWVcIikge1xuICAgICAgICAgICAgc2VsZi5jb25maWcubm9DYWxlbmRhciA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5lbmFibGVUaW1lID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHNlbGYuY29uZmlnLCBmb3JtYXRzLCB1c2VyQ29uZmlnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib29sT3B0cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHNlbGYuY29uZmlnW2Jvb2xPcHRzW2ldXSA9XG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWdbYm9vbE9wdHNbaV1dID09PSB0cnVlIHx8XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnW2Jvb2xPcHRzW2ldXSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIEhPT0tTLmZpbHRlcihmdW5jdGlvbiAoaG9vaykgeyByZXR1cm4gc2VsZi5jb25maWdbaG9va10gIT09IHVuZGVmaW5lZDsgfSkuZm9yRWFjaChmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICAgICAgc2VsZi5jb25maWdbaG9va10gPSBhcnJheWlmeShzZWxmLmNvbmZpZ1tob29rXSB8fCBbXSkubWFwKGJpbmRUb0luc3RhbmNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuaXNNb2JpbGUgPVxuICAgICAgICAgICAgIXNlbGYuY29uZmlnLmRpc2FibGVNb2JpbGUgJiZcbiAgICAgICAgICAgICAgICAhc2VsZi5jb25maWcuaW5saW5lICYmXG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcubW9kZSA9PT0gXCJzaW5nbGVcIiAmJlxuICAgICAgICAgICAgICAgICFzZWxmLmNvbmZpZy5kaXNhYmxlLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgICFzZWxmLmNvbmZpZy5lbmFibGUgJiZcbiAgICAgICAgICAgICAgICAhc2VsZi5jb25maWcud2Vla051bWJlcnMgJiZcbiAgICAgICAgICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5jb25maWcucGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBsdWdpbkNvbmYgPSBzZWxmLmNvbmZpZy5wbHVnaW5zW2ldKHNlbGYpIHx8IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHBsdWdpbkNvbmYpIHtcbiAgICAgICAgICAgICAgICBpZiAoSE9PS1MuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWdba2V5XSA9IGFycmF5aWZ5KHBsdWdpbkNvbmZba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoYmluZFRvSW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHNlbGYuY29uZmlnW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdXNlckNvbmZpZ1trZXldID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZ1trZXldID0gcGx1Z2luQ29uZltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdXNlckNvbmZpZy5hbHRJbnB1dENsYXNzKSB7XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5hbHRJbnB1dENsYXNzID1cbiAgICAgICAgICAgICAgICBnZXRJbnB1dEVsZW0oKS5jbGFzc05hbWUgKyBcIiBcIiArIHNlbGYuY29uZmlnLmFsdElucHV0Q2xhc3M7XG4gICAgICAgIH1cbiAgICAgICAgdHJpZ2dlckV2ZW50KFwib25QYXJzZUNvbmZpZ1wiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0SW5wdXRFbGVtKCkge1xuICAgICAgICByZXR1cm4gc2VsZi5jb25maWcud3JhcFxuICAgICAgICAgICAgPyBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1pbnB1dF1cIilcbiAgICAgICAgICAgIDogZWxlbWVudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0dXBMb2NhbGUoKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5jb25maWcubG9jYWxlICE9PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICB0eXBlb2YgZmxhdHBpY2tyLmwxMG5zW3NlbGYuY29uZmlnLmxvY2FsZV0gPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5lcnJvckhhbmRsZXIobmV3IEVycm9yKFwiZmxhdHBpY2tyOiBpbnZhbGlkIGxvY2FsZSBcIiArIHNlbGYuY29uZmlnLmxvY2FsZSkpO1xuICAgICAgICBzZWxmLmwxMG4gPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZmxhdHBpY2tyLmwxMG5zLmRlZmF1bHQpLCAodHlwZW9mIHNlbGYuY29uZmlnLmxvY2FsZSA9PT0gXCJvYmplY3RcIlxuICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5sb2NhbGVcbiAgICAgICAgICAgIDogc2VsZi5jb25maWcubG9jYWxlICE9PSBcImRlZmF1bHRcIlxuICAgICAgICAgICAgICAgID8gZmxhdHBpY2tyLmwxMG5zW3NlbGYuY29uZmlnLmxvY2FsZV1cbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCkpO1xuICAgICAgICB0b2tlblJlZ2V4LkQgPSBcIihcIiArIHNlbGYubDEwbi53ZWVrZGF5cy5zaG9ydGhhbmQuam9pbihcInxcIikgKyBcIilcIjtcbiAgICAgICAgdG9rZW5SZWdleC5sID0gXCIoXCIgKyBzZWxmLmwxMG4ud2Vla2RheXMubG9uZ2hhbmQuam9pbihcInxcIikgKyBcIilcIjtcbiAgICAgICAgdG9rZW5SZWdleC5NID0gXCIoXCIgKyBzZWxmLmwxMG4ubW9udGhzLnNob3J0aGFuZC5qb2luKFwifFwiKSArIFwiKVwiO1xuICAgICAgICB0b2tlblJlZ2V4LkYgPSBcIihcIiArIHNlbGYubDEwbi5tb250aHMubG9uZ2hhbmQuam9pbihcInxcIikgKyBcIilcIjtcbiAgICAgICAgdG9rZW5SZWdleC5LID0gXCIoXCIgKyBzZWxmLmwxMG4uYW1QTVswXSArIFwifFwiICsgc2VsZi5sMTBuLmFtUE1bMV0gKyBcInxcIiArIHNlbGYubDEwbi5hbVBNWzBdLnRvTG93ZXJDYXNlKCkgKyBcInxcIiArIHNlbGYubDEwbi5hbVBNWzFdLnRvTG93ZXJDYXNlKCkgKyBcIilcIjtcbiAgICAgICAgdmFyIHVzZXJDb25maWcgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgaW5zdGFuY2VDb25maWcpLCBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVsZW1lbnQuZGF0YXNldCB8fCB7fSkpKTtcbiAgICAgICAgaWYgKHVzZXJDb25maWcudGltZV8yNGhyID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGZsYXRwaWNrci5kZWZhdWx0Q29uZmlnLnRpbWVfMjRociA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy50aW1lXzI0aHIgPSBzZWxmLmwxMG4udGltZV8yNGhyO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuZm9ybWF0RGF0ZSA9IGNyZWF0ZURhdGVGb3JtYXR0ZXIoc2VsZik7XG4gICAgICAgIHNlbGYucGFyc2VEYXRlID0gY3JlYXRlRGF0ZVBhcnNlcih7IGNvbmZpZzogc2VsZi5jb25maWcsIGwxMG46IHNlbGYubDEwbiB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG9zaXRpb25DYWxlbmRhcihjdXN0b21Qb3NpdGlvbkVsZW1lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmLmNvbmZpZy5wb3NpdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCBzZWxmLmNvbmZpZy5wb3NpdGlvbihzZWxmLCBjdXN0b21Qb3NpdGlvbkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmNhbGVuZGFyQ29udGFpbmVyID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRyaWdnZXJFdmVudChcIm9uUHJlQ2FsZW5kYXJQb3NpdGlvblwiKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uRWxlbWVudCA9IGN1c3RvbVBvc2l0aW9uRWxlbWVudCB8fCBzZWxmLl9wb3NpdGlvbkVsZW1lbnQ7XG4gICAgICAgIHZhciBjYWxlbmRhckhlaWdodCA9IEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChzZWxmLmNhbGVuZGFyQ29udGFpbmVyLmNoaWxkcmVuLCAoZnVuY3Rpb24gKGFjYywgY2hpbGQpIHsgcmV0dXJuIGFjYyArIGNoaWxkLm9mZnNldEhlaWdodDsgfSksIDApLCBjYWxlbmRhcldpZHRoID0gc2VsZi5jYWxlbmRhckNvbnRhaW5lci5vZmZzZXRXaWR0aCwgY29uZmlnUG9zID0gc2VsZi5jb25maWcucG9zaXRpb24uc3BsaXQoXCIgXCIpLCBjb25maWdQb3NWZXJ0aWNhbCA9IGNvbmZpZ1Bvc1swXSwgY29uZmlnUG9zSG9yaXpvbnRhbCA9IGNvbmZpZ1Bvcy5sZW5ndGggPiAxID8gY29uZmlnUG9zWzFdIDogbnVsbCwgaW5wdXRCb3VuZHMgPSBwb3NpdGlvbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGRpc3RhbmNlRnJvbUJvdHRvbSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGlucHV0Qm91bmRzLmJvdHRvbSwgc2hvd09uVG9wID0gY29uZmlnUG9zVmVydGljYWwgPT09IFwiYWJvdmVcIiB8fFxuICAgICAgICAgICAgKGNvbmZpZ1Bvc1ZlcnRpY2FsICE9PSBcImJlbG93XCIgJiZcbiAgICAgICAgICAgICAgICBkaXN0YW5jZUZyb21Cb3R0b20gPCBjYWxlbmRhckhlaWdodCAmJlxuICAgICAgICAgICAgICAgIGlucHV0Qm91bmRzLnRvcCA+IGNhbGVuZGFySGVpZ2h0KTtcbiAgICAgICAgdmFyIHRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCArXG4gICAgICAgICAgICBpbnB1dEJvdW5kcy50b3AgK1xuICAgICAgICAgICAgKCFzaG93T25Ub3AgPyBwb3NpdGlvbkVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgMiA6IC1jYWxlbmRhckhlaWdodCAtIDIpO1xuICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcImFycm93VG9wXCIsICFzaG93T25Ub3ApO1xuICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcImFycm93Qm90dG9tXCIsIHNob3dPblRvcCk7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5pbmxpbmUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBsZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0ICsgaW5wdXRCb3VuZHMubGVmdDtcbiAgICAgICAgdmFyIGlzQ2VudGVyID0gZmFsc2U7XG4gICAgICAgIHZhciBpc1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgIGlmIChjb25maWdQb3NIb3Jpem9udGFsID09PSBcImNlbnRlclwiKSB7XG4gICAgICAgICAgICBsZWZ0IC09IChjYWxlbmRhcldpZHRoIC0gaW5wdXRCb3VuZHMud2lkdGgpIC8gMjtcbiAgICAgICAgICAgIGlzQ2VudGVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWdQb3NIb3Jpem9udGFsID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgIGxlZnQgLT0gY2FsZW5kYXJXaWR0aCAtIGlucHV0Qm91bmRzLndpZHRoO1xuICAgICAgICAgICAgaXNSaWdodCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJhcnJvd0xlZnRcIiwgIWlzQ2VudGVyICYmICFpc1JpZ2h0KTtcbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJhcnJvd0NlbnRlclwiLCBpc0NlbnRlcik7XG4gICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwiYXJyb3dSaWdodFwiLCBpc1JpZ2h0KTtcbiAgICAgICAgdmFyIHJpZ2h0ID0gd2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLVxuICAgICAgICAgICAgKHdpbmRvdy5wYWdlWE9mZnNldCArIGlucHV0Qm91bmRzLnJpZ2h0KTtcbiAgICAgICAgdmFyIHJpZ2h0TW9zdCA9IGxlZnQgKyBjYWxlbmRhcldpZHRoID4gd2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGg7XG4gICAgICAgIHZhciBjZW50ZXJNb3N0ID0gcmlnaHQgKyBjYWxlbmRhcldpZHRoID4gd2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwicmlnaHRNb3N0XCIsIHJpZ2h0TW9zdCk7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5zdGF0aWMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xuICAgICAgICBpZiAoIXJpZ2h0TW9zdCkge1xuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbGVmdCArIFwicHhcIjtcbiAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUucmlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghY2VudGVyTW9zdCkge1xuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCJhdXRvXCI7XG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gcmlnaHQgKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZG9jID0gZ2V0RG9jdW1lbnRTdHlsZVNoZWV0KCk7XG4gICAgICAgICAgICBpZiAoZG9jID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGJvZHlXaWR0aCA9IHdpbmRvdy5kb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgdmFyIGNlbnRlckxlZnQgPSBNYXRoLm1heCgwLCBib2R5V2lkdGggLyAyIC0gY2FsZW5kYXJXaWR0aCAvIDIpO1xuICAgICAgICAgICAgdmFyIGNlbnRlckJlZm9yZSA9IFwiLmZsYXRwaWNrci1jYWxlbmRhci5jZW50ZXJNb3N0OmJlZm9yZVwiO1xuICAgICAgICAgICAgdmFyIGNlbnRlckFmdGVyID0gXCIuZmxhdHBpY2tyLWNhbGVuZGFyLmNlbnRlck1vc3Q6YWZ0ZXJcIjtcbiAgICAgICAgICAgIHZhciBjZW50ZXJJbmRleCA9IGRvYy5jc3NSdWxlcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY2VudGVyU3R5bGUgPSBcIntsZWZ0OlwiICsgaW5wdXRCb3VuZHMubGVmdCArIFwicHg7cmlnaHQ6YXV0bzt9XCI7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcInJpZ2h0TW9zdFwiLCBmYWxzZSk7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcImNlbnRlck1vc3RcIiwgdHJ1ZSk7XG4gICAgICAgICAgICBkb2MuaW5zZXJ0UnVsZShjZW50ZXJCZWZvcmUgKyBcIixcIiArIGNlbnRlckFmdGVyICsgY2VudGVyU3R5bGUsIGNlbnRlckluZGV4KTtcbiAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUubGVmdCA9IGNlbnRlckxlZnQgKyBcInB4XCI7XG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gXCJhdXRvXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RG9jdW1lbnRTdHlsZVNoZWV0KCkge1xuICAgICAgICB2YXIgZWRpdGFibGVTaGVldCA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnQuc3R5bGVTaGVldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzaGVldCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzW2ldO1xuICAgICAgICAgICAgaWYgKCFzaGVldC5jc3NSdWxlcylcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2hlZXQuY3NzUnVsZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlZGl0YWJsZVNoZWV0ID0gc2hlZXQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWRpdGFibGVTaGVldCAhPSBudWxsID8gZWRpdGFibGVTaGVldCA6IGNyZWF0ZVN0eWxlU2hlZXQoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlU3R5bGVTaGVldCgpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgcmV0dXJuIHN0eWxlLnNoZWV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWRyYXcoKSB7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5ub0NhbGVuZGFyIHx8IHNlbGYuaXNNb2JpbGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGJ1aWxkTW9udGhTd2l0Y2goKTtcbiAgICAgICAgdXBkYXRlTmF2aWdhdGlvbkN1cnJlbnRNb250aCgpO1xuICAgICAgICBidWlsZERheXMoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZm9jdXNBbmRDbG9zZSgpIHtcbiAgICAgICAgc2VsZi5faW5wdXQuZm9jdXMoKTtcbiAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpICE9PSAtMSB8fFxuICAgICAgICAgICAgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChzZWxmLmNsb3NlLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzZWxlY3REYXRlKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB2YXIgaXNTZWxlY3RhYmxlID0gZnVuY3Rpb24gKGRheSkge1xuICAgICAgICAgICAgcmV0dXJuIGRheS5jbGFzc0xpc3QgJiZcbiAgICAgICAgICAgICAgICBkYXkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxhdHBpY2tyLWRheVwiKSAmJlxuICAgICAgICAgICAgICAgICFkYXkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxhdHBpY2tyLWRpc2FibGVkXCIpICYmXG4gICAgICAgICAgICAgICAgIWRheS5jbGFzc0xpc3QuY29udGFpbnMoXCJub3RBbGxvd2VkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgdCA9IGZpbmRQYXJlbnQoZ2V0RXZlbnRUYXJnZXQoZSksIGlzU2VsZWN0YWJsZSk7XG4gICAgICAgIGlmICh0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB0YXJnZXQgPSB0O1xuICAgICAgICB2YXIgc2VsZWN0ZWREYXRlID0gKHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqID0gbmV3IERhdGUodGFyZ2V0LmRhdGVPYmouZ2V0VGltZSgpKSk7XG4gICAgICAgIHZhciBzaG91bGRDaGFuZ2VNb250aCA9IChzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSA8IHNlbGYuY3VycmVudE1vbnRoIHx8XG4gICAgICAgICAgICBzZWxlY3RlZERhdGUuZ2V0TW9udGgoKSA+XG4gICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50TW9udGggKyBzZWxmLmNvbmZpZy5zaG93TW9udGhzIC0gMSkgJiZcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1vZGUgIT09IFwicmFuZ2VcIjtcbiAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVFbGVtID0gdGFyZ2V0O1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJzaW5nbGVcIilcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcyA9IFtzZWxlY3RlZERhdGVdO1xuICAgICAgICBlbHNlIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcIm11bHRpcGxlXCIpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEluZGV4ID0gaXNEYXRlU2VsZWN0ZWQoc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4KVxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcy5zcGxpY2UocGFyc2VJbnQoc2VsZWN0ZWRJbmRleCksIDEpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcy5wdXNoKHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKSB7XG4gICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIHNlbGYuY2xlYXIoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqID0gc2VsZWN0ZWREYXRlO1xuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLnB1c2goc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgICAgIGlmIChjb21wYXJlRGF0ZXMoc2VsZWN0ZWREYXRlLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMF0sIHRydWUpICE9PSAwKVxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmdldFRpbWUoKSAtIGIuZ2V0VGltZSgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRIb3Vyc0Zyb21JbnB1dHMoKTtcbiAgICAgICAgaWYgKHNob3VsZENoYW5nZU1vbnRoKSB7XG4gICAgICAgICAgICB2YXIgaXNOZXdZZWFyID0gc2VsZi5jdXJyZW50WWVhciAhPT0gc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID0gc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgaWYgKGlzTmV3WWVhcikge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uWWVhckNoYW5nZVwiKTtcbiAgICAgICAgICAgICAgICBidWlsZE1vbnRoU3dpdGNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbk1vbnRoQ2hhbmdlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZU5hdmlnYXRpb25DdXJyZW50TW9udGgoKTtcbiAgICAgICAgYnVpbGREYXlzKCk7XG4gICAgICAgIHVwZGF0ZVZhbHVlKCk7XG4gICAgICAgIGlmICghc2hvdWxkQ2hhbmdlTW9udGggJiZcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1vZGUgIT09IFwicmFuZ2VcIiAmJlxuICAgICAgICAgICAgc2VsZi5jb25maWcuc2hvd01vbnRocyA9PT0gMSlcbiAgICAgICAgICAgIGZvY3VzT25EYXlFbGVtKHRhcmdldCk7XG4gICAgICAgIGVsc2UgaWYgKHNlbGYuc2VsZWN0ZWREYXRlRWxlbSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBzZWxmLmhvdXJFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlRWxlbSAmJiBzZWxmLnNlbGVjdGVkRGF0ZUVsZW0uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5ob3VyRWxlbWVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2VsZi5ob3VyRWxlbWVudCAhPT0gdW5kZWZpbmVkICYmIHNlbGYuaG91ckVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgICAgICAgIHZhciBzaW5nbGUgPSBzZWxmLmNvbmZpZy5tb2RlID09PSBcInNpbmdsZVwiICYmICFzZWxmLmNvbmZpZy5lbmFibGVUaW1lO1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiICYmXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PT0gMiAmJlxuICAgICAgICAgICAgICAgICFzZWxmLmNvbmZpZy5lbmFibGVUaW1lO1xuICAgICAgICAgICAgaWYgKHNpbmdsZSB8fCByYW5nZSkge1xuICAgICAgICAgICAgICAgIGZvY3VzQW5kQ2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmlnZ2VyQ2hhbmdlKCk7XG4gICAgfVxuICAgIHZhciBDQUxMQkFDS1MgPSB7XG4gICAgICAgIGxvY2FsZTogW3NldHVwTG9jYWxlLCB1cGRhdGVXZWVrZGF5c10sXG4gICAgICAgIHNob3dNb250aHM6IFtidWlsZE1vbnRocywgc2V0Q2FsZW5kYXJXaWR0aCwgYnVpbGRXZWVrZGF5c10sXG4gICAgICAgIG1pbkRhdGU6IFtqdW1wVG9EYXRlXSxcbiAgICAgICAgbWF4RGF0ZTogW2p1bXBUb0RhdGVdLFxuICAgICAgICBwb3NpdGlvbkVsZW1lbnQ6IFt1cGRhdGVQb3NpdGlvbkVsZW1lbnRdLFxuICAgICAgICBjbGlja09wZW5zOiBbXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmNsaWNrT3BlbnMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYmluZChzZWxmLl9pbnB1dCwgXCJmb2N1c1wiLCBzZWxmLm9wZW4pO1xuICAgICAgICAgICAgICAgICAgICBiaW5kKHNlbGYuX2lucHV0LCBcImNsaWNrXCIsIHNlbGYub3Blbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgc2VsZi5vcGVuKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5faW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGYub3Blbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHNldChvcHRpb24sIHZhbHVlKSB7XG4gICAgICAgIGlmIChvcHRpb24gIT09IG51bGwgJiYgdHlwZW9mIG9wdGlvbiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzZWxmLmNvbmZpZywgb3B0aW9uKTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0FMTEJBQ0tTW2tleV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgQ0FMTEJBQ0tTW2tleV0uZm9yRWFjaChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCgpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuY29uZmlnW29wdGlvbl0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChDQUxMQkFDS1Nbb3B0aW9uXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIENBTExCQUNLU1tvcHRpb25dLmZvckVhY2goZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgoKTsgfSk7XG4gICAgICAgICAgICBlbHNlIGlmIChIT09LUy5pbmRleE9mKG9wdGlvbikgPiAtMSlcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZ1tvcHRpb25dID0gYXJyYXlpZnkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYucmVkcmF3KCk7XG4gICAgICAgIHVwZGF0ZVZhbHVlKHRydWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRTZWxlY3RlZERhdGUoaW5wdXREYXRlLCBmb3JtYXQpIHtcbiAgICAgICAgdmFyIGRhdGVzID0gW107XG4gICAgICAgIGlmIChpbnB1dERhdGUgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIGRhdGVzID0gaW5wdXREYXRlLm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4gc2VsZi5wYXJzZURhdGUoZCwgZm9ybWF0KTsgfSk7XG4gICAgICAgIGVsc2UgaWYgKGlucHV0RGF0ZSBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIGlucHV0RGF0ZSA9PT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIGRhdGVzID0gW3NlbGYucGFyc2VEYXRlKGlucHV0RGF0ZSwgZm9ybWF0KV07XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBpbnB1dERhdGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5jb25maWcubW9kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzaW5nbGVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidGltZVwiOlxuICAgICAgICAgICAgICAgICAgICBkYXRlcyA9IFtzZWxmLnBhcnNlRGF0ZShpbnB1dERhdGUsIGZvcm1hdCldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibXVsdGlwbGVcIjpcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXMgPSBpbnB1dERhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChzZWxmLmNvbmZpZy5jb25qdW5jdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHNlbGYucGFyc2VEYXRlKGRhdGUsIGZvcm1hdCk7IH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicmFuZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXMgPSBpbnB1dERhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChzZWxmLmwxMG4ucmFuZ2VTZXBhcmF0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBzZWxmLnBhcnNlRGF0ZShkYXRlLCBmb3JtYXQpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2VsZi5jb25maWcuZXJyb3JIYW5kbGVyKG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBzdXBwbGllZDogXCIgKyBKU09OLnN0cmluZ2lmeShpbnB1dERhdGUpKSk7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcyA9IChzZWxmLmNvbmZpZy5hbGxvd0ludmFsaWRQcmVsb2FkXG4gICAgICAgICAgICA/IGRhdGVzXG4gICAgICAgICAgICA6IGRhdGVzLmZpbHRlcihmdW5jdGlvbiAoZCkgeyByZXR1cm4gZCBpbnN0YW5jZW9mIERhdGUgJiYgaXNFbmFibGVkKGQsIGZhbHNlKTsgfSkpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKVxuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuZ2V0VGltZSgpIC0gYi5nZXRUaW1lKCk7IH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXREYXRlKGRhdGUsIHRyaWdnZXJDaGFuZ2UsIGZvcm1hdCkge1xuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSA9PT0gdm9pZCAwKSB7IHRyaWdnZXJDaGFuZ2UgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoZm9ybWF0ID09PSB2b2lkIDApIHsgZm9ybWF0ID0gc2VsZi5jb25maWcuZGF0ZUZvcm1hdDsgfVxuICAgICAgICBpZiAoKGRhdGUgIT09IDAgJiYgIWRhdGUpIHx8IChkYXRlIGluc3RhbmNlb2YgQXJyYXkgJiYgZGF0ZS5sZW5ndGggPT09IDApKVxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuY2xlYXIodHJpZ2dlckNoYW5nZSk7XG4gICAgICAgIHNldFNlbGVjdGVkRGF0ZShkYXRlLCBmb3JtYXQpO1xuICAgICAgICBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiA9XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXNbc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICBzZWxmLnJlZHJhdygpO1xuICAgICAgICBqdW1wVG9EYXRlKHVuZGVmaW5lZCwgdHJpZ2dlckNoYW5nZSk7XG4gICAgICAgIHNldEhvdXJzRnJvbURhdGUoKTtcbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNlbGYuY2xlYXIoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZVZhbHVlKHRyaWdnZXJDaGFuZ2UpO1xuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSlcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uQ2hhbmdlXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZURhdGVSdWxlcyhhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFyclxuICAgICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gXCJzdHJpbmdcIiB8fFxuICAgICAgICAgICAgICAgIHR5cGVvZiBydWxlID09PSBcIm51bWJlclwiIHx8XG4gICAgICAgICAgICAgICAgcnVsZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5wYXJzZURhdGUocnVsZSwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHJ1bGUgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgcnVsZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgICAgIHJ1bGUuZnJvbSAmJlxuICAgICAgICAgICAgICAgIHJ1bGUudG8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogc2VsZi5wYXJzZURhdGUocnVsZS5mcm9tLCB1bmRlZmluZWQpLFxuICAgICAgICAgICAgICAgICAgICB0bzogc2VsZi5wYXJzZURhdGUocnVsZS50bywgdW5kZWZpbmVkKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHJ1bGU7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4OyB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0dXBEYXRlcygpIHtcbiAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzID0gW107XG4gICAgICAgIHNlbGYubm93ID0gc2VsZi5wYXJzZURhdGUoc2VsZi5jb25maWcubm93KSB8fCBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgcHJlbG9hZGVkRGF0ZSA9IHNlbGYuY29uZmlnLmRlZmF1bHREYXRlIHx8XG4gICAgICAgICAgICAoKHNlbGYuaW5wdXQubm9kZU5hbWUgPT09IFwiSU5QVVRcIiB8fFxuICAgICAgICAgICAgICAgIHNlbGYuaW5wdXQubm9kZU5hbWUgPT09IFwiVEVYVEFSRUFcIikgJiZcbiAgICAgICAgICAgICAgICBzZWxmLmlucHV0LnBsYWNlaG9sZGVyICYmXG4gICAgICAgICAgICAgICAgc2VsZi5pbnB1dC52YWx1ZSA9PT0gc2VsZi5pbnB1dC5wbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgID8gbnVsbFxuICAgICAgICAgICAgICAgIDogc2VsZi5pbnB1dC52YWx1ZSk7XG4gICAgICAgIGlmIChwcmVsb2FkZWREYXRlKVxuICAgICAgICAgICAgc2V0U2VsZWN0ZWREYXRlKHByZWxvYWRlZERhdGUsIHNlbGYuY29uZmlnLmRhdGVGb3JtYXQpO1xuICAgICAgICBzZWxmLl9pbml0aWFsRGF0ZSA9XG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgID8gc2VsZi5zZWxlY3RlZERhdGVzWzBdXG4gICAgICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5taW5EYXRlICYmXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0VGltZSgpID4gc2VsZi5ub3cuZ2V0VGltZSgpXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcubWluRGF0ZVxuICAgICAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLm1heERhdGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1heERhdGUuZ2V0VGltZSgpIDwgc2VsZi5ub3cuZ2V0VGltZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLm1heERhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc2VsZi5ub3c7XG4gICAgICAgIHNlbGYuY3VycmVudFllYXIgPSBzZWxmLl9pbml0aWFsRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IHNlbGYuX2luaXRpYWxEYXRlLmdldE1vbnRoKCk7XG4gICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqID0gc2VsZi5zZWxlY3RlZERhdGVzWzBdO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubWluVGltZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2VsZi5jb25maWcubWluVGltZSA9IHNlbGYucGFyc2VEYXRlKHNlbGYuY29uZmlnLm1pblRpbWUsIFwiSDppXCIpO1xuICAgICAgICBpZiAoc2VsZi5jb25maWcubWF4VGltZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2VsZi5jb25maWcubWF4VGltZSA9IHNlbGYucGFyc2VEYXRlKHNlbGYuY29uZmlnLm1heFRpbWUsIFwiSDppXCIpO1xuICAgICAgICBzZWxmLm1pbkRhdGVIYXNUaW1lID1cbiAgICAgICAgICAgICEhc2VsZi5jb25maWcubWluRGF0ZSAmJlxuICAgICAgICAgICAgICAgIChzZWxmLmNvbmZpZy5taW5EYXRlLmdldEhvdXJzKCkgPiAwIHx8XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0TWludXRlcygpID4gMCB8fFxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5taW5EYXRlLmdldFNlY29uZHMoKSA+IDApO1xuICAgICAgICBzZWxmLm1heERhdGVIYXNUaW1lID1cbiAgICAgICAgICAgICEhc2VsZi5jb25maWcubWF4RGF0ZSAmJlxuICAgICAgICAgICAgICAgIChzZWxmLmNvbmZpZy5tYXhEYXRlLmdldEhvdXJzKCkgPiAwIHx8XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1heERhdGUuZ2V0TWludXRlcygpID4gMCB8fFxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5tYXhEYXRlLmdldFNlY29uZHMoKSA+IDApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXR1cElucHV0cygpIHtcbiAgICAgICAgc2VsZi5pbnB1dCA9IGdldElucHV0RWxlbSgpO1xuICAgICAgICBpZiAoIXNlbGYuaW5wdXQpIHtcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLmVycm9ySGFuZGxlcihuZXcgRXJyb3IoXCJJbnZhbGlkIGlucHV0IGVsZW1lbnQgc3BlY2lmaWVkXCIpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmlucHV0Ll90eXBlID0gc2VsZi5pbnB1dC50eXBlO1xuICAgICAgICBzZWxmLmlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgc2VsZi5pbnB1dC5jbGFzc0xpc3QuYWRkKFwiZmxhdHBpY2tyLWlucHV0XCIpO1xuICAgICAgICBzZWxmLl9pbnB1dCA9IHNlbGYuaW5wdXQ7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5hbHRJbnB1dCkge1xuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoc2VsZi5pbnB1dC5ub2RlTmFtZSwgc2VsZi5jb25maWcuYWx0SW5wdXRDbGFzcyk7XG4gICAgICAgICAgICBzZWxmLl9pbnB1dCA9IHNlbGYuYWx0SW5wdXQ7XG4gICAgICAgICAgICBzZWxmLmFsdElucHV0LnBsYWNlaG9sZGVyID0gc2VsZi5pbnB1dC5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQuZGlzYWJsZWQgPSBzZWxmLmlucHV0LmRpc2FibGVkO1xuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dC5yZXF1aXJlZCA9IHNlbGYuaW5wdXQucmVxdWlyZWQ7XG4gICAgICAgICAgICBzZWxmLmFsdElucHV0LnRhYkluZGV4ID0gc2VsZi5pbnB1dC50YWJJbmRleDtcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICAgICAgc2VsZi5pbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5zdGF0aWMgJiYgc2VsZi5pbnB1dC5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgIHNlbGYuaW5wdXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2VsZi5hbHRJbnB1dCwgc2VsZi5pbnB1dC5uZXh0U2libGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5hbGxvd0lucHV0KVxuICAgICAgICAgICAgc2VsZi5faW5wdXQuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgXCJyZWFkb25seVwiKTtcbiAgICAgICAgdXBkYXRlUG9zaXRpb25FbGVtZW50KCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uRWxlbWVudCgpIHtcbiAgICAgICAgc2VsZi5fcG9zaXRpb25FbGVtZW50ID0gc2VsZi5jb25maWcucG9zaXRpb25FbGVtZW50IHx8IHNlbGYuX2lucHV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXR1cE1vYmlsZSgpIHtcbiAgICAgICAgdmFyIGlucHV0VHlwZSA9IHNlbGYuY29uZmlnLmVuYWJsZVRpbWVcbiAgICAgICAgICAgID8gc2VsZi5jb25maWcubm9DYWxlbmRhclxuICAgICAgICAgICAgICAgID8gXCJ0aW1lXCJcbiAgICAgICAgICAgICAgICA6IFwiZGF0ZXRpbWUtbG9jYWxcIlxuICAgICAgICAgICAgOiBcImRhdGVcIjtcbiAgICAgICAgc2VsZi5tb2JpbGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCBzZWxmLmlucHV0LmNsYXNzTmFtZSArIFwiIGZsYXRwaWNrci1tb2JpbGVcIik7XG4gICAgICAgIHNlbGYubW9iaWxlSW5wdXQudGFiSW5kZXggPSAxO1xuICAgICAgICBzZWxmLm1vYmlsZUlucHV0LnR5cGUgPSBpbnB1dFR5cGU7XG4gICAgICAgIHNlbGYubW9iaWxlSW5wdXQuZGlzYWJsZWQgPSBzZWxmLmlucHV0LmRpc2FibGVkO1xuICAgICAgICBzZWxmLm1vYmlsZUlucHV0LnJlcXVpcmVkID0gc2VsZi5pbnB1dC5yZXF1aXJlZDtcbiAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC5wbGFjZWhvbGRlciA9IHNlbGYuaW5wdXQucGxhY2Vob2xkZXI7XG4gICAgICAgIHNlbGYubW9iaWxlRm9ybWF0U3RyID1cbiAgICAgICAgICAgIGlucHV0VHlwZSA9PT0gXCJkYXRldGltZS1sb2NhbFwiXG4gICAgICAgICAgICAgICAgPyBcIlktbS1kXFxcXFRIOmk6U1wiXG4gICAgICAgICAgICAgICAgOiBpbnB1dFR5cGUgPT09IFwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgID8gXCJZLW0tZFwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJIOmk6U1wiO1xuICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQuZGVmYXVsdFZhbHVlID0gc2VsZi5tb2JpbGVJbnB1dC52YWx1ZSA9IHNlbGYuZm9ybWF0RGF0ZShzZWxmLnNlbGVjdGVkRGF0ZXNbMF0sIHNlbGYubW9iaWxlRm9ybWF0U3RyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5jb25maWcubWluRGF0ZSlcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQubWluID0gc2VsZi5mb3JtYXREYXRlKHNlbGYuY29uZmlnLm1pbkRhdGUsIFwiWS1tLWRcIik7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tYXhEYXRlKVxuICAgICAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC5tYXggPSBzZWxmLmZvcm1hdERhdGUoc2VsZi5jb25maWcubWF4RGF0ZSwgXCJZLW0tZFwiKTtcbiAgICAgICAgaWYgKHNlbGYuaW5wdXQuZ2V0QXR0cmlidXRlKFwic3RlcFwiKSlcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQuc3RlcCA9IFN0cmluZyhzZWxmLmlucHV0LmdldEF0dHJpYnV0ZShcInN0ZXBcIikpO1xuICAgICAgICBzZWxmLmlucHV0LnR5cGUgPSBcImhpZGRlblwiO1xuICAgICAgICBpZiAoc2VsZi5hbHRJbnB1dCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dC50eXBlID0gXCJoaWRkZW5cIjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzZWxmLmlucHV0LnBhcmVudE5vZGUpXG4gICAgICAgICAgICAgICAgc2VsZi5pbnB1dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzZWxmLm1vYmlsZUlucHV0LCBzZWxmLmlucHV0Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoX2EpIHsgfVxuICAgICAgICBiaW5kKHNlbGYubW9iaWxlSW5wdXQsIFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBzZWxmLnNldERhdGUoZ2V0RXZlbnRUYXJnZXQoZSkudmFsdWUsIGZhbHNlLCBzZWxmLm1vYmlsZUZvcm1hdFN0cik7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkNoYW5nZVwiKTtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uQ2xvc2VcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0b2dnbGUoZSkge1xuICAgICAgICBpZiAoc2VsZi5pc09wZW4gPT09IHRydWUpXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5jbG9zZSgpO1xuICAgICAgICBzZWxmLm9wZW4oZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyaWdnZXJFdmVudChldmVudCwgZGF0YSkge1xuICAgICAgICBpZiAoc2VsZi5jb25maWcgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGhvb2tzID0gc2VsZi5jb25maWdbZXZlbnRdO1xuICAgICAgICBpZiAoaG9va3MgIT09IHVuZGVmaW5lZCAmJiBob29rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaG9va3NbaV0gJiYgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgICAgIGhvb2tzW2ldKHNlbGYuc2VsZWN0ZWREYXRlcywgc2VsZi5pbnB1dC52YWx1ZSwgc2VsZiwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50ID09PSBcIm9uQ2hhbmdlXCIpIHtcbiAgICAgICAgICAgIHNlbGYuaW5wdXQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudChcImNoYW5nZVwiKSk7XG4gICAgICAgICAgICBzZWxmLmlucHV0LmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoXCJpbnB1dFwiKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlRXZlbnQobmFtZSkge1xuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gICAgICAgIGUuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUpO1xuICAgICAgICByZXR1cm4gZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNEYXRlU2VsZWN0ZWQoZGF0ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkRGF0ZSA9IHNlbGYuc2VsZWN0ZWREYXRlc1tpXTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZERhdGUgaW5zdGFuY2VvZiBEYXRlICYmXG4gICAgICAgICAgICAgICAgY29tcGFyZURhdGVzKHNlbGVjdGVkRGF0ZSwgZGF0ZSkgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNEYXRlSW5SYW5nZShkYXRlKSB7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlICE9PSBcInJhbmdlXCIgfHwgc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA8IDIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiAoY29tcGFyZURhdGVzKGRhdGUsIHNlbGYuc2VsZWN0ZWREYXRlc1swXSkgPj0gMCAmJlxuICAgICAgICAgICAgY29tcGFyZURhdGVzKGRhdGUsIHNlbGYuc2VsZWN0ZWREYXRlc1sxXSkgPD0gMCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZU5hdmlnYXRpb25DdXJyZW50TW9udGgoKSB7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5ub0NhbGVuZGFyIHx8IHNlbGYuaXNNb2JpbGUgfHwgIXNlbGYubW9udGhOYXYpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHNlbGYueWVhckVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKHllYXJFbGVtZW50LCBpKSB7XG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKHNlbGYuY3VycmVudFllYXIsIHNlbGYuY3VycmVudE1vbnRoLCAxKTtcbiAgICAgICAgICAgIGQuc2V0TW9udGgoc2VsZi5jdXJyZW50TW9udGggKyBpKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5zaG93TW9udGhzID4gMSB8fFxuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1vbnRoU2VsZWN0b3JUeXBlID09PSBcInN0YXRpY1wiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tb250aEVsZW1lbnRzW2ldLnRleHRDb250ZW50ID1cbiAgICAgICAgICAgICAgICAgICAgbW9udGhUb1N0cihkLmdldE1vbnRoKCksIHNlbGYuY29uZmlnLnNob3J0aGFuZEN1cnJlbnRNb250aCwgc2VsZi5sMTBuKSArIFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5tb250aHNEcm9wZG93bkNvbnRhaW5lci52YWx1ZSA9IGQuZ2V0TW9udGgoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeWVhckVsZW1lbnQudmFsdWUgPSBkLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuX2hpZGVQcmV2TW9udGhBcnJvdyA9XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5taW5EYXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAoc2VsZi5jdXJyZW50WWVhciA9PT0gc2VsZi5jb25maWcubWluRGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5jdXJyZW50TW9udGggPD0gc2VsZi5jb25maWcubWluRGF0ZS5nZXRNb250aCgpXG4gICAgICAgICAgICAgICAgICAgIDogc2VsZi5jdXJyZW50WWVhciA8IHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgIHNlbGYuX2hpZGVOZXh0TW9udGhBcnJvdyA9XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5tYXhEYXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAoc2VsZi5jdXJyZW50WWVhciA9PT0gc2VsZi5jb25maWcubWF4RGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5jdXJyZW50TW9udGggKyAxID4gc2VsZi5jb25maWcubWF4RGF0ZS5nZXRNb250aCgpXG4gICAgICAgICAgICAgICAgICAgIDogc2VsZi5jdXJyZW50WWVhciA+IHNlbGYuY29uZmlnLm1heERhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERhdGVTdHIoc3BlY2lmaWNGb3JtYXQpIHtcbiAgICAgICAgdmFyIGZvcm1hdCA9IHNwZWNpZmljRm9ybWF0IHx8XG4gICAgICAgICAgICAoc2VsZi5jb25maWcuYWx0SW5wdXQgPyBzZWxmLmNvbmZpZy5hbHRGb3JtYXQgOiBzZWxmLmNvbmZpZy5kYXRlRm9ybWF0KTtcbiAgICAgICAgcmV0dXJuIHNlbGYuc2VsZWN0ZWREYXRlc1xuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoZE9iaikgeyByZXR1cm4gc2VsZi5mb3JtYXREYXRlKGRPYmosIGZvcm1hdCk7IH0pXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChkLCBpLCBhcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNvbmZpZy5tb2RlICE9PSBcInJhbmdlXCIgfHxcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5lbmFibGVUaW1lIHx8XG4gICAgICAgICAgICAgICAgYXJyLmluZGV4T2YoZCkgPT09IGk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihzZWxmLmNvbmZpZy5tb2RlICE9PSBcInJhbmdlXCJcbiAgICAgICAgICAgID8gc2VsZi5jb25maWcuY29uanVuY3Rpb25cbiAgICAgICAgICAgIDogc2VsZi5sMTBuLnJhbmdlU2VwYXJhdG9yKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlVmFsdWUodHJpZ2dlckNoYW5nZSkge1xuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSA9PT0gdm9pZCAwKSB7IHRyaWdnZXJDaGFuZ2UgPSB0cnVlOyB9XG4gICAgICAgIGlmIChzZWxmLm1vYmlsZUlucHV0ICE9PSB1bmRlZmluZWQgJiYgc2VsZi5tb2JpbGVGb3JtYXRTdHIpIHtcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQudmFsdWUgPVxuICAgICAgICAgICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmZvcm1hdERhdGUoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmosIHNlbGYubW9iaWxlRm9ybWF0U3RyKVxuICAgICAgICAgICAgICAgICAgICA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pbnB1dC52YWx1ZSA9IGdldERhdGVTdHIoc2VsZi5jb25maWcuZGF0ZUZvcm1hdCk7XG4gICAgICAgIGlmIChzZWxmLmFsdElucHV0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQudmFsdWUgPSBnZXREYXRlU3RyKHNlbGYuY29uZmlnLmFsdEZvcm1hdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2UgIT09IGZhbHNlKVxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25WYWx1ZVVwZGF0ZVwiKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb250aE5hdkNsaWNrKGUpIHtcbiAgICAgICAgdmFyIGV2ZW50VGFyZ2V0ID0gZ2V0RXZlbnRUYXJnZXQoZSk7XG4gICAgICAgIHZhciBpc1ByZXZNb250aCA9IHNlbGYucHJldk1vbnRoTmF2LmNvbnRhaW5zKGV2ZW50VGFyZ2V0KTtcbiAgICAgICAgdmFyIGlzTmV4dE1vbnRoID0gc2VsZi5uZXh0TW9udGhOYXYuY29udGFpbnMoZXZlbnRUYXJnZXQpO1xuICAgICAgICBpZiAoaXNQcmV2TW9udGggfHwgaXNOZXh0TW9udGgpIHtcbiAgICAgICAgICAgIGNoYW5nZU1vbnRoKGlzUHJldk1vbnRoID8gLTEgOiAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxmLnllYXJFbGVtZW50cy5pbmRleE9mKGV2ZW50VGFyZ2V0KSA+PSAwKSB7XG4gICAgICAgICAgICBldmVudFRhcmdldC5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhcnJvd1VwXCIpKSB7XG4gICAgICAgICAgICBzZWxmLmNoYW5nZVllYXIoc2VsZi5jdXJyZW50WWVhciArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFycm93RG93blwiKSkge1xuICAgICAgICAgICAgc2VsZi5jaGFuZ2VZZWFyKHNlbGYuY3VycmVudFllYXIgLSAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB0aW1lV3JhcHBlcihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGlzS2V5RG93biA9IGUudHlwZSA9PT0gXCJrZXlkb3duXCIsIGV2ZW50VGFyZ2V0ID0gZ2V0RXZlbnRUYXJnZXQoZSksIGlucHV0ID0gZXZlbnRUYXJnZXQ7XG4gICAgICAgIGlmIChzZWxmLmFtUE0gIT09IHVuZGVmaW5lZCAmJiBldmVudFRhcmdldCA9PT0gc2VsZi5hbVBNKSB7XG4gICAgICAgICAgICBzZWxmLmFtUE0udGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgICAgIHNlbGYubDEwbi5hbVBNW2ludChzZWxmLmFtUE0udGV4dENvbnRlbnQgPT09IHNlbGYubDEwbi5hbVBNWzBdKV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pbiA9IHBhcnNlRmxvYXQoaW5wdXQuZ2V0QXR0cmlidXRlKFwibWluXCIpKSwgbWF4ID0gcGFyc2VGbG9hdChpbnB1dC5nZXRBdHRyaWJ1dGUoXCJtYXhcIikpLCBzdGVwID0gcGFyc2VGbG9hdChpbnB1dC5nZXRBdHRyaWJ1dGUoXCJzdGVwXCIpKSwgY3VyVmFsdWUgPSBwYXJzZUludChpbnB1dC52YWx1ZSwgMTApLCBkZWx0YSA9IGUuZGVsdGEgfHxcbiAgICAgICAgICAgIChpc0tleURvd24gPyAoZS53aGljaCA9PT0gMzggPyAxIDogLTEpIDogMCk7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IGN1clZhbHVlICsgc3RlcCAqIGRlbHRhO1xuICAgICAgICBpZiAodHlwZW9mIGlucHV0LnZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIGlucHV0LnZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIGlzSG91ckVsZW0gPSBpbnB1dCA9PT0gc2VsZi5ob3VyRWxlbWVudCwgaXNNaW51dGVFbGVtID0gaW5wdXQgPT09IHNlbGYubWludXRlRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA8IG1pbikge1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID1cbiAgICAgICAgICAgICAgICAgICAgbWF4ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCghaXNIb3VyRWxlbSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGludChpc0hvdXJFbGVtKSAmJiBpbnQoIXNlbGYuYW1QTSkpO1xuICAgICAgICAgICAgICAgIGlmIChpc01pbnV0ZUVsZW0pXG4gICAgICAgICAgICAgICAgICAgIGluY3JlbWVudE51bUlucHV0KHVuZGVmaW5lZCwgLTEsIHNlbGYuaG91ckVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3VmFsdWUgPiBtYXgpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgIGlucHV0ID09PSBzZWxmLmhvdXJFbGVtZW50ID8gbmV3VmFsdWUgLSBtYXggLSBpbnQoIXNlbGYuYW1QTSkgOiBtaW47XG4gICAgICAgICAgICAgICAgaWYgKGlzTWludXRlRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50TnVtSW5wdXQodW5kZWZpbmVkLCAxLCBzZWxmLmhvdXJFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLmFtUE0gJiZcbiAgICAgICAgICAgICAgICBpc0hvdXJFbGVtICYmXG4gICAgICAgICAgICAgICAgKHN0ZXAgPT09IDFcbiAgICAgICAgICAgICAgICAgICAgPyBuZXdWYWx1ZSArIGN1clZhbHVlID09PSAyM1xuICAgICAgICAgICAgICAgICAgICA6IE1hdGguYWJzKG5ld1ZhbHVlIC0gY3VyVmFsdWUpID4gc3RlcCkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFtUE0udGV4dENvbnRlbnQgPVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmwxMG4uYW1QTVtpbnQoc2VsZi5hbVBNLnRleHRDb250ZW50ID09PSBzZWxmLmwxMG4uYW1QTVswXSldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBwYWQobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaXQoKTtcbiAgICByZXR1cm4gc2VsZjtcbn1cbmZ1bmN0aW9uIF9mbGF0cGlja3Iobm9kZUxpc3QsIGNvbmZpZykge1xuICAgIHZhciBub2RlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgICAuY2FsbChub2RlTGlzdClcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50OyB9KTtcbiAgICB2YXIgaW5zdGFuY2VzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1mcC1vbWl0XCIpICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG5vZGUuX2ZsYXRwaWNrciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5fZmxhdHBpY2tyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBub2RlLl9mbGF0cGlja3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLl9mbGF0cGlja3IgPSBGbGF0cGlja3JJbnN0YW5jZShub2RlLCBjb25maWcgfHwge30pO1xuICAgICAgICAgICAgaW5zdGFuY2VzLnB1c2gobm9kZS5fZmxhdHBpY2tyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2VzLmxlbmd0aCA9PT0gMSA/IGluc3RhbmNlc1swXSA6IGluc3RhbmNlcztcbn1cbmlmICh0eXBlb2YgSFRNTEVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgSFRNTENvbGxlY3Rpb24gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgTm9kZUxpc3QgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUuZmxhdHBpY2tyID0gTm9kZUxpc3QucHJvdG90eXBlLmZsYXRwaWNrciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIF9mbGF0cGlja3IodGhpcywgY29uZmlnKTtcbiAgICB9O1xuICAgIEhUTUxFbGVtZW50LnByb3RvdHlwZS5mbGF0cGlja3IgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiBfZmxhdHBpY2tyKFt0aGlzXSwgY29uZmlnKTtcbiAgICB9O1xufVxudmFyIGZsYXRwaWNrciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29uZmlnKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gX2ZsYXRwaWNrcih3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIGNvbmZpZyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICByZXR1cm4gX2ZsYXRwaWNrcihbc2VsZWN0b3JdLCBjb25maWcpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9mbGF0cGlja3Ioc2VsZWN0b3IsIGNvbmZpZyk7XG4gICAgfVxufTtcbmZsYXRwaWNrci5kZWZhdWx0Q29uZmlnID0ge307XG5mbGF0cGlja3IubDEwbnMgPSB7XG4gICAgZW46IF9fYXNzaWduKHt9LCBFbmdsaXNoKSxcbiAgICBkZWZhdWx0OiBfX2Fzc2lnbih7fSwgRW5nbGlzaCksXG59O1xuZmxhdHBpY2tyLmxvY2FsaXplID0gZnVuY3Rpb24gKGwxMG4pIHtcbiAgICBmbGF0cGlja3IubDEwbnMuZGVmYXVsdCA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBmbGF0cGlja3IubDEwbnMuZGVmYXVsdCksIGwxMG4pO1xufTtcbmZsYXRwaWNrci5zZXREZWZhdWx0cyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICBmbGF0cGlja3IuZGVmYXVsdENvbmZpZyA9IF9fYXNzaWduKF9fYXNzaWduKHt9LCBmbGF0cGlja3IuZGVmYXVsdENvbmZpZyksIGNvbmZpZyk7XG59O1xuZmxhdHBpY2tyLnBhcnNlRGF0ZSA9IGNyZWF0ZURhdGVQYXJzZXIoe30pO1xuZmxhdHBpY2tyLmZvcm1hdERhdGUgPSBjcmVhdGVEYXRlRm9ybWF0dGVyKHt9KTtcbmZsYXRwaWNrci5jb21wYXJlRGF0ZXMgPSBjb21wYXJlRGF0ZXM7XG5pZiAodHlwZW9mIGpRdWVyeSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgalF1ZXJ5LmZuICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgalF1ZXJ5LmZuLmZsYXRwaWNrciA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIF9mbGF0cGlja3IodGhpcywgY29uZmlnKTtcbiAgICB9O1xufVxuRGF0ZS5wcm90b3R5cGUuZnBfaW5jciA9IGZ1bmN0aW9uIChkYXlzKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0RnVsbFllYXIoKSwgdGhpcy5nZXRNb250aCgpLCB0aGlzLmdldERhdGUoKSArICh0eXBlb2YgZGF5cyA9PT0gXCJzdHJpbmdcIiA/IHBhcnNlSW50KGRheXMsIDEwKSA6IGRheXMpKTtcbn07XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbmRvdy5mbGF0cGlja3IgPSBmbGF0cGlja3I7XG59XG5leHBvcnQgZGVmYXVsdCBmbGF0cGlja3I7XG4iLCJleHBvcnQgdmFyIGVuZ2xpc2ggPSB7XG4gICAgd2Vla2RheXM6IHtcbiAgICAgICAgc2hvcnRoYW5kOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXG4gICAgICAgIGxvbmdoYW5kOiBbXG4gICAgICAgICAgICBcIlN1bmRheVwiLFxuICAgICAgICAgICAgXCJNb25kYXlcIixcbiAgICAgICAgICAgIFwiVHVlc2RheVwiLFxuICAgICAgICAgICAgXCJXZWRuZXNkYXlcIixcbiAgICAgICAgICAgIFwiVGh1cnNkYXlcIixcbiAgICAgICAgICAgIFwiRnJpZGF5XCIsXG4gICAgICAgICAgICBcIlNhdHVyZGF5XCIsXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICBtb250aHM6IHtcbiAgICAgICAgc2hvcnRoYW5kOiBbXG4gICAgICAgICAgICBcIkphblwiLFxuICAgICAgICAgICAgXCJGZWJcIixcbiAgICAgICAgICAgIFwiTWFyXCIsXG4gICAgICAgICAgICBcIkFwclwiLFxuICAgICAgICAgICAgXCJNYXlcIixcbiAgICAgICAgICAgIFwiSnVuXCIsXG4gICAgICAgICAgICBcIkp1bFwiLFxuICAgICAgICAgICAgXCJBdWdcIixcbiAgICAgICAgICAgIFwiU2VwXCIsXG4gICAgICAgICAgICBcIk9jdFwiLFxuICAgICAgICAgICAgXCJOb3ZcIixcbiAgICAgICAgICAgIFwiRGVjXCIsXG4gICAgICAgIF0sXG4gICAgICAgIGxvbmdoYW5kOiBbXG4gICAgICAgICAgICBcIkphbnVhcnlcIixcbiAgICAgICAgICAgIFwiRmVicnVhcnlcIixcbiAgICAgICAgICAgIFwiTWFyY2hcIixcbiAgICAgICAgICAgIFwiQXByaWxcIixcbiAgICAgICAgICAgIFwiTWF5XCIsXG4gICAgICAgICAgICBcIkp1bmVcIixcbiAgICAgICAgICAgIFwiSnVseVwiLFxuICAgICAgICAgICAgXCJBdWd1c3RcIixcbiAgICAgICAgICAgIFwiU2VwdGVtYmVyXCIsXG4gICAgICAgICAgICBcIk9jdG9iZXJcIixcbiAgICAgICAgICAgIFwiTm92ZW1iZXJcIixcbiAgICAgICAgICAgIFwiRGVjZW1iZXJcIixcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIGRheXNJbk1vbnRoOiBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV0sXG4gICAgZmlyc3REYXlPZldlZWs6IDAsXG4gICAgb3JkaW5hbDogZnVuY3Rpb24gKG50aCkge1xuICAgICAgICB2YXIgcyA9IG50aCAlIDEwMDtcbiAgICAgICAgaWYgKHMgPiAzICYmIHMgPCAyMSlcbiAgICAgICAgICAgIHJldHVybiBcInRoXCI7XG4gICAgICAgIHN3aXRjaCAocyAlIDEwKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RcIjtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJuZFwiO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiBcInJkXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBcInRoXCI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJhbmdlU2VwYXJhdG9yOiBcIiB0byBcIixcbiAgICB3ZWVrQWJicmV2aWF0aW9uOiBcIldrXCIsXG4gICAgc2Nyb2xsVGl0bGU6IFwiU2Nyb2xsIHRvIGluY3JlbWVudFwiLFxuICAgIHRvZ2dsZVRpdGxlOiBcIkNsaWNrIHRvIHRvZ2dsZVwiLFxuICAgIGFtUE06IFtcIkFNXCIsIFwiUE1cIl0sXG4gICAgeWVhckFyaWFMYWJlbDogXCJZZWFyXCIsXG4gICAgbW9udGhBcmlhTGFiZWw6IFwiTW9udGhcIixcbiAgICBob3VyQXJpYUxhYmVsOiBcIkhvdXJcIixcbiAgICBtaW51dGVBcmlhTGFiZWw6IFwiTWludXRlXCIsXG4gICAgdGltZV8yNGhyOiBmYWxzZSxcbn07XG5leHBvcnQgZGVmYXVsdCBlbmdsaXNoO1xuIiwiZXhwb3J0IHZhciBIT09LUyA9IFtcbiAgICBcIm9uQ2hhbmdlXCIsXG4gICAgXCJvbkNsb3NlXCIsXG4gICAgXCJvbkRheUNyZWF0ZVwiLFxuICAgIFwib25EZXN0cm95XCIsXG4gICAgXCJvbktleURvd25cIixcbiAgICBcIm9uTW9udGhDaGFuZ2VcIixcbiAgICBcIm9uT3BlblwiLFxuICAgIFwib25QYXJzZUNvbmZpZ1wiLFxuICAgIFwib25SZWFkeVwiLFxuICAgIFwib25WYWx1ZVVwZGF0ZVwiLFxuICAgIFwib25ZZWFyQ2hhbmdlXCIsXG4gICAgXCJvblByZUNhbGVuZGFyUG9zaXRpb25cIixcbl07XG5leHBvcnQgdmFyIGRlZmF1bHRzID0ge1xuICAgIF9kaXNhYmxlOiBbXSxcbiAgICBhbGxvd0lucHV0OiBmYWxzZSxcbiAgICBhbGxvd0ludmFsaWRQcmVsb2FkOiBmYWxzZSxcbiAgICBhbHRGb3JtYXQ6IFwiRiBqLCBZXCIsXG4gICAgYWx0SW5wdXQ6IGZhbHNlLFxuICAgIGFsdElucHV0Q2xhc3M6IFwiZm9ybS1jb250cm9sIGlucHV0XCIsXG4gICAgYW5pbWF0ZTogdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSA9PT0gLTEsXG4gICAgYXJpYURhdGVGb3JtYXQ6IFwiRiBqLCBZXCIsXG4gICAgYXV0b0ZpbGxEZWZhdWx0VGltZTogdHJ1ZSxcbiAgICBjbGlja09wZW5zOiB0cnVlLFxuICAgIGNsb3NlT25TZWxlY3Q6IHRydWUsXG4gICAgY29uanVuY3Rpb246IFwiLCBcIixcbiAgICBkYXRlRm9ybWF0OiBcIlktbS1kXCIsXG4gICAgZGVmYXVsdEhvdXI6IDEyLFxuICAgIGRlZmF1bHRNaW51dGU6IDAsXG4gICAgZGVmYXVsdFNlY29uZHM6IDAsXG4gICAgZGlzYWJsZTogW10sXG4gICAgZGlzYWJsZU1vYmlsZTogZmFsc2UsXG4gICAgZW5hYmxlU2Vjb25kczogZmFsc2UsXG4gICAgZW5hYmxlVGltZTogZmFsc2UsXG4gICAgZXJyb3JIYW5kbGVyOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlLndhcm4oZXJyKTtcbiAgICB9LFxuICAgIGdldFdlZWs6IGZ1bmN0aW9uIChnaXZlbkRhdGUpIHtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShnaXZlbkRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMyAtICgoZGF0ZS5nZXREYXkoKSArIDYpICUgNykpO1xuICAgICAgICB2YXIgd2VlazEgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDAsIDQpO1xuICAgICAgICByZXR1cm4gKDEgK1xuICAgICAgICAgICAgTWF0aC5yb3VuZCgoKGRhdGUuZ2V0VGltZSgpIC0gd2VlazEuZ2V0VGltZSgpKSAvIDg2NDAwMDAwIC1cbiAgICAgICAgICAgICAgICAzICtcbiAgICAgICAgICAgICAgICAoKHdlZWsxLmdldERheSgpICsgNikgJSA3KSkgL1xuICAgICAgICAgICAgICAgIDcpKTtcbiAgICB9LFxuICAgIGhvdXJJbmNyZW1lbnQ6IDEsXG4gICAgaWdub3JlZEZvY3VzRWxlbWVudHM6IFtdLFxuICAgIGlubGluZTogZmFsc2UsXG4gICAgbG9jYWxlOiBcImRlZmF1bHRcIixcbiAgICBtaW51dGVJbmNyZW1lbnQ6IDUsXG4gICAgbW9kZTogXCJzaW5nbGVcIixcbiAgICBtb250aFNlbGVjdG9yVHlwZTogXCJkcm9wZG93blwiLFxuICAgIG5leHRBcnJvdzogXCI8c3ZnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgdmlld0JveD0nMCAwIDE3IDE3Jz48Zz48L2c+PHBhdGggZD0nTTEzLjIwNyA4LjQ3MmwtNy44NTQgNy44NTQtMC43MDctMC43MDcgNy4xNDYtNy4xNDYtNy4xNDYtNy4xNDggMC43MDctMC43MDcgNy44NTQgNy44NTR6JyAvPjwvc3ZnPlwiLFxuICAgIG5vQ2FsZW5kYXI6IGZhbHNlLFxuICAgIG5vdzogbmV3IERhdGUoKSxcbiAgICBvbkNoYW5nZTogW10sXG4gICAgb25DbG9zZTogW10sXG4gICAgb25EYXlDcmVhdGU6IFtdLFxuICAgIG9uRGVzdHJveTogW10sXG4gICAgb25LZXlEb3duOiBbXSxcbiAgICBvbk1vbnRoQ2hhbmdlOiBbXSxcbiAgICBvbk9wZW46IFtdLFxuICAgIG9uUGFyc2VDb25maWc6IFtdLFxuICAgIG9uUmVhZHk6IFtdLFxuICAgIG9uVmFsdWVVcGRhdGU6IFtdLFxuICAgIG9uWWVhckNoYW5nZTogW10sXG4gICAgb25QcmVDYWxlbmRhclBvc2l0aW9uOiBbXSxcbiAgICBwbHVnaW5zOiBbXSxcbiAgICBwb3NpdGlvbjogXCJhdXRvXCIsXG4gICAgcG9zaXRpb25FbGVtZW50OiB1bmRlZmluZWQsXG4gICAgcHJldkFycm93OiBcIjxzdmcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB2aWV3Qm94PScwIDAgMTcgMTcnPjxnPjwvZz48cGF0aCBkPSdNNS4yMDcgOC40NzFsNy4xNDYgNy4xNDctMC43MDcgMC43MDctNy44NTMtNy44NTQgNy44NTQtNy44NTMgMC43MDcgMC43MDctNy4xNDcgNy4xNDZ6JyAvPjwvc3ZnPlwiLFxuICAgIHNob3J0aGFuZEN1cnJlbnRNb250aDogZmFsc2UsXG4gICAgc2hvd01vbnRoczogMSxcbiAgICBzdGF0aWM6IGZhbHNlLFxuICAgIHRpbWVfMjRocjogZmFsc2UsXG4gICAgd2Vla051bWJlcnM6IGZhbHNlLFxuICAgIHdyYXA6IGZhbHNlLFxufTtcbiIsImltcG9ydCB7IHRva2VuUmVnZXgsIHJldkZvcm1hdCwgZm9ybWF0cywgfSBmcm9tIFwiLi9mb3JtYXR0aW5nXCI7XG5pbXBvcnQgeyBkZWZhdWx0cyB9IGZyb20gXCIuLi90eXBlcy9vcHRpb25zXCI7XG5pbXBvcnQgeyBlbmdsaXNoIH0gZnJvbSBcIi4uL2wxMG4vZGVmYXVsdFwiO1xuZXhwb3J0IHZhciBjcmVhdGVEYXRlRm9ybWF0dGVyID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIF9iID0gX2EuY29uZmlnLCBjb25maWcgPSBfYiA9PT0gdm9pZCAwID8gZGVmYXVsdHMgOiBfYiwgX2MgPSBfYS5sMTBuLCBsMTBuID0gX2MgPT09IHZvaWQgMCA/IGVuZ2xpc2ggOiBfYywgX2QgPSBfYS5pc01vYmlsZSwgaXNNb2JpbGUgPSBfZCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfZDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGVPYmosIGZybXQsIG92ZXJyaWRlTG9jYWxlKSB7XG4gICAgICAgIHZhciBsb2NhbGUgPSBvdmVycmlkZUxvY2FsZSB8fCBsMTBuO1xuICAgICAgICBpZiAoY29uZmlnLmZvcm1hdERhdGUgIT09IHVuZGVmaW5lZCAmJiAhaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcuZm9ybWF0RGF0ZShkYXRlT2JqLCBmcm10LCBsb2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcm10XG4gICAgICAgICAgICAuc3BsaXQoXCJcIilcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGMsIGksIGFycikge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHNbY10gJiYgYXJyW2kgLSAxXSAhPT0gXCJcXFxcXCJcbiAgICAgICAgICAgICAgICA/IGZvcm1hdHNbY10oZGF0ZU9iaiwgbG9jYWxlLCBjb25maWcpXG4gICAgICAgICAgICAgICAgOiBjICE9PSBcIlxcXFxcIlxuICAgICAgICAgICAgICAgICAgICA/IGNcbiAgICAgICAgICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oXCJcIik7XG4gICAgfTtcbn07XG5leHBvcnQgdmFyIGNyZWF0ZURhdGVQYXJzZXIgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgX2IgPSBfYS5jb25maWcsIGNvbmZpZyA9IF9iID09PSB2b2lkIDAgPyBkZWZhdWx0cyA6IF9iLCBfYyA9IF9hLmwxMG4sIGwxMG4gPSBfYyA9PT0gdm9pZCAwID8gZW5nbGlzaCA6IF9jO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0ZSwgZ2l2ZW5Gb3JtYXQsIHRpbWVsZXNzLCBjdXN0b21Mb2NhbGUpIHtcbiAgICAgICAgaWYgKGRhdGUgIT09IDAgJiYgIWRhdGUpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgbG9jYWxlID0gY3VzdG9tTG9jYWxlIHx8IGwxMG47XG4gICAgICAgIHZhciBwYXJzZWREYXRlO1xuICAgICAgICB2YXIgZGF0ZU9yaWcgPSBkYXRlO1xuICAgICAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICBwYXJzZWREYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZGF0ZSAhPT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgZGF0ZS50b0ZpeGVkICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBwYXJzZWREYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgZm9ybWF0ID0gZ2l2ZW5Gb3JtYXQgfHwgKGNvbmZpZyB8fCBkZWZhdWx0cykuZGF0ZUZvcm1hdDtcbiAgICAgICAgICAgIHZhciBkYXRlc3RyID0gU3RyaW5nKGRhdGUpLnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChkYXRlc3RyID09PSBcInRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICB0aW1lbGVzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb25maWcgJiYgY29uZmlnLnBhcnNlRGF0ZSkge1xuICAgICAgICAgICAgICAgIHBhcnNlZERhdGUgPSBjb25maWcucGFyc2VEYXRlKGRhdGUsIGZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgvWiQvLnRlc3QoZGF0ZXN0cikgfHxcbiAgICAgICAgICAgICAgICAvR01UJC8udGVzdChkYXRlc3RyKSkge1xuICAgICAgICAgICAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVkID0gdm9pZCAwLCBvcHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF0Y2hJbmRleCA9IDAsIHJlZ2V4U3RyID0gXCJcIjsgaSA8IGZvcm1hdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBmb3JtYXRbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0JhY2tTbGFzaCA9IHRva2VuID09PSBcIlxcXFxcIjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVzY2FwZWQgPSBmb3JtYXRbaSAtIDFdID09PSBcIlxcXFxcIiB8fCBpc0JhY2tTbGFzaDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuUmVnZXhbdG9rZW5dICYmICFlc2NhcGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleFN0ciArPSB0b2tlblJlZ2V4W3Rva2VuXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IG5ldyBSZWdFeHAocmVnZXhTdHIpLmV4ZWMoZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgKG1hdGNoZWQgPSB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wc1t0b2tlbiAhPT0gXCJZXCIgPyBcInB1c2hcIiA6IFwidW5zaGlmdFwiXSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiByZXZGb3JtYXRbdG9rZW5dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWw6IG1hdGNoWysrbWF0Y2hJbmRleF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWlzQmFja1NsYXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXhTdHIgKz0gXCIuXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcnNlZERhdGUgPVxuICAgICAgICAgICAgICAgICAgICAhY29uZmlnIHx8ICFjb25maWcubm9DYWxlbmRhclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIDAsIDEsIDAsIDAsIDAsIDApXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBEYXRlKG5ldyBEYXRlKCkuc2V0SG91cnMoMCwgMCwgMCwgMCkpO1xuICAgICAgICAgICAgICAgIG9wcy5mb3JFYWNoKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBfYS5mbiwgdmFsID0gX2EudmFsO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHBhcnNlZERhdGUgPSBmbihwYXJzZWREYXRlLCB2YWwsIGxvY2FsZSkgfHwgcGFyc2VkRGF0ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGFyc2VkRGF0ZSA9IG1hdGNoZWQgPyBwYXJzZWREYXRlIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghKHBhcnNlZERhdGUgaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihwYXJzZWREYXRlLmdldFRpbWUoKSkpKSB7XG4gICAgICAgICAgICBjb25maWcuZXJyb3JIYW5kbGVyKG5ldyBFcnJvcihcIkludmFsaWQgZGF0ZSBwcm92aWRlZDogXCIgKyBkYXRlT3JpZykpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGltZWxlc3MgPT09IHRydWUpXG4gICAgICAgICAgICBwYXJzZWREYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICByZXR1cm4gcGFyc2VkRGF0ZTtcbiAgICB9O1xufTtcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlRGF0ZXMoZGF0ZTEsIGRhdGUyLCB0aW1lbGVzcykge1xuICAgIGlmICh0aW1lbGVzcyA9PT0gdm9pZCAwKSB7IHRpbWVsZXNzID0gdHJ1ZTsgfVxuICAgIGlmICh0aW1lbGVzcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZShkYXRlMS5nZXRUaW1lKCkpLnNldEhvdXJzKDAsIDAsIDAsIDApIC1cbiAgICAgICAgICAgIG5ldyBEYXRlKGRhdGUyLmdldFRpbWUoKSkuc2V0SG91cnMoMCwgMCwgMCwgMCkpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZTEuZ2V0VGltZSgpIC0gZGF0ZTIuZ2V0VGltZSgpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVUaW1lcyhkYXRlMSwgZGF0ZTIpIHtcbiAgICByZXR1cm4gKDM2MDAgKiAoZGF0ZTEuZ2V0SG91cnMoKSAtIGRhdGUyLmdldEhvdXJzKCkpICtcbiAgICAgICAgNjAgKiAoZGF0ZTEuZ2V0TWludXRlcygpIC0gZGF0ZTIuZ2V0TWludXRlcygpKSArXG4gICAgICAgIGRhdGUxLmdldFNlY29uZHMoKSAtXG4gICAgICAgIGRhdGUyLmdldFNlY29uZHMoKSk7XG59XG5leHBvcnQgdmFyIGlzQmV0d2VlbiA9IGZ1bmN0aW9uICh0cywgdHMxLCB0czIpIHtcbiAgICByZXR1cm4gdHMgPiBNYXRoLm1pbih0czEsIHRzMikgJiYgdHMgPCBNYXRoLm1heCh0czEsIHRzMik7XG59O1xuZXhwb3J0IHZhciBjYWxjdWxhdGVTZWNvbmRzU2luY2VNaWRuaWdodCA9IGZ1bmN0aW9uIChob3VycywgbWludXRlcywgc2Vjb25kcykge1xuICAgIHJldHVybiBob3VycyAqIDM2MDAgKyBtaW51dGVzICogNjAgKyBzZWNvbmRzO1xufTtcbmV4cG9ydCB2YXIgcGFyc2VTZWNvbmRzID0gZnVuY3Rpb24gKHNlY29uZHNTaW5jZU1pZG5pZ2h0KSB7XG4gICAgdmFyIGhvdXJzID0gTWF0aC5mbG9vcihzZWNvbmRzU2luY2VNaWRuaWdodCAvIDM2MDApLCBtaW51dGVzID0gKHNlY29uZHNTaW5jZU1pZG5pZ2h0IC0gaG91cnMgKiAzNjAwKSAvIDYwO1xuICAgIHJldHVybiBbaG91cnMsIG1pbnV0ZXMsIHNlY29uZHNTaW5jZU1pZG5pZ2h0IC0gaG91cnMgKiAzNjAwIC0gbWludXRlcyAqIDYwXTtcbn07XG5leHBvcnQgdmFyIGR1cmF0aW9uID0ge1xuICAgIERBWTogODY0MDAwMDAsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRIb3Vycyhjb25maWcpIHtcbiAgICB2YXIgaG91cnMgPSBjb25maWcuZGVmYXVsdEhvdXI7XG4gICAgdmFyIG1pbnV0ZXMgPSBjb25maWcuZGVmYXVsdE1pbnV0ZTtcbiAgICB2YXIgc2Vjb25kcyA9IGNvbmZpZy5kZWZhdWx0U2Vjb25kcztcbiAgICBpZiAoY29uZmlnLm1pbkRhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbWluSG91ciA9IGNvbmZpZy5taW5EYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIHZhciBtaW5NaW51dGVzID0gY29uZmlnLm1pbkRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICB2YXIgbWluU2Vjb25kcyA9IGNvbmZpZy5taW5EYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgaWYgKGhvdXJzIDwgbWluSG91cikge1xuICAgICAgICAgICAgaG91cnMgPSBtaW5Ib3VyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VycyA9PT0gbWluSG91ciAmJiBtaW51dGVzIDwgbWluTWludXRlcykge1xuICAgICAgICAgICAgbWludXRlcyA9IG1pbk1pbnV0ZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvdXJzID09PSBtaW5Ib3VyICYmIG1pbnV0ZXMgPT09IG1pbk1pbnV0ZXMgJiYgc2Vjb25kcyA8IG1pblNlY29uZHMpXG4gICAgICAgICAgICBzZWNvbmRzID0gY29uZmlnLm1pbkRhdGUuZ2V0U2Vjb25kcygpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLm1heERhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbWF4SHIgPSBjb25maWcubWF4RGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWF4TWludXRlcyA9IGNvbmZpZy5tYXhEYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgaG91cnMgPSBNYXRoLm1pbihob3VycywgbWF4SHIpO1xuICAgICAgICBpZiAoaG91cnMgPT09IG1heEhyKVxuICAgICAgICAgICAgbWludXRlcyA9IE1hdGgubWluKG1heE1pbnV0ZXMsIG1pbnV0ZXMpO1xuICAgICAgICBpZiAoaG91cnMgPT09IG1heEhyICYmIG1pbnV0ZXMgPT09IG1heE1pbnV0ZXMpXG4gICAgICAgICAgICBzZWNvbmRzID0gY29uZmlnLm1heERhdGUuZ2V0U2Vjb25kcygpO1xuICAgIH1cbiAgICByZXR1cm4geyBob3VyczogaG91cnMsIG1pbnV0ZXM6IG1pbnV0ZXMsIHNlY29uZHM6IHNlY29uZHMgfTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtLCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgICBpZiAoYm9vbCA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuIGVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc05hbWUsIGNvbnRlbnQpIHtcbiAgICB2YXIgZSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lIHx8IFwiXCI7XG4gICAgY29udGVudCA9IGNvbnRlbnQgfHwgXCJcIjtcbiAgICBlLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICBpZiAoY29udGVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICByZXR1cm4gZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbGVhck5vZGUobm9kZSkge1xuICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpXG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUGFyZW50KG5vZGUsIGNvbmRpdGlvbikge1xuICAgIGlmIChjb25kaXRpb24obm9kZSkpXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSlcbiAgICAgICAgcmV0dXJuIGZpbmRQYXJlbnQobm9kZS5wYXJlbnROb2RlLCBjb25kaXRpb24pO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTnVtYmVySW5wdXQoaW5wdXRDbGFzc05hbWUsIG9wdHMpIHtcbiAgICB2YXIgd3JhcHBlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJudW1JbnB1dFdyYXBwZXJcIiksIG51bUlucHV0ID0gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIFwibnVtSW5wdXQgXCIgKyBpbnB1dENsYXNzTmFtZSksIGFycm93VXAgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImFycm93VXBcIiksIGFycm93RG93biA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiYXJyb3dEb3duXCIpO1xuICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFIDkuMFwiKSA9PT0gLTEpIHtcbiAgICAgICAgbnVtSW5wdXQudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBudW1JbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIG51bUlucHV0LnBhdHRlcm4gPSBcIlxcXFxkKlwiO1xuICAgIH1cbiAgICBpZiAob3B0cyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3B0cylcbiAgICAgICAgICAgIG51bUlucHV0LnNldEF0dHJpYnV0ZShrZXksIG9wdHNba2V5XSk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChudW1JbnB1dCk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChhcnJvd1VwKTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGFycm93RG93bik7XG4gICAgcmV0dXJuIHdyYXBwZXI7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0RXZlbnRUYXJnZXQoZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50LmNvbXBvc2VkUGF0aCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgcGF0aCA9IGV2ZW50LmNvbXBvc2VkUGF0aCgpO1xuICAgICAgICAgICAgcmV0dXJuIHBhdGhbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaW50LCBwYWQgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbnZhciBkb05vdGhpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH07XG5leHBvcnQgdmFyIG1vbnRoVG9TdHIgPSBmdW5jdGlvbiAobW9udGhOdW1iZXIsIHNob3J0aGFuZCwgbG9jYWxlKSB7IHJldHVybiBsb2NhbGUubW9udGhzW3Nob3J0aGFuZCA/IFwic2hvcnRoYW5kXCIgOiBcImxvbmdoYW5kXCJdW21vbnRoTnVtYmVyXTsgfTtcbmV4cG9ydCB2YXIgcmV2Rm9ybWF0ID0ge1xuICAgIEQ6IGRvTm90aGluZyxcbiAgICBGOiBmdW5jdGlvbiAoZGF0ZU9iaiwgbW9udGhOYW1lLCBsb2NhbGUpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRNb250aChsb2NhbGUubW9udGhzLmxvbmdoYW5kLmluZGV4T2YobW9udGhOYW1lKSk7XG4gICAgfSxcbiAgICBHOiBmdW5jdGlvbiAoZGF0ZU9iaiwgaG91cikge1xuICAgICAgICBkYXRlT2JqLnNldEhvdXJzKChkYXRlT2JqLmdldEhvdXJzKCkgPj0gMTIgPyAxMiA6IDApICsgcGFyc2VGbG9hdChob3VyKSk7XG4gICAgfSxcbiAgICBIOiBmdW5jdGlvbiAoZGF0ZU9iaiwgaG91cikge1xuICAgICAgICBkYXRlT2JqLnNldEhvdXJzKHBhcnNlRmxvYXQoaG91cikpO1xuICAgIH0sXG4gICAgSjogZnVuY3Rpb24gKGRhdGVPYmosIGRheSkge1xuICAgICAgICBkYXRlT2JqLnNldERhdGUocGFyc2VGbG9hdChkYXkpKTtcbiAgICB9LFxuICAgIEs6IGZ1bmN0aW9uIChkYXRlT2JqLCBhbVBNLCBsb2NhbGUpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRIb3VycygoZGF0ZU9iai5nZXRIb3VycygpICUgMTIpICtcbiAgICAgICAgICAgIDEyICogaW50KG5ldyBSZWdFeHAobG9jYWxlLmFtUE1bMV0sIFwiaVwiKS50ZXN0KGFtUE0pKSk7XG4gICAgfSxcbiAgICBNOiBmdW5jdGlvbiAoZGF0ZU9iaiwgc2hvcnRNb250aCwgbG9jYWxlKSB7XG4gICAgICAgIGRhdGVPYmouc2V0TW9udGgobG9jYWxlLm1vbnRocy5zaG9ydGhhbmQuaW5kZXhPZihzaG9ydE1vbnRoKSk7XG4gICAgfSxcbiAgICBTOiBmdW5jdGlvbiAoZGF0ZU9iaiwgc2Vjb25kcykge1xuICAgICAgICBkYXRlT2JqLnNldFNlY29uZHMocGFyc2VGbG9hdChzZWNvbmRzKSk7XG4gICAgfSxcbiAgICBVOiBmdW5jdGlvbiAoXywgdW5peFNlY29uZHMpIHsgcmV0dXJuIG5ldyBEYXRlKHBhcnNlRmxvYXQodW5peFNlY29uZHMpICogMTAwMCk7IH0sXG4gICAgVzogZnVuY3Rpb24gKGRhdGVPYmosIHdlZWtOdW0sIGxvY2FsZSkge1xuICAgICAgICB2YXIgd2Vla051bWJlciA9IHBhcnNlSW50KHdlZWtOdW0pO1xuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGVPYmouZ2V0RnVsbFllYXIoKSwgMCwgMiArICh3ZWVrTnVtYmVyIC0gMSkgKiA3LCAwLCAwLCAwLCAwKTtcbiAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGF0ZS5nZXREYXkoKSArIGxvY2FsZS5maXJzdERheU9mV2Vlayk7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH0sXG4gICAgWTogZnVuY3Rpb24gKGRhdGVPYmosIHllYXIpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRGdWxsWWVhcihwYXJzZUZsb2F0KHllYXIpKTtcbiAgICB9LFxuICAgIFo6IGZ1bmN0aW9uIChfLCBJU09EYXRlKSB7IHJldHVybiBuZXcgRGF0ZShJU09EYXRlKTsgfSxcbiAgICBkOiBmdW5jdGlvbiAoZGF0ZU9iaiwgZGF5KSB7XG4gICAgICAgIGRhdGVPYmouc2V0RGF0ZShwYXJzZUZsb2F0KGRheSkpO1xuICAgIH0sXG4gICAgaDogZnVuY3Rpb24gKGRhdGVPYmosIGhvdXIpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRIb3VycygoZGF0ZU9iai5nZXRIb3VycygpID49IDEyID8gMTIgOiAwKSArIHBhcnNlRmxvYXQoaG91cikpO1xuICAgIH0sXG4gICAgaTogZnVuY3Rpb24gKGRhdGVPYmosIG1pbnV0ZXMpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRNaW51dGVzKHBhcnNlRmxvYXQobWludXRlcykpO1xuICAgIH0sXG4gICAgajogZnVuY3Rpb24gKGRhdGVPYmosIGRheSkge1xuICAgICAgICBkYXRlT2JqLnNldERhdGUocGFyc2VGbG9hdChkYXkpKTtcbiAgICB9LFxuICAgIGw6IGRvTm90aGluZyxcbiAgICBtOiBmdW5jdGlvbiAoZGF0ZU9iaiwgbW9udGgpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRNb250aChwYXJzZUZsb2F0KG1vbnRoKSAtIDEpO1xuICAgIH0sXG4gICAgbjogZnVuY3Rpb24gKGRhdGVPYmosIG1vbnRoKSB7XG4gICAgICAgIGRhdGVPYmouc2V0TW9udGgocGFyc2VGbG9hdChtb250aCkgLSAxKTtcbiAgICB9LFxuICAgIHM6IGZ1bmN0aW9uIChkYXRlT2JqLCBzZWNvbmRzKSB7XG4gICAgICAgIGRhdGVPYmouc2V0U2Vjb25kcyhwYXJzZUZsb2F0KHNlY29uZHMpKTtcbiAgICB9LFxuICAgIHU6IGZ1bmN0aW9uIChfLCB1bml4TWlsbFNlY29uZHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHBhcnNlRmxvYXQodW5peE1pbGxTZWNvbmRzKSk7XG4gICAgfSxcbiAgICB3OiBkb05vdGhpbmcsXG4gICAgeTogZnVuY3Rpb24gKGRhdGVPYmosIHllYXIpIHtcbiAgICAgICAgZGF0ZU9iai5zZXRGdWxsWWVhcigyMDAwICsgcGFyc2VGbG9hdCh5ZWFyKSk7XG4gICAgfSxcbn07XG5leHBvcnQgdmFyIHRva2VuUmVnZXggPSB7XG4gICAgRDogXCJcIixcbiAgICBGOiBcIlwiLFxuICAgIEc6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXG4gICAgSDogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICBKOiBcIihcXFxcZFxcXFxkfFxcXFxkKVxcXFx3K1wiLFxuICAgIEs6IFwiXCIsXG4gICAgTTogXCJcIixcbiAgICBTOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxuICAgIFU6IFwiKC4rKVwiLFxuICAgIFc6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXG4gICAgWTogXCIoXFxcXGR7NH0pXCIsXG4gICAgWjogXCIoLispXCIsXG4gICAgZDogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICBoOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxuICAgIGk6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXG4gICAgajogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICBsOiBcIlwiLFxuICAgIG06IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXG4gICAgbjogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcbiAgICBzOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxuICAgIHU6IFwiKC4rKVwiLFxuICAgIHc6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXG4gICAgeTogXCIoXFxcXGR7Mn0pXCIsXG59O1xuZXhwb3J0IHZhciBmb3JtYXRzID0ge1xuICAgIFo6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCk7IH0sXG4gICAgRDogZnVuY3Rpb24gKGRhdGUsIGxvY2FsZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzLnNob3J0aGFuZFtmb3JtYXRzLncoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKV07XG4gICAgfSxcbiAgICBGOiBmdW5jdGlvbiAoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBtb250aFRvU3RyKGZvcm1hdHMubihkYXRlLCBsb2NhbGUsIG9wdGlvbnMpIC0gMSwgZmFsc2UsIGxvY2FsZSk7XG4gICAgfSxcbiAgICBHOiBmdW5jdGlvbiAoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBwYWQoZm9ybWF0cy5oKGRhdGUsIGxvY2FsZSwgb3B0aW9ucykpO1xuICAgIH0sXG4gICAgSDogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHBhZChkYXRlLmdldEhvdXJzKCkpOyB9LFxuICAgIEo6IGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5vcmRpbmFsICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gZGF0ZS5nZXREYXRlKCkgKyBsb2NhbGUub3JkaW5hbChkYXRlLmdldERhdGUoKSlcbiAgICAgICAgICAgIDogZGF0ZS5nZXREYXRlKCk7XG4gICAgfSxcbiAgICBLOiBmdW5jdGlvbiAoZGF0ZSwgbG9jYWxlKSB7IHJldHVybiBsb2NhbGUuYW1QTVtpbnQoZGF0ZS5nZXRIb3VycygpID4gMTEpXTsgfSxcbiAgICBNOiBmdW5jdGlvbiAoZGF0ZSwgbG9jYWxlKSB7XG4gICAgICAgIHJldHVybiBtb250aFRvU3RyKGRhdGUuZ2V0TW9udGgoKSwgdHJ1ZSwgbG9jYWxlKTtcbiAgICB9LFxuICAgIFM6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBwYWQoZGF0ZS5nZXRTZWNvbmRzKCkpOyB9LFxuICAgIFU6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBkYXRlLmdldFRpbWUoKSAvIDEwMDA7IH0sXG4gICAgVzogZnVuY3Rpb24gKGRhdGUsIF8sIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMuZ2V0V2VlayhkYXRlKTtcbiAgICB9LFxuICAgIFk6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBwYWQoZGF0ZS5nZXRGdWxsWWVhcigpLCA0KTsgfSxcbiAgICBkOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gcGFkKGRhdGUuZ2V0RGF0ZSgpKTsgfSxcbiAgICBoOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gKGRhdGUuZ2V0SG91cnMoKSAlIDEyID8gZGF0ZS5nZXRIb3VycygpICUgMTIgOiAxMik7IH0sXG4gICAgaTogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHBhZChkYXRlLmdldE1pbnV0ZXMoKSk7IH0sXG4gICAgajogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpOyB9LFxuICAgIGw6IGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5cy5sb25naGFuZFtkYXRlLmdldERheSgpXTtcbiAgICB9LFxuICAgIG06IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBwYWQoZGF0ZS5nZXRNb250aCgpICsgMSk7IH0sXG4gICAgbjogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKSArIDE7IH0sXG4gICAgczogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpOyB9LFxuICAgIHU6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBkYXRlLmdldFRpbWUoKTsgfSxcbiAgICB3OiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXREYXkoKTsgfSxcbiAgICB5OiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSkuc3Vic3RyaW5nKDIpOyB9LFxufTtcbiIsImV4cG9ydCB2YXIgcGFkID0gZnVuY3Rpb24gKG51bWJlciwgbGVuZ3RoKSB7XG4gICAgaWYgKGxlbmd0aCA9PT0gdm9pZCAwKSB7IGxlbmd0aCA9IDI7IH1cbiAgICByZXR1cm4gKFwiMDAwXCIgKyBudW1iZXIpLnNsaWNlKGxlbmd0aCAqIC0xKTtcbn07XG5leHBvcnQgdmFyIGludCA9IGZ1bmN0aW9uIChib29sKSB7IHJldHVybiAoYm9vbCA9PT0gdHJ1ZSA/IDEgOiAwKTsgfTtcbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbiwgd2FpdCkge1xuICAgIHZhciB0O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgIHQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZuLmFwcGx5KF90aGlzLCBhcmdzKTsgfSwgd2FpdCk7XG4gICAgfTtcbn1cbmV4cG9ydCB2YXIgYXJyYXlpZnkgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEFycmF5ID8gb2JqIDogW29ial07XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT09IFwiZnVuY3Rpb25cIikge1xuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuICh0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIF9hID0gMCwgYXJnc18xID0gYXJnczsgX2EgPCBhcmdzXzEubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJnc18xW19hXTtcbiAgICAgICAgICAgIF9sb29wXzEoc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH07XG59XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGZhY3RvcnkoZ2xvYmFsLnB0ID0ge30pKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZnAgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5mbGF0cGlja3IgIT09IHVuZGVmaW5lZFxuICAgICAgPyB3aW5kb3cuZmxhdHBpY2tyXG4gICAgICA6IHtcbiAgICAgICAgICBsMTBuczoge30sXG4gICAgICB9O1xuICB2YXIgUG9ydHVndWVzZSA9IHtcbiAgICAgIHdlZWtkYXlzOiB7XG4gICAgICAgICAgc2hvcnRoYW5kOiBbXCJEb21cIiwgXCJTZWdcIiwgXCJUZXJcIiwgXCJRdWFcIiwgXCJRdWlcIiwgXCJTZXhcIiwgXCJTw6FiXCJdLFxuICAgICAgICAgIGxvbmdoYW5kOiBbXG4gICAgICAgICAgICAgIFwiRG9taW5nb1wiLFxuICAgICAgICAgICAgICBcIlNlZ3VuZGEtZmVpcmFcIixcbiAgICAgICAgICAgICAgXCJUZXLDp2EtZmVpcmFcIixcbiAgICAgICAgICAgICAgXCJRdWFydGEtZmVpcmFcIixcbiAgICAgICAgICAgICAgXCJRdWludGEtZmVpcmFcIixcbiAgICAgICAgICAgICAgXCJTZXh0YS1mZWlyYVwiLFxuICAgICAgICAgICAgICBcIlPDoWJhZG9cIixcbiAgICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIG1vbnRoczoge1xuICAgICAgICAgIHNob3J0aGFuZDogW1xuICAgICAgICAgICAgICBcIkphblwiLFxuICAgICAgICAgICAgICBcIkZldlwiLFxuICAgICAgICAgICAgICBcIk1hclwiLFxuICAgICAgICAgICAgICBcIkFiclwiLFxuICAgICAgICAgICAgICBcIk1haVwiLFxuICAgICAgICAgICAgICBcIkp1blwiLFxuICAgICAgICAgICAgICBcIkp1bFwiLFxuICAgICAgICAgICAgICBcIkFnb1wiLFxuICAgICAgICAgICAgICBcIlNldFwiLFxuICAgICAgICAgICAgICBcIk91dFwiLFxuICAgICAgICAgICAgICBcIk5vdlwiLFxuICAgICAgICAgICAgICBcIkRlelwiLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgbG9uZ2hhbmQ6IFtcbiAgICAgICAgICAgICAgXCJKYW5laXJvXCIsXG4gICAgICAgICAgICAgIFwiRmV2ZXJlaXJvXCIsXG4gICAgICAgICAgICAgIFwiTWFyw6dvXCIsXG4gICAgICAgICAgICAgIFwiQWJyaWxcIixcbiAgICAgICAgICAgICAgXCJNYWlvXCIsXG4gICAgICAgICAgICAgIFwiSnVuaG9cIixcbiAgICAgICAgICAgICAgXCJKdWxob1wiLFxuICAgICAgICAgICAgICBcIkFnb3N0b1wiLFxuICAgICAgICAgICAgICBcIlNldGVtYnJvXCIsXG4gICAgICAgICAgICAgIFwiT3V0dWJyb1wiLFxuICAgICAgICAgICAgICBcIk5vdmVtYnJvXCIsXG4gICAgICAgICAgICAgIFwiRGV6ZW1icm9cIixcbiAgICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHJhbmdlU2VwYXJhdG9yOiBcIiBhdMOpIFwiLFxuICAgICAgdGltZV8yNGhyOiB0cnVlLFxuICB9O1xuICBmcC5sMTBucy5wdCA9IFBvcnR1Z3Vlc2U7XG4gIHZhciBwdCA9IGZwLmwxMG5zO1xuXG4gIGV4cG9ydHMuUG9ydHVndWVzZSA9IFBvcnR1Z3Vlc2U7XG4gIGV4cG9ydHMuZGVmYXVsdCA9IHB0O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4iLCJleHBvcnQgZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zKG51bWJlciwgdGFyZ2V0TGVuZ3RoKSB7XG4gIGNvbnN0IHNpZ24gPSBudW1iZXIgPCAwID8gXCItXCIgOiBcIlwiO1xuICBjb25zdCBvdXRwdXQgPSBNYXRoLmFicyhudW1iZXIpLnRvU3RyaW5nKCkucGFkU3RhcnQodGFyZ2V0TGVuZ3RoLCBcIjBcIik7XG4gIHJldHVybiBzaWduICsgb3V0cHV0O1xufVxuIiwibGV0IGRlZmF1bHRPcHRpb25zID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdE9wdGlvbnMobmV3T3B0aW9ucykge1xuICBkZWZhdWx0T3B0aW9ucyA9IG5ld09wdGlvbnM7XG59XG4iLCJpbXBvcnQgeyBnZXREYXlPZlllYXIgfSBmcm9tIFwiLi4vLi4vZ2V0RGF5T2ZZZWFyLm1qc1wiO1xuaW1wb3J0IHsgZ2V0SVNPV2VlayB9IGZyb20gXCIuLi8uLi9nZXRJU09XZWVrLm1qc1wiO1xuaW1wb3J0IHsgZ2V0SVNPV2Vla1llYXIgfSBmcm9tIFwiLi4vLi4vZ2V0SVNPV2Vla1llYXIubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrIH0gZnJvbSBcIi4uLy4uL2dldFdlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXRXZWVrWWVhciB9IGZyb20gXCIuLi8uLi9nZXRXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IGFkZExlYWRpbmdaZXJvcyB9IGZyb20gXCIuLi9hZGRMZWFkaW5nWmVyb3MubWpzXCI7XG5pbXBvcnQgeyBsaWdodEZvcm1hdHRlcnMgfSBmcm9tIFwiLi9saWdodEZvcm1hdHRlcnMubWpzXCI7XG5cbmNvbnN0IGRheVBlcmlvZEVudW0gPSB7XG4gIGFtOiBcImFtXCIsXG4gIHBtOiBcInBtXCIsXG4gIG1pZG5pZ2h0OiBcIm1pZG5pZ2h0XCIsXG4gIG5vb246IFwibm9vblwiLFxuICBtb3JuaW5nOiBcIm1vcm5pbmdcIixcbiAgYWZ0ZXJub29uOiBcImFmdGVybm9vblwiLFxuICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgbmlnaHQ6IFwibmlnaHRcIixcbn07XG5cbi8qXG4gKiB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8ICBhICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBBKiB8IE1pbGxpc2Vjb25kcyBpbiBkYXkgICAgICAgICAgICB8XG4gKiB8ICBiICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICB8ICBCICB8IEZsZXhpYmxlIGRheSBwZXJpb2QgICAgICAgICAgICB8XG4gKiB8ICBjICB8IFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrICB8ICBDKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8XG4gKiB8ICBkICB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICB8ICBEICB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBlICB8IExvY2FsIGRheSBvZiB3ZWVrICAgICAgICAgICAgICB8ICBFICB8IERheSBvZiB3ZWVrICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBmICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBGKiB8IERheSBvZiB3ZWVrIGluIG1vbnRoICAgICAgICAgICB8XG4gKiB8ICBnKiB8IE1vZGlmaWVkIEp1bGlhbiBkYXkgICAgICAgICAgICB8ICBHICB8IEVyYSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBoICB8IEhvdXIgWzEtMTJdICAgICAgICAgICAgICAgICAgICB8ICBIICB8IEhvdXIgWzAtMjNdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBpISB8IElTTyBkYXkgb2Ygd2VlayAgICAgICAgICAgICAgICB8ICBJISB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICB8XG4gKiB8ICBqKiB8IExvY2FsaXplZCBob3VyIHcvIGRheSBwZXJpb2QgICB8ICBKKiB8IExvY2FsaXplZCBob3VyIHcvbyBkYXkgcGVyaW9kICB8XG4gKiB8ICBrICB8IEhvdXIgWzEtMjRdICAgICAgICAgICAgICAgICAgICB8ICBLICB8IEhvdXIgWzAtMTFdICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBsKiB8IChkZXByZWNhdGVkKSAgICAgICAgICAgICAgICAgICB8ICBMICB8IFN0YW5kLWFsb25lIG1vbnRoICAgICAgICAgICAgICB8XG4gKiB8ICBtICB8IE1pbnV0ZSAgICAgICAgICAgICAgICAgICAgICAgICB8ICBNICB8IE1vbnRoICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBuICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICBOICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICBvISB8IE9yZGluYWwgbnVtYmVyIG1vZGlmaWVyICAgICAgICB8ICBPICB8IFRpbWV6b25lIChHTVQpICAgICAgICAgICAgICAgICB8XG4gKiB8ICBwISB8IExvbmcgbG9jYWxpemVkIHRpbWUgICAgICAgICAgICB8ICBQISB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICB8XG4gKiB8ICBxICB8IFN0YW5kLWFsb25lIHF1YXJ0ZXIgICAgICAgICAgICB8ICBRICB8IFF1YXJ0ZXIgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICByKiB8IFJlbGF0ZWQgR3JlZ29yaWFuIHllYXIgICAgICAgICB8ICBSISB8IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyICAgICAgICB8XG4gKiB8ICBzICB8IFNlY29uZCAgICAgICAgICAgICAgICAgICAgICAgICB8ICBTICB8IEZyYWN0aW9uIG9mIHNlY29uZCAgICAgICAgICAgICB8XG4gKiB8ICB0ISB8IFNlY29uZHMgdGltZXN0YW1wICAgICAgICAgICAgICB8ICBUISB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICB8XG4gKiB8ICB1ICB8IEV4dGVuZGVkIHllYXIgICAgICAgICAgICAgICAgICB8ICBVKiB8IEN5Y2xpYyB5ZWFyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICB2KiB8IFRpbWV6b25lIChnZW5lcmljIG5vbi1sb2NhdC4pICB8ICBWKiB8IFRpbWV6b25lIChsb2NhdGlvbikgICAgICAgICAgICB8XG4gKiB8ICB3ICB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICB8ICBXKiB8IFdlZWsgb2YgbW9udGggICAgICAgICAgICAgICAgICB8XG4gKiB8ICB4ICB8IFRpbWV6b25lIChJU08tODYwMSB3L28gWikgICAgICB8ICBYICB8IFRpbWV6b25lIChJU08tODYwMSkgICAgICAgICAgICB8XG4gKiB8ICB5ICB8IFllYXIgKGFicykgICAgICAgICAgICAgICAgICAgICB8ICBZICB8IExvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICB8XG4gKiB8ICB6ICB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSB8ICBaKiB8IFRpbWV6b25lIChhbGlhc2VzKSAgICAgICAgICAgICB8XG4gKlxuICogTGV0dGVycyBtYXJrZWQgYnkgKiBhcmUgbm90IGltcGxlbWVudGVkIGJ1dCByZXNlcnZlZCBieSBVbmljb2RlIHN0YW5kYXJkLlxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICEgYXJlIG5vbi1zdGFuZGFyZCwgYnV0IGltcGxlbWVudGVkIGJ5IGRhdGUtZm5zOlxuICogLSBgb2AgbW9kaWZpZXMgdGhlIHByZXZpb3VzIHRva2VuIHRvIHR1cm4gaXQgaW50byBhbiBvcmRpbmFsIChzZWUgYGZvcm1hdGAgZG9jcylcbiAqIC0gYGlgIGlzIElTTyBkYXkgb2Ygd2Vlay4gRm9yIGBpYCBhbmQgYGlpYCBpcyByZXR1cm5zIG51bWVyaWMgSVNPIHdlZWsgZGF5cyxcbiAqICAgaS5lLiA3IGZvciBTdW5kYXksIDEgZm9yIE1vbmRheSwgZXRjLlxuICogLSBgSWAgaXMgSVNPIHdlZWsgb2YgeWVhciwgYXMgb3Bwb3NlZCB0byBgd2Agd2hpY2ggaXMgbG9jYWwgd2VlayBvZiB5ZWFyLlxuICogLSBgUmAgaXMgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsIGFzIG9wcG9zZWQgdG8gYFlgIHdoaWNoIGlzIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXIuXG4gKiAgIGBSYCBpcyBzdXBwb3NlZCB0byBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYElgIGFuZCBgaWBcbiAqICAgZm9yIHVuaXZlcnNhbCBJU08gd2Vlay1udW1iZXJpbmcgZGF0ZSwgd2hlcmVhc1xuICogICBgWWAgaXMgc3VwcG9zZWQgdG8gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGB3YCBhbmQgYGVgXG4gKiAgIGZvciB3ZWVrLW51bWJlcmluZyBkYXRlIHNwZWNpZmljIHRvIHRoZSBsb2NhbGUuXG4gKiAtIGBQYCBpcyBsb25nIGxvY2FsaXplZCBkYXRlIGZvcm1hdFxuICogLSBgcGAgaXMgbG9uZyBsb2NhbGl6ZWQgdGltZSBmb3JtYXRcbiAqL1xuXG5leHBvcnQgY29uc3QgZm9ybWF0dGVycyA9IHtcbiAgLy8gRXJhXG4gIEc6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBlcmEgPSBkYXRlLmdldEZ1bGxZZWFyKCkgPiAwID8gMSA6IDA7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gQUQsIEJDXG4gICAgICBjYXNlIFwiR1wiOlxuICAgICAgY2FzZSBcIkdHXCI6XG4gICAgICBjYXNlIFwiR0dHXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcImFiYnJldmlhdGVkXCIgfSk7XG4gICAgICAvLyBBLCBCXG4gICAgICBjYXNlIFwiR0dHR0dcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmVyYShlcmEsIHsgd2lkdGg6IFwibmFycm93XCIgfSk7XG4gICAgICAvLyBBbm5vIERvbWluaSwgQmVmb3JlIENocmlzdFxuICAgICAgY2FzZSBcIkdHR0dcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5lcmEoZXJhLCB7IHdpZHRoOiBcIndpZGVcIiB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gWWVhclxuICB5OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgLy8gT3JkaW5hbCBudW1iZXJcbiAgICBpZiAodG9rZW4gPT09IFwieW9cIikge1xuICAgICAgY29uc3Qgc2lnbmVkWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgIC8vIFJldHVybnMgMSBmb3IgMSBCQyAod2hpY2ggaXMgeWVhciAwIGluIEphdmFTY3JpcHQpXG4gICAgICBjb25zdCB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih5ZWFyLCB7IHVuaXQ6IFwieWVhclwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMueShkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhclxuICBZOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgc2lnbmVkV2Vla1llYXIgPSBnZXRXZWVrWWVhcihkYXRlLCBvcHRpb25zKTtcbiAgICAvLyBSZXR1cm5zIDEgZm9yIDEgQkMgKHdoaWNoIGlzIHllYXIgMCBpbiBKYXZhU2NyaXB0KVxuICAgIGNvbnN0IHdlZWtZZWFyID0gc2lnbmVkV2Vla1llYXIgPiAwID8gc2lnbmVkV2Vla1llYXIgOiAxIC0gc2lnbmVkV2Vla1llYXI7XG5cbiAgICAvLyBUd28gZGlnaXQgeWVhclxuICAgIGlmICh0b2tlbiA9PT0gXCJZWVwiKSB7XG4gICAgICBjb25zdCB0d29EaWdpdFllYXIgPSB3ZWVrWWVhciAlIDEwMDtcbiAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3ModHdvRGlnaXRZZWFyLCAyKTtcbiAgICB9XG5cbiAgICAvLyBPcmRpbmFsIG51bWJlclxuICAgIGlmICh0b2tlbiA9PT0gXCJZb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcih3ZWVrWWVhciwgeyB1bml0OiBcInllYXJcIiB9KTtcbiAgICB9XG5cbiAgICAvLyBQYWRkaW5nXG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh3ZWVrWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhclxuICBSOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4pIHtcbiAgICBjb25zdCBpc29XZWVrWWVhciA9IGdldElTT1dlZWtZZWFyKGRhdGUpO1xuXG4gICAgLy8gUGFkZGluZ1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaXNvV2Vla1llYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRXh0ZW5kZWQgeWVhci4gVGhpcyBpcyBhIHNpbmdsZSBudW1iZXIgZGVzaWduYXRpbmcgdGhlIHllYXIgb2YgdGhpcyBjYWxlbmRhciBzeXN0ZW0uXG4gIC8vIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBsb2NhbGl6ZXJzIGFyZSBCLkMuIHllYXJzOlxuICAvLyB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICAvLyB8LS0tLS0tfC0tLS0tfC0tLS0tfFxuICAvLyB8IEFDIDEgfCAgIDEgfCAgIDEgfFxuICAvLyB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICAvLyB8IEJDIDIgfCAgIDIgfCAgLTEgfFxuICAvLyBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gIC8vIHdoaWxlIGB1dWAgcGFkcyBzaW5nbGUgZGlnaXQgeWVhcnMgdG8gMiBjaGFyYWN0ZXJzIGFuZCByZXR1cm5zIG90aGVyIHllYXJzIHVuY2hhbmdlZC5cbiAgdTogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gUXVhcnRlclxuICBROiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRNb250aCgpICsgMSkgLyAzKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAzLCA0XG4gICAgICBjYXNlIFwiUVwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKHF1YXJ0ZXIpO1xuICAgICAgLy8gMDEsIDAyLCAwMywgMDRcbiAgICAgIGNhc2UgXCJRUVwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHF1YXJ0ZXIsIDIpO1xuICAgICAgLy8gMXN0LCAybmQsIDNyZCwgNHRoXG4gICAgICBjYXNlIFwiUW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIocXVhcnRlciwgeyB1bml0OiBcInF1YXJ0ZXJcIiB9KTtcbiAgICAgIC8vIFExLCBRMiwgUTMsIFE0XG4gICAgICBjYXNlIFwiUVFRXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDEsIDIsIDMsIDQgKG5hcnJvdyBxdWFydGVyOyBjb3VsZCBiZSBub3QgbnVtZXJpY2FsKVxuICAgICAgY2FzZSBcIlFRUVFRXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJuYXJyb3dcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyAxc3QgcXVhcnRlciwgMm5kIHF1YXJ0ZXIsIC4uLlxuICAgICAgY2FzZSBcIlFRUVFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5xdWFydGVyKHF1YXJ0ZXIsIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBTdGFuZC1hbG9uZSBxdWFydGVyXG4gIHE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBxdWFydGVyID0gTWF0aC5jZWlsKChkYXRlLmdldE1vbnRoKCkgKyAxKSAvIDMpO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDEsIDIsIDMsIDRcbiAgICAgIGNhc2UgXCJxXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcocXVhcnRlcik7XG4gICAgICAvLyAwMSwgMDIsIDAzLCAwNFxuICAgICAgY2FzZSBcInFxXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MocXVhcnRlciwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgICAgIGNhc2UgXCJxb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7IHVuaXQ6IFwicXVhcnRlclwiIH0pO1xuICAgICAgLy8gUTEsIFEyLCBRMywgUTRcbiAgICAgIGNhc2UgXCJxcXFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gMSwgMiwgMywgNCAobmFycm93IHF1YXJ0ZXI7IGNvdWxkIGJlIG5vdCBudW1lcmljYWwpXG4gICAgICBjYXNlIFwicXFxcXFcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uXG4gICAgICBjYXNlIFwicXFxcVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLnF1YXJ0ZXIocXVhcnRlciwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1vbnRoXG4gIE06IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiTVwiOlxuICAgICAgY2FzZSBcIk1NXCI6XG4gICAgICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuTShkYXRlLCB0b2tlbik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlIFwiTW9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7IHVuaXQ6IFwibW9udGhcIiB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSBcIk1NTVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSBcIk1NTU1NXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlIFwiTU1NTVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7IHdpZHRoOiBcIndpZGVcIiwgY29udGV4dDogXCJmb3JtYXR0aW5nXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIG1vbnRoXG4gIEw6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyAxLCAyLCAuLi4sIDEyXG4gICAgICBjYXNlIFwiTFwiOlxuICAgICAgICByZXR1cm4gU3RyaW5nKG1vbnRoICsgMSk7XG4gICAgICAvLyAwMSwgMDIsIC4uLiwgMTJcbiAgICAgIGNhc2UgXCJMTFwiOlxuICAgICAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKG1vbnRoICsgMSwgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCAxMnRoXG4gICAgICBjYXNlIFwiTG9cIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIobW9udGggKyAxLCB7IHVuaXQ6IFwibW9udGhcIiB9KTtcbiAgICAgIC8vIEphbiwgRmViLCAuLi4sIERlY1xuICAgICAgY2FzZSBcIkxMTFwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUubW9udGgobW9udGgsIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEosIEYsIC4uLiwgRFxuICAgICAgY2FzZSBcIkxMTExMXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5tb250aChtb250aCwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICAgICBjYXNlIFwiTExMTFwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLm1vbnRoKG1vbnRoLCB7IHdpZHRoOiBcIndpZGVcIiwgY29udGV4dDogXCJzdGFuZGFsb25lXCIgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIExvY2FsIHdlZWsgb2YgeWVhclxuICB3OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgd2VlayA9IGdldFdlZWsoZGF0ZSwgb3B0aW9ucyk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwid29cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIod2VlaywgeyB1bml0OiBcIndlZWtcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHdlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWsgb2YgeWVhclxuICBJOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaXNvV2VlayA9IGdldElTT1dlZWsoZGF0ZSk7XG5cbiAgICBpZiAodG9rZW4gPT09IFwiSW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoaXNvV2VlaywgeyB1bml0OiBcIndlZWtcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGlzb1dlZWssIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHRoZSBtb250aFxuICBkOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcImRvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0RGF0ZSgpLCB7IHVuaXQ6IFwiZGF0ZVwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuZChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXJcbiAgRDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGRheU9mWWVhciA9IGdldERheU9mWWVhcihkYXRlKTtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJEb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXlPZlllYXIsIHsgdW5pdDogXCJkYXlPZlllYXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRheU9mWWVhciwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2Vla1xuICBFOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICAvLyBUdWVcbiAgICAgIGNhc2UgXCJFXCI6XG4gICAgICBjYXNlIFwiRUVcIjpcbiAgICAgIGNhc2UgXCJFRUVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFRcbiAgICAgIGNhc2UgXCJFRUVFRVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1XG4gICAgICBjYXNlIFwiRUVFRUVFXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwic2hvcnRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICAvLyBUdWVzZGF5XG4gICAgICBjYXNlIFwiRUVFRVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJ3aWRlXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBMb2NhbCBkYXkgb2Ygd2Vla1xuICBlOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBsb2NhbERheU9mV2VlayA9IChkYXlPZldlZWsgLSBvcHRpb25zLndlZWtTdGFydHNPbiArIDgpICUgNyB8fCA3O1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIE51bWVyaWNhbCB2YWx1ZSAoTnRoIGRheSBvZiB3ZWVrIHdpdGggY3VycmVudCBsb2NhbGUgb3Igd2Vla1N0YXJ0c09uKVxuICAgICAgY2FzZSBcImVcIjpcbiAgICAgICAgcmV0dXJuIFN0cmluZyhsb2NhbERheU9mV2Vlayk7XG4gICAgICAvLyBQYWRkZWQgbnVtZXJpY2FsIHZhbHVlXG4gICAgICBjYXNlIFwiZWVcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhsb2NhbERheU9mV2VlaywgMik7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgXCJlb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgY2FzZSBcImVlZVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImVlZWVlXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJlZWVlZWVcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJlZWVlXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIFN0YW5kLWFsb25lIGxvY2FsIGRheSBvZiB3ZWVrXG4gIGM6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBkYXlPZldlZWsgPSBkYXRlLmdldERheSgpO1xuICAgIGNvbnN0IGxvY2FsRGF5T2ZXZWVrID0gKGRheU9mV2VlayAtIG9wdGlvbnMud2Vla1N0YXJ0c09uICsgOCkgJSA3IHx8IDc7XG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gTnVtZXJpY2FsIHZhbHVlIChzYW1lIGFzIGluIGBlYClcbiAgICAgIGNhc2UgXCJjXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcobG9jYWxEYXlPZldlZWspO1xuICAgICAgLy8gUGFkZGVkIG51bWVyaWNhbCB2YWx1ZVxuICAgICAgY2FzZSBcImNjXCI6XG4gICAgICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MobG9jYWxEYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAxc3QsIDJuZCwgLi4uLCA3dGhcbiAgICAgIGNhc2UgXCJjb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihsb2NhbERheU9mV2VlaywgeyB1bml0OiBcImRheVwiIH0pO1xuICAgICAgY2FzZSBcImNjY1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImNjY2NjXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJjY2NjY2NcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJjY2NjXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIElTTyBkYXkgb2Ygd2Vla1xuICBpOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgZGF5T2ZXZWVrID0gZGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBpc29EYXlPZldlZWsgPSBkYXlPZldlZWsgPT09IDAgPyA3IDogZGF5T2ZXZWVrO1xuICAgIHN3aXRjaCAodG9rZW4pIHtcbiAgICAgIC8vIDJcbiAgICAgIGNhc2UgXCJpXCI6XG4gICAgICAgIHJldHVybiBTdHJpbmcoaXNvRGF5T2ZXZWVrKTtcbiAgICAgIC8vIDAyXG4gICAgICBjYXNlIFwiaWlcIjpcbiAgICAgICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhpc29EYXlPZldlZWssIHRva2VuLmxlbmd0aCk7XG4gICAgICAvLyAybmRcbiAgICAgIGNhc2UgXCJpb1wiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihpc29EYXlPZldlZWssIHsgdW5pdDogXCJkYXlcIiB9KTtcbiAgICAgIC8vIFR1ZVxuICAgICAgY2FzZSBcImlpaVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVFxuICAgICAgY2FzZSBcImlpaWlpXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXkoZGF5T2ZXZWVrLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgLy8gVHVcbiAgICAgIGNhc2UgXCJpaWlpaWlcIjpcbiAgICAgICAgcmV0dXJuIGxvY2FsaXplLmRheShkYXlPZldlZWssIHtcbiAgICAgICAgICB3aWR0aDogXCJzaG9ydFwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIC8vIFR1ZXNkYXlcbiAgICAgIGNhc2UgXCJpaWlpXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5KGRheU9mV2Vlaywge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFNIG9yIFBNXG4gIGE6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBkYXlQZXJpb2RFbnVtVmFsdWUgPSBob3VycyAvIDEyID49IDEgPyBcInBtXCIgOiBcImFtXCI7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYVwiOlxuICAgICAgY2FzZSBcImFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYWFhXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZVxuICAgICAgICAgIC5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJhYWFhYVwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJhYWFhXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFNLCBQTSwgbWlkbmlnaHQsIG5vb25cbiAgYjogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID09PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5ub29uO1xuICAgIH0gZWxzZSBpZiAoaG91cnMgPT09IDApIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubWlkbmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGhvdXJzIC8gMTIgPj0gMSA/IFwicG1cIiA6IFwiYW1cIjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYlwiOlxuICAgICAgY2FzZSBcImJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwiYWJicmV2aWF0ZWRcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgICBjYXNlIFwiYmJiXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZVxuICAgICAgICAgIC5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgICB3aWR0aDogXCJhYmJyZXZpYXRlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJiYmJiYlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIm5hcnJvd1wiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICAgIGNhc2UgXCJiYmJiXCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcIndpZGVcIixcbiAgICAgICAgICBjb250ZXh0OiBcImZvcm1hdHRpbmdcIixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIGluIHRoZSBtb3JuaW5nLCBpbiB0aGUgYWZ0ZXJub29uLCBpbiB0aGUgZXZlbmluZywgYXQgbmlnaHRcbiAgQjogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGNvbnN0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgIGxldCBkYXlQZXJpb2RFbnVtVmFsdWU7XG4gICAgaWYgKGhvdXJzID49IDE3KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLmV2ZW5pbmc7XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSAxMikge1xuICAgICAgZGF5UGVyaW9kRW51bVZhbHVlID0gZGF5UGVyaW9kRW51bS5hZnRlcm5vb247XG4gICAgfSBlbHNlIGlmIChob3VycyA+PSA0KSB7XG4gICAgICBkYXlQZXJpb2RFbnVtVmFsdWUgPSBkYXlQZXJpb2RFbnVtLm1vcm5pbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRheVBlcmlvZEVudW1WYWx1ZSA9IGRheVBlcmlvZEVudW0ubmlnaHQ7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgY2FzZSBcIkJcIjpcbiAgICAgIGNhc2UgXCJCQlwiOlxuICAgICAgY2FzZSBcIkJCQlwiOlxuICAgICAgICByZXR1cm4gbG9jYWxpemUuZGF5UGVyaW9kKGRheVBlcmlvZEVudW1WYWx1ZSwge1xuICAgICAgICAgIHdpZHRoOiBcImFiYnJldmlhdGVkXCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcIkJCQkJCXCI6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwibmFycm93XCIsXG4gICAgICAgICAgY29udGV4dDogXCJmb3JtYXR0aW5nXCIsXG4gICAgICAgIH0pO1xuICAgICAgY2FzZSBcIkJCQkJcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBsb2NhbGl6ZS5kYXlQZXJpb2QoZGF5UGVyaW9kRW51bVZhbHVlLCB7XG4gICAgICAgICAgd2lkdGg6IFwid2lkZVwiLFxuICAgICAgICAgIGNvbnRleHQ6IFwiZm9ybWF0dGluZ1wiLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91ciBbMS0xMl1cbiAgaDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJob1wiKSB7XG4gICAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcbiAgICAgIGlmIChob3VycyA9PT0gMCkgaG91cnMgPSAxMjtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBsaWdodEZvcm1hdHRlcnMuaChkYXRlLCB0b2tlbik7XG4gIH0sXG5cbiAgLy8gSG91ciBbMC0yM11cbiAgSDogZnVuY3Rpb24gKGRhdGUsIHRva2VuLCBsb2NhbGl6ZSkge1xuICAgIGlmICh0b2tlbiA9PT0gXCJIb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihkYXRlLmdldEhvdXJzKCksIHsgdW5pdDogXCJob3VyXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5IKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBIb3VyIFswLTExXVxuICBLOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcblxuICAgIGlmICh0b2tlbiA9PT0gXCJLb1wiKSB7XG4gICAgICByZXR1cm4gbG9jYWxpemUub3JkaW5hbE51bWJlcihob3VycywgeyB1bml0OiBcImhvdXJcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGhvdXJzLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEhvdXIgWzEtMjRdXG4gIGs6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBsZXQgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgaWYgKGhvdXJzID09PSAwKSBob3VycyA9IDI0O1xuXG4gICAgaWYgKHRva2VuID09PSBcImtvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGhvdXJzLCB7IHVuaXQ6IFwiaG91clwiIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoaG91cnMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTWludXRlXG4gIG06IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgbG9jYWxpemUpIHtcbiAgICBpZiAodG9rZW4gPT09IFwibW9cIikge1xuICAgICAgcmV0dXJuIGxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRNaW51dGVzKCksIHsgdW5pdDogXCJtaW51dGVcIiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlnaHRGb3JtYXR0ZXJzLm0oZGF0ZSwgdG9rZW4pO1xuICB9LFxuXG4gIC8vIFNlY29uZFxuICBzOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIGxvY2FsaXplKSB7XG4gICAgaWYgKHRva2VuID09PSBcInNvXCIpIHtcbiAgICAgIHJldHVybiBsb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0U2Vjb25kcygpLCB7IHVuaXQ6IFwic2Vjb25kXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5zKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBGcmFjdGlvbiBvZiBzZWNvbmRcbiAgUzogZnVuY3Rpb24gKGRhdGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIGxpZ2h0Rm9ybWF0dGVycy5TKGRhdGUsIHRva2VuKTtcbiAgfSxcblxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYWx3YXlzIGAnWidgKVxuICBYOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgaWYgKHRpbWV6b25lT2Zmc2V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gXCJaXCI7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgXCJYXCI6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGBYWGBcbiAgICAgIGNhc2UgXCJYWFhYXCI6XG4gICAgICBjYXNlIFwiWFhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYFhYWGBcbiAgICAgIGNhc2UgXCJYWFhYWFwiOlxuICAgICAgY2FzZSBcIlhYWFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoSVNPLTg2MDEuIElmIG9mZnNldCBpcyAwLCBvdXRwdXQgaXMgYCcrMDA6MDAnYCBvciBlcXVpdmFsZW50KVxuICB4OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gSG91cnMgYW5kIG9wdGlvbmFsIG1pbnV0ZXNcbiAgICAgIGNhc2UgXCJ4XCI6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXModGltZXpvbmVPZmZzZXQpO1xuXG4gICAgICAvLyBIb3VycywgbWludXRlcyBhbmQgb3B0aW9uYWwgc2Vjb25kcyB3aXRob3V0IGA6YCBkZWxpbWl0ZXJcbiAgICAgIC8vIE5vdGU6IG5laXRoZXIgSVNPLTg2MDEgbm9yIEphdmFTY3JpcHQgc3VwcG9ydHMgc2Vjb25kcyBpbiB0aW1lem9uZSBvZmZzZXRzXG4gICAgICAvLyBzbyB0aGlzIHRva2VuIGFsd2F5cyBoYXMgdGhlIHNhbWUgb3V0cHV0IGFzIGB4eGBcbiAgICAgIGNhc2UgXCJ4eHh4XCI6XG4gICAgICBjYXNlIFwieHhcIjogLy8gSG91cnMgYW5kIG1pbnV0ZXMgd2l0aG91dCBgOmAgZGVsaW1pdGVyXG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCk7XG5cbiAgICAgIC8vIEhvdXJzLCBtaW51dGVzIGFuZCBvcHRpb25hbCBzZWNvbmRzIHdpdGggYDpgIGRlbGltaXRlclxuICAgICAgLy8gTm90ZTogbmVpdGhlciBJU08tODYwMSBub3IgSmF2YVNjcmlwdCBzdXBwb3J0cyBzZWNvbmRzIGluIHRpbWV6b25lIG9mZnNldHNcbiAgICAgIC8vIHNvIHRoaXMgdG9rZW4gYWx3YXlzIGhhcyB0aGUgc2FtZSBvdXRwdXQgYXMgYHh4eGBcbiAgICAgIGNhc2UgXCJ4eHh4eFwiOlxuICAgICAgY2FzZSBcInh4eFwiOiAvLyBIb3VycyBhbmQgbWludXRlcyB3aXRoIGA6YCBkZWxpbWl0ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoR01UKVxuICBPOiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgXCJPXCI6XG4gICAgICBjYXNlIFwiT09cIjpcbiAgICAgIGNhc2UgXCJPT09cIjpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlIFwiT09PT1wiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBUaW1lem9uZSAoc3BlY2lmaWMgbm9uLWxvY2F0aW9uKVxuICB6OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWV6b25lT2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXG4gICAgc3dpdGNoICh0b2tlbikge1xuICAgICAgLy8gU2hvcnRcbiAgICAgIGNhc2UgXCJ6XCI6XG4gICAgICBjYXNlIFwienpcIjpcbiAgICAgIGNhc2UgXCJ6enpcIjpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZVNob3J0KHRpbWV6b25lT2Zmc2V0LCBcIjpcIik7XG4gICAgICAvLyBMb25nXG4gICAgICBjYXNlIFwienp6elwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFwiR01UXCIgKyBmb3JtYXRUaW1lem9uZSh0aW1lem9uZU9mZnNldCwgXCI6XCIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBTZWNvbmRzIHRpbWVzdGFtcFxuICB0OiBmdW5jdGlvbiAoZGF0ZSwgdG9rZW4sIF9sb2NhbGl6ZSkge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgudHJ1bmMoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKHRpbWVzdGFtcCwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNaWxsaXNlY29uZHMgdGltZXN0YW1wXG4gIFQ6IGZ1bmN0aW9uIChkYXRlLCB0b2tlbiwgX2xvY2FsaXplKSB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0aW1lc3RhbXAsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG59O1xuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVNob3J0KG9mZnNldCwgZGVsaW1pdGVyID0gXCJcIikge1xuICBjb25zdCBzaWduID0gb2Zmc2V0ID4gMCA/IFwiLVwiIDogXCIrXCI7XG4gIGNvbnN0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC50cnVuYyhhYnNPZmZzZXQgLyA2MCk7XG4gIGNvbnN0IG1pbnV0ZXMgPSBhYnNPZmZzZXQgJSA2MDtcbiAgaWYgKG1pbnV0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gc2lnbiArIFN0cmluZyhob3Vycyk7XG4gIH1cbiAgcmV0dXJuIHNpZ24gKyBTdHJpbmcoaG91cnMpICsgZGVsaW1pdGVyICsgYWRkTGVhZGluZ1plcm9zKG1pbnV0ZXMsIDIpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lem9uZVdpdGhPcHRpb25hbE1pbnV0ZXMob2Zmc2V0LCBkZWxpbWl0ZXIpIHtcbiAgaWYgKG9mZnNldCAlIDYwID09PSAwKSB7XG4gICAgY29uc3Qgc2lnbiA9IG9mZnNldCA+IDAgPyBcIi1cIiA6IFwiK1wiO1xuICAgIHJldHVybiBzaWduICsgYWRkTGVhZGluZ1plcm9zKE1hdGguYWJzKG9mZnNldCkgLyA2MCwgMik7XG4gIH1cbiAgcmV0dXJuIGZvcm1hdFRpbWV6b25lKG9mZnNldCwgZGVsaW1pdGVyKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUob2Zmc2V0LCBkZWxpbWl0ZXIgPSBcIlwiKSB7XG4gIGNvbnN0IHNpZ24gPSBvZmZzZXQgPiAwID8gXCItXCIgOiBcIitcIjtcbiAgY29uc3QgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgY29uc3QgaG91cnMgPSBhZGRMZWFkaW5nWmVyb3MoTWF0aC50cnVuYyhhYnNPZmZzZXQgLyA2MCksIDIpO1xuICBjb25zdCBtaW51dGVzID0gYWRkTGVhZGluZ1plcm9zKGFic09mZnNldCAlIDYwLCAyKTtcbiAgcmV0dXJuIHNpZ24gKyBob3VycyArIGRlbGltaXRlciArIG1pbnV0ZXM7XG59XG4iLCJpbXBvcnQgeyBhZGRMZWFkaW5nWmVyb3MgfSBmcm9tIFwiLi4vYWRkTGVhZGluZ1plcm9zLm1qc1wiO1xuXG4vKlxuICogfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgfCBVbml0ICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAgYSAgfCBBTSwgUE0gICAgICAgICAgICAgICAgICAgICAgICAgfCAgQSogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgZCAgfCBEYXkgb2YgbW9udGggICAgICAgICAgICAgICAgICAgfCAgRCAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgaCAgfCBIb3VyIFsxLTEyXSAgICAgICAgICAgICAgICAgICAgfCAgSCAgfCBIb3VyIFswLTIzXSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgbSAgfCBNaW51dGUgICAgICAgICAgICAgICAgICAgICAgICAgfCAgTSAgfCBNb250aCAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgcyAgfCBTZWNvbmQgICAgICAgICAgICAgICAgICAgICAgICAgfCAgUyAgfCBGcmFjdGlvbiBvZiBzZWNvbmQgICAgICAgICAgICAgfFxuICogfCAgeSAgfCBZZWFyIChhYnMpICAgICAgICAgICAgICAgICAgICAgfCAgWSAgfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICpcbiAqIExldHRlcnMgbWFya2VkIGJ5ICogYXJlIG5vdCBpbXBsZW1lbnRlZCBidXQgcmVzZXJ2ZWQgYnkgVW5pY29kZSBzdGFuZGFyZC5cbiAqL1xuXG5leHBvcnQgY29uc3QgbGlnaHRGb3JtYXR0ZXJzID0ge1xuICAvLyBZZWFyXG4gIHkoZGF0ZSwgdG9rZW4pIHtcbiAgICAvLyBGcm9tIGh0dHA6Ly93d3cudW5pY29kZS5vcmcvcmVwb3J0cy90cjM1L3RyMzUtMzEvdHIzNS1kYXRlcy5odG1sI0RhdGVfRm9ybWF0X3Rva2Vuc1xuICAgIC8vIHwgWWVhciAgICAgfCAgICAgeSB8IHl5IHwgICB5eXkgfCAgeXl5eSB8IHl5eXl5IHxcbiAgICAvLyB8LS0tLS0tLS0tLXwtLS0tLS0tfC0tLS18LS0tLS0tLXwtLS0tLS0tfC0tLS0tLS18XG4gICAgLy8gfCBBRCAxICAgICB8ICAgICAxIHwgMDEgfCAgIDAwMSB8ICAwMDAxIHwgMDAwMDEgfFxuICAgIC8vIHwgQUQgMTIgICAgfCAgICAxMiB8IDEyIHwgICAwMTIgfCAgMDAxMiB8IDAwMDEyIHxcbiAgICAvLyB8IEFEIDEyMyAgIHwgICAxMjMgfCAyMyB8ICAgMTIzIHwgIDAxMjMgfCAwMDEyMyB8XG4gICAgLy8gfCBBRCAxMjM0ICB8ICAxMjM0IHwgMzQgfCAgMTIzNCB8ICAxMjM0IHwgMDEyMzQgfFxuICAgIC8vIHwgQUQgMTIzNDUgfCAxMjM0NSB8IDQ1IHwgMTIzNDUgfCAxMjM0NSB8IDEyMzQ1IHxcblxuICAgIGNvbnN0IHNpZ25lZFllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgLy8gUmV0dXJucyAxIGZvciAxIEJDICh3aGljaCBpcyB5ZWFyIDAgaW4gSmF2YVNjcmlwdClcbiAgICBjb25zdCB5ZWFyID0gc2lnbmVkWWVhciA+IDAgPyBzaWduZWRZZWFyIDogMSAtIHNpZ25lZFllYXI7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyh0b2tlbiA9PT0gXCJ5eVwiID8geWVhciAlIDEwMCA6IHllYXIsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gTW9udGhcbiAgTShkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIHJldHVybiB0b2tlbiA9PT0gXCJNXCIgPyBTdHJpbmcobW9udGggKyAxKSA6IGFkZExlYWRpbmdaZXJvcyhtb250aCArIDEsIDIpO1xuICB9LFxuXG4gIC8vIERheSBvZiB0aGUgbW9udGhcbiAgZChkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXREYXRlKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gQU0gb3IgUE1cbiAgYShkYXRlLCB0b2tlbikge1xuICAgIGNvbnN0IGRheVBlcmlvZEVudW1WYWx1ZSA9IGRhdGUuZ2V0SG91cnMoKSAvIDEyID49IDEgPyBcInBtXCIgOiBcImFtXCI7XG5cbiAgICBzd2l0Y2ggKHRva2VuKSB7XG4gICAgICBjYXNlIFwiYVwiOlxuICAgICAgY2FzZSBcImFhXCI6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJhYWFcIjpcbiAgICAgICAgcmV0dXJuIGRheVBlcmlvZEVudW1WYWx1ZTtcbiAgICAgIGNhc2UgXCJhYWFhYVwiOlxuICAgICAgICByZXR1cm4gZGF5UGVyaW9kRW51bVZhbHVlWzBdO1xuICAgICAgY2FzZSBcImFhYWFcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBkYXlQZXJpb2RFbnVtVmFsdWUgPT09IFwiYW1cIiA/IFwiYS5tLlwiIDogXCJwLm0uXCI7XG4gICAgfVxuICB9LFxuXG4gIC8vIEhvdXIgWzEtMTJdXG4gIGgoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0SG91cnMoKSAlIDEyIHx8IDEyLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEhvdXIgWzAtMjNdXG4gIEgoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0SG91cnMoKSwgdG9rZW4ubGVuZ3RoKTtcbiAgfSxcblxuICAvLyBNaW51dGVcbiAgbShkYXRlLCB0b2tlbikge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRNaW51dGVzKCksIHRva2VuLmxlbmd0aCk7XG4gIH0sXG5cbiAgLy8gU2Vjb25kXG4gIHMoZGF0ZSwgdG9rZW4pIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0U2Vjb25kcygpLCB0b2tlbi5sZW5ndGgpO1xuICB9LFxuXG4gIC8vIEZyYWN0aW9uIG9mIHNlY29uZFxuICBTKGRhdGUsIHRva2VuKSB7XG4gICAgY29uc3QgbnVtYmVyT2ZEaWdpdHMgPSB0b2tlbi5sZW5ndGg7XG4gICAgY29uc3QgbWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICBjb25zdCBmcmFjdGlvbmFsU2Vjb25kcyA9IE1hdGgudHJ1bmMoXG4gICAgICBtaWxsaXNlY29uZHMgKiBNYXRoLnBvdygxMCwgbnVtYmVyT2ZEaWdpdHMgLSAzKSxcbiAgICApO1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZnJhY3Rpb25hbFNlY29uZHMsIHRva2VuLmxlbmd0aCk7XG4gIH0sXG59O1xuIiwiY29uc3QgZGF0ZUxvbmdGb3JtYXR0ZXIgPSAocGF0dGVybiwgZm9ybWF0TG9uZykgPT4ge1xuICBzd2l0Y2ggKHBhdHRlcm4pIHtcbiAgICBjYXNlIFwiUFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7IHdpZHRoOiBcInNob3J0XCIgfSk7XG4gICAgY2FzZSBcIlBQXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwibWVkaXVtXCIgfSk7XG4gICAgY2FzZSBcIlBQUFwiOlxuICAgICAgcmV0dXJuIGZvcm1hdExvbmcuZGF0ZSh7IHdpZHRoOiBcImxvbmdcIiB9KTtcbiAgICBjYXNlIFwiUFBQUFwiOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy5kYXRlKHsgd2lkdGg6IFwiZnVsbFwiIH0pO1xuICB9XG59O1xuXG5jb25zdCB0aW1lTG9uZ0Zvcm1hdHRlciA9IChwYXR0ZXJuLCBmb3JtYXRMb25nKSA9PiB7XG4gIHN3aXRjaCAocGF0dGVybikge1xuICAgIGNhc2UgXCJwXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHsgd2lkdGg6IFwic2hvcnRcIiB9KTtcbiAgICBjYXNlIFwicHBcIjpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJtZWRpdW1cIiB9KTtcbiAgICBjYXNlIFwicHBwXCI6XG4gICAgICByZXR1cm4gZm9ybWF0TG9uZy50aW1lKHsgd2lkdGg6IFwibG9uZ1wiIH0pO1xuICAgIGNhc2UgXCJwcHBwXCI6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmb3JtYXRMb25nLnRpbWUoeyB3aWR0aDogXCJmdWxsXCIgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGRhdGVUaW1lTG9uZ0Zvcm1hdHRlciA9IChwYXR0ZXJuLCBmb3JtYXRMb25nKSA9PiB7XG4gIGNvbnN0IG1hdGNoUmVzdWx0ID0gcGF0dGVybi5tYXRjaCgvKFArKShwKyk/LykgfHwgW107XG4gIGNvbnN0IGRhdGVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMV07XG4gIGNvbnN0IHRpbWVQYXR0ZXJuID0gbWF0Y2hSZXN1bHRbMl07XG5cbiAgaWYgKCF0aW1lUGF0dGVybikge1xuICAgIHJldHVybiBkYXRlTG9uZ0Zvcm1hdHRlcihwYXR0ZXJuLCBmb3JtYXRMb25nKTtcbiAgfVxuXG4gIGxldCBkYXRlVGltZUZvcm1hdDtcblxuICBzd2l0Y2ggKGRhdGVQYXR0ZXJuKSB7XG4gICAgY2FzZSBcIlBcIjpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7IHdpZHRoOiBcInNob3J0XCIgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiUFBcIjpcbiAgICAgIGRhdGVUaW1lRm9ybWF0ID0gZm9ybWF0TG9uZy5kYXRlVGltZSh7IHdpZHRoOiBcIm1lZGl1bVwiIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBQUFwiOlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwibG9uZ1wiIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlBQUFBcIjpcbiAgICBkZWZhdWx0OlxuICAgICAgZGF0ZVRpbWVGb3JtYXQgPSBmb3JtYXRMb25nLmRhdGVUaW1lKHsgd2lkdGg6IFwiZnVsbFwiIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gZGF0ZVRpbWVGb3JtYXRcbiAgICAucmVwbGFjZShcInt7ZGF0ZX19XCIsIGRhdGVMb25nRm9ybWF0dGVyKGRhdGVQYXR0ZXJuLCBmb3JtYXRMb25nKSlcbiAgICAucmVwbGFjZShcInt7dGltZX19XCIsIHRpbWVMb25nRm9ybWF0dGVyKHRpbWVQYXR0ZXJuLCBmb3JtYXRMb25nKSk7XG59O1xuXG5leHBvcnQgY29uc3QgbG9uZ0Zvcm1hdHRlcnMgPSB7XG4gIHA6IHRpbWVMb25nRm9ybWF0dGVyLFxuICBQOiBkYXRlVGltZUxvbmdGb3JtYXR0ZXIsXG59O1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4uL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCB1dGNEYXRlID0gbmV3IERhdGUoXG4gICAgRGF0ZS5VVEMoXG4gICAgICBfZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgX2RhdGUuZ2V0TW9udGgoKSxcbiAgICAgIF9kYXRlLmdldERhdGUoKSxcbiAgICAgIF9kYXRlLmdldEhvdXJzKCksXG4gICAgICBfZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICBfZGF0ZS5nZXRTZWNvbmRzKCksXG4gICAgICBfZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSxcbiAgICApLFxuICApO1xuICB1dGNEYXRlLnNldFVUQ0Z1bGxZZWFyKF9kYXRlLmdldEZ1bGxZZWFyKCkpO1xuICByZXR1cm4gK2RhdGUgLSArdXRjRGF0ZTtcbn1cbiIsImNvbnN0IGRheU9mWWVhclRva2VuUkUgPSAvXkQrJC87XG5jb25zdCB3ZWVrWWVhclRva2VuUkUgPSAvXlkrJC87XG5cbmNvbnN0IHRocm93VG9rZW5zID0gW1wiRFwiLCBcIkREXCIsIFwiWVlcIiwgXCJZWVlZXCJdO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm90ZWN0ZWREYXlPZlllYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gZGF5T2ZZZWFyVG9rZW5SRS50ZXN0KHRva2VuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbih0b2tlbikge1xuICByZXR1cm4gd2Vla1llYXJUb2tlblJFLnRlc3QodG9rZW4pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvcih0b2tlbiwgZm9ybWF0LCBpbnB1dCkge1xuICBjb25zdCBfbWVzc2FnZSA9IG1lc3NhZ2UodG9rZW4sIGZvcm1hdCwgaW5wdXQpO1xuICBjb25zb2xlLndhcm4oX21lc3NhZ2UpO1xuICBpZiAodGhyb3dUb2tlbnMuaW5jbHVkZXModG9rZW4pKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihfbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIG1lc3NhZ2UodG9rZW4sIGZvcm1hdCwgaW5wdXQpIHtcbiAgY29uc3Qgc3ViamVjdCA9IHRva2VuWzBdID09PSBcIllcIiA/IFwieWVhcnNcIiA6IFwiZGF5cyBvZiB0aGUgbW9udGhcIjtcbiAgcmV0dXJuIGBVc2UgXFxgJHt0b2tlbi50b0xvd2VyQ2FzZSgpfVxcYCBpbnN0ZWFkIG9mIFxcYCR7dG9rZW59XFxgIChpbiBcXGAke2Zvcm1hdH1cXGApIGZvciBmb3JtYXR0aW5nICR7c3ViamVjdH0gdG8gdGhlIGlucHV0IFxcYCR7aW5wdXR9XFxgOyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRgO1xufVxuIiwiLyoqXG4gKiBAbW9kdWxlIGNvbnN0YW50c1xuICogQHN1bW1hcnkgVXNlZnVsIGNvbnN0YW50c1xuICogQGRlc2NyaXB0aW9uXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCBkYXRlIGNvbnN0YW50cy5cbiAqXG4gKiBUaGUgY29uc3RhbnRzIGNvdWxkIGJlIGltcG9ydGVkIGZyb20gYGRhdGUtZm5zL2NvbnN0YW50c2A6XG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IG1heFRpbWUsIG1pblRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogZnVuY3Rpb24gaXNBbGxvd2VkVGltZSh0aW1lKSB7XG4gKiAgIHJldHVybiB0aW1lIDw9IG1heFRpbWUgJiYgdGltZSA+PSBtaW5UaW1lO1xuICogfVxuICogYGBgXG4gKi9cblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIGRheXNJbldlZWtcbiAqIEBzdW1tYXJ5IERheXMgaW4gMSB3ZWVrLlxuICovXG5leHBvcnQgY29uc3QgZGF5c0luV2VlayA9IDc7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBkYXlzSW5ZZWFyXG4gKiBAc3VtbWFyeSBEYXlzIGluIDEgeWVhci5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEhvdyBtYW55IGRheXMgaW4gYSB5ZWFyLlxuICpcbiAqIE9uZSB5ZWFycyBlcXVhbHMgMzY1LjI0MjUgZGF5cyBhY2NvcmRpbmcgdG8gdGhlIGZvcm11bGE6XG4gKlxuICogPiBMZWFwIHllYXIgb2NjdXJlcyBldmVyeSA0IHllYXJzLCBleGNlcHQgZm9yIHllYXJzIHRoYXQgYXJlIGRpdmlzYWJsZSBieSAxMDAgYW5kIG5vdCBkaXZpc2FibGUgYnkgNDAwLlxuICogPiAxIG1lYW4geWVhciA9ICgzNjUrMS80LTEvMTAwKzEvNDAwKSBkYXlzID0gMzY1LjI0MjUgZGF5c1xuICovXG5leHBvcnQgY29uc3QgZGF5c0luWWVhciA9IDM2NS4yNDI1O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWF4VGltZVxuICogQHN1bW1hcnkgTWF4aW11bSBhbGxvd2VkIHRpbWUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IG1heFRpbWUgfSBmcm9tIFwiLi9jb25zdGFudHMvZGF0ZS1mbnMvY29uc3RhbnRzXCI7XG4gKlxuICogY29uc3QgaXNWYWxpZCA9IDg2NDAwMDAwMDAwMDAwMDEgPD0gbWF4VGltZTtcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBuZXcgRGF0ZSg4NjQwMDAwMDAwMDAwMDAxKTtcbiAqIC8vPT4gSW52YWxpZCBEYXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtYXhUaW1lID0gTWF0aC5wb3coMTAsIDgpICogMjQgKiA2MCAqIDYwICogMTAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pblRpbWVcbiAqIEBzdW1tYXJ5IE1pbmltdW0gYWxsb3dlZCB0aW1lLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBtaW5UaW1lIH0gZnJvbSBcIi4vY29uc3RhbnRzL2RhdGUtZm5zL2NvbnN0YW50c1wiO1xuICpcbiAqIGNvbnN0IGlzVmFsaWQgPSAtODY0MDAwMDAwMDAwMDAwMSA+PSBtaW5UaW1lO1xuICogLy89PiBmYWxzZVxuICpcbiAqIG5ldyBEYXRlKC04NjQwMDAwMDAwMDAwMDAxKVxuICogLy89PiBJbnZhbGlkIERhdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pblRpbWUgPSAtbWF4VGltZTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luV2Vla1xuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgd2Vlay5cbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luV2VlayA9IDYwNDgwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luRGF5XG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBkYXkuXG4gKi9cbmV4cG9ydCBjb25zdCBtaWxsaXNlY29uZHNJbkRheSA9IDg2NDAwMDAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWlsbGlzZWNvbmRzSW5NaW51dGVcbiAqIEBzdW1tYXJ5IE1pbGxpc2Vjb25kcyBpbiAxIG1pbnV0ZVxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5NaW51dGUgPSA2MDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luSG91clxuICogQHN1bW1hcnkgTWlsbGlzZWNvbmRzIGluIDEgaG91clxuICovXG5leHBvcnQgY29uc3QgbWlsbGlzZWNvbmRzSW5Ib3VyID0gMzYwMDAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luU2Vjb25kXG4gKiBAc3VtbWFyeSBNaWxsaXNlY29uZHMgaW4gMSBzZWNvbmRcbiAqL1xuZXhwb3J0IGNvbnN0IG1pbGxpc2Vjb25kc0luU2Vjb25kID0gMTAwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJblllYXJcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luWWVhciA9IDUyNTYwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbk1vbnRoXG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgbW9udGguXG4gKi9cbmV4cG9ydCBjb25zdCBtaW51dGVzSW5Nb250aCA9IDQzMjAwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbWludXRlc0luRGF5XG4gKiBAc3VtbWFyeSBNaW51dGVzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luRGF5ID0gMTQ0MDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1pbnV0ZXNJbkhvdXJcbiAqIEBzdW1tYXJ5IE1pbnV0ZXMgaW4gMSBob3VyLlxuICovXG5leHBvcnQgY29uc3QgbWludXRlc0luSG91ciA9IDYwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgbW9udGhzSW5RdWFydGVyXG4gKiBAc3VtbWFyeSBNb250aHMgaW4gMSBxdWFydGVyLlxuICovXG5leHBvcnQgY29uc3QgbW9udGhzSW5RdWFydGVyID0gMztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIG1vbnRoc0luWWVhclxuICogQHN1bW1hcnkgTW9udGhzIGluIDEgeWVhci5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbnRoc0luWWVhciA9IDEyO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgcXVhcnRlcnNJblllYXJcbiAqIEBzdW1tYXJ5IFF1YXJ0ZXJzIGluIDEgeWVhclxuICovXG5leHBvcnQgY29uc3QgcXVhcnRlcnNJblllYXIgPSA0O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luSG91clxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIGhvdXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJbk1pbnV0ZVxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIG1pbnV0ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHNlY29uZHNJbk1pbnV0ZSA9IDYwO1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luRGF5XG4gKiBAc3VtbWFyeSBTZWNvbmRzIGluIDEgZGF5LlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luRGF5ID0gc2Vjb25kc0luSG91ciAqIDI0O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQG5hbWUgc2Vjb25kc0luV2Vla1xuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIHdlZWsuXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5XZWVrID0gc2Vjb25kc0luRGF5ICogNztcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJblllYXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSB5ZWFyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luWWVhciA9IHNlY29uZHNJbkRheSAqIGRheXNJblllYXI7XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAbmFtZSBzZWNvbmRzSW5Nb250aFxuICogQHN1bW1hcnkgU2Vjb25kcyBpbiAxIG1vbnRoXG4gKi9cbmV4cG9ydCBjb25zdCBzZWNvbmRzSW5Nb250aCA9IHNlY29uZHNJblllYXIgLyAxMjtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEBuYW1lIHNlY29uZHNJblF1YXJ0ZXJcbiAqIEBzdW1tYXJ5IFNlY29uZHMgaW4gMSBxdWFydGVyLlxuICovXG5leHBvcnQgY29uc3Qgc2Vjb25kc0luUXVhcnRlciA9IHNlY29uZHNJbk1vbnRoICogMztcbiIsIi8qKlxuICogQG5hbWUgY29uc3RydWN0RnJvbVxuICogQGNhdGVnb3J5IEdlbmVyaWMgSGVscGVyc1xuICogQHN1bW1hcnkgQ29uc3RydWN0cyBhIGRhdGUgdXNpbmcgdGhlIHJlZmVyZW5jZSBkYXRlIGFuZCB0aGUgdmFsdWVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBmdW5jdGlvbiBjb25zdHJ1Y3RzIGEgbmV3IGRhdGUgdXNpbmcgdGhlIGNvbnN0cnVjdG9yIGZyb20gdGhlIHJlZmVyZW5jZVxuICogZGF0ZSBhbmQgdGhlIGdpdmVuIHZhbHVlLiBJdCBoZWxwcyB0byBidWlsZCBnZW5lcmljIGZ1bmN0aW9ucyB0aGF0IGFjY2VwdFxuICogZGF0ZSBleHRlbnNpb25zLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIHJlZmVyZW5jZSBkYXRlIHRvIHRha2UgY29uc3RydWN0b3IgZnJvbVxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNyZWF0ZSB0aGUgZGF0ZVxuICpcbiAqIEByZXR1cm5zIERhdGUgaW5pdGlhbGl6ZWQgdXNpbmcgdGhlIGdpdmVuIGRhdGUgYW5kIHZhbHVlXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tICdkYXRlLWZucydcbiAqXG4gKiAvLyBBIGZ1bmN0aW9uIHRoYXQgY2xvbmVzIGEgZGF0ZSBwcmVzZXJ2aW5nIHRoZSBvcmlnaW5hbCB0eXBlXG4gKiBmdW5jdGlvbiBjbG9uZURhdGU8RGF0ZVR5cGUgZXh0ZW5kcyBEYXRlKGRhdGU6IERhdGVUeXBlKTogRGF0ZVR5cGUge1xuICogICByZXR1cm4gY29uc3RydWN0RnJvbShcbiAqICAgICBkYXRlLCAvLyBVc2UgY29udHJ1c3RvciBmcm9tIHRoZSBnaXZlbiBkYXRlXG4gKiAgICAgZGF0ZS5nZXRUaW1lKCkgLy8gVXNlIHRoZSBkYXRlIHZhbHVlIHRvIGNyZWF0ZSBhIG5ldyBkYXRlXG4gKiAgIClcbiAqIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdEZyb20oZGF0ZSwgdmFsdWUpIHtcbiAgaWYgKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBkYXRlLmNvbnN0cnVjdG9yKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgY29uc3RydWN0RnJvbTtcbiIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luRGF5IH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCIuL3N0YXJ0T2ZEYXkubWpzXCI7XG5pbXBvcnQgeyBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIH0gZnJvbSBcIi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1xuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy4gVGhpcyBtZWFucyB0aGF0IHRoZSB0aW1lcyBhcmUgcmVtb3ZlZFxuICogZnJvbSB0aGUgZGF0ZXMgYW5kIHRoZW4gdGhlIGRpZmZlcmVuY2UgaW4gZGF5cyBpcyBjYWxjdWxhdGVkLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIGVhcmxpZXIgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5c1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciBkYXlzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxMSAyMzowMDowMCBhbmQgMiBKdWx5IDIwMTIgMDA6MDA6MDA/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gKiAgIG5ldyBEYXRlKDIwMTIsIDYsIDIsIDAsIDApLFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAyLCAyMywgMClcbiAqIClcbiAqIC8vPT4gMzY2XG4gKiAvLyBIb3cgbWFueSBjYWxlbmRhciBkYXlzIGFyZSBiZXR3ZWVuXG4gKiAvLyAyIEp1bHkgMjAxMSAyMzo1OTowMCBhbmQgMyBKdWx5IDIwMTEgMDA6MDE6MDA/XG4gKiBjb25zdCByZXN1bHQgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDMsIDAsIDEpLFxuICogICBuZXcgRGF0ZSgyMDExLCA2LCAyLCAyMywgNTkpXG4gKiApXG4gKiAvLz0+IDFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSB7XG4gIGNvbnN0IHN0YXJ0T2ZEYXlMZWZ0ID0gc3RhcnRPZkRheShkYXRlTGVmdCk7XG4gIGNvbnN0IHN0YXJ0T2ZEYXlSaWdodCA9IHN0YXJ0T2ZEYXkoZGF0ZVJpZ2h0KTtcblxuICBjb25zdCB0aW1lc3RhbXBMZWZ0ID1cbiAgICArc3RhcnRPZkRheUxlZnQgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlMZWZ0KTtcbiAgY29uc3QgdGltZXN0YW1wUmlnaHQgPVxuICAgICtzdGFydE9mRGF5UmlnaHQgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKHN0YXJ0T2ZEYXlSaWdodCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXIgYmVjYXVzZSB0aGUgbnVtYmVyIG9mXG4gIC8vIG1pbGxpc2Vjb25kcyBpbiBhIGRheSBpcyBub3QgY29uc3RhbnQgKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2ZcbiAgLy8gdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KS5cbiAgcmV0dXJuIE1hdGgucm91bmQoKHRpbWVzdGFtcExlZnQgLSB0aW1lc3RhbXBSaWdodCkgLyBtaWxsaXNlY29uZHNJbkRheSk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzO1xuIiwiaW1wb3J0IHsgZGVmYXVsdExvY2FsZSB9IGZyb20gXCIuL19saWIvZGVmYXVsdExvY2FsZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcbmltcG9ydCB7IGZvcm1hdHRlcnMgfSBmcm9tIFwiLi9fbGliL2Zvcm1hdC9mb3JtYXR0ZXJzLm1qc1wiO1xuaW1wb3J0IHsgbG9uZ0Zvcm1hdHRlcnMgfSBmcm9tIFwiLi9fbGliL2Zvcm1hdC9sb25nRm9ybWF0dGVycy5tanNcIjtcbmltcG9ydCB7XG4gIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4sXG4gIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbixcbiAgd2Fybk9yVGhyb3dQcm90ZWN0ZWRFcnJvcixcbn0gZnJvbSBcIi4vX2xpYi9wcm90ZWN0ZWRUb2tlbnMubWpzXCI7XG5pbXBvcnQgeyBpc1ZhbGlkIH0gZnJvbSBcIi4vaXNWYWxpZC5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLy8gUmV4cG9ydHMgb2YgaW50ZXJuYWwgZm9yIGxpYnJhcmllcyB0byB1c2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzYzOCNpc3N1ZWNvbW1lbnQtMTg3NzA4Mjg3NFxuZXhwb3J0IHsgZm9ybWF0dGVycywgbG9uZ0Zvcm1hdHRlcnMgfTtcblxuLy8gVGhpcyBSZWdFeHAgY29uc2lzdHMgb2YgdGhyZWUgcGFydHMgc2VwYXJhdGVkIGJ5IGB8YDpcbi8vIC0gW3lZUXFNTHdJZERlY2loSEtrbXNdbyBtYXRjaGVzIGFueSBhdmFpbGFibGUgb3JkaW5hbCBudW1iZXIgdG9rZW5cbi8vICAgKG9uZSBvZiB0aGUgY2VydGFpbiBsZXR0ZXJzIGZvbGxvd2VkIGJ5IGBvYClcbi8vIC0gKFxcdylcXDEqIG1hdGNoZXMgYW55IHNlcXVlbmNlcyBvZiB0aGUgc2FtZSBsZXR0ZXJcbi8vIC0gJycgbWF0Y2hlcyB0d28gcXVvdGUgY2hhcmFjdGVycyBpbiBhIHJvd1xuLy8gLSAnKCcnfFteJ10pKygnfCQpIG1hdGNoZXMgYW55dGhpbmcgc3Vycm91bmRlZCBieSB0d28gcXVvdGUgY2hhcmFjdGVycyAoJyksXG4vLyAgIGV4Y2VwdCBhIHNpbmdsZSBxdW90ZSBzeW1ib2wsIHdoaWNoIGVuZHMgdGhlIHNlcXVlbmNlLlxuLy8gICBUd28gcXVvdGUgY2hhcmFjdGVycyBkbyBub3QgZW5kIHRoZSBzZXF1ZW5jZS5cbi8vICAgSWYgdGhlcmUgaXMgbm8gbWF0Y2hpbmcgc2luZ2xlIHF1b3RlXG4vLyAgIHRoZW4gdGhlIHNlcXVlbmNlIHdpbGwgY29udGludWUgdW50aWwgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLlxuLy8gLSAuIG1hdGNoZXMgYW55IHNpbmdsZSBjaGFyYWN0ZXIgdW5tYXRjaGVkIGJ5IHByZXZpb3VzIHBhcnRzIG9mIHRoZSBSZWdFeHBzXG5jb25zdCBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID1cbiAgL1t5WVFxTUx3SWREZWNpaEhLa21zXW98KFxcdylcXDEqfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG4vLyBUaGlzIFJlZ0V4cCBjYXRjaGVzIHN5bWJvbHMgZXNjYXBlZCBieSBxdW90ZXMsIGFuZCBhbHNvXG4vLyBzZXF1ZW5jZXMgb2Ygc3ltYm9scyBQLCBwLCBhbmQgdGhlIGNvbWJpbmF0aW9ucyBsaWtlIGBQUFBQUFBQcHBwcHBgXG5jb25zdCBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC9QK3ArfFArfHArfCcnfCcoJyd8W14nXSkrKCd8JCl8Li9nO1xuXG5jb25zdCBlc2NhcGVkU3RyaW5nUmVnRXhwID0gL14nKFteXSo/KSc/JC87XG5jb25zdCBkb3VibGVRdW90ZVJlZ0V4cCA9IC8nJy9nO1xuY29uc3QgdW5lc2NhcGVkTGF0aW5DaGFyYWN0ZXJSZWdFeHAgPSAvW2EtekEtWl0vO1xuXG5leHBvcnQgeyBmb3JtYXQgYXMgZm9ybWF0RGF0ZSB9O1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgZm9ybWF0fSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZm9ybWF0XG4gKiBAYWxpYXMgZm9ybWF0RGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBGb3JtYXQgdGhlIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiB0aGUgZ2l2ZW4gZm9ybWF0LiBUaGUgcmVzdWx0IG1heSB2YXJ5IGJ5IGxvY2FsZS5cbiAqXG4gKiA+IOKaoO+4jyBQbGVhc2Ugbm90ZSB0aGF0IHRoZSBgZm9ybWF0YCB0b2tlbnMgZGlmZmVyIGZyb20gTW9tZW50LmpzIGFuZCBvdGhlciBsaWJyYXJpZXMuXG4gKiA+IFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICpcbiAqIFRoZSBjaGFyYWN0ZXJzIHdyYXBwZWQgYmV0d2VlbiB0d28gc2luZ2xlIHF1b3RlcyBjaGFyYWN0ZXJzICgnKSBhcmUgZXNjYXBlZC5cbiAqIFR3byBzaW5nbGUgcXVvdGVzIGluIGEgcm93LCB3aGV0aGVyIGluc2lkZSBvciBvdXRzaWRlIGEgcXVvdGVkIHNlcXVlbmNlLCByZXByZXNlbnQgYSAncmVhbCcgc2luZ2xlIHF1b3RlLlxuICogKHNlZSB0aGUgbGFzdCBleGFtcGxlKVxuICpcbiAqIEZvcm1hdCBvZiB0aGUgc3RyaW5nIGlzIGJhc2VkIG9uIFVuaWNvZGUgVGVjaG5pY2FsIFN0YW5kYXJkICMzNTpcbiAqIGh0dHBzOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LWRhdGVzLmh0bWwjRGF0ZV9GaWVsZF9TeW1ib2xfVGFibGVcbiAqIHdpdGggYSBmZXcgYWRkaXRpb25zIChzZWUgbm90ZSA3IGJlbG93IHRoZSB0YWJsZSkuXG4gKlxuICogQWNjZXB0ZWQgcGF0dGVybnM6XG4gKiB8IFVuaXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQYXR0ZXJuIHwgUmVzdWx0IGV4YW1wbGVzICAgICAgICAgICAgICAgICAgIHwgTm90ZXMgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLXxcbiAqIHwgRXJhICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEcuLkdHRyAgfCBBRCwgQkMgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHICAgIHwgQW5ubyBEb21pbmksIEJlZm9yZSBDaHJpc3QgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgR0dHR0cgICB8IEEsIEIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgQ2FsZW5kYXIgeWVhciAgICAgICAgICAgICAgICAgICB8IHkgICAgICAgfCA0NCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5byAgICAgIHwgNDR0aCwgMXN0LCAwdGgsIDE3dGggICAgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXkgICAgICB8IDQ0LCAwMSwgMDAsIDE3ICAgICAgICAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHl5eSAgICAgfCAwNDQsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB5eXl5ICAgIHwgMDA0NCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeXl5eXkgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgTG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciAgICAgICB8IFkgICAgICAgfCA0NCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZbyAgICAgIHwgNDR0aCwgMXN0LCAxOTAwdGgsIDIwMTd0aCAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVkgICAgICB8IDQ0LCAwMSwgMDAsIDE3ICAgICAgICAgICAgICAgICAgICB8IDUsOCAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFlZWSAgICAgfCAwNDQsIDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZICAgIHwgMDA0NCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgICAgICAgIHwgNSw4ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWVlZWVkgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMsNSAgIHxcbiAqIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgICAgICAgICB8IFIgICAgICAgfCAtNDMsIDAsIDEsIDE5MDAsIDIwMTcgICAgICAgICAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUiAgICAgIHwgLTQzLCAwMCwgMDEsIDE5MDAsIDIwMTcgICAgICAgICAgIHwgNSw3ICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUlJSICAgICB8IC0wNDMsIDAwMCwgMDAxLCAxOTAwLCAyMDE3ICAgICAgICB8IDUsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFJSUlIgICAgfCAtMDA0MywgMDAwMCwgMDAwMSwgMTkwMCwgMjAxNyAgICAgfCA1LDcgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBSUlJSUiAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw1LDcgfFxuICogfCBFeHRlbmRlZCB5ZWFyICAgICAgICAgICAgICAgICAgIHwgdSAgICAgICB8IC00MywgMCwgMSwgMTkwMCwgMjAxNyAgICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1ICAgICAgfCAtNDMsIDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgICAgfCA1ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB1dXUgICAgIHwgLTA0MywgMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICAgIHwgNSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgdXV1dSAgICB8IC0wMDQzLCAwMDAxLCAxOTAwLCAyMDE3ICAgICAgICAgICB8IDUgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHV1dXV1ICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDUgICB8XG4gKiB8IFF1YXJ0ZXIgKGZvcm1hdHRpbmcpICAgICAgICAgICAgfCBRICAgICAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUW8gICAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRICAgICAgfCAwMSwgMDIsIDAzLCAwNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBRUVEgICAgIHwgUTEsIFEyLCBRMywgUTQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUVFRUSAgICB8IDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFFRUVFRICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCA0ICAgICB8XG4gKiB8IFF1YXJ0ZXIgKHN0YW5kLWFsb25lKSAgICAgICAgICAgfCBxICAgICAgIHwgMSwgMiwgMywgNCAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcW8gICAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxICAgICAgfCAwMSwgMDIsIDAzLCAwNCAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBxcXEgICAgIHwgUTEsIFEyLCBRMywgUTQgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcXFxcSAgICB8IDFzdCBxdWFydGVyLCAybmQgcXVhcnRlciwgLi4uICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHFxcXFxICAgfCAxLCAyLCAzLCA0ICAgICAgICAgICAgICAgICAgICAgICAgfCA0ICAgICB8XG4gKiB8IE1vbnRoIChmb3JtYXR0aW5nKSAgICAgICAgICAgICAgfCBNICAgICAgIHwgMSwgMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NICAgICAgfCAwMSwgMDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU0gICAgIHwgSmFuLCBGZWIsIC4uLiwgRGVjICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTU1NTSAgICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE1NTU1NICAgfCBKLCBGLCAuLi4sIEQgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IE1vbnRoIChzdGFuZC1hbG9uZSkgICAgICAgICAgICAgfCBMICAgICAgIHwgMSwgMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMICAgICAgfCAwMSwgMDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTEwgICAgIHwgSmFuLCBGZWIsIC4uLiwgRGVjICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgTExMTCAgICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IExMTExMICAgfCBKLCBGLCAuLi4sIEQgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IExvY2FsIHdlZWsgb2YgeWVhciAgICAgICAgICAgICAgfCB3ICAgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgd28gICAgICB8IDFzdCwgMm5kLCAuLi4sIDUzdGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHd3ICAgICAgfCAwMSwgMDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IElTTyB3ZWVrIG9mIHllYXIgICAgICAgICAgICAgICAgfCBJICAgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDUzdGggICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IElJICAgICAgfCAwMSwgMDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8IERheSBvZiBtb250aCAgICAgICAgICAgICAgICAgICAgfCBkICAgICAgIHwgMSwgMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDMxc3QgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGRkICAgICAgfCAwMSwgMDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8IERheSBvZiB5ZWFyICAgICAgICAgICAgICAgICAgICAgfCBEICAgICAgIHwgMSwgMiwgLi4uLCAzNjUsIDM2NiAgICAgICAgICAgICAgIHwgOSAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRG8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDM2NXRoLCAzNjZ0aCAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEREICAgICAgfCAwMSwgMDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgICAgfCA5ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREQgICAgIHwgMDAxLCAwMDIsIC4uLiwgMzY1LCAzNjYgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRERERCAgICB8IC4uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IDMgICAgIHxcbiAqIHwgRGF5IG9mIHdlZWsgKGZvcm1hdHRpbmcpICAgICAgICB8IEUuLkVFRSAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBFRUVFICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgRUVFRUUgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IEVFRUVFRSAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IElTTyBkYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgICAgfCBpICAgICAgIHwgMSwgMiwgMywgLi4uLCA3ICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaW8gICAgICB8IDFzdCwgMm5kLCAuLi4sIDd0aCAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpICAgICAgfCAwMSwgMDIsIC4uLiwgMDcgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWkgICAgIHwgTW9uLCBUdWUsIFdlZCwgLi4uLCBTdW4gICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaWlpaSAgICB8IE1vbmRheSwgVHVlc2RheSwgLi4uLCBTdW5kYXkgICAgICB8IDIsNyAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGlpaWlpICAgfCBNLCBULCBXLCBULCBGLCBTLCBTICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBpaWlpaWkgIHwgTW8sIFR1LCBXZSwgVGgsIEZyLCBTYSwgU3UgICAgICAgIHwgNyAgICAgfFxuICogfCBMb2NhbCBkYXkgb2Ygd2VlayAoZm9ybWF0dGluZykgIHwgZSAgICAgICB8IDIsIDMsIDQsIC4uLiwgMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVvICAgICAgfCAybmQsIDNyZCwgLi4uLCAxc3QgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZSAgICAgIHwgMDIsIDAzLCAuLi4sIDAxICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlICAgICB8IE1vbiwgVHVlLCBXZWQsIC4uLiwgU3VuICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGVlZWUgICAgfCBNb25kYXksIFR1ZXNkYXksIC4uLiwgU3VuZGF5ICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBlZWVlZSAgIHwgTSwgVCwgVywgVCwgRiwgUywgUyAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgZWVlZWVlICB8IE1vLCBUdSwgV2UsIFRoLCBGciwgU2EsIFN1ICAgICAgICB8ICAgICAgIHxcbiAqIHwgTG9jYWwgZGF5IG9mIHdlZWsgKHN0YW5kLWFsb25lKSB8IGMgICAgICAgfCAyLCAzLCA0LCAuLi4sIDEgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjbyAgICAgIHwgMm5kLCAzcmQsIC4uLiwgMXN0ICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2MgICAgICB8IDAyLCAwMywgLi4uLCAwMSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjYyAgICAgfCBNb24sIFR1ZSwgV2VkLCAuLi4sIFN1biAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBjY2NjICAgIHwgTW9uZGF5LCBUdWVzZGF5LCAuLi4sIFN1bmRheSAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgY2NjY2MgICB8IE0sIFQsIFcsIFQsIEYsIFMsIFMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGNjY2NjYyAgfCBNbywgVHUsIFdlLCBUaCwgRnIsIFNhLCBTdSAgICAgICAgfCAgICAgICB8XG4gKiB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhLi5hYSAgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYWFhICAgICB8IGFtLCBwbSAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGFhYWEgICAgfCBhLm0uLCBwLm0uICAgICAgICAgICAgICAgICAgICAgICAgfCAyICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYWFhYSAgIHwgYSwgcCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCBBTSwgUE0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgIHwgYi4uYmIgICB8IEFNLCBQTSwgbm9vbiwgbWlkbmlnaHQgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IGJiYiAgICAgfCBhbSwgcG0sIG5vb24sIG1pZG5pZ2h0ICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBiYmJiICAgIHwgYS5tLiwgcC5tLiwgbm9vbiwgbWlkbmlnaHQgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgYmJiYmIgICB8IGEsIHAsIG4sIG1pICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRmxleGlibGUgZGF5IHBlcmlvZCAgICAgICAgICAgICB8IEIuLkJCQiAgfCBhdCBuaWdodCwgaW4gdGhlIG1vcm5pbmcsIC4uLiAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBCQkJCICAgIHwgYXQgbmlnaHQsIGluIHRoZSBtb3JuaW5nLCAuLi4gICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgQkJCQkIgICB8IGF0IG5pZ2h0LCBpbiB0aGUgbW9ybmluZywgLi4uICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMS0xMl0gICAgICAgICAgICAgICAgICAgICB8IGggICAgICAgfCAxLCAyLCAuLi4sIDExLCAxMiAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBobyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTF0aCwgMTJ0aCAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgaGggICAgICB8IDAxLCAwMiwgLi4uLCAxMSwgMTIgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMC0yM10gICAgICAgICAgICAgICAgICAgICB8IEggICAgICAgfCAwLCAxLCAyLCAuLi4sIDIzICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBIbyAgICAgIHwgMHRoLCAxc3QsIDJuZCwgLi4uLCAyM3JkICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgSEggICAgICB8IDAwLCAwMSwgMDIsIC4uLiwgMjMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMC0xMV0gICAgICAgICAgICAgICAgICAgICB8IEsgICAgICAgfCAxLCAyLCAuLi4sIDExLCAwICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBLbyAgICAgIHwgMXN0LCAybmQsIC4uLiwgMTF0aCwgMHRoICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgS0sgICAgICB8IDAxLCAwMiwgLi4uLCAxMSwgMDAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgSG91ciBbMS0yNF0gICAgICAgICAgICAgICAgICAgICB8IGsgICAgICAgfCAyNCwgMSwgMiwgLi4uLCAyMyAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBrbyAgICAgIHwgMjR0aCwgMXN0LCAybmQsIC4uLiwgMjNyZCAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwga2sgICAgICB8IDI0LCAwMSwgMDIsIC4uLiwgMjMgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgTWludXRlICAgICAgICAgICAgICAgICAgICAgICAgICB8IG0gICAgICAgfCAwLCAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbyAgICAgIHwgMHRoLCAxc3QsIC4uLiwgNTl0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgbW0gICAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgICAgICAgICB8IHMgICAgICAgfCAwLCAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBzbyAgICAgIHwgMHRoLCAxc3QsIC4uLiwgNTl0aCAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgc3MgICAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgRnJhY3Rpb24gb2Ygc2Vjb25kICAgICAgICAgICAgICB8IFMgICAgICAgfCAwLCAxLCAuLi4sIDkgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBTUyAgICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgU1NTICAgICB8IDAwMCwgMDAxLCAuLi4sIDk5OSAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFNTU1MgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzICAgICB8XG4gKiB8IFRpbWV6b25lIChJU08tODYwMSB3LyBaKSAgICAgICAgfCBYICAgICAgIHwgLTA4LCArMDUzMCwgWiAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFggICAgICB8IC0wODAwLCArMDUzMCwgWiAgICAgICAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFhYWCAgICAgfCAtMDg6MDAsICswNTozMCwgWiAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBYWFhYICAgIHwgLTA4MDAsICswNTMwLCBaLCArMTIzNDU2ICAgICAgICAgIHwgMiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgWFhYWFggICB8IC0wODowMCwgKzA1OjMwLCBaLCArMTI6MzQ6NTYgICAgICB8ICAgICAgIHxcbiAqIHwgVGltZXpvbmUgKElTTy04NjAxIHcvbyBaKSAgICAgICB8IHggICAgICAgfCAtMDgsICswNTMwLCArMDAgICAgICAgICAgICAgICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eCAgICAgIHwgLTA4MDAsICswNTMwLCArMDAwMCAgICAgICAgICAgICAgIHwgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgeHh4ICAgICB8IC0wODowMCwgKzA1OjMwLCArMDA6MDAgICAgICAgICAgICB8IDIgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHh4eHggICAgfCAtMDgwMCwgKzA1MzAsICswMDAwLCArMTIzNDU2ICAgICAgfCAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB4eHh4eCAgIHwgLTA4OjAwLCArMDU6MzAsICswMDowMCwgKzEyOjM0OjU2IHwgICAgICAgfFxuICogfCBUaW1lem9uZSAoR01UKSAgICAgICAgICAgICAgICAgIHwgTy4uLk9PTyB8IEdNVC04LCBHTVQrNTozMCwgR01UKzAgICAgICAgICAgICB8ICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IE9PT08gICAgfCBHTVQtMDg6MDAsIEdNVCswNTozMCwgR01UKzAwOjAwICAgfCAyICAgICB8XG4gKiB8IFRpbWV6b25lIChzcGVjaWZpYyBub24tbG9jYXQuKSAgfCB6Li4uenp6IHwgR01ULTgsIEdNVCs1OjMwLCBHTVQrMCAgICAgICAgICAgIHwgNiAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgenp6eiAgICB8IEdNVC0wODowMCwgR01UKzA1OjMwLCBHTVQrMDA6MDAgICB8IDIsNiAgIHxcbiAqIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgICAgICAgICB8IHQgICAgICAgfCA1MTI5Njk1MjAgICAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB0dCAgICAgIHwgLi4uICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgMyw3ICAgfFxuICogfCBNaWxsaXNlY29uZHMgdGltZXN0YW1wICAgICAgICAgIHwgVCAgICAgICB8IDUxMjk2OTUyMDkwMCAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFRUICAgICAgfCAuLi4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAzLDcgICB8XG4gKiB8IExvbmcgbG9jYWxpemVkIGRhdGUgICAgICAgICAgICAgfCBQICAgICAgIHwgMDQvMjkvMTQ1MyAgICAgICAgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFAgICAgICB8IEFwciAyOSwgMTQ1MyAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUCAgICAgfCBBcHJpbCAyOXRoLCAxNDUzICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUFBQICAgIHwgRnJpZGF5LCBBcHJpbCAyOXRoLCAxNDUzICAgICAgICAgIHwgMiw3ICAgfFxuICogfCBMb25nIGxvY2FsaXplZCB0aW1lICAgICAgICAgICAgIHwgcCAgICAgICB8IDEyOjAwIEFNICAgICAgICAgICAgICAgICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IHBwICAgICAgfCAxMjowMDowMCBBTSAgICAgICAgICAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBwcHAgICAgIHwgMTI6MDA6MDAgQU0gR01UKzIgICAgICAgICAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgcHBwcCAgICB8IDEyOjAwOjAwIEFNIEdNVCswMjowMCAgICAgICAgICAgICB8IDIsNyAgIHxcbiAqIHwgQ29tYmluYXRpb24gb2YgZGF0ZSBhbmQgdGltZSAgICB8IFBwICAgICAgfCAwNC8yOS8xNDUzLCAxMjowMCBBTSAgICAgICAgICAgICAgfCA3ICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCBQUHBwICAgIHwgQXByIDI5LCAxNDUzLCAxMjowMDowMCBBTSAgICAgICAgIHwgNyAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgUFBQcHBwICB8IEFwcmlsIDI5dGgsIDE0NTMgYXQgLi4uICAgICAgICAgICB8IDcgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFBQUFBwcHBwfCBGcmlkYXksIEFwcmlsIDI5dGgsIDE0NTMgYXQgLi4uICAgfCAyLDcgICB8XG4gKiBOb3RlczpcbiAqIDEuIFwiRm9ybWF0dGluZ1wiIHVuaXRzIChlLmcuIGZvcm1hdHRpbmcgcXVhcnRlcikgaW4gdGhlIGRlZmF1bHQgZW4tVVMgbG9jYWxlXG4gKiAgICBhcmUgdGhlIHNhbWUgYXMgXCJzdGFuZC1hbG9uZVwiIHVuaXRzLCBidXQgYXJlIGRpZmZlcmVudCBpbiBzb21lIGxhbmd1YWdlcy5cbiAqICAgIFwiRm9ybWF0dGluZ1wiIHVuaXRzIGFyZSBkZWNsaW5lZCBhY2NvcmRpbmcgdG8gdGhlIHJ1bGVzIG9mIHRoZSBsYW5ndWFnZVxuICogICAgaW4gdGhlIGNvbnRleHQgb2YgYSBkYXRlLiBcIlN0YW5kLWFsb25lXCIgdW5pdHMgYXJlIGFsd2F5cyBub21pbmF0aXZlIHNpbmd1bGFyOlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnZG8gTExMTCcsIHtsb2NhbGU6IGNzfSkgLy89PiAnNi4gbGlzdG9wYWQnYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnZG8gTU1NTScsIHtsb2NhbGU6IGNzfSkgLy89PiAnNi4gbGlzdG9wYWR1J2BcbiAqXG4gKiAyLiBBbnkgc2VxdWVuY2Ugb2YgdGhlIGlkZW50aWNhbCBsZXR0ZXJzIGlzIGEgcGF0dGVybiwgdW5sZXNzIGl0IGlzIGVzY2FwZWQgYnlcbiAqICAgIHRoZSBzaW5nbGUgcXVvdGUgY2hhcmFjdGVycyAoc2VlIGJlbG93KS5cbiAqICAgIElmIHRoZSBzZXF1ZW5jZSBpcyBsb25nZXIgdGhhbiBsaXN0ZWQgaW4gdGFibGUgKGUuZy4gYEVFRUVFRUVFRUVFYClcbiAqICAgIHRoZSBvdXRwdXQgd2lsbCBiZSB0aGUgc2FtZSBhcyBkZWZhdWx0IHBhdHRlcm4gZm9yIHRoaXMgdW5pdCwgdXN1YWxseVxuICogICAgdGhlIGxvbmdlc3Qgb25lIChpbiBjYXNlIG9mIElTTyB3ZWVrZGF5cywgYEVFRUVgKS4gRGVmYXVsdCBwYXR0ZXJucyBmb3IgdW5pdHNcbiAqICAgIGFyZSBtYXJrZWQgd2l0aCBcIjJcIiBpbiB0aGUgbGFzdCBjb2x1bW4gb2YgdGhlIHRhYmxlLlxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NJykgLy89PiAnTm92J2BcbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ01NTU0nKSAvLz0+ICdOb3ZlbWJlcidgXG4gKlxuICogICAgYGZvcm1hdChuZXcgRGF0ZSgyMDE3LCAxMCwgNiksICdNTU1NTScpIC8vPT4gJ04nYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU1NJykgLy89PiAnTm92ZW1iZXInYFxuICpcbiAqICAgIGBmb3JtYXQobmV3IERhdGUoMjAxNywgMTAsIDYpLCAnTU1NTU1NTScpIC8vPT4gJ05vdmVtYmVyJ2BcbiAqXG4gKiAzLiBTb21lIHBhdHRlcm5zIGNvdWxkIGJlIHVubGltaXRlZCBsZW5ndGggKHN1Y2ggYXMgYHl5eXl5eXl5YCkuXG4gKiAgICBUaGUgb3V0cHV0IHdpbGwgYmUgcGFkZGVkIHdpdGggemVyb3MgdG8gbWF0Y2ggdGhlIGxlbmd0aCBvZiB0aGUgcGF0dGVybi5cbiAqXG4gKiAgICBgZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDEwLCA2KSwgJ3l5eXl5eXl5JykgLy89PiAnMDAwMDIwMTcnYFxuICpcbiAqIDQuIGBRUVFRUWAgYW5kIGBxcXFxcWAgY291bGQgYmUgbm90IHN0cmljdGx5IG51bWVyaWNhbCBpbiBzb21lIGxvY2FsZXMuXG4gKiAgICBUaGVzZSB0b2tlbnMgcmVwcmVzZW50IHRoZSBzaG9ydGVzdCBmb3JtIG9mIHRoZSBxdWFydGVyLlxuICpcbiAqIDUuIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgeWAgYW5kIGB1YCBwYXR0ZXJucyBhcmUgQi5DLiB5ZWFyczpcbiAqXG4gKiAgICB8IFllYXIgfCBgeWAgfCBgdWAgfFxuICogICAgfC0tLS0tLXwtLS0tLXwtLS0tLXxcbiAqICAgIHwgQUMgMSB8ICAgMSB8ICAgMSB8XG4gKiAgICB8IEJDIDEgfCAgIDEgfCAgIDAgfFxuICogICAgfCBCQyAyIHwgICAyIHwgIC0xIHxcbiAqXG4gKiAgICBBbHNvIGB5eWAgYWx3YXlzIHJldHVybnMgdGhlIGxhc3QgdHdvIGRpZ2l0cyBvZiBhIHllYXIsXG4gKiAgICB3aGlsZSBgdXVgIHBhZHMgc2luZ2xlIGRpZ2l0IHllYXJzIHRvIDIgY2hhcmFjdGVycyBhbmQgcmV0dXJucyBvdGhlciB5ZWFycyB1bmNoYW5nZWQ6XG4gKlxuICogICAgfCBZZWFyIHwgYHl5YCB8IGB1dWAgfFxuICogICAgfC0tLS0tLXwtLS0tLS18LS0tLS0tfFxuICogICAgfCAxICAgIHwgICAwMSB8ICAgMDEgfFxuICogICAgfCAxNCAgIHwgICAxNCB8ICAgMTQgfFxuICogICAgfCAzNzYgIHwgICA3NiB8ICAzNzYgfFxuICogICAgfCAxNDUzIHwgICA1MyB8IDE0NTMgfFxuICpcbiAqICAgIFRoZSBzYW1lIGRpZmZlcmVuY2UgaXMgdHJ1ZSBmb3IgbG9jYWwgYW5kIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFycyAoYFlgIGFuZCBgUmApLFxuICogICAgZXhjZXB0IGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJzIGFyZSBkZXBlbmRlbnQgb24gYG9wdGlvbnMud2Vla1N0YXJ0c09uYFxuICogICAgYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKGNvbXBhcmUgW2dldElTT1dlZWtZZWFyXShodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2dldElTT1dlZWtZZWFyKVxuICogICAgYW5kIFtnZXRXZWVrWWVhcl0oaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9nZXRXZWVrWWVhcikpLlxuICpcbiAqIDYuIFNwZWNpZmljIG5vbi1sb2NhdGlvbiB0aW1lem9uZXMgYXJlIGN1cnJlbnRseSB1bmF2YWlsYWJsZSBpbiBgZGF0ZS1mbnNgLFxuICogICAgc28gcmlnaHQgbm93IHRoZXNlIHRva2VucyBmYWxsIGJhY2sgdG8gR01UIHRpbWV6b25lcy5cbiAqXG4gKiA3LiBUaGVzZSBwYXR0ZXJucyBhcmUgbm90IGluIHRoZSBVbmljb2RlIFRlY2huaWNhbCBTdGFuZGFyZCAjMzU6XG4gKiAgICAtIGBpYDogSVNPIGRheSBvZiB3ZWVrXG4gKiAgICAtIGBJYDogSVNPIHdlZWsgb2YgeWVhclxuICogICAgLSBgUmA6IElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKiAgICAtIGB0YDogc2Vjb25kcyB0aW1lc3RhbXBcbiAqICAgIC0gYFRgOiBtaWxsaXNlY29uZHMgdGltZXN0YW1wXG4gKiAgICAtIGBvYDogb3JkaW5hbCBudW1iZXIgbW9kaWZpZXJcbiAqICAgIC0gYFBgOiBsb25nIGxvY2FsaXplZCBkYXRlXG4gKiAgICAtIGBwYDogbG9uZyBsb2NhbGl6ZWQgdGltZVxuICpcbiAqIDguIGBZWWAgYW5kIGBZWVlZYCB0b2tlbnMgcmVwcmVzZW50IHdlZWstbnVtYmVyaW5nIHllYXJzIGJ1dCB0aGV5IGFyZSBvZnRlbiBjb25mdXNlZCB3aXRoIHllYXJzLlxuICogICAgWW91IHNob3VsZCBlbmFibGUgYG9wdGlvbnMudXNlQWRkaXRpb25hbFdlZWtZZWFyVG9rZW5zYCB0byB1c2UgdGhlbS4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKlxuICogOS4gYERgIGFuZCBgRERgIHRva2VucyByZXByZXNlbnQgZGF5cyBvZiB0aGUgeWVhciBidXQgdGhleSBhcmUgb2Z0ZW4gY29uZnVzZWQgd2l0aCBkYXlzIG9mIHRoZSBtb250aC5cbiAqICAgIFlvdSBzaG91bGQgZW5hYmxlIGBvcHRpb25zLnVzZUFkZGl0aW9uYWxEYXlPZlllYXJUb2tlbnNgIHRvIHVzZSB0aGVtLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VuaWNvZGVUb2tlbnMubWRcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0gZm9ybWF0IC0gVGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmdcbiAqXG4gKiBAdGhyb3dzIGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3MgYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGxvY2FsaXplYCBwcm9wZXJ0eVxuICogQHRocm93cyBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0TG9uZ2AgcHJvcGVydHlcbiAqIEB0aHJvd3MgdXNlIGB5eXl5YCBpbnN0ZWFkIG9mIGBZWVlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHVzZSBgeXlgIGluc3RlYWQgb2YgYFlZYCBmb3IgZm9ybWF0dGluZyB5ZWFycyB1c2luZyBbZm9ybWF0IHByb3ZpZGVkXSB0byB0aGUgaW5wdXQgW2lucHV0IHByb3ZpZGVkXTsgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91bmljb2RlVG9rZW5zLm1kXG4gKiBAdGhyb3dzIHVzZSBgZGAgaW5zdGVhZCBvZiBgRGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyB1c2UgYGRkYCBpbnN0ZWFkIG9mIGBERGAgZm9yIGZvcm1hdHRpbmcgZGF5cyBvZiB0aGUgbW9udGggdXNpbmcgW2Zvcm1hdCBwcm92aWRlZF0gdG8gdGhlIGlucHV0IFtpbnB1dCBwcm92aWRlZF07IHNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdW5pY29kZVRva2Vucy5tZFxuICogQHRocm93cyBmb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmVwcmVzZW50IDExIEZlYnJ1YXJ5IDIwMTQgaW4gbWlkZGxlLWVuZGlhbiBmb3JtYXQ6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAnTU0vZGQveXl5eScpXG4gKiAvLz0+ICcwMi8xMS8yMDE0J1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXByZXNlbnQgMiBKdWx5IDIwMTQgaW4gRXNwZXJhbnRvOlxuICogaW1wb3J0IHsgZW9Mb2NhbGUgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUvZW8nXG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiksIFwiZG8gJ2RlJyBNTU1NIHl5eXlcIiwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAnMi1hIGRlIGp1bGlvIDIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEVzY2FwZSBzdHJpbmcgYnkgc2luZ2xlIHF1b3RlIGNoYXJhY3RlcnM6XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXQobmV3IERhdGUoMjAxNCwgNiwgMiwgMTUpLCBcImggJ28nJ2Nsb2NrJ1wiKVxuICogLy89PiBcIjMgbydjbG9ja1wiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgbG9jYWxlID0gb3B0aW9ucz8ubG9jYWxlID8/IGRlZmF1bHRPcHRpb25zLmxvY2FsZSA/PyBkZWZhdWx0TG9jYWxlO1xuXG4gIGNvbnN0IGZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA9XG4gICAgb3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIDE7XG5cbiAgY29uc3Qgd2Vla1N0YXJ0c09uID1cbiAgICBvcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLndlZWtTdGFydHNPbiA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgMDtcblxuICBjb25zdCBvcmlnaW5hbERhdGUgPSB0b0RhdGUoZGF0ZSk7XG5cbiAgaWYgKCFpc1ZhbGlkKG9yaWdpbmFsRGF0ZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkludmFsaWQgdGltZSB2YWx1ZVwiKTtcbiAgfVxuXG4gIGxldCBwYXJ0cyA9IGZvcm1hdFN0clxuICAgIC5tYXRjaChsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAubWFwKChzdWJzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcInBcIiB8fCBmaXJzdENoYXJhY3RlciA9PT0gXCJQXCIpIHtcbiAgICAgICAgY29uc3QgbG9uZ0Zvcm1hdHRlciA9IGxvbmdGb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXTtcbiAgICAgICAgcmV0dXJuIGxvbmdGb3JtYXR0ZXIoc3Vic3RyaW5nLCBsb2NhbGUuZm9ybWF0TG9uZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3Vic3RyaW5nO1xuICAgIH0pXG4gICAgLmpvaW4oXCJcIilcbiAgICAubWF0Y2goZm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cClcbiAgICAubWFwKChzdWJzdHJpbmcpID0+IHtcbiAgICAgIC8vIFJlcGxhY2UgdHdvIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJzIHdpdGggb25lIHNpbmdsZSBxdW90ZSBjaGFyYWN0ZXJcbiAgICAgIGlmIChzdWJzdHJpbmcgPT09IFwiJydcIikge1xuICAgICAgICByZXR1cm4geyBpc1Rva2VuOiBmYWxzZSwgdmFsdWU6IFwiJ1wiIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpcnN0Q2hhcmFjdGVyID0gc3Vic3RyaW5nWzBdO1xuICAgICAgaWYgKGZpcnN0Q2hhcmFjdGVyID09PSBcIidcIikge1xuICAgICAgICByZXR1cm4geyBpc1Rva2VuOiBmYWxzZSwgdmFsdWU6IGNsZWFuRXNjYXBlZFN0cmluZyhzdWJzdHJpbmcpIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChmb3JtYXR0ZXJzW2ZpcnN0Q2hhcmFjdGVyXSkge1xuICAgICAgICByZXR1cm4geyBpc1Rva2VuOiB0cnVlLCB2YWx1ZTogc3Vic3RyaW5nIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdENoYXJhY3Rlci5tYXRjaCh1bmVzY2FwZWRMYXRpbkNoYXJhY3RlclJlZ0V4cCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICAgICAgXCJGb3JtYXQgc3RyaW5nIGNvbnRhaW5zIGFuIHVuZXNjYXBlZCBsYXRpbiBhbHBoYWJldCBjaGFyYWN0ZXIgYFwiICtcbiAgICAgICAgICAgIGZpcnN0Q2hhcmFjdGVyICtcbiAgICAgICAgICAgIFwiYFwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBpc1Rva2VuOiBmYWxzZSwgdmFsdWU6IHN1YnN0cmluZyB9O1xuICAgIH0pO1xuXG4gIC8vIGludm9rZSBsb2NhbGl6ZSBwcmVwcm9jZXNzb3IgKG9ubHkgZm9yIGZyZW5jaCBsb2NhbGVzIGF0IHRoZSBtb21lbnQpXG4gIGlmIChsb2NhbGUubG9jYWxpemUucHJlcHJvY2Vzc29yKSB7XG4gICAgcGFydHMgPSBsb2NhbGUubG9jYWxpemUucHJlcHJvY2Vzc29yKG9yaWdpbmFsRGF0ZSwgcGFydHMpO1xuICB9XG5cbiAgY29uc3QgZm9ybWF0dGVyT3B0aW9ucyA9IHtcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGUsXG4gICAgd2Vla1N0YXJ0c09uLFxuICAgIGxvY2FsZSxcbiAgfTtcblxuICByZXR1cm4gcGFydHNcbiAgICAubWFwKChwYXJ0KSA9PiB7XG4gICAgICBpZiAoIXBhcnQuaXNUb2tlbikgcmV0dXJuIHBhcnQudmFsdWU7XG5cbiAgICAgIGNvbnN0IHRva2VuID0gcGFydC52YWx1ZTtcblxuICAgICAgaWYgKFxuICAgICAgICAoIW9wdGlvbnM/LnVzZUFkZGl0aW9uYWxXZWVrWWVhclRva2VucyAmJlxuICAgICAgICAgIGlzUHJvdGVjdGVkV2Vla1llYXJUb2tlbih0b2tlbikpIHx8XG4gICAgICAgICghb3B0aW9ucz8udXNlQWRkaXRpb25hbERheU9mWWVhclRva2VucyAmJlxuICAgICAgICAgIGlzUHJvdGVjdGVkRGF5T2ZZZWFyVG9rZW4odG9rZW4pKVxuICAgICAgKSB7XG4gICAgICAgIHdhcm5PclRocm93UHJvdGVjdGVkRXJyb3IodG9rZW4sIGZvcm1hdFN0ciwgU3RyaW5nKGRhdGUpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm9ybWF0dGVyID0gZm9ybWF0dGVyc1t0b2tlblswXV07XG4gICAgICByZXR1cm4gZm9ybWF0dGVyKG9yaWdpbmFsRGF0ZSwgdG9rZW4sIGxvY2FsZS5sb2NhbGl6ZSwgZm9ybWF0dGVyT3B0aW9ucyk7XG4gICAgfSlcbiAgICAuam9pbihcIlwiKTtcbn1cblxuZnVuY3Rpb24gY2xlYW5Fc2NhcGVkU3RyaW5nKGlucHV0KSB7XG4gIGNvbnN0IG1hdGNoZWQgPSBpbnB1dC5tYXRjaChlc2NhcGVkU3RyaW5nUmVnRXhwKTtcblxuICBpZiAoIW1hdGNoZWQpIHtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlZFsxXS5yZXBsYWNlKGRvdWJsZVF1b3RlUmVnRXhwLCBcIidcIik7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZm9ybWF0O1xuIiwiaW1wb3J0IHsgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIH0gZnJvbSBcIi4vZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZlllYXIgfSBmcm9tIFwiLi9zdGFydE9mWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBnZXREYXlPZlllYXJcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBkYXkgb2YgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGRheSBvZiB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIGRheSBvZiB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIGRheSBvZiB0aGUgeWVhciBpcyAyIEp1bHkgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldERheU9mWWVhcihuZXcgRGF0ZSgyMDE0LCA2LCAyKSlcbiAqIC8vPT4gMTgzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXlPZlllYXIoZGF0ZSkge1xuICBjb25zdCBfZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgZGlmZiA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhfZGF0ZSwgc3RhcnRPZlllYXIoX2RhdGUpKTtcbiAgY29uc3QgZGF5T2ZZZWFyID0gZGlmZiArIDE7XG4gIHJldHVybiBkYXlPZlllYXI7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0RGF5T2ZZZWFyO1xuIiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5XZWVrIH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZklTT1dlZWsgfSBmcm9tIFwiLi9zdGFydE9mSVNPV2Vlay5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrWWVhciB9IGZyb20gXCIuL3N0YXJ0T2ZJU09XZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBnZXRJU09XZWVrXG4gKiBAY2F0ZWdvcnkgSVNPIFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBJU08gd2VlayBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgSVNPIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGdpdmVuIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgSVNPIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgSVNPLXdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMiBKYW51YXJ5IDIwMDU/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRJU09XZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpKVxuICogLy89PiA1M1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SVNPV2VlayhkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkaWZmID0gK3N0YXJ0T2ZJU09XZWVrKF9kYXRlKSAtICtzdGFydE9mSVNPV2Vla1llYXIoX2RhdGUpO1xuXG4gIC8vIFJvdW5kIHRoZSBudW1iZXIgb2Ygd2Vla3MgdG8gdGhlIG5lYXJlc3QgaW50ZWdlciBiZWNhdXNlIHRoZSBudW1iZXIgb2ZcbiAgLy8gbWlsbGlzZWNvbmRzIGluIGEgd2VlayBpcyBub3QgY29uc3RhbnQgKGUuZy4gaXQncyBkaWZmZXJlbnQgaW4gdGhlIHdlZWsgb2ZcbiAgLy8gdGhlIGRheWxpZ2h0IHNhdmluZyB0aW1lIGNsb2NrIHNoaWZ0KS5cbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIG1pbGxpc2Vjb25kc0luV2VlaykgKyAxO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldElTT1dlZWs7XG4iLCJpbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgZ2V0SVNPV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBJU08gd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZSxcbiAqIHdoaWNoIGFsd2F5cyBzdGFydHMgMyBkYXlzIGJlZm9yZSB0aGUgeWVhcidzIGZpcnN0IFRodXJzZGF5LlxuICpcbiAqIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0lTT193ZWVrX2RhdGVcbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIElTTy13ZWVrIG51bWJlcmluZyB5ZWFyIGlzIDIgSmFudWFyeSAyMDA1P1xuICogY29uc3QgcmVzdWx0ID0gZ2V0SVNPV2Vla1llYXIobmV3IERhdGUoMjAwNSwgMCwgMikpXG4gKiAvLz0+IDIwMDRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElTT1dlZWtZZWFyKGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBfZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldEZ1bGxZZWFyKHllYXIgKyAxLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhcik7XG5cbiAgY29uc3QgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0RnVsbFllYXIoeWVhciwgMCwgNCk7XG4gIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIpO1xuXG4gIGlmIChfZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZk5leHRZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyICsgMTtcbiAgfSBlbHNlIGlmIChfZGF0ZS5nZXRUaW1lKCkgPj0gc3RhcnRPZlRoaXNZZWFyLmdldFRpbWUoKSkge1xuICAgIHJldHVybiB5ZWFyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB5ZWFyIC0gMTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGdldElTT1dlZWtZZWFyO1xuIiwiaW1wb3J0IHsgbWlsbGlzZWNvbmRzSW5XZWVrIH0gZnJvbSBcIi4vY29uc3RhbnRzLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrWWVhciB9IGZyb20gXCIuL3N0YXJ0T2ZXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGdldFdlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBnZXRXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIGxvY2FsIHdlZWsgaW5kZXggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBHZXQgdGhlIGxvY2FsIHdlZWsgaW5kZXggb2YgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgZXhhY3QgY2FsY3VsYXRpb24gZGVwZW5kcyBvbiB0aGUgdmFsdWVzIG9mXG4gKiBgb3B0aW9ucy53ZWVrU3RhcnRzT25gICh3aGljaCBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlaylcbiAqIGFuZCBgb3B0aW9ucy5maXJzdFdlZWtDb250YWluc0RhdGVgICh3aGljaCBpcyB0aGUgZGF5IG9mIEphbnVhcnksIHdoaWNoIGlzIGFsd2F5cyBpblxuICogdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHdlZWstbnVtYmVyaW5nIHllYXIpXG4gKlxuICogV2VlayBudW1iZXJpbmc6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1dlZWsjVGhlX0lTT193ZWVrX2RhdGVfc3lzdGVtXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgZ2l2ZW4gZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgbG9jYWwgd2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNSB3aXRoIGRlZmF1bHQgb3B0aW9ucz9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWsobmV3IERhdGUoMjAwNSwgMCwgMikpXG4gKiAvLz0+IDJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBvZiB0aGUgbG9jYWwgd2VlayBudW1iZXJpbmcgeWVhciBpcyAyIEphbnVhcnkgMjAwNSxcbiAqIC8vIGlmIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLFxuICogLy8gYW5kIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyIGFsd2F5cyBjb250YWlucyA0IEphbnVhcnk/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrKG5ldyBEYXRlKDIwMDUsIDAsIDIpLCB7XG4gKiAgIHdlZWtTdGFydHNPbjogMSxcbiAqICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0XG4gKiB9KVxuICogLy89PiA1M1xuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRpZmYgPSArc3RhcnRPZldlZWsoX2RhdGUsIG9wdGlvbnMpIC0gK3N0YXJ0T2ZXZWVrWWVhcihfZGF0ZSwgb3B0aW9ucyk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiB3ZWVrcyB0byB0aGUgbmVhcmVzdCBpbnRlZ2VyIGJlY2F1c2UgdGhlIG51bWJlciBvZlxuICAvLyBtaWxsaXNlY29uZHMgaW4gYSB3ZWVrIGlzIG5vdCBjb25zdGFudCAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgd2VlayBvZlxuICAvLyB0aGUgZGF5bGlnaHQgc2F2aW5nIHRpbWUgY2xvY2sgc2hpZnQpLlxuICByZXR1cm4gTWF0aC5yb3VuZChkaWZmIC8gbWlsbGlzZWNvbmRzSW5XZWVrKSArIDE7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0V2VlaztcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGdldFdlZWtZZWFyfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgZ2V0V2Vla1llYXJcbiAqIEBjYXRlZ29yeSBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbG9jYWwgd2Vlay1udW1iZXJpbmcgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSBleGFjdCBjYWxjdWxhdGlvbiBkZXBlbmRzIG9uIHRoZSB2YWx1ZXMgb2ZcbiAqIGBvcHRpb25zLndlZWtTdGFydHNPbmAgKHdoaWNoIGlzIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrKVxuICogYW5kIGBvcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZWAgKHdoaWNoIGlzIHRoZSBkYXkgb2YgSmFudWFyeSwgd2hpY2ggaXMgYWx3YXlzIGluXG4gKiB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgd2Vlay1udW1iZXJpbmcgeWVhcilcbiAqXG4gKiBXZWVrIG51bWJlcmluZzogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2VlayNUaGVfSVNPX3dlZWtfZGF0ZV9zeXN0ZW1cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBnaXZlbiBkYXRlXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKlxuICogQHJldHVybnMgVGhlIGxvY2FsIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IHdpdGggdGhlIGRlZmF1bHQgc2V0dGluZ3M/XG4gKiBjb25zdCByZXN1bHQgPSBnZXRXZWVrWWVhcihuZXcgRGF0ZSgyMDA0LCAxMSwgMjYpKVxuICogLy89PiAyMDA1XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoaWNoIHdlZWsgbnVtYmVyaW5nIHllYXIgaXMgMjYgRGVjZW1iZXIgMjAwNCBpZiB3ZWVrIHN0YXJ0cyBvbiBTYXR1cmRheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNiksIHsgd2Vla1N0YXJ0c09uOiA2IH0pXG4gKiAvLz0+IDIwMDRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hpY2ggd2VlayBudW1iZXJpbmcgeWVhciBpcyAyNiBEZWNlbWJlciAyMDA0IGlmIHRoZSBmaXJzdCB3ZWVrIGNvbnRhaW5zIDQgSmFudWFyeT9cbiAqIGNvbnN0IHJlc3VsdCA9IGdldFdlZWtZZWFyKG5ldyBEYXRlKDIwMDQsIDExLCAyNiksIHsgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0IH0pXG4gKiAvLz0+IDIwMDRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtZZWFyKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IHllYXIgPSBfZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCBmaXJzdFdlZWtPZk5leHRZZWFyID0gY29uc3RydWN0RnJvbShkYXRlLCAwKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRGdWxsWWVhcih5ZWFyICsgMSwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZOZXh0WWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZk5leHRZZWFyID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrT2ZOZXh0WWVhciwgb3B0aW9ucyk7XG5cbiAgY29uc3QgZmlyc3RXZWVrT2ZUaGlzWWVhciA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZpcnN0V2Vla09mVGhpc1llYXIuc2V0RnVsbFllYXIoeWVhciwgMCwgZmlyc3RXZWVrQ29udGFpbnNEYXRlKTtcbiAgZmlyc3RXZWVrT2ZUaGlzWWVhci5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgY29uc3Qgc3RhcnRPZlRoaXNZZWFyID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrT2ZUaGlzWWVhciwgb3B0aW9ucyk7XG5cbiAgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mTmV4dFllYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXIgKyAxO1xuICB9IGVsc2UgaWYgKF9kYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHllYXIgLSAxO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgZ2V0V2Vla1llYXI7XG4iLCIvKipcbiAqIEBuYW1lIGlzRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gdmFsdWUgYSBkYXRlP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLiBUaGUgZnVuY3Rpb24gd29ya3MgZm9yIGRhdGVzIHRyYW5zZmVycmVkIGFjcm9zcyBpZnJhbWVzLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBjaGVja1xuICpcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgZGF0ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgYSB2YWxpZCBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKG5ldyBEYXRlKCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZShuZXcgRGF0ZShOYU4pKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBzb21lIHZhbHVlOlxuICogY29uc3QgcmVzdWx0ID0gaXNEYXRlKCcyMDE0LTAyLTMxJylcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gRm9yIGFuIG9iamVjdDpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzRGF0ZSh7fSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZSh2YWx1ZSkge1xuICByZXR1cm4gKFxuICAgIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBEYXRlXVwiKVxuICApO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzRGF0ZTtcbiIsImltcG9ydCB7IGlzRGF0ZSB9IGZyb20gXCIuL2lzRGF0ZS5tanNcIjtcbmltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBpc1ZhbGlkXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHZhbGlkP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJucyBmYWxzZSBpZiBhcmd1bWVudCBpcyBJbnZhbGlkIERhdGUgYW5kIHRydWUgb3RoZXJ3aXNlLlxuICogQXJndW1lbnQgaXMgY29udmVydGVkIHRvIERhdGUgdXNpbmcgYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXShodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZSlcbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICpcbiAqIFRpbWUgdmFsdWUgb2YgRGF0ZTogaHR0cDovL2VzNS5naXRodWIuaW8vI3gxNS45LjEuMVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGRhdGUgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZSBpcyB2YWxpZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbGlkIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQoMTM5MzgwNDgwMDAwMClcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IGlzVmFsaWQobmV3IERhdGUoJycpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZChkYXRlKSB7XG4gIGlmICghaXNEYXRlKGRhdGUpICYmIHR5cGVvZiBkYXRlICE9PSBcIm51bWJlclwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICByZXR1cm4gIWlzTmFOKE51bWJlcihfZGF0ZSkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzVmFsaWQ7XG4iLCJleHBvcnQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gKG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIC8vIFRPRE86IFJlbW92ZSBTdHJpbmcoKVxuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgIGNvbnN0IGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBUaGUgbG9jYWxpemUgZnVuY3Rpb24gYXJndW1lbnQgY2FsbGJhY2sgd2hpY2ggYWxsb3dzIHRvIGNvbnZlcnQgcmF3IHZhbHVlIHRvXG4gKiB0aGUgYWN0dWFsIHR5cGUuXG4gKlxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHZhbHVlXG4gKi9cblxuLyoqXG4gKiBUaGUgbWFwIG9mIGxvY2FsaXplZCB2YWx1ZXMgZm9yIGVhY2ggd2lkdGguXG4gKi9cblxuLyoqXG4gKiBUaGUgaW5kZXggdHlwZSBvZiB0aGUgbG9jYWxlIHVuaXQgdmFsdWUuIEl0IHR5cGVzIGNvbnZlcnNpb24gb2YgdW5pdHMgb2ZcbiAqIHZhbHVlcyB0aGF0IGRvbid0IHN0YXJ0IGF0IDAgKGkuZS4gcXVhcnRlcnMpLlxuICovXG5cbi8qKlxuICogQ29udmVydHMgdGhlIHVuaXQgdmFsdWUgdG8gdGhlIHR1cGxlIG9mIHZhbHVlcy5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgZXJhIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBCQyxcbiAqIHRoZSBzZWNvbmQgZWxlbWVudCByZXByZXNlbnRzIEFELlxuICovXG5cbi8qKlxuICogVGhlIHR1cGxlIG9mIGxvY2FsaXplZCBxdWFydGVyIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBRMS5cbiAqL1xuXG4vKipcbiAqIFRoZSB0dXBsZSBvZiBsb2NhbGl6ZWQgZGF5IHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBTdW5kYXkuXG4gKi9cblxuLyoqXG4gKiBUaGUgdHVwbGUgb2YgbG9jYWxpemVkIG1vbnRoIHZhbHVlcy4gVGhlIGZpcnN0IGVsZW1lbnQgcmVwcmVzZW50cyBKYW51YXJ5LlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZExvY2FsaXplRm4oYXJncykge1xuICByZXR1cm4gKHZhbHVlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgY29udGV4dCA9IG9wdGlvbnM/LmNvbnRleHQgPyBTdHJpbmcob3B0aW9ucy5jb250ZXh0KSA6IFwic3RhbmRhbG9uZVwiO1xuXG4gICAgbGV0IHZhbHVlc0FycmF5O1xuICAgIGlmIChjb250ZXh0ID09PSBcImZvcm1hdHRpbmdcIiAmJiBhcmdzLmZvcm1hdHRpbmdWYWx1ZXMpIHtcbiAgICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCB8fCBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucz8ud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBkZWZhdWx0V2lkdGg7XG5cbiAgICAgIHZhbHVlc0FycmF5ID1cbiAgICAgICAgYXJncy5mb3JtYXR0aW5nVmFsdWVzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnM/LndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG5cbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy52YWx1ZXNbd2lkdGhdIHx8IGFyZ3MudmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gYXJncy5hcmd1bWVudENhbGxiYWNrID8gYXJncy5hcmd1bWVudENhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtIEZvciBzb21lIHJlYXNvbiBUeXBlU2NyaXB0IGp1c3QgZG9uJ3Qgd2FudCB0byBtYXRjaCBpdCwgbm8gbWF0dGVyIGhvdyBoYXJkIHdlIHRyeS4gSSBjaGFsbGVuZ2UgeW91IHRvIHRyeSB0byByZW1vdmUgaXQhXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5W2luZGV4XTtcbiAgfTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBidWlsZE1hdGNoRm4oYXJncykge1xuICByZXR1cm4gKHN0cmluZywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoO1xuXG4gICAgY29uc3QgbWF0Y2hQYXR0ZXJuID1cbiAgICAgICh3aWR0aCAmJiBhcmdzLm1hdGNoUGF0dGVybnNbd2lkdGhdKSB8fFxuICAgICAgYXJncy5tYXRjaFBhdHRlcm5zW2FyZ3MuZGVmYXVsdE1hdGNoV2lkdGhdO1xuICAgIGNvbnN0IG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKG1hdGNoUGF0dGVybik7XG5cbiAgICBpZiAoIW1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuXG4gICAgY29uc3QgcGFyc2VQYXR0ZXJucyA9XG4gICAgICAod2lkdGggJiYgYXJncy5wYXJzZVBhdHRlcm5zW3dpZHRoXSkgfHxcbiAgICAgIGFyZ3MucGFyc2VQYXR0ZXJuc1thcmdzLmRlZmF1bHRQYXJzZVdpZHRoXTtcblxuICAgIGNvbnN0IGtleSA9IEFycmF5LmlzQXJyYXkocGFyc2VQYXR0ZXJucylcbiAgICAgID8gZmluZEluZGV4KHBhcnNlUGF0dGVybnMsIChwYXR0ZXJuKSA9PiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZykpXG4gICAgICA6IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55IC0tIEkgY2hhbGxhbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICAgICAgZmluZEtleShwYXJzZVBhdHRlcm5zLCAocGF0dGVybikgPT4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpKTtcblxuICAgIGxldCB2YWx1ZTtcblxuICAgIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKGtleSkgOiBrZXk7XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2tcbiAgICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgLS0gSSBjaGFsbGFuZ2UgeW91IHRvIGZpeCB0aGUgdHlwZVxuICAgICAgICBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpXG4gICAgICA6IHZhbHVlO1xuXG4gICAgY29uc3QgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG5cbiAgICByZXR1cm4geyB2YWx1ZSwgcmVzdCB9O1xuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kS2V5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChcbiAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiZcbiAgICAgIHByZWRpY2F0ZShvYmplY3Rba2V5XSlcbiAgICApIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAobGV0IGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oYXJncykge1xuICByZXR1cm4gKHN0cmluZywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgY29uc3QgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5tYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcblxuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MucGFyc2VQYXR0ZXJuKTtcbiAgICBpZiAoIXBhcnNlUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICBsZXQgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2tcbiAgICAgID8gYXJncy52YWx1ZUNhbGxiYWNrKHBhcnNlUmVzdWx0WzBdKVxuICAgICAgOiBwYXJzZVJlc3VsdFswXTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55IC0tIEkgY2hhbGxhbmdlIHlvdSB0byBmaXggdGhlIHR5cGVcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFjayA/IG9wdGlvbnMudmFsdWVDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIGNvbnN0IHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHsgdmFsdWUsIHJlc3QgfTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IGZvcm1hdERpc3RhbmNlIH0gZnJvbSBcIi4vZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS5tanNcIjtcbmltcG9ydCB7IGZvcm1hdExvbmcgfSBmcm9tIFwiLi9lbi1VUy9fbGliL2Zvcm1hdExvbmcubWpzXCI7XG5pbXBvcnQgeyBmb3JtYXRSZWxhdGl2ZSB9IGZyb20gXCIuL2VuLVVTL19saWIvZm9ybWF0UmVsYXRpdmUubWpzXCI7XG5pbXBvcnQgeyBsb2NhbGl6ZSB9IGZyb20gXCIuL2VuLVVTL19saWIvbG9jYWxpemUubWpzXCI7XG5pbXBvcnQgeyBtYXRjaCB9IGZyb20gXCIuL2VuLVVTL19saWIvbWF0Y2gubWpzXCI7XG5cbi8qKlxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF0oaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnApXG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3MpXG4gKi9cbmV4cG9ydCBjb25zdCBlblVTID0ge1xuICBjb2RlOiBcImVuLVVTXCIsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMCAvKiBTdW5kYXkgKi8sXG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxLFxuICB9LFxufTtcblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBlblVTO1xuIiwiY29uc3QgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICBvbmU6IFwibGVzcyB0aGFuIGEgc2Vjb25kXCIsXG4gICAgb3RoZXI6IFwibGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzXCIsXG4gIH0sXG5cbiAgeFNlY29uZHM6IHtcbiAgICBvbmU6IFwiMSBzZWNvbmRcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gc2Vjb25kc1wiLFxuICB9LFxuXG4gIGhhbGZBTWludXRlOiBcImhhbGYgYSBtaW51dGVcIixcblxuICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgb25lOiBcImxlc3MgdGhhbiBhIG1pbnV0ZVwiLFxuICAgIG90aGVyOiBcImxlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlc1wiLFxuICB9LFxuXG4gIHhNaW51dGVzOiB7XG4gICAgb25lOiBcIjEgbWludXRlXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IG1pbnV0ZXNcIixcbiAgfSxcblxuICBhYm91dFhIb3Vyczoge1xuICAgIG9uZTogXCJhYm91dCAxIGhvdXJcIixcbiAgICBvdGhlcjogXCJhYm91dCB7e2NvdW50fX0gaG91cnNcIixcbiAgfSxcblxuICB4SG91cnM6IHtcbiAgICBvbmU6IFwiMSBob3VyXCIsXG4gICAgb3RoZXI6IFwie3tjb3VudH19IGhvdXJzXCIsXG4gIH0sXG5cbiAgeERheXM6IHtcbiAgICBvbmU6IFwiMSBkYXlcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gZGF5c1wiLFxuICB9LFxuXG4gIGFib3V0WFdlZWtzOiB7XG4gICAgb25lOiBcImFib3V0IDEgd2Vla1wiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSB3ZWVrc1wiLFxuICB9LFxuXG4gIHhXZWVrczoge1xuICAgIG9uZTogXCIxIHdlZWtcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gd2Vla3NcIixcbiAgfSxcblxuICBhYm91dFhNb250aHM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSBtb250aFwiLFxuICAgIG90aGVyOiBcImFib3V0IHt7Y291bnR9fSBtb250aHNcIixcbiAgfSxcblxuICB4TW9udGhzOiB7XG4gICAgb25lOiBcIjEgbW9udGhcIixcbiAgICBvdGhlcjogXCJ7e2NvdW50fX0gbW9udGhzXCIsXG4gIH0sXG5cbiAgYWJvdXRYWWVhcnM6IHtcbiAgICBvbmU6IFwiYWJvdXQgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwiYWJvdXQge3tjb3VudH19IHllYXJzXCIsXG4gIH0sXG5cbiAgeFllYXJzOiB7XG4gICAgb25lOiBcIjEgeWVhclwiLFxuICAgIG90aGVyOiBcInt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIG92ZXJYWWVhcnM6IHtcbiAgICBvbmU6IFwib3ZlciAxIHllYXJcIixcbiAgICBvdGhlcjogXCJvdmVyIHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxuXG4gIGFsbW9zdFhZZWFyczoge1xuICAgIG9uZTogXCJhbG1vc3QgMSB5ZWFyXCIsXG4gICAgb3RoZXI6IFwiYWxtb3N0IHt7Y291bnR9fSB5ZWFyc1wiLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdERpc3RhbmNlID0gKHRva2VuLCBjb3VudCwgb3B0aW9ucykgPT4ge1xuICBsZXQgcmVzdWx0O1xuXG4gIGNvbnN0IHRva2VuVmFsdWUgPSBmb3JtYXREaXN0YW5jZUxvY2FsZVt0b2tlbl07XG4gIGlmICh0eXBlb2YgdG9rZW5WYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWU7XG4gIH0gZWxzZSBpZiAoY291bnQgPT09IDEpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm90aGVyLnJlcGxhY2UoXCJ7e2NvdW50fX1cIiwgY291bnQudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucz8uYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gXCJpbiBcIiArIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdCArIFwiIGFnb1wiO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiaW1wb3J0IHsgYnVpbGRGb3JtYXRMb25nRm4gfSBmcm9tIFwiLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi5tanNcIjtcblxuY29uc3QgZGF0ZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwiRUVFRSwgTU1NTSBkbywgeVwiLFxuICBsb25nOiBcIk1NTU0gZG8sIHlcIixcbiAgbWVkaXVtOiBcIk1NTSBkLCB5XCIsXG4gIHNob3J0OiBcIk1NL2RkL3l5eXlcIixcbn07XG5cbmNvbnN0IHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcImg6bW06c3MgYSB6enp6XCIsXG4gIGxvbmc6IFwiaDptbTpzcyBhIHpcIixcbiAgbWVkaXVtOiBcImg6bW06c3MgYVwiLFxuICBzaG9ydDogXCJoOm1tIGFcIixcbn07XG5cbmNvbnN0IGRhdGVUaW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIGxvbmc6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBtZWRpdW06IFwie3tkYXRlfX0sIHt7dGltZX19XCIsXG4gIHNob3J0OiBcInt7ZGF0ZX19LCB7e3RpbWV9fVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdExvbmcgPSB7XG4gIGRhdGU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6IFwiZnVsbFwiLFxuICB9KSxcblxuICB0aW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogdGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG5cbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiBcImZ1bGxcIixcbiAgfSksXG59O1xuIiwiY29uc3QgZm9ybWF0UmVsYXRpdmVMb2NhbGUgPSB7XG4gIGxhc3RXZWVrOiBcIidsYXN0JyBlZWVlICdhdCcgcFwiLFxuICB5ZXN0ZXJkYXk6IFwiJ3llc3RlcmRheSBhdCcgcFwiLFxuICB0b2RheTogXCIndG9kYXkgYXQnIHBcIixcbiAgdG9tb3Jyb3c6IFwiJ3RvbW9ycm93IGF0JyBwXCIsXG4gIG5leHRXZWVrOiBcImVlZWUgJ2F0JyBwXCIsXG4gIG90aGVyOiBcIlBcIixcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRSZWxhdGl2ZSA9ICh0b2tlbiwgX2RhdGUsIF9iYXNlRGF0ZSwgX29wdGlvbnMpID0+XG4gIGZvcm1hdFJlbGF0aXZlTG9jYWxlW3Rva2VuXTtcbiIsImltcG9ydCB7IGJ1aWxkTG9jYWxpemVGbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTG9jYWxpemVGbi5tanNcIjtcblxuY29uc3QgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIkJcIiwgXCJBXCJdLFxuICBhYmJyZXZpYXRlZDogW1wiQkNcIiwgXCJBRFwiXSxcbiAgd2lkZTogW1wiQmVmb3JlIENocmlzdFwiLCBcIkFubm8gRG9taW5pXCJdLFxufTtcblxuY29uc3QgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCJdLFxuICBhYmJyZXZpYXRlZDogW1wiUTFcIiwgXCJRMlwiLCBcIlEzXCIsIFwiUTRcIl0sXG4gIHdpZGU6IFtcIjFzdCBxdWFydGVyXCIsIFwiMm5kIHF1YXJ0ZXJcIiwgXCIzcmQgcXVhcnRlclwiLCBcIjR0aCBxdWFydGVyXCJdLFxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxuY29uc3QgbW9udGhWYWx1ZXMgPSB7XG4gIG5hcnJvdzogW1wiSlwiLCBcIkZcIiwgXCJNXCIsIFwiQVwiLCBcIk1cIiwgXCJKXCIsIFwiSlwiLCBcIkFcIiwgXCJTXCIsIFwiT1wiLCBcIk5cIiwgXCJEXCJdLFxuICBhYmJyZXZpYXRlZDogW1xuICAgIFwiSmFuXCIsXG4gICAgXCJGZWJcIixcbiAgICBcIk1hclwiLFxuICAgIFwiQXByXCIsXG4gICAgXCJNYXlcIixcbiAgICBcIkp1blwiLFxuICAgIFwiSnVsXCIsXG4gICAgXCJBdWdcIixcbiAgICBcIlNlcFwiLFxuICAgIFwiT2N0XCIsXG4gICAgXCJOb3ZcIixcbiAgICBcIkRlY1wiLFxuICBdLFxuXG4gIHdpZGU6IFtcbiAgICBcIkphbnVhcnlcIixcbiAgICBcIkZlYnJ1YXJ5XCIsXG4gICAgXCJNYXJjaFwiLFxuICAgIFwiQXByaWxcIixcbiAgICBcIk1heVwiLFxuICAgIFwiSnVuZVwiLFxuICAgIFwiSnVseVwiLFxuICAgIFwiQXVndXN0XCIsXG4gICAgXCJTZXB0ZW1iZXJcIixcbiAgICBcIk9jdG9iZXJcIixcbiAgICBcIk5vdmVtYmVyXCIsXG4gICAgXCJEZWNlbWJlclwiLFxuICBdLFxufTtcblxuY29uc3QgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFtcIlNcIiwgXCJNXCIsIFwiVFwiLCBcIldcIiwgXCJUXCIsIFwiRlwiLCBcIlNcIl0sXG4gIHNob3J0OiBbXCJTdVwiLCBcIk1vXCIsIFwiVHVcIiwgXCJXZVwiLCBcIlRoXCIsIFwiRnJcIiwgXCJTYVwiXSxcbiAgYWJicmV2aWF0ZWQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgd2lkZTogW1xuICAgIFwiU3VuZGF5XCIsXG4gICAgXCJNb25kYXlcIixcbiAgICBcIlR1ZXNkYXlcIixcbiAgICBcIldlZG5lc2RheVwiLFxuICAgIFwiVGh1cnNkYXlcIixcbiAgICBcIkZyaWRheVwiLFxuICAgIFwiU2F0dXJkYXlcIixcbiAgXSxcbn07XG5cbmNvbnN0IGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwibW9ybmluZ1wiLFxuICAgIGFmdGVybm9vbjogXCJhZnRlcm5vb25cIixcbiAgICBldmVuaW5nOiBcImV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3QgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06IFwiYVwiLFxuICAgIHBtOiBcInBcIixcbiAgICBtaWRuaWdodDogXCJtaVwiLFxuICAgIG5vb246IFwiblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiBcIkFNXCIsXG4gICAgcG06IFwiUE1cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxuICB3aWRlOiB7XG4gICAgYW06IFwiYS5tLlwiLFxuICAgIHBtOiBcInAubS5cIixcbiAgICBtaWRuaWdodDogXCJtaWRuaWdodFwiLFxuICAgIG5vb246IFwibm9vblwiLFxuICAgIG1vcm5pbmc6IFwiaW4gdGhlIG1vcm5pbmdcIixcbiAgICBhZnRlcm5vb246IFwiaW4gdGhlIGFmdGVybm9vblwiLFxuICAgIGV2ZW5pbmc6IFwiaW4gdGhlIGV2ZW5pbmdcIixcbiAgICBuaWdodDogXCJhdCBuaWdodFwiLFxuICB9LFxufTtcblxuY29uc3Qgb3JkaW5hbE51bWJlciA9IChkaXJ0eU51bWJlciwgX29wdGlvbnMpID0+IHtcbiAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGAuXG4gIC8vXG4gIC8vIGB1bml0YCBjYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RhdGUnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLlxuXG4gIGNvbnN0IHJlbTEwMCA9IG51bWJlciAlIDEwMDtcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJzdFwiO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJuZFwiO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgXCJyZFwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgXCJ0aFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGxvY2FsaXplID0ge1xuICBvcmRpbmFsTnVtYmVyLFxuXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICAgIGFyZ3VtZW50Q2FsbGJhY2s6IChxdWFydGVyKSA9PiBxdWFydGVyIC0gMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBtb250aFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6IFwid2lkZVwiLFxuICB9KSxcblxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiBcIndpZGVcIixcbiAgfSksXG5cbiAgZGF5UGVyaW9kOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogXCJ3aWRlXCIsXG4gICAgZm9ybWF0dGluZ1ZhbHVlczogZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiBcIndpZGVcIixcbiAgfSksXG59O1xuIiwiaW1wb3J0IHsgYnVpbGRNYXRjaEZuIH0gZnJvbSBcIi4uLy4uL19saWIvYnVpbGRNYXRjaEZuLm1qc1wiO1xuaW1wb3J0IHsgYnVpbGRNYXRjaFBhdHRlcm5GbiB9IGZyb20gXCIuLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4ubWpzXCI7XG5cbmNvbnN0IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXihcXGQrKSh0aHxzdHxuZHxyZCk/L2k7XG5jb25zdCBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL1xcZCsvaTtcblxuY29uc3QgbWF0Y2hFcmFQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihifGEpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihiXFwuP1xccz9jXFwuP3xiXFwuP1xccz9jXFwuP1xccz9lXFwuP3xhXFwuP1xccz9kXFwuP3xjXFwuP1xccz9lXFwuPykvaSxcbiAgd2lkZTogL14oYmVmb3JlIGNocmlzdHxiZWZvcmUgY29tbW9uIGVyYXxhbm5vIGRvbWluaXxjb21tb24gZXJhKS9pLFxufTtcbmNvbnN0IHBhcnNlRXJhUGF0dGVybnMgPSB7XG4gIGFueTogWy9eYi9pLCAvXihhfGMpL2ldLFxufTtcblxuY29uc3QgbWF0Y2hRdWFydGVyUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bMTIzNF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9ecVsxMjM0XS9pLFxuICB3aWRlOiAvXlsxMjM0XSh0aHxzdHxuZHxyZCk/IHF1YXJ0ZXIvaSxcbn07XG5jb25zdCBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgYW55OiBbLzEvaSwgLzIvaSwgLzMvaSwgLzQvaV0sXG59O1xuXG5jb25zdCBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bamZtYXNvbmRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgd2lkZTogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaSxcbn07XG5jb25zdCBwYXJzZU1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogW1xuICAgIC9eai9pLFxuICAgIC9eZi9pLFxuICAgIC9ebS9pLFxuICAgIC9eYS9pLFxuICAgIC9ebS9pLFxuICAgIC9eai9pLFxuICAgIC9eai9pLFxuICAgIC9eYS9pLFxuICAgIC9ecy9pLFxuICAgIC9eby9pLFxuICAgIC9ebi9pLFxuICAgIC9eZC9pLFxuICBdLFxuXG4gIGFueTogW1xuICAgIC9eamEvaSxcbiAgICAvXmYvaSxcbiAgICAvXm1hci9pLFxuICAgIC9eYXAvaSxcbiAgICAvXm1heS9pLFxuICAgIC9eanVuL2ksXG4gICAgL15qdWwvaSxcbiAgICAvXmF1L2ksXG4gICAgL15zL2ksXG4gICAgL15vL2ksXG4gICAgL15uL2ksXG4gICAgL15kL2ksXG4gIF0sXG59O1xuXG5jb25zdCBtYXRjaERheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW3NtdHdmXS9pLFxuICBzaG9ydDogL14oc3V8bW98dHV8d2V8dGh8ZnJ8c2EpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihzdW58bW9ufHR1ZXx3ZWR8dGh1fGZyaXxzYXQpL2ksXG4gIHdpZGU6IC9eKHN1bmRheXxtb25kYXl8dHVlc2RheXx3ZWRuZXNkYXl8dGh1cnNkYXl8ZnJpZGF5fHNhdHVyZGF5KS9pLFxufTtcbmNvbnN0IHBhcnNlRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9ecy9pLCAvXm0vaSwgL150L2ksIC9edy9pLCAvXnQvaSwgL15mL2ksIC9ecy9pXSxcbiAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXSxcbn07XG5cbmNvbnN0IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYXxwfG1pfG58KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxuICBhbnk6IC9eKFthcF1cXC4/XFxzP21cXC4/fG1pZG5pZ2h0fG5vb258KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxufTtcbmNvbnN0IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIGFueToge1xuICAgIGFtOiAvXmEvaSxcbiAgICBwbTogL15wL2ksXG4gICAgbWlkbmlnaHQ6IC9ebWkvaSxcbiAgICBub29uOiAvXm5vL2ksXG4gICAgbW9ybmluZzogL21vcm5pbmcvaSxcbiAgICBhZnRlcm5vb246IC9hZnRlcm5vb24vaSxcbiAgICBldmVuaW5nOiAvZXZlbmluZy9pLFxuICAgIG5pZ2h0OiAvbmlnaHQvaSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBtYXRjaCA9IHtcbiAgb3JkaW5hbE51bWJlcjogYnVpbGRNYXRjaFBhdHRlcm5Gbih7XG4gICAgbWF0Y2hQYXR0ZXJuOiBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHBhcnNlUGF0dGVybjogcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICB2YWx1ZUNhbGxiYWNrOiAodmFsdWUpID0+IHBhcnNlSW50KHZhbHVlLCAxMCksXG4gIH0pLFxuXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZUVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBxdWFydGVyOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogXCJhbnlcIixcbiAgICB2YWx1ZUNhbGxiYWNrOiAoaW5kZXgpID0+IGluZGV4ICsgMSxcbiAgfSksXG5cbiAgbW9udGg6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6IFwiYW55XCIsXG4gIH0pLFxuXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiBcIndpZGVcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcblxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogXCJhbnlcIixcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiBcImFueVwiLFxuICB9KSxcbn07XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZkRheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF5KGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZkRheTtcbiIsImltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZklTT1dlZWtcbiAqIEBjYXRlZ29yeSBJU08gV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhbiBJU08gd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mSVNPV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApKVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZJU09XZWVrKGRhdGUpIHtcbiAgcmV0dXJuIHN0YXJ0T2ZXZWVrKGRhdGUsIHsgd2Vla1N0YXJ0c09uOiAxIH0pO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZJU09XZWVrO1xuIiwiaW1wb3J0IHsgZ2V0SVNPV2Vla1llYXIgfSBmcm9tIFwiLi9nZXRJU09XZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZJU09XZWVrIH0gZnJvbSBcIi4vc3RhcnRPZklTT1dlZWsubWpzXCI7XG5pbXBvcnQgeyBjb25zdHJ1Y3RGcm9tIH0gZnJvbSBcIi4vY29uc3RydWN0RnJvbS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mSVNPV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBJU08gV2Vlay1OdW1iZXJpbmcgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXIsXG4gKiB3aGljaCBhbHdheXMgc3RhcnRzIDMgZGF5cyBiZWZvcmUgdGhlIHllYXIncyBmaXJzdCBUaHVyc2RheS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPX3dlZWtfZGF0ZVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYW4gSVNPIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciAyIEp1bHkgMjAwNTpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZJU09XZWVrWWVhcihuZXcgRGF0ZSgyMDA1LCA2LCAyKSlcbiAqIC8vPT4gTW9uIEphbiAwMyAyMDA1IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mSVNPV2Vla1llYXIoZGF0ZSkge1xuICBjb25zdCB5ZWFyID0gZ2V0SVNPV2Vla1llYXIoZGF0ZSk7XG4gIGNvbnN0IGZvdXJ0aE9mSmFudWFyeSA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZvdXJ0aE9mSmFudWFyeS5zZXRGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gc3RhcnRPZklTT1dlZWsoZm91cnRoT2ZKYW51YXJ5KTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mSVNPV2Vla1llYXI7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBBdWcgMzEgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkYXkgPSBfZGF0ZS5nZXREYXkoKTtcbiAgY29uc3QgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG5cbiAgX2RhdGUuc2V0RGF0ZShfZGF0ZS5nZXREYXRlKCkgLSBkaWZmKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mV2VlaztcbiIsImltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuaW1wb3J0IHsgZ2V0V2Vla1llYXIgfSBmcm9tIFwiLi9nZXRXZWVrWWVhci5tanNcIjtcbmltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla1llYXJ9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBzdGFydE9mV2Vla1llYXJcbiAqIEBjYXRlZ29yeSBXZWVrLU51bWJlcmluZyBZZWFyIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBsb2NhbCB3ZWVrLW51bWJlcmluZyB5ZWFyLlxuICogVGhlIGV4YWN0IGNhbGN1bGF0aW9uIGRlcGVuZHMgb24gdGhlIHZhbHVlcyBvZlxuICogYG9wdGlvbnMud2Vla1N0YXJ0c09uYCAod2hpY2ggaXMgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWspXG4gKiBhbmQgYG9wdGlvbnMuZmlyc3RXZWVrQ29udGFpbnNEYXRlYCAod2hpY2ggaXMgdGhlIGRheSBvZiBKYW51YXJ5LCB3aGljaCBpcyBhbHdheXMgaW5cbiAqIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB3ZWVrLW51bWJlcmluZyB5ZWFyKVxuICpcbiAqIFdlZWsgbnVtYmVyaW5nOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XZWVrI1RoZV9JU09fd2Vla19kYXRlX3N5c3RlbVxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWstbnVtYmVyaW5nIHllYXJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGFuIGEgd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDUgd2l0aCBkZWZhdWx0IHNldHRpbmdzOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpKVxuICogLy89PiBTdW4gRGVjIDI2IDIwMDQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2Vlay1udW1iZXJpbmcgeWVhciBmb3IgMiBKdWx5IDIwMDVcbiAqIC8vIGlmIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHdlZWtcbiAqIC8vIGFuZCA0IEphbnVhcnkgaXMgYWx3YXlzIGluIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWtZZWFyKG5ldyBEYXRlKDIwMDUsIDYsIDIpLCB7XG4gKiAgIHdlZWtTdGFydHNPbjogMSxcbiAqICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiA0XG4gKiB9KVxuICogLy89PiBNb24gSmFuIDAzIDIwMDUgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrWWVhcihkYXRlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgY29uc3QgZmlyc3RXZWVrQ29udGFpbnNEYXRlID1cbiAgICBvcHRpb25zPy5maXJzdFdlZWtDb250YWluc0RhdGUgPz9cbiAgICBvcHRpb25zPy5sb2NhbGU/Lm9wdGlvbnM/LmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmZpcnN0V2Vla0NvbnRhaW5zRGF0ZSA/P1xuICAgIGRlZmF1bHRPcHRpb25zLmxvY2FsZT8ub3B0aW9ucz8uZmlyc3RXZWVrQ29udGFpbnNEYXRlID8/XG4gICAgMTtcblxuICBjb25zdCB5ZWFyID0gZ2V0V2Vla1llYXIoZGF0ZSwgb3B0aW9ucyk7XG4gIGNvbnN0IGZpcnN0V2VlayA9IGNvbnN0cnVjdEZyb20oZGF0ZSwgMCk7XG4gIGZpcnN0V2Vlay5zZXRGdWxsWWVhcih5ZWFyLCAwLCBmaXJzdFdlZWtDb250YWluc0RhdGUpO1xuICBmaXJzdFdlZWsuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIGNvbnN0IF9kYXRlID0gc3RhcnRPZldlZWsoZmlyc3RXZWVrLCBvcHRpb25zKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZXZWVrWWVhcjtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGNvbnN0cnVjdEZyb20gfSBmcm9tIFwiLi9jb25zdHJ1Y3RGcm9tLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZZZWFyXG4gKiBAY2F0ZWdvcnkgWWVhciBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgeWVhciBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqXG4gKiBAcmV0dXJucyBUaGUgc3RhcnQgb2YgYSB5ZWFyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIHllYXIgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mWWVhcihuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDAwKSlcbiAqIC8vPT4gV2VkIEphbiAwMSAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mWWVhcihkYXRlKSB7XG4gIGNvbnN0IGNsZWFuRGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgY29uc3QgX2RhdGUgPSBjb25zdHJ1Y3RGcm9tKGRhdGUsIDApO1xuICBfZGF0ZS5zZXRGdWxsWWVhcihjbGVhbkRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZlllYXI7XG4iLCIvKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gYXJndW1lbnQgLSBUaGUgdmFsdWUgdG8gY29udmVydFxuICpcbiAqIEByZXR1cm5zIFRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIGNvbnN0IGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7XG5cbiAgLy8gQ2xvbmUgdGhlIGRhdGVcbiAgaWYgKFxuICAgIGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fFxuICAgICh0eXBlb2YgYXJndW1lbnQgPT09IFwib2JqZWN0XCIgJiYgYXJnU3RyID09PSBcIltvYmplY3QgRGF0ZV1cIilcbiAgKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBhcmd1bWVudC5jb25zdHJ1Y3RvcigrYXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJudW1iZXJcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IE51bWJlcl1cIiB8fFxuICAgIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJzdHJpbmdcIiB8fFxuICAgIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIlxuICApIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgdG9EYXRlO1xuIiwiaW1wb3J0IEhUTUxNYXNrRWxlbWVudCBmcm9tICcuL2h0bWwtbWFzay1lbGVtZW50LmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgJy4vbWFzay1lbGVtZW50LmpzJztcblxuY2xhc3MgSFRNTENvbnRlbnRlZGl0YWJsZU1hc2tFbGVtZW50IGV4dGVuZHMgSFRNTE1hc2tFbGVtZW50IHtcbiAgLyoqIFJldHVybnMgSFRNTEVsZW1lbnQgc2VsZWN0aW9uIHN0YXJ0ICovXG4gIGdldCBfdW5zYWZlU2VsZWN0aW9uU3RhcnQoKSB7XG4gICAgY29uc3Qgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gcm9vdC5nZXRTZWxlY3Rpb24gJiYgcm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgICBjb25zdCBhbmNob3JPZmZzZXQgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmFuY2hvck9mZnNldDtcbiAgICBjb25zdCBmb2N1c09mZnNldCA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZm9jdXNPZmZzZXQ7XG4gICAgaWYgKGZvY3VzT2Zmc2V0ID09IG51bGwgfHwgYW5jaG9yT2Zmc2V0ID09IG51bGwgfHwgYW5jaG9yT2Zmc2V0IDwgZm9jdXNPZmZzZXQpIHtcbiAgICAgIHJldHVybiBhbmNob3JPZmZzZXQ7XG4gICAgfVxuICAgIHJldHVybiBmb2N1c09mZnNldDtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIEhUTUxFbGVtZW50IHNlbGVjdGlvbiBlbmQgKi9cbiAgZ2V0IF91bnNhZmVTZWxlY3Rpb25FbmQoKSB7XG4gICAgY29uc3Qgcm9vdCA9IHRoaXMucm9vdEVsZW1lbnQ7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gcm9vdC5nZXRTZWxlY3Rpb24gJiYgcm9vdC5nZXRTZWxlY3Rpb24oKTtcbiAgICBjb25zdCBhbmNob3JPZmZzZXQgPSBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLmFuY2hvck9mZnNldDtcbiAgICBjb25zdCBmb2N1c09mZnNldCA9IHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uZm9jdXNPZmZzZXQ7XG4gICAgaWYgKGZvY3VzT2Zmc2V0ID09IG51bGwgfHwgYW5jaG9yT2Zmc2V0ID09IG51bGwgfHwgYW5jaG9yT2Zmc2V0ID4gZm9jdXNPZmZzZXQpIHtcbiAgICAgIHJldHVybiBhbmNob3JPZmZzZXQ7XG4gICAgfVxuICAgIHJldHVybiBmb2N1c09mZnNldDtcbiAgfVxuXG4gIC8qKiBTZXRzIEhUTUxFbGVtZW50IHNlbGVjdGlvbiAqL1xuICBfdW5zYWZlU2VsZWN0KHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAoIXRoaXMucm9vdEVsZW1lbnQuY3JlYXRlUmFuZ2UpIHJldHVybjtcbiAgICBjb25zdCByYW5nZSA9IHRoaXMucm9vdEVsZW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZXRTdGFydCh0aGlzLmlucHV0LmZpcnN0Q2hpbGQgfHwgdGhpcy5pbnB1dCwgc3RhcnQpO1xuICAgIHJhbmdlLnNldEVuZCh0aGlzLmlucHV0Lmxhc3RDaGlsZCB8fCB0aGlzLmlucHV0LCBlbmQpO1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLnJvb3RFbGVtZW50O1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHJvb3QuZ2V0U2VsZWN0aW9uICYmIHJvb3QuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbikge1xuICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKHJhbmdlKTtcbiAgICB9XG4gIH1cblxuICAvKiogSFRNTEVsZW1lbnQgdmFsdWUgKi9cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0LnRleHRDb250ZW50IHx8ICcnO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuaW5wdXQudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgfVxufVxuSU1hc2suSFRNTENvbnRlbnRlZGl0YWJsZU1hc2tFbGVtZW50ID0gSFRNTENvbnRlbnRlZGl0YWJsZU1hc2tFbGVtZW50O1xuXG5leHBvcnQgeyBIVE1MQ29udGVudGVkaXRhYmxlTWFza0VsZW1lbnQgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IEhUTUxNYXNrRWxlbWVudCBmcm9tICcuL2h0bWwtbWFzay1lbGVtZW50LmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgJy4vbWFzay1lbGVtZW50LmpzJztcblxuLyoqIEJyaWRnZSBiZXR3ZWVuIElucHV0RWxlbWVudCBhbmQge0BsaW5rIE1hc2tlZH0gKi9cbmNsYXNzIEhUTUxJbnB1dE1hc2tFbGVtZW50IGV4dGVuZHMgSFRNTE1hc2tFbGVtZW50IHtcbiAgLyoqIElucHV0RWxlbWVudCB0byB1c2UgbWFzayBvbiAqL1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgc3VwZXIoaW5wdXQpO1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIElucHV0RWxlbWVudCBzZWxlY3Rpb24gc3RhcnQgKi9cbiAgZ2V0IF91bnNhZmVTZWxlY3Rpb25TdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC5zZWxlY3Rpb25TdGFydCAhPSBudWxsID8gdGhpcy5pbnB1dC5zZWxlY3Rpb25TdGFydCA6IHRoaXMudmFsdWUubGVuZ3RoO1xuICB9XG5cbiAgLyoqIFJldHVybnMgSW5wdXRFbGVtZW50IHNlbGVjdGlvbiBlbmQgKi9cbiAgZ2V0IF91bnNhZmVTZWxlY3Rpb25FbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXQuc2VsZWN0aW9uRW5kO1xuICB9XG5cbiAgLyoqIFNldHMgSW5wdXRFbGVtZW50IHNlbGVjdGlvbiAqL1xuICBfdW5zYWZlU2VsZWN0KHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLmlucHV0LnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBlbmQpO1xuICB9XG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dC52YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmlucHV0LnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cbklNYXNrLkhUTUxNYXNrRWxlbWVudCA9IEhUTUxNYXNrRWxlbWVudDtcblxuZXhwb3J0IHsgSFRNTElucHV0TWFza0VsZW1lbnQgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IE1hc2tFbGVtZW50IGZyb20gJy4vbWFzay1lbGVtZW50LmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5cbmNvbnN0IEtFWV9aID0gOTA7XG5jb25zdCBLRVlfWSA9IDg5O1xuXG4vKiogQnJpZGdlIGJldHdlZW4gSFRNTEVsZW1lbnQgYW5kIHtAbGluayBNYXNrZWR9ICovXG5jbGFzcyBIVE1MTWFza0VsZW1lbnQgZXh0ZW5kcyBNYXNrRWxlbWVudCB7XG4gIC8qKiBIVE1MRWxlbWVudCB0byB1c2UgbWFzayBvbiAqL1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gICAgdGhpcy5fb25LZXlkb3duID0gdGhpcy5fb25LZXlkb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25JbnB1dCA9IHRoaXMuX29uSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkJlZm9yZWlucHV0ID0gdGhpcy5fb25CZWZvcmVpbnB1dC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uQ29tcG9zaXRpb25FbmQgPSB0aGlzLl9vbkNvbXBvc2l0aW9uRW5kLmJpbmQodGhpcyk7XG4gIH1cbiAgZ2V0IHJvb3RFbGVtZW50KCkge1xuICAgIHZhciBfdGhpcyRpbnB1dCRnZXRSb290Tm8sIF90aGlzJGlucHV0JGdldFJvb3RObzIsIF90aGlzJGlucHV0O1xuICAgIHJldHVybiAoX3RoaXMkaW5wdXQkZ2V0Um9vdE5vID0gKF90aGlzJGlucHV0JGdldFJvb3RObzIgPSAoX3RoaXMkaW5wdXQgPSB0aGlzLmlucHV0KS5nZXRSb290Tm9kZSkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJGlucHV0JGdldFJvb3RObzIuY2FsbChfdGhpcyRpbnB1dCkpICE9IG51bGwgPyBfdGhpcyRpbnB1dCRnZXRSb290Tm8gOiBkb2N1bWVudDtcbiAgfVxuXG4gIC8qKiBJcyBlbGVtZW50IGluIGZvY3VzICovXG4gIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dCA9PT0gdGhpcy5yb290RWxlbWVudC5hY3RpdmVFbGVtZW50O1xuICB9XG5cbiAgLyoqIEJpbmRzIEhUTUxFbGVtZW50IGV2ZW50cyB0byBtYXNrIGludGVybmFsIGV2ZW50cyAqL1xuICBiaW5kRXZlbnRzKGhhbmRsZXJzKSB7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25LZXlkb3duKTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5fb25JbnB1dCk7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVpbnB1dCcsIHRoaXMuX29uQmVmb3JlaW5wdXQpO1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25lbmQnLCB0aGlzLl9vbkNvbXBvc2l0aW9uRW5kKTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBoYW5kbGVycy5kcm9wKTtcbiAgICB0aGlzLmlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcnMuY2xpY2spO1xuICAgIHRoaXMuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBoYW5kbGVycy5mb2N1cyk7XG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgaGFuZGxlcnMuY29tbWl0KTtcbiAgICB0aGlzLl9oYW5kbGVycyA9IGhhbmRsZXJzO1xuICB9XG4gIF9vbktleWRvd24oZSkge1xuICAgIGlmICh0aGlzLl9oYW5kbGVycy5yZWRvICYmIChlLmtleUNvZGUgPT09IEtFWV9aICYmIGUuc2hpZnRLZXkgJiYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpIHx8IGUua2V5Q29kZSA9PT0gS0VZX1kgJiYgZS5jdHJsS2V5KSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzLnJlZG8oZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9oYW5kbGVycy51bmRvICYmIGUua2V5Q29kZSA9PT0gS0VZX1ogJiYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gdGhpcy5faGFuZGxlcnMudW5kbyhlKTtcbiAgICB9XG4gICAgaWYgKCFlLmlzQ29tcG9zaW5nKSB0aGlzLl9oYW5kbGVycy5zZWxlY3Rpb25DaGFuZ2UoZSk7XG4gIH1cbiAgX29uQmVmb3JlaW5wdXQoZSkge1xuICAgIGlmIChlLmlucHV0VHlwZSA9PT0gJ2hpc3RvcnlVbmRvJyAmJiB0aGlzLl9oYW5kbGVycy51bmRvKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gdGhpcy5faGFuZGxlcnMudW5kbyhlKTtcbiAgICB9XG4gICAgaWYgKGUuaW5wdXRUeXBlID09PSAnaGlzdG9yeVJlZG8nICYmIHRoaXMuX2hhbmRsZXJzLnJlZG8pIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVycy5yZWRvKGUpO1xuICAgIH1cbiAgfVxuICBfb25Db21wb3NpdGlvbkVuZChlKSB7XG4gICAgdGhpcy5faGFuZGxlcnMuaW5wdXQoZSk7XG4gIH1cbiAgX29uSW5wdXQoZSkge1xuICAgIGlmICghZS5pc0NvbXBvc2luZykgdGhpcy5faGFuZGxlcnMuaW5wdXQoZSk7XG4gIH1cblxuICAvKiogVW5iaW5kcyBIVE1MRWxlbWVudCBldmVudHMgdG8gbWFzayBpbnRlcm5hbCBldmVudHMgKi9cbiAgdW5iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uS2V5ZG93bik7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuX29uSW5wdXQpO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JlaW5wdXQnLCB0aGlzLl9vbkJlZm9yZWlucHV0KTtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uZW5kJywgdGhpcy5fb25Db21wb3NpdGlvbkVuZCk7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5faGFuZGxlcnMuZHJvcCk7XG4gICAgdGhpcy5pbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZXJzLmNsaWNrKTtcbiAgICB0aGlzLmlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5faGFuZGxlcnMuZm9jdXMpO1xuICAgIHRoaXMuaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2hhbmRsZXJzLmNvbW1pdCk7XG4gICAgdGhpcy5faGFuZGxlcnMgPSB7fTtcbiAgfVxufVxuSU1hc2suSFRNTE1hc2tFbGVtZW50ID0gSFRNTE1hc2tFbGVtZW50O1xuXG5leHBvcnQgeyBIVE1MTWFza0VsZW1lbnQgYXMgZGVmYXVsdCB9O1xuIiwiY2xhc3MgSW5wdXRIaXN0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdGF0ZXMgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXNbdGhpcy5jdXJyZW50SW5kZXhdO1xuICB9XG4gIGdldCBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlcy5sZW5ndGggPT09IDA7XG4gIH1cbiAgcHVzaChzdGF0ZSkge1xuICAgIC8vIGlmIGN1cnJlbnQgaW5kZXggcG9pbnRzIGJlZm9yZSB0aGUgbGFzdCBlbGVtZW50IHRoZW4gcmVtb3ZlIHRoZSBmdXR1cmVcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLnN0YXRlcy5sZW5ndGggLSAxKSB0aGlzLnN0YXRlcy5sZW5ndGggPSB0aGlzLmN1cnJlbnRJbmRleCArIDE7XG4gICAgdGhpcy5zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgaWYgKHRoaXMuc3RhdGVzLmxlbmd0aCA+IElucHV0SGlzdG9yeS5NQVhfTEVOR1RIKSB0aGlzLnN0YXRlcy5zaGlmdCgpO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMTtcbiAgfVxuICBnbyhzdGVwcykge1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gTWF0aC5taW4oTWF0aC5tYXgodGhpcy5jdXJyZW50SW5kZXggKyBzdGVwcywgMCksIHRoaXMuc3RhdGVzLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGF0ZTtcbiAgfVxuICB1bmRvKCkge1xuICAgIHJldHVybiB0aGlzLmdvKC0xKTtcbiAgfVxuICByZWRvKCkge1xuICAgIHJldHVybiB0aGlzLmdvKCsxKTtcbiAgfVxuICBjbGVhcigpIHtcbiAgICB0aGlzLnN0YXRlcy5sZW5ndGggPSAwO1xuICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcbiAgfVxufVxuSW5wdXRIaXN0b3J5Lk1BWF9MRU5HVEggPSAxMDA7XG5cbmV4cG9ydCB7IElucHV0SGlzdG9yeSBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgeyBESVJFQ1RJT04gfSBmcm9tICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCBBY3Rpb25EZXRhaWxzIGZyb20gJy4uL2NvcmUvYWN0aW9uLWRldGFpbHMuanMnO1xuaW1wb3J0IGNyZWF0ZU1hc2ssIHsgbWFza2VkQ2xhc3MgfSBmcm9tICcuLi9tYXNrZWQvZmFjdG9yeS5qcyc7XG5pbXBvcnQgTWFza0VsZW1lbnQgZnJvbSAnLi9tYXNrLWVsZW1lbnQuanMnO1xuaW1wb3J0IEhUTUxJbnB1dE1hc2tFbGVtZW50IGZyb20gJy4vaHRtbC1pbnB1dC1tYXNrLWVsZW1lbnQuanMnO1xuaW1wb3J0IEhUTUxDb250ZW50ZWRpdGFibGVNYXNrRWxlbWVudCBmcm9tICcuL2h0bWwtY29udGVudGVkaXRhYmxlLW1hc2stZWxlbWVudC5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0IElucHV0SGlzdG9yeSBmcm9tICcuL2lucHV0LWhpc3RvcnkuanMnO1xuaW1wb3J0ICcuL2h0bWwtbWFzay1lbGVtZW50LmpzJztcblxuLyoqIExpc3RlbnMgdG8gZWxlbWVudCBldmVudHMgYW5kIGNvbnRyb2xzIGNoYW5nZXMgYmV0d2VlbiBlbGVtZW50IGFuZCB7QGxpbmsgTWFza2VkfSAqL1xuY2xhc3MgSW5wdXRNYXNrIHtcbiAgLyoqXG4gICAgVmlldyBlbGVtZW50XG4gICovXG5cbiAgLyoqIEludGVybmFsIHtAbGluayBNYXNrZWR9IG1vZGVsICovXG5cbiAgY29uc3RydWN0b3IoZWwsIG9wdHMpIHtcbiAgICB0aGlzLmVsID0gZWwgaW5zdGFuY2VvZiBNYXNrRWxlbWVudCA/IGVsIDogZWwuaXNDb250ZW50RWRpdGFibGUgJiYgZWwudGFnTmFtZSAhPT0gJ0lOUFVUJyAmJiBlbC50YWdOYW1lICE9PSAnVEVYVEFSRUEnID8gbmV3IEhUTUxDb250ZW50ZWRpdGFibGVNYXNrRWxlbWVudChlbCkgOiBuZXcgSFRNTElucHV0TWFza0VsZW1lbnQoZWwpO1xuICAgIHRoaXMubWFza2VkID0gY3JlYXRlTWFzayhvcHRzKTtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICB0aGlzLl92YWx1ZSA9ICcnO1xuICAgIHRoaXMuX3VubWFza2VkVmFsdWUgPSAnJztcbiAgICB0aGlzLl9yYXdJbnB1dFZhbHVlID0gJyc7XG4gICAgdGhpcy5oaXN0b3J5ID0gbmV3IElucHV0SGlzdG9yeSgpO1xuICAgIHRoaXMuX3NhdmVTZWxlY3Rpb24gPSB0aGlzLl9zYXZlU2VsZWN0aW9uLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25JbnB1dCA9IHRoaXMuX29uSW5wdXQuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IHRoaXMuX29uQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Ecm9wID0gdGhpcy5fb25Ecm9wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fb25Gb2N1cyA9IHRoaXMuX29uRm9jdXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9vbkNsaWNrID0gdGhpcy5fb25DbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uVW5kbyA9IHRoaXMuX29uVW5kby5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX29uUmVkbyA9IHRoaXMuX29uUmVkby5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWxpZ25DdXJzb3IgPSB0aGlzLmFsaWduQ3Vyc29yLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hbGlnbkN1cnNvckZyaWVuZGx5ID0gdGhpcy5hbGlnbkN1cnNvckZyaWVuZGx5LmJpbmQodGhpcyk7XG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgLy8gcmVmcmVzaFxuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgICB0aGlzLl9vbkNoYW5nZSgpO1xuICB9XG4gIG1hc2tFcXVhbHMobWFzaykge1xuICAgIHZhciBfdGhpcyRtYXNrZWQ7XG4gICAgcmV0dXJuIG1hc2sgPT0gbnVsbCB8fCAoKF90aGlzJG1hc2tlZCA9IHRoaXMubWFza2VkKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkbWFza2VkLm1hc2tFcXVhbHMobWFzaykpO1xuICB9XG5cbiAgLyoqIE1hc2tlZCAqL1xuICBnZXQgbWFzaygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQubWFzaztcbiAgfVxuICBzZXQgbWFzayhtYXNrKSB7XG4gICAgaWYgKHRoaXMubWFza0VxdWFscyhtYXNrKSkgcmV0dXJuO1xuICAgIGlmICghKG1hc2sgaW5zdGFuY2VvZiBJTWFzay5NYXNrZWQpICYmIHRoaXMubWFza2VkLmNvbnN0cnVjdG9yID09PSBtYXNrZWRDbGFzcyhtYXNrKSkge1xuICAgICAgLy8gVE9ETyBcImFueVwiIG5vIGlkZWFcbiAgICAgIHRoaXMubWFza2VkLnVwZGF0ZU9wdGlvbnMoe1xuICAgICAgICBtYXNrXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbWFza2VkID0gbWFzayBpbnN0YW5jZW9mIElNYXNrLk1hc2tlZCA/IG1hc2sgOiBjcmVhdGVNYXNrKHtcbiAgICAgIG1hc2tcbiAgICB9KTtcbiAgICBtYXNrZWQudW5tYXNrZWRWYWx1ZSA9IHRoaXMubWFza2VkLnVubWFza2VkVmFsdWU7XG4gICAgdGhpcy5tYXNrZWQgPSBtYXNrZWQ7XG4gIH1cblxuICAvKiogUmF3IHZhbHVlICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHN0cikge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSBzdHIpIHJldHVybjtcbiAgICB0aGlzLm1hc2tlZC52YWx1ZSA9IHN0cjtcbiAgICB0aGlzLnVwZGF0ZUNvbnRyb2woJ2F1dG8nKTtcbiAgfVxuXG4gIC8qKiBVbm1hc2tlZCB2YWx1ZSAqL1xuICBnZXQgdW5tYXNrZWRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdW5tYXNrZWRWYWx1ZTtcbiAgfVxuICBzZXQgdW5tYXNrZWRWYWx1ZShzdHIpIHtcbiAgICBpZiAodGhpcy51bm1hc2tlZFZhbHVlID09PSBzdHIpIHJldHVybjtcbiAgICB0aGlzLm1hc2tlZC51bm1hc2tlZFZhbHVlID0gc3RyO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbCgnYXV0bycpO1xuICB9XG5cbiAgLyoqIFJhdyBpbnB1dCB2YWx1ZSAqL1xuICBnZXQgcmF3SW5wdXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmF3SW5wdXRWYWx1ZTtcbiAgfVxuICBzZXQgcmF3SW5wdXRWYWx1ZShzdHIpIHtcbiAgICBpZiAodGhpcy5yYXdJbnB1dFZhbHVlID09PSBzdHIpIHJldHVybjtcbiAgICB0aGlzLm1hc2tlZC5yYXdJbnB1dFZhbHVlID0gc3RyO1xuICAgIHRoaXMudXBkYXRlQ29udHJvbCgpO1xuICAgIHRoaXMuYWxpZ25DdXJzb3IoKTtcbiAgfVxuXG4gIC8qKiBUeXBlZCB1bm1hc2tlZCB2YWx1ZSAqL1xuICBnZXQgdHlwZWRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQudHlwZWRWYWx1ZTtcbiAgfVxuICBzZXQgdHlwZWRWYWx1ZSh2YWwpIHtcbiAgICBpZiAodGhpcy5tYXNrZWQudHlwZWRWYWx1ZUVxdWFscyh2YWwpKSByZXR1cm47XG4gICAgdGhpcy5tYXNrZWQudHlwZWRWYWx1ZSA9IHZhbDtcbiAgICB0aGlzLnVwZGF0ZUNvbnRyb2woJ2F1dG8nKTtcbiAgfVxuXG4gIC8qKiBEaXNwbGF5IHZhbHVlICovXG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLmRpc3BsYXlWYWx1ZTtcbiAgfVxuXG4gIC8qKiBTdGFydHMgbGlzdGVuaW5nIHRvIGVsZW1lbnQgZXZlbnRzICovXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuZWwuYmluZEV2ZW50cyh7XG4gICAgICBzZWxlY3Rpb25DaGFuZ2U6IHRoaXMuX3NhdmVTZWxlY3Rpb24sXG4gICAgICBpbnB1dDogdGhpcy5fb25JbnB1dCxcbiAgICAgIGRyb3A6IHRoaXMuX29uRHJvcCxcbiAgICAgIGNsaWNrOiB0aGlzLl9vbkNsaWNrLFxuICAgICAgZm9jdXM6IHRoaXMuX29uRm9jdXMsXG4gICAgICBjb21taXQ6IHRoaXMuX29uQ2hhbmdlLFxuICAgICAgdW5kbzogdGhpcy5fb25VbmRvLFxuICAgICAgcmVkbzogdGhpcy5fb25SZWRvXG4gICAgfSk7XG4gIH1cblxuICAvKiogU3RvcHMgbGlzdGVuaW5nIHRvIGVsZW1lbnQgZXZlbnRzICovXG4gIF91bmJpbmRFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuZWwpIHRoaXMuZWwudW5iaW5kRXZlbnRzKCk7XG4gIH1cblxuICAvKiogRmlyZXMgY3VzdG9tIGV2ZW50ICovXG4gIF9maXJlRXZlbnQoZXYsIGUpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNbZXZdO1xuICAgIGlmICghbGlzdGVuZXJzKSByZXR1cm47XG4gICAgbGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKGUpKTtcbiAgfVxuXG4gIC8qKiBDdXJyZW50IHNlbGVjdGlvbiBzdGFydCAqL1xuICBnZXQgc2VsZWN0aW9uU3RhcnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnNvckNoYW5naW5nID8gdGhpcy5fY2hhbmdpbmdDdXJzb3JQb3MgOiB0aGlzLmVsLnNlbGVjdGlvblN0YXJ0O1xuICB9XG5cbiAgLyoqIEN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uICovXG4gIGdldCBjdXJzb3JQb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnNvckNoYW5naW5nID8gdGhpcy5fY2hhbmdpbmdDdXJzb3JQb3MgOiB0aGlzLmVsLnNlbGVjdGlvbkVuZDtcbiAgfVxuICBzZXQgY3Vyc29yUG9zKHBvcykge1xuICAgIGlmICghdGhpcy5lbCB8fCAhdGhpcy5lbC5pc0FjdGl2ZSkgcmV0dXJuO1xuICAgIHRoaXMuZWwuc2VsZWN0KHBvcywgcG9zKTtcbiAgICB0aGlzLl9zYXZlU2VsZWN0aW9uKCk7XG4gIH1cblxuICAvKiogU3RvcmVzIGN1cnJlbnQgc2VsZWN0aW9uICovXG4gIF9zYXZlU2VsZWN0aW9uKCAvKiBldiAqL1xuICApIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5VmFsdWUgIT09IHRoaXMuZWwudmFsdWUpIHtcbiAgICAgIGNvbnNvbGUud2FybignRWxlbWVudCB2YWx1ZSB3YXMgY2hhbmdlZCBvdXRzaWRlIG9mIG1hc2suIFN5bmNyb25pemUgbWFzayB1c2luZyBgbWFzay51cGRhdGVWYWx1ZSgpYCB0byB3b3JrIHByb3Blcmx5LicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0aW9uID0ge1xuICAgICAgc3RhcnQ6IHRoaXMuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQ6IHRoaXMuY3Vyc29yUG9zXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBTeW5jcm9uaXplcyBtb2RlbCB2YWx1ZSBmcm9tIHZpZXcgKi9cbiAgdXBkYXRlVmFsdWUoKSB7XG4gICAgdGhpcy5tYXNrZWQudmFsdWUgPSB0aGlzLmVsLnZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5tYXNrZWQudmFsdWU7XG4gIH1cblxuICAvKiogU3luY3Jvbml6ZXMgdmlldyBmcm9tIG1vZGVsIHZhbHVlLCBmaXJlcyBjaGFuZ2UgZXZlbnRzICovXG4gIHVwZGF0ZUNvbnRyb2woY3Vyc29yUG9zKSB7XG4gICAgY29uc3QgbmV3VW5tYXNrZWRWYWx1ZSA9IHRoaXMubWFza2VkLnVubWFza2VkVmFsdWU7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLm1hc2tlZC52YWx1ZTtcbiAgICBjb25zdCBuZXdSYXdJbnB1dFZhbHVlID0gdGhpcy5tYXNrZWQucmF3SW5wdXRWYWx1ZTtcbiAgICBjb25zdCBuZXdEaXNwbGF5VmFsdWUgPSB0aGlzLmRpc3BsYXlWYWx1ZTtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSB0aGlzLnVubWFza2VkVmFsdWUgIT09IG5ld1VubWFza2VkVmFsdWUgfHwgdGhpcy52YWx1ZSAhPT0gbmV3VmFsdWUgfHwgdGhpcy5fcmF3SW5wdXRWYWx1ZSAhPT0gbmV3UmF3SW5wdXRWYWx1ZTtcbiAgICB0aGlzLl91bm1hc2tlZFZhbHVlID0gbmV3VW5tYXNrZWRWYWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuX3Jhd0lucHV0VmFsdWUgPSBuZXdSYXdJbnB1dFZhbHVlO1xuICAgIGlmICh0aGlzLmVsLnZhbHVlICE9PSBuZXdEaXNwbGF5VmFsdWUpIHRoaXMuZWwudmFsdWUgPSBuZXdEaXNwbGF5VmFsdWU7XG4gICAgaWYgKGN1cnNvclBvcyA9PT0gJ2F1dG8nKSB0aGlzLmFsaWduQ3Vyc29yKCk7ZWxzZSBpZiAoY3Vyc29yUG9zICE9IG51bGwpIHRoaXMuY3Vyc29yUG9zID0gY3Vyc29yUG9zO1xuICAgIGlmIChpc0NoYW5nZWQpIHRoaXMuX2ZpcmVDaGFuZ2VFdmVudHMoKTtcbiAgICBpZiAoIXRoaXMuX2hpc3RvcnlDaGFuZ2luZyAmJiAoaXNDaGFuZ2VkIHx8IHRoaXMuaGlzdG9yeS5pc0VtcHR5KSkgdGhpcy5oaXN0b3J5LnB1c2goe1xuICAgICAgdW5tYXNrZWRWYWx1ZTogbmV3VW5tYXNrZWRWYWx1ZSxcbiAgICAgIHNlbGVjdGlvbjoge1xuICAgICAgICBzdGFydDogdGhpcy5zZWxlY3Rpb25TdGFydCxcbiAgICAgICAgZW5kOiB0aGlzLmN1cnNvclBvc1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFVwZGF0ZXMgb3B0aW9ucyB3aXRoIGRlZXAgZXF1YWwgY2hlY2ssIHJlY3JlYXRlcyB7QGxpbmsgTWFza2VkfSBtb2RlbCBpZiBtYXNrIHR5cGUgY2hhbmdlcyAqL1xuICB1cGRhdGVPcHRpb25zKG9wdHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBtYXNrLFxuICAgICAgLi4ucmVzdE9wdHNcbiAgICB9ID0gb3B0czsgLy8gVE9ETyB0eXBlcywgeWVzLCBtYXNrIGlzIG9wdGlvbmFsXG5cbiAgICBjb25zdCB1cGRhdGVNYXNrID0gIXRoaXMubWFza0VxdWFscyhtYXNrKTtcbiAgICBjb25zdCB1cGRhdGVPcHRzID0gdGhpcy5tYXNrZWQub3B0aW9uc0lzQ2hhbmdlZChyZXN0T3B0cyk7XG4gICAgaWYgKHVwZGF0ZU1hc2spIHRoaXMubWFzayA9IG1hc2s7XG4gICAgaWYgKHVwZGF0ZU9wdHMpIHRoaXMubWFza2VkLnVwZGF0ZU9wdGlvbnMocmVzdE9wdHMpOyAvLyBUT0RPXG5cbiAgICBpZiAodXBkYXRlTWFzayB8fCB1cGRhdGVPcHRzKSB0aGlzLnVwZGF0ZUNvbnRyb2woKTtcbiAgfVxuXG4gIC8qKiBVcGRhdGVzIGN1cnNvciAqL1xuICB1cGRhdGVDdXJzb3IoY3Vyc29yUG9zKSB7XG4gICAgaWYgKGN1cnNvclBvcyA9PSBudWxsKSByZXR1cm47XG4gICAgdGhpcy5jdXJzb3JQb3MgPSBjdXJzb3JQb3M7XG5cbiAgICAvLyBhbHNvIHF1ZXVlIGNoYW5nZSBjdXJzb3IgZm9yIG1vYmlsZSBicm93c2Vyc1xuICAgIHRoaXMuX2RlbGF5VXBkYXRlQ3Vyc29yKGN1cnNvclBvcyk7XG4gIH1cblxuICAvKiogRGVsYXlzIGN1cnNvciB1cGRhdGUgdG8gc3VwcG9ydCBtb2JpbGUgYnJvd3NlcnMgKi9cbiAgX2RlbGF5VXBkYXRlQ3Vyc29yKGN1cnNvclBvcykge1xuICAgIHRoaXMuX2Fib3J0VXBkYXRlQ3Vyc29yKCk7XG4gICAgdGhpcy5fY2hhbmdpbmdDdXJzb3JQb3MgPSBjdXJzb3JQb3M7XG4gICAgdGhpcy5fY3Vyc29yQ2hhbmdpbmcgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5lbCkgcmV0dXJuOyAvLyBpZiB3YXMgZGVzdHJveWVkXG4gICAgICB0aGlzLmN1cnNvclBvcyA9IHRoaXMuX2NoYW5naW5nQ3Vyc29yUG9zO1xuICAgICAgdGhpcy5fYWJvcnRVcGRhdGVDdXJzb3IoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKiogRmlyZXMgY3VzdG9tIGV2ZW50cyAqL1xuICBfZmlyZUNoYW5nZUV2ZW50cygpIHtcbiAgICB0aGlzLl9maXJlRXZlbnQoJ2FjY2VwdCcsIHRoaXMuX2lucHV0RXZlbnQpO1xuICAgIGlmICh0aGlzLm1hc2tlZC5pc0NvbXBsZXRlKSB0aGlzLl9maXJlRXZlbnQoJ2NvbXBsZXRlJywgdGhpcy5faW5wdXRFdmVudCk7XG4gIH1cblxuICAvKiogQWJvcnRzIGRlbGF5ZWQgY3Vyc29yIHVwZGF0ZSAqL1xuICBfYWJvcnRVcGRhdGVDdXJzb3IoKSB7XG4gICAgaWYgKHRoaXMuX2N1cnNvckNoYW5naW5nKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fY3Vyc29yQ2hhbmdpbmcpO1xuICAgICAgZGVsZXRlIHRoaXMuX2N1cnNvckNoYW5naW5nO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBBbGlnbnMgY3Vyc29yIHRvIG5lYXJlc3QgYXZhaWxhYmxlIHBvc2l0aW9uICovXG4gIGFsaWduQ3Vyc29yKCkge1xuICAgIHRoaXMuY3Vyc29yUG9zID0gdGhpcy5tYXNrZWQubmVhcmVzdElucHV0UG9zKHRoaXMubWFza2VkLm5lYXJlc3RJbnB1dFBvcyh0aGlzLmN1cnNvclBvcywgRElSRUNUSU9OLkxFRlQpKTtcbiAgfVxuXG4gIC8qKiBBbGlnbnMgY3Vyc29yIG9ubHkgaWYgc2VsZWN0aW9uIGlzIGVtcHR5ICovXG4gIGFsaWduQ3Vyc29yRnJpZW5kbHkoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0aW9uU3RhcnQgIT09IHRoaXMuY3Vyc29yUG9zKSByZXR1cm47IC8vIHNraXAgaWYgcmFuZ2UgaXMgc2VsZWN0ZWRcbiAgICB0aGlzLmFsaWduQ3Vyc29yKCk7XG4gIH1cblxuICAvKiogQWRkcyBsaXN0ZW5lciBvbiBjdXN0b20gZXZlbnQgKi9cbiAgb24oZXYsIGhhbmRsZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVyc1tldl0pIHRoaXMuX2xpc3RlbmVyc1tldl0gPSBbXTtcbiAgICB0aGlzLl9saXN0ZW5lcnNbZXZdLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogUmVtb3ZlcyBjdXN0b20gZXZlbnQgbGlzdGVuZXIgKi9cbiAgb2ZmKGV2LCBoYW5kbGVyKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0ZW5lcnNbZXZdKSByZXR1cm4gdGhpcztcbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNbZXZdO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNvbnN0IGhJbmRleCA9IHRoaXMuX2xpc3RlbmVyc1tldl0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaEluZGV4ID49IDApIHRoaXMuX2xpc3RlbmVyc1tldl0uc3BsaWNlKGhJbmRleCwgMSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogSGFuZGxlcyB2aWV3IGlucHV0IGV2ZW50ICovXG4gIF9vbklucHV0KGUpIHtcbiAgICB0aGlzLl9pbnB1dEV2ZW50ID0gZTtcbiAgICB0aGlzLl9hYm9ydFVwZGF0ZUN1cnNvcigpO1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQWN0aW9uRGV0YWlscyh7XG4gICAgICAvLyBuZXcgc3RhdGVcbiAgICAgIHZhbHVlOiB0aGlzLmVsLnZhbHVlLFxuICAgICAgY3Vyc29yUG9zOiB0aGlzLmN1cnNvclBvcyxcbiAgICAgIC8vIG9sZCBzdGF0ZVxuICAgICAgb2xkVmFsdWU6IHRoaXMuZGlzcGxheVZhbHVlLFxuICAgICAgb2xkU2VsZWN0aW9uOiB0aGlzLl9zZWxlY3Rpb25cbiAgICB9KTtcbiAgICBjb25zdCBvbGRSYXdWYWx1ZSA9IHRoaXMubWFza2VkLnJhd0lucHV0VmFsdWU7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5tYXNrZWQuc3BsaWNlKGRldGFpbHMuc3RhcnRDaGFuZ2VQb3MsIGRldGFpbHMucmVtb3ZlZC5sZW5ndGgsIGRldGFpbHMuaW5zZXJ0ZWQsIGRldGFpbHMucmVtb3ZlRGlyZWN0aW9uLCB7XG4gICAgICBpbnB1dDogdHJ1ZSxcbiAgICAgIHJhdzogdHJ1ZVxuICAgIH0pLm9mZnNldDtcblxuICAgIC8vIGZvcmNlIGFsaWduIGluIHJlbW92ZSBkaXJlY3Rpb24gb25seSBpZiBubyBpbnB1dCBjaGFycyB3ZXJlIHJlbW92ZWRcbiAgICAvLyBvdGhlcndpc2Ugd2Ugc3RpbGwgbmVlZCB0byBhbGlnbiB3aXRoIE5PTkUgKHRvIGdldCBvdXQgZnJvbSBmaXhlZCBzeW1ib2xzIGZvciBpbnN0YW5jZSlcbiAgICBjb25zdCByZW1vdmVEaXJlY3Rpb24gPSBvbGRSYXdWYWx1ZSA9PT0gdGhpcy5tYXNrZWQucmF3SW5wdXRWYWx1ZSA/IGRldGFpbHMucmVtb3ZlRGlyZWN0aW9uIDogRElSRUNUSU9OLk5PTkU7XG4gICAgbGV0IGN1cnNvclBvcyA9IHRoaXMubWFza2VkLm5lYXJlc3RJbnB1dFBvcyhkZXRhaWxzLnN0YXJ0Q2hhbmdlUG9zICsgb2Zmc2V0LCByZW1vdmVEaXJlY3Rpb24pO1xuICAgIGlmIChyZW1vdmVEaXJlY3Rpb24gIT09IERJUkVDVElPTi5OT05FKSBjdXJzb3JQb3MgPSB0aGlzLm1hc2tlZC5uZWFyZXN0SW5wdXRQb3MoY3Vyc29yUG9zLCBESVJFQ1RJT04uTk9ORSk7XG4gICAgdGhpcy51cGRhdGVDb250cm9sKGN1cnNvclBvcyk7XG4gICAgZGVsZXRlIHRoaXMuX2lucHV0RXZlbnQ7XG4gIH1cblxuICAvKiogSGFuZGxlcyB2aWV3IGNoYW5nZSBldmVudCBhbmQgY29tbWl0cyBtb2RlbCB2YWx1ZSAqL1xuICBfb25DaGFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuZGlzcGxheVZhbHVlICE9PSB0aGlzLmVsLnZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gICAgfVxuICAgIHRoaXMubWFza2VkLmRvQ29tbWl0KCk7XG4gICAgdGhpcy51cGRhdGVDb250cm9sKCk7XG4gICAgdGhpcy5fc2F2ZVNlbGVjdGlvbigpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgdmlldyBkcm9wIGV2ZW50LCBwcmV2ZW50cyBieSBkZWZhdWx0ICovXG4gIF9vbkRyb3AoZXYpIHtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgLyoqIFJlc3RvcmUgbGFzdCBzZWxlY3Rpb24gb24gZm9jdXMgKi9cbiAgX29uRm9jdXMoZXYpIHtcbiAgICB0aGlzLmFsaWduQ3Vyc29yRnJpZW5kbHkoKTtcbiAgfVxuXG4gIC8qKiBSZXN0b3JlIGxhc3Qgc2VsZWN0aW9uIG9uIGZvY3VzICovXG4gIF9vbkNsaWNrKGV2KSB7XG4gICAgdGhpcy5hbGlnbkN1cnNvckZyaWVuZGx5KCk7XG4gIH1cbiAgX29uVW5kbygpIHtcbiAgICB0aGlzLl9hcHBseUhpc3RvcnlTdGF0ZSh0aGlzLmhpc3RvcnkudW5kbygpKTtcbiAgfVxuICBfb25SZWRvKCkge1xuICAgIHRoaXMuX2FwcGx5SGlzdG9yeVN0YXRlKHRoaXMuaGlzdG9yeS5yZWRvKCkpO1xuICB9XG4gIF9hcHBseUhpc3RvcnlTdGF0ZShzdGF0ZSkge1xuICAgIGlmICghc3RhdGUpIHJldHVybjtcbiAgICB0aGlzLl9oaXN0b3J5Q2hhbmdpbmcgPSB0cnVlO1xuICAgIHRoaXMudW5tYXNrZWRWYWx1ZSA9IHN0YXRlLnVubWFza2VkVmFsdWU7XG4gICAgdGhpcy5lbC5zZWxlY3Qoc3RhdGUuc2VsZWN0aW9uLnN0YXJ0LCBzdGF0ZS5zZWxlY3Rpb24uZW5kKTtcbiAgICB0aGlzLl9zYXZlU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5faGlzdG9yeUNoYW5naW5nID0gZmFsc2U7XG4gIH1cblxuICAvKiogVW5iaW5kIHZpZXcgZXZlbnRzIGFuZCByZW1vdmVzIGVsZW1lbnQgcmVmZXJlbmNlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5fdW5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5fbGlzdGVuZXJzLmxlbmd0aCA9IDA7XG4gICAgZGVsZXRlIHRoaXMuZWw7XG4gIH1cbn1cbklNYXNrLklucHV0TWFzayA9IElucHV0TWFzaztcblxuZXhwb3J0IHsgSW5wdXRNYXNrIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5cbi8qKiAgR2VuZXJpYyBlbGVtZW50IEFQSSB0byB1c2Ugd2l0aCBtYXNrICovXG5jbGFzcyBNYXNrRWxlbWVudCB7XG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiAqL1xuXG4gIC8qKiBTYWZlbHkgcmV0dXJucyBzZWxlY3Rpb24gc3RhcnQgKi9cbiAgZ2V0IHNlbGVjdGlvblN0YXJ0KCkge1xuICAgIGxldCBzdGFydDtcbiAgICB0cnkge1xuICAgICAgc3RhcnQgPSB0aGlzLl91bnNhZmVTZWxlY3Rpb25TdGFydDtcbiAgICB9IGNhdGNoIHt9XG4gICAgcmV0dXJuIHN0YXJ0ICE9IG51bGwgPyBzdGFydCA6IHRoaXMudmFsdWUubGVuZ3RoO1xuICB9XG5cbiAgLyoqIFNhZmVseSByZXR1cm5zIHNlbGVjdGlvbiBlbmQgKi9cbiAgZ2V0IHNlbGVjdGlvbkVuZCgpIHtcbiAgICBsZXQgZW5kO1xuICAgIHRyeSB7XG4gICAgICBlbmQgPSB0aGlzLl91bnNhZmVTZWxlY3Rpb25FbmQ7XG4gICAgfSBjYXRjaCB7fVxuICAgIHJldHVybiBlbmQgIT0gbnVsbCA/IGVuZCA6IHRoaXMudmFsdWUubGVuZ3RoO1xuICB9XG5cbiAgLyoqIFNhZmVseSBzZXRzIGVsZW1lbnQgc2VsZWN0aW9uICovXG4gIHNlbGVjdChzdGFydCwgZW5kKSB7XG4gICAgaWYgKHN0YXJ0ID09IG51bGwgfHwgZW5kID09IG51bGwgfHwgc3RhcnQgPT09IHRoaXMuc2VsZWN0aW9uU3RhcnQgJiYgZW5kID09PSB0aGlzLnNlbGVjdGlvbkVuZCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl91bnNhZmVTZWxlY3Qoc3RhcnQsIGVuZCk7XG4gICAgfSBjYXRjaCB7fVxuICB9XG5cbiAgLyoqICovXG4gIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG59XG5JTWFzay5NYXNrRWxlbWVudCA9IE1hc2tFbGVtZW50O1xuXG5leHBvcnQgeyBNYXNrRWxlbWVudCBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgeyBESVJFQ1RJT04gfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLyoqIFByb3ZpZGVzIGRldGFpbHMgb2YgY2hhbmdpbmcgaW5wdXQgKi9cbmNsYXNzIEFjdGlvbkRldGFpbHMge1xuICAvKiogQ3VycmVudCBpbnB1dCB2YWx1ZSAqL1xuXG4gIC8qKiBDdXJyZW50IGN1cnNvciBwb3NpdGlvbiAqL1xuXG4gIC8qKiBPbGQgaW5wdXQgdmFsdWUgKi9cblxuICAvKiogT2xkIHNlbGVjdGlvbiAqL1xuXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdHMpO1xuXG4gICAgLy8gZG91YmxlIGNoZWNrIGlmIGxlZnQgcGFydCB3YXMgY2hhbmdlZCAoYXV0b2ZpbGxpbmcsIG90aGVyIG5vbi1zdGFuZGFyZCBpbnB1dCB0cmlnZ2VycylcbiAgICB3aGlsZSAodGhpcy52YWx1ZS5zbGljZSgwLCB0aGlzLnN0YXJ0Q2hhbmdlUG9zKSAhPT0gdGhpcy5vbGRWYWx1ZS5zbGljZSgwLCB0aGlzLnN0YXJ0Q2hhbmdlUG9zKSkge1xuICAgICAgLS10aGlzLm9sZFNlbGVjdGlvbi5zdGFydDtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5zZXJ0ZWRDb3VudCkge1xuICAgICAgLy8gZG91YmxlIGNoZWNrIHJpZ2h0IHBhcnRcbiAgICAgIHdoaWxlICh0aGlzLnZhbHVlLnNsaWNlKHRoaXMuY3Vyc29yUG9zKSAhPT0gdGhpcy5vbGRWYWx1ZS5zbGljZSh0aGlzLm9sZFNlbGVjdGlvbi5lbmQpKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCAtIHRoaXMuY3Vyc29yUG9zIDwgdGhpcy5vbGRWYWx1ZS5sZW5ndGggLSB0aGlzLm9sZFNlbGVjdGlvbi5lbmQpICsrdGhpcy5vbGRTZWxlY3Rpb24uZW5kO2Vsc2UgKyt0aGlzLmN1cnNvclBvcztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogU3RhcnQgY2hhbmdpbmcgcG9zaXRpb24gKi9cbiAgZ2V0IHN0YXJ0Q2hhbmdlUG9zKCkge1xuICAgIHJldHVybiBNYXRoLm1pbih0aGlzLmN1cnNvclBvcywgdGhpcy5vbGRTZWxlY3Rpb24uc3RhcnQpO1xuICB9XG5cbiAgLyoqIEluc2VydGVkIHN5bWJvbHMgY291bnQgKi9cbiAgZ2V0IGluc2VydGVkQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3Vyc29yUG9zIC0gdGhpcy5zdGFydENoYW5nZVBvcztcbiAgfVxuXG4gIC8qKiBJbnNlcnRlZCBzeW1ib2xzICovXG4gIGdldCBpbnNlcnRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5zdWJzdHIodGhpcy5zdGFydENoYW5nZVBvcywgdGhpcy5pbnNlcnRlZENvdW50KTtcbiAgfVxuXG4gIC8qKiBSZW1vdmVkIHN5bWJvbHMgY291bnQgKi9cbiAgZ2V0IHJlbW92ZWRDb3VudCgpIHtcbiAgICAvLyBNYXRoLm1heCBmb3Igb3Bwb3NpdGUgb3BlcmF0aW9uXG4gICAgcmV0dXJuIE1hdGgubWF4KHRoaXMub2xkU2VsZWN0aW9uLmVuZCAtIHRoaXMuc3RhcnRDaGFuZ2VQb3MgfHxcbiAgICAvLyBmb3IgRGVsZXRlXG4gICAgdGhpcy5vbGRWYWx1ZS5sZW5ndGggLSB0aGlzLnZhbHVlLmxlbmd0aCwgMCk7XG4gIH1cblxuICAvKiogUmVtb3ZlZCBzeW1ib2xzICovXG4gIGdldCByZW1vdmVkKCkge1xuICAgIHJldHVybiB0aGlzLm9sZFZhbHVlLnN1YnN0cih0aGlzLnN0YXJ0Q2hhbmdlUG9zLCB0aGlzLnJlbW92ZWRDb3VudCk7XG4gIH1cblxuICAvKiogVW5jaGFuZ2VkIGhlYWQgc3ltYm9scyAqL1xuICBnZXQgaGVhZCgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5zdWJzdHJpbmcoMCwgdGhpcy5zdGFydENoYW5nZVBvcyk7XG4gIH1cblxuICAvKiogVW5jaGFuZ2VkIHRhaWwgc3ltYm9scyAqL1xuICBnZXQgdGFpbCgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5zdWJzdHJpbmcodGhpcy5zdGFydENoYW5nZVBvcyArIHRoaXMuaW5zZXJ0ZWRDb3VudCk7XG4gIH1cblxuICAvKiogUmVtb3ZlIGRpcmVjdGlvbiAqL1xuICBnZXQgcmVtb3ZlRGlyZWN0aW9uKCkge1xuICAgIGlmICghdGhpcy5yZW1vdmVkQ291bnQgfHwgdGhpcy5pbnNlcnRlZENvdW50KSByZXR1cm4gRElSRUNUSU9OLk5PTkU7XG5cbiAgICAvLyBhbGlnbiByaWdodCBpZiBkZWxldGUgYXQgcmlnaHRcbiAgICByZXR1cm4gKHRoaXMub2xkU2VsZWN0aW9uLmVuZCA9PT0gdGhpcy5jdXJzb3JQb3MgfHwgdGhpcy5vbGRTZWxlY3Rpb24uc3RhcnQgPT09IHRoaXMuY3Vyc29yUG9zKSAmJlxuICAgIC8vIGlmIG5vdCByYW5nZSByZW1vdmVkIChldmVudCB3aXRoIGJhY2tzcGFjZSlcbiAgICB0aGlzLm9sZFNlbGVjdGlvbi5lbmQgPT09IHRoaXMub2xkU2VsZWN0aW9uLnN0YXJ0ID8gRElSRUNUSU9OLlJJR0hUIDogRElSRUNUSU9OLkxFRlQ7XG4gIH1cbn1cblxuZXhwb3J0IHsgQWN0aW9uRGV0YWlscyBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgSU1hc2sgZnJvbSAnLi9ob2xkZXIuanMnO1xuXG4vKiogUHJvdmlkZXMgZGV0YWlscyBvZiBjaGFuZ2luZyBtb2RlbCB2YWx1ZSAqL1xuY2xhc3MgQ2hhbmdlRGV0YWlscyB7XG4gIC8qKiBJbnNlcnRlZCBzeW1ib2xzICovXG5cbiAgLyoqIEFkZGl0aW9uYWwgb2Zmc2V0IGlmIGFueSBjaGFuZ2VzIG9jY3VycmVkIGJlZm9yZSB0YWlsICovXG5cbiAgLyoqIFJhdyBpbnNlcnRlZCBpcyB1c2VkIGJ5IGR5bmFtaWMgbWFzayAqL1xuXG4gIC8qKiBDYW4gc2tpcCBjaGFycyAqL1xuXG4gIHN0YXRpYyBub3JtYWxpemUocHJlcCkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHByZXApID8gcHJlcCA6IFtwcmVwLCBuZXcgQ2hhbmdlRGV0YWlscygpXTtcbiAgfVxuICBjb25zdHJ1Y3RvcihkZXRhaWxzKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICBpbnNlcnRlZDogJycsXG4gICAgICByYXdJbnNlcnRlZDogJycsXG4gICAgICB0YWlsU2hpZnQ6IDAsXG4gICAgICBza2lwOiBmYWxzZVxuICAgIH0sIGRldGFpbHMpO1xuICB9XG5cbiAgLyoqIEFnZ3JlZ2F0ZSBjaGFuZ2VzICovXG4gIGFnZ3JlZ2F0ZShkZXRhaWxzKSB7XG4gICAgdGhpcy5pbnNlcnRlZCArPSBkZXRhaWxzLmluc2VydGVkO1xuICAgIHRoaXMucmF3SW5zZXJ0ZWQgKz0gZGV0YWlscy5yYXdJbnNlcnRlZDtcbiAgICB0aGlzLnRhaWxTaGlmdCArPSBkZXRhaWxzLnRhaWxTaGlmdDtcbiAgICB0aGlzLnNraXAgPSB0aGlzLnNraXAgfHwgZGV0YWlscy5za2lwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIFRvdGFsIG9mZnNldCBjb25zaWRlcmluZyBhbGwgY2hhbmdlcyAqL1xuICBnZXQgb2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLnRhaWxTaGlmdCArIHRoaXMuaW5zZXJ0ZWQubGVuZ3RoO1xuICB9XG4gIGdldCBjb25zdW1lZCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnJhd0luc2VydGVkKSB8fCB0aGlzLnNraXA7XG4gIH1cbiAgZXF1YWxzKGRldGFpbHMpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRlZCA9PT0gZGV0YWlscy5pbnNlcnRlZCAmJiB0aGlzLnRhaWxTaGlmdCA9PT0gZGV0YWlscy50YWlsU2hpZnQgJiYgdGhpcy5yYXdJbnNlcnRlZCA9PT0gZGV0YWlscy5yYXdJbnNlcnRlZCAmJiB0aGlzLnNraXAgPT09IGRldGFpbHMuc2tpcDtcbiAgfVxufVxuSU1hc2suQ2hhbmdlRGV0YWlscyA9IENoYW5nZURldGFpbHM7XG5cbmV4cG9ydCB7IENoYW5nZURldGFpbHMgYXMgZGVmYXVsdCB9O1xuIiwiLyoqIFByb3ZpZGVzIGRldGFpbHMgb2YgY29udGludW91cyBleHRyYWN0ZWQgdGFpbCAqL1xuY2xhc3MgQ29udGludW91c1RhaWxEZXRhaWxzIHtcbiAgLyoqIFRhaWwgdmFsdWUgYXMgc3RyaW5nICovXG5cbiAgLyoqIFRhaWwgc3RhcnQgcG9zaXRpb24gKi9cblxuICAvKiogU3RhcnQgcG9zaXRpb24gKi9cblxuICBjb25zdHJ1Y3Rvcih2YWx1ZSwgZnJvbSwgc3RvcCkge1xuICAgIGlmICh2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICB2YWx1ZSA9ICcnO1xuICAgIH1cbiAgICBpZiAoZnJvbSA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tID0gMDtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5zdG9wID0gc3RvcDtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuICBleHRlbmQodGFpbCkge1xuICAgIHRoaXMudmFsdWUgKz0gU3RyaW5nKHRhaWwpO1xuICB9XG4gIGFwcGVuZFRvKG1hc2tlZCkge1xuICAgIHJldHVybiBtYXNrZWQuYXBwZW5kKHRoaXMudG9TdHJpbmcoKSwge1xuICAgICAgdGFpbDogdHJ1ZVxuICAgIH0pLmFnZ3JlZ2F0ZShtYXNrZWQuX2FwcGVuZFBsYWNlaG9sZGVyKCkpO1xuICB9XG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICBmcm9tOiB0aGlzLmZyb20sXG4gICAgICBzdG9wOiB0aGlzLnN0b3BcbiAgICB9O1xuICB9XG4gIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgc3RhdGUpO1xuICB9XG4gIHVuc2hpZnQoYmVmb3JlUG9zKSB7XG4gICAgaWYgKCF0aGlzLnZhbHVlLmxlbmd0aCB8fCBiZWZvcmVQb3MgIT0gbnVsbCAmJiB0aGlzLmZyb20gPj0gYmVmb3JlUG9zKSByZXR1cm4gJyc7XG4gICAgY29uc3Qgc2hpZnRDaGFyID0gdGhpcy52YWx1ZVswXTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5zbGljZSgxKTtcbiAgICByZXR1cm4gc2hpZnRDaGFyO1xuICB9XG4gIHNoaWZ0KCkge1xuICAgIGlmICghdGhpcy52YWx1ZS5sZW5ndGgpIHJldHVybiAnJztcbiAgICBjb25zdCBzaGlmdENoYXIgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuc2xpY2UoMCwgLTEpO1xuICAgIHJldHVybiBzaGlmdENoYXI7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ29udGludW91c1RhaWxEZXRhaWxzIGFzIGRlZmF1bHQgfTtcbiIsIi8qKiBBcHBsaWVzIG1hc2sgb24gZWxlbWVudCAqL1xuZnVuY3Rpb24gSU1hc2soZWwsIG9wdHMpIHtcbiAgLy8gY3VycmVudGx5IGF2YWlsYWJsZSBvbmx5IGZvciBpbnB1dC1saWtlIGVsZW1lbnRzXG4gIHJldHVybiBuZXcgSU1hc2suSW5wdXRNYXNrKGVsLCBvcHRzKTtcbn1cblxuZXhwb3J0IHsgSU1hc2sgYXMgZGVmYXVsdCB9O1xuIiwiLyoqIENoZWNrcyBpZiB2YWx1ZSBpcyBzdHJpbmcgKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHN0cikge1xuICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgfHwgc3RyIGluc3RhbmNlb2YgU3RyaW5nO1xufVxuXG4vKiogQ2hlY2tzIGlmIHZhbHVlIGlzIG9iamVjdCAqL1xuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHZhciBfb2JqJGNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9IG51bGwgJiYgKG9iaiA9PSBudWxsIHx8IChfb2JqJGNvbnN0cnVjdG9yID0gb2JqLmNvbnN0cnVjdG9yKSA9PSBudWxsID8gdm9pZCAwIDogX29iaiRjb25zdHJ1Y3Rvci5uYW1lKSA9PT0gJ09iamVjdCc7XG59XG5mdW5jdGlvbiBwaWNrKG9iaiwga2V5cykge1xuICBpZiAoQXJyYXkuaXNBcnJheShrZXlzKSkgcmV0dXJuIHBpY2sob2JqLCAoXywgaykgPT4ga2V5cy5pbmNsdWRlcyhrKSk7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhvYmopLnJlZHVjZSgoYWNjLCBfcmVmKSA9PiB7XG4gICAgbGV0IFtrLCB2XSA9IF9yZWY7XG4gICAgaWYgKGtleXModiwgaykpIGFjY1trXSA9IHY7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufVxuXG4vKiogRGlyZWN0aW9uICovXG5jb25zdCBESVJFQ1RJT04gPSB7XG4gIE5PTkU6ICdOT05FJyxcbiAgTEVGVDogJ0xFRlQnLFxuICBGT1JDRV9MRUZUOiAnRk9SQ0VfTEVGVCcsXG4gIFJJR0hUOiAnUklHSFQnLFxuICBGT1JDRV9SSUdIVDogJ0ZPUkNFX1JJR0hUJ1xufTtcblxuLyoqIERpcmVjdGlvbiAqL1xuXG5mdW5jdGlvbiBmb3JjZURpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICBjYXNlIERJUkVDVElPTi5MRUZUOlxuICAgICAgcmV0dXJuIERJUkVDVElPTi5GT1JDRV9MRUZUO1xuICAgIGNhc2UgRElSRUNUSU9OLlJJR0hUOlxuICAgICAgcmV0dXJuIERJUkVDVElPTi5GT1JDRV9SSUdIVDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgfVxufVxuXG4vKiogRXNjYXBlcyByZWd1bGFyIGV4cHJlc3Npb24gY29udHJvbCBjaGFycyAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLiorP149IToke30oKXxbXFxdL1xcXFxdKS9nLCAnXFxcXCQxJyk7XG59XG5cbi8vIGNsb25lZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcG9iZXJlemtpbi9mYXN0LWRlZXAtZXF1YWwgd2l0aCBzbWFsbCBjaGFuZ2VzXG5mdW5jdGlvbiBvYmplY3RJbmNsdWRlcyhiLCBhKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcbiAgY29uc3QgYXJyQSA9IEFycmF5LmlzQXJyYXkoYSksXG4gICAgYXJyQiA9IEFycmF5LmlzQXJyYXkoYik7XG4gIGxldCBpO1xuICBpZiAoYXJyQSAmJiBhcnJCKSB7XG4gICAgaWYgKGEubGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIGlmICghb2JqZWN0SW5jbHVkZXMoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoYXJyQSAhPSBhcnJCKSByZXR1cm4gZmFsc2U7XG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnN0IGRhdGVBID0gYSBpbnN0YW5jZW9mIERhdGUsXG4gICAgICBkYXRlQiA9IGIgaW5zdGFuY2VvZiBEYXRlO1xuICAgIGlmIChkYXRlQSAmJiBkYXRlQikgcmV0dXJuIGEuZ2V0VGltZSgpID09IGIuZ2V0VGltZSgpO1xuICAgIGlmIChkYXRlQSAhPSBkYXRlQikgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHJlZ2V4cEEgPSBhIGluc3RhbmNlb2YgUmVnRXhwLFxuICAgICAgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICAvLyBpZiAoa2V5cy5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIGlmICghb2JqZWN0SW5jbHVkZXMoYltrZXlzW2ldXSwgYVtrZXlzW2ldXSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYS50b1N0cmluZygpID09PSBiLnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKiogU2VsZWN0aW9uIHJhbmdlICovXG5cbmV4cG9ydCB7IERJUkVDVElPTiwgZXNjYXBlUmVnRXhwLCBmb3JjZURpcmVjdGlvbiwgaXNPYmplY3QsIGlzU3RyaW5nLCBvYmplY3RJbmNsdWRlcywgcGljayB9O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnB1dE1hc2sgfSBmcm9tICcuL2NvbnRyb2xzL2lucHV0LmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuL2NvcmUvaG9sZGVyLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSFRNTENvbnRlbnRlZGl0YWJsZU1hc2tFbGVtZW50IH0gZnJvbSAnLi9jb250cm9scy9odG1sLWNvbnRlbnRlZGl0YWJsZS1tYXNrLWVsZW1lbnQuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBIVE1MSW5wdXRNYXNrRWxlbWVudCB9IGZyb20gJy4vY29udHJvbHMvaHRtbC1pbnB1dC1tYXNrLWVsZW1lbnQuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBIVE1MTWFza0VsZW1lbnQgfSBmcm9tICcuL2NvbnRyb2xzL2h0bWwtbWFzay1lbGVtZW50LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFza0VsZW1lbnQgfSBmcm9tICcuL2NvbnRyb2xzL21hc2stZWxlbWVudC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENoYW5nZURldGFpbHMgfSBmcm9tICcuL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuZXhwb3J0IHsgRElSRUNUSU9OLCBmb3JjZURpcmVjdGlvbiB9IGZyb20gJy4vY29yZS91dGlscy5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hc2tlZCB9IGZyb20gJy4vbWFza2VkL2Jhc2UuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXNrZWREYXRlIH0gZnJvbSAnLi9tYXNrZWQvZGF0ZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hc2tlZER5bmFtaWMgfSBmcm9tICcuL21hc2tlZC9keW5hbWljLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFza2VkRW51bSB9IGZyb20gJy4vbWFza2VkL2VudW0uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBjcmVhdGVNYXNrLCBub3JtYWxpemVPcHRzIH0gZnJvbSAnLi9tYXNrZWQvZmFjdG9yeS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hc2tlZEZ1bmN0aW9uIH0gZnJvbSAnLi9tYXNrZWQvZnVuY3Rpb24uanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXNrZWROdW1iZXIgfSBmcm9tICcuL21hc2tlZC9udW1iZXIuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXNrZWRQYXR0ZXJuIH0gZnJvbSAnLi9tYXNrZWQvcGF0dGVybi5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENodW5rc1RhaWxEZXRhaWxzIH0gZnJvbSAnLi9tYXNrZWQvcGF0dGVybi9jaHVuay10YWlsLWRldGFpbHMuanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQYXR0ZXJuRml4ZWREZWZpbml0aW9uIH0gZnJvbSAnLi9tYXNrZWQvcGF0dGVybi9maXhlZC1kZWZpbml0aW9uLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF0dGVybklucHV0RGVmaW5pdGlvbiB9IGZyb20gJy4vbWFza2VkL3BhdHRlcm4vaW5wdXQtZGVmaW5pdGlvbi5qcyc7XG5leHBvcnQgeyBQSVBFX1RZUEUsIGNyZWF0ZVBpcGUsIHBpcGUgfSBmcm9tICcuL21hc2tlZC9waXBlLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFza2VkUmFuZ2UgfSBmcm9tICcuL21hc2tlZC9yYW5nZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE1hc2tlZFJlZ0V4cCB9IGZyb20gJy4vbWFza2VkL3JlZ2V4cC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFJlcGVhdEJsb2NrIH0gZnJvbSAnLi9tYXNrZWQvcmVwZWF0LmpzJztcbmltcG9ydCAnLi9jb3JlL2FjdGlvbi1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi9jb250cm9scy9pbnB1dC1oaXN0b3J5LmpzJztcbmltcG9ydCAnLi9jb3JlL2NvbnRpbnVvdXMtdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi9tYXNrZWQvcGF0dGVybi9jdXJzb3IuanMnO1xuXG50cnkge1xuICBnbG9iYWxUaGlzLklNYXNrID0gSU1hc2s7XG59IGNhdGNoIHt9XG5cbmV4cG9ydCB7IElNYXNrIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBDaGFuZ2VEZXRhaWxzIGZyb20gJy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0IENvbnRpbnVvdXNUYWlsRGV0YWlscyBmcm9tICcuLi9jb3JlL2NvbnRpbnVvdXMtdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCB7IGlzU3RyaW5nLCBESVJFQ1RJT04sIG9iamVjdEluY2x1ZGVzLCBmb3JjZURpcmVjdGlvbiB9IGZyb20gJy4uL2NvcmUvdXRpbHMuanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uL2NvcmUvaG9sZGVyLmpzJztcblxuLyoqIEFwcGVuZCBmbGFncyAqL1xuXG4vKiogRXh0cmFjdCBmbGFncyAqL1xuXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy82MjIzXG5cbi8qKiBQcm92aWRlcyBjb21tb24gbWFza2luZyBzdHVmZiAqL1xuY2xhc3MgTWFza2VkIHtcbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqIFRyYW5zZm9ybXMgdmFsdWUgYmVmb3JlIG1hc2sgcHJvY2Vzc2luZyAqL1xuXG4gIC8qKiBUcmFuc2Zvcm1zIGVhY2ggY2hhciBiZWZvcmUgbWFzayBwcm9jZXNzaW5nICovXG5cbiAgLyoqIFZhbGlkYXRlcyBpZiB2YWx1ZSBpcyBhY2NlcHRhYmxlICovXG5cbiAgLyoqIERvZXMgYWRkaXRpb25hbCBwcm9jZXNzaW5nIGF0IHRoZSBlbmQgb2YgZWRpdGluZyAqL1xuXG4gIC8qKiBGb3JtYXQgdHlwZWQgdmFsdWUgdG8gc3RyaW5nICovXG5cbiAgLyoqIFBhcnNlIHN0cmluZyB0byBnZXQgdHlwZWQgdmFsdWUgKi9cblxuICAvKiogRW5hYmxlIGNoYXJhY3RlcnMgb3ZlcndyaXRpbmcgKi9cblxuICAvKiogKi9cblxuICAvKiogKi9cblxuICAvKiogKi9cblxuICAvKiogKi9cblxuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICB0aGlzLl91cGRhdGUoe1xuICAgICAgLi4uTWFza2VkLkRFRkFVTFRTLFxuICAgICAgLi4ub3B0c1xuICAgIH0pO1xuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKiBTZXRzIGFuZCBhcHBsaWVzIG5ldyBvcHRpb25zICovXG4gIHVwZGF0ZU9wdGlvbnMob3B0cykge1xuICAgIGlmICghdGhpcy5vcHRpb25zSXNDaGFuZ2VkKG9wdHMpKSByZXR1cm47XG4gICAgdGhpcy53aXRoVmFsdWVSZWZyZXNoKHRoaXMuX3VwZGF0ZS5iaW5kKHRoaXMsIG9wdHMpKTtcbiAgfVxuXG4gIC8qKiBTZXRzIG5ldyBvcHRpb25zICovXG4gIF91cGRhdGUob3B0cykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0cyk7XG4gIH1cblxuICAvKiogTWFzayBzdGF0ZSAqL1xuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF92YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIF9yYXdJbnB1dFZhbHVlOiB0aGlzLnJhd0lucHV0VmFsdWVcbiAgICB9O1xuICB9XG4gIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gc3RhdGUuX3ZhbHVlO1xuICB9XG5cbiAgLyoqIFJlc2V0cyB2YWx1ZSAqL1xuICByZXNldCgpIHtcbiAgICB0aGlzLl92YWx1ZSA9ICcnO1xuICB9XG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5yZXNvbHZlKHZhbHVlLCB7XG4gICAgICBpbnB1dDogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFJlc29sdmUgbmV3IHZhbHVlICovXG4gIHJlc29sdmUodmFsdWUsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge1xuICAgICAgICBpbnB1dDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuYXBwZW5kKHZhbHVlLCBmbGFncywgJycpO1xuICAgIHRoaXMuZG9Db21taXQoKTtcbiAgfVxuICBnZXQgdW5tYXNrZWRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuICBzZXQgdW5tYXNrZWRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMucmVzb2x2ZSh2YWx1ZSwge30pO1xuICB9XG4gIGdldCB0eXBlZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlID8gdGhpcy5wYXJzZSh0aGlzLnZhbHVlLCB0aGlzKSA6IHRoaXMudW5tYXNrZWRWYWx1ZTtcbiAgfVxuICBzZXQgdHlwZWRWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmZvcm1hdCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuZm9ybWF0KHZhbHVlLCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51bm1hc2tlZFZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKiogVmFsdWUgdGhhdCBpbmNsdWRlcyByYXcgdXNlciBpbnB1dCAqL1xuICBnZXQgcmF3SW5wdXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5leHRyYWN0SW5wdXQoMCwgdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoLCB7XG4gICAgICByYXc6IHRydWVcbiAgICB9KTtcbiAgfVxuICBzZXQgcmF3SW5wdXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMucmVzb2x2ZSh2YWx1ZSwge1xuICAgICAgcmF3OiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuICBnZXQgaXNDb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBnZXQgaXNGaWxsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb21wbGV0ZTtcbiAgfVxuXG4gIC8qKiBGaW5kcyBuZWFyZXN0IGlucHV0IHBvc2l0aW9uIGluIGRpcmVjdGlvbiAqL1xuICBuZWFyZXN0SW5wdXRQb3MoY3Vyc29yUG9zLCBkaXJlY3Rpb24pIHtcbiAgICByZXR1cm4gY3Vyc29yUG9zO1xuICB9XG4gIHRvdGFsSW5wdXRQb3NpdGlvbnMoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5taW4odGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoLCB0b1BvcyAtIGZyb21Qb3MpO1xuICB9XG5cbiAgLyoqIEV4dHJhY3RzIHZhbHVlIGluIHJhbmdlIGNvbnNpZGVyaW5nIGZsYWdzICovXG4gIGV4dHJhY3RJbnB1dChmcm9tUG9zLCB0b1BvcywgZmxhZ3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5VmFsdWUuc2xpY2UoZnJvbVBvcywgdG9Qb3MpO1xuICB9XG5cbiAgLyoqIEV4dHJhY3RzIHRhaWwgaW4gcmFuZ2UgKi9cbiAgZXh0cmFjdFRhaWwoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENvbnRpbnVvdXNUYWlsRGV0YWlscyh0aGlzLmV4dHJhY3RJbnB1dChmcm9tUG9zLCB0b1BvcyksIGZyb21Qb3MpO1xuICB9XG5cbiAgLyoqIEFwcGVuZHMgdGFpbCAqL1xuICBhcHBlbmRUYWlsKHRhaWwpIHtcbiAgICBpZiAoaXNTdHJpbmcodGFpbCkpIHRhaWwgPSBuZXcgQ29udGludW91c1RhaWxEZXRhaWxzKFN0cmluZyh0YWlsKSk7XG4gICAgcmV0dXJuIHRhaWwuYXBwZW5kVG8odGhpcyk7XG4gIH1cblxuICAvKiogQXBwZW5kcyBjaGFyICovXG4gIF9hcHBlbmRDaGFyUmF3KGNoLCBmbGFncykge1xuICAgIGlmICghY2gpIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIHRoaXMuX3ZhbHVlICs9IGNoO1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscyh7XG4gICAgICBpbnNlcnRlZDogY2gsXG4gICAgICByYXdJbnNlcnRlZDogY2hcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBBcHBlbmRzIGNoYXIgKi9cbiAgX2FwcGVuZENoYXIoY2gsIGZsYWdzLCBjaGVja1RhaWwpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgY29uc2lzdGVudFN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQgZGV0YWlscztcbiAgICBbY2gsIGRldGFpbHNdID0gdGhpcy5kb1ByZXBhcmVDaGFyKGNoLCBmbGFncyk7XG4gICAgaWYgKGNoKSB7XG4gICAgICBkZXRhaWxzID0gZGV0YWlscy5hZ2dyZWdhdGUodGhpcy5fYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpKTtcblxuICAgICAgLy8gVE9ETyBoYW5kbGUgYHNraXBgP1xuXG4gICAgICAvLyB0cnkgYGF1dG9maXhgIGxvb2thaGVhZFxuICAgICAgaWYgKCFkZXRhaWxzLnJhd0luc2VydGVkICYmIHRoaXMuYXV0b2ZpeCA9PT0gJ3BhZCcpIHtcbiAgICAgICAgY29uc3Qgbm9GaXhTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBjb25zaXN0ZW50U3RhdGU7XG4gICAgICAgIGxldCBmaXhEZXRhaWxzID0gdGhpcy5wYWQoZmxhZ3MpO1xuICAgICAgICBjb25zdCBjaERldGFpbHMgPSB0aGlzLl9hcHBlbmRDaGFyUmF3KGNoLCBmbGFncyk7XG4gICAgICAgIGZpeERldGFpbHMgPSBmaXhEZXRhaWxzLmFnZ3JlZ2F0ZShjaERldGFpbHMpO1xuXG4gICAgICAgIC8vIGlmIGZpeCB3YXMgYXBwbGllZCBvclxuICAgICAgICAvLyBpZiBkZXRhaWxzIGFyZSBlcXVhbCB1c2Ugc2tpcCByZXN0b3Jpbmcgc3RhdGUgb3B0aW1pemF0aW9uXG4gICAgICAgIGlmIChjaERldGFpbHMucmF3SW5zZXJ0ZWQgfHwgZml4RGV0YWlscy5lcXVhbHMoZGV0YWlscykpIHtcbiAgICAgICAgICBkZXRhaWxzID0gZml4RGV0YWlscztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0YXRlID0gbm9GaXhTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGV0YWlscy5pbnNlcnRlZCkge1xuICAgICAgbGV0IGNvbnNpc3RlbnRUYWlsO1xuICAgICAgbGV0IGFwcGVuZGVkID0gdGhpcy5kb1ZhbGlkYXRlKGZsYWdzKSAhPT0gZmFsc2U7XG4gICAgICBpZiAoYXBwZW5kZWQgJiYgY2hlY2tUYWlsICE9IG51bGwpIHtcbiAgICAgICAgLy8gdmFsaWRhdGlvbiBvaywgY2hlY2sgdGFpbFxuICAgICAgICBjb25zdCBiZWZvcmVUYWlsU3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgICBpZiAodGhpcy5vdmVyd3JpdGUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zaXN0ZW50VGFpbCA9IGNoZWNrVGFpbC5zdGF0ZTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRldGFpbHMucmF3SW5zZXJ0ZWQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNoZWNrVGFpbC51bnNoaWZ0KHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aCAtIGRldGFpbHMudGFpbFNoaWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRhaWxEZXRhaWxzID0gdGhpcy5hcHBlbmRUYWlsKGNoZWNrVGFpbCk7XG4gICAgICAgIGFwcGVuZGVkID0gdGFpbERldGFpbHMucmF3SW5zZXJ0ZWQubGVuZ3RoID09PSBjaGVja1RhaWwudG9TdHJpbmcoKS5sZW5ndGg7XG5cbiAgICAgICAgLy8gbm90IG9rLCB0cnkgc2hpZnRcbiAgICAgICAgaWYgKCEoYXBwZW5kZWQgJiYgdGFpbERldGFpbHMuaW5zZXJ0ZWQpICYmIHRoaXMub3ZlcndyaXRlID09PSAnc2hpZnQnKSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZSA9IGJlZm9yZVRhaWxTdGF0ZTtcbiAgICAgICAgICBjb25zaXN0ZW50VGFpbCA9IGNoZWNrVGFpbC5zdGF0ZTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRldGFpbHMucmF3SW5zZXJ0ZWQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNoZWNrVGFpbC5zaGlmdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0YWlsRGV0YWlscyA9IHRoaXMuYXBwZW5kVGFpbChjaGVja1RhaWwpO1xuICAgICAgICAgIGFwcGVuZGVkID0gdGFpbERldGFpbHMucmF3SW5zZXJ0ZWQubGVuZ3RoID09PSBjaGVja1RhaWwudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBvaywgcm9sbGJhY2sgc3RhdGUgYWZ0ZXIgdGFpbFxuICAgICAgICBpZiAoYXBwZW5kZWQgJiYgdGFpbERldGFpbHMuaW5zZXJ0ZWQpIHRoaXMuc3RhdGUgPSBiZWZvcmVUYWlsU3RhdGU7XG4gICAgICB9XG5cbiAgICAgIC8vIHJldmVydCBhbGwgaWYgc29tZXRoaW5nIHdlbnQgd3JvbmdcbiAgICAgIGlmICghYXBwZW5kZWQpIHtcbiAgICAgICAgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBjb25zaXN0ZW50U3RhdGU7XG4gICAgICAgIGlmIChjaGVja1RhaWwgJiYgY29uc2lzdGVudFRhaWwpIGNoZWNrVGFpbC5zdGF0ZSA9IGNvbnNpc3RlbnRUYWlsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuXG4gIC8qKiBBcHBlbmRzIG9wdGlvbmFsIHBsYWNlaG9sZGVyIGF0IHRoZSBlbmQgKi9cbiAgX2FwcGVuZFBsYWNlaG9sZGVyKCkge1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICB9XG5cbiAgLyoqIEFwcGVuZHMgb3B0aW9uYWwgZWFnZXIgcGxhY2Vob2xkZXIgYXQgdGhlIGVuZCAqL1xuICBfYXBwZW5kRWFnZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gIH1cblxuICAvKiogQXBwZW5kcyBzeW1ib2xzIGNvbnNpZGVyaW5nIGZsYWdzICovXG4gIGFwcGVuZChzdHIsIGZsYWdzLCB0YWlsKSB7XG4gICAgaWYgKCFpc1N0cmluZyhzdHIpKSB0aHJvdyBuZXcgRXJyb3IoJ3ZhbHVlIHNob3VsZCBiZSBzdHJpbmcnKTtcbiAgICBjb25zdCBjaGVja1RhaWwgPSBpc1N0cmluZyh0YWlsKSA/IG5ldyBDb250aW51b3VzVGFpbERldGFpbHMoU3RyaW5nKHRhaWwpKSA6IHRhaWw7XG4gICAgaWYgKGZsYWdzICE9IG51bGwgJiYgZmxhZ3MudGFpbCkgZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IGRldGFpbHM7XG4gICAgW3N0ciwgZGV0YWlsc10gPSB0aGlzLmRvUHJlcGFyZShzdHIsIGZsYWdzKTtcbiAgICBmb3IgKGxldCBjaSA9IDA7IGNpIDwgc3RyLmxlbmd0aDsgKytjaSkge1xuICAgICAgY29uc3QgZCA9IHRoaXMuX2FwcGVuZENoYXIoc3RyW2NpXSwgZmxhZ3MsIGNoZWNrVGFpbCk7XG4gICAgICBpZiAoIWQucmF3SW5zZXJ0ZWQgJiYgIXRoaXMuZG9Ta2lwSW52YWxpZChzdHJbY2ldLCBmbGFncywgY2hlY2tUYWlsKSkgYnJlYWs7XG4gICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZShkKTtcbiAgICB9XG4gICAgaWYgKCh0aGlzLmVhZ2VyID09PSB0cnVlIHx8IHRoaXMuZWFnZXIgPT09ICdhcHBlbmQnKSAmJiBmbGFncyAhPSBudWxsICYmIGZsYWdzLmlucHV0ICYmIHN0cikge1xuICAgICAgZGV0YWlscy5hZ2dyZWdhdGUodGhpcy5fYXBwZW5kRWFnZXIoKSk7XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kIHRhaWwgYnV0IGFnZ3JlZ2F0ZSBvbmx5IHRhaWxTaGlmdFxuICAgIGlmIChjaGVja1RhaWwgIT0gbnVsbCkge1xuICAgICAgZGV0YWlscy50YWlsU2hpZnQgKz0gdGhpcy5hcHBlbmRUYWlsKGNoZWNrVGFpbCkudGFpbFNoaWZ0O1xuICAgICAgLy8gVE9ETyBpdCdzIGEgZ29vZCBpZGVhIHRvIGNsZWFyIHN0YXRlIGFmdGVyIGFwcGVuZGluZyBlbmRzXG4gICAgICAvLyBidXQgaXQgY2F1c2VzIGJ1Z3Mgd2hlbiBvbmUgYXBwZW5kIGNhbGxzIGFub3RoZXIgKHdoZW4gZHluYW1pYyBkaXNwYXRjaCBzZXQgcmF3SW5wdXRWYWx1ZSlcbiAgICAgIC8vIHRoaXMuX3Jlc2V0QmVmb3JlVGFpbFN0YXRlKCk7XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIHJlbW92ZShmcm9tUG9zLCB0b1Bvcykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5kaXNwbGF5VmFsdWUuc2xpY2UoMCwgZnJvbVBvcykgKyB0aGlzLmRpc3BsYXlWYWx1ZS5zbGljZSh0b1Bvcyk7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gIH1cblxuICAvKiogQ2FsbHMgZnVuY3Rpb24gYW5kIHJlYXBwbGllcyBjdXJyZW50IHZhbHVlICovXG4gIHdpdGhWYWx1ZVJlZnJlc2goZm4pIHtcbiAgICBpZiAodGhpcy5fcmVmcmVzaGluZyB8fCAhdGhpcy5faW5pdGlhbGl6ZWQpIHJldHVybiBmbigpO1xuICAgIHRoaXMuX3JlZnJlc2hpbmcgPSB0cnVlO1xuICAgIGNvbnN0IHJhd0lucHV0ID0gdGhpcy5yYXdJbnB1dFZhbHVlO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICBjb25zdCByZXQgPSBmbigpO1xuICAgIHRoaXMucmF3SW5wdXRWYWx1ZSA9IHJhd0lucHV0O1xuICAgIC8vIGFwcGVuZCBsb3N0IHRyYWlsaW5nIGNoYXJzIGF0IHRoZSBlbmRcbiAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlICE9PSB2YWx1ZSAmJiB2YWx1ZS5pbmRleE9mKHRoaXMudmFsdWUpID09PSAwKSB7XG4gICAgICB0aGlzLmFwcGVuZCh2YWx1ZS5zbGljZSh0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGgpLCB7fSwgJycpO1xuICAgICAgdGhpcy5kb0NvbW1pdCgpO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5fcmVmcmVzaGluZztcbiAgICByZXR1cm4gcmV0O1xuICB9XG4gIHJ1bklzb2xhdGVkKGZuKSB7XG4gICAgaWYgKHRoaXMuX2lzb2xhdGVkIHx8ICF0aGlzLl9pbml0aWFsaXplZCkgcmV0dXJuIGZuKHRoaXMpO1xuICAgIHRoaXMuX2lzb2xhdGVkID0gdHJ1ZTtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcmV0ID0gZm4odGhpcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIGRlbGV0ZSB0aGlzLl9pc29sYXRlZDtcbiAgICByZXR1cm4gcmV0O1xuICB9XG4gIGRvU2tpcEludmFsaWQoY2gsIGZsYWdzLCBjaGVja1RhaWwpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnNraXBJbnZhbGlkKTtcbiAgfVxuXG4gIC8qKiBQcmVwYXJlcyBzdHJpbmcgYmVmb3JlIG1hc2sgcHJvY2Vzc2luZyAqL1xuICBkb1ByZXBhcmUoc3RyLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gQ2hhbmdlRGV0YWlscy5ub3JtYWxpemUodGhpcy5wcmVwYXJlID8gdGhpcy5wcmVwYXJlKHN0ciwgdGhpcywgZmxhZ3MpIDogc3RyKTtcbiAgfVxuXG4gIC8qKiBQcmVwYXJlcyBlYWNoIGNoYXIgYmVmb3JlIG1hc2sgcHJvY2Vzc2luZyAqL1xuICBkb1ByZXBhcmVDaGFyKHN0ciwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgcmV0dXJuIENoYW5nZURldGFpbHMubm9ybWFsaXplKHRoaXMucHJlcGFyZUNoYXIgPyB0aGlzLnByZXBhcmVDaGFyKHN0ciwgdGhpcywgZmxhZ3MpIDogc3RyKTtcbiAgfVxuXG4gIC8qKiBWYWxpZGF0ZXMgaWYgdmFsdWUgaXMgYWNjZXB0YWJsZSAqL1xuICBkb1ZhbGlkYXRlKGZsYWdzKSB7XG4gICAgcmV0dXJuICghdGhpcy52YWxpZGF0ZSB8fCB0aGlzLnZhbGlkYXRlKHRoaXMudmFsdWUsIHRoaXMsIGZsYWdzKSkgJiYgKCF0aGlzLnBhcmVudCB8fCB0aGlzLnBhcmVudC5kb1ZhbGlkYXRlKGZsYWdzKSk7XG4gIH1cblxuICAvKiogRG9lcyBhZGRpdGlvbmFsIHByb2Nlc3NpbmcgYXQgdGhlIGVuZCBvZiBlZGl0aW5nICovXG4gIGRvQ29tbWl0KCkge1xuICAgIGlmICh0aGlzLmNvbW1pdCkgdGhpcy5jb21taXQodGhpcy52YWx1ZSwgdGhpcyk7XG4gIH1cbiAgc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCwgaW5zZXJ0ZWQsIHJlbW92ZURpcmVjdGlvbiwgZmxhZ3MpIHtcbiAgICBpZiAoaW5zZXJ0ZWQgPT09IHZvaWQgMCkge1xuICAgICAgaW5zZXJ0ZWQgPSAnJztcbiAgICB9XG4gICAgaWYgKHJlbW92ZURpcmVjdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICByZW1vdmVEaXJlY3Rpb24gPSBESVJFQ1RJT04uTk9ORTtcbiAgICB9XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge1xuICAgICAgICBpbnB1dDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgdGFpbFBvcyA9IHN0YXJ0ICsgZGVsZXRlQ291bnQ7XG4gICAgY29uc3QgdGFpbCA9IHRoaXMuZXh0cmFjdFRhaWwodGFpbFBvcyk7XG4gICAgY29uc3QgZWFnZXJSZW1vdmUgPSB0aGlzLmVhZ2VyID09PSB0cnVlIHx8IHRoaXMuZWFnZXIgPT09ICdyZW1vdmUnO1xuICAgIGxldCBvbGRSYXdWYWx1ZTtcbiAgICBpZiAoZWFnZXJSZW1vdmUpIHtcbiAgICAgIHJlbW92ZURpcmVjdGlvbiA9IGZvcmNlRGlyZWN0aW9uKHJlbW92ZURpcmVjdGlvbik7XG4gICAgICBvbGRSYXdWYWx1ZSA9IHRoaXMuZXh0cmFjdElucHV0KDAsIHRhaWxQb3MsIHtcbiAgICAgICAgcmF3OiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHN0YXJ0Q2hhbmdlUG9zID0gc3RhcnQ7XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG5cbiAgICAvLyBpZiBpdCBpcyBqdXN0IGRlbGV0aW9uIHdpdGhvdXQgaW5zZXJ0aW9uXG4gICAgaWYgKHJlbW92ZURpcmVjdGlvbiAhPT0gRElSRUNUSU9OLk5PTkUpIHtcbiAgICAgIHN0YXJ0Q2hhbmdlUG9zID0gdGhpcy5uZWFyZXN0SW5wdXRQb3Moc3RhcnQsIGRlbGV0ZUNvdW50ID4gMSAmJiBzdGFydCAhPT0gMCAmJiAhZWFnZXJSZW1vdmUgPyBESVJFQ1RJT04uTk9ORSA6IHJlbW92ZURpcmVjdGlvbik7XG5cbiAgICAgIC8vIGFkanVzdCB0YWlsU2hpZnQgaWYgc3RhcnQgd2FzIGFsaWduZWRcbiAgICAgIGRldGFpbHMudGFpbFNoaWZ0ID0gc3RhcnRDaGFuZ2VQb3MgLSBzdGFydDtcbiAgICB9XG4gICAgZGV0YWlscy5hZ2dyZWdhdGUodGhpcy5yZW1vdmUoc3RhcnRDaGFuZ2VQb3MpKTtcbiAgICBpZiAoZWFnZXJSZW1vdmUgJiYgcmVtb3ZlRGlyZWN0aW9uICE9PSBESVJFQ1RJT04uTk9ORSAmJiBvbGRSYXdWYWx1ZSA9PT0gdGhpcy5yYXdJbnB1dFZhbHVlKSB7XG4gICAgICBpZiAocmVtb3ZlRGlyZWN0aW9uID09PSBESVJFQ1RJT04uRk9SQ0VfTEVGVCkge1xuICAgICAgICBsZXQgdmFsTGVuZ3RoO1xuICAgICAgICB3aGlsZSAob2xkUmF3VmFsdWUgPT09IHRoaXMucmF3SW5wdXRWYWx1ZSAmJiAodmFsTGVuZ3RoID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoKSkge1xuICAgICAgICAgIGRldGFpbHMuYWdncmVnYXRlKG5ldyBDaGFuZ2VEZXRhaWxzKHtcbiAgICAgICAgICAgIHRhaWxTaGlmdDogLTFcbiAgICAgICAgICB9KSkuYWdncmVnYXRlKHRoaXMucmVtb3ZlKHZhbExlbmd0aCAtIDEpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyZW1vdmVEaXJlY3Rpb24gPT09IERJUkVDVElPTi5GT1JDRV9SSUdIVCkge1xuICAgICAgICB0YWlsLnVuc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHMuYWdncmVnYXRlKHRoaXMuYXBwZW5kKGluc2VydGVkLCBmbGFncywgdGFpbCkpO1xuICB9XG4gIG1hc2tFcXVhbHMobWFzaykge1xuICAgIHJldHVybiB0aGlzLm1hc2sgPT09IG1hc2s7XG4gIH1cbiAgb3B0aW9uc0lzQ2hhbmdlZChvcHRzKSB7XG4gICAgcmV0dXJuICFvYmplY3RJbmNsdWRlcyh0aGlzLCBvcHRzKTtcbiAgfVxuICB0eXBlZFZhbHVlRXF1YWxzKHZhbHVlKSB7XG4gICAgY29uc3QgdHZhbCA9IHRoaXMudHlwZWRWYWx1ZTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHR2YWwgfHwgTWFza2VkLkVNUFRZX1ZBTFVFUy5pbmNsdWRlcyh2YWx1ZSkgJiYgTWFza2VkLkVNUFRZX1ZBTFVFUy5pbmNsdWRlcyh0dmFsKSB8fCAodGhpcy5mb3JtYXQgPyB0aGlzLmZvcm1hdCh2YWx1ZSwgdGhpcykgPT09IHRoaXMuZm9ybWF0KHRoaXMudHlwZWRWYWx1ZSwgdGhpcykgOiBmYWxzZSk7XG4gIH1cbiAgcGFkKGZsYWdzKSB7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gIH1cbn1cbk1hc2tlZC5ERUZBVUxUUyA9IHtcbiAgc2tpcEludmFsaWQ6IHRydWVcbn07XG5NYXNrZWQuRU1QVFlfVkFMVUVTID0gW3VuZGVmaW5lZCwgbnVsbCwgJyddO1xuSU1hc2suTWFza2VkID0gTWFza2VkO1xuXG5leHBvcnQgeyBNYXNrZWQgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IE1hc2tlZFBhdHRlcm4gZnJvbSAnLi9wYXR0ZXJuLmpzJztcbmltcG9ydCBNYXNrZWRSYW5nZSBmcm9tICcuL3JhbmdlLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2NvcmUvdXRpbHMuanMnO1xuaW1wb3J0ICcuLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi9iYXNlLmpzJztcbmltcG9ydCAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vZmFjdG9yeS5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9jaHVuay10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vY3Vyc29yLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2ZpeGVkLWRlZmluaXRpb24uanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vaW5wdXQtZGVmaW5pdGlvbi5qcyc7XG5pbXBvcnQgJy4vcmVnZXhwLmpzJztcblxuLyoqIERhdGUgbWFzayAqL1xuY2xhc3MgTWFza2VkRGF0ZSBleHRlbmRzIE1hc2tlZFBhdHRlcm4ge1xuICBzdGF0aWMgZXh0cmFjdFBhdHRlcm5PcHRpb25zKG9wdHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBtYXNrLFxuICAgICAgcGF0dGVybixcbiAgICAgIC4uLnBhdHRlcm5PcHRzXG4gICAgfSA9IG9wdHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnBhdHRlcm5PcHRzLFxuICAgICAgbWFzazogaXNTdHJpbmcobWFzaykgPyBtYXNrIDogcGF0dGVyblxuICAgIH07XG4gIH1cblxuICAvKiogUGF0dGVybiBtYXNrIGZvciBkYXRlIGFjY29yZGluZyB0byB7QGxpbmsgTWFza2VkRGF0ZSNmb3JtYXR9ICovXG5cbiAgLyoqIFN0YXJ0IGRhdGUgKi9cblxuICAvKiogRW5kIGRhdGUgKi9cblxuICAvKiogRm9ybWF0IHR5cGVkIHZhbHVlIHRvIHN0cmluZyAqL1xuXG4gIC8qKiBQYXJzZSBzdHJpbmcgdG8gZ2V0IHR5cGVkIHZhbHVlICovXG5cbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHN1cGVyKE1hc2tlZERhdGUuZXh0cmFjdFBhdHRlcm5PcHRpb25zKHtcbiAgICAgIC4uLk1hc2tlZERhdGUuREVGQVVMVFMsXG4gICAgICAuLi5vcHRzXG4gICAgfSkpO1xuICB9XG4gIHVwZGF0ZU9wdGlvbnMob3B0cykge1xuICAgIHN1cGVyLnVwZGF0ZU9wdGlvbnMob3B0cyk7XG4gIH1cbiAgX3VwZGF0ZShvcHRzKSB7XG4gICAgY29uc3Qge1xuICAgICAgbWFzayxcbiAgICAgIHBhdHRlcm4sXG4gICAgICBibG9ja3MsXG4gICAgICAuLi5wYXR0ZXJuT3B0c1xuICAgIH0gPSB7XG4gICAgICAuLi5NYXNrZWREYXRlLkRFRkFVTFRTLFxuICAgICAgLi4ub3B0c1xuICAgIH07XG4gICAgY29uc3QgcGF0dGVybkJsb2NrcyA9IE9iamVjdC5hc3NpZ24oe30sIE1hc2tlZERhdGUuR0VUX0RFRkFVTFRfQkxPQ0tTKCkpO1xuICAgIC8vIGFkanVzdCB5ZWFyIGJsb2NrXG4gICAgaWYgKG9wdHMubWluKSBwYXR0ZXJuQmxvY2tzLlkuZnJvbSA9IG9wdHMubWluLmdldEZ1bGxZZWFyKCk7XG4gICAgaWYgKG9wdHMubWF4KSBwYXR0ZXJuQmxvY2tzLlkudG8gPSBvcHRzLm1heC5nZXRGdWxsWWVhcigpO1xuICAgIGlmIChvcHRzLm1pbiAmJiBvcHRzLm1heCAmJiBwYXR0ZXJuQmxvY2tzLlkuZnJvbSA9PT0gcGF0dGVybkJsb2Nrcy5ZLnRvKSB7XG4gICAgICBwYXR0ZXJuQmxvY2tzLm0uZnJvbSA9IG9wdHMubWluLmdldE1vbnRoKCkgKyAxO1xuICAgICAgcGF0dGVybkJsb2Nrcy5tLnRvID0gb3B0cy5tYXguZ2V0TW9udGgoKSArIDE7XG4gICAgICBpZiAocGF0dGVybkJsb2Nrcy5tLmZyb20gPT09IHBhdHRlcm5CbG9ja3MubS50bykge1xuICAgICAgICBwYXR0ZXJuQmxvY2tzLmQuZnJvbSA9IG9wdHMubWluLmdldERhdGUoKTtcbiAgICAgICAgcGF0dGVybkJsb2Nrcy5kLnRvID0gb3B0cy5tYXguZ2V0RGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKHBhdHRlcm5CbG9ja3MsIHRoaXMuYmxvY2tzLCBibG9ja3MpO1xuICAgIHN1cGVyLl91cGRhdGUoe1xuICAgICAgLi4ucGF0dGVybk9wdHMsXG4gICAgICBtYXNrOiBpc1N0cmluZyhtYXNrKSA/IG1hc2sgOiBwYXR0ZXJuLFxuICAgICAgYmxvY2tzOiBwYXR0ZXJuQmxvY2tzXG4gICAgfSk7XG4gIH1cbiAgZG9WYWxpZGF0ZShmbGFncykge1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRhdGU7XG4gICAgcmV0dXJuIHN1cGVyLmRvVmFsaWRhdGUoZmxhZ3MpICYmICghdGhpcy5pc0NvbXBsZXRlIHx8IHRoaXMuaXNEYXRlRXhpc3QodGhpcy52YWx1ZSkgJiYgZGF0ZSAhPSBudWxsICYmICh0aGlzLm1pbiA9PSBudWxsIHx8IHRoaXMubWluIDw9IGRhdGUpICYmICh0aGlzLm1heCA9PSBudWxsIHx8IGRhdGUgPD0gdGhpcy5tYXgpKTtcbiAgfVxuXG4gIC8qKiBDaGVja3MgaWYgZGF0ZSBpcyBleGlzdHMgKi9cbiAgaXNEYXRlRXhpc3Qoc3RyKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMucGFyc2Uoc3RyLCB0aGlzKSwgdGhpcykuaW5kZXhPZihzdHIpID49IDA7XG4gIH1cblxuICAvKiogUGFyc2VkIERhdGUgKi9cbiAgZ2V0IGRhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZWRWYWx1ZTtcbiAgfVxuICBzZXQgZGF0ZShkYXRlKSB7XG4gICAgdGhpcy50eXBlZFZhbHVlID0gZGF0ZTtcbiAgfVxuICBnZXQgdHlwZWRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvbXBsZXRlID8gc3VwZXIudHlwZWRWYWx1ZSA6IG51bGw7XG4gIH1cbiAgc2V0IHR5cGVkVmFsdWUodmFsdWUpIHtcbiAgICBzdXBlci50eXBlZFZhbHVlID0gdmFsdWU7XG4gIH1cbiAgbWFza0VxdWFscyhtYXNrKSB7XG4gICAgcmV0dXJuIG1hc2sgPT09IERhdGUgfHwgc3VwZXIubWFza0VxdWFscyhtYXNrKTtcbiAgfVxuICBvcHRpb25zSXNDaGFuZ2VkKG9wdHMpIHtcbiAgICByZXR1cm4gc3VwZXIub3B0aW9uc0lzQ2hhbmdlZChNYXNrZWREYXRlLmV4dHJhY3RQYXR0ZXJuT3B0aW9ucyhvcHRzKSk7XG4gIH1cbn1cbk1hc2tlZERhdGUuR0VUX0RFRkFVTFRfQkxPQ0tTID0gKCkgPT4gKHtcbiAgZDoge1xuICAgIG1hc2s6IE1hc2tlZFJhbmdlLFxuICAgIGZyb206IDEsXG4gICAgdG86IDMxLFxuICAgIG1heExlbmd0aDogMlxuICB9LFxuICBtOiB7XG4gICAgbWFzazogTWFza2VkUmFuZ2UsXG4gICAgZnJvbTogMSxcbiAgICB0bzogMTIsXG4gICAgbWF4TGVuZ3RoOiAyXG4gIH0sXG4gIFk6IHtcbiAgICBtYXNrOiBNYXNrZWRSYW5nZSxcbiAgICBmcm9tOiAxOTAwLFxuICAgIHRvOiA5OTk5XG4gIH1cbn0pO1xuTWFza2VkRGF0ZS5ERUZBVUxUUyA9IHtcbiAgLi4uTWFza2VkUGF0dGVybi5ERUZBVUxUUyxcbiAgbWFzazogRGF0ZSxcbiAgcGF0dGVybjogJ2R7Ln1gbXsufWBZJyxcbiAgZm9ybWF0OiAoZGF0ZSwgbWFza2VkKSA9PiB7XG4gICAgaWYgKCFkYXRlKSByZXR1cm4gJyc7XG4gICAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICByZXR1cm4gW2RheSwgbW9udGgsIHllYXJdLmpvaW4oJy4nKTtcbiAgfSxcbiAgcGFyc2U6IChzdHIsIG1hc2tlZCkgPT4ge1xuICAgIGNvbnN0IFtkYXksIG1vbnRoLCB5ZWFyXSA9IHN0ci5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIH1cbn07XG5JTWFzay5NYXNrZWREYXRlID0gTWFza2VkRGF0ZTtcblxuZXhwb3J0IHsgTWFza2VkRGF0ZSBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgeyBESVJFQ1RJT04sIG9iamVjdEluY2x1ZGVzIH0gZnJvbSAnLi4vY29yZS91dGlscy5qcyc7XG5pbXBvcnQgQ2hhbmdlRGV0YWlscyBmcm9tICcuLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCBjcmVhdGVNYXNrLCB7IG5vcm1hbGl6ZU9wdHMgfSBmcm9tICcuL2ZhY3RvcnkuanMnO1xuaW1wb3J0IE1hc2tlZCBmcm9tICcuL2Jhc2UuanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uL2NvcmUvaG9sZGVyLmpzJztcbmltcG9ydCAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5cbi8qKiBEeW5hbWljIG1hc2sgZm9yIGNob29zaW5nIGFwcHJvcHJpYXRlIG1hc2sgaW4gcnVuLXRpbWUgKi9cbmNsYXNzIE1hc2tlZER5bmFtaWMgZXh0ZW5kcyBNYXNrZWQge1xuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgc3VwZXIoe1xuICAgICAgLi4uTWFza2VkRHluYW1pYy5ERUZBVUxUUyxcbiAgICAgIC4uLm9wdHNcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnRNYXNrID0gdW5kZWZpbmVkO1xuICB9XG4gIHVwZGF0ZU9wdGlvbnMob3B0cykge1xuICAgIHN1cGVyLnVwZGF0ZU9wdGlvbnMob3B0cyk7XG4gIH1cbiAgX3VwZGF0ZShvcHRzKSB7XG4gICAgc3VwZXIuX3VwZGF0ZShvcHRzKTtcbiAgICBpZiAoJ21hc2snIGluIG9wdHMpIHtcbiAgICAgIHRoaXMuZXhwb3NlTWFzayA9IHVuZGVmaW5lZDtcbiAgICAgIC8vIG1hc2sgY291bGQgYmUgdG90YWxseSBkeW5hbWljIHdpdGggb25seSBgZGlzcGF0Y2hgIG9wdGlvblxuICAgICAgdGhpcy5jb21waWxlZE1hc2tzID0gQXJyYXkuaXNBcnJheShvcHRzLm1hc2spID8gb3B0cy5tYXNrLm1hcChtID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGV4cG9zZSxcbiAgICAgICAgICAuLi5tYXNrT3B0c1xuICAgICAgICB9ID0gbm9ybWFsaXplT3B0cyhtKTtcbiAgICAgICAgY29uc3QgbWFza2VkID0gY3JlYXRlTWFzayh7XG4gICAgICAgICAgb3ZlcndyaXRlOiB0aGlzLl9vdmVyd3JpdGUsXG4gICAgICAgICAgZWFnZXI6IHRoaXMuX2VhZ2VyLFxuICAgICAgICAgIHNraXBJbnZhbGlkOiB0aGlzLl9za2lwSW52YWxpZCxcbiAgICAgICAgICAuLi5tYXNrT3B0c1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGV4cG9zZSkgdGhpcy5leHBvc2VNYXNrID0gbWFza2VkO1xuICAgICAgICByZXR1cm4gbWFza2VkO1xuICAgICAgfSkgOiBbXTtcblxuICAgICAgLy8gdGhpcy5jdXJyZW50TWFzayA9IHRoaXMuZG9EaXNwYXRjaCgnJyk7IC8vIHByb2JhYmx5IG5vdCBuZWVkZWQgYnV0IGxldHMgc2VlXG4gICAgfVxuICB9XG4gIF9hcHBlbmRDaGFyUmF3KGNoLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBkZXRhaWxzID0gdGhpcy5fYXBwbHlEaXNwYXRjaChjaCwgZmxhZ3MpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXNrKSB7XG4gICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZSh0aGlzLmN1cnJlbnRNYXNrLl9hcHBlbmRDaGFyKGNoLCB0aGlzLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpKSk7XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIF9hcHBseURpc3BhdGNoKGFwcGVuZGVkLCBmbGFncywgdGFpbCkge1xuICAgIGlmIChhcHBlbmRlZCA9PT0gdm9pZCAwKSB7XG4gICAgICBhcHBlbmRlZCA9ICcnO1xuICAgIH1cbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKHRhaWwgPT09IHZvaWQgMCkge1xuICAgICAgdGFpbCA9ICcnO1xuICAgIH1cbiAgICBjb25zdCBwcmV2VmFsdWVCZWZvcmVUYWlsID0gZmxhZ3MudGFpbCAmJiBmbGFncy5fYmVmb3JlVGFpbFN0YXRlICE9IG51bGwgPyBmbGFncy5fYmVmb3JlVGFpbFN0YXRlLl92YWx1ZSA6IHRoaXMudmFsdWU7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IHRoaXMucmF3SW5wdXRWYWx1ZTtcbiAgICBjb25zdCBpbnNlcnRWYWx1ZSA9IGZsYWdzLnRhaWwgJiYgZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSAhPSBudWxsID8gZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZS5fcmF3SW5wdXRWYWx1ZSA6IGlucHV0VmFsdWU7XG4gICAgY29uc3QgdGFpbFZhbHVlID0gaW5wdXRWYWx1ZS5zbGljZShpbnNlcnRWYWx1ZS5sZW5ndGgpO1xuICAgIGNvbnN0IHByZXZNYXNrID0gdGhpcy5jdXJyZW50TWFzaztcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBjb25zdCBwcmV2TWFza1N0YXRlID0gcHJldk1hc2sgPT0gbnVsbCA/IHZvaWQgMCA6IHByZXZNYXNrLnN0YXRlO1xuXG4gICAgLy8gY2xvbmUgZmxhZ3MgdG8gcHJldmVudCBvdmVyd3JpdGluZyBgX2JlZm9yZVRhaWxTdGF0ZWBcbiAgICB0aGlzLmN1cnJlbnRNYXNrID0gdGhpcy5kb0Rpc3BhdGNoKGFwcGVuZGVkLCB7XG4gICAgICAuLi5mbGFnc1xuICAgIH0sIHRhaWwpO1xuXG4gICAgLy8gcmVzdG9yZSBzdGF0ZSBhZnRlciBkaXNwYXRjaFxuICAgIGlmICh0aGlzLmN1cnJlbnRNYXNrKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TWFzayAhPT0gcHJldk1hc2spIHtcbiAgICAgICAgLy8gaWYgbWFzayBjaGFuZ2VkIHJlYXBwbHkgaW5wdXRcbiAgICAgICAgdGhpcy5jdXJyZW50TWFzay5yZXNldCgpO1xuICAgICAgICBpZiAoaW5zZXJ0VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRNYXNrLmFwcGVuZChpbnNlcnRWYWx1ZSwge1xuICAgICAgICAgICAgcmF3OiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGV0YWlscy50YWlsU2hpZnQgPSB0aGlzLmN1cnJlbnRNYXNrLnZhbHVlLmxlbmd0aCAtIHByZXZWYWx1ZUJlZm9yZVRhaWwubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWlsVmFsdWUpIHtcbiAgICAgICAgICBkZXRhaWxzLnRhaWxTaGlmdCArPSB0aGlzLmN1cnJlbnRNYXNrLmFwcGVuZCh0YWlsVmFsdWUsIHtcbiAgICAgICAgICAgIHJhdzogdHJ1ZSxcbiAgICAgICAgICAgIHRhaWw6IHRydWVcbiAgICAgICAgICB9KS50YWlsU2hpZnQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJldk1hc2tTdGF0ZSkge1xuICAgICAgICAvLyBEaXNwYXRjaCBjYW4gZG8gc29tZXRoaW5nIGJhZCB3aXRoIHN0YXRlLCBzb1xuICAgICAgICAvLyByZXN0b3JlIHByZXYgbWFzayBzdGF0ZVxuICAgICAgICB0aGlzLmN1cnJlbnRNYXNrLnN0YXRlID0gcHJldk1hc2tTdGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbiAgX2FwcGVuZFBsYWNlaG9sZGVyKCkge1xuICAgIGNvbnN0IGRldGFpbHMgPSB0aGlzLl9hcHBseURpc3BhdGNoKCk7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hc2spIHtcbiAgICAgIGRldGFpbHMuYWdncmVnYXRlKHRoaXMuY3VycmVudE1hc2suX2FwcGVuZFBsYWNlaG9sZGVyKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBfYXBwZW5kRWFnZXIoKSB7XG4gICAgY29uc3QgZGV0YWlscyA9IHRoaXMuX2FwcGx5RGlzcGF0Y2goKTtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFzaykge1xuICAgICAgZGV0YWlscy5hZ2dyZWdhdGUodGhpcy5jdXJyZW50TWFzay5fYXBwZW5kRWFnZXIoKSk7XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIGFwcGVuZFRhaWwodGFpbCkge1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIGlmICh0YWlsKSBkZXRhaWxzLmFnZ3JlZ2F0ZSh0aGlzLl9hcHBseURpc3BhdGNoKCcnLCB7fSwgdGFpbCkpO1xuICAgIHJldHVybiBkZXRhaWxzLmFnZ3JlZ2F0ZSh0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay5hcHBlbmRUYWlsKHRhaWwpIDogc3VwZXIuYXBwZW5kVGFpbCh0YWlsKSk7XG4gIH1cbiAgY3VycmVudE1hc2tGbGFncyhmbGFncykge1xuICAgIHZhciBfZmxhZ3MkX2JlZm9yZVRhaWxTdGEsIF9mbGFncyRfYmVmb3JlVGFpbFN0YTI7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmZsYWdzLFxuICAgICAgX2JlZm9yZVRhaWxTdGF0ZTogKChfZmxhZ3MkX2JlZm9yZVRhaWxTdGEgPSBmbGFncy5fYmVmb3JlVGFpbFN0YXRlKSA9PSBudWxsID8gdm9pZCAwIDogX2ZsYWdzJF9iZWZvcmVUYWlsU3RhLmN1cnJlbnRNYXNrUmVmKSA9PT0gdGhpcy5jdXJyZW50TWFzayAmJiAoKF9mbGFncyRfYmVmb3JlVGFpbFN0YTIgPSBmbGFncy5fYmVmb3JlVGFpbFN0YXRlKSA9PSBudWxsID8gdm9pZCAwIDogX2ZsYWdzJF9iZWZvcmVUYWlsU3RhMi5jdXJyZW50TWFzaykgfHwgZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZVxuICAgIH07XG4gIH1cbiAgZG9EaXNwYXRjaChhcHBlbmRlZCwgZmxhZ3MsIHRhaWwpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKHRhaWwgPT09IHZvaWQgMCkge1xuICAgICAgdGFpbCA9ICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChhcHBlbmRlZCwgdGhpcywgZmxhZ3MsIHRhaWwpO1xuICB9XG4gIGRvVmFsaWRhdGUoZmxhZ3MpIHtcbiAgICByZXR1cm4gc3VwZXIuZG9WYWxpZGF0ZShmbGFncykgJiYgKCF0aGlzLmN1cnJlbnRNYXNrIHx8IHRoaXMuY3VycmVudE1hc2suZG9WYWxpZGF0ZSh0aGlzLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpKSk7XG4gIH1cbiAgZG9QcmVwYXJlKHN0ciwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgbGV0IFtzLCBkZXRhaWxzXSA9IHN1cGVyLmRvUHJlcGFyZShzdHIsIGZsYWdzKTtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFzaykge1xuICAgICAgbGV0IGN1cnJlbnREZXRhaWxzO1xuICAgICAgW3MsIGN1cnJlbnREZXRhaWxzXSA9IHN1cGVyLmRvUHJlcGFyZShzLCB0aGlzLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpKTtcbiAgICAgIGRldGFpbHMgPSBkZXRhaWxzLmFnZ3JlZ2F0ZShjdXJyZW50RGV0YWlscyk7XG4gICAgfVxuICAgIHJldHVybiBbcywgZGV0YWlsc107XG4gIH1cbiAgZG9QcmVwYXJlQ2hhcihzdHIsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGxldCBbcywgZGV0YWlsc10gPSBzdXBlci5kb1ByZXBhcmVDaGFyKHN0ciwgZmxhZ3MpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRNYXNrKSB7XG4gICAgICBsZXQgY3VycmVudERldGFpbHM7XG4gICAgICBbcywgY3VycmVudERldGFpbHNdID0gc3VwZXIuZG9QcmVwYXJlQ2hhcihzLCB0aGlzLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpKTtcbiAgICAgIGRldGFpbHMgPSBkZXRhaWxzLmFnZ3JlZ2F0ZShjdXJyZW50RGV0YWlscyk7XG4gICAgfVxuICAgIHJldHVybiBbcywgZGV0YWlsc107XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgdmFyIF90aGlzJGN1cnJlbnRNYXNrO1xuICAgIChfdGhpcyRjdXJyZW50TWFzayA9IHRoaXMuY3VycmVudE1hc2spID09IG51bGwgfHwgX3RoaXMkY3VycmVudE1hc2sucmVzZXQoKTtcbiAgICB0aGlzLmNvbXBpbGVkTWFza3MuZm9yRWFjaChtID0+IG0ucmVzZXQoKSk7XG4gIH1cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmV4cG9zZU1hc2sgPyB0aGlzLmV4cG9zZU1hc2sudmFsdWUgOiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay52YWx1ZSA6ICcnO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmV4cG9zZU1hc2spIHtcbiAgICAgIHRoaXMuZXhwb3NlTWFzay52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jdXJyZW50TWFzayA9IHRoaXMuZXhwb3NlTWFzaztcbiAgICAgIHRoaXMuX2FwcGx5RGlzcGF0Y2goKTtcbiAgICB9IGVsc2Ugc3VwZXIudmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBnZXQgdW5tYXNrZWRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5leHBvc2VNYXNrID8gdGhpcy5leHBvc2VNYXNrLnVubWFza2VkVmFsdWUgOiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay51bm1hc2tlZFZhbHVlIDogJyc7XG4gIH1cbiAgc2V0IHVubWFza2VkVmFsdWUodW5tYXNrZWRWYWx1ZSkge1xuICAgIGlmICh0aGlzLmV4cG9zZU1hc2spIHtcbiAgICAgIHRoaXMuZXhwb3NlTWFzay51bm1hc2tlZFZhbHVlID0gdW5tYXNrZWRWYWx1ZTtcbiAgICAgIHRoaXMuY3VycmVudE1hc2sgPSB0aGlzLmV4cG9zZU1hc2s7XG4gICAgICB0aGlzLl9hcHBseURpc3BhdGNoKCk7XG4gICAgfSBlbHNlIHN1cGVyLnVubWFza2VkVmFsdWUgPSB1bm1hc2tlZFZhbHVlO1xuICB9XG4gIGdldCB0eXBlZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmV4cG9zZU1hc2sgPyB0aGlzLmV4cG9zZU1hc2sudHlwZWRWYWx1ZSA6IHRoaXMuY3VycmVudE1hc2sgPyB0aGlzLmN1cnJlbnRNYXNrLnR5cGVkVmFsdWUgOiAnJztcbiAgfVxuICBzZXQgdHlwZWRWYWx1ZSh0eXBlZFZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZXhwb3NlTWFzaykge1xuICAgICAgdGhpcy5leHBvc2VNYXNrLnR5cGVkVmFsdWUgPSB0eXBlZFZhbHVlO1xuICAgICAgdGhpcy5jdXJyZW50TWFzayA9IHRoaXMuZXhwb3NlTWFzaztcbiAgICAgIHRoaXMuX2FwcGx5RGlzcGF0Y2goKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHVubWFza2VkVmFsdWUgPSBTdHJpbmcodHlwZWRWYWx1ZSk7XG5cbiAgICAvLyBkb3VibGUgY2hlY2sgaXRcbiAgICBpZiAodGhpcy5jdXJyZW50TWFzaykge1xuICAgICAgdGhpcy5jdXJyZW50TWFzay50eXBlZFZhbHVlID0gdHlwZWRWYWx1ZTtcbiAgICAgIHVubWFza2VkVmFsdWUgPSB0aGlzLmN1cnJlbnRNYXNrLnVubWFza2VkVmFsdWU7XG4gICAgfVxuICAgIHRoaXMudW5tYXNrZWRWYWx1ZSA9IHVubWFza2VkVmFsdWU7XG4gIH1cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFzayA/IHRoaXMuY3VycmVudE1hc2suZGlzcGxheVZhbHVlIDogJyc7XG4gIH1cbiAgZ2V0IGlzQ29tcGxldGUoKSB7XG4gICAgdmFyIF90aGlzJGN1cnJlbnRNYXNrMjtcbiAgICByZXR1cm4gQm9vbGVhbigoX3RoaXMkY3VycmVudE1hc2syID0gdGhpcy5jdXJyZW50TWFzaykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJGN1cnJlbnRNYXNrMi5pc0NvbXBsZXRlKTtcbiAgfVxuICBnZXQgaXNGaWxsZWQoKSB7XG4gICAgdmFyIF90aGlzJGN1cnJlbnRNYXNrMztcbiAgICByZXR1cm4gQm9vbGVhbigoX3RoaXMkY3VycmVudE1hc2szID0gdGhpcy5jdXJyZW50TWFzaykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJGN1cnJlbnRNYXNrMy5pc0ZpbGxlZCk7XG4gIH1cbiAgcmVtb3ZlKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgaWYgKHRoaXMuY3VycmVudE1hc2spIHtcbiAgICAgIGRldGFpbHMuYWdncmVnYXRlKHRoaXMuY3VycmVudE1hc2sucmVtb3ZlKGZyb21Qb3MsIHRvUG9zKSlcbiAgICAgIC8vIHVwZGF0ZSB3aXRoIGRpc3BhdGNoXG4gICAgICAuYWdncmVnYXRlKHRoaXMuX2FwcGx5RGlzcGF0Y2goKSk7XG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIGdldCBzdGF0ZSgpIHtcbiAgICB2YXIgX3RoaXMkY3VycmVudE1hc2s0O1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5zdGF0ZSxcbiAgICAgIF9yYXdJbnB1dFZhbHVlOiB0aGlzLnJhd0lucHV0VmFsdWUsXG4gICAgICBjb21waWxlZE1hc2tzOiB0aGlzLmNvbXBpbGVkTWFza3MubWFwKG0gPT4gbS5zdGF0ZSksXG4gICAgICBjdXJyZW50TWFza1JlZjogdGhpcy5jdXJyZW50TWFzayxcbiAgICAgIGN1cnJlbnRNYXNrOiAoX3RoaXMkY3VycmVudE1hc2s0ID0gdGhpcy5jdXJyZW50TWFzaykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJGN1cnJlbnRNYXNrNC5zdGF0ZVxuICAgIH07XG4gIH1cbiAgc2V0IHN0YXRlKHN0YXRlKSB7XG4gICAgY29uc3Qge1xuICAgICAgY29tcGlsZWRNYXNrcyxcbiAgICAgIGN1cnJlbnRNYXNrUmVmLFxuICAgICAgY3VycmVudE1hc2ssXG4gICAgICAuLi5tYXNrZWRTdGF0ZVxuICAgIH0gPSBzdGF0ZTtcbiAgICBpZiAoY29tcGlsZWRNYXNrcykgdGhpcy5jb21waWxlZE1hc2tzLmZvckVhY2goKG0sIG1pKSA9PiBtLnN0YXRlID0gY29tcGlsZWRNYXNrc1ttaV0pO1xuICAgIGlmIChjdXJyZW50TWFza1JlZiAhPSBudWxsKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNYXNrID0gY3VycmVudE1hc2tSZWY7XG4gICAgICB0aGlzLmN1cnJlbnRNYXNrLnN0YXRlID0gY3VycmVudE1hc2s7XG4gICAgfVxuICAgIHN1cGVyLnN0YXRlID0gbWFza2VkU3RhdGU7XG4gIH1cbiAgZXh0cmFjdElucHV0KGZyb21Qb3MsIHRvUG9zLCBmbGFncykge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNYXNrID8gdGhpcy5jdXJyZW50TWFzay5leHRyYWN0SW5wdXQoZnJvbVBvcywgdG9Qb3MsIGZsYWdzKSA6ICcnO1xuICB9XG4gIGV4dHJhY3RUYWlsKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1hc2sgPyB0aGlzLmN1cnJlbnRNYXNrLmV4dHJhY3RUYWlsKGZyb21Qb3MsIHRvUG9zKSA6IHN1cGVyLmV4dHJhY3RUYWlsKGZyb21Qb3MsIHRvUG9zKTtcbiAgfVxuICBkb0NvbW1pdCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50TWFzaykgdGhpcy5jdXJyZW50TWFzay5kb0NvbW1pdCgpO1xuICAgIHN1cGVyLmRvQ29tbWl0KCk7XG4gIH1cbiAgbmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgZGlyZWN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1hc2sgPyB0aGlzLmN1cnJlbnRNYXNrLm5lYXJlc3RJbnB1dFBvcyhjdXJzb3JQb3MsIGRpcmVjdGlvbikgOiBzdXBlci5uZWFyZXN0SW5wdXRQb3MoY3Vyc29yUG9zLCBkaXJlY3Rpb24pO1xuICB9XG4gIGdldCBvdmVyd3JpdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1hc2sgPyB0aGlzLmN1cnJlbnRNYXNrLm92ZXJ3cml0ZSA6IHRoaXMuX292ZXJ3cml0ZTtcbiAgfVxuICBzZXQgb3ZlcndyaXRlKG92ZXJ3cml0ZSkge1xuICAgIHRoaXMuX292ZXJ3cml0ZSA9IG92ZXJ3cml0ZTtcbiAgfVxuICBnZXQgZWFnZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1hc2sgPyB0aGlzLmN1cnJlbnRNYXNrLmVhZ2VyIDogdGhpcy5fZWFnZXI7XG4gIH1cbiAgc2V0IGVhZ2VyKGVhZ2VyKSB7XG4gICAgdGhpcy5fZWFnZXIgPSBlYWdlcjtcbiAgfVxuICBnZXQgc2tpcEludmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudE1hc2sgPyB0aGlzLmN1cnJlbnRNYXNrLnNraXBJbnZhbGlkIDogdGhpcy5fc2tpcEludmFsaWQ7XG4gIH1cbiAgc2V0IHNraXBJbnZhbGlkKHNraXBJbnZhbGlkKSB7XG4gICAgdGhpcy5fc2tpcEludmFsaWQgPSBza2lwSW52YWxpZDtcbiAgfVxuICBnZXQgYXV0b2ZpeCgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TWFzayA/IHRoaXMuY3VycmVudE1hc2suYXV0b2ZpeCA6IHRoaXMuX2F1dG9maXg7XG4gIH1cbiAgc2V0IGF1dG9maXgoYXV0b2ZpeCkge1xuICAgIHRoaXMuX2F1dG9maXggPSBhdXRvZml4O1xuICB9XG4gIG1hc2tFcXVhbHMobWFzaykge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG1hc2spID8gdGhpcy5jb21waWxlZE1hc2tzLmV2ZXJ5KChtLCBtaSkgPT4ge1xuICAgICAgaWYgKCFtYXNrW21pXSkgcmV0dXJuO1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYXNrOiBvbGRNYXNrLFxuICAgICAgICAuLi5yZXN0T3B0c1xuICAgICAgfSA9IG1hc2tbbWldO1xuICAgICAgcmV0dXJuIG9iamVjdEluY2x1ZGVzKG0sIHJlc3RPcHRzKSAmJiBtLm1hc2tFcXVhbHMob2xkTWFzayk7XG4gICAgfSkgOiBzdXBlci5tYXNrRXF1YWxzKG1hc2spO1xuICB9XG4gIHR5cGVkVmFsdWVFcXVhbHModmFsdWUpIHtcbiAgICB2YXIgX3RoaXMkY3VycmVudE1hc2s1O1xuICAgIHJldHVybiBCb29sZWFuKChfdGhpcyRjdXJyZW50TWFzazUgPSB0aGlzLmN1cnJlbnRNYXNrKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkY3VycmVudE1hc2s1LnR5cGVkVmFsdWVFcXVhbHModmFsdWUpKTtcbiAgfVxufVxuLyoqIEN1cnJlbnRseSBjaG9zZW4gbWFzayAqL1xuLyoqIEN1cnJlbnRseSBjaG9zZW4gbWFzayAqL1xuLyoqIENvbXBsaWxlZCB7QGxpbmsgTWFza2VkfSBvcHRpb25zICovXG4vKiogQ2hvb3NlcyB7QGxpbmsgTWFza2VkfSBkZXBlbmRpbmcgb24gaW5wdXQgdmFsdWUgKi9cbk1hc2tlZER5bmFtaWMuREVGQVVMVFMgPSB7XG4gIC4uLk1hc2tlZC5ERUZBVUxUUyxcbiAgZGlzcGF0Y2g6IChhcHBlbmRlZCwgbWFza2VkLCBmbGFncywgdGFpbCkgPT4ge1xuICAgIGlmICghbWFza2VkLmNvbXBpbGVkTWFza3MubGVuZ3RoKSByZXR1cm47XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IG1hc2tlZC5yYXdJbnB1dFZhbHVlO1xuXG4gICAgLy8gc2ltdWxhdGUgaW5wdXRcbiAgICBjb25zdCBpbnB1dHMgPSBtYXNrZWQuY29tcGlsZWRNYXNrcy5tYXAoKG0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpc0N1cnJlbnQgPSBtYXNrZWQuY3VycmVudE1hc2sgPT09IG07XG4gICAgICBjb25zdCBzdGFydElucHV0UG9zID0gaXNDdXJyZW50ID8gbS5kaXNwbGF5VmFsdWUubGVuZ3RoIDogbS5uZWFyZXN0SW5wdXRQb3MobS5kaXNwbGF5VmFsdWUubGVuZ3RoLCBESVJFQ1RJT04uRk9SQ0VfTEVGVCk7XG4gICAgICBpZiAobS5yYXdJbnB1dFZhbHVlICE9PSBpbnB1dFZhbHVlKSB7XG4gICAgICAgIG0ucmVzZXQoKTtcbiAgICAgICAgbS5hcHBlbmQoaW5wdXRWYWx1ZSwge1xuICAgICAgICAgIHJhdzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzQ3VycmVudCkge1xuICAgICAgICBtLnJlbW92ZShzdGFydElucHV0UG9zKTtcbiAgICAgIH1cbiAgICAgIG0uYXBwZW5kKGFwcGVuZGVkLCBtYXNrZWQuY3VycmVudE1hc2tGbGFncyhmbGFncykpO1xuICAgICAgbS5hcHBlbmRUYWlsKHRhaWwpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIHdlaWdodDogbS5yYXdJbnB1dFZhbHVlLmxlbmd0aCxcbiAgICAgICAgdG90YWxJbnB1dFBvc2l0aW9uczogbS50b3RhbElucHV0UG9zaXRpb25zKDAsIE1hdGgubWF4KHN0YXJ0SW5wdXRQb3MsIG0ubmVhcmVzdElucHV0UG9zKG0uZGlzcGxheVZhbHVlLmxlbmd0aCwgRElSRUNUSU9OLkZPUkNFX0xFRlQpKSlcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvLyBwb3AgbWFza3Mgd2l0aCBsb25nZXIgdmFsdWVzIGZpcnN0XG4gICAgaW5wdXRzLnNvcnQoKGkxLCBpMikgPT4gaTIud2VpZ2h0IC0gaTEud2VpZ2h0IHx8IGkyLnRvdGFsSW5wdXRQb3NpdGlvbnMgLSBpMS50b3RhbElucHV0UG9zaXRpb25zKTtcbiAgICByZXR1cm4gbWFza2VkLmNvbXBpbGVkTWFza3NbaW5wdXRzWzBdLmluZGV4XTtcbiAgfVxufTtcbklNYXNrLk1hc2tlZER5bmFtaWMgPSBNYXNrZWREeW5hbWljO1xuXG5leHBvcnQgeyBNYXNrZWREeW5hbWljIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBNYXNrZWRQYXR0ZXJuIGZyb20gJy4vcGF0dGVybi5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vY29yZS9ob2xkZXIuanMnO1xuaW1wb3J0IENoYW5nZURldGFpbHMgZnJvbSAnLi4vY29yZS9jaGFuZ2UtZGV0YWlscy5qcyc7XG5pbXBvcnQgeyBESVJFQ1RJT04gfSBmcm9tICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCBDb250aW51b3VzVGFpbERldGFpbHMgZnJvbSAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vYmFzZS5qcyc7XG5pbXBvcnQgJy4vZmFjdG9yeS5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9jaHVuay10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vY3Vyc29yLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2ZpeGVkLWRlZmluaXRpb24uanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vaW5wdXQtZGVmaW5pdGlvbi5qcyc7XG5pbXBvcnQgJy4vcmVnZXhwLmpzJztcblxuLyoqIFBhdHRlcm4gd2hpY2ggdmFsaWRhdGVzIGVudW0gdmFsdWVzICovXG5jbGFzcyBNYXNrZWRFbnVtIGV4dGVuZHMgTWFza2VkUGF0dGVybiB7XG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBzdXBlcih7XG4gICAgICAuLi5NYXNrZWRFbnVtLkRFRkFVTFRTLFxuICAgICAgLi4ub3B0c1xuICAgIH0pOyAvLyBtYXNrIHdpbGwgYmUgY3JlYXRlZCBpbiBfdXBkYXRlXG4gIH1cbiAgdXBkYXRlT3B0aW9ucyhvcHRzKSB7XG4gICAgc3VwZXIudXBkYXRlT3B0aW9ucyhvcHRzKTtcbiAgfVxuICBfdXBkYXRlKG9wdHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBlbnVtOiBlbnVtXyxcbiAgICAgIC4uLmVvcHRzXG4gICAgfSA9IG9wdHM7XG4gICAgaWYgKGVudW1fKSB7XG4gICAgICBjb25zdCBsZW5ndGhzID0gZW51bV8ubWFwKGUgPT4gZS5sZW5ndGgpO1xuICAgICAgY29uc3QgcmVxdWlyZWRMZW5ndGggPSBNYXRoLm1pbiguLi5sZW5ndGhzKTtcbiAgICAgIGNvbnN0IG9wdGlvbmFsTGVuZ3RoID0gTWF0aC5tYXgoLi4ubGVuZ3RocykgLSByZXF1aXJlZExlbmd0aDtcbiAgICAgIGVvcHRzLm1hc2sgPSAnKicucmVwZWF0KHJlcXVpcmVkTGVuZ3RoKTtcbiAgICAgIGlmIChvcHRpb25hbExlbmd0aCkgZW9wdHMubWFzayArPSAnWycgKyAnKicucmVwZWF0KG9wdGlvbmFsTGVuZ3RoKSArICddJztcbiAgICAgIHRoaXMuZW51bSA9IGVudW1fO1xuICAgIH1cbiAgICBzdXBlci5fdXBkYXRlKGVvcHRzKTtcbiAgfVxuICBfYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgbWF0Y2hGcm9tID0gTWF0aC5taW4odGhpcy5uZWFyZXN0SW5wdXRQb3MoMCwgRElSRUNUSU9OLkZPUkNFX1JJR0hUKSwgdGhpcy52YWx1ZS5sZW5ndGgpO1xuICAgIGNvbnN0IG1hdGNoZXMgPSB0aGlzLmVudW0uZmlsdGVyKGUgPT4gdGhpcy5tYXRjaFZhbHVlKGUsIHRoaXMudW5tYXNrZWRWYWx1ZSArIGNoLCBtYXRjaEZyb20pKTtcbiAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLl9mb3JFYWNoQmxvY2tzSW5SYW5nZSgwLCB0aGlzLnZhbHVlLmxlbmd0aCwgKGIsIGJpKSA9PiB7XG4gICAgICAgICAgY29uc3QgbWNoID0gbWF0Y2hlc1swXVtiaV07XG4gICAgICAgICAgaWYgKGJpID49IHRoaXMudmFsdWUubGVuZ3RoIHx8IG1jaCA9PT0gYi52YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgIGIucmVzZXQoKTtcbiAgICAgICAgICBiLl9hcHBlbmRDaGFyKG1jaCwgZmxhZ3MpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGQgPSBzdXBlci5fYXBwZW5kQ2hhclJhdyhtYXRjaGVzWzBdW3RoaXMudmFsdWUubGVuZ3RoXSwgZmxhZ3MpO1xuICAgICAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1hdGNoZXNbMF0uc2xpY2UodGhpcy51bm1hc2tlZFZhbHVlLmxlbmd0aCkuc3BsaXQoJycpLmZvckVhY2gobWNoID0+IGQuYWdncmVnYXRlKHN1cGVyLl9hcHBlbmRDaGFyUmF3KG1jaCkpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgfVxuICBleHRyYWN0VGFpbChmcm9tUG9zLCB0b1Bvcykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIC8vIGp1c3QgZHJvcCB0YWlsXG4gICAgcmV0dXJuIG5ldyBDb250aW51b3VzVGFpbERldGFpbHMoJycsIGZyb21Qb3MpO1xuICB9XG4gIHJlbW92ZShmcm9tUG9zLCB0b1Bvcykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGlmIChmcm9tUG9zID09PSB0b1BvcykgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgY29uc3QgbWF0Y2hGcm9tID0gTWF0aC5taW4oc3VwZXIubmVhcmVzdElucHV0UG9zKDAsIERJUkVDVElPTi5GT1JDRV9SSUdIVCksIHRoaXMudmFsdWUubGVuZ3RoKTtcbiAgICBsZXQgcG9zO1xuICAgIGZvciAocG9zID0gZnJvbVBvczsgcG9zID49IDA7IC0tcG9zKSB7XG4gICAgICBjb25zdCBtYXRjaGVzID0gdGhpcy5lbnVtLmZpbHRlcihlID0+IHRoaXMubWF0Y2hWYWx1ZShlLCB0aGlzLnZhbHVlLnNsaWNlKG1hdGNoRnJvbSwgcG9zKSwgbWF0Y2hGcm9tKSk7XG4gICAgICBpZiAobWF0Y2hlcy5sZW5ndGggPiAxKSBicmVhaztcbiAgICB9XG4gICAgY29uc3QgZGV0YWlscyA9IHN1cGVyLnJlbW92ZShwb3MsIHRvUG9zKTtcbiAgICBkZXRhaWxzLnRhaWxTaGlmdCArPSBwb3MgLSBmcm9tUG9zO1xuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG59XG4vKiogTWF0Y2ggZW51bSB2YWx1ZSAqL1xuTWFza2VkRW51bS5ERUZBVUxUUyA9IHtcbiAgLi4uTWFza2VkUGF0dGVybi5ERUZBVUxUUyxcbiAgbWF0Y2hWYWx1ZTogKGVzdHIsIGlzdHIsIG1hdGNoRnJvbSkgPT4gZXN0ci5pbmRleE9mKGlzdHIsIG1hdGNoRnJvbSkgPT09IG1hdGNoRnJvbVxufTtcbklNYXNrLk1hc2tlZEVudW0gPSBNYXNrZWRFbnVtO1xuXG5leHBvcnQgeyBNYXNrZWRFbnVtIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCB7IGlzU3RyaW5nLCBpc09iamVjdCwgcGljayB9IGZyb20gJy4uL2NvcmUvdXRpbHMuanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uL2NvcmUvaG9sZGVyLmpzJztcblxuLy8gVE9ETyBjYW4ndCB1c2Ugb3ZlcmxvYWRzIGhlcmUgYmVjYXVzZSBvZiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzUwNzU0XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogc3RyaW5nKTogdHlwZW9mIE1hc2tlZFBhdHRlcm47XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogRGF0ZUNvbnN0cnVjdG9yKTogdHlwZW9mIE1hc2tlZERhdGU7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogTnVtYmVyQ29uc3RydWN0b3IpOiB0eXBlb2YgTWFza2VkTnVtYmVyO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IEFycmF5PGFueT4gfCBBcnJheUNvbnN0cnVjdG9yKTogdHlwZW9mIE1hc2tlZER5bmFtaWM7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogTWFza2VkRGF0ZSk6IHR5cGVvZiBNYXNrZWREYXRlO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE1hc2tlZE51bWJlcik6IHR5cGVvZiBNYXNrZWROdW1iZXI7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogTWFza2VkRW51bSk6IHR5cGVvZiBNYXNrZWRFbnVtO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE1hc2tlZFJhbmdlKTogdHlwZW9mIE1hc2tlZFJhbmdlO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE1hc2tlZFJlZ0V4cCk6IHR5cGVvZiBNYXNrZWRSZWdFeHA7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogTWFza2VkRnVuY3Rpb24pOiB0eXBlb2YgTWFza2VkRnVuY3Rpb247XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogTWFza2VkUGF0dGVybik6IHR5cGVvZiBNYXNrZWRQYXR0ZXJuO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IE1hc2tlZER5bmFtaWMpOiB0eXBlb2YgTWFza2VkRHluYW1pYztcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiBNYXNrZWQpOiB0eXBlb2YgTWFza2VkO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHR5cGVvZiBNYXNrZWQpOiB0eXBlb2YgTWFza2VkO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHR5cGVvZiBNYXNrZWREYXRlKTogdHlwZW9mIE1hc2tlZERhdGU7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogdHlwZW9mIE1hc2tlZE51bWJlcik6IHR5cGVvZiBNYXNrZWROdW1iZXI7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogdHlwZW9mIE1hc2tlZEVudW0pOiB0eXBlb2YgTWFza2VkRW51bTtcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzcyhtYXNrOiB0eXBlb2YgTWFza2VkUmFuZ2UpOiB0eXBlb2YgTWFza2VkUmFuZ2U7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogdHlwZW9mIE1hc2tlZFJlZ0V4cCk6IHR5cGVvZiBNYXNrZWRSZWdFeHA7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogdHlwZW9mIE1hc2tlZEZ1bmN0aW9uKTogdHlwZW9mIE1hc2tlZEZ1bmN0aW9uO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IHR5cGVvZiBNYXNrZWRQYXR0ZXJuKTogdHlwZW9mIE1hc2tlZFBhdHRlcm47XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogdHlwZW9mIE1hc2tlZER5bmFtaWMpOiB0eXBlb2YgTWFza2VkRHluYW1pYztcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYXNrZWRDbGFzczxNYXNrIGV4dGVuZHMgdHlwZW9mIE1hc2tlZD4gKG1hc2s6IE1hc2spOiBNYXNrO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2s6IFJlZ0V4cCk6IHR5cGVvZiBNYXNrZWRSZWdFeHA7XG4vLyBleHBvcnQgZnVuY3Rpb24gbWFza2VkQ2xhc3MobWFzazogKHZhbHVlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiBib29sZWFuKTogdHlwZW9mIE1hc2tlZEZ1bmN0aW9uO1xuXG4vKiogR2V0IE1hc2tlZCBjbGFzcyBieSBtYXNrIHR5cGUgKi9cbmZ1bmN0aW9uIG1hc2tlZENsYXNzKG1hc2spIC8qIFRPRE8gKi97XG4gIGlmIChtYXNrID09IG51bGwpIHRocm93IG5ldyBFcnJvcignbWFzayBwcm9wZXJ0eSBzaG91bGQgYmUgZGVmaW5lZCcpO1xuICBpZiAobWFzayBpbnN0YW5jZW9mIFJlZ0V4cCkgcmV0dXJuIElNYXNrLk1hc2tlZFJlZ0V4cDtcbiAgaWYgKGlzU3RyaW5nKG1hc2spKSByZXR1cm4gSU1hc2suTWFza2VkUGF0dGVybjtcbiAgaWYgKG1hc2sgPT09IERhdGUpIHJldHVybiBJTWFzay5NYXNrZWREYXRlO1xuICBpZiAobWFzayA9PT0gTnVtYmVyKSByZXR1cm4gSU1hc2suTWFza2VkTnVtYmVyO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXNrKSB8fCBtYXNrID09PSBBcnJheSkgcmV0dXJuIElNYXNrLk1hc2tlZER5bmFtaWM7XG4gIGlmIChJTWFzay5NYXNrZWQgJiYgbWFzay5wcm90b3R5cGUgaW5zdGFuY2VvZiBJTWFzay5NYXNrZWQpIHJldHVybiBtYXNrO1xuICBpZiAoSU1hc2suTWFza2VkICYmIG1hc2sgaW5zdGFuY2VvZiBJTWFzay5NYXNrZWQpIHJldHVybiBtYXNrLmNvbnN0cnVjdG9yO1xuICBpZiAobWFzayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSByZXR1cm4gSU1hc2suTWFza2VkRnVuY3Rpb247XG4gIGNvbnNvbGUud2FybignTWFzayBub3QgZm91bmQgZm9yIG1hc2snLCBtYXNrKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gIHJldHVybiBJTWFzay5NYXNrZWQ7XG59XG5mdW5jdGlvbiBub3JtYWxpemVPcHRzKG9wdHMpIHtcbiAgaWYgKCFvcHRzKSB0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbnMgaW4gbm90IGRlZmluZWQnKTtcbiAgaWYgKElNYXNrLk1hc2tlZCkge1xuICAgIGlmIChvcHRzLnByb3RvdHlwZSBpbnN0YW5jZW9mIElNYXNrLk1hc2tlZCkgcmV0dXJuIHtcbiAgICAgIG1hc2s6IG9wdHNcbiAgICB9O1xuXG4gICAgLypcbiAgICAgIGhhbmRsZSBjYXNlcyBsaWtlOlxuICAgICAgMSkgb3B0cyA9IE1hc2tlZFxuICAgICAgMikgb3B0cyA9IHsgbWFzazogTWFza2VkLCAuLi5pbnN0YW5jZU9wdHMgfVxuICAgICovXG4gICAgY29uc3Qge1xuICAgICAgbWFzayA9IHVuZGVmaW5lZCxcbiAgICAgIC4uLmluc3RhbmNlT3B0c1xuICAgIH0gPSBvcHRzIGluc3RhbmNlb2YgSU1hc2suTWFza2VkID8ge1xuICAgICAgbWFzazogb3B0c1xuICAgIH0gOiBpc09iamVjdChvcHRzKSAmJiBvcHRzLm1hc2sgaW5zdGFuY2VvZiBJTWFzay5NYXNrZWQgPyBvcHRzIDoge307XG4gICAgaWYgKG1hc2spIHtcbiAgICAgIGNvbnN0IF9tYXNrID0gbWFzay5tYXNrO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucGljayhtYXNrLCAoXywgaykgPT4gIWsuc3RhcnRzV2l0aCgnXycpKSxcbiAgICAgICAgbWFzazogbWFzay5jb25zdHJ1Y3RvcixcbiAgICAgICAgX21hc2ssXG4gICAgICAgIC4uLmluc3RhbmNlT3B0c1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc09iamVjdChvcHRzKSkgcmV0dXJuIHtcbiAgICBtYXNrOiBvcHRzXG4gIH07XG4gIHJldHVybiB7XG4gICAgLi4ub3B0c1xuICB9O1xufVxuXG4vLyBUT0RPIGNhbid0IHVzZSBvdmVybG9hZHMgaGVyZSBiZWNhdXNlIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNTA3NTRcblxuLy8gRnJvbSBtYXNrZWRcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZCwgUmV0dXJuTWFza2VkPU9wdHM+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gLy8gRnJvbSBtYXNrZWQgY2xhc3Ncbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZE9wdGlvbnM8dHlwZW9mIE1hc2tlZD4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZD1JbnN0YW5jZVR5cGU8T3B0c1snbWFzayddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWREYXRlPiwgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkRGF0ZT1NYXNrZWREYXRlPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWROdW1iZXI+LCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWROdW1iZXI9TWFza2VkTnVtYmVyPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWRFbnVtPiwgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkRW51bT1NYXNrZWRFbnVtPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWRSYW5nZT4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZFJhbmdlPU1hc2tlZFJhbmdlPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWRSZWdFeHA+LCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWRSZWdFeHA9TWFza2VkUmVnRXhwPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWRGdW5jdGlvbj4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZEZ1bmN0aW9uPU1hc2tlZEZ1bmN0aW9uPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWRQYXR0ZXJuPiwgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkUGF0dGVybj1NYXNrZWRQYXR0ZXJuPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVNYXNrPE9wdHMgZXh0ZW5kcyBNYXNrZWRPcHRpb25zPHR5cGVvZiBNYXNrZWREeW5hbWljPiwgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkRHluYW1pYz1NYXNrZWREeW5hbWljPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG4vLyAvLyBGcm9tIG1hc2sgb3B0c1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczxNYXNrZWQ+LCBSZXR1cm5NYXNrZWQ9T3B0cyBleHRlbmRzIE1hc2tlZE9wdGlvbnM8aW5mZXIgTT4gPyBNIDogbmV2ZXI+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkTnVtYmVyT3B0aW9ucywgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkTnVtYmVyPU1hc2tlZE51bWJlcjxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkRGF0ZUZhY3RvcnlPcHRpb25zLCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWREYXRlPU1hc2tlZERhdGU8T3B0c1sncGFyZW50J10+PiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZEVudW1PcHRpb25zLCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWRFbnVtPU1hc2tlZEVudW08T3B0c1sncGFyZW50J10+PiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZFJhbmdlT3B0aW9ucywgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkUmFuZ2U9TWFza2VkUmFuZ2U8T3B0c1sncGFyZW50J10+PiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZFBhdHRlcm5PcHRpb25zLCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWRQYXR0ZXJuPU1hc2tlZFBhdHRlcm48T3B0c1sncGFyZW50J10+PiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZER5bmFtaWNPcHRpb25zLCBSZXR1cm5NYXNrZWQgZXh0ZW5kcyBNYXNrZWREeW5hbWljPU1hc2tlZER5bmFtaWM8T3B0c1sncGFyZW50J10+PiAob3B0czogT3B0cyk6IFJldHVybk1hc2tlZDtcbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1hc2s8T3B0cyBleHRlbmRzIE1hc2tlZE9wdGlvbnM8UmVnRXhwPiwgUmV0dXJuTWFza2VkIGV4dGVuZHMgTWFza2VkUmVnRXhwPU1hc2tlZFJlZ0V4cDxPcHRzWydwYXJlbnQnXT4+IChvcHRzOiBPcHRzKTogUmV0dXJuTWFza2VkO1xuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFzazxPcHRzIGV4dGVuZHMgTWFza2VkT3B0aW9uczxGdW5jdGlvbj4sIFJldHVybk1hc2tlZCBleHRlbmRzIE1hc2tlZEZ1bmN0aW9uPU1hc2tlZEZ1bmN0aW9uPE9wdHNbJ3BhcmVudCddPj4gKG9wdHM6IE9wdHMpOiBSZXR1cm5NYXNrZWQ7XG5cbi8qKiBDcmVhdGVzIG5ldyB7QGxpbmsgTWFza2VkfSBkZXBlbmRpbmcgb24gbWFzayB0eXBlICovXG5mdW5jdGlvbiBjcmVhdGVNYXNrKG9wdHMpIHtcbiAgaWYgKElNYXNrLk1hc2tlZCAmJiBvcHRzIGluc3RhbmNlb2YgSU1hc2suTWFza2VkKSByZXR1cm4gb3B0cztcbiAgY29uc3Qgbk9wdHMgPSBub3JtYWxpemVPcHRzKG9wdHMpO1xuICBjb25zdCBNYXNrZWRDbGFzcyA9IG1hc2tlZENsYXNzKG5PcHRzLm1hc2spO1xuICBpZiAoIU1hc2tlZENsYXNzKSB0aHJvdyBuZXcgRXJyb3IoXCJNYXNrZWQgY2xhc3MgaXMgbm90IGZvdW5kIGZvciBwcm92aWRlZCBtYXNrIFwiICsgbk9wdHMubWFzayArIFwiLCBhcHByb3ByaWF0ZSBtb2R1bGUgbmVlZHMgdG8gYmUgaW1wb3J0ZWQgbWFudWFsbHkgYmVmb3JlIGNyZWF0aW5nIG1hc2suXCIpO1xuICBpZiAobk9wdHMubWFzayA9PT0gTWFza2VkQ2xhc3MpIGRlbGV0ZSBuT3B0cy5tYXNrO1xuICBpZiAobk9wdHMuX21hc2spIHtcbiAgICBuT3B0cy5tYXNrID0gbk9wdHMuX21hc2s7XG4gICAgZGVsZXRlIG5PcHRzLl9tYXNrO1xuICB9XG4gIHJldHVybiBuZXcgTWFza2VkQ2xhc3Mobk9wdHMpO1xufVxuSU1hc2suY3JlYXRlTWFzayA9IGNyZWF0ZU1hc2s7XG5cbmV4cG9ydCB7IGNyZWF0ZU1hc2sgYXMgZGVmYXVsdCwgbWFza2VkQ2xhc3MsIG5vcm1hbGl6ZU9wdHMgfTtcbiIsImltcG9ydCBNYXNrZWQgZnJvbSAnLi9iYXNlLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuLi9jb3JlL2NvbnRpbnVvdXMtdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi4vY29yZS91dGlscy5qcyc7XG5cbi8qKiBNYXNraW5nIGJ5IGN1c3RvbSBGdW5jdGlvbiAqL1xuY2xhc3MgTWFza2VkRnVuY3Rpb24gZXh0ZW5kcyBNYXNrZWQge1xuICAvKiogKi9cblxuICAvKiogRW5hYmxlIGNoYXJhY3RlcnMgb3ZlcndyaXRpbmcgKi9cblxuICAvKiogKi9cblxuICAvKiogKi9cblxuICAvKiogKi9cblxuICB1cGRhdGVPcHRpb25zKG9wdHMpIHtcbiAgICBzdXBlci51cGRhdGVPcHRpb25zKG9wdHMpO1xuICB9XG4gIF91cGRhdGUob3B0cykge1xuICAgIHN1cGVyLl91cGRhdGUoe1xuICAgICAgLi4ub3B0cyxcbiAgICAgIHZhbGlkYXRlOiBvcHRzLm1hc2tcbiAgICB9KTtcbiAgfVxufVxuSU1hc2suTWFza2VkRnVuY3Rpb24gPSBNYXNrZWRGdW5jdGlvbjtcblxuZXhwb3J0IHsgTWFza2VkRnVuY3Rpb24gYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IHsgZXNjYXBlUmVnRXhwLCBESVJFQ1RJT04gfSBmcm9tICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCBDaGFuZ2VEZXRhaWxzIGZyb20gJy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0IE1hc2tlZCBmcm9tICcuL2Jhc2UuanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uL2NvcmUvaG9sZGVyLmpzJztcbmltcG9ydCAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5cbnZhciBfTWFza2VkTnVtYmVyO1xuLyoqIE51bWJlciBtYXNrICovXG5jbGFzcyBNYXNrZWROdW1iZXIgZXh0ZW5kcyBNYXNrZWQge1xuICAvKiogU2luZ2xlIGNoYXIgKi9cblxuICAvKiogU2luZ2xlIGNoYXIgKi9cblxuICAvKiogQXJyYXkgb2Ygc2luZ2xlIGNoYXJzICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqIERpZ2l0cyBhZnRlciBwb2ludCAqL1xuXG4gIC8qKiBGbGFnIHRvIHJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyB6ZXJvcyBpbiB0aGUgZW5kIG9mIGVkaXRpbmcgKi9cblxuICAvKiogRmxhZyB0byBwYWQgdHJhaWxpbmcgemVyb3MgYWZ0ZXIgcG9pbnQgaW4gdGhlIGVuZCBvZiBlZGl0aW5nICovXG5cbiAgLyoqIEVuYWJsZSBjaGFyYWN0ZXJzIG92ZXJ3cml0aW5nICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqIEZvcm1hdCB0eXBlZCB2YWx1ZSB0byBzdHJpbmcgKi9cblxuICAvKiogUGFyc2Ugc3RyaW5nIHRvIGdldCB0eXBlZCB2YWx1ZSAqL1xuXG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBzdXBlcih7XG4gICAgICAuLi5NYXNrZWROdW1iZXIuREVGQVVMVFMsXG4gICAgICAuLi5vcHRzXG4gICAgfSk7XG4gIH1cbiAgdXBkYXRlT3B0aW9ucyhvcHRzKSB7XG4gICAgc3VwZXIudXBkYXRlT3B0aW9ucyhvcHRzKTtcbiAgfVxuICBfdXBkYXRlKG9wdHMpIHtcbiAgICBzdXBlci5fdXBkYXRlKG9wdHMpO1xuICAgIHRoaXMuX3VwZGF0ZVJlZ0V4cHMoKTtcbiAgfVxuICBfdXBkYXRlUmVnRXhwcygpIHtcbiAgICBjb25zdCBzdGFydCA9ICdeJyArICh0aGlzLmFsbG93TmVnYXRpdmUgPyAnWyt8XFxcXC1dPycgOiAnJyk7XG4gICAgY29uc3QgbWlkID0gJ1xcXFxkKic7XG4gICAgY29uc3QgZW5kID0gKHRoaXMuc2NhbGUgPyBcIihcIiArIGVzY2FwZVJlZ0V4cCh0aGlzLnJhZGl4KSArIFwiXFxcXGR7MCxcIiArIHRoaXMuc2NhbGUgKyBcIn0pP1wiIDogJycpICsgJyQnO1xuICAgIHRoaXMuX251bWJlclJlZ0V4cCA9IG5ldyBSZWdFeHAoc3RhcnQgKyBtaWQgKyBlbmQpO1xuICAgIHRoaXMuX21hcFRvUmFkaXhSZWdFeHAgPSBuZXcgUmVnRXhwKFwiW1wiICsgdGhpcy5tYXBUb1JhZGl4Lm1hcChlc2NhcGVSZWdFeHApLmpvaW4oJycpICsgXCJdXCIsICdnJyk7XG4gICAgdGhpcy5fdGhvdXNhbmRzU2VwYXJhdG9yUmVnRXhwID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGhpcy50aG91c2FuZHNTZXBhcmF0b3IpLCAnZycpO1xuICB9XG4gIF9yZW1vdmVUaG91c2FuZHNTZXBhcmF0b3JzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UodGhpcy5fdGhvdXNhbmRzU2VwYXJhdG9yUmVnRXhwLCAnJyk7XG4gIH1cbiAgX2luc2VydFRob3VzYW5kc1NlcGFyYXRvcnModmFsdWUpIHtcbiAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTAxMTAyL2hvdy10by1wcmludC1hLW51bWJlci13aXRoLWNvbW1hcy1hcy10aG91c2FuZHMtc2VwYXJhdG9ycy1pbi1qYXZhc2NyaXB0XG4gICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdCh0aGlzLnJhZGl4KTtcbiAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yKTtcbiAgICByZXR1cm4gcGFydHMuam9pbih0aGlzLnJhZGl4KTtcbiAgfVxuICBkb1ByZXBhcmVDaGFyKGNoLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBbcHJlcENoLCBkZXRhaWxzXSA9IHN1cGVyLmRvUHJlcGFyZUNoYXIodGhpcy5fcmVtb3ZlVGhvdXNhbmRzU2VwYXJhdG9ycyh0aGlzLnNjYWxlICYmIHRoaXMubWFwVG9SYWRpeC5sZW5ndGggJiYgKFxuICAgIC8qXG4gICAgICByYWRpeCBzaG91bGQgYmUgbWFwcGVkIHdoZW5cbiAgICAgIDEpIGlucHV0IGlzIGRvbmUgZnJvbSBrZXlib2FyZCA9IGZsYWdzLmlucHV0ICYmIGZsYWdzLnJhd1xuICAgICAgMikgdW5tYXNrZWQgdmFsdWUgaXMgc2V0ID0gIWZsYWdzLmlucHV0ICYmICFmbGFncy5yYXdcbiAgICAgIGFuZCBzaG91bGQgbm90IGJlIG1hcHBlZCB3aGVuXG4gICAgICAxKSB2YWx1ZSBpcyBzZXQgPSBmbGFncy5pbnB1dCAmJiAhZmxhZ3MucmF3XG4gICAgICAyKSByYXcgdmFsdWUgaXMgc2V0ID0gIWZsYWdzLmlucHV0ICYmIGZsYWdzLnJhd1xuICAgICovXG4gICAgZmxhZ3MuaW5wdXQgJiYgZmxhZ3MucmF3IHx8ICFmbGFncy5pbnB1dCAmJiAhZmxhZ3MucmF3KSA/IGNoLnJlcGxhY2UodGhpcy5fbWFwVG9SYWRpeFJlZ0V4cCwgdGhpcy5yYWRpeCkgOiBjaCksIGZsYWdzKTtcbiAgICBpZiAoY2ggJiYgIXByZXBDaCkgZGV0YWlscy5za2lwID0gdHJ1ZTtcbiAgICBpZiAocHJlcENoICYmICF0aGlzLmFsbG93UG9zaXRpdmUgJiYgIXRoaXMudmFsdWUgJiYgcHJlcENoICE9PSAnLScpIGRldGFpbHMuYWdncmVnYXRlKHRoaXMuX2FwcGVuZENoYXIoJy0nKSk7XG4gICAgcmV0dXJuIFtwcmVwQ2gsIGRldGFpbHNdO1xuICB9XG4gIF9zZXBhcmF0b3JzQ291bnQodG8sIGV4dGVuZE9uU2VwYXJhdG9ycykge1xuICAgIGlmIChleHRlbmRPblNlcGFyYXRvcnMgPT09IHZvaWQgMCkge1xuICAgICAgZXh0ZW5kT25TZXBhcmF0b3JzID0gZmFsc2U7XG4gICAgfVxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChsZXQgcG9zID0gMDsgcG9zIDwgdG87ICsrcG9zKSB7XG4gICAgICBpZiAodGhpcy5fdmFsdWUuaW5kZXhPZih0aGlzLnRob3VzYW5kc1NlcGFyYXRvciwgcG9zKSA9PT0gcG9zKSB7XG4gICAgICAgICsrY291bnQ7XG4gICAgICAgIGlmIChleHRlbmRPblNlcGFyYXRvcnMpIHRvICs9IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG4gIF9zZXBhcmF0b3JzQ291bnRGcm9tU2xpY2Uoc2xpY2UpIHtcbiAgICBpZiAoc2xpY2UgPT09IHZvaWQgMCkge1xuICAgICAgc2xpY2UgPSB0aGlzLl92YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NlcGFyYXRvcnNDb3VudCh0aGlzLl9yZW1vdmVUaG91c2FuZHNTZXBhcmF0b3JzKHNsaWNlKS5sZW5ndGgsIHRydWUpO1xuICB9XG4gIGV4dHJhY3RJbnB1dChmcm9tUG9zLCB0b1BvcywgZmxhZ3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICBbZnJvbVBvcywgdG9Qb3NdID0gdGhpcy5fYWRqdXN0UmFuZ2VXaXRoU2VwYXJhdG9ycyhmcm9tUG9zLCB0b1Bvcyk7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW92ZVRob3VzYW5kc1NlcGFyYXRvcnMoc3VwZXIuZXh0cmFjdElucHV0KGZyb21Qb3MsIHRvUG9zLCBmbGFncykpO1xuICB9XG4gIF9hcHBlbmRDaGFyUmF3KGNoLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBwcmV2QmVmb3JlVGFpbFZhbHVlID0gZmxhZ3MudGFpbCAmJiBmbGFncy5fYmVmb3JlVGFpbFN0YXRlID8gZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZS5fdmFsdWUgOiB0aGlzLl92YWx1ZTtcbiAgICBjb25zdCBwcmV2QmVmb3JlVGFpbFNlcGFyYXRvcnNDb3VudCA9IHRoaXMuX3NlcGFyYXRvcnNDb3VudEZyb21TbGljZShwcmV2QmVmb3JlVGFpbFZhbHVlKTtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuX3JlbW92ZVRob3VzYW5kc1NlcGFyYXRvcnModGhpcy52YWx1ZSk7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSArPSBjaDtcbiAgICBjb25zdCBudW0gPSB0aGlzLm51bWJlcjtcbiAgICBsZXQgYWNjZXB0ZWQgPSAhaXNOYU4obnVtKTtcbiAgICBsZXQgc2tpcCA9IGZhbHNlO1xuICAgIGlmIChhY2NlcHRlZCkge1xuICAgICAgbGV0IGZpeGVkTnVtO1xuICAgICAgaWYgKHRoaXMubWluICE9IG51bGwgJiYgdGhpcy5taW4gPCAwICYmIHRoaXMubnVtYmVyIDwgdGhpcy5taW4pIGZpeGVkTnVtID0gdGhpcy5taW47XG4gICAgICBpZiAodGhpcy5tYXggIT0gbnVsbCAmJiB0aGlzLm1heCA+IDAgJiYgdGhpcy5udW1iZXIgPiB0aGlzLm1heCkgZml4ZWROdW0gPSB0aGlzLm1heDtcbiAgICAgIGlmIChmaXhlZE51bSAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9maXgpIHtcbiAgICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuZm9ybWF0KGZpeGVkTnVtLCB0aGlzKS5yZXBsYWNlKE1hc2tlZE51bWJlci5VTk1BU0tFRF9SQURJWCwgdGhpcy5yYWRpeCk7XG4gICAgICAgICAgc2tpcCB8fCAoc2tpcCA9IG9sZFZhbHVlID09PSB0aGlzLl92YWx1ZSAmJiAhZmxhZ3MudGFpbCk7IC8vIGlmIG5vdCBjaGFuZ2VkIG9uIHRhaWwgaXQncyBzdGlsbCBvayB0byBwcm9jZWVkXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWNjZXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWNjZXB0ZWQgJiYgKGFjY2VwdGVkID0gQm9vbGVhbih0aGlzLl92YWx1ZS5tYXRjaCh0aGlzLl9udW1iZXJSZWdFeHApKSk7XG4gICAgfVxuICAgIGxldCBhcHBlbmREZXRhaWxzO1xuICAgIGlmICghYWNjZXB0ZWQpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gb2xkVmFsdWU7XG4gICAgICBhcHBlbmREZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwZW5kRGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKHtcbiAgICAgICAgaW5zZXJ0ZWQ6IHRoaXMuX3ZhbHVlLnNsaWNlKG9sZFZhbHVlLmxlbmd0aCksXG4gICAgICAgIHJhd0luc2VydGVkOiBza2lwID8gJycgOiBjaCxcbiAgICAgICAgc2tpcFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5faW5zZXJ0VGhvdXNhbmRzU2VwYXJhdG9ycyh0aGlzLl92YWx1ZSk7XG4gICAgY29uc3QgYmVmb3JlVGFpbFZhbHVlID0gZmxhZ3MudGFpbCAmJiBmbGFncy5fYmVmb3JlVGFpbFN0YXRlID8gZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZS5fdmFsdWUgOiB0aGlzLl92YWx1ZTtcbiAgICBjb25zdCBiZWZvcmVUYWlsU2VwYXJhdG9yc0NvdW50ID0gdGhpcy5fc2VwYXJhdG9yc0NvdW50RnJvbVNsaWNlKGJlZm9yZVRhaWxWYWx1ZSk7XG4gICAgYXBwZW5kRGV0YWlscy50YWlsU2hpZnQgKz0gKGJlZm9yZVRhaWxTZXBhcmF0b3JzQ291bnQgLSBwcmV2QmVmb3JlVGFpbFNlcGFyYXRvcnNDb3VudCkgKiB0aGlzLnRob3VzYW5kc1NlcGFyYXRvci5sZW5ndGg7XG4gICAgcmV0dXJuIGFwcGVuZERldGFpbHM7XG4gIH1cbiAgX2ZpbmRTZXBhcmF0b3JBcm91bmQocG9zKSB7XG4gICAgaWYgKHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yKSB7XG4gICAgICBjb25zdCBzZWFyY2hGcm9tID0gcG9zIC0gdGhpcy50aG91c2FuZHNTZXBhcmF0b3IubGVuZ3RoICsgMTtcbiAgICAgIGNvbnN0IHNlcGFyYXRvclBvcyA9IHRoaXMudmFsdWUuaW5kZXhPZih0aGlzLnRob3VzYW5kc1NlcGFyYXRvciwgc2VhcmNoRnJvbSk7XG4gICAgICBpZiAoc2VwYXJhdG9yUG9zIDw9IHBvcykgcmV0dXJuIHNlcGFyYXRvclBvcztcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIF9hZGp1c3RSYW5nZVdpdGhTZXBhcmF0b3JzKGZyb20sIHRvKSB7XG4gICAgY29uc3Qgc2VwYXJhdG9yQXJvdW5kRnJvbVBvcyA9IHRoaXMuX2ZpbmRTZXBhcmF0b3JBcm91bmQoZnJvbSk7XG4gICAgaWYgKHNlcGFyYXRvckFyb3VuZEZyb21Qb3MgPj0gMCkgZnJvbSA9IHNlcGFyYXRvckFyb3VuZEZyb21Qb3M7XG4gICAgY29uc3Qgc2VwYXJhdG9yQXJvdW5kVG9Qb3MgPSB0aGlzLl9maW5kU2VwYXJhdG9yQXJvdW5kKHRvKTtcbiAgICBpZiAoc2VwYXJhdG9yQXJvdW5kVG9Qb3MgPj0gMCkgdG8gPSBzZXBhcmF0b3JBcm91bmRUb1BvcyArIHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLmxlbmd0aDtcbiAgICByZXR1cm4gW2Zyb20sIHRvXTtcbiAgfVxuICByZW1vdmUoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICBbZnJvbVBvcywgdG9Qb3NdID0gdGhpcy5fYWRqdXN0UmFuZ2VXaXRoU2VwYXJhdG9ycyhmcm9tUG9zLCB0b1Bvcyk7XG4gICAgY29uc3QgdmFsdWVCZWZvcmVQb3MgPSB0aGlzLnZhbHVlLnNsaWNlKDAsIGZyb21Qb3MpO1xuICAgIGNvbnN0IHZhbHVlQWZ0ZXJQb3MgPSB0aGlzLnZhbHVlLnNsaWNlKHRvUG9zKTtcbiAgICBjb25zdCBwcmV2QmVmb3JlVGFpbFNlcGFyYXRvcnNDb3VudCA9IHRoaXMuX3NlcGFyYXRvcnNDb3VudCh2YWx1ZUJlZm9yZVBvcy5sZW5ndGgpO1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5faW5zZXJ0VGhvdXNhbmRzU2VwYXJhdG9ycyh0aGlzLl9yZW1vdmVUaG91c2FuZHNTZXBhcmF0b3JzKHZhbHVlQmVmb3JlUG9zICsgdmFsdWVBZnRlclBvcykpO1xuICAgIGNvbnN0IGJlZm9yZVRhaWxTZXBhcmF0b3JzQ291bnQgPSB0aGlzLl9zZXBhcmF0b3JzQ291bnRGcm9tU2xpY2UodmFsdWVCZWZvcmVQb3MpO1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscyh7XG4gICAgICB0YWlsU2hpZnQ6IChiZWZvcmVUYWlsU2VwYXJhdG9yc0NvdW50IC0gcHJldkJlZm9yZVRhaWxTZXBhcmF0b3JzQ291bnQpICogdGhpcy50aG91c2FuZHNTZXBhcmF0b3IubGVuZ3RoXG4gICAgfSk7XG4gIH1cbiAgbmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgZGlyZWN0aW9uKSB7XG4gICAgaWYgKCF0aGlzLnRob3VzYW5kc1NlcGFyYXRvcikgcmV0dXJuIGN1cnNvclBvcztcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSBESVJFQ1RJT04uTk9ORTpcbiAgICAgIGNhc2UgRElSRUNUSU9OLkxFRlQ6XG4gICAgICBjYXNlIERJUkVDVElPTi5GT1JDRV9MRUZUOlxuICAgICAgICB7XG4gICAgICAgICAgY29uc3Qgc2VwYXJhdG9yQXRMZWZ0UG9zID0gdGhpcy5fZmluZFNlcGFyYXRvckFyb3VuZChjdXJzb3JQb3MgLSAxKTtcbiAgICAgICAgICBpZiAoc2VwYXJhdG9yQXRMZWZ0UG9zID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcGFyYXRvckF0TGVmdEVuZFBvcyA9IHNlcGFyYXRvckF0TGVmdFBvcyArIHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChjdXJzb3JQb3MgPCBzZXBhcmF0b3JBdExlZnRFbmRQb3MgfHwgdGhpcy52YWx1ZS5sZW5ndGggPD0gc2VwYXJhdG9yQXRMZWZ0RW5kUG9zIHx8IGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkZPUkNFX0xFRlQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlcGFyYXRvckF0TGVmdFBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgRElSRUNUSU9OLlJJR0hUOlxuICAgICAgY2FzZSBESVJFQ1RJT04uRk9SQ0VfUklHSFQ6XG4gICAgICAgIHtcbiAgICAgICAgICBjb25zdCBzZXBhcmF0b3JBdFJpZ2h0UG9zID0gdGhpcy5fZmluZFNlcGFyYXRvckFyb3VuZChjdXJzb3JQb3MpO1xuICAgICAgICAgIGlmIChzZXBhcmF0b3JBdFJpZ2h0UG9zID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiBzZXBhcmF0b3JBdFJpZ2h0UG9zICsgdGhpcy50aG91c2FuZHNTZXBhcmF0b3IubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3Vyc29yUG9zO1xuICB9XG4gIGRvQ29tbWl0KCkge1xuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICBjb25zdCBudW1iZXIgPSB0aGlzLm51bWJlcjtcbiAgICAgIGxldCB2YWxpZG51bSA9IG51bWJlcjtcblxuICAgICAgLy8gY2hlY2sgYm91bmRzXG4gICAgICBpZiAodGhpcy5taW4gIT0gbnVsbCkgdmFsaWRudW0gPSBNYXRoLm1heCh2YWxpZG51bSwgdGhpcy5taW4pO1xuICAgICAgaWYgKHRoaXMubWF4ICE9IG51bGwpIHZhbGlkbnVtID0gTWF0aC5taW4odmFsaWRudW0sIHRoaXMubWF4KTtcbiAgICAgIGlmICh2YWxpZG51bSAhPT0gbnVtYmVyKSB0aGlzLnVubWFza2VkVmFsdWUgPSB0aGlzLmZvcm1hdCh2YWxpZG51bSwgdGhpcyk7XG4gICAgICBsZXQgZm9ybWF0dGVkID0gdGhpcy52YWx1ZTtcbiAgICAgIGlmICh0aGlzLm5vcm1hbGl6ZVplcm9zKSBmb3JtYXR0ZWQgPSB0aGlzLl9ub3JtYWxpemVaZXJvcyhmb3JtYXR0ZWQpO1xuICAgICAgaWYgKHRoaXMucGFkRnJhY3Rpb25hbFplcm9zICYmIHRoaXMuc2NhbGUgPiAwKSBmb3JtYXR0ZWQgPSB0aGlzLl9wYWRGcmFjdGlvbmFsWmVyb3MoZm9ybWF0dGVkKTtcbiAgICAgIHRoaXMuX3ZhbHVlID0gZm9ybWF0dGVkO1xuICAgIH1cbiAgICBzdXBlci5kb0NvbW1pdCgpO1xuICB9XG4gIF9ub3JtYWxpemVaZXJvcyh2YWx1ZSkge1xuICAgIGNvbnN0IHBhcnRzID0gdGhpcy5fcmVtb3ZlVGhvdXNhbmRzU2VwYXJhdG9ycyh2YWx1ZSkuc3BsaXQodGhpcy5yYWRpeCk7XG5cbiAgICAvLyByZW1vdmUgbGVhZGluZyB6ZXJvc1xuICAgIHBhcnRzWzBdID0gcGFydHNbMF0ucmVwbGFjZSgvXihcXEQqKSgwKikoXFxkKikvLCAobWF0Y2gsIHNpZ24sIHplcm9zLCBudW0pID0+IHNpZ24gKyBudW0pO1xuICAgIC8vIGFkZCBsZWFkaW5nIHplcm9cbiAgICBpZiAodmFsdWUubGVuZ3RoICYmICEvXFxkJC8udGVzdChwYXJ0c1swXSkpIHBhcnRzWzBdID0gcGFydHNbMF0gKyAnMCc7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHBhcnRzWzFdID0gcGFydHNbMV0ucmVwbGFjZSgvMCokLywgJycpOyAvLyByZW1vdmUgdHJhaWxpbmcgemVyb3NcbiAgICAgIGlmICghcGFydHNbMV0ubGVuZ3RoKSBwYXJ0cy5sZW5ndGggPSAxOyAvLyByZW1vdmUgZnJhY3Rpb25hbFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faW5zZXJ0VGhvdXNhbmRzU2VwYXJhdG9ycyhwYXJ0cy5qb2luKHRoaXMucmFkaXgpKTtcbiAgfVxuICBfcGFkRnJhY3Rpb25hbFplcm9zKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIHZhbHVlO1xuICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQodGhpcy5yYWRpeCk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHBhcnRzLnB1c2goJycpO1xuICAgIHBhcnRzWzFdID0gcGFydHNbMV0ucGFkRW5kKHRoaXMuc2NhbGUsICcwJyk7XG4gICAgcmV0dXJuIHBhcnRzLmpvaW4odGhpcy5yYWRpeCk7XG4gIH1cbiAgZG9Ta2lwSW52YWxpZChjaCwgZmxhZ3MsIGNoZWNrVGFpbCkge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBkcm9wRnJhY3Rpb25hbCA9IHRoaXMuc2NhbGUgPT09IDAgJiYgY2ggIT09IHRoaXMudGhvdXNhbmRzU2VwYXJhdG9yICYmIChjaCA9PT0gdGhpcy5yYWRpeCB8fCBjaCA9PT0gTWFza2VkTnVtYmVyLlVOTUFTS0VEX1JBRElYIHx8IHRoaXMubWFwVG9SYWRpeC5pbmNsdWRlcyhjaCkpO1xuICAgIHJldHVybiBzdXBlci5kb1NraXBJbnZhbGlkKGNoLCBmbGFncywgY2hlY2tUYWlsKSAmJiAhZHJvcEZyYWN0aW9uYWw7XG4gIH1cbiAgZ2V0IHVubWFza2VkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbW92ZVRob3VzYW5kc1NlcGFyYXRvcnModGhpcy5fbm9ybWFsaXplWmVyb3ModGhpcy52YWx1ZSkpLnJlcGxhY2UodGhpcy5yYWRpeCwgTWFza2VkTnVtYmVyLlVOTUFTS0VEX1JBRElYKTtcbiAgfVxuICBzZXQgdW5tYXNrZWRWYWx1ZSh1bm1hc2tlZFZhbHVlKSB7XG4gICAgc3VwZXIudW5tYXNrZWRWYWx1ZSA9IHVubWFza2VkVmFsdWU7XG4gIH1cbiAgZ2V0IHR5cGVkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2UodGhpcy51bm1hc2tlZFZhbHVlLCB0aGlzKTtcbiAgfVxuICBzZXQgdHlwZWRWYWx1ZShuKSB7XG4gICAgdGhpcy5yYXdJbnB1dFZhbHVlID0gdGhpcy5mb3JtYXQobiwgdGhpcykucmVwbGFjZShNYXNrZWROdW1iZXIuVU5NQVNLRURfUkFESVgsIHRoaXMucmFkaXgpO1xuICB9XG5cbiAgLyoqIFBhcnNlZCBOdW1iZXIgKi9cbiAgZ2V0IG51bWJlcigpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlZFZhbHVlO1xuICB9XG4gIHNldCBudW1iZXIobnVtYmVyKSB7XG4gICAgdGhpcy50eXBlZFZhbHVlID0gbnVtYmVyO1xuICB9XG4gIGdldCBhbGxvd05lZ2F0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLm1pbiAhPSBudWxsICYmIHRoaXMubWluIDwgMCB8fCB0aGlzLm1heCAhPSBudWxsICYmIHRoaXMubWF4IDwgMDtcbiAgfVxuICBnZXQgYWxsb3dQb3NpdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5taW4gIT0gbnVsbCAmJiB0aGlzLm1pbiA+IDAgfHwgdGhpcy5tYXggIT0gbnVsbCAmJiB0aGlzLm1heCA+IDA7XG4gIH1cbiAgdHlwZWRWYWx1ZUVxdWFscyh2YWx1ZSkge1xuICAgIC8vIGhhbmRsZSAgMCAtPiAnJyBjYXNlICh0eXBlZCA9IDAgZXZlbiBpZiB2YWx1ZSA9ICcnKVxuICAgIC8vIGZvciBkZXRhaWxzIHNlZSBodHRwczovL2dpdGh1Yi5jb20vdU5tQW5OZVIvaW1hc2tqcy9pc3N1ZXMvMTM0XG4gICAgcmV0dXJuIChzdXBlci50eXBlZFZhbHVlRXF1YWxzKHZhbHVlKSB8fCBNYXNrZWROdW1iZXIuRU1QVFlfVkFMVUVTLmluY2x1ZGVzKHZhbHVlKSAmJiBNYXNrZWROdW1iZXIuRU1QVFlfVkFMVUVTLmluY2x1ZGVzKHRoaXMudHlwZWRWYWx1ZSkpICYmICEodmFsdWUgPT09IDAgJiYgdGhpcy52YWx1ZSA9PT0gJycpO1xuICB9XG59XG5fTWFza2VkTnVtYmVyID0gTWFza2VkTnVtYmVyO1xuTWFza2VkTnVtYmVyLlVOTUFTS0VEX1JBRElYID0gJy4nO1xuTWFza2VkTnVtYmVyLkVNUFRZX1ZBTFVFUyA9IFsuLi5NYXNrZWQuRU1QVFlfVkFMVUVTLCAwXTtcbk1hc2tlZE51bWJlci5ERUZBVUxUUyA9IHtcbiAgLi4uTWFza2VkLkRFRkFVTFRTLFxuICBtYXNrOiBOdW1iZXIsXG4gIHJhZGl4OiAnLCcsXG4gIHRob3VzYW5kc1NlcGFyYXRvcjogJycsXG4gIG1hcFRvUmFkaXg6IFtfTWFza2VkTnVtYmVyLlVOTUFTS0VEX1JBRElYXSxcbiAgbWluOiBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUixcbiAgbWF4OiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcbiAgc2NhbGU6IDIsXG4gIG5vcm1hbGl6ZVplcm9zOiB0cnVlLFxuICBwYWRGcmFjdGlvbmFsWmVyb3M6IGZhbHNlLFxuICBwYXJzZTogTnVtYmVyLFxuICBmb3JtYXQ6IG4gPT4gbi50b0xvY2FsZVN0cmluZygnZW4tVVMnLCB7XG4gICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMjBcbiAgfSlcbn07XG5JTWFzay5NYXNrZWROdW1iZXIgPSBNYXNrZWROdW1iZXI7XG5cbmV4cG9ydCB7IE1hc2tlZE51bWJlciBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgQ2hhbmdlRGV0YWlscyBmcm9tICcuLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgeyBESVJFQ1RJT04gfSBmcm9tICcuLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCBNYXNrZWQgZnJvbSAnLi9iYXNlLmpzJztcbmltcG9ydCBjcmVhdGVNYXNrLCB7IG5vcm1hbGl6ZU9wdHMgfSBmcm9tICcuL2ZhY3RvcnkuanMnO1xuaW1wb3J0IENodW5rc1RhaWxEZXRhaWxzIGZyb20gJy4vcGF0dGVybi9jaHVuay10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0IFBhdHRlcm5DdXJzb3IgZnJvbSAnLi9wYXR0ZXJuL2N1cnNvci5qcyc7XG5pbXBvcnQgUGF0dGVybkZpeGVkRGVmaW5pdGlvbiBmcm9tICcuL3BhdHRlcm4vZml4ZWQtZGVmaW5pdGlvbi5qcyc7XG5pbXBvcnQgUGF0dGVybklucHV0RGVmaW5pdGlvbiBmcm9tICcuL3BhdHRlcm4vaW5wdXQtZGVmaW5pdGlvbi5qcyc7XG5pbXBvcnQgJy4vcmVnZXhwLmpzJztcbmltcG9ydCAnLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5cbi8qKiBQYXR0ZXJuIG1hc2sgKi9cbmNsYXNzIE1hc2tlZFBhdHRlcm4gZXh0ZW5kcyBNYXNrZWQge1xuICAvKiogKi9cblxuICAvKiogKi9cblxuICAvKiogU2luZ2xlIGNoYXIgZm9yIGVtcHR5IGlucHV0ICovXG5cbiAgLyoqIFNpbmdsZSBjaGFyIGZvciBmaWxsZWQgaW5wdXQgKi9cblxuICAvKiogU2hvdyBwbGFjZWhvbGRlciBvbmx5IHdoZW4gbmVlZGVkICovXG5cbiAgLyoqIEVuYWJsZSBjaGFyYWN0ZXJzIG92ZXJ3cml0aW5nICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIHN1cGVyKHtcbiAgICAgIC4uLk1hc2tlZFBhdHRlcm4uREVGQVVMVFMsXG4gICAgICAuLi5vcHRzLFxuICAgICAgZGVmaW5pdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIFBhdHRlcm5JbnB1dERlZmluaXRpb24uREVGQVVMVF9ERUZJTklUSU9OUywgb3B0cyA9PSBudWxsID8gdm9pZCAwIDogb3B0cy5kZWZpbml0aW9ucylcbiAgICB9KTtcbiAgfVxuICB1cGRhdGVPcHRpb25zKG9wdHMpIHtcbiAgICBzdXBlci51cGRhdGVPcHRpb25zKG9wdHMpO1xuICB9XG4gIF91cGRhdGUob3B0cykge1xuICAgIG9wdHMuZGVmaW5pdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmluaXRpb25zLCBvcHRzLmRlZmluaXRpb25zKTtcbiAgICBzdXBlci5fdXBkYXRlKG9wdHMpO1xuICAgIHRoaXMuX3JlYnVpbGRNYXNrKCk7XG4gIH1cbiAgX3JlYnVpbGRNYXNrKCkge1xuICAgIGNvbnN0IGRlZnMgPSB0aGlzLmRlZmluaXRpb25zO1xuICAgIHRoaXMuX2Jsb2NrcyA9IFtdO1xuICAgIHRoaXMuZXhwb3NlQmxvY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc3RvcHMgPSBbXTtcbiAgICB0aGlzLl9tYXNrZWRCbG9ja3MgPSB7fTtcbiAgICBjb25zdCBwYXR0ZXJuID0gdGhpcy5tYXNrO1xuICAgIGlmICghcGF0dGVybiB8fCAhZGVmcykgcmV0dXJuO1xuICAgIGxldCB1bm1hc2tpbmdCbG9jayA9IGZhbHNlO1xuICAgIGxldCBvcHRpb25hbEJsb2NrID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAodGhpcy5ibG9ja3MpIHtcbiAgICAgICAgY29uc3QgcCA9IHBhdHRlcm4uc2xpY2UoaSk7XG4gICAgICAgIGNvbnN0IGJOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuYmxvY2tzKS5maWx0ZXIoYk5hbWUgPT4gcC5pbmRleE9mKGJOYW1lKSA9PT0gMCk7XG4gICAgICAgIC8vIG9yZGVyIGJ5IGtleSBsZW5ndGhcbiAgICAgICAgYk5hbWVzLnNvcnQoKGEsIGIpID0+IGIubGVuZ3RoIC0gYS5sZW5ndGgpO1xuICAgICAgICAvLyB1c2UgYmxvY2sgbmFtZSB3aXRoIG1heCBsZW5ndGhcbiAgICAgICAgY29uc3QgYk5hbWUgPSBiTmFtZXNbMF07XG4gICAgICAgIGlmIChiTmFtZSkge1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGV4cG9zZSxcbiAgICAgICAgICAgIHJlcGVhdCxcbiAgICAgICAgICAgIC4uLmJPcHRzXG4gICAgICAgICAgfSA9IG5vcm1hbGl6ZU9wdHModGhpcy5ibG9ja3NbYk5hbWVdKTsgLy8gVE9ETyB0eXBlIE9wdHM8QXJnICYgRXh0cmE+XG4gICAgICAgICAgY29uc3QgYmxvY2tPcHRzID0ge1xuICAgICAgICAgICAgbGF6eTogdGhpcy5sYXp5LFxuICAgICAgICAgICAgZWFnZXI6IHRoaXMuZWFnZXIsXG4gICAgICAgICAgICBwbGFjZWhvbGRlckNoYXI6IHRoaXMucGxhY2Vob2xkZXJDaGFyLFxuICAgICAgICAgICAgZGlzcGxheUNoYXI6IHRoaXMuZGlzcGxheUNoYXIsXG4gICAgICAgICAgICBvdmVyd3JpdGU6IHRoaXMub3ZlcndyaXRlLFxuICAgICAgICAgICAgYXV0b2ZpeDogdGhpcy5hdXRvZml4LFxuICAgICAgICAgICAgLi4uYk9wdHMsXG4gICAgICAgICAgICByZXBlYXQsXG4gICAgICAgICAgICBwYXJlbnQ6IHRoaXNcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IG1hc2tlZEJsb2NrID0gcmVwZWF0ICE9IG51bGwgPyBuZXcgSU1hc2suUmVwZWF0QmxvY2soYmxvY2tPcHRzIC8qIFRPRE8gKi8pIDogY3JlYXRlTWFzayhibG9ja09wdHMpO1xuICAgICAgICAgIGlmIChtYXNrZWRCbG9jaykge1xuICAgICAgICAgICAgdGhpcy5fYmxvY2tzLnB1c2gobWFza2VkQmxvY2spO1xuICAgICAgICAgICAgaWYgKGV4cG9zZSkgdGhpcy5leHBvc2VCbG9jayA9IG1hc2tlZEJsb2NrO1xuXG4gICAgICAgICAgICAvLyBzdG9yZSBibG9jayBpbmRleFxuICAgICAgICAgICAgaWYgKCF0aGlzLl9tYXNrZWRCbG9ja3NbYk5hbWVdKSB0aGlzLl9tYXNrZWRCbG9ja3NbYk5hbWVdID0gW107XG4gICAgICAgICAgICB0aGlzLl9tYXNrZWRCbG9ja3NbYk5hbWVdLnB1c2godGhpcy5fYmxvY2tzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpICs9IGJOYW1lLmxlbmd0aCAtIDE7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCBjaGFyID0gcGF0dGVybltpXTtcbiAgICAgIGxldCBpc0lucHV0ID0gKGNoYXIgaW4gZGVmcyk7XG4gICAgICBpZiAoY2hhciA9PT0gTWFza2VkUGF0dGVybi5TVE9QX0NIQVIpIHtcbiAgICAgICAgdGhpcy5fc3RvcHMucHVzaCh0aGlzLl9ibG9ja3MubGVuZ3RoKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY2hhciA9PT0gJ3snIHx8IGNoYXIgPT09ICd9Jykge1xuICAgICAgICB1bm1hc2tpbmdCbG9jayA9ICF1bm1hc2tpbmdCbG9jaztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY2hhciA9PT0gJ1snIHx8IGNoYXIgPT09ICddJykge1xuICAgICAgICBvcHRpb25hbEJsb2NrID0gIW9wdGlvbmFsQmxvY2s7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGNoYXIgPT09IE1hc2tlZFBhdHRlcm4uRVNDQVBFX0NIQVIpIHtcbiAgICAgICAgKytpO1xuICAgICAgICBjaGFyID0gcGF0dGVybltpXTtcbiAgICAgICAgaWYgKCFjaGFyKSBicmVhaztcbiAgICAgICAgaXNJbnB1dCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgZGVmID0gaXNJbnB1dCA/IG5ldyBQYXR0ZXJuSW5wdXREZWZpbml0aW9uKHtcbiAgICAgICAgaXNPcHRpb25hbDogb3B0aW9uYWxCbG9jayxcbiAgICAgICAgbGF6eTogdGhpcy5sYXp5LFxuICAgICAgICBlYWdlcjogdGhpcy5lYWdlcixcbiAgICAgICAgcGxhY2Vob2xkZXJDaGFyOiB0aGlzLnBsYWNlaG9sZGVyQ2hhcixcbiAgICAgICAgZGlzcGxheUNoYXI6IHRoaXMuZGlzcGxheUNoYXIsXG4gICAgICAgIC4uLm5vcm1hbGl6ZU9wdHMoZGVmc1tjaGFyXSksXG4gICAgICAgIHBhcmVudDogdGhpc1xuICAgICAgfSkgOiBuZXcgUGF0dGVybkZpeGVkRGVmaW5pdGlvbih7XG4gICAgICAgIGNoYXIsXG4gICAgICAgIGVhZ2VyOiB0aGlzLmVhZ2VyLFxuICAgICAgICBpc1VubWFza2luZzogdW5tYXNraW5nQmxvY2tcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fYmxvY2tzLnB1c2goZGVmKTtcbiAgICB9XG4gIH1cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5zdGF0ZSxcbiAgICAgIF9ibG9ja3M6IHRoaXMuX2Jsb2Nrcy5tYXAoYiA9PiBiLnN0YXRlKVxuICAgIH07XG4gIH1cbiAgc2V0IHN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBfYmxvY2tzLFxuICAgICAgLi4ubWFza2VkU3RhdGVcbiAgICB9ID0gc3RhdGU7XG4gICAgdGhpcy5fYmxvY2tzLmZvckVhY2goKGIsIGJpKSA9PiBiLnN0YXRlID0gX2Jsb2Nrc1tiaV0pO1xuICAgIHN1cGVyLnN0YXRlID0gbWFza2VkU3RhdGU7XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgc3VwZXIucmVzZXQoKTtcbiAgICB0aGlzLl9ibG9ja3MuZm9yRWFjaChiID0+IGIucmVzZXQoKSk7XG4gIH1cbiAgZ2V0IGlzQ29tcGxldGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb3NlQmxvY2sgPyB0aGlzLmV4cG9zZUJsb2NrLmlzQ29tcGxldGUgOiB0aGlzLl9ibG9ja3MuZXZlcnkoYiA9PiBiLmlzQ29tcGxldGUpO1xuICB9XG4gIGdldCBpc0ZpbGxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmxvY2tzLmV2ZXJ5KGIgPT4gYi5pc0ZpbGxlZCk7XG4gIH1cbiAgZ2V0IGlzRml4ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jsb2Nrcy5ldmVyeShiID0+IGIuaXNGaXhlZCk7XG4gIH1cbiAgZ2V0IGlzT3B0aW9uYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jsb2Nrcy5ldmVyeShiID0+IGIuaXNPcHRpb25hbCk7XG4gIH1cbiAgZG9Db21taXQoKSB7XG4gICAgdGhpcy5fYmxvY2tzLmZvckVhY2goYiA9PiBiLmRvQ29tbWl0KCkpO1xuICAgIHN1cGVyLmRvQ29tbWl0KCk7XG4gIH1cbiAgZ2V0IHVubWFza2VkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb3NlQmxvY2sgPyB0aGlzLmV4cG9zZUJsb2NrLnVubWFza2VkVmFsdWUgOiB0aGlzLl9ibG9ja3MucmVkdWNlKChzdHIsIGIpID0+IHN0ciArPSBiLnVubWFza2VkVmFsdWUsICcnKTtcbiAgfVxuICBzZXQgdW5tYXNrZWRWYWx1ZSh1bm1hc2tlZFZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZXhwb3NlQmxvY2spIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB0aGlzLmV4dHJhY3RUYWlsKHRoaXMuX2Jsb2NrU3RhcnRQb3ModGhpcy5fYmxvY2tzLmluZGV4T2YodGhpcy5leHBvc2VCbG9jaykpICsgdGhpcy5leHBvc2VCbG9jay5kaXNwbGF5VmFsdWUubGVuZ3RoKTtcbiAgICAgIHRoaXMuZXhwb3NlQmxvY2sudW5tYXNrZWRWYWx1ZSA9IHVubWFza2VkVmFsdWU7XG4gICAgICB0aGlzLmFwcGVuZFRhaWwodGFpbCk7XG4gICAgICB0aGlzLmRvQ29tbWl0KCk7XG4gICAgfSBlbHNlIHN1cGVyLnVubWFza2VkVmFsdWUgPSB1bm1hc2tlZFZhbHVlO1xuICB9XG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5leHBvc2VCbG9jayA/IHRoaXMuZXhwb3NlQmxvY2sudmFsdWUgOlxuICAgIC8vIFRPRE8gcmV0dXJuIF92YWx1ZSB3aGVuIG5vdCBpbiBjaGFuZ2U/XG4gICAgdGhpcy5fYmxvY2tzLnJlZHVjZSgoc3RyLCBiKSA9PiBzdHIgKz0gYi52YWx1ZSwgJycpO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmV4cG9zZUJsb2NrKSB7XG4gICAgICBjb25zdCB0YWlsID0gdGhpcy5leHRyYWN0VGFpbCh0aGlzLl9ibG9ja1N0YXJ0UG9zKHRoaXMuX2Jsb2Nrcy5pbmRleE9mKHRoaXMuZXhwb3NlQmxvY2spKSArIHRoaXMuZXhwb3NlQmxvY2suZGlzcGxheVZhbHVlLmxlbmd0aCk7XG4gICAgICB0aGlzLmV4cG9zZUJsb2NrLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLmFwcGVuZFRhaWwodGFpbCk7XG4gICAgICB0aGlzLmRvQ29tbWl0KCk7XG4gICAgfSBlbHNlIHN1cGVyLnZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHR5cGVkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwb3NlQmxvY2sgPyB0aGlzLmV4cG9zZUJsb2NrLnR5cGVkVmFsdWUgOiBzdXBlci50eXBlZFZhbHVlO1xuICB9XG4gIHNldCB0eXBlZFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZXhwb3NlQmxvY2spIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB0aGlzLmV4dHJhY3RUYWlsKHRoaXMuX2Jsb2NrU3RhcnRQb3ModGhpcy5fYmxvY2tzLmluZGV4T2YodGhpcy5leHBvc2VCbG9jaykpICsgdGhpcy5leHBvc2VCbG9jay5kaXNwbGF5VmFsdWUubGVuZ3RoKTtcbiAgICAgIHRoaXMuZXhwb3NlQmxvY2sudHlwZWRWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5hcHBlbmRUYWlsKHRhaWwpO1xuICAgICAgdGhpcy5kb0NvbW1pdCgpO1xuICAgIH0gZWxzZSBzdXBlci50eXBlZFZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmxvY2tzLnJlZHVjZSgoc3RyLCBiKSA9PiBzdHIgKz0gYi5kaXNwbGF5VmFsdWUsICcnKTtcbiAgfVxuICBhcHBlbmRUYWlsKHRhaWwpIHtcbiAgICByZXR1cm4gc3VwZXIuYXBwZW5kVGFpbCh0YWlsKS5hZ2dyZWdhdGUodGhpcy5fYXBwZW5kUGxhY2Vob2xkZXIoKSk7XG4gIH1cbiAgX2FwcGVuZEVhZ2VyKCkge1xuICAgIHZhciBfdGhpcyRfbWFwUG9zVG9CbG9jaztcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBsZXQgc3RhcnRCbG9ja0luZGV4ID0gKF90aGlzJF9tYXBQb3NUb0Jsb2NrID0gdGhpcy5fbWFwUG9zVG9CbG9jayh0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGgpKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkX21hcFBvc1RvQmxvY2suaW5kZXg7XG4gICAgaWYgKHN0YXJ0QmxvY2tJbmRleCA9PSBudWxsKSByZXR1cm4gZGV0YWlscztcblxuICAgIC8vIFRPRE8gdGVzdCBpZiBpdCB3b3JrcyBmb3IgbmVzdGVkIHBhdHRlcm4gbWFza3NcbiAgICBpZiAodGhpcy5fYmxvY2tzW3N0YXJ0QmxvY2tJbmRleF0uaXNGaWxsZWQpICsrc3RhcnRCbG9ja0luZGV4O1xuICAgIGZvciAobGV0IGJpID0gc3RhcnRCbG9ja0luZGV4OyBiaSA8IHRoaXMuX2Jsb2Nrcy5sZW5ndGg7ICsrYmkpIHtcbiAgICAgIGNvbnN0IGQgPSB0aGlzLl9ibG9ja3NbYmldLl9hcHBlbmRFYWdlcigpO1xuICAgICAgaWYgKCFkLmluc2VydGVkKSBicmVhaztcbiAgICAgIGRldGFpbHMuYWdncmVnYXRlKGQpO1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBfYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgYmxvY2tJdGVyID0gdGhpcy5fbWFwUG9zVG9CbG9jayh0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGgpO1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIGlmICghYmxvY2tJdGVyKSByZXR1cm4gZGV0YWlscztcbiAgICBmb3IgKGxldCBiaSA9IGJsb2NrSXRlci5pbmRleCwgYmxvY2s7IGJsb2NrID0gdGhpcy5fYmxvY2tzW2JpXTsgKytiaSkge1xuICAgICAgdmFyIF9mbGFncyRfYmVmb3JlVGFpbFN0YTtcbiAgICAgIGNvbnN0IGJsb2NrRGV0YWlscyA9IGJsb2NrLl9hcHBlbmRDaGFyKGNoLCB7XG4gICAgICAgIC4uLmZsYWdzLFxuICAgICAgICBfYmVmb3JlVGFpbFN0YXRlOiAoX2ZsYWdzJF9iZWZvcmVUYWlsU3RhID0gZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSkgPT0gbnVsbCB8fCAoX2ZsYWdzJF9iZWZvcmVUYWlsU3RhID0gX2ZsYWdzJF9iZWZvcmVUYWlsU3RhLl9ibG9ja3MpID09IG51bGwgPyB2b2lkIDAgOiBfZmxhZ3MkX2JlZm9yZVRhaWxTdGFbYmldXG4gICAgICB9KTtcbiAgICAgIGRldGFpbHMuYWdncmVnYXRlKGJsb2NrRGV0YWlscyk7XG4gICAgICBpZiAoYmxvY2tEZXRhaWxzLmNvbnN1bWVkKSBicmVhazsgLy8gZ28gbmV4dCBjaGFyXG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIGV4dHJhY3RUYWlsKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgY29uc3QgY2h1bmtUYWlsID0gbmV3IENodW5rc1RhaWxEZXRhaWxzKCk7XG4gICAgaWYgKGZyb21Qb3MgPT09IHRvUG9zKSByZXR1cm4gY2h1bmtUYWlsO1xuICAgIHRoaXMuX2ZvckVhY2hCbG9ja3NJblJhbmdlKGZyb21Qb3MsIHRvUG9zLCAoYiwgYmksIGJGcm9tUG9zLCBiVG9Qb3MpID0+IHtcbiAgICAgIGNvbnN0IGJsb2NrQ2h1bmsgPSBiLmV4dHJhY3RUYWlsKGJGcm9tUG9zLCBiVG9Qb3MpO1xuICAgICAgYmxvY2tDaHVuay5zdG9wID0gdGhpcy5fZmluZFN0b3BCZWZvcmUoYmkpO1xuICAgICAgYmxvY2tDaHVuay5mcm9tID0gdGhpcy5fYmxvY2tTdGFydFBvcyhiaSk7XG4gICAgICBpZiAoYmxvY2tDaHVuayBpbnN0YW5jZW9mIENodW5rc1RhaWxEZXRhaWxzKSBibG9ja0NodW5rLmJsb2NrSW5kZXggPSBiaTtcbiAgICAgIGNodW5rVGFpbC5leHRlbmQoYmxvY2tDaHVuayk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNodW5rVGFpbDtcbiAgfVxuICBleHRyYWN0SW5wdXQoZnJvbVBvcywgdG9Qb3MsIGZsYWdzKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGlmIChmcm9tUG9zID09PSB0b1BvcykgcmV0dXJuICcnO1xuICAgIGxldCBpbnB1dCA9ICcnO1xuICAgIHRoaXMuX2ZvckVhY2hCbG9ja3NJblJhbmdlKGZyb21Qb3MsIHRvUG9zLCAoYiwgXywgZnJvbVBvcywgdG9Qb3MpID0+IHtcbiAgICAgIGlucHV0ICs9IGIuZXh0cmFjdElucHV0KGZyb21Qb3MsIHRvUG9zLCBmbGFncyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG4gIF9maW5kU3RvcEJlZm9yZShibG9ja0luZGV4KSB7XG4gICAgbGV0IHN0b3BCZWZvcmU7XG4gICAgZm9yIChsZXQgc2kgPSAwOyBzaSA8IHRoaXMuX3N0b3BzLmxlbmd0aDsgKytzaSkge1xuICAgICAgY29uc3Qgc3RvcCA9IHRoaXMuX3N0b3BzW3NpXTtcbiAgICAgIGlmIChzdG9wIDw9IGJsb2NrSW5kZXgpIHN0b3BCZWZvcmUgPSBzdG9wO2Vsc2UgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBzdG9wQmVmb3JlO1xuICB9XG5cbiAgLyoqIEFwcGVuZHMgcGxhY2Vob2xkZXIgZGVwZW5kaW5nIG9uIGxhemluZXNzICovXG4gIF9hcHBlbmRQbGFjZWhvbGRlcih0b0Jsb2NrSW5kZXgpIHtcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBpZiAodGhpcy5sYXp5ICYmIHRvQmxvY2tJbmRleCA9PSBudWxsKSByZXR1cm4gZGV0YWlscztcbiAgICBjb25zdCBzdGFydEJsb2NrSXRlciA9IHRoaXMuX21hcFBvc1RvQmxvY2sodGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoKTtcbiAgICBpZiAoIXN0YXJ0QmxvY2tJdGVyKSByZXR1cm4gZGV0YWlscztcbiAgICBjb25zdCBzdGFydEJsb2NrSW5kZXggPSBzdGFydEJsb2NrSXRlci5pbmRleDtcbiAgICBjb25zdCBlbmRCbG9ja0luZGV4ID0gdG9CbG9ja0luZGV4ICE9IG51bGwgPyB0b0Jsb2NrSW5kZXggOiB0aGlzLl9ibG9ja3MubGVuZ3RoO1xuICAgIHRoaXMuX2Jsb2Nrcy5zbGljZShzdGFydEJsb2NrSW5kZXgsIGVuZEJsb2NrSW5kZXgpLmZvckVhY2goYiA9PiB7XG4gICAgICBpZiAoIWIubGF6eSB8fCB0b0Jsb2NrSW5kZXggIT0gbnVsbCkge1xuICAgICAgICB2YXIgX2Jsb2NrczI7XG4gICAgICAgIGRldGFpbHMuYWdncmVnYXRlKGIuX2FwcGVuZFBsYWNlaG9sZGVyKChfYmxvY2tzMiA9IGIuX2Jsb2NrcykgPT0gbnVsbCA/IHZvaWQgMCA6IF9ibG9ja3MyLmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG5cbiAgLyoqIEZpbmRzIGJsb2NrIGluIHBvcyAqL1xuICBfbWFwUG9zVG9CbG9jayhwb3MpIHtcbiAgICBsZXQgYWNjVmFsID0gJyc7XG4gICAgZm9yIChsZXQgYmkgPSAwOyBiaSA8IHRoaXMuX2Jsb2Nrcy5sZW5ndGg7ICsrYmkpIHtcbiAgICAgIGNvbnN0IGJsb2NrID0gdGhpcy5fYmxvY2tzW2JpXTtcbiAgICAgIGNvbnN0IGJsb2NrU3RhcnRQb3MgPSBhY2NWYWwubGVuZ3RoO1xuICAgICAgYWNjVmFsICs9IGJsb2NrLmRpc3BsYXlWYWx1ZTtcbiAgICAgIGlmIChwb3MgPD0gYWNjVmFsLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZGV4OiBiaSxcbiAgICAgICAgICBvZmZzZXQ6IHBvcyAtIGJsb2NrU3RhcnRQb3NcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgX2Jsb2NrU3RhcnRQb3MoYmxvY2tJbmRleCkge1xuICAgIHJldHVybiB0aGlzLl9ibG9ja3Muc2xpY2UoMCwgYmxvY2tJbmRleCkucmVkdWNlKChwb3MsIGIpID0+IHBvcyArPSBiLmRpc3BsYXlWYWx1ZS5sZW5ndGgsIDApO1xuICB9XG4gIF9mb3JFYWNoQmxvY2tzSW5SYW5nZShmcm9tUG9zLCB0b1BvcywgZm4pIHtcbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGNvbnN0IGZyb21CbG9ja0l0ZXIgPSB0aGlzLl9tYXBQb3NUb0Jsb2NrKGZyb21Qb3MpO1xuICAgIGlmIChmcm9tQmxvY2tJdGVyKSB7XG4gICAgICBjb25zdCB0b0Jsb2NrSXRlciA9IHRoaXMuX21hcFBvc1RvQmxvY2sodG9Qb3MpO1xuICAgICAgLy8gcHJvY2VzcyBmaXJzdCBibG9ja1xuICAgICAgY29uc3QgaXNTYW1lQmxvY2sgPSB0b0Jsb2NrSXRlciAmJiBmcm9tQmxvY2tJdGVyLmluZGV4ID09PSB0b0Jsb2NrSXRlci5pbmRleDtcbiAgICAgIGNvbnN0IGZyb21CbG9ja1N0YXJ0UG9zID0gZnJvbUJsb2NrSXRlci5vZmZzZXQ7XG4gICAgICBjb25zdCBmcm9tQmxvY2tFbmRQb3MgPSB0b0Jsb2NrSXRlciAmJiBpc1NhbWVCbG9jayA/IHRvQmxvY2tJdGVyLm9mZnNldCA6IHRoaXMuX2Jsb2Nrc1tmcm9tQmxvY2tJdGVyLmluZGV4XS5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgICAgZm4odGhpcy5fYmxvY2tzW2Zyb21CbG9ja0l0ZXIuaW5kZXhdLCBmcm9tQmxvY2tJdGVyLmluZGV4LCBmcm9tQmxvY2tTdGFydFBvcywgZnJvbUJsb2NrRW5kUG9zKTtcbiAgICAgIGlmICh0b0Jsb2NrSXRlciAmJiAhaXNTYW1lQmxvY2spIHtcbiAgICAgICAgLy8gcHJvY2VzcyBpbnRlcm1lZGlhdGUgYmxvY2tzXG4gICAgICAgIGZvciAobGV0IGJpID0gZnJvbUJsb2NrSXRlci5pbmRleCArIDE7IGJpIDwgdG9CbG9ja0l0ZXIuaW5kZXg7ICsrYmkpIHtcbiAgICAgICAgICBmbih0aGlzLl9ibG9ja3NbYmldLCBiaSwgMCwgdGhpcy5fYmxvY2tzW2JpXS5kaXNwbGF5VmFsdWUubGVuZ3RoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByb2Nlc3MgbGFzdCBibG9ja1xuICAgICAgICBmbih0aGlzLl9ibG9ja3NbdG9CbG9ja0l0ZXIuaW5kZXhdLCB0b0Jsb2NrSXRlci5pbmRleCwgMCwgdG9CbG9ja0l0ZXIub2Zmc2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVtb3ZlKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgY29uc3QgcmVtb3ZlRGV0YWlscyA9IHN1cGVyLnJlbW92ZShmcm9tUG9zLCB0b1Bvcyk7XG4gICAgdGhpcy5fZm9yRWFjaEJsb2Nrc0luUmFuZ2UoZnJvbVBvcywgdG9Qb3MsIChiLCBfLCBiRnJvbVBvcywgYlRvUG9zKSA9PiB7XG4gICAgICByZW1vdmVEZXRhaWxzLmFnZ3JlZ2F0ZShiLnJlbW92ZShiRnJvbVBvcywgYlRvUG9zKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlbW92ZURldGFpbHM7XG4gIH1cbiAgbmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICBkaXJlY3Rpb24gPSBESVJFQ1RJT04uTk9ORTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9ibG9ja3MubGVuZ3RoKSByZXR1cm4gMDtcbiAgICBjb25zdCBjdXJzb3IgPSBuZXcgUGF0dGVybkN1cnNvcih0aGlzLCBjdXJzb3JQb3MpO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IERJUkVDVElPTi5OT05FKSB7XG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBOT05FIHNob3VsZCBvbmx5IGdvIG91dCBmcm9tIGZpeGVkIHRvIHRoZSByaWdodCFcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIGlmIChjdXJzb3IucHVzaFJpZ2h0QmVmb3JlSW5wdXQoKSkgcmV0dXJuIGN1cnNvci5wb3M7XG4gICAgICBjdXJzb3IucG9wU3RhdGUoKTtcbiAgICAgIGlmIChjdXJzb3IucHVzaExlZnRCZWZvcmVJbnB1dCgpKSByZXR1cm4gY3Vyc29yLnBvcztcbiAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gRk9SQ0UgaXMgb25seSBhYm91dCBhfCogb3RoZXJ3aXNlIGlzIDBcbiAgICBpZiAoZGlyZWN0aW9uID09PSBESVJFQ1RJT04uTEVGVCB8fCBkaXJlY3Rpb24gPT09IERJUkVDVElPTi5GT1JDRV9MRUZUKSB7XG4gICAgICAvLyB0cnkgdG8gYnJlYWsgZmFzdCB3aGVuICp8YVxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkxFRlQpIHtcbiAgICAgICAgY3Vyc29yLnB1c2hSaWdodEJlZm9yZUZpbGxlZCgpO1xuICAgICAgICBpZiAoY3Vyc29yLm9rICYmIGN1cnNvci5wb3MgPT09IGN1cnNvclBvcykgcmV0dXJuIGN1cnNvclBvcztcbiAgICAgICAgY3Vyc29yLnBvcFN0YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGZvcndhcmQgZmxvd1xuICAgICAgY3Vyc29yLnB1c2hMZWZ0QmVmb3JlSW5wdXQoKTtcbiAgICAgIGN1cnNvci5wdXNoTGVmdEJlZm9yZVJlcXVpcmVkKCk7XG4gICAgICBjdXJzb3IucHVzaExlZnRCZWZvcmVGaWxsZWQoKTtcblxuICAgICAgLy8gYmFja3dhcmQgZmxvd1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkxFRlQpIHtcbiAgICAgICAgY3Vyc29yLnB1c2hSaWdodEJlZm9yZUlucHV0KCk7XG4gICAgICAgIGN1cnNvci5wdXNoUmlnaHRCZWZvcmVSZXF1aXJlZCgpO1xuICAgICAgICBpZiAoY3Vyc29yLm9rICYmIGN1cnNvci5wb3MgPD0gY3Vyc29yUG9zKSByZXR1cm4gY3Vyc29yLnBvcztcbiAgICAgICAgY3Vyc29yLnBvcFN0YXRlKCk7XG4gICAgICAgIGlmIChjdXJzb3Iub2sgJiYgY3Vyc29yLnBvcyA8PSBjdXJzb3JQb3MpIHJldHVybiBjdXJzb3IucG9zO1xuICAgICAgICBjdXJzb3IucG9wU3RhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJzb3Iub2spIHJldHVybiBjdXJzb3IucG9zO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkZPUkNFX0xFRlQpIHJldHVybiAwO1xuICAgICAgY3Vyc29yLnBvcFN0YXRlKCk7XG4gICAgICBpZiAoY3Vyc29yLm9rKSByZXR1cm4gY3Vyc29yLnBvcztcbiAgICAgIGN1cnNvci5wb3BTdGF0ZSgpO1xuICAgICAgaWYgKGN1cnNvci5vaykgcmV0dXJuIGN1cnNvci5wb3M7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLlJJR0hUIHx8IGRpcmVjdGlvbiA9PT0gRElSRUNUSU9OLkZPUkNFX1JJR0hUKSB7XG4gICAgICAvLyBmb3J3YXJkIGZsb3dcbiAgICAgIGN1cnNvci5wdXNoUmlnaHRCZWZvcmVJbnB1dCgpO1xuICAgICAgY3Vyc29yLnB1c2hSaWdodEJlZm9yZVJlcXVpcmVkKCk7XG4gICAgICBpZiAoY3Vyc29yLnB1c2hSaWdodEJlZm9yZUZpbGxlZCgpKSByZXR1cm4gY3Vyc29yLnBvcztcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IERJUkVDVElPTi5GT1JDRV9SSUdIVCkgcmV0dXJuIHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aDtcblxuICAgICAgLy8gYmFja3dhcmQgZmxvd1xuICAgICAgY3Vyc29yLnBvcFN0YXRlKCk7XG4gICAgICBpZiAoY3Vyc29yLm9rKSByZXR1cm4gY3Vyc29yLnBvcztcbiAgICAgIGN1cnNvci5wb3BTdGF0ZSgpO1xuICAgICAgaWYgKGN1cnNvci5vaykgcmV0dXJuIGN1cnNvci5wb3M7XG4gICAgICByZXR1cm4gdGhpcy5uZWFyZXN0SW5wdXRQb3MoY3Vyc29yUG9zLCBESVJFQ1RJT04uTEVGVCk7XG4gICAgfVxuICAgIHJldHVybiBjdXJzb3JQb3M7XG4gIH1cbiAgdG90YWxJbnB1dFBvc2l0aW9ucyhmcm9tUG9zLCB0b1Bvcykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGxldCB0b3RhbCA9IDA7XG4gICAgdGhpcy5fZm9yRWFjaEJsb2Nrc0luUmFuZ2UoZnJvbVBvcywgdG9Qb3MsIChiLCBfLCBiRnJvbVBvcywgYlRvUG9zKSA9PiB7XG4gICAgICB0b3RhbCArPSBiLnRvdGFsSW5wdXRQb3NpdGlvbnMoYkZyb21Qb3MsIGJUb1Bvcyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvdGFsO1xuICB9XG5cbiAgLyoqIEdldCBibG9jayBieSBuYW1lICovXG4gIG1hc2tlZEJsb2NrKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWRCbG9ja3MobmFtZSlbMF07XG4gIH1cblxuICAvKiogR2V0IGFsbCBibG9ja3MgYnkgbmFtZSAqL1xuICBtYXNrZWRCbG9ja3MobmFtZSkge1xuICAgIGNvbnN0IGluZGljZXMgPSB0aGlzLl9tYXNrZWRCbG9ja3NbbmFtZV07XG4gICAgaWYgKCFpbmRpY2VzKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGluZGljZXMubWFwKGdpID0+IHRoaXMuX2Jsb2Nrc1tnaV0pO1xuICB9XG4gIHBhZChmbGFncykge1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIHRoaXMuX2ZvckVhY2hCbG9ja3NJblJhbmdlKDAsIHRoaXMuZGlzcGxheVZhbHVlLmxlbmd0aCwgYiA9PiBkZXRhaWxzLmFnZ3JlZ2F0ZShiLnBhZChmbGFncykpKTtcbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxufVxuTWFza2VkUGF0dGVybi5ERUZBVUxUUyA9IHtcbiAgLi4uTWFza2VkLkRFRkFVTFRTLFxuICBsYXp5OiB0cnVlLFxuICBwbGFjZWhvbGRlckNoYXI6ICdfJ1xufTtcbk1hc2tlZFBhdHRlcm4uU1RPUF9DSEFSID0gJ2AnO1xuTWFza2VkUGF0dGVybi5FU0NBUEVfQ0hBUiA9ICdcXFxcJztcbk1hc2tlZFBhdHRlcm4uSW5wdXREZWZpbml0aW9uID0gUGF0dGVybklucHV0RGVmaW5pdGlvbjtcbk1hc2tlZFBhdHRlcm4uRml4ZWREZWZpbml0aW9uID0gUGF0dGVybkZpeGVkRGVmaW5pdGlvbjtcbklNYXNrLk1hc2tlZFBhdHRlcm4gPSBNYXNrZWRQYXR0ZXJuO1xuXG5leHBvcnQgeyBNYXNrZWRQYXR0ZXJuIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBDaGFuZ2VEZXRhaWxzIGZyb20gJy4uLy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi8uLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCBDb250aW51b3VzVGFpbERldGFpbHMgZnJvbSAnLi4vLi4vY29yZS9jb250aW51b3VzLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgSU1hc2sgZnJvbSAnLi4vLi4vY29yZS9ob2xkZXIuanMnO1xuXG5jbGFzcyBDaHVua3NUYWlsRGV0YWlscyB7XG4gIC8qKiAqL1xuXG4gIGNvbnN0cnVjdG9yKGNodW5rcywgZnJvbSkge1xuICAgIGlmIChjaHVua3MgPT09IHZvaWQgMCkge1xuICAgICAgY2h1bmtzID0gW107XG4gICAgfVxuICAgIGlmIChmcm9tID09PSB2b2lkIDApIHtcbiAgICAgIGZyb20gPSAwO1xuICAgIH1cbiAgICB0aGlzLmNodW5rcyA9IGNodW5rcztcbiAgICB0aGlzLmZyb20gPSBmcm9tO1xuICB9XG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmNodW5rcy5tYXAoU3RyaW5nKS5qb2luKCcnKTtcbiAgfVxuICBleHRlbmQodGFpbENodW5rKSB7XG4gICAgaWYgKCFTdHJpbmcodGFpbENodW5rKSkgcmV0dXJuO1xuICAgIHRhaWxDaHVuayA9IGlzU3RyaW5nKHRhaWxDaHVuaykgPyBuZXcgQ29udGludW91c1RhaWxEZXRhaWxzKFN0cmluZyh0YWlsQ2h1bmspKSA6IHRhaWxDaHVuaztcbiAgICBjb25zdCBsYXN0Q2h1bmsgPSB0aGlzLmNodW5rc1t0aGlzLmNodW5rcy5sZW5ndGggLSAxXTtcbiAgICBjb25zdCBleHRlbmRMYXN0ID0gbGFzdENodW5rICYmIChcbiAgICAvLyBpZiBzdG9wcyBhcmUgc2FtZSBvciB0YWlsIGhhcyBubyBzdG9wXG4gICAgbGFzdENodW5rLnN0b3AgPT09IHRhaWxDaHVuay5zdG9wIHx8IHRhaWxDaHVuay5zdG9wID09IG51bGwpICYmXG4gICAgLy8gaWYgdGFpbCBjaHVuayBnb2VzIGp1c3QgYWZ0ZXIgbGFzdCBjaHVua1xuICAgIHRhaWxDaHVuay5mcm9tID09PSBsYXN0Q2h1bmsuZnJvbSArIGxhc3RDaHVuay50b1N0cmluZygpLmxlbmd0aDtcbiAgICBpZiAodGFpbENodW5rIGluc3RhbmNlb2YgQ29udGludW91c1RhaWxEZXRhaWxzKSB7XG4gICAgICAvLyBjaGVjayB0aGUgYWJpbGl0eSB0byBleHRlbmQgcHJldmlvdXMgY2h1bmtcbiAgICAgIGlmIChleHRlbmRMYXN0KSB7XG4gICAgICAgIC8vIGV4dGVuZCBwcmV2aW91cyBjaHVua1xuICAgICAgICBsYXN0Q2h1bmsuZXh0ZW5kKHRhaWxDaHVuay50b1N0cmluZygpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFwcGVuZCBuZXcgY2h1bmtcbiAgICAgICAgdGhpcy5jaHVua3MucHVzaCh0YWlsQ2h1bmspO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGFpbENodW5rIGluc3RhbmNlb2YgQ2h1bmtzVGFpbERldGFpbHMpIHtcbiAgICAgIGlmICh0YWlsQ2h1bmsuc3RvcCA9PSBudWxsKSB7XG4gICAgICAgIC8vIHVud3JhcCBmbG9hdGluZyBjaHVua3MgdG8gcGFyZW50LCBrZWVwaW5nIGBmcm9tYCBwb3NcbiAgICAgICAgbGV0IGZpcnN0VGFpbENodW5rO1xuICAgICAgICB3aGlsZSAodGFpbENodW5rLmNodW5rcy5sZW5ndGggJiYgdGFpbENodW5rLmNodW5rc1swXS5zdG9wID09IG51bGwpIHtcbiAgICAgICAgICBmaXJzdFRhaWxDaHVuayA9IHRhaWxDaHVuay5jaHVua3Muc2hpZnQoKTsgLy8gbm90IHBvc3NpYmxlIHRvIGJlIGB1bmRlZmluZWRgIGJlY2F1c2UgbGVuZ3RoIHdhcyBjaGVja2VkIGFib3ZlXG4gICAgICAgICAgZmlyc3RUYWlsQ2h1bmsuZnJvbSArPSB0YWlsQ2h1bmsuZnJvbTtcbiAgICAgICAgICB0aGlzLmV4dGVuZChmaXJzdFRhaWxDaHVuayk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGFpbCBjaHVuayBzdGlsbCBoYXMgdmFsdWVcbiAgICAgIGlmICh0YWlsQ2h1bmsudG9TdHJpbmcoKSkge1xuICAgICAgICAvLyBpZiBjaHVua3MgY29udGFpbnMgc3RvcHMsIHRoZW4gcG9wdXAgc3RvcCB0byBjb250YWluZXJcbiAgICAgICAgdGFpbENodW5rLnN0b3AgPSB0YWlsQ2h1bmsuYmxvY2tJbmRleDtcbiAgICAgICAgdGhpcy5jaHVua3MucHVzaCh0YWlsQ2h1bmspO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBhcHBlbmRUbyhtYXNrZWQpIHtcbiAgICBpZiAoIShtYXNrZWQgaW5zdGFuY2VvZiBJTWFzay5NYXNrZWRQYXR0ZXJuKSkge1xuICAgICAgY29uc3QgdGFpbCA9IG5ldyBDb250aW51b3VzVGFpbERldGFpbHModGhpcy50b1N0cmluZygpKTtcbiAgICAgIHJldHVybiB0YWlsLmFwcGVuZFRvKG1hc2tlZCk7XG4gICAgfVxuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIGZvciAobGV0IGNpID0gMDsgY2kgPCB0aGlzLmNodW5rcy5sZW5ndGg7ICsrY2kpIHtcbiAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5jaHVua3NbY2ldO1xuICAgICAgY29uc3QgbGFzdEJsb2NrSXRlciA9IG1hc2tlZC5fbWFwUG9zVG9CbG9jayhtYXNrZWQuZGlzcGxheVZhbHVlLmxlbmd0aCk7XG4gICAgICBjb25zdCBzdG9wID0gY2h1bmsuc3RvcDtcbiAgICAgIGxldCBjaHVua0Jsb2NrO1xuICAgICAgaWYgKHN0b3AgIT0gbnVsbCAmJiAoXG4gICAgICAvLyBpZiBibG9jayBub3QgZm91bmQgb3Igc3RvcCBpcyBiZWhpbmQgbGFzdEJsb2NrXG4gICAgICAhbGFzdEJsb2NrSXRlciB8fCBsYXN0QmxvY2tJdGVyLmluZGV4IDw9IHN0b3ApKSB7XG4gICAgICAgIGlmIChjaHVuayBpbnN0YW5jZW9mIENodW5rc1RhaWxEZXRhaWxzIHx8XG4gICAgICAgIC8vIGZvciBjb250aW51b3VzIGJsb2NrIGFsc28gY2hlY2sgaWYgc3RvcCBpcyBleGlzdFxuICAgICAgICBtYXNrZWQuX3N0b3BzLmluZGV4T2Yoc3RvcCkgPj0gMCkge1xuICAgICAgICAgIGRldGFpbHMuYWdncmVnYXRlKG1hc2tlZC5fYXBwZW5kUGxhY2Vob2xkZXIoc3RvcCkpO1xuICAgICAgICB9XG4gICAgICAgIGNodW5rQmxvY2sgPSBjaHVuayBpbnN0YW5jZW9mIENodW5rc1RhaWxEZXRhaWxzICYmIG1hc2tlZC5fYmxvY2tzW3N0b3BdO1xuICAgICAgfVxuICAgICAgaWYgKGNodW5rQmxvY2spIHtcbiAgICAgICAgY29uc3QgdGFpbERldGFpbHMgPSBjaHVua0Jsb2NrLmFwcGVuZFRhaWwoY2h1bmspO1xuICAgICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZSh0YWlsRGV0YWlscyk7XG5cbiAgICAgICAgLy8gZ2V0IG5vdCBpbnNlcnRlZCBjaGFyc1xuICAgICAgICBjb25zdCByZW1haW5DaGFycyA9IGNodW5rLnRvU3RyaW5nKCkuc2xpY2UodGFpbERldGFpbHMucmF3SW5zZXJ0ZWQubGVuZ3RoKTtcbiAgICAgICAgaWYgKHJlbWFpbkNoYXJzKSBkZXRhaWxzLmFnZ3JlZ2F0ZShtYXNrZWQuYXBwZW5kKHJlbWFpbkNoYXJzLCB7XG4gICAgICAgICAgdGFpbDogdHJ1ZVxuICAgICAgICB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXRhaWxzLmFnZ3JlZ2F0ZShtYXNrZWQuYXBwZW5kKGNodW5rLnRvU3RyaW5nKCksIHtcbiAgICAgICAgICB0YWlsOiB0cnVlXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbiAgZ2V0IHN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjaHVua3M6IHRoaXMuY2h1bmtzLm1hcChjID0+IGMuc3RhdGUpLFxuICAgICAgZnJvbTogdGhpcy5mcm9tLFxuICAgICAgc3RvcDogdGhpcy5zdG9wLFxuICAgICAgYmxvY2tJbmRleDogdGhpcy5ibG9ja0luZGV4XG4gICAgfTtcbiAgfVxuICBzZXQgc3RhdGUoc3RhdGUpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaHVua3MsXG4gICAgICAuLi5wcm9wc1xuICAgIH0gPSBzdGF0ZTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHByb3BzKTtcbiAgICB0aGlzLmNodW5rcyA9IGNodW5rcy5tYXAoY3N0YXRlID0+IHtcbiAgICAgIGNvbnN0IGNodW5rID0gXCJjaHVua3NcIiBpbiBjc3RhdGUgPyBuZXcgQ2h1bmtzVGFpbERldGFpbHMoKSA6IG5ldyBDb250aW51b3VzVGFpbERldGFpbHMoKTtcbiAgICAgIGNodW5rLnN0YXRlID0gY3N0YXRlO1xuICAgICAgcmV0dXJuIGNodW5rO1xuICAgIH0pO1xuICB9XG4gIHVuc2hpZnQoYmVmb3JlUG9zKSB7XG4gICAgaWYgKCF0aGlzLmNodW5rcy5sZW5ndGggfHwgYmVmb3JlUG9zICE9IG51bGwgJiYgdGhpcy5mcm9tID49IGJlZm9yZVBvcykgcmV0dXJuICcnO1xuICAgIGNvbnN0IGNodW5rU2hpZnRQb3MgPSBiZWZvcmVQb3MgIT0gbnVsbCA/IGJlZm9yZVBvcyAtIHRoaXMuZnJvbSA6IGJlZm9yZVBvcztcbiAgICBsZXQgY2kgPSAwO1xuICAgIHdoaWxlIChjaSA8IHRoaXMuY2h1bmtzLmxlbmd0aCkge1xuICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLmNodW5rc1tjaV07XG4gICAgICBjb25zdCBzaGlmdENoYXIgPSBjaHVuay51bnNoaWZ0KGNodW5rU2hpZnRQb3MpO1xuICAgICAgaWYgKGNodW5rLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgLy8gY2h1bmsgc3RpbGwgY29udGFpbnMgdmFsdWVcbiAgICAgICAgLy8gYnV0IG5vdCBzaGlmdGVkIC0gbWVhbnMgbm8gbW9yZSBhdmFpbGFibGUgY2hhcnMgdG8gc2hpZnRcbiAgICAgICAgaWYgKCFzaGlmdENoYXIpIGJyZWFrO1xuICAgICAgICArK2NpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2xlYW4gaWYgY2h1bmsgaGFzIG5vIHZhbHVlXG4gICAgICAgIHRoaXMuY2h1bmtzLnNwbGljZShjaSwgMSk7XG4gICAgICB9XG4gICAgICBpZiAoc2hpZnRDaGFyKSByZXR1cm4gc2hpZnRDaGFyO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgc2hpZnQoKSB7XG4gICAgaWYgKCF0aGlzLmNodW5rcy5sZW5ndGgpIHJldHVybiAnJztcbiAgICBsZXQgY2kgPSB0aGlzLmNodW5rcy5sZW5ndGggLSAxO1xuICAgIHdoaWxlICgwIDw9IGNpKSB7XG4gICAgICBjb25zdCBjaHVuayA9IHRoaXMuY2h1bmtzW2NpXTtcbiAgICAgIGNvbnN0IHNoaWZ0Q2hhciA9IGNodW5rLnNoaWZ0KCk7XG4gICAgICBpZiAoY2h1bmsudG9TdHJpbmcoKSkge1xuICAgICAgICAvLyBjaHVuayBzdGlsbCBjb250YWlucyB2YWx1ZVxuICAgICAgICAvLyBidXQgbm90IHNoaWZ0ZWQgLSBtZWFucyBubyBtb3JlIGF2YWlsYWJsZSBjaGFycyB0byBzaGlmdFxuICAgICAgICBpZiAoIXNoaWZ0Q2hhcikgYnJlYWs7XG4gICAgICAgIC0tY2k7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjbGVhbiBpZiBjaHVuayBoYXMgbm8gdmFsdWVcbiAgICAgICAgdGhpcy5jaHVua3Muc3BsaWNlKGNpLCAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaGlmdENoYXIpIHJldHVybiBzaGlmdENoYXI7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxufVxuXG5leHBvcnQgeyBDaHVua3NUYWlsRGV0YWlscyBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgeyBESVJFQ1RJT04gfSBmcm9tICcuLi8uLi9jb3JlL3V0aWxzLmpzJztcblxuY2xhc3MgUGF0dGVybkN1cnNvciB7XG4gIGNvbnN0cnVjdG9yKG1hc2tlZCwgcG9zKSB7XG4gICAgdGhpcy5tYXNrZWQgPSBtYXNrZWQ7XG4gICAgdGhpcy5fbG9nID0gW107XG4gICAgY29uc3Qge1xuICAgICAgb2Zmc2V0LFxuICAgICAgaW5kZXhcbiAgICB9ID0gbWFza2VkLl9tYXBQb3NUb0Jsb2NrKHBvcykgfHwgKHBvcyA8IDAgP1xuICAgIC8vIGZpcnN0XG4gICAge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBvZmZzZXQ6IDBcbiAgICB9IDpcbiAgICAvLyBsYXN0XG4gICAge1xuICAgICAgaW5kZXg6IHRoaXMubWFza2VkLl9ibG9ja3MubGVuZ3RoLFxuICAgICAgb2Zmc2V0OiAwXG4gICAgfSk7XG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMub2sgPSBmYWxzZTtcbiAgfVxuICBnZXQgYmxvY2soKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLl9ibG9ja3NbdGhpcy5pbmRleF07XG4gIH1cbiAgZ2V0IHBvcygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQuX2Jsb2NrU3RhcnRQb3ModGhpcy5pbmRleCkgKyB0aGlzLm9mZnNldDtcbiAgfVxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgb2Zmc2V0OiB0aGlzLm9mZnNldCxcbiAgICAgIG9rOiB0aGlzLm9rXG4gICAgfTtcbiAgfVxuICBzZXQgc3RhdGUocykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcyk7XG4gIH1cbiAgcHVzaFN0YXRlKCkge1xuICAgIHRoaXMuX2xvZy5wdXNoKHRoaXMuc3RhdGUpO1xuICB9XG4gIHBvcFN0YXRlKCkge1xuICAgIGNvbnN0IHMgPSB0aGlzLl9sb2cucG9wKCk7XG4gICAgaWYgKHMpIHRoaXMuc3RhdGUgPSBzO1xuICAgIHJldHVybiBzO1xuICB9XG4gIGJpbmRCbG9jaygpIHtcbiAgICBpZiAodGhpcy5ibG9jaykgcmV0dXJuO1xuICAgIGlmICh0aGlzLmluZGV4IDwgMCkge1xuICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgfVxuICAgIGlmICh0aGlzLmluZGV4ID49IHRoaXMubWFza2VkLl9ibG9ja3MubGVuZ3RoKSB7XG4gICAgICB0aGlzLmluZGV4ID0gdGhpcy5tYXNrZWQuX2Jsb2Nrcy5sZW5ndGggLSAxO1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmJsb2NrLmRpc3BsYXlWYWx1ZS5sZW5ndGg7IC8vIFRPRE8gdGhpcyBpcyBzdHVwaWQgdHlwZSBlcnJvciwgYGJsb2NrYCBkZXBlbmRzIG9uIGluZGV4IHRoYXQgd2FzIGNoYW5nZWQgYWJvdmVcbiAgICB9XG4gIH1cbiAgX3B1c2hMZWZ0KGZuKSB7XG4gICAgdGhpcy5wdXNoU3RhdGUoKTtcbiAgICBmb3IgKHRoaXMuYmluZEJsb2NrKCk7IDAgPD0gdGhpcy5pbmRleDsgLS10aGlzLmluZGV4LCB0aGlzLm9mZnNldCA9ICgoX3RoaXMkYmxvY2sgPSB0aGlzLmJsb2NrKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkYmxvY2suZGlzcGxheVZhbHVlLmxlbmd0aCkgfHwgMCkge1xuICAgICAgdmFyIF90aGlzJGJsb2NrO1xuICAgICAgaWYgKGZuKCkpIHJldHVybiB0aGlzLm9rID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub2sgPSBmYWxzZTtcbiAgfVxuICBfcHVzaFJpZ2h0KGZuKSB7XG4gICAgdGhpcy5wdXNoU3RhdGUoKTtcbiAgICBmb3IgKHRoaXMuYmluZEJsb2NrKCk7IHRoaXMuaW5kZXggPCB0aGlzLm1hc2tlZC5fYmxvY2tzLmxlbmd0aDsgKyt0aGlzLmluZGV4LCB0aGlzLm9mZnNldCA9IDApIHtcbiAgICAgIGlmIChmbigpKSByZXR1cm4gdGhpcy5vayA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9rID0gZmFsc2U7XG4gIH1cbiAgcHVzaExlZnRCZWZvcmVGaWxsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3B1c2hMZWZ0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmJsb2NrLmlzRml4ZWQgfHwgIXRoaXMuYmxvY2sudmFsdWUpIHJldHVybjtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5ibG9jay5uZWFyZXN0SW5wdXRQb3ModGhpcy5vZmZzZXQsIERJUkVDVElPTi5GT1JDRV9MRUZUKTtcbiAgICAgIGlmICh0aGlzLm9mZnNldCAhPT0gMCkgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cbiAgcHVzaExlZnRCZWZvcmVJbnB1dCgpIHtcbiAgICAvLyBjYXNlczpcbiAgICAvLyBmaWxsZWQgaW5wdXQ6IDAwfFxuICAgIC8vIG9wdGlvbmFsIGVtcHR5IGlucHV0OiAwMFtdfFxuICAgIC8vIG5lc3RlZCBibG9jazogWFg8W10+fFxuICAgIHJldHVybiB0aGlzLl9wdXNoTGVmdCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ibG9jay5pc0ZpeGVkKSByZXR1cm47XG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuYmxvY2submVhcmVzdElucHV0UG9zKHRoaXMub2Zmc2V0LCBESVJFQ1RJT04uTEVGVCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuICBwdXNoTGVmdEJlZm9yZVJlcXVpcmVkKCkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoTGVmdCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ibG9jay5pc0ZpeGVkIHx8IHRoaXMuYmxvY2suaXNPcHRpb25hbCAmJiAhdGhpcy5ibG9jay52YWx1ZSkgcmV0dXJuO1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmJsb2NrLm5lYXJlc3RJbnB1dFBvcyh0aGlzLm9mZnNldCwgRElSRUNUSU9OLkxFRlQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cbiAgcHVzaFJpZ2h0QmVmb3JlRmlsbGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoUmlnaHQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYmxvY2suaXNGaXhlZCB8fCAhdGhpcy5ibG9jay52YWx1ZSkgcmV0dXJuO1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLmJsb2NrLm5lYXJlc3RJbnB1dFBvcyh0aGlzLm9mZnNldCwgRElSRUNUSU9OLkZPUkNFX1JJR0hUKTtcbiAgICAgIGlmICh0aGlzLm9mZnNldCAhPT0gdGhpcy5ibG9jay52YWx1ZS5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG4gIHB1c2hSaWdodEJlZm9yZUlucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoUmlnaHQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYmxvY2suaXNGaXhlZCkgcmV0dXJuO1xuXG4gICAgICAvLyBjb25zdCBvID0gdGhpcy5vZmZzZXQ7XG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuYmxvY2submVhcmVzdElucHV0UG9zKHRoaXMub2Zmc2V0LCBESVJFQ1RJT04uTk9ORSk7XG4gICAgICAvLyBIQUNLIGNhc2VzIGxpa2UgKFNUSUxMIERPRVMgTk9UIFdPUksgRk9SIE5FU1RFRClcbiAgICAgIC8vIGFhfFhcbiAgICAgIC8vIGFhPFh8W10+WF8gICAgLSB0aGlzIHdpbGwgbm90IHdvcmtcbiAgICAgIC8vIGlmIChvICYmIG8gPT09IHRoaXMub2Zmc2V0ICYmIHRoaXMuYmxvY2sgaW5zdGFuY2VvZiBQYXR0ZXJuSW5wdXREZWZpbml0aW9uKSBjb250aW51ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG4gIHB1c2hSaWdodEJlZm9yZVJlcXVpcmVkKCkge1xuICAgIHJldHVybiB0aGlzLl9wdXNoUmlnaHQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYmxvY2suaXNGaXhlZCB8fCB0aGlzLmJsb2NrLmlzT3B0aW9uYWwgJiYgIXRoaXMuYmxvY2sudmFsdWUpIHJldHVybjtcblxuICAgICAgLy8gVE9ETyBjaGVjayB8WypdWFhfXG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuYmxvY2submVhcmVzdElucHV0UG9zKHRoaXMub2Zmc2V0LCBESVJFQ1RJT04uTk9ORSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBQYXR0ZXJuQ3Vyc29yIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBDaGFuZ2VEZXRhaWxzIGZyb20gJy4uLy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0IHsgRElSRUNUSU9OLCBpc1N0cmluZyB9IGZyb20gJy4uLy4uL2NvcmUvdXRpbHMuanMnO1xuaW1wb3J0IENvbnRpbnVvdXNUYWlsRGV0YWlscyBmcm9tICcuLi8uLi9jb3JlL2NvbnRpbnVvdXMtdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi4vLi4vY29yZS9ob2xkZXIuanMnO1xuXG5jbGFzcyBQYXR0ZXJuRml4ZWREZWZpbml0aW9uIHtcbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0cyk7XG4gICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICB0aGlzLmlzRml4ZWQgPSB0cnVlO1xuICB9XG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgZ2V0IHVubWFza2VkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNVbm1hc2tpbmcgPyB0aGlzLnZhbHVlIDogJyc7XG4gIH1cbiAgZ2V0IHJhd0lucHV0VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzUmF3SW5wdXQgPyB0aGlzLnZhbHVlIDogJyc7XG4gIH1cbiAgZ2V0IGRpc3BsYXlWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLl9pc1Jhd0lucHV0ID0gZmFsc2U7XG4gICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgfVxuICByZW1vdmUoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5fdmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuX3ZhbHVlLnNsaWNlKDAsIGZyb21Qb3MpICsgdGhpcy5fdmFsdWUuc2xpY2UodG9Qb3MpO1xuICAgIGlmICghdGhpcy5fdmFsdWUpIHRoaXMuX2lzUmF3SW5wdXQgPSBmYWxzZTtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgfVxuICBuZWFyZXN0SW5wdXRQb3MoY3Vyc29yUG9zLCBkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSB2b2lkIDApIHtcbiAgICAgIGRpcmVjdGlvbiA9IERJUkVDVElPTi5OT05FO1xuICAgIH1cbiAgICBjb25zdCBtaW5Qb3MgPSAwO1xuICAgIGNvbnN0IG1heFBvcyA9IHRoaXMuX3ZhbHVlLmxlbmd0aDtcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSBESVJFQ1RJT04uTEVGVDpcbiAgICAgIGNhc2UgRElSRUNUSU9OLkZPUkNFX0xFRlQ6XG4gICAgICAgIHJldHVybiBtaW5Qb3M7XG4gICAgICBjYXNlIERJUkVDVElPTi5OT05FOlxuICAgICAgY2FzZSBESVJFQ1RJT04uUklHSFQ6XG4gICAgICBjYXNlIERJUkVDVElPTi5GT1JDRV9SSUdIVDpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBtYXhQb3M7XG4gICAgfVxuICB9XG4gIHRvdGFsSW5wdXRQb3NpdGlvbnMoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5fdmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faXNSYXdJbnB1dCA/IHRvUG9zIC0gZnJvbVBvcyA6IDA7XG4gIH1cbiAgZXh0cmFjdElucHV0KGZyb21Qb3MsIHRvUG9zLCBmbGFncykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLl92YWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICByZXR1cm4gZmxhZ3MucmF3ICYmIHRoaXMuX2lzUmF3SW5wdXQgJiYgdGhpcy5fdmFsdWUuc2xpY2UoZnJvbVBvcywgdG9Qb3MpIHx8ICcnO1xuICB9XG4gIGdldCBpc0NvbXBsZXRlKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGdldCBpc0ZpbGxlZCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLl92YWx1ZSk7XG4gIH1cbiAgX2FwcGVuZENoYXIoY2gsIGZsYWdzKSB7XG4gICAgaWYgKGZsYWdzID09PSB2b2lkIDApIHtcbiAgICAgIGZsYWdzID0ge307XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRmlsbGVkKSByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBjb25zdCBhcHBlbmRFYWdlciA9IHRoaXMuZWFnZXIgPT09IHRydWUgfHwgdGhpcy5lYWdlciA9PT0gJ2FwcGVuZCc7XG4gICAgY29uc3QgYXBwZW5kZWQgPSB0aGlzLmNoYXIgPT09IGNoO1xuICAgIGNvbnN0IGlzUmVzb2x2ZWQgPSBhcHBlbmRlZCAmJiAodGhpcy5pc1VubWFza2luZyB8fCBmbGFncy5pbnB1dCB8fCBmbGFncy5yYXcpICYmICghZmxhZ3MucmF3IHx8ICFhcHBlbmRFYWdlcikgJiYgIWZsYWdzLnRhaWw7XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKHtcbiAgICAgIGluc2VydGVkOiB0aGlzLmNoYXIsXG4gICAgICByYXdJbnNlcnRlZDogaXNSZXNvbHZlZCA/IHRoaXMuY2hhciA6ICcnXG4gICAgfSk7XG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLmNoYXI7XG4gICAgdGhpcy5faXNSYXdJbnB1dCA9IGlzUmVzb2x2ZWQgJiYgKGZsYWdzLnJhdyB8fCBmbGFncy5pbnB1dCk7XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbiAgX2FwcGVuZEVhZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBlbmRDaGFyKHRoaXMuY2hhciwge1xuICAgICAgdGFpbDogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIF9hcHBlbmRQbGFjZWhvbGRlcigpIHtcbiAgICBjb25zdCBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICBpZiAodGhpcy5pc0ZpbGxlZCkgcmV0dXJuIGRldGFpbHM7XG4gICAgdGhpcy5fdmFsdWUgPSBkZXRhaWxzLmluc2VydGVkID0gdGhpcy5jaGFyO1xuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIGV4dHJhY3RUYWlsKCkge1xuICAgIHJldHVybiBuZXcgQ29udGludW91c1RhaWxEZXRhaWxzKCcnKTtcbiAgfVxuICBhcHBlbmRUYWlsKHRhaWwpIHtcbiAgICBpZiAoaXNTdHJpbmcodGFpbCkpIHRhaWwgPSBuZXcgQ29udGludW91c1RhaWxEZXRhaWxzKFN0cmluZyh0YWlsKSk7XG4gICAgcmV0dXJuIHRhaWwuYXBwZW5kVG8odGhpcyk7XG4gIH1cbiAgYXBwZW5kKHN0ciwgZmxhZ3MsIHRhaWwpIHtcbiAgICBjb25zdCBkZXRhaWxzID0gdGhpcy5fYXBwZW5kQ2hhcihzdHJbMF0sIGZsYWdzKTtcbiAgICBpZiAodGFpbCAhPSBudWxsKSB7XG4gICAgICBkZXRhaWxzLnRhaWxTaGlmdCArPSB0aGlzLmFwcGVuZFRhaWwodGFpbCkudGFpbFNoaWZ0O1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxuICBkb0NvbW1pdCgpIHt9XG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX3ZhbHVlOiB0aGlzLl92YWx1ZSxcbiAgICAgIF9yYXdJbnB1dFZhbHVlOiB0aGlzLnJhd0lucHV0VmFsdWVcbiAgICB9O1xuICB9XG4gIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gc3RhdGUuX3ZhbHVlO1xuICAgIHRoaXMuX2lzUmF3SW5wdXQgPSBCb29sZWFuKHN0YXRlLl9yYXdJbnB1dFZhbHVlKTtcbiAgfVxuICBwYWQoZmxhZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZW5kUGxhY2Vob2xkZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBQYXR0ZXJuRml4ZWREZWZpbml0aW9uIGFzIGRlZmF1bHQgfTtcbiIsImltcG9ydCBjcmVhdGVNYXNrIGZyb20gJy4uL2ZhY3RvcnkuanMnO1xuaW1wb3J0IENoYW5nZURldGFpbHMgZnJvbSAnLi4vLi4vY29yZS9jaGFuZ2UtZGV0YWlscy5qcyc7XG5pbXBvcnQgeyBESVJFQ1RJT04gfSBmcm9tICcuLi8uLi9jb3JlL3V0aWxzLmpzJztcbmltcG9ydCAnLi4vLi4vY29yZS9ob2xkZXIuanMnO1xuXG5jbGFzcyBQYXR0ZXJuSW5wdXREZWZpbml0aW9uIHtcbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgLyoqICovXG5cbiAgY29uc3RydWN0b3Iob3B0cykge1xuICAgIGNvbnN0IHtcbiAgICAgIHBhcmVudCxcbiAgICAgIGlzT3B0aW9uYWwsXG4gICAgICBwbGFjZWhvbGRlckNoYXIsXG4gICAgICBkaXNwbGF5Q2hhcixcbiAgICAgIGxhenksXG4gICAgICBlYWdlcixcbiAgICAgIC4uLm1hc2tPcHRzXG4gICAgfSA9IG9wdHM7XG4gICAgdGhpcy5tYXNrZWQgPSBjcmVhdGVNYXNrKG1hc2tPcHRzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgIHBhcmVudCxcbiAgICAgIGlzT3B0aW9uYWwsXG4gICAgICBwbGFjZWhvbGRlckNoYXIsXG4gICAgICBkaXNwbGF5Q2hhcixcbiAgICAgIGxhenksXG4gICAgICBlYWdlclxuICAgIH0pO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuaXNGaWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1hc2tlZC5yZXNldCgpO1xuICB9XG4gIHJlbW92ZShmcm9tUG9zLCB0b1Bvcykge1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBpZiAodG9Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgdG9Qb3MgPSB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGZyb21Qb3MgPT09IDAgJiYgdG9Qb3MgPj0gMSkge1xuICAgICAgdGhpcy5pc0ZpbGxlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXMubWFza2VkLnJlbW92ZShmcm9tUG9zLCB0b1Bvcyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICB9XG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQudmFsdWUgfHwgKHRoaXMuaXNGaWxsZWQgJiYgIXRoaXMuaXNPcHRpb25hbCA/IHRoaXMucGxhY2Vob2xkZXJDaGFyIDogJycpO1xuICB9XG4gIGdldCB1bm1hc2tlZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLm1hc2tlZC51bm1hc2tlZFZhbHVlO1xuICB9XG4gIGdldCByYXdJbnB1dFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLm1hc2tlZC5yYXdJbnB1dFZhbHVlO1xuICB9XG4gIGdldCBkaXNwbGF5VmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLnZhbHVlICYmIHRoaXMuZGlzcGxheUNoYXIgfHwgdGhpcy52YWx1ZTtcbiAgfVxuICBnZXQgaXNDb21wbGV0ZSgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1hc2tlZC52YWx1ZSkgfHwgdGhpcy5pc09wdGlvbmFsO1xuICB9XG4gIF9hcHBlbmRDaGFyKGNoLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0ZpbGxlZCkgcmV0dXJuIG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLm1hc2tlZC5zdGF0ZTtcbiAgICAvLyBzaW11bGF0ZSBpbnB1dFxuICAgIGxldCBkZXRhaWxzID0gdGhpcy5tYXNrZWQuX2FwcGVuZENoYXIoY2gsIHRoaXMuY3VycmVudE1hc2tGbGFncyhmbGFncykpO1xuICAgIGlmIChkZXRhaWxzLmluc2VydGVkICYmIHRoaXMuZG9WYWxpZGF0ZShmbGFncykgPT09IGZhbHNlKSB7XG4gICAgICBkZXRhaWxzID0gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICAgIHRoaXMubWFza2VkLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuICAgIGlmICghZGV0YWlscy5pbnNlcnRlZCAmJiAhdGhpcy5pc09wdGlvbmFsICYmICF0aGlzLmxhenkgJiYgIWZsYWdzLmlucHV0KSB7XG4gICAgICBkZXRhaWxzLmluc2VydGVkID0gdGhpcy5wbGFjZWhvbGRlckNoYXI7XG4gICAgfVxuICAgIGRldGFpbHMuc2tpcCA9ICFkZXRhaWxzLmluc2VydGVkICYmICF0aGlzLmlzT3B0aW9uYWw7XG4gICAgdGhpcy5pc0ZpbGxlZCA9IEJvb2xlYW4oZGV0YWlscy5pbnNlcnRlZCk7XG4gICAgcmV0dXJuIGRldGFpbHM7XG4gIH1cbiAgYXBwZW5kKHN0ciwgZmxhZ3MsIHRhaWwpIHtcbiAgICAvLyBUT0RPIHByb2JhYmx5IHNob3VsZCBiZSBkb25lIHZpYSBfYXBwZW5kQ2hhclxuICAgIHJldHVybiB0aGlzLm1hc2tlZC5hcHBlbmQoc3RyLCB0aGlzLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpLCB0YWlsKTtcbiAgfVxuICBfYXBwZW5kUGxhY2Vob2xkZXIoKSB7XG4gICAgaWYgKHRoaXMuaXNGaWxsZWQgfHwgdGhpcy5pc09wdGlvbmFsKSByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoKTtcbiAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gbmV3IENoYW5nZURldGFpbHMoe1xuICAgICAgaW5zZXJ0ZWQ6IHRoaXMucGxhY2Vob2xkZXJDaGFyXG4gICAgfSk7XG4gIH1cbiAgX2FwcGVuZEVhZ2VyKCkge1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICB9XG4gIGV4dHJhY3RUYWlsKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgcmV0dXJuIHRoaXMubWFza2VkLmV4dHJhY3RUYWlsKGZyb21Qb3MsIHRvUG9zKTtcbiAgfVxuICBhcHBlbmRUYWlsKHRhaWwpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNrZWQuYXBwZW5kVGFpbCh0YWlsKTtcbiAgfVxuICBleHRyYWN0SW5wdXQoZnJvbVBvcywgdG9Qb3MsIGZsYWdzKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PT0gdm9pZCAwKSB7XG4gICAgICB0b1BvcyA9IHRoaXMudmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5tYXNrZWQuZXh0cmFjdElucHV0KGZyb21Qb3MsIHRvUG9zLCBmbGFncyk7XG4gIH1cbiAgbmVhcmVzdElucHV0UG9zKGN1cnNvclBvcywgZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICBkaXJlY3Rpb24gPSBESVJFQ1RJT04uTk9ORTtcbiAgICB9XG4gICAgY29uc3QgbWluUG9zID0gMDtcbiAgICBjb25zdCBtYXhQb3MgPSB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICBjb25zdCBib3VuZFBvcyA9IE1hdGgubWluKE1hdGgubWF4KGN1cnNvclBvcywgbWluUG9zKSwgbWF4UG9zKTtcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgY2FzZSBESVJFQ1RJT04uTEVGVDpcbiAgICAgIGNhc2UgRElSRUNUSU9OLkZPUkNFX0xFRlQ6XG4gICAgICAgIHJldHVybiB0aGlzLmlzQ29tcGxldGUgPyBib3VuZFBvcyA6IG1pblBvcztcbiAgICAgIGNhc2UgRElSRUNUSU9OLlJJR0hUOlxuICAgICAgY2FzZSBESVJFQ1RJT04uRk9SQ0VfUklHSFQ6XG4gICAgICAgIHJldHVybiB0aGlzLmlzQ29tcGxldGUgPyBib3VuZFBvcyA6IG1heFBvcztcbiAgICAgIGNhc2UgRElSRUNUSU9OLk5PTkU6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYm91bmRQb3M7XG4gICAgfVxuICB9XG4gIHRvdGFsSW5wdXRQb3NpdGlvbnMoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy52YWx1ZS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnZhbHVlLnNsaWNlKGZyb21Qb3MsIHRvUG9zKS5sZW5ndGg7XG4gIH1cbiAgZG9WYWxpZGF0ZShmbGFncykge1xuICAgIHJldHVybiB0aGlzLm1hc2tlZC5kb1ZhbGlkYXRlKHRoaXMuY3VycmVudE1hc2tGbGFncyhmbGFncykpICYmICghdGhpcy5wYXJlbnQgfHwgdGhpcy5wYXJlbnQuZG9WYWxpZGF0ZSh0aGlzLmN1cnJlbnRNYXNrRmxhZ3MoZmxhZ3MpKSk7XG4gIH1cbiAgZG9Db21taXQoKSB7XG4gICAgdGhpcy5tYXNrZWQuZG9Db21taXQoKTtcbiAgfVxuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF92YWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgIF9yYXdJbnB1dFZhbHVlOiB0aGlzLnJhd0lucHV0VmFsdWUsXG4gICAgICBtYXNrZWQ6IHRoaXMubWFza2VkLnN0YXRlLFxuICAgICAgaXNGaWxsZWQ6IHRoaXMuaXNGaWxsZWRcbiAgICB9O1xuICB9XG4gIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMubWFza2VkLnN0YXRlID0gc3RhdGUubWFza2VkO1xuICAgIHRoaXMuaXNGaWxsZWQgPSBzdGF0ZS5pc0ZpbGxlZDtcbiAgfVxuICBjdXJyZW50TWFza0ZsYWdzKGZsYWdzKSB7XG4gICAgdmFyIF9mbGFncyRfYmVmb3JlVGFpbFN0YTtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uZmxhZ3MsXG4gICAgICBfYmVmb3JlVGFpbFN0YXRlOiAoZmxhZ3MgPT0gbnVsbCB8fCAoX2ZsYWdzJF9iZWZvcmVUYWlsU3RhID0gZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9mbGFncyRfYmVmb3JlVGFpbFN0YS5tYXNrZWQpIHx8IChmbGFncyA9PSBudWxsID8gdm9pZCAwIDogZmxhZ3MuX2JlZm9yZVRhaWxTdGF0ZSlcbiAgICB9O1xuICB9XG4gIHBhZChmbGFncykge1xuICAgIHJldHVybiBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICB9XG59XG5QYXR0ZXJuSW5wdXREZWZpbml0aW9uLkRFRkFVTFRfREVGSU5JVElPTlMgPSB7XG4gICcwJzogL1xcZC8sXG4gICdhJzogL1tcXHUwMDQxLVxcdTAwNUFcXHUwMDYxLVxcdTAwN0FcXHUwMEFBXFx1MDBCNVxcdTAwQkFcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwRjZcXHUwMEY4LVxcdTAyQzFcXHUwMkM2LVxcdTAyRDFcXHUwMkUwLVxcdTAyRTRcXHUwMkVDXFx1MDJFRVxcdTAzNzAtXFx1MDM3NFxcdTAzNzZcXHUwMzc3XFx1MDM3QS1cXHUwMzdEXFx1MDM4NlxcdTAzODgtXFx1MDM4QVxcdTAzOENcXHUwMzhFLVxcdTAzQTFcXHUwM0EzLVxcdTAzRjVcXHUwM0Y3LVxcdTA0ODFcXHUwNDhBLVxcdTA1MjdcXHUwNTMxLVxcdTA1NTZcXHUwNTU5XFx1MDU2MS1cXHUwNTg3XFx1MDVEMC1cXHUwNUVBXFx1MDVGMC1cXHUwNUYyXFx1MDYyMC1cXHUwNjRBXFx1MDY2RVxcdTA2NkZcXHUwNjcxLVxcdTA2RDNcXHUwNkQ1XFx1MDZFNVxcdTA2RTZcXHUwNkVFXFx1MDZFRlxcdTA2RkEtXFx1MDZGQ1xcdTA2RkZcXHUwNzEwXFx1MDcxMi1cXHUwNzJGXFx1MDc0RC1cXHUwN0E1XFx1MDdCMVxcdTA3Q0EtXFx1MDdFQVxcdTA3RjRcXHUwN0Y1XFx1MDdGQVxcdTA4MDAtXFx1MDgxNVxcdTA4MUFcXHUwODI0XFx1MDgyOFxcdTA4NDAtXFx1MDg1OFxcdTA4QTBcXHUwOEEyLVxcdTA4QUNcXHUwOTA0LVxcdTA5MzlcXHUwOTNEXFx1MDk1MFxcdTA5NTgtXFx1MDk2MVxcdTA5NzEtXFx1MDk3N1xcdTA5NzktXFx1MDk3RlxcdTA5ODUtXFx1MDk4Q1xcdTA5OEZcXHUwOTkwXFx1MDk5My1cXHUwOUE4XFx1MDlBQS1cXHUwOUIwXFx1MDlCMlxcdTA5QjYtXFx1MDlCOVxcdTA5QkRcXHUwOUNFXFx1MDlEQ1xcdTA5RERcXHUwOURGLVxcdTA5RTFcXHUwOUYwXFx1MDlGMVxcdTBBMDUtXFx1MEEwQVxcdTBBMEZcXHUwQTEwXFx1MEExMy1cXHUwQTI4XFx1MEEyQS1cXHUwQTMwXFx1MEEzMlxcdTBBMzNcXHUwQTM1XFx1MEEzNlxcdTBBMzhcXHUwQTM5XFx1MEE1OS1cXHUwQTVDXFx1MEE1RVxcdTBBNzItXFx1MEE3NFxcdTBBODUtXFx1MEE4RFxcdTBBOEYtXFx1MEE5MVxcdTBBOTMtXFx1MEFBOFxcdTBBQUEtXFx1MEFCMFxcdTBBQjJcXHUwQUIzXFx1MEFCNS1cXHUwQUI5XFx1MEFCRFxcdTBBRDBcXHUwQUUwXFx1MEFFMVxcdTBCMDUtXFx1MEIwQ1xcdTBCMEZcXHUwQjEwXFx1MEIxMy1cXHUwQjI4XFx1MEIyQS1cXHUwQjMwXFx1MEIzMlxcdTBCMzNcXHUwQjM1LVxcdTBCMzlcXHUwQjNEXFx1MEI1Q1xcdTBCNURcXHUwQjVGLVxcdTBCNjFcXHUwQjcxXFx1MEI4M1xcdTBCODUtXFx1MEI4QVxcdTBCOEUtXFx1MEI5MFxcdTBCOTItXFx1MEI5NVxcdTBCOTlcXHUwQjlBXFx1MEI5Q1xcdTBCOUVcXHUwQjlGXFx1MEJBM1xcdTBCQTRcXHUwQkE4LVxcdTBCQUFcXHUwQkFFLVxcdTBCQjlcXHUwQkQwXFx1MEMwNS1cXHUwQzBDXFx1MEMwRS1cXHUwQzEwXFx1MEMxMi1cXHUwQzI4XFx1MEMyQS1cXHUwQzMzXFx1MEMzNS1cXHUwQzM5XFx1MEMzRFxcdTBDNThcXHUwQzU5XFx1MEM2MFxcdTBDNjFcXHUwQzg1LVxcdTBDOENcXHUwQzhFLVxcdTBDOTBcXHUwQzkyLVxcdTBDQThcXHUwQ0FBLVxcdTBDQjNcXHUwQ0I1LVxcdTBDQjlcXHUwQ0JEXFx1MENERVxcdTBDRTBcXHUwQ0UxXFx1MENGMVxcdTBDRjJcXHUwRDA1LVxcdTBEMENcXHUwRDBFLVxcdTBEMTBcXHUwRDEyLVxcdTBEM0FcXHUwRDNEXFx1MEQ0RVxcdTBENjBcXHUwRDYxXFx1MEQ3QS1cXHUwRDdGXFx1MEQ4NS1cXHUwRDk2XFx1MEQ5QS1cXHUwREIxXFx1MERCMy1cXHUwREJCXFx1MERCRFxcdTBEQzAtXFx1MERDNlxcdTBFMDEtXFx1MEUzMFxcdTBFMzJcXHUwRTMzXFx1MEU0MC1cXHUwRTQ2XFx1MEU4MVxcdTBFODJcXHUwRTg0XFx1MEU4N1xcdTBFODhcXHUwRThBXFx1MEU4RFxcdTBFOTQtXFx1MEU5N1xcdTBFOTktXFx1MEU5RlxcdTBFQTEtXFx1MEVBM1xcdTBFQTVcXHUwRUE3XFx1MEVBQVxcdTBFQUJcXHUwRUFELVxcdTBFQjBcXHUwRUIyXFx1MEVCM1xcdTBFQkRcXHUwRUMwLVxcdTBFQzRcXHUwRUM2XFx1MEVEQy1cXHUwRURGXFx1MEYwMFxcdTBGNDAtXFx1MEY0N1xcdTBGNDktXFx1MEY2Q1xcdTBGODgtXFx1MEY4Q1xcdTEwMDAtXFx1MTAyQVxcdTEwM0ZcXHUxMDUwLVxcdTEwNTVcXHUxMDVBLVxcdTEwNURcXHUxMDYxXFx1MTA2NVxcdTEwNjZcXHUxMDZFLVxcdTEwNzBcXHUxMDc1LVxcdTEwODFcXHUxMDhFXFx1MTBBMC1cXHUxMEM1XFx1MTBDN1xcdTEwQ0RcXHUxMEQwLVxcdTEwRkFcXHUxMEZDLVxcdTEyNDhcXHUxMjRBLVxcdTEyNERcXHUxMjUwLVxcdTEyNTZcXHUxMjU4XFx1MTI1QS1cXHUxMjVEXFx1MTI2MC1cXHUxMjg4XFx1MTI4QS1cXHUxMjhEXFx1MTI5MC1cXHUxMkIwXFx1MTJCMi1cXHUxMkI1XFx1MTJCOC1cXHUxMkJFXFx1MTJDMFxcdTEyQzItXFx1MTJDNVxcdTEyQzgtXFx1MTJENlxcdTEyRDgtXFx1MTMxMFxcdTEzMTItXFx1MTMxNVxcdTEzMTgtXFx1MTM1QVxcdTEzODAtXFx1MTM4RlxcdTEzQTAtXFx1MTNGNFxcdTE0MDEtXFx1MTY2Q1xcdTE2NkYtXFx1MTY3RlxcdTE2ODEtXFx1MTY5QVxcdTE2QTAtXFx1MTZFQVxcdTE3MDAtXFx1MTcwQ1xcdTE3MEUtXFx1MTcxMVxcdTE3MjAtXFx1MTczMVxcdTE3NDAtXFx1MTc1MVxcdTE3NjAtXFx1MTc2Q1xcdTE3NkUtXFx1MTc3MFxcdTE3ODAtXFx1MTdCM1xcdTE3RDdcXHUxN0RDXFx1MTgyMC1cXHUxODc3XFx1MTg4MC1cXHUxOEE4XFx1MThBQVxcdTE4QjAtXFx1MThGNVxcdTE5MDAtXFx1MTkxQ1xcdTE5NTAtXFx1MTk2RFxcdTE5NzAtXFx1MTk3NFxcdTE5ODAtXFx1MTlBQlxcdTE5QzEtXFx1MTlDN1xcdTFBMDAtXFx1MUExNlxcdTFBMjAtXFx1MUE1NFxcdTFBQTdcXHUxQjA1LVxcdTFCMzNcXHUxQjQ1LVxcdTFCNEJcXHUxQjgzLVxcdTFCQTBcXHUxQkFFXFx1MUJBRlxcdTFCQkEtXFx1MUJFNVxcdTFDMDAtXFx1MUMyM1xcdTFDNEQtXFx1MUM0RlxcdTFDNUEtXFx1MUM3RFxcdTFDRTktXFx1MUNFQ1xcdTFDRUUtXFx1MUNGMVxcdTFDRjVcXHUxQ0Y2XFx1MUQwMC1cXHUxREJGXFx1MUUwMC1cXHUxRjE1XFx1MUYxOC1cXHUxRjFEXFx1MUYyMC1cXHUxRjQ1XFx1MUY0OC1cXHUxRjREXFx1MUY1MC1cXHUxRjU3XFx1MUY1OVxcdTFGNUJcXHUxRjVEXFx1MUY1Ri1cXHUxRjdEXFx1MUY4MC1cXHUxRkI0XFx1MUZCNi1cXHUxRkJDXFx1MUZCRVxcdTFGQzItXFx1MUZDNFxcdTFGQzYtXFx1MUZDQ1xcdTFGRDAtXFx1MUZEM1xcdTFGRDYtXFx1MUZEQlxcdTFGRTAtXFx1MUZFQ1xcdTFGRjItXFx1MUZGNFxcdTFGRjYtXFx1MUZGQ1xcdTIwNzFcXHUyMDdGXFx1MjA5MC1cXHUyMDlDXFx1MjEwMlxcdTIxMDdcXHUyMTBBLVxcdTIxMTNcXHUyMTE1XFx1MjExOS1cXHUyMTFEXFx1MjEyNFxcdTIxMjZcXHUyMTI4XFx1MjEyQS1cXHUyMTJEXFx1MjEyRi1cXHUyMTM5XFx1MjEzQy1cXHUyMTNGXFx1MjE0NS1cXHUyMTQ5XFx1MjE0RVxcdTIxODNcXHUyMTg0XFx1MkMwMC1cXHUyQzJFXFx1MkMzMC1cXHUyQzVFXFx1MkM2MC1cXHUyQ0U0XFx1MkNFQi1cXHUyQ0VFXFx1MkNGMlxcdTJDRjNcXHUyRDAwLVxcdTJEMjVcXHUyRDI3XFx1MkQyRFxcdTJEMzAtXFx1MkQ2N1xcdTJENkZcXHUyRDgwLVxcdTJEOTZcXHUyREEwLVxcdTJEQTZcXHUyREE4LVxcdTJEQUVcXHUyREIwLVxcdTJEQjZcXHUyREI4LVxcdTJEQkVcXHUyREMwLVxcdTJEQzZcXHUyREM4LVxcdTJEQ0VcXHUyREQwLVxcdTJERDZcXHUyREQ4LVxcdTJEREVcXHUyRTJGXFx1MzAwNVxcdTMwMDZcXHUzMDMxLVxcdTMwMzVcXHUzMDNCXFx1MzAzQ1xcdTMwNDEtXFx1MzA5NlxcdTMwOUQtXFx1MzA5RlxcdTMwQTEtXFx1MzBGQVxcdTMwRkMtXFx1MzBGRlxcdTMxMDUtXFx1MzEyRFxcdTMxMzEtXFx1MzE4RVxcdTMxQTAtXFx1MzFCQVxcdTMxRjAtXFx1MzFGRlxcdTM0MDAtXFx1NERCNVxcdTRFMDAtXFx1OUZDQ1xcdUEwMDAtXFx1QTQ4Q1xcdUE0RDAtXFx1QTRGRFxcdUE1MDAtXFx1QTYwQ1xcdUE2MTAtXFx1QTYxRlxcdUE2MkFcXHVBNjJCXFx1QTY0MC1cXHVBNjZFXFx1QTY3Ri1cXHVBNjk3XFx1QTZBMC1cXHVBNkU1XFx1QTcxNy1cXHVBNzFGXFx1QTcyMi1cXHVBNzg4XFx1QTc4Qi1cXHVBNzhFXFx1QTc5MC1cXHVBNzkzXFx1QTdBMC1cXHVBN0FBXFx1QTdGOC1cXHVBODAxXFx1QTgwMy1cXHVBODA1XFx1QTgwNy1cXHVBODBBXFx1QTgwQy1cXHVBODIyXFx1QTg0MC1cXHVBODczXFx1QTg4Mi1cXHVBOEIzXFx1QThGMi1cXHVBOEY3XFx1QThGQlxcdUE5MEEtXFx1QTkyNVxcdUE5MzAtXFx1QTk0NlxcdUE5NjAtXFx1QTk3Q1xcdUE5ODQtXFx1QTlCMlxcdUE5Q0ZcXHVBQTAwLVxcdUFBMjhcXHVBQTQwLVxcdUFBNDJcXHVBQTQ0LVxcdUFBNEJcXHVBQTYwLVxcdUFBNzZcXHVBQTdBXFx1QUE4MC1cXHVBQUFGXFx1QUFCMVxcdUFBQjVcXHVBQUI2XFx1QUFCOS1cXHVBQUJEXFx1QUFDMFxcdUFBQzJcXHVBQURCLVxcdUFBRERcXHVBQUUwLVxcdUFBRUFcXHVBQUYyLVxcdUFBRjRcXHVBQjAxLVxcdUFCMDZcXHVBQjA5LVxcdUFCMEVcXHVBQjExLVxcdUFCMTZcXHVBQjIwLVxcdUFCMjZcXHVBQjI4LVxcdUFCMkVcXHVBQkMwLVxcdUFCRTJcXHVBQzAwLVxcdUQ3QTNcXHVEN0IwLVxcdUQ3QzZcXHVEN0NCLVxcdUQ3RkJcXHVGOTAwLVxcdUZBNkRcXHVGQTcwLVxcdUZBRDlcXHVGQjAwLVxcdUZCMDZcXHVGQjEzLVxcdUZCMTdcXHVGQjFEXFx1RkIxRi1cXHVGQjI4XFx1RkIyQS1cXHVGQjM2XFx1RkIzOC1cXHVGQjNDXFx1RkIzRVxcdUZCNDBcXHVGQjQxXFx1RkI0M1xcdUZCNDRcXHVGQjQ2LVxcdUZCQjFcXHVGQkQzLVxcdUZEM0RcXHVGRDUwLVxcdUZEOEZcXHVGRDkyLVxcdUZEQzdcXHVGREYwLVxcdUZERkJcXHVGRTcwLVxcdUZFNzRcXHVGRTc2LVxcdUZFRkNcXHVGRjIxLVxcdUZGM0FcXHVGRjQxLVxcdUZGNUFcXHVGRjY2LVxcdUZGQkVcXHVGRkMyLVxcdUZGQzdcXHVGRkNBLVxcdUZGQ0ZcXHVGRkQyLVxcdUZGRDdcXHVGRkRBLVxcdUZGRENdLyxcbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjIwNzUwNzBcbiAgJyonOiAvLi9cbn07XG5cbmV4cG9ydCB7IFBhdHRlcm5JbnB1dERlZmluaXRpb24gYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IGNyZWF0ZU1hc2sgZnJvbSAnLi9mYWN0b3J5LmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvdXRpbHMuanMnO1xuXG4vKiogTWFzayBwaXBlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gdHlwZXMgKi9cbmNvbnN0IFBJUEVfVFlQRSA9IHtcbiAgTUFTS0VEOiAndmFsdWUnLFxuICBVTk1BU0tFRDogJ3VubWFza2VkVmFsdWUnLFxuICBUWVBFRDogJ3R5cGVkVmFsdWUnXG59O1xuLyoqIENyZWF0ZXMgbmV3IHBpcGUgZnVuY3Rpb24gZGVwZW5kaW5nIG9uIG1hc2sgdHlwZSwgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBvcHRpb25zICovXG5mdW5jdGlvbiBjcmVhdGVQaXBlKGFyZywgZnJvbSwgdG8pIHtcbiAgaWYgKGZyb20gPT09IHZvaWQgMCkge1xuICAgIGZyb20gPSBQSVBFX1RZUEUuTUFTS0VEO1xuICB9XG4gIGlmICh0byA9PT0gdm9pZCAwKSB7XG4gICAgdG8gPSBQSVBFX1RZUEUuTUFTS0VEO1xuICB9XG4gIGNvbnN0IG1hc2tlZCA9IGNyZWF0ZU1hc2soYXJnKTtcbiAgcmV0dXJuIHZhbHVlID0+IG1hc2tlZC5ydW5Jc29sYXRlZChtID0+IHtcbiAgICBtW2Zyb21dID0gdmFsdWU7XG4gICAgcmV0dXJuIG1bdG9dO1xuICB9KTtcbn1cblxuLyoqIFBpcGVzIHZhbHVlIHRocm91Z2ggbWFzayBkZXBlbmRpbmcgb24gbWFzayB0eXBlLCBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIG9wdGlvbnMgKi9cbmZ1bmN0aW9uIHBpcGUodmFsdWUsIG1hc2ssIGZyb20sIHRvKSB7XG4gIHJldHVybiBjcmVhdGVQaXBlKG1hc2ssIGZyb20sIHRvKSh2YWx1ZSk7XG59XG5JTWFzay5QSVBFX1RZUEUgPSBQSVBFX1RZUEU7XG5JTWFzay5jcmVhdGVQaXBlID0gY3JlYXRlUGlwZTtcbklNYXNrLnBpcGUgPSBwaXBlO1xuXG5leHBvcnQgeyBQSVBFX1RZUEUsIGNyZWF0ZVBpcGUsIHBpcGUgfTtcbiIsImltcG9ydCBDaGFuZ2VEZXRhaWxzIGZyb20gJy4uL2NvcmUvY2hhbmdlLWRldGFpbHMuanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uL2NvcmUvaG9sZGVyLmpzJztcbmltcG9ydCBNYXNrZWRQYXR0ZXJuIGZyb20gJy4vcGF0dGVybi5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvdXRpbHMuanMnO1xuaW1wb3J0ICcuL2Jhc2UuanMnO1xuaW1wb3J0ICcuLi9jb3JlL2NvbnRpbnVvdXMtdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi9mYWN0b3J5LmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2NodW5rLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9jdXJzb3IuanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vZml4ZWQtZGVmaW5pdGlvbi5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9pbnB1dC1kZWZpbml0aW9uLmpzJztcbmltcG9ydCAnLi9yZWdleHAuanMnO1xuXG4vKiogUGF0dGVybiB3aGljaCBhY2NlcHRzIHJhbmdlcyAqL1xuY2xhc3MgTWFza2VkUmFuZ2UgZXh0ZW5kcyBNYXNrZWRQYXR0ZXJuIHtcbiAgLyoqXG4gICAgT3B0aW9uYWxseSBzZXRzIG1heCBsZW5ndGggb2YgcGF0dGVybi5cbiAgICBVc2VkIHdoZW4gcGF0dGVybiBsZW5ndGggaXMgbG9uZ2VyIHRoZW4gYHRvYCBwYXJhbSBsZW5ndGguIFBhZHMgemVyb3MgYXQgc3RhcnQgaW4gdGhpcyBjYXNlLlxuICAqL1xuXG4gIC8qKiBNaW4gYm91bmQgKi9cblxuICAvKiogTWF4IGJvdW5kICovXG5cbiAgZ2V0IF9tYXRjaEZyb20oKSB7XG4gICAgcmV0dXJuIHRoaXMubWF4TGVuZ3RoIC0gU3RyaW5nKHRoaXMuZnJvbSkubGVuZ3RoO1xuICB9XG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICBzdXBlcihvcHRzKTsgLy8gbWFzayB3aWxsIGJlIGNyZWF0ZWQgaW4gX3VwZGF0ZVxuICB9XG4gIHVwZGF0ZU9wdGlvbnMob3B0cykge1xuICAgIHN1cGVyLnVwZGF0ZU9wdGlvbnMob3B0cyk7XG4gIH1cbiAgX3VwZGF0ZShvcHRzKSB7XG4gICAgY29uc3Qge1xuICAgICAgdG8gPSB0aGlzLnRvIHx8IDAsXG4gICAgICBmcm9tID0gdGhpcy5mcm9tIHx8IDAsXG4gICAgICBtYXhMZW5ndGggPSB0aGlzLm1heExlbmd0aCB8fCAwLFxuICAgICAgYXV0b2ZpeCA9IHRoaXMuYXV0b2ZpeCxcbiAgICAgIC4uLnBhdHRlcm5PcHRzXG4gICAgfSA9IG9wdHM7XG4gICAgdGhpcy50byA9IHRvO1xuICAgIHRoaXMuZnJvbSA9IGZyb207XG4gICAgdGhpcy5tYXhMZW5ndGggPSBNYXRoLm1heChTdHJpbmcodG8pLmxlbmd0aCwgbWF4TGVuZ3RoKTtcbiAgICB0aGlzLmF1dG9maXggPSBhdXRvZml4O1xuICAgIGNvbnN0IGZyb21TdHIgPSBTdHJpbmcodGhpcy5mcm9tKS5wYWRTdGFydCh0aGlzLm1heExlbmd0aCwgJzAnKTtcbiAgICBjb25zdCB0b1N0ciA9IFN0cmluZyh0aGlzLnRvKS5wYWRTdGFydCh0aGlzLm1heExlbmd0aCwgJzAnKTtcbiAgICBsZXQgc2FtZUNoYXJzQ291bnQgPSAwO1xuICAgIHdoaWxlIChzYW1lQ2hhcnNDb3VudCA8IHRvU3RyLmxlbmd0aCAmJiB0b1N0cltzYW1lQ2hhcnNDb3VudF0gPT09IGZyb21TdHJbc2FtZUNoYXJzQ291bnRdKSArK3NhbWVDaGFyc0NvdW50O1xuICAgIHBhdHRlcm5PcHRzLm1hc2sgPSB0b1N0ci5zbGljZSgwLCBzYW1lQ2hhcnNDb3VudCkucmVwbGFjZSgvMC9nLCAnXFxcXDAnKSArICcwJy5yZXBlYXQodGhpcy5tYXhMZW5ndGggLSBzYW1lQ2hhcnNDb3VudCk7XG4gICAgc3VwZXIuX3VwZGF0ZShwYXR0ZXJuT3B0cyk7XG4gIH1cbiAgZ2V0IGlzQ29tcGxldGUoKSB7XG4gICAgcmV0dXJuIHN1cGVyLmlzQ29tcGxldGUgJiYgQm9vbGVhbih0aGlzLnZhbHVlKTtcbiAgfVxuICBib3VuZGFyaWVzKHN0cikge1xuICAgIGxldCBtaW5zdHIgPSAnJztcbiAgICBsZXQgbWF4c3RyID0gJyc7XG4gICAgY29uc3QgWywgcGxhY2Vob2xkZXIsIG51bV0gPSBzdHIubWF0Y2goL14oXFxEKikoXFxkKikoXFxEKikvKSB8fCBbXTtcbiAgICBpZiAobnVtKSB7XG4gICAgICBtaW5zdHIgPSAnMCcucmVwZWF0KHBsYWNlaG9sZGVyLmxlbmd0aCkgKyBudW07XG4gICAgICBtYXhzdHIgPSAnOScucmVwZWF0KHBsYWNlaG9sZGVyLmxlbmd0aCkgKyBudW07XG4gICAgfVxuICAgIG1pbnN0ciA9IG1pbnN0ci5wYWRFbmQodGhpcy5tYXhMZW5ndGgsICcwJyk7XG4gICAgbWF4c3RyID0gbWF4c3RyLnBhZEVuZCh0aGlzLm1heExlbmd0aCwgJzknKTtcbiAgICByZXR1cm4gW21pbnN0ciwgbWF4c3RyXTtcbiAgfVxuICBkb1ByZXBhcmVDaGFyKGNoLCBmbGFncykge1xuICAgIGlmIChmbGFncyA9PT0gdm9pZCAwKSB7XG4gICAgICBmbGFncyA9IHt9O1xuICAgIH1cbiAgICBsZXQgZGV0YWlscztcbiAgICBbY2gsIGRldGFpbHNdID0gc3VwZXIuZG9QcmVwYXJlQ2hhcihjaC5yZXBsYWNlKC9cXEQvZywgJycpLCBmbGFncyk7XG4gICAgaWYgKCFjaCkgZGV0YWlscy5za2lwID0gIXRoaXMuaXNDb21wbGV0ZTtcbiAgICByZXR1cm4gW2NoLCBkZXRhaWxzXTtcbiAgfVxuICBfYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmF1dG9maXggfHwgdGhpcy52YWx1ZS5sZW5ndGggKyAxID4gdGhpcy5tYXhMZW5ndGgpIHJldHVybiBzdXBlci5fYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpO1xuICAgIGNvbnN0IGZyb21TdHIgPSBTdHJpbmcodGhpcy5mcm9tKS5wYWRTdGFydCh0aGlzLm1heExlbmd0aCwgJzAnKTtcbiAgICBjb25zdCB0b1N0ciA9IFN0cmluZyh0aGlzLnRvKS5wYWRTdGFydCh0aGlzLm1heExlbmd0aCwgJzAnKTtcbiAgICBjb25zdCBbbWluc3RyLCBtYXhzdHJdID0gdGhpcy5ib3VuZGFyaWVzKHRoaXMudmFsdWUgKyBjaCk7XG4gICAgaWYgKE51bWJlcihtYXhzdHIpIDwgdGhpcy5mcm9tKSByZXR1cm4gc3VwZXIuX2FwcGVuZENoYXJSYXcoZnJvbVN0clt0aGlzLnZhbHVlLmxlbmd0aF0sIGZsYWdzKTtcbiAgICBpZiAoTnVtYmVyKG1pbnN0cikgPiB0aGlzLnRvKSB7XG4gICAgICBpZiAoIWZsYWdzLnRhaWwgJiYgdGhpcy5hdXRvZml4ID09PSAncGFkJyAmJiB0aGlzLnZhbHVlLmxlbmd0aCArIDEgPCB0aGlzLm1heExlbmd0aCkge1xuICAgICAgICByZXR1cm4gc3VwZXIuX2FwcGVuZENoYXJSYXcoZnJvbVN0clt0aGlzLnZhbHVlLmxlbmd0aF0sIGZsYWdzKS5hZ2dyZWdhdGUodGhpcy5fYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdXBlci5fYXBwZW5kQ2hhclJhdyh0b1N0clt0aGlzLnZhbHVlLmxlbmd0aF0sIGZsYWdzKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLl9hcHBlbmRDaGFyUmF3KGNoLCBmbGFncyk7XG4gIH1cbiAgZG9WYWxpZGF0ZShmbGFncykge1xuICAgIGNvbnN0IHN0ciA9IHRoaXMudmFsdWU7XG4gICAgY29uc3QgZmlyc3ROb25aZXJvID0gc3RyLnNlYXJjaCgvW14wXS8pO1xuICAgIGlmIChmaXJzdE5vblplcm8gPT09IC0xICYmIHN0ci5sZW5ndGggPD0gdGhpcy5fbWF0Y2hGcm9tKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBbbWluc3RyLCBtYXhzdHJdID0gdGhpcy5ib3VuZGFyaWVzKHN0cik7XG4gICAgcmV0dXJuIHRoaXMuZnJvbSA8PSBOdW1iZXIobWF4c3RyKSAmJiBOdW1iZXIobWluc3RyKSA8PSB0aGlzLnRvICYmIHN1cGVyLmRvVmFsaWRhdGUoZmxhZ3MpO1xuICB9XG4gIHBhZChmbGFncykge1xuICAgIGNvbnN0IGRldGFpbHMgPSBuZXcgQ2hhbmdlRGV0YWlscygpO1xuICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA9PT0gdGhpcy5tYXhMZW5ndGgpIHJldHVybiBkZXRhaWxzO1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICBjb25zdCBwYWRMZW5ndGggPSB0aGlzLm1heExlbmd0aCAtIHRoaXMudmFsdWUubGVuZ3RoO1xuICAgIGlmIChwYWRMZW5ndGgpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFkTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgZGV0YWlscy5hZ2dyZWdhdGUoc3VwZXIuX2FwcGVuZENoYXJSYXcoJzAnLCBmbGFncykpO1xuICAgICAgfVxuXG4gICAgICAvLyBhcHBlbmQgdGFpbFxuICAgICAgdmFsdWUuc3BsaXQoJycpLmZvckVhY2goY2ggPT4gdGhpcy5fYXBwZW5kQ2hhclJhdyhjaCkpO1xuICAgIH1cbiAgICByZXR1cm4gZGV0YWlscztcbiAgfVxufVxuSU1hc2suTWFza2VkUmFuZ2UgPSBNYXNrZWRSYW5nZTtcblxuZXhwb3J0IHsgTWFza2VkUmFuZ2UgYXMgZGVmYXVsdCB9O1xuIiwiaW1wb3J0IE1hc2tlZCBmcm9tICcuL2Jhc2UuanMnO1xuaW1wb3J0IElNYXNrIGZyb20gJy4uL2NvcmUvaG9sZGVyLmpzJztcbmltcG9ydCAnLi4vY29yZS9jaGFuZ2UtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvY29udGludW91cy10YWlsLWRldGFpbHMuanMnO1xuaW1wb3J0ICcuLi9jb3JlL3V0aWxzLmpzJztcblxuLyoqIE1hc2tpbmcgYnkgUmVnRXhwICovXG5jbGFzcyBNYXNrZWRSZWdFeHAgZXh0ZW5kcyBNYXNrZWQge1xuICAvKiogKi9cblxuICAvKiogRW5hYmxlIGNoYXJhY3RlcnMgb3ZlcndyaXRpbmcgKi9cblxuICAvKiogKi9cblxuICAvKiogKi9cblxuICAvKiogKi9cblxuICB1cGRhdGVPcHRpb25zKG9wdHMpIHtcbiAgICBzdXBlci51cGRhdGVPcHRpb25zKG9wdHMpO1xuICB9XG4gIF91cGRhdGUob3B0cykge1xuICAgIGNvbnN0IG1hc2sgPSBvcHRzLm1hc2s7XG4gICAgaWYgKG1hc2spIG9wdHMudmFsaWRhdGUgPSB2YWx1ZSA9PiB2YWx1ZS5zZWFyY2gobWFzaykgPj0gMDtcbiAgICBzdXBlci5fdXBkYXRlKG9wdHMpO1xuICB9XG59XG5JTWFzay5NYXNrZWRSZWdFeHAgPSBNYXNrZWRSZWdFeHA7XG5cbmV4cG9ydCB7IE1hc2tlZFJlZ0V4cCBhcyBkZWZhdWx0IH07XG4iLCJpbXBvcnQgQ2hhbmdlRGV0YWlscyBmcm9tICcuLi9jb3JlL2NoYW5nZS1kZXRhaWxzLmpzJztcbmltcG9ydCBJTWFzayBmcm9tICcuLi9jb3JlL2hvbGRlci5qcyc7XG5pbXBvcnQgY3JlYXRlTWFzaywgeyBub3JtYWxpemVPcHRzIH0gZnJvbSAnLi9mYWN0b3J5LmpzJztcbmltcG9ydCBNYXNrZWRQYXR0ZXJuIGZyb20gJy4vcGF0dGVybi5qcyc7XG5pbXBvcnQgJy4uL2NvcmUvdXRpbHMuanMnO1xuaW1wb3J0ICcuL2Jhc2UuanMnO1xuaW1wb3J0ICcuLi9jb3JlL2NvbnRpbnVvdXMtdGFpbC1kZXRhaWxzLmpzJztcbmltcG9ydCAnLi9wYXR0ZXJuL2NodW5rLXRhaWwtZGV0YWlscy5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9jdXJzb3IuanMnO1xuaW1wb3J0ICcuL3BhdHRlcm4vZml4ZWQtZGVmaW5pdGlvbi5qcyc7XG5pbXBvcnQgJy4vcGF0dGVybi9pbnB1dC1kZWZpbml0aW9uLmpzJztcbmltcG9ydCAnLi9yZWdleHAuanMnO1xuXG4vKiogUGF0dGVybiBtYXNrICovXG5jbGFzcyBSZXBlYXRCbG9jayBleHRlbmRzIE1hc2tlZFBhdHRlcm4ge1xuICBnZXQgcmVwZWF0RnJvbSgpIHtcbiAgICB2YXIgX3JlZjtcbiAgICByZXR1cm4gKF9yZWYgPSBBcnJheS5pc0FycmF5KHRoaXMucmVwZWF0KSA/IHRoaXMucmVwZWF0WzBdIDogdGhpcy5yZXBlYXQgPT09IEluZmluaXR5ID8gMCA6IHRoaXMucmVwZWF0KSAhPSBudWxsID8gX3JlZiA6IDA7XG4gIH1cbiAgZ2V0IHJlcGVhdFRvKCkge1xuICAgIHZhciBfcmVmMjtcbiAgICByZXR1cm4gKF9yZWYyID0gQXJyYXkuaXNBcnJheSh0aGlzLnJlcGVhdCkgPyB0aGlzLnJlcGVhdFsxXSA6IHRoaXMucmVwZWF0KSAhPSBudWxsID8gX3JlZjIgOiBJbmZpbml0eTtcbiAgfVxuICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgc3VwZXIob3B0cyk7XG4gIH1cbiAgdXBkYXRlT3B0aW9ucyhvcHRzKSB7XG4gICAgc3VwZXIudXBkYXRlT3B0aW9ucyhvcHRzKTtcbiAgfVxuICBfdXBkYXRlKG9wdHMpIHtcbiAgICB2YXIgX3JlZjMsIF9yZWY0LCBfdGhpcyRfYmxvY2tzO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlcGVhdCxcbiAgICAgIC4uLmJsb2NrT3B0c1xuICAgIH0gPSBub3JtYWxpemVPcHRzKG9wdHMpOyAvLyBUT0RPIHR5cGVcbiAgICB0aGlzLl9ibG9ja09wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9ibG9ja09wdHMsIGJsb2NrT3B0cyk7XG4gICAgY29uc3QgYmxvY2sgPSBjcmVhdGVNYXNrKHRoaXMuX2Jsb2NrT3B0cyk7XG4gICAgdGhpcy5yZXBlYXQgPSAoX3JlZjMgPSAoX3JlZjQgPSByZXBlYXQgIT0gbnVsbCA/IHJlcGVhdCA6IGJsb2NrLnJlcGVhdCkgIT0gbnVsbCA/IF9yZWY0IDogdGhpcy5yZXBlYXQpICE9IG51bGwgPyBfcmVmMyA6IEluZmluaXR5OyAvLyBUT0RPIHR5cGVcblxuICAgIHN1cGVyLl91cGRhdGUoe1xuICAgICAgbWFzazogJ20nLnJlcGVhdChNYXRoLm1heCh0aGlzLnJlcGVhdFRvID09PSBJbmZpbml0eSAmJiAoKF90aGlzJF9ibG9ja3MgPSB0aGlzLl9ibG9ja3MpID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRfYmxvY2tzLmxlbmd0aCkgfHwgMCwgdGhpcy5yZXBlYXRGcm9tKSksXG4gICAgICBibG9ja3M6IHtcbiAgICAgICAgbTogYmxvY2tcbiAgICAgIH0sXG4gICAgICBlYWdlcjogYmxvY2suZWFnZXIsXG4gICAgICBvdmVyd3JpdGU6IGJsb2NrLm92ZXJ3cml0ZSxcbiAgICAgIHNraXBJbnZhbGlkOiBibG9jay5za2lwSW52YWxpZCxcbiAgICAgIGxhenk6IGJsb2NrLmxhenksXG4gICAgICBwbGFjZWhvbGRlckNoYXI6IGJsb2NrLnBsYWNlaG9sZGVyQ2hhcixcbiAgICAgIGRpc3BsYXlDaGFyOiBibG9jay5kaXNwbGF5Q2hhclxuICAgIH0pO1xuICB9XG4gIF9hbGxvY2F0ZUJsb2NrKGJpKSB7XG4gICAgaWYgKGJpIDwgdGhpcy5fYmxvY2tzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX2Jsb2Nrc1tiaV07XG4gICAgaWYgKHRoaXMucmVwZWF0VG8gPT09IEluZmluaXR5IHx8IHRoaXMuX2Jsb2Nrcy5sZW5ndGggPCB0aGlzLnJlcGVhdFRvKSB7XG4gICAgICB0aGlzLl9ibG9ja3MucHVzaChjcmVhdGVNYXNrKHRoaXMuX2Jsb2NrT3B0cykpO1xuICAgICAgdGhpcy5tYXNrICs9ICdtJztcbiAgICAgIHJldHVybiB0aGlzLl9ibG9ja3NbdGhpcy5fYmxvY2tzLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgfVxuICBfYXBwZW5kQ2hhclJhdyhjaCwgZmxhZ3MpIHtcbiAgICBpZiAoZmxhZ3MgPT09IHZvaWQgMCkge1xuICAgICAgZmxhZ3MgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgZGV0YWlscyA9IG5ldyBDaGFuZ2VEZXRhaWxzKCk7XG4gICAgZm9yIChsZXQgYmkgPSAoX3RoaXMkX21hcFBvc1RvQmxvY2skID0gKF90aGlzJF9tYXBQb3NUb0Jsb2NrID0gdGhpcy5fbWFwUG9zVG9CbG9jayh0aGlzLmRpc3BsYXlWYWx1ZS5sZW5ndGgpKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkX21hcFBvc1RvQmxvY2suaW5kZXgpICE9IG51bGwgPyBfdGhpcyRfbWFwUG9zVG9CbG9jayQgOiBNYXRoLm1heCh0aGlzLl9ibG9ja3MubGVuZ3RoIC0gMSwgMCksIGJsb2NrLCBhbGxvY2F0ZWQ7XG4gICAgLy8gdHJ5IHRvIGdldCBhIGJsb2NrIG9yXG4gICAgLy8gdHJ5IHRvIGFsbG9jYXRlIGEgbmV3IGJsb2NrIGlmIG5vdCBhbGxvY2F0ZWQgYWxyZWFkeVxuICAgIGJsb2NrID0gKF90aGlzJF9ibG9ja3MkYmkgPSB0aGlzLl9ibG9ja3NbYmldKSAhPSBudWxsID8gX3RoaXMkX2Jsb2NrcyRiaSA6IGFsbG9jYXRlZCA9ICFhbGxvY2F0ZWQgJiYgdGhpcy5fYWxsb2NhdGVCbG9jayhiaSk7ICsrYmkpIHtcbiAgICAgIHZhciBfdGhpcyRfbWFwUG9zVG9CbG9jayQsIF90aGlzJF9tYXBQb3NUb0Jsb2NrLCBfdGhpcyRfYmxvY2tzJGJpLCBfZmxhZ3MkX2JlZm9yZVRhaWxTdGE7XG4gICAgICBjb25zdCBibG9ja0RldGFpbHMgPSBibG9jay5fYXBwZW5kQ2hhcihjaCwge1xuICAgICAgICAuLi5mbGFncyxcbiAgICAgICAgX2JlZm9yZVRhaWxTdGF0ZTogKF9mbGFncyRfYmVmb3JlVGFpbFN0YSA9IGZsYWdzLl9iZWZvcmVUYWlsU3RhdGUpID09IG51bGwgfHwgKF9mbGFncyRfYmVmb3JlVGFpbFN0YSA9IF9mbGFncyRfYmVmb3JlVGFpbFN0YS5fYmxvY2tzKSA9PSBudWxsID8gdm9pZCAwIDogX2ZsYWdzJF9iZWZvcmVUYWlsU3RhW2JpXVxuICAgICAgfSk7XG4gICAgICBpZiAoYmxvY2tEZXRhaWxzLnNraXAgJiYgYWxsb2NhdGVkKSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbGFzdCBhbGxvY2F0ZWQgYmxvY2sgYW5kIGJyZWFrXG4gICAgICAgIHRoaXMuX2Jsb2Nrcy5wb3AoKTtcbiAgICAgICAgdGhpcy5tYXNrID0gdGhpcy5tYXNrLnNsaWNlKDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRldGFpbHMuYWdncmVnYXRlKGJsb2NrRGV0YWlscyk7XG4gICAgICBpZiAoYmxvY2tEZXRhaWxzLmNvbnN1bWVkKSBicmVhazsgLy8gZ28gbmV4dCBjaGFyXG4gICAgfVxuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIF90cmltRW1wdHlUYWlsKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgdmFyIF90aGlzJF9tYXBQb3NUb0Jsb2NrMiwgX3RoaXMkX21hcFBvc1RvQmxvY2szO1xuICAgIGlmIChmcm9tUG9zID09PSB2b2lkIDApIHtcbiAgICAgIGZyb21Qb3MgPSAwO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdEJsb2NrSW5kZXggPSBNYXRoLm1heCgoKF90aGlzJF9tYXBQb3NUb0Jsb2NrMiA9IHRoaXMuX21hcFBvc1RvQmxvY2soZnJvbVBvcykpID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRfbWFwUG9zVG9CbG9jazIuaW5kZXgpIHx8IDAsIHRoaXMucmVwZWF0RnJvbSwgMCk7XG4gICAgbGV0IGxhc3RCbG9ja0luZGV4O1xuICAgIGlmICh0b1BvcyAhPSBudWxsKSBsYXN0QmxvY2tJbmRleCA9IChfdGhpcyRfbWFwUG9zVG9CbG9jazMgPSB0aGlzLl9tYXBQb3NUb0Jsb2NrKHRvUG9zKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJF9tYXBQb3NUb0Jsb2NrMy5pbmRleDtcbiAgICBpZiAobGFzdEJsb2NrSW5kZXggPT0gbnVsbCkgbGFzdEJsb2NrSW5kZXggPSB0aGlzLl9ibG9ja3MubGVuZ3RoIC0gMTtcbiAgICBsZXQgcmVtb3ZlQ291bnQgPSAwO1xuICAgIGZvciAobGV0IGJsb2NrSW5kZXggPSBsYXN0QmxvY2tJbmRleDsgZmlyc3RCbG9ja0luZGV4IDw9IGJsb2NrSW5kZXg7IC0tYmxvY2tJbmRleCwgKytyZW1vdmVDb3VudCkge1xuICAgICAgaWYgKHRoaXMuX2Jsb2Nrc1tibG9ja0luZGV4XS51bm1hc2tlZFZhbHVlKSBicmVhaztcbiAgICB9XG4gICAgaWYgKHJlbW92ZUNvdW50KSB7XG4gICAgICB0aGlzLl9ibG9ja3Muc3BsaWNlKGxhc3RCbG9ja0luZGV4IC0gcmVtb3ZlQ291bnQgKyAxLCByZW1vdmVDb3VudCk7XG4gICAgICB0aGlzLm1hc2sgPSB0aGlzLm1hc2suc2xpY2UocmVtb3ZlQ291bnQpO1xuICAgIH1cbiAgfVxuICByZXNldCgpIHtcbiAgICBzdXBlci5yZXNldCgpO1xuICAgIHRoaXMuX3RyaW1FbXB0eVRhaWwoKTtcbiAgfVxuICByZW1vdmUoZnJvbVBvcywgdG9Qb3MpIHtcbiAgICBpZiAoZnJvbVBvcyA9PT0gdm9pZCAwKSB7XG4gICAgICBmcm9tUG9zID0gMDtcbiAgICB9XG4gICAgaWYgKHRvUG9zID09PSB2b2lkIDApIHtcbiAgICAgIHRvUG9zID0gdGhpcy5kaXNwbGF5VmFsdWUubGVuZ3RoO1xuICAgIH1cbiAgICBjb25zdCByZW1vdmVEZXRhaWxzID0gc3VwZXIucmVtb3ZlKGZyb21Qb3MsIHRvUG9zKTtcbiAgICB0aGlzLl90cmltRW1wdHlUYWlsKGZyb21Qb3MsIHRvUG9zKTtcbiAgICByZXR1cm4gcmVtb3ZlRGV0YWlscztcbiAgfVxuICB0b3RhbElucHV0UG9zaXRpb25zKGZyb21Qb3MsIHRvUG9zKSB7XG4gICAgaWYgKGZyb21Qb3MgPT09IHZvaWQgMCkge1xuICAgICAgZnJvbVBvcyA9IDA7XG4gICAgfVxuICAgIGlmICh0b1BvcyA9PSBudWxsICYmIHRoaXMucmVwZWF0VG8gPT09IEluZmluaXR5KSByZXR1cm4gSW5maW5pdHk7XG4gICAgcmV0dXJuIHN1cGVyLnRvdGFsSW5wdXRQb3NpdGlvbnMoZnJvbVBvcywgdG9Qb3MpO1xuICB9XG4gIGdldCBzdGF0ZSgpIHtcbiAgICByZXR1cm4gc3VwZXIuc3RhdGU7XG4gIH1cbiAgc2V0IHN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy5fYmxvY2tzLmxlbmd0aCA9IHN0YXRlLl9ibG9ja3MubGVuZ3RoO1xuICAgIHRoaXMubWFzayA9IHRoaXMubWFzay5zbGljZSgwLCB0aGlzLl9ibG9ja3MubGVuZ3RoKTtcbiAgICBzdXBlci5zdGF0ZSA9IHN0YXRlO1xuICB9XG59XG5JTWFzay5SZXBlYXRCbG9jayA9IFJlcGVhdEJsb2NrO1xuXG5leHBvcnQgeyBSZXBlYXRCbG9jayBhcyBkZWZhdWx0IH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=