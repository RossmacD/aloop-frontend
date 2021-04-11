import { CgSearch, CgClose, CgEye, CgMathPlus, CgUserList, CgComment, CgArrowRightO, CgUserAdd, CgMoreVertical, CgHashtag } from 'react-icons/cg';
import { GenIcon, IconType } from 'react-icons/lib';

// Icon packs can easily be switched out here
export const SearchIcon = CgSearch;
export const CancelIcon = CgClose;
export const ViewIcon = CgEye;
export const PlusIcon = CgMathPlus;
export const ContactsIcon = CgUserList;
export const MessageIcon = CgComment;
export const SendIcon = CgArrowRightO;
export const VertMenuIcon = CgMoreVertical;
export const AddUserIcon = CgUserAdd;
export const MessageChannelIcon = CgHashtag;




// Custom Pilot Icon from SVG using react Icons to generate a JSX Element
export const PilotIcon: IconType = function GsaPilot(props) {
  return GenIcon({
    tag: 'svg',
    attr: { viewBox: '0 0 30 30' },
    child: [
      {
        tag: 'path',
        attr: {
          d:
            'M 15 3 C 12.424 3 9.146 7 5 7 A 1 1 0 0 0 4 8 A 1 1 0 0 0 4.0800781 8.390625 C 4.4457382 9.4439688 6 11 6 11 L 24 11 C 24 11 25.548201 9.4497261 25.917969 8.3964844 A 1 1 0 0 0 26 8 A 1 1 0 0 0 25 7 C 20.854 7 17.576 3 15 3 z M 13.5 6 L 16.5 6 C 16.5 8 15 9 15 9 C 15 9 13.5 8 13.5 6 z M 6 13 L 6 15 L 6 18.570312 L 6 19.800781 C 6 21.067448 6.5630258 21.996554 7.140625 22.501953 C 7.4938002 22.810981 7.645978 22.816388 7.8847656 22.910156 C 8.1424173 23.584885 9.903933 27.927845 14.888672 27.994141 A 1.0001 1.0001 0 0 0 15 28 A 1.0001 1.0001 0 0 0 15.117188 27.994141 C 20.097312 27.92442 21.857687 23.584613 22.115234 22.910156 C 22.354022 22.816386 22.5062 22.810986 22.859375 22.501953 C 23.436974 21.996554 24 21.067448 24 19.800781 L 24 18.199219 L 24 14 L 24 13 L 6 13 z M 21.841797 15.667969 C 21.994443 16.744933 22 18.10001 22 19 L 22 19.800781 C 22 20.534115 21.763416 20.803446 21.541016 20.998047 C 21.318615 21.192648 21.158203 21.230469 21.158203 21.230469 L 20.625 21.363281 L 20.451172 21.882812 C 20.451172 21.882812 19.133333 26 15 26 C 10.866667 26 9.5488281 21.882813 9.5488281 21.882812 L 9.375 21.363281 L 8.8417969 21.230469 C 8.8417969 21.230469 8.6813852 21.192649 8.4589844 20.998047 C 8.2365836 20.803446 8 20.534115 8 19.800781 L 8 18.570312 C 8 17.467528 8.1745039 16.617264 8.4707031 15.951172 C 9.7751013 17.133205 12.25471 19 15 19 C 17.965969 19 20.64868 16.805012 21.841797 15.667969 z',
        },
        child: [],
      },
    ],
  })(props);
};
