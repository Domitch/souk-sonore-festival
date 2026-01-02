import { Menu, Ticket, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "./button";

interface NavigationProps {
	currentPage: string;
	onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuItems = [
		{ id: "accueil", label: "Accueil" },
		{ id: "artistes", label: "Artistes" },
		{ id: "billetterie", label: "Billetterie" },
		{ id: "contact", label: "Contact" },
	];

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className="fixed top-0 left-0 right-0 z-50 bg-[#0f0d0a]/95 backdrop-blur-md border-b border-[#d4a574]/20"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<motion.button
						whileHover={{ scale: 1.05 }}
						onClick={() => onNavigate("accueil")}
						className="flex flex-col items-start"
					>
						<span className="text-2xl tracking-tight text-[#d4a574]">
							Souk Sonore
						</span>
						<span className="text-xs text-[#b8a99a] tracking-widest uppercase">
							Festival 2025
						</span>
					</motion.button>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						{menuItems.map((item) => (
							<motion.button
								key={item.id}
								onClick={() => onNavigate(item.id)}
								className={`relative px-3 py-2 transition-colors ${
									currentPage === item.id
										? "text-[#d4a574]"
										: "text-[#f5f1ea] hover:text-[#d4a574]"
								}`}
								whileHover={{ y: -2 }}
							>
								{item.label}
								{currentPage === item.id && (
									<motion.div
										layoutId="activeTab"
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4a574]"
										transition={{ type: "spring", stiffness: 300, damping: 30 }}
									/>
								)}
							</motion.button>
						))}
					</div>

					{/* CTA Button Desktop */}
					<div className="hidden md:block">
						<Button
							onClick={() => onNavigate("billetterie")}
							className="bg-[#d4a574] text-[#0f0d0a] hover:bg-[#c97d5d] hover:text-[#f5f1ea] transition-all duration-300"
						>
							<Ticket className="mr-2 h-4 w-4" />
							Acheter un pass
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden text-[#d4a574] hover:text-[#c97d5d] transition-colors"
					>
						{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden bg-[#1a1612] border-t border-[#d4a574]/20"
					>
						<div className="px-4 py-6 space-y-4">
							{menuItems.map((item) => (
								<button
									type="button"
									key={item.id}
									onClick={() => {
										onNavigate(item.id);
										setIsMenuOpen(false);
									}}
									className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
										currentPage === item.id
											? "bg-[#d4a574]/20 text-[#d4a574]"
											: "text-[#f5f1ea] hover:bg-[#2a2520]"
									}`}
								>
									{item.label}
								</button>
							))}
							<Button
								onClick={() => {
									onNavigate("billetterie");
									setIsMenuOpen(false);
								}}
								className="w-full bg-[#d4a574] text-[#0f0d0a] hover:bg-[#c97d5d] hover:text-[#f5f1ea]"
							>
								<Ticket className="mr-2 h-4 w-4" />
								Acheter un pass
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
}
