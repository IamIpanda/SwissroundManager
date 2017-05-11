import { MatchState } from './match'

export enum PeaceMode
{
    CanPeace,
    PeaceWithLose,
    CantPeace
}

export class Config {
    public static peaceMode: PeaceMode = PeaceMode.CanPeace;

    public static score: any = {};

    public static ResultScore(result: MatchState) : number
    {
        let answer = Config.score[result];
        return answer ? answer : 0;
    }

    public static get peaceModeStr() : string
    {
        switch (Config.peaceMode)
        {
            case PeaceMode.CanPeace:
                return '平局得 ' + Config.score[MatchState.Peace].toString() + ' 分';
            case PeaceMode.CantPeace:
                return '不允许平局';
            case PeaceMode.PeaceWithLose:
                return '平局者双败';
        }
        return "";
    }

    public static valueDescription(value: number) : string
    {
        return value == 0 ? "不得分" : "得 " + value.toString() + " 分";
    }

    public static get ruleDescription() : string
    {
        return "胜者" + Config.valueDescription(Config.score[MatchState.Win]) + "，" +
        "败者" + Config.valueDescription(Config.score[MatchState.Lose]) + "，" +
        Config.peaceModeStr + "，" +
        "轮空" + Config.valueDescription(Config.score[MatchState.Bye]);
    }
}

Config.score = {};
Config.score[MatchState.Win] = 1;
Config.score[MatchState.Peace] = 0;
Config.score[MatchState.Bye] = 0;
Config.score[MatchState.Lose] = 0;