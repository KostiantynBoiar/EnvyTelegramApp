import React from 'react';

const ListItem = ({ name, plus, icon }) => {
	return (
		<li className='flex items-center justify-between w-full list_item rounded-[18.48px] bg-white'>
			<div className='flex items-center'>
			{icon && (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='32'
					height='23'
					viewBox='0 0 32 23'
					fill='none'
					className='block mr-[10px]'
				>
					<path
						d='M10.0578 11.5C13.0561 11.5 15.4828 8.9279 15.4828 5.75C15.4828 2.5721 13.0561 0 10.0578 0C7.05953 0 4.63281 2.5721 4.63281 5.75C4.63281 8.9279 7.05953 11.5 10.0578 11.5ZM13.7778 13.1429H13.3758C12.3683 13.6563 11.2494 13.9643 10.0578 13.9643C8.86625 13.9643 7.75219 13.6563 6.73984 13.1429H6.33781C3.25719 13.1429 0.757812 15.792 0.757812 19.0571V20.5357C0.757812 21.8962 1.79922 23 3.08281 23H17.0328C18.3164 23 19.3578 21.8962 19.3578 20.5357V19.0571C19.3578 15.792 16.8584 13.1429 13.7778 13.1429ZM24.0078 11.5C26.575 11.5 28.6578 9.29241 28.6578 6.57143C28.6578 3.85045 26.575 1.64286 24.0078 1.64286C21.4406 1.64286 19.3578 3.85045 19.3578 6.57143C19.3578 9.29241 21.4406 11.5 24.0078 11.5ZM26.3328 13.1429H26.1487C25.4755 13.3893 24.7634 13.5536 24.0078 13.5536C23.2522 13.5536 22.5402 13.3893 21.8669 13.1429H21.6828C20.6947 13.1429 19.7841 13.4458 18.9848 13.9335C20.1667 15.2837 20.9078 17.0754 20.9078 19.0571V21.0286C20.9078 21.1415 20.8836 21.2493 20.8787 21.3571H29.4328C30.7164 21.3571 31.7578 20.2533 31.7578 18.8929C31.7578 15.715 29.3311 13.1429 26.3328 13.1429Z'
						fill='#040404'
					/>
				</svg>
			)}
			<p className='text-black font-semibold'>{name}</p>
			</div>
			<div className='text-[#2972FF] text-[26px] font-semibold leading-[33px] tracking-[1.3px] flex items-center gap-[10px]'>
				<p>+{plus}</p>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='28'
					height='31'
					viewBox='0 0 28 31'
					fill='none'
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M16.9995 0.49539L17.1349 0.510296C17.421 0.544935 17.6876 0.596788 17.9603 0.691477C18.1892 0.98346 18.1931 1.34808 18.2287 1.70623C18.2541 1.88889 18.2541 1.88889 18.3875 1.95771L18.525 2.00918C18.6135 2.07697 18.6998 2.14775 18.7839 2.22095L18.9138 2.33223C19.0907 2.51369 19.1483 2.63393 19.1648 2.88863L19.1604 3.09158L19.1569 3.29649L19.1525 3.45238L18.9015 3.51512L19.027 3.82886C19.2134 3.80739 19.2134 3.80739 19.4035 3.76612C19.5435 3.48624 19.4972 3.17763 19.4094 2.88887C19.2286 2.43156 18.998 2.06768 18.6706 1.70377C18.3539 1.3507 18.3539 1.3507 18.3368 1.06796C18.4949 1.00982 18.572 1.00023 18.7348 1.05149L18.8971 1.12801L19.0785 1.21327L19.2702 1.30719L19.4663 1.40221C19.9897 1.66218 20.4537 1.95909 20.9095 2.32292L21.0467 2.42145C21.3762 2.66999 21.5367 3.00097 21.7133 3.36506L21.7252 3.38963L21.8235 3.57812C22.4752 4.88323 22.5313 6.33265 22.1017 7.71922C21.5084 9.45371 20.5633 10.9989 19.3368 12.3547L19.2484 12.4532C19.1773 12.5302 19.1025 12.6036 19.027 12.6763L18.8388 12.8645C18.6229 13.0695 18.3843 13.2478 18.1486 13.4293L18.0491 13.5067C16.0353 15.0601 13.448 15.6291 11.0385 16.2804C7.05539 17.1905 7.05539 17.1905 4.1715 19.857C3.83913 20.4902 3.64872 21.1333 3.82811 21.8419C4.13448 22.6945 4.92048 23.2714 5.70122 23.6809C6.87646 24.1921 8.1408 23.9659 9.29559 23.5248C10.676 22.9786 11.9138 22.2253 13.139 21.3931C13.3729 21.2349 13.608 21.0785 13.8431 20.922L13.8851 20.8941C14.1347 20.7278 14.3839 20.5609 14.6328 20.3934C16.5148 19.1267 16.5148 19.1267 17.4523 18.5883C17.5816 18.5131 17.709 18.4354 17.8363 18.3569C19.5146 17.3402 21.6904 17.0636 23.6076 17.4451C23.9122 17.5211 24.1991 17.6322 24.4861 17.7589L24.655 17.8292C26.0843 18.4756 26.8773 19.9408 27.4274 21.3355C27.9045 22.6421 27.7903 23.9278 27.2136 25.1842C26.4467 26.6782 25.2383 27.8692 23.8586 28.8025L23.6762 28.9272C22.3833 29.7666 20.8894 30.4302 19.3408 30.5594L19.1969 30.5729C18.1943 30.6199 17.1889 30.2546 16.4366 29.6001C16.2683 29.445 16.1088 29.2831 15.9524 29.1162L15.7941 28.9476C14.9771 28.0108 14.6143 26.9798 14.6842 25.7438C14.7988 24.5217 15.6783 23.5699 16.5755 22.8125C17.7937 21.9069 19.2961 21.6103 20.7775 21.8262C21.4914 21.9472 22.1375 22.1968 22.5821 22.7924C23.0278 23.4829 23.1315 24.2308 23.0429 25.0376C22.9895 25.2691 22.9093 25.4593 22.7919 25.6651L22.7157 25.8041C22.1713 26.7019 21.2877 27.3862 20.282 27.673C19.49 27.8235 18.829 27.6578 18.1486 27.2338C17.789 26.9492 17.5103 26.6394 17.4396 26.1674C17.4309 26.0346 17.429 25.904 17.4309 25.771L17.432 25.6294C17.4464 25.1224 17.5822 24.6423 17.9603 24.2846C18.5206 23.9211 18.9861 23.854 19.6545 23.9081C19.9948 24.0079 20.1761 24.2307 20.3447 24.5356C20.4584 24.8767 20.452 25.2247 20.333 25.5631C20.1612 25.8118 20.0075 25.9469 19.7173 26.0376C19.4925 26.0423 19.394 25.9847 19.2153 25.8533C19.227 25.7396 19.227 25.7396 19.278 25.6023C19.4388 25.4925 19.4388 25.4925 19.5918 25.4141C19.5493 25.22 19.5493 25.22 19.4035 25.1474C19.1489 25.0838 18.902 25.0812 18.6505 25.1631C18.4648 25.3464 18.4338 25.4947 18.4309 25.7514C18.437 25.9906 18.4561 26.1434 18.6074 26.3318C18.887 26.5789 19.1492 26.5686 19.5082 26.5651C20.0319 26.5111 20.4784 26.2582 20.8766 25.9246C20.9722 25.8533 21.1533 25.6561 21.1533 25.6561C21.1533 25.6561 21.2502 25.5556 21.3041 25.4626C21.5431 25.0335 21.6154 24.6894 21.5048 24.2074C21.3811 23.8263 21.1553 23.5974 20.8153 23.3905C20.0896 23.0276 19.1485 23.1879 18.4018 23.4254C17.6752 23.6729 16.9751 23.9428 16.5877 24.6454C16.262 25.3749 16.2526 26.1972 16.5095 26.9531C16.8378 27.6771 17.3708 28.0701 18.0819 28.3828C19.2523 28.811 20.5797 28.674 21.7142 28.2059C23.2732 27.4733 24.5629 26.0824 25.1763 24.4729C25.4322 23.7382 25.5092 22.8741 25.1763 22.1512C24.6024 21.1387 23.5823 20.4206 22.4713 20.0842C22.3052 20.0506 22.1452 20.0297 21.9762 20.0178L21.8298 20.0048C19.0821 19.8818 16.2924 22.0257 14.2935 23.6885C12.1371 25.4616 9.26579 27.0565 6.38557 26.8334C4.66707 26.6595 3.08638 25.8797 1.94862 24.5663C1.28013 23.6979 0.814978 22.6275 0.767438 21.5237L0.75984 21.3811C0.717651 19.8474 1.3367 18.3741 2.3555 17.2466C2.58766 17.002 2.82493 16.7763 3.0891 16.5667L3.22612 16.4564C4.18585 15.7345 5.41893 15.3466 6.55739 15.0075L6.72038 14.9588C7.27583 14.7942 7.83456 14.6422 8.39398 14.4918C10.8435 13.8361 10.8435 13.8361 13.2542 13.0528L13.3997 13.0015C15.4782 12.2597 17.2775 11.06 18.2741 9.03693C18.5907 8.31019 18.801 7.61547 18.7996 6.81723L18.7993 6.64196C18.7915 6.20916 18.7333 5.84564 18.525 5.46031L18.4152 5.25638C17.883 4.60583 17.2279 4.3257 16.4004 4.22275C15.315 4.1269 14.2948 4.36525 13.2542 4.64458L13.2582 4.78062C13.2476 5.29193 13.0984 5.59503 12.8184 6.01695C12.6323 6.30041 12.4979 6.58773 12.3758 6.9035L12.3302 7.0203C11.9221 8.09586 11.8253 9.22762 11.6978 10.3632L11.6733 10.5773C11.6584 10.7097 11.6442 10.8421 11.6307 10.9747C11.5905 11.3405 11.5276 11.6511 11.3718 11.9861C11.0683 12.2228 10.7553 12.3265 10.3678 12.2998C9.9694 12.1893 9.72969 11.9336 9.48937 11.6096L9.79576 11.5238C9.96677 11.4727 10.1358 11.415 10.3051 11.3586V10.3546C9.80802 10.153 9.80802 10.153 9.30113 9.97814C9.39626 9.73599 9.52423 9.61872 9.74037 9.47616C9.92582 9.40304 10.1136 9.343 10.3051 9.28792L10.274 9.17909C10.2258 8.9625 10.2387 8.75647 10.2423 8.53494L10.1316 8.48445C9.98748 8.40738 9.87819 8.3214 9.75605 8.21336L9.63938 8.11091L9.55212 8.03296C9.7491 7.74931 9.9421 7.62413 10.2423 7.46823C10.244 7.36758 10.2453 7.26692 10.2463 7.16626L10.2485 6.9964C10.2493 6.83234 10.2493 6.83234 10.1796 6.65251L10.1262 6.76231C9.44521 8.15701 8.72674 9.5427 7.65082 10.6769C6.83585 11.5414 5.87576 12.7391 5.77329 13.9741L5.78726 14.1195L5.94413 14.2136L6.101 14.3077C6.1206 14.4764 6.1206 14.4764 6.101 14.6215C5.89733 14.7573 5.70626 14.7766 5.46739 14.7717C5.34802 14.747 5.34802 14.747 5.19508 14.5979C4.921 14.1375 4.96767 13.4951 5.08674 12.9802C5.43225 11.7191 6.18905 10.752 7.10888 9.85265C7.56781 9.40283 7.96023 8.95646 8.29717 8.40945L8.37744 8.28218C8.88387 7.469 9.22717 6.60088 9.36388 5.64855L9.25088 5.75223C8.9674 6.01014 8.68091 6.26177 8.38344 6.50349L8.21089 6.64663C8.04618 6.77801 8.04618 6.77801 7.89323 6.87801C7.64559 7.05136 7.55711 7.14877 7.49958 7.45377C7.47852 7.68914 7.47658 7.92231 7.48145 8.15846C7.22988 8.22957 7.10805 8.21613 6.8775 8.09571C6.73821 8.0202 6.73821 8.0202 6.60298 7.97021L6.41473 8.03296C6.3359 8.22224 6.3359 8.22223 6.27747 8.44474L6.21203 8.67245L6.16374 8.84868C5.85188 8.92692 5.6951 8.88115 5.41077 8.72319C5.2892 8.55455 5.2892 8.55455 5.22253 8.40945C4.95009 8.42104 4.95009 8.42104 4.72055 8.53494C4.70953 8.81573 4.72952 9.0751 4.78329 9.35066C4.45312 9.37047 4.24651 9.34434 3.96757 9.16242C3.6639 8.86565 3.53291 8.58309 3.52638 8.15576C3.56069 7.71228 3.76219 7.40424 4.07346 7.09959C4.37403 6.84295 4.70546 6.67346 5.05553 6.4957C5.70254 6.16473 6.30278 5.7565 6.86451 5.29559C6.97946 5.20931 6.97946 5.20931 7.11599 5.14657C7.25258 5.08856 7.25257 5.08856 7.2932 4.89558H7.4187L7.46625 4.79189C7.55959 4.61548 7.67065 4.45948 7.7864 4.29687L7.78734 4.29555C8.03451 3.94517 8.26312 3.58518 8.48933 3.221C9.14781 2.16967 9.81899 1.37067 11.0463 1.01698C11.4586 0.923207 11.8938 0.87385 12.313 0.942468C12.4731 1.07109 12.5529 1.17178 12.6464 1.35425C12.852 1.65122 13.177 1.69657 13.5131 1.75819C13.814 1.81389 14.0156 1.89645 14.2386 2.11114C14.3626 2.3355 14.4009 2.57432 14.4464 2.8249C14.7063 2.83806 14.7063 2.83806 14.9484 2.76215C14.976 2.52535 14.9754 2.42045 14.8269 2.2288L14.6347 2.07193L14.5322 1.98418C14.1461 1.68871 13.7006 1.55323 13.2437 1.40428L13.0819 1.35131L12.9355 1.3048C12.815 1.25621 12.815 1.25621 12.6895 1.13071C12.713 0.965998 12.713 0.965998 12.7523 0.816972C13.1521 0.663415 13.5173 0.58559 13.9445 0.565981L14.0826 0.556759C14.2405 0.546834 14.3982 0.540431 14.5563 0.534607L14.7115 0.524144C14.9345 0.519282 15.078 0.519254 15.2567 0.661574C15.5132 0.951458 15.5132 0.951458 15.5132 1.13071L15.6249 1.18439C15.7518 1.24982 15.8655 1.32171 15.9838 1.40131C16.2605 1.58019 16.5549 1.68384 16.8659 1.78932C17.0191 1.88368 17.0191 1.88368 17.076 2.06286C17.0814 2.24641 17.0686 2.38914 17.023 2.56607L16.986 2.7146L16.9564 2.8249L17.2073 2.9504C17.3263 2.8504 17.3891 2.79196 17.4228 2.63788C17.4235 2.22067 17.3301 1.92341 17.0654 1.59813C16.6922 1.23469 16.1661 1.03749 15.7014 0.816972L15.5759 0.754224C15.5955 0.632651 15.5955 0.632651 15.6387 0.503234C16.0727 0.35855 16.5523 0.444737 16.9995 0.49539ZM9.12686 3.94137C9.31384 3.59656 9.51089 3.31279 9.77958 3.02491C9.91023 2.87348 9.91023 2.87348 10.0541 2.88765C9.81732 3.69288 9.81732 3.69288 9.30113 4.39359C9.08319 4.65417 8.89563 4.8999 8.54816 4.95832C8.52923 4.76477 8.52923 4.76477 8.65797 4.62498C8.83791 4.41005 8.99092 4.18675 9.12686 3.94137Z'
						fill='#2972FF'
					/>
					<path
						d='M23.1058 4.95813C23.492 5.15081 23.7149 5.46645 23.9215 5.8366C24.0153 6.11801 24.0569 6.43347 23.9281 6.71017C23.8587 6.81311 23.8587 6.81311 23.7332 6.96606C23.9021 6.8895 23.9021 6.8895 24.047 6.77782C24.3232 6.74874 24.3232 6.74874 24.46 6.85478C24.6557 7.09962 24.6893 7.4466 24.6585 7.75139C24.6083 7.99008 24.5377 8.19336 24.4235 8.40926C24.461 8.39632 24.4985 8.38338 24.5372 8.37004C24.6744 8.34651 24.6744 8.34651 24.8627 8.47201C24.9607 8.96105 24.8279 9.54768 24.5725 9.96619C24.3809 10.2299 24.1654 10.4241 23.8587 10.5427C23.5966 10.5315 23.5966 10.5315 23.4822 10.4172C23.4648 10.2112 23.4677 10.0042 23.4666 9.79755C23.4653 9.73956 23.464 9.68156 23.4626 9.62181C23.4623 9.56608 23.462 9.51035 23.4616 9.45293C23.4608 9.37615 23.4608 9.37615 23.4599 9.29781C23.4871 9.13268 23.5431 9.07821 23.6705 8.97399C23.6291 8.91187 23.5877 8.84975 23.545 8.78575C23.515 8.67529 23.4878 8.56405 23.4626 8.4524C23.3789 8.1271 23.2685 7.9623 23.043 7.71903C22.992 7.57001 22.992 7.57001 22.9803 7.46804C22.9104 7.48099 22.8405 7.49393 22.7685 7.50726C22.6934 7.51503 22.6184 7.52279 22.541 7.53079C22.4996 7.48938 22.4582 7.44796 22.4155 7.4053C22.4351 7.20529 22.4351 7.20529 22.4783 6.96606C22.5503 6.55076 22.5617 6.13578 22.5763 5.71503C22.579 5.64219 22.5817 5.56935 22.5845 5.49431C22.5911 5.31559 22.5976 5.13687 22.6038 4.95813C22.7934 4.86329 22.9021 4.90433 23.1058 4.95813ZM23.1058 5.64836C23.085 6.04179 23.0643 6.43522 23.043 6.84057C23.3041 6.72321 23.3041 6.72321 23.4822 6.52683C23.5264 6.2031 23.5264 6.2031 23.4139 5.90842C23.3215 5.7918 23.3215 5.7918 23.1685 5.64836C23.1478 5.64836 23.1271 5.64836 23.1058 5.64836ZM23.8862 7.49942C23.846 7.52854 23.8058 7.55766 23.7644 7.58766C23.7334 7.6103 23.7024 7.63295 23.6705 7.65629C23.7489 7.87335 23.8383 8.04199 23.9842 8.22102C24.1728 7.90669 24.1909 7.6985 24.1725 7.34255C24.0587 7.34255 23.9752 7.43467 23.8862 7.49942ZM24.1058 9.29165C23.9588 9.41197 23.9588 9.41197 23.9685 9.64461C23.9737 9.7132 23.9789 9.78179 23.9842 9.85246C24.1149 9.78738 24.1149 9.78738 24.2352 9.66421C24.2862 9.43803 24.2862 9.43803 24.298 9.22498C24.2202 9.22019 24.2202 9.22019 24.1058 9.29165Z'
						fill='#2972FF'
					/>
					<path
						d='M25.3646 14.4957C25.9445 14.9502 25.9445 14.9502 26.0487 15.1915C26.0549 15.3114 26.0549 15.3114 25.9294 15.4996C25.8097 15.5363 25.8097 15.5363 25.6651 15.5548C25.5868 15.5658 25.5868 15.5658 25.5068 15.577C25.4521 15.5838 25.3975 15.5907 25.3411 15.5977C25.2334 15.6118 25.1257 15.6262 25.0181 15.6411C24.9702 15.6471 24.9224 15.6531 24.8731 15.6594C24.7276 15.6899 24.6178 15.7456 24.4862 15.8134C24.2488 15.8365 24.1894 15.8247 23.9842 15.6879C23.8937 15.7554 23.8036 15.8235 23.7136 15.8918C23.6634 15.9297 23.6131 15.9675 23.5614 16.0065C23.4267 16.121 23.3306 16.2327 23.2312 16.3781C23.0213 16.3594 22.9354 16.3336 22.7854 16.1808C22.7423 16.1256 22.6991 16.0703 22.6547 16.0134C22.4101 15.7243 22.2114 15.5961 21.8488 15.4943C21.7253 15.4369 21.7253 15.4369 21.6684 15.3151C21.6625 15.1859 21.6625 15.1859 21.788 15.0251C22.139 14.74 22.4502 14.6518 22.8947 14.6653C23.0984 14.6909 23.246 14.7648 23.4195 14.8722C23.4686 14.8968 23.5178 14.9214 23.5685 14.9467C23.6021 14.9635 23.6358 14.9803 23.6705 14.9977C23.62 14.9601 23.5695 14.9226 23.5175 14.8839C23.3567 14.7467 23.3567 14.7467 23.294 14.5584C23.3253 14.429 23.3253 14.429 23.4195 14.3074C24.046 14.0227 24.8106 14.1034 25.3646 14.4957ZM24.0469 14.7467C24.2022 14.9952 24.2022 14.9952 24.3607 15.2487C24.6725 15.2164 24.9436 15.1712 25.2392 15.0604C24.9929 14.7629 24.683 14.6426 24.3058 14.6016C24.1591 14.6096 24.1591 14.6096 24.0469 14.7467ZM23.7332 15.1232C23.7539 15.1853 23.7746 15.2474 23.796 15.3114C23.796 15.2493 23.796 15.1872 23.796 15.1232C23.7752 15.1232 23.7545 15.1232 23.7332 15.1232ZM22.541 15.1859C22.598 15.2569 22.6556 15.3274 22.7136 15.3977C22.7456 15.437 22.7776 15.4763 22.8106 15.5168C22.9226 15.6304 23.0229 15.688 23.1685 15.7506C23.2513 15.6678 23.3341 15.585 23.4195 15.4996C23.0959 15.2357 22.9625 15.1781 22.541 15.1859Z'
						fill='#2972FF'
					/>
					<path
						d='M22.4153 7.71924C22.6103 7.72388 22.7463 7.74241 22.8962 7.87292C23.1543 8.16602 23.31 8.40599 23.2977 8.80556C23.2516 9.1577 23.0403 9.36356 22.7918 9.60167C22.8371 9.58096 22.8824 9.56026 22.929 9.53892C23.1066 9.4758 23.2328 9.46552 23.4193 9.47617C23.5648 9.76725 23.4603 10.1673 23.3626 10.4637C23.1505 10.9345 22.8233 11.2162 22.3526 11.4214C22.1878 11.4135 22.1878 11.4135 22.0388 11.3586C21.9486 11.2566 21.9486 11.2566 21.9133 11.1076C21.9447 11.0071 21.9764 10.9066 22.0094 10.8066C22.071 10.5169 22.0586 10.199 21.9761 9.91541C21.8226 9.80873 21.8226 9.80873 21.6623 9.72717C21.5257 9.31742 21.86 8.81907 22.0427 8.4526C22.104 8.33354 22.1654 8.21458 22.2271 8.09572C22.29 7.97032 22.3528 7.84484 22.4153 7.71924ZM22.6663 8.34672C22.5006 8.67802 22.335 9.00933 22.1643 9.35068C22.4695 9.2286 22.6029 9.1726 22.7918 8.91145C22.7993 8.7166 22.7708 8.53667 22.729 8.34672C22.7083 8.34672 22.6876 8.34672 22.6663 8.34672ZM22.5408 10.2291C22.5408 10.3948 22.5408 10.5605 22.5408 10.7311C22.8094 10.4942 22.8094 10.4942 22.9173 10.1664C22.6803 10.1477 22.6803 10.1477 22.5408 10.2291Z'
						fill='#2972FF'
					/>
					<path
						d='M21.9763 15.6883C22.3622 15.8703 22.6882 16.2345 22.8548 16.6296C22.8234 16.8492 22.8234 16.8492 22.7293 16.9433C22.6227 16.9473 22.5159 16.947 22.4092 16.945C22.3105 16.9439 22.3105 16.9439 22.2099 16.9427C22.0713 16.9405 21.9328 16.9381 21.7942 16.9353C21.4274 16.9315 21.1316 16.9539 20.7841 17.0688C20.5684 17.0453 20.5684 17.0453 20.4076 17.006C20.353 16.8213 20.3344 16.721 20.4013 16.5376C20.7759 15.9103 21.2175 15.5524 21.9763 15.6883ZM21.1606 16.3158C21.1399 16.3572 21.1192 16.3987 21.0978 16.4413C21.4292 16.4413 21.7605 16.4413 22.1018 16.4413C22.0596 16.2497 22.0596 16.2497 21.9253 16.1786C21.6206 16.0654 21.4261 16.1624 21.1606 16.3158Z'
						fill='#2972FF'
					/>
					<path
						d='M24.6098 16.1116C24.9906 16.312 25.2099 16.5822 25.3608 16.9744C25.4386 17.2298 25.4212 17.3884 25.302 17.6332C25.0164 17.6491 24.8397 17.6096 24.5843 17.4842C24.1961 17.3118 23.841 17.2593 23.423 17.2165C23.2313 17.194 23.2313 17.194 23.1058 17.1312C23.0739 16.7966 23.1468 16.638 23.3568 16.3783C23.7433 16.0028 24.1022 15.9182 24.6098 16.1116ZM23.7333 16.6292C23.7333 16.6707 23.7333 16.7121 23.7333 16.7547C23.8627 16.7849 23.9921 16.8149 24.1215 16.8449C24.1936 16.8617 24.2657 16.8784 24.3399 16.8957C24.5138 16.935 24.6877 16.9718 24.8627 17.0057C24.7331 16.7533 24.6236 16.6173 24.3607 16.5038C24.0839 16.4799 23.9671 16.4734 23.7333 16.6292Z'
						fill='#2972FF'
					/>
					<path
						d='M26.3281 15.8515C26.6272 16.1058 26.8556 16.4294 26.9332 16.8177C26.9254 16.9902 26.9254 16.9902 26.8705 17.1314C26.7568 17.2177 26.7568 17.2177 26.6195 17.2569C26.5352 17.2389 26.4516 17.2173 26.3685 17.1942C26.1465 17.1813 25.9356 17.1736 25.7214 17.2373C25.6865 17.2438 25.6515 17.2503 25.6155 17.2569C25.4416 17.1174 25.3704 16.9604 25.2822 16.7589C25.1451 16.4714 25.01 16.3577 24.7371 16.1902C24.6782 16.0255 24.6782 16.0255 24.6743 15.8765C24.7371 15.751 24.7371 15.751 24.838 15.713C25.3119 15.6348 25.9051 15.5916 26.3281 15.8515ZM25.49 16.1275C25.5936 16.3138 25.6971 16.5002 25.8038 16.6922C25.9901 16.6922 26.1765 16.6922 26.3685 16.6922C26.2491 16.4713 26.1511 16.3134 25.9293 16.1902C25.7001 16.1447 25.7001 16.1447 25.49 16.1275Z'
						fill='#2972FF'
					/>
					<path
						d='M26.6195 17.4509C26.9178 17.6829 27.0782 17.9637 27.1843 18.3237C27.2268 18.6697 27.1505 18.9566 26.996 19.2649C26.9546 19.3063 26.9132 19.3477 26.8705 19.3904C26.722 19.388 26.722 19.388 26.5568 19.3277C26.4269 19.1811 26.4269 19.1811 26.298 18.9904C26.0439 18.6251 25.7553 18.3326 25.4268 18.0335C25.3018 17.8845 25.3018 17.8845 25.305 17.7479C25.4105 17.5452 25.5809 17.4141 25.7974 17.3437C26.0821 17.2919 26.3629 17.311 26.6195 17.4509ZM25.9921 17.8217C26.2046 18.1161 26.4176 18.3883 26.6823 18.6374C26.7027 18.3449 26.671 18.1831 26.494 17.9472C26.2915 17.8122 26.2252 17.8091 25.9921 17.8217Z'
						fill='#2972FF'
					/>
					<path
						d='M21.5175 9.93115C21.6626 9.97821 21.6626 9.97821 21.7724 10.0959C21.91 10.4398 21.9786 10.8089 21.8391 11.1626C21.6403 11.5052 21.479 11.6301 21.0979 11.7351C20.8849 11.7496 20.8849 11.7496 20.6704 11.7469C20.5988 11.7465 20.5272 11.7461 20.4535 11.7457C20.2822 11.7351 20.2822 11.7351 20.2194 11.6724C20.1933 11.4711 20.2006 11.3849 20.3204 11.2177C20.3647 11.1723 20.409 11.127 20.4547 11.0802C20.6532 10.8696 20.814 10.6603 20.9724 10.4174C21.2764 9.99843 21.2764 9.99843 21.5175 9.93115ZM21.3489 10.7312C21.2246 10.9175 21.2246 10.9175 21.0979 11.1077C21.16 11.1077 21.2221 11.1077 21.2861 11.1077C21.3275 11.0663 21.3689 11.0248 21.4116 10.9822C21.3916 10.8499 21.3916 10.8499 21.3489 10.7312Z'
						fill='#2972FF'
					/>
				</svg>
			</div>
		</li>
	);
};

export default ListItem;
