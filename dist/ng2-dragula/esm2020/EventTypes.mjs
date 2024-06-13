export var EventTypes;
(function (EventTypes) {
    EventTypes["Cancel"] = "cancel";
    EventTypes["Cloned"] = "cloned";
    EventTypes["Drag"] = "drag";
    EventTypes["DragEnd"] = "dragend";
    EventTypes["Drop"] = "drop";
    EventTypes["Out"] = "out";
    EventTypes["Over"] = "over";
    EventTypes["Remove"] = "remove";
    EventTypes["Shadow"] = "shadow";
    EventTypes["DropModel"] = "dropModel";
    EventTypes["RemoveModel"] = "removeModel";
})(EventTypes || (EventTypes = {}));
export const AllEvents = Object.keys(EventTypes).map(k => EventTypes[k]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRUeXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvbmcyLWRyYWd1bGEvc3JjL0V2ZW50VHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFOLElBQVksVUFZWDtBQVpELFdBQVksVUFBVTtJQUNsQiwrQkFBaUIsQ0FBQTtJQUNqQiwrQkFBaUIsQ0FBQTtJQUNqQiwyQkFBYSxDQUFBO0lBQ2IsaUNBQW1CLENBQUE7SUFDbkIsMkJBQWEsQ0FBQTtJQUNiLHlCQUFXLENBQUE7SUFDWCwyQkFBYSxDQUFBO0lBQ2IsK0JBQWlCLENBQUE7SUFDakIsK0JBQWlCLENBQUE7SUFDakIscUNBQXVCLENBQUE7SUFDdkIseUNBQTJCLENBQUE7QUFDL0IsQ0FBQyxFQVpXLFVBQVUsS0FBVixVQUFVLFFBWXJCO0FBRUQsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUE0QixDQUFlLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEV2ZW50VHlwZXMge1xyXG4gICAgQ2FuY2VsID0gXCJjYW5jZWxcIixcclxuICAgIENsb25lZCA9IFwiY2xvbmVkXCIsXHJcbiAgICBEcmFnID0gXCJkcmFnXCIsXHJcbiAgICBEcmFnRW5kID0gXCJkcmFnZW5kXCIsXHJcbiAgICBEcm9wID0gXCJkcm9wXCIsXHJcbiAgICBPdXQgPSBcIm91dFwiLFxyXG4gICAgT3ZlciA9IFwib3ZlclwiLFxyXG4gICAgUmVtb3ZlID0gXCJyZW1vdmVcIixcclxuICAgIFNoYWRvdyA9IFwic2hhZG93XCIsXHJcbiAgICBEcm9wTW9kZWwgPSBcImRyb3BNb2RlbFwiLFxyXG4gICAgUmVtb3ZlTW9kZWwgPSBcInJlbW92ZU1vZGVsXCIsXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBbGxFdmVudHM6IEV2ZW50VHlwZXNbXSA9IE9iamVjdC5rZXlzKEV2ZW50VHlwZXMpLm1hcChrID0+IEV2ZW50VHlwZXNbayBhcyBrZXlvZiB0eXBlb2YgRXZlbnRUeXBlc10gYXMgRXZlbnRUeXBlcyk7Il19