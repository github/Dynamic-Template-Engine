/// <summary>
/// The type of template definition. For Example- HandleBars, Liquid, etc
/// </summary>
export enum TemplateType
{
    HandleBars = "HandleBars"
};

/// <summary>
/// The type of data source for which transformation needs to happen
/// </summary>
export enum SourceType
{
    IssueOpened = "IssueOpened",
    PullRequestOpened = "PullRequestOpened",
};

/// <summary>
/// The client for which the event card needs to be rendered
/// </summary>
export enum ClientType
{
    Teams = "Teams"
};