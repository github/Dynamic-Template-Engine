
/// <summary>
    /// The type of template definition. For Example- HandleBars, Liquid, etc
    /// </summary>
    export enum TemplateType
    {
        HandleBars = 1
    };

    /// <summary>
    /// The type of data source for which transformation needs to happen
    /// </summary>
    export enum SourceType
    {
        IssueOpened = 1,
        PullRequestOpened = 2,
    };

    /// <summary>
    /// The client for which the event card needs to be rendered
    /// </summary>
    export enum ClientType
    {
        Teams = 1
    };