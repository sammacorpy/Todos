export const primaryColor = "#6B62FF";
export const shadowColor = "#777";
export const invertColor = "#E6523C";
export const backgroundColor = "#FEFEFE";
export const softBlack = "#555";
export const priorityThreeColor = "#43D973"
export const priorityTwoColor = "#F0C53E"
export const priorityOneColor = "#E63C75"
export const colorByPriority = {
    High: priorityOneColor,
    Medium: priorityTwoColor,
    Low: priorityThreeColor,
  } as { [key: string]: string };

export const viewPortWidth = window.visualViewport?.width || 1080;
export const viewPortHeight = window.visualViewport?.width || 1920;
export const isMobileView = viewPortWidth < 800; 
