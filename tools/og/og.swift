// og <portrait.jpg> <brushed.jpg> <emblem.png> <out.jpg> <tagline> <info> — 1200x630 link-preview image
import AppKit
let a = CommandLine.arguments
let W = 1200, H = 630
let cs = CGColorSpace(name: CGColorSpace.sRGB)!
let ctx = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: 0, space: cs, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.setFillColor(CGColor(red: 0, green: 0, blue: 0, alpha: 1)); ctx.fill(CGRect(x: 0, y: 0, width: W, height: H))
func load(_ p: String) -> CGImage { let s = CGImageSourceCreateWithURL(URL(fileURLWithPath: p) as CFURL, nil)!; return CGImageSourceCreateImageAtIndex(s, 0, nil)! }
// portrait on the right, black and white, fading into black on the left
let portrait = load(a[1])
let gray = CGContext(data: nil, width: portrait.width, height: portrait.height, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceGray(), bitmapInfo: 0)!
gray.draw(portrait, in: CGRect(x: 0, y: 0, width: portrait.width, height: portrait.height))
let bw = gray.makeImage()!
let ph = CGFloat(H) * 1.18, pw = ph * CGFloat(bw.width) / CGFloat(bw.height)
let pr = CGRect(x: CGFloat(W) - pw + 40, y: CGFloat(H) - ph + 40, width: pw, height: ph)
ctx.saveGState(); ctx.draw(bw, in: pr); ctx.restoreGState()
let fade = CGGradient(colorsSpace: cs, colors: [CGColor(red: 0, green: 0, blue: 0, alpha: 1), CGColor(red: 0, green: 0, blue: 0, alpha: 0)] as CFArray, locations: [0, 1])!
ctx.drawLinearGradient(fade, start: CGPoint(x: pr.minX + 10, y: 0), end: CGPoint(x: pr.minX + 300, y: 0), options: [.drawsBeforeStartLocation])
ctx.drawLinearGradient(fade, start: CGPoint(x: 0, y: 0), end: CGPoint(x: 0, y: 120), options: [.drawsBeforeStartLocation])
// text helpers
NSGraphicsContext.saveGraphicsState(); NSGraphicsContext.current = NSGraphicsContext(cgContext: ctx, flipped: false)
func draw(_ s: String, _ font: NSFont, _ color: NSColor, _ x: CGFloat, _ y: CGFloat) {
  (s as NSString).draw(at: NSPoint(x: x, y: y), withAttributes: [.font: font, .foregroundColor: color, .kern: 0.5])
}
// emblem
let em = load(a[3]); ctx.draw(em, in: CGRect(x: 64, y: 468, width: 104, height: 104))
// HOTLAND in brushed silver: text as a mask, then texture + chrome sheen through it
let mast = NSFont(name: "Didot-Bold", size: 132) ?? NSFont.boldSystemFont(ofSize: 132)
let maskCtx = CGContext(data: nil, width: W, height: H, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceGray(), bitmapInfo: 0)!
maskCtx.setFillColor(gray: 0, alpha: 1); maskCtx.fill(CGRect(x: 0, y: 0, width: W, height: H))
NSGraphicsContext.current = NSGraphicsContext(cgContext: maskCtx, flipped: false)
("HOTLAND" as NSString).draw(at: NSPoint(x: 58, y: 300), withAttributes: [.font: mast, .foregroundColor: NSColor.white, .kern: 2])
let mask = maskCtx.makeImage()!
NSGraphicsContext.current = NSGraphicsContext(cgContext: ctx, flipped: false)
ctx.saveGState(); ctx.clip(to: CGRect(x: 0, y: 0, width: W, height: H), mask: mask)
ctx.draw(load(a[2]), in: CGRect(x: 0, y: 280, width: 760, height: 190))
let sheen = CGGradient(colorsSpace: cs, colors: [CGColor(red: 1, green: 1, blue: 1, alpha: 0.55), CGColor(red: 1, green: 1, blue: 1, alpha: 0), CGColor(red: 0.08, green: 0.08, blue: 0.1, alpha: 0.6), CGColor(red: 1, green: 1, blue: 1, alpha: 0), CGColor(red: 1, green: 1, blue: 1, alpha: 0.5)] as CFArray, locations: [0, 0.4, 0.52, 0.62, 1])!
ctx.drawLinearGradient(sheen, start: CGPoint(x: 0, y: 445), end: CGPoint(x: 0, y: 318), options: [])
ctx.restoreGState()
draw(a[5], NSFont(name: "Didot-Italic", size: 50) ?? NSFont.systemFont(ofSize: 50), NSColor(srgbRed: 0.94, green: 0.3, blue: 0.4, alpha: 1), 64, 222)
draw(a[6], NSFont(name: "HelveticaNeue", size: 26) ?? NSFont.systemFont(ofSize: 26), NSColor(white: 0.82, alpha: 1), 66, 150)
draw("18+", NSFont(name: "HelveticaNeue-Medium", size: 20) ?? NSFont.systemFont(ofSize: 20), NSColor(white: 0.55, alpha: 1), 66, 70)
NSGraphicsContext.restoreGraphicsState()
let out = ctx.makeImage()!
let d = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[4]) as CFURL, "public.jpeg" as CFString, 1, nil)!
CGImageDestinationAddImage(d, out, [kCGImageDestinationLossyCompressionQuality: 0.84] as CFDictionary); CGImageDestinationFinalize(d)
print("wrote", a[4])
