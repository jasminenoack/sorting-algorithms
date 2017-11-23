export class RouterLocation {
  public location: RegExp;
  public names: string[];

  constructor(
    location: string,
    public fun: (
      location: string,
      data: { [key: string]: string },
      query: { [key: string]: string },
    ) => string,
  ) {
    const names: string[] = [];
    // if location is a string
    // check for match sections
    if (location.indexOf("(") !== -1) {
      const groups = location.match(/\([^)]*\)/g);
      groups.forEach((group) => {
        const groupTrimmed = group.replace(/^\(/, "").replace(/\)$/, "");
        if (groupTrimmed.indexOf("|") !== -1) {
          const [name, regex] = groupTrimmed.split("|");
          names.push(name);
          location = location.replace(group, `(${regex})`);
        } else {
          names.push(groupTrimmed);
        }
      });
    }
    this.names = names;
    this.location = new RegExp(location);
  }

  public match(hash: string) {
    const match = hash.match(this.location);
    if (!match) {
      return;
    }

    const urlParams: { [key: string]: string } = {};

    this.names.forEach((name, index) => {
      urlParams[name] = match[index + 1];
    });

    return urlParams;
  }
}
