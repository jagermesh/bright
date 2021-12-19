<?php

/**
 * Project:     Bright framework
 * Author:      Jager Mesh (jagermesh@gmail.com)
 *
 * @version 2.0
 * @package Bright Core
 */

namespace Bright;

class BrCore extends BrObject
{
  const HRS = 'hrs';
  const MINS = 'mins';
  const SECS = 'secs';

  private $processId      = null;
  private $basePath       = null;
  private $basePathEx     = null;
  private $scriptBasePath = null;
  private $brightPath     = null;
  private $scriptName     = null;
  private $threadMode     = false;
  private $tempFiles      = array();

  // reconfigured paths

  private $templatesPath   = null;
  private $tempPath        = null;
  private $appPath         = null;
  private $apiPath         = null;
  private $logsPath        = null;
  private $dataSourcesPath = null;

  private $mimeTypes = [
    '1km' => 'application/vnd.1000minds.decision-model+xml',
    '3dml' => 'text/vnd.in3d.3dml',
    '3ds' => 'image/x-3ds',
    '3g2' => 'video/3gpp2',
    '3gp' => 'video/3gp',
    '3gpp' => 'video/3gpp',
    '3mf' => 'model/3mf',
    '7z' => 'application/x-7z-compressed',
    '7zip' => 'application/x-7z-compressed',
    '123' => 'application/vnd.lotus-1-2-3',
    'aab' => 'application/x-authorware-bin',
    'aac' => 'audio/x-acc',
    'aam' => 'application/x-authorware-map',
    'aas' => 'application/x-authorware-seg',
    'abw' => 'application/x-abiword',
    'ac' => 'application/vnd.nokia.n-gage.ac+xml',
    'ac3' => 'audio/ac3',
    'acc' => 'application/vnd.americandynamics.acc',
    'ace' => 'application/x-ace-compressed',
    'acu' => 'application/vnd.acucobol',
    'acutc' => 'application/vnd.acucorp',
    'adp' => 'audio/adpcm',
    'aep' => 'application/vnd.audiograph',
    'afm' => 'application/x-font-type1',
    'afp' => 'application/vnd.ibm.modcap',
    'ahead' => 'application/vnd.ahead.space',
    'ai' => 'application/pdf',
    'aif' => 'audio/x-aiff',
    'aifc' => 'audio/x-aiff',
    'aiff' => 'audio/x-aiff',
    'air' => 'application/vnd.adobe.air-application-installer-package+zip',
    'ait' => 'application/vnd.dvb.ait',
    'ami' => 'application/vnd.amiga.ami',
    'apk' => 'application/vnd.android.package-archive',
    'apng' => 'image/apng',
    'appcache' => 'text/cache-manifest',
    'application' => 'application/x-ms-application',
    'apr' => 'application/vnd.lotus-approach',
    'arc' => 'application/x-freearc',
    'arj' => 'application/x-arj',
    'asc' => 'application/pgp-signature',
    'asf' => 'video/x-ms-asf',
    'asm' => 'text/x-asm',
    'aso' => 'application/vnd.accpac.simply.aso',
    'asx' => 'video/x-ms-asf',
    'atc' => 'application/vnd.acucorp',
    'atom' => 'application/atom+xml',
    'atomcat' => 'application/atomcat+xml',
    'atomdeleted' => 'application/atomdeleted+xml',
    'atomsvc' => 'application/atomsvc+xml',
    'atx' => 'application/vnd.antix.game-component',
    'au' => 'audio/x-au',
    'avi' => 'video/x-msvideo',
    'avif' => 'image/avif',
    'aw' => 'application/applixware',
    'azf' => 'application/vnd.airzip.filesecure.azf',
    'azs' => 'application/vnd.airzip.filesecure.azs',
    'azv' => 'image/vnd.airzip.accelerator.azv',
    'azw' => 'application/vnd.amazon.ebook',
    'bat' => 'application/x-msdownload',
    'bcpio' => 'application/x-bcpio',
    'bdf' => 'application/x-font-bdf',
    'bdm' => 'application/vnd.syncml.dm+wbxml',
    'bdoc' => 'application/x-bdoc',
    'bed' => 'application/vnd.realvnc.bed',
    'bh2' => 'application/vnd.fujitsu.oasysprs',
    'bin' => 'application/octet-stream',
    'blb' => 'application/x-blorb',
    'blorb' => 'application/x-blorb',
    'bmi' => 'application/vnd.bmi',
    'bmml' => 'application/vnd.balsamiq.bmml+xml',
    'bmp' => 'image/bmp',
    'book' => 'application/vnd.framemaker',
    'box' => 'application/vnd.previewsystems.box',
    'boz' => 'application/x-bzip2',
    'bpk' => 'application/octet-stream',
    'bpmn' => 'application/octet-stream',
    'bsp' => 'model/vnd.valve.source.compiled-map',
    'btif' => 'image/prs.btif',
    'buffer' => 'application/octet-stream',
    'bz' => 'application/x-bzip',
    'bz2' => 'application/x-bzip2',
    'c' => 'text/x-c',
    'c4d' => 'application/vnd.clonk.c4group',
    'c4f' => 'application/vnd.clonk.c4group',
    'c4g' => 'application/vnd.clonk.c4group',
    'c4p' => 'application/vnd.clonk.c4group',
    'c4u' => 'application/vnd.clonk.c4group',
    'c11amc' => 'application/vnd.cluetrust.cartomobile-config',
    'c11amz' => 'application/vnd.cluetrust.cartomobile-config-pkg',
    'cab' => 'application/vnd.ms-cab-compressed',
    'caf' => 'audio/x-caf',
    'cap' => 'application/vnd.tcpdump.pcap',
    'car' => 'application/vnd.curl.car',
    'cat' => 'application/vnd.ms-pki.seccat',
    'cb7' => 'application/x-cbr',
    'cba' => 'application/x-cbr',
    'cbr' => 'application/x-cbr',
    'cbt' => 'application/x-cbr',
    'cbz' => 'application/x-cbr',
    'cc' => 'text/x-c',
    'cco' => 'application/x-cocoa',
    'cct' => 'application/x-director',
    'ccxml' => 'application/ccxml+xml',
    'cdbcmsg' => 'application/vnd.contact.cmsg',
    'cdf' => 'application/x-netcdf',
    'cdfx' => 'application/cdfx+xml',
    'cdkey' => 'application/vnd.mediastation.cdkey',
    'cdmia' => 'application/cdmi-capability',
    'cdmic' => 'application/cdmi-container',
    'cdmid' => 'application/cdmi-domain',
    'cdmio' => 'application/cdmi-object',
    'cdmiq' => 'application/cdmi-queue',
    'cdr' => 'application/cdr',
    'cdx' => 'chemical/x-cdx',
    'cdxml' => 'application/vnd.chemdraw+xml',
    'cdy' => 'application/vnd.cinderella',
    'cer' => 'application/pkix-cert',
    'cfs' => 'application/x-cfs-compressed',
    'cgm' => 'image/cgm',
    'chat' => 'application/x-chat',
    'chm' => 'application/vnd.ms-htmlhelp',
    'chrt' => 'application/vnd.kde.kchart',
    'cif' => 'chemical/x-cif',
    'cii' => 'application/vnd.anser-web-certificate-issue-initiation',
    'cil' => 'application/vnd.ms-artgalry',
    'cjs' => 'application/node',
    'cla' => 'application/vnd.claymore',
    'class' => 'application/octet-stream',
    'clkk' => 'application/vnd.crick.clicker.keyboard',
    'clkp' => 'application/vnd.crick.clicker.palette',
    'clkt' => 'application/vnd.crick.clicker.template',
    'clkw' => 'application/vnd.crick.clicker.wordbank',
    'clkx' => 'application/vnd.crick.clicker',
    'clp' => 'application/x-msclip',
    'cmc' => 'application/vnd.cosmocaller',
    'cmdf' => 'chemical/x-cmdf',
    'cml' => 'chemical/x-cml',
    'cmp' => 'application/vnd.yellowriver-custom-menu',
    'cmx' => 'image/x-cmx',
    'cod' => 'application/vnd.rim.cod',
    'coffee' => 'text/coffeescript',
    'com' => 'application/x-msdownload',
    'conf' => 'text/plain',
    'cpio' => 'application/x-cpio',
    'cpp' => 'text/x-c',
    'cpt' => 'application/mac-compactpro',
    'crd' => 'application/x-mscardfile',
    'crl' => 'application/pkix-crl',
    'crt' => 'application/x-x509-ca-cert',
    'crx' => 'application/x-chrome-extension',
    'cryptonote' => 'application/vnd.rig.cryptonote',
    'csh' => 'application/x-csh',
    'csl' => 'application/vnd.citationstyles.style+xml',
    'csml' => 'chemical/x-csml',
    'csp' => 'application/vnd.commonspace',
    'csr' => 'application/octet-stream',
    'css' => 'text/css',
    'cst' => 'application/x-director',
    'csv' => 'text/csv',
    'cu' => 'application/cu-seeme',
    'curl' => 'text/vnd.curl',
    'cww' => 'application/prs.cww',
    'cxt' => 'application/x-director',
    'cxx' => 'text/x-c',
    'dae' => 'model/vnd.collada+xml',
    'daf' => 'application/vnd.mobius.daf',
    'dart' => 'application/vnd.dart',
    'dataless' => 'application/vnd.fdsn.seed',
    'davmount' => 'application/davmount+xml',
    'dbf' => 'application/vnd.dbf',
    'dbk' => 'application/docbook+xml',
    'dcr' => 'application/x-director',
    'dcurl' => 'text/vnd.curl.dcurl',
    'dd2' => 'application/vnd.oma.dd2+xml',
    'ddd' => 'application/vnd.fujixerox.ddd',
    'ddf' => 'application/vnd.syncml.dmddf+xml',
    'dds' => 'image/vnd.ms-dds',
    'deb' => 'application/x-debian-package',
    'def' => 'text/plain',
    'deploy' => 'application/octet-stream',
    'der' => 'application/x-x509-ca-cert',
    'dfac' => 'application/vnd.dreamfactory',
    'dgc' => 'application/x-dgc-compressed',
    'dic' => 'text/x-c',
    'dir' => 'application/x-director',
    'dis' => 'application/vnd.mobius.dis',
    'disposition-notification' => 'message/disposition-notification',
    'dist' => 'application/octet-stream',
    'distz' => 'application/octet-stream',
    'djv' => 'image/vnd.djvu',
    'djvu' => 'image/vnd.djvu',
    'dll' => 'application/octet-stream',
    'dmg' => 'application/x-apple-diskimage',
    'dmn' => 'application/octet-stream',
    'dmp' => 'application/vnd.tcpdump.pcap',
    'dms' => 'application/octet-stream',
    'dna' => 'application/vnd.dna',
    'doc' => 'application/msword',
    'docm' => 'application/vnd.ms-word.template.macroEnabled.12',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'dot' => 'application/msword',
    'dotm' => 'application/vnd.ms-word.template.macroEnabled.12',
    'dotx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'dp' => 'application/vnd.osgi.dp',
    'dpg' => 'application/vnd.dpgraph',
    'dra' => 'audio/vnd.dra',
    'drle' => 'image/dicom-rle',
    'dsc' => 'text/prs.lines.tag',
    'dssc' => 'application/dssc+der',
    'dtb' => 'application/x-dtbook+xml',
    'dtd' => 'application/xml-dtd',
    'dts' => 'audio/vnd.dts',
    'dtshd' => 'audio/vnd.dts.hd',
    'dump' => 'application/octet-stream',
    'dvb' => 'video/vnd.dvb.file',
    'dvi' => 'application/x-dvi',
    'dwd' => 'application/atsc-dwd+xml',
    'dwf' => 'model/vnd.dwf',
    'dwg' => 'image/vnd.dwg',
    'dxf' => 'image/vnd.dxf',
    'dxp' => 'application/vnd.spotfire.dxp',
    'dxr' => 'application/x-director',
    'ear' => 'application/java-archive',
    'ecelp4800' => 'audio/vnd.nuera.ecelp4800',
    'ecelp7470' => 'audio/vnd.nuera.ecelp7470',
    'ecelp9600' => 'audio/vnd.nuera.ecelp9600',
    'ecma' => 'application/ecmascript',
    'edm' => 'application/vnd.novadigm.edm',
    'edx' => 'application/vnd.novadigm.edx',
    'efif' => 'application/vnd.picsel',
    'ei6' => 'application/vnd.pg.osasli',
    'elc' => 'application/octet-stream',
    'emf' => 'image/emf',
    'eml' => 'message/rfc822',
    'emma' => 'application/emma+xml',
    'emotionml' => 'application/emotionml+xml',
    'emz' => 'application/x-msmetafile',
    'eol' => 'audio/vnd.digital-winds',
    'eot' => 'application/vnd.ms-fontobject',
    'eps' => 'application/postscript',
    'epub' => 'application/epub+zip',
    'es' => 'application/ecmascript',
    'es3' => 'application/vnd.eszigno3+xml',
    'esa' => 'application/vnd.osgi.subsystem',
    'esf' => 'application/vnd.epson.esf',
    'et3' => 'application/vnd.eszigno3+xml',
    'etx' => 'text/x-setext',
    'eva' => 'application/x-eva',
    'evy' => 'application/x-envoy',
    'exe' => 'application/octet-stream',
    'exi' => 'application/exi',
    'exr' => 'image/aces',
    'ext' => 'application/vnd.novadigm.ext',
    'ez' => 'application/andrew-inset',
    'ez2' => 'application/vnd.ezpix-album',
    'ez3' => 'application/vnd.ezpix-package',
    'f' => 'text/x-fortran',
    'f4v' => 'video/mp4',
    'f77' => 'text/x-fortran',
    'f90' => 'text/x-fortran',
    'fbs' => 'image/vnd.fastbidsheet',
    'fcdt' => 'application/vnd.adobe.formscentral.fcdt',
    'fcs' => 'application/vnd.isac.fcs',
    'fdf' => 'application/vnd.fdf',
    'fdt' => 'application/fdt+xml',
    'fe_launch' => 'application/vnd.denovo.fcselayout-link',
    'fg5' => 'application/vnd.fujitsu.oasysgp',
    'fgd' => 'application/x-director',
    'fh' => 'image/x-freehand',
    'fh4' => 'image/x-freehand',
    'fh5' => 'image/x-freehand',
    'fh7' => 'image/x-freehand',
    'fhc' => 'image/x-freehand',
    'fig' => 'application/x-xfig',
    'fits' => 'image/fits',
    'flac' => 'audio/x-flac',
    'fli' => 'video/x-fli',
    'flo' => 'application/vnd.micrografx.flo',
    'flv' => 'video/x-flv',
    'flw' => 'application/vnd.kde.kivio',
    'flx' => 'text/vnd.fmi.flexstor',
    'fly' => 'text/vnd.fly',
    'fm' => 'application/vnd.framemaker',
    'fnc' => 'application/vnd.frogans.fnc',
    'fo' => 'application/vnd.software602.filler.form+xml',
    'for' => 'text/x-fortran',
    'fpx' => 'image/vnd.fpx',
    'frame' => 'application/vnd.framemaker',
    'fsc' => 'application/vnd.fsc.weblaunch',
    'fst' => 'image/vnd.fst',
    'ftc' => 'application/vnd.fluxtime.clip',
    'fti' => 'application/vnd.anser-web-funds-transfer-initiation',
    'fvt' => 'video/vnd.fvt',
    'fxp' => 'application/vnd.adobe.fxp',
    'fxpl' => 'application/vnd.adobe.fxp',
    'fzs' => 'application/vnd.fuzzysheet',
    'g2w' => 'application/vnd.geoplan',
    'g3' => 'image/g3fax',
    'g3w' => 'application/vnd.geospace',
    'gac' => 'application/vnd.groove-account',
    'gam' => 'application/x-tads',
    'gbr' => 'application/rpki-ghostbusters',
    'gca' => 'application/x-gca-compressed',
    'gdl' => 'model/vnd.gdl',
    'gdoc' => 'application/vnd.google-apps.document',
    'geo' => 'application/vnd.dynageo',
    'geojson' => 'application/geo+json',
    'gex' => 'application/vnd.geometry-explorer',
    'ggb' => 'application/vnd.geogebra.file',
    'ggt' => 'application/vnd.geogebra.tool',
    'ghf' => 'application/vnd.groove-help',
    'gif' => 'image/gif',
    'gim' => 'application/vnd.groove-identity-message',
    'glb' => 'model/gltf-binary',
    'gltf' => 'model/gltf+json',
    'gml' => 'application/gml+xml',
    'gmx' => 'application/vnd.gmx',
    'gnumeric' => 'application/x-gnumeric',
    'gpg' => 'application/gpg-keys',
    'gph' => 'application/vnd.flographit',
    'gpx' => 'application/gpx+xml',
    'gqf' => 'application/vnd.grafeq',
    'gqs' => 'application/vnd.grafeq',
    'gram' => 'application/srgs',
    'gramps' => 'application/x-gramps-xml',
    'gre' => 'application/vnd.geometry-explorer',
    'grv' => 'application/vnd.groove-injector',
    'grxml' => 'application/srgs+xml',
    'gsf' => 'application/x-font-ghostscript',
    'gsheet' => 'application/vnd.google-apps.spreadsheet',
    'gslides' => 'application/vnd.google-apps.presentation',
    'gtar' => 'application/x-gtar',
    'gtm' => 'application/vnd.groove-tool-message',
    'gtw' => 'model/vnd.gtw',
    'gv' => 'text/vnd.graphviz',
    'gxf' => 'application/gxf',
    'gxt' => 'application/vnd.geonext',
    'gz' => 'application/x-gzip',
    'gzip' => 'application/x-gzip',
    'h' => 'text/x-c',
    'h261' => 'video/h261',
    'h263' => 'video/h263',
    'h264' => 'video/h264',
    'hal' => 'application/vnd.hal+xml',
    'hbci' => 'application/vnd.hbci',
    'hbs' => 'text/x-handlebars-template',
    'hdd' => 'application/x-virtualbox-hdd',
    'hdf' => 'application/x-hdf',
    'heic' => 'image/heic',
    'heics' => 'image/heic-sequence',
    'heif' => 'image/heif',
    'heifs' => 'image/heif-sequence',
    'hej2' => 'image/hej2k',
    'held' => 'application/atsc-held+xml',
    'hh' => 'text/x-c',
    'hjson' => 'application/hjson',
    'hlp' => 'application/winhlp',
    'hpgl' => 'application/vnd.hp-hpgl',
    'hpid' => 'application/vnd.hp-hpid',
    'hps' => 'application/vnd.hp-hps',
    'hqx' => 'application/mac-binhex40',
    'hsj2' => 'image/hsj2',
    'htc' => 'text/x-component',
    'htke' => 'application/vnd.kenameaapp',
    'htm' => 'text/html',
    'html' => 'text/html',
    'hvd' => 'application/vnd.yamaha.hv-dic',
    'hvp' => 'application/vnd.yamaha.hv-voice',
    'hvs' => 'application/vnd.yamaha.hv-script',
    'i2g' => 'application/vnd.intergeo',
    'icc' => 'application/vnd.iccprofile',
    'ice' => 'x-conference/x-cooltalk',
    'icm' => 'application/vnd.iccprofile',
    'ico' => 'image/x-icon',
    'ics' => 'text/calendar',
    'ief' => 'image/ief',
    'ifb' => 'text/calendar',
    'ifm' => 'application/vnd.shana.informed.formdata',
    'iges' => 'model/iges',
    'igl' => 'application/vnd.igloader',
    'igm' => 'application/vnd.insors.igm',
    'igs' => 'model/iges',
    'igx' => 'application/vnd.micrografx.igx',
    'iif' => 'application/vnd.shana.informed.interchange',
    'img' => 'application/octet-stream',
    'imp' => 'application/vnd.accpac.simply.imp',
    'ims' => 'application/vnd.ms-ims',
    'in' => 'text/plain',
    'ini' => 'text/plain',
    'ink' => 'application/inkml+xml',
    'inkml' => 'application/inkml+xml',
    'install' => 'application/x-install-instructions',
    'iota' => 'application/vnd.astraea-software.iota',
    'ipfix' => 'application/ipfix',
    'ipk' => 'application/vnd.shana.informed.package',
    'irm' => 'application/vnd.ibm.rights-management',
    'irp' => 'application/vnd.irepository.package+xml',
    'iso' => 'application/x-iso9660-image',
    'itp' => 'application/vnd.shana.informed.formtemplate',
    'its' => 'application/its+xml',
    'ivp' => 'application/vnd.immervision-ivp',
    'ivu' => 'application/vnd.immervision-ivu',
    'jad' => 'text/vnd.sun.j2me.app-descriptor',
    'jade' => 'text/jade',
    'jam' => 'application/vnd.jam',
    'jar' => 'application/java-archive',
    'jardiff' => 'application/x-java-archive-diff',
    'java' => 'text/x-java-source',
    'jhc' => 'image/jphc',
    'jisp' => 'application/vnd.jisp',
    'jls' => 'image/jls',
    'jlt' => 'application/vnd.hp-jlyt',
    'jng' => 'image/x-jng',
    'jnlp' => 'application/x-java-jnlp-file',
    'joda' => 'application/vnd.joost.joda-archive',
    'jp2' => 'image/jp2',
    'jpe' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'jpf' => 'image/jpx',
    'jpg' => 'image/jpeg',
    'jpg2' => 'image/jp2',
    'jpgm' => 'video/jpm',
    'jpgv' => 'video/jpeg',
    'jph' => 'image/jph',
    'jpm' => 'video/jpm',
    'jpx' => 'image/jpx',
    'js' => 'application/javascript',
    'json' => 'application/json',
    'json5' => 'application/json5',
    'jsonld' => 'application/ld+json',
    'jsonml' => 'application/jsonml+json',
    'jsx' => 'text/jsx',
    'jxr' => 'image/jxr',
    'jxra' => 'image/jxra',
    'jxrs' => 'image/jxrs',
    'jxs' => 'image/jxs',
    'jxsc' => 'image/jxsc',
    'jxsi' => 'image/jxsi',
    'jxss' => 'image/jxss',
    'kar' => 'audio/midi',
    'karbon' => 'application/vnd.kde.karbon',
    'kdb' => 'application/octet-stream',
    'kdbx' => 'application/x-keepass2',
    'key' => 'application/vnd.apple.keynote',
    'kfo' => 'application/vnd.kde.kformula',
    'kia' => 'application/vnd.kidspiration',
    'kml' => 'application/vnd.google-earth.kml+xml',
    'kmz' => 'application/vnd.google-earth.kmz',
    'kne' => 'application/vnd.kinar',
    'knp' => 'application/vnd.kinar',
    'kon' => 'application/vnd.kde.kontour',
    'kpr' => 'application/vnd.kde.kpresenter',
    'kpt' => 'application/vnd.kde.kpresenter',
    'kpxx' => 'application/vnd.ds-keypoint',
    'ksp' => 'application/vnd.kde.kspread',
    'ktr' => 'application/vnd.kahootz',
    'ktx' => 'image/ktx',
    'ktx2' => 'image/ktx2',
    'ktz' => 'application/vnd.kahootz',
    'kwd' => 'application/vnd.kde.kword',
    'kwt' => 'application/vnd.kde.kword',
    'lasxml' => 'application/vnd.las.las+xml',
    'latex' => 'application/x-latex',
    'lbd' => 'application/vnd.llamagraphics.life-balance.desktop',
    'lbe' => 'application/vnd.llamagraphics.life-balance.exchange+xml',
    'les' => 'application/vnd.hhe.lesson-player',
    'less' => 'text/less',
    'lgr' => 'application/lgr+xml',
    'lha' => 'application/octet-stream',
    'link66' => 'application/vnd.route66.link66+xml',
    'list' => 'text/plain',
    'list3820' => 'application/vnd.ibm.modcap',
    'listafp' => 'application/vnd.ibm.modcap',
    'litcoffee' => 'text/coffeescript',
    'lnk' => 'application/x-ms-shortcut',
    'log' => 'text/plain',
    'lostxml' => 'application/lost+xml',
    'lrf' => 'application/octet-stream',
    'lrm' => 'application/vnd.ms-lrm',
    'ltf' => 'application/vnd.frogans.ltf',
    'lua' => 'text/x-lua',
    'luac' => 'application/x-lua-bytecode',
    'lvp' => 'audio/vnd.lucent.voice',
    'lwp' => 'application/vnd.lotus-wordpro',
    'lzh' => 'application/octet-stream',
    'm1v' => 'video/mpeg',
    'm2a' => 'audio/mpeg',
    'm2v' => 'video/mpeg',
    'm3a' => 'audio/mpeg',
    'm3u' => 'text/plain',
    'm3u8' => 'application/vnd.apple.mpegurl',
    'm4a' => 'audio/x-m4a',
    'm4p' => 'application/mp4',
    'm4u' => 'application/vnd.mpegurl',
    'm4v' => 'video/x-m4v',
    'm13' => 'application/x-msmediaview',
    'm14' => 'application/x-msmediaview',
    'm21' => 'application/mp21',
    'ma' => 'application/mathematica',
    'mads' => 'application/mads+xml',
    'maei' => 'application/mmt-aei+xml',
    'mag' => 'application/vnd.ecowin.chart',
    'maker' => 'application/vnd.framemaker',
    'man' => 'text/troff',
    'manifest' => 'text/cache-manifest',
    'map' => 'application/json',
    'mar' => 'application/octet-stream',
    'markdown' => 'text/markdown',
    'mathml' => 'application/mathml+xml',
    'mb' => 'application/mathematica',
    'mbk' => 'application/vnd.mobius.mbk',
    'mbox' => 'application/mbox',
    'mc1' => 'application/vnd.medcalcdata',
    'mcd' => 'application/vnd.mcd',
    'mcurl' => 'text/vnd.curl.mcurl',
    'md' => 'text/markdown',
    'mdb' => 'application/x-msaccess',
    'mdi' => 'image/vnd.ms-modi',
    'mdx' => 'text/mdx',
    'me' => 'text/troff',
    'mesh' => 'model/mesh',
    'meta4' => 'application/metalink4+xml',
    'metalink' => 'application/metalink+xml',
    'mets' => 'application/mets+xml',
    'mfm' => 'application/vnd.mfmp',
    'mft' => 'application/rpki-manifest',
    'mgp' => 'application/vnd.osgeo.mapguide.package',
    'mgz' => 'application/vnd.proteus.magazine',
    'mid' => 'audio/midi',
    'midi' => 'audio/midi',
    'mie' => 'application/x-mie',
    'mif' => 'application/vnd.mif',
    'mime' => 'message/rfc822',
    'mj2' => 'video/mj2',
    'mjp2' => 'video/mj2',
    'mjs' => 'application/javascript',
    'mk3d' => 'video/x-matroska',
    'mka' => 'audio/x-matroska',
    'mkd' => 'text/x-markdown',
    'mks' => 'video/x-matroska',
    'mkv' => 'video/x-matroska',
    'mlp' => 'application/vnd.dolby.mlp',
    'mmd' => 'application/vnd.chipnuts.karaoke-mmd',
    'mmf' => 'application/vnd.smaf',
    'mml' => 'text/mathml',
    'mmr' => 'image/vnd.fujixerox.edmics-mmr',
    'mng' => 'video/x-mng',
    'mny' => 'application/x-msmoney',
    'mobi' => 'application/x-mobipocket-ebook',
    'mods' => 'application/mods+xml',
    'mov' => 'video/quicktime',
    'movie' => 'video/x-sgi-movie',
    'mp2' => 'audio/mpeg',
    'mp2a' => 'audio/mpeg',
    'mp3' => 'audio/mpeg',
    'mp4' => 'video/mp4',
    'mp4a' => 'audio/mp4',
    'mp4s' => 'application/mp4',
    'mp4v' => 'video/mp4',
    'mp21' => 'application/mp21',
    'mpc' => 'application/vnd.mophun.certificate',
    'mpd' => 'application/dash+xml',
    'mpe' => 'video/mpeg',
    'mpeg' => 'video/mpeg',
    'mpg' => 'video/mpeg',
    'mpg4' => 'video/mp4',
    'mpga' => 'audio/mpeg',
    'mpkg' => 'application/vnd.apple.installer+xml',
    'mpm' => 'application/vnd.blueice.multipass',
    'mpn' => 'application/vnd.mophun.application',
    'mpp' => 'application/vnd.ms-project',
    'mpt' => 'application/vnd.ms-project',
    'mpy' => 'application/vnd.ibm.minipay',
    'mqy' => 'application/vnd.mobius.mqy',
    'mrc' => 'application/marc',
    'mrcx' => 'application/marcxml+xml',
    'ms' => 'text/troff',
    'mscml' => 'application/mediaservercontrol+xml',
    'mseed' => 'application/vnd.fdsn.mseed',
    'mseq' => 'application/vnd.mseq',
    'msf' => 'application/vnd.epson.msf',
    'msg' => 'application/vnd.ms-outlook',
    'msh' => 'model/mesh',
    'msi' => 'application/x-msdownload',
    'msl' => 'application/vnd.mobius.msl',
    'msm' => 'application/octet-stream',
    'msp' => 'application/octet-stream',
    'msty' => 'application/vnd.muvee.style',
    'mtl' => 'model/mtl',
    'mts' => 'model/vnd.mts',
    'mus' => 'application/vnd.musician',
    'musd' => 'application/mmt-usd+xml',
    'musicxml' => 'application/vnd.recordare.musicxml+xml',
    'mvb' => 'application/x-msmediaview',
    'mwf' => 'application/vnd.mfer',
    'mxf' => 'application/mxf',
    'mxl' => 'application/vnd.recordare.musicxml',
    'mxmf' => 'audio/mobile-xmf',
    'mxml' => 'application/xv+xml',
    'mxs' => 'application/vnd.triscape.mxs',
    'mxu' => 'video/vnd.mpegurl',
    'n-gage' => 'application/vnd.nokia.n-gage.symbian.install',
    'n3' => 'text/n3',
    'nb' => 'application/mathematica',
    'nbp' => 'application/vnd.wolfram.player',
    'nc' => 'application/x-netcdf',
    'ncx' => 'application/x-dtbncx+xml',
    'nfo' => 'text/x-nfo',
    'ngdat' => 'application/vnd.nokia.n-gage.data',
    'nitf' => 'application/vnd.nitf',
    'nlu' => 'application/vnd.neurolanguage.nlu',
    'nml' => 'application/vnd.enliven',
    'nnd' => 'application/vnd.noblenet-directory',
    'nns' => 'application/vnd.noblenet-sealer',
    'nnw' => 'application/vnd.noblenet-web',
    'npx' => 'image/vnd.net-fpx',
    'nq' => 'application/n-quads',
    'nsc' => 'application/x-conference',
    'nsf' => 'application/vnd.lotus-notes',
    'nt' => 'application/n-triples',
    'ntf' => 'application/vnd.nitf',
    'numbers' => 'application/vnd.apple.numbers',
    'nzb' => 'application/x-nzb',
    'oa2' => 'application/vnd.fujitsu.oasys2',
    'oa3' => 'application/vnd.fujitsu.oasys3',
    'oas' => 'application/vnd.fujitsu.oasys',
    'obd' => 'application/x-msbinder',
    'obgx' => 'application/vnd.openblox.game+xml',
    'obj' => 'model/obj',
    'oda' => 'application/oda',
    'odb' => 'application/vnd.oasis.opendocument.database',
    'odc' => 'application/vnd.oasis.opendocument.chart',
    'odf' => 'application/vnd.oasis.opendocument.formula',
    'odft' => 'application/vnd.oasis.opendocument.formula-template',
    'odg' => 'application/vnd.oasis.opendocument.graphics',
    'odi' => 'application/vnd.oasis.opendocument.image',
    'odm' => 'application/vnd.oasis.opendocument.text-master',
    'odp' => 'application/vnd.oasis.opendocument.presentation',
    'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
    'odt' => 'application/vnd.oasis.opendocument.text',
    'oga' => 'audio/ogg',
    'ogex' => 'model/vnd.opengex',
    'ogg' => 'audio/ogg',
    'ogv' => 'video/ogg',
    'ogx' => 'application/ogg',
    'omdoc' => 'application/omdoc+xml',
    'onepkg' => 'application/onenote',
    'onetmp' => 'application/onenote',
    'onetoc' => 'application/onenote',
    'onetoc2' => 'application/onenote',
    'opf' => 'application/oebps-package+xml',
    'opml' => 'text/x-opml',
    'oprc' => 'application/vnd.palm',
    'org' => 'text/x-org',
    'osf' => 'application/vnd.yamaha.openscoreformat',
    'osfpvg' => 'application/vnd.yamaha.openscoreformat.osfpvg+xml',
    'osm' => 'application/vnd.openstreetmap.data+xml',
    'otc' => 'application/vnd.oasis.opendocument.chart-template',
    'otf' => 'font/otf',
    'otg' => 'application/vnd.oasis.opendocument.graphics-template',
    'oth' => 'application/vnd.oasis.opendocument.text-web',
    'oti' => 'application/vnd.oasis.opendocument.image-template',
    'otp' => 'application/vnd.oasis.opendocument.presentation-template',
    'ots' => 'application/vnd.oasis.opendocument.spreadsheet-template',
    'ott' => 'application/vnd.oasis.opendocument.text-template',
    'ova' => 'application/x-virtualbox-ova',
    'ovf' => 'application/x-virtualbox-ovf',
    'owl' => 'application/rdf+xml',
    'oxps' => 'application/oxps',
    'oxt' => 'application/vnd.openofficeorg.extension',
    'p' => 'text/x-pascal',
    'p7a' => 'application/x-pkcs7-signature',
    'p7b' => 'application/x-pkcs7-certificates',
    'p7c' => 'application/pkcs7-mime',
    'p7m' => 'application/pkcs7-mime',
    'p7r' => 'application/x-pkcs7-certreqresp',
    'p7s' => 'application/pkcs7-signature',
    'p8' => 'application/pkcs8',
    'p10' => 'application/x-pkcs10',
    'p12' => 'application/x-pkcs12',
    'pac' => 'application/x-ns-proxy-autoconfig',
    'pages' => 'application/vnd.apple.pages',
    'pas' => 'text/x-pascal',
    'paw' => 'application/vnd.pawaafile',
    'pbd' => 'application/vnd.powerbuilder6',
    'pbm' => 'image/x-portable-bitmap',
    'pcap' => 'application/vnd.tcpdump.pcap',
    'pcf' => 'application/x-font-pcf',
    'pcl' => 'application/vnd.hp-pcl',
    'pclxl' => 'application/vnd.hp-pclxl',
    'pct' => 'image/x-pict',
    'pcurl' => 'application/vnd.curl.pcurl',
    'pcx' => 'image/x-pcx',
    'pdb' => 'application/x-pilot',
    'pde' => 'text/x-processing',
    'pdf' => 'application/pdf',
    'pem' => 'application/x-x509-user-cert',
    'pfa' => 'application/x-font-type1',
    'pfb' => 'application/x-font-type1',
    'pfm' => 'application/x-font-type1',
    'pfr' => 'application/font-tdpfr',
    'pfx' => 'application/x-pkcs12',
    'pgm' => 'image/x-portable-graymap',
    'pgn' => 'application/x-chess-pgn',
    'pgp' => 'application/pgp',
    'php' => 'application/x-httpd-php',
    'php3' => 'application/x-httpd-php',
    'php4' => 'application/x-httpd-php',
    'phps' => 'application/x-httpd-php-source',
    'phtml' => 'application/x-httpd-php',
    'pic' => 'image/x-pict',
    'pkg' => 'application/octet-stream',
    'pki' => 'application/pkixcmp',
    'pkipath' => 'application/pkix-pkipath',
    'pkpass' => 'application/vnd.apple.pkpass',
    'pl' => 'application/x-perl',
    'plb' => 'application/vnd.3gpp.pic-bw-large',
    'plc' => 'application/vnd.mobius.plc',
    'plf' => 'application/vnd.pocketlearn',
    'pls' => 'application/pls+xml',
    'pm' => 'application/x-perl',
    'pml' => 'application/vnd.ctc-posml',
    'png' => 'image/png',
    'pnm' => 'image/x-portable-anymap',
    'portpkg' => 'application/vnd.macports.portpkg',
    'pot' => 'application/vnd.ms-powerpoint',
    'potm' => 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'potx' => 'application/vnd.openxmlformats-officedocument.presentationml.template',
    'ppa' => 'application/vnd.ms-powerpoint',
    'ppam' => 'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    'ppd' => 'application/vnd.cups-ppd',
    'ppm' => 'image/x-portable-pixmap',
    'pps' => 'application/vnd.ms-powerpoint',
    'ppsm' => 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
    'ppsx' => 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'ppt' => 'application/powerpoint',
    'pptm' => 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'pqa' => 'application/vnd.palm',
    'prc' => 'application/x-pilot',
    'pre' => 'application/vnd.lotus-freelance',
    'prf' => 'application/pics-rules',
    'provx' => 'application/provenance+xml',
    'ps' => 'application/postscript',
    'psb' => 'application/vnd.3gpp.pic-bw-small',
    'psd' => 'application/x-photoshop',
    'psf' => 'application/x-font-linux-psf',
    'pskcxml' => 'application/pskc+xml',
    'pti' => 'image/prs.pti',
    'ptid' => 'application/vnd.pvi.ptid1',
    'pub' => 'application/x-mspublisher',
    'pvb' => 'application/vnd.3gpp.pic-bw-var',
    'pwn' => 'application/vnd.3m.post-it-notes',
    'pya' => 'audio/vnd.ms-playready.media.pya',
    'pyv' => 'video/vnd.ms-playready.media.pyv',
    'qam' => 'application/vnd.epson.quickanime',
    'qbo' => 'application/vnd.intu.qbo',
    'qfx' => 'application/vnd.intu.qfx',
    'qps' => 'application/vnd.publishare-delta-tree',
    'qt' => 'video/quicktime',
    'qwd' => 'application/vnd.quark.quarkxpress',
    'qwt' => 'application/vnd.quark.quarkxpress',
    'qxb' => 'application/vnd.quark.quarkxpress',
    'qxd' => 'application/vnd.quark.quarkxpress',
    'qxl' => 'application/vnd.quark.quarkxpress',
    'qxt' => 'application/vnd.quark.quarkxpress',
    'ra' => 'audio/x-realaudio',
    'ram' => 'audio/x-pn-realaudio',
    'raml' => 'application/raml+yaml',
    'rapd' => 'application/route-apd+xml',
    'rar' => 'application/x-rar',
    'ras' => 'image/x-cmu-raster',
    'rcprofile' => 'application/vnd.ipunplugged.rcprofile',
    'rdf' => 'application/rdf+xml',
    'rdz' => 'application/vnd.data-vision.rdz',
    'relo' => 'application/p2p-overlay+xml',
    'rep' => 'application/vnd.businessobjects',
    'res' => 'application/x-dtbresource+xml',
    'rgb' => 'image/x-rgb',
    'rif' => 'application/reginfo+xml',
    'rip' => 'audio/vnd.rip',
    'ris' => 'application/x-research-info-systems',
    'rl' => 'application/resource-lists+xml',
    'rlc' => 'image/vnd.fujixerox.edmics-rlc',
    'rld' => 'application/resource-lists-diff+xml',
    'rm' => 'audio/x-pn-realaudio',
    'rmi' => 'audio/midi',
    'rmp' => 'audio/x-pn-realaudio-plugin',
    'rms' => 'application/vnd.jcp.javame.midlet-rms',
    'rmvb' => 'application/vnd.rn-realmedia-vbr',
    'rnc' => 'application/relax-ng-compact-syntax',
    'rng' => 'application/xml',
    'roa' => 'application/rpki-roa',
    'roff' => 'text/troff',
    'rp9' => 'application/vnd.cloanto.rp9',
    'rpm' => 'audio/x-pn-realaudio-plugin',
    'rpss' => 'application/vnd.nokia.radio-presets',
    'rpst' => 'application/vnd.nokia.radio-preset',
    'rq' => 'application/sparql-query',
    'rs' => 'application/rls-services+xml',
    'rsa' => 'application/x-pkcs7',
    'rsat' => 'application/atsc-rsat+xml',
    'rsd' => 'application/rsd+xml',
    'rsheet' => 'application/urc-ressheet+xml',
    'rss' => 'application/rss+xml',
    'rtf' => 'text/rtf',
    'rtx' => 'text/richtext',
    'run' => 'application/x-makeself',
    'rusd' => 'application/route-usd+xml',
    'rv' => 'video/vnd.rn-realvideo',
    's' => 'text/x-asm',
    's3m' => 'audio/s3m',
    'saf' => 'application/vnd.yamaha.smaf-audio',
    'sass' => 'text/x-sass',
    'sbml' => 'application/sbml+xml',
    'sc' => 'application/vnd.ibm.secure-container',
    'scd' => 'application/x-msschedule',
    'scm' => 'application/vnd.lotus-screencam',
    'scq' => 'application/scvp-cv-request',
    'scs' => 'application/scvp-cv-response',
    'scss' => 'text/x-scss',
    'scurl' => 'text/vnd.curl.scurl',
    'sda' => 'application/vnd.stardivision.draw',
    'sdc' => 'application/vnd.stardivision.calc',
    'sdd' => 'application/vnd.stardivision.impress',
    'sdkd' => 'application/vnd.solent.sdkm+xml',
    'sdkm' => 'application/vnd.solent.sdkm+xml',
    'sdp' => 'application/sdp',
    'sdw' => 'application/vnd.stardivision.writer',
    'sea' => 'application/octet-stream',
    'see' => 'application/vnd.seemail',
    'seed' => 'application/vnd.fdsn.seed',
    'sema' => 'application/vnd.sema',
    'semd' => 'application/vnd.semd',
    'semf' => 'application/vnd.semf',
    'senmlx' => 'application/senml+xml',
    'sensmlx' => 'application/sensml+xml',
    'ser' => 'application/java-serialized-object',
    'setpay' => 'application/set-payment-initiation',
    'setreg' => 'application/set-registration-initiation',
    'sfd-hdstx' => 'application/vnd.hydrostatix.sof-data',
    'sfs' => 'application/vnd.spotfire.sfs',
    'sfv' => 'text/x-sfv',
    'sgi' => 'image/sgi',
    'sgl' => 'application/vnd.stardivision.writer-global',
    'sgm' => 'text/sgml',
    'sgml' => 'text/sgml',
    'sh' => 'application/x-sh',
    'shar' => 'application/x-shar',
    'shex' => 'text/shex',
    'shf' => 'application/shf+xml',
    'shtml' => 'text/html',
    'sid' => 'image/x-mrsid-image',
    'sieve' => 'application/sieve',
    'sig' => 'application/pgp-signature',
    'sil' => 'audio/silk',
    'silo' => 'model/mesh',
    'sis' => 'application/vnd.symbian.install',
    'sisx' => 'application/vnd.symbian.install',
    'sit' => 'application/x-stuffit',
    'sitx' => 'application/x-stuffitx',
    'siv' => 'application/sieve',
    'skd' => 'application/vnd.koan',
    'skm' => 'application/vnd.koan',
    'skp' => 'application/vnd.koan',
    'skt' => 'application/vnd.koan',
    'sldm' => 'application/vnd.ms-powerpoint.slide.macroenabled.12',
    'sldx' => 'application/vnd.openxmlformats-officedocument.presentationml.slide',
    'slim' => 'text/slim',
    'slm' => 'text/slim',
    'sls' => 'application/route-s-tsid+xml',
    'slt' => 'application/vnd.epson.salt',
    'sm' => 'application/vnd.stepmania.stepchart',
    'smf' => 'application/vnd.stardivision.math',
    'smi' => 'application/smil',
    'smil' => 'application/smil',
    'smv' => 'video/x-smv',
    'smzip' => 'application/vnd.stepmania.package',
    'snd' => 'audio/basic',
    'snf' => 'application/x-font-snf',
    'so' => 'application/octet-stream',
    'spc' => 'application/x-pkcs7-certificates',
    'spdx' => 'text/spdx',
    'spf' => 'application/vnd.yamaha.smaf-phrase',
    'spl' => 'application/x-futuresplash',
    'spot' => 'text/vnd.in3d.spot',
    'spp' => 'application/scvp-vp-response',
    'spq' => 'application/scvp-vp-request',
    'spx' => 'audio/ogg',
    'sql' => 'application/x-sql',
    'src' => 'application/x-wais-source',
    'srt' => 'application/x-subrip',
    'sru' => 'application/sru+xml',
    'srx' => 'application/sparql-results+xml',
    'ssdl' => 'application/ssdl+xml',
    'sse' => 'application/vnd.kodak-descriptor',
    'ssf' => 'application/vnd.epson.ssf',
    'ssml' => 'application/ssml+xml',
    'sst' => 'application/octet-stream',
    'st' => 'application/vnd.sailingtracker.track',
    'stc' => 'application/vnd.sun.xml.calc.template',
    'std' => 'application/vnd.sun.xml.draw.template',
    'stf' => 'application/vnd.wt.stf',
    'sti' => 'application/vnd.sun.xml.impress.template',
    'stk' => 'application/hyperstudio',
    'stl' => 'model/stl',
    'str' => 'application/vnd.pg.format',
    'stw' => 'application/vnd.sun.xml.writer.template',
    'styl' => 'text/stylus',
    'stylus' => 'text/stylus',
    'sub' => 'text/vnd.dvb.subtitle',
    'sus' => 'application/vnd.sus-calendar',
    'susp' => 'application/vnd.sus-calendar',
    'sv4cpio' => 'application/x-sv4cpio',
    'sv4crc' => 'application/x-sv4crc',
    'svc' => 'application/vnd.dvb.service',
    'svd' => 'application/vnd.svd',
    'svg' => 'image/svg+xml',
    'svgz' => 'image/svg+xml',
    'swa' => 'application/x-director',
    'swf' => 'application/x-shockwave-flash',
    'swi' => 'application/vnd.aristanetworks.swi',
    'swidtag' => 'application/swid+xml',
    'sxc' => 'application/vnd.sun.xml.calc',
    'sxd' => 'application/vnd.sun.xml.draw',
    'sxg' => 'application/vnd.sun.xml.writer.global',
    'sxi' => 'application/vnd.sun.xml.impress',
    'sxm' => 'application/vnd.sun.xml.math',
    'sxw' => 'application/vnd.sun.xml.writer',
    't' => 'text/troff',
    't3' => 'application/x-t3vm-image',
    't38' => 'image/t38',
    'taglet' => 'application/vnd.mynfc',
    'tao' => 'application/vnd.tao.intent-module-archive',
    'tap' => 'image/vnd.tencent.tap',
    'tar' => 'application/x-tar',
    'tcap' => 'application/vnd.3gpp2.tcap',
    'tcl' => 'application/x-tcl',
    'td' => 'application/urc-targetdesc+xml',
    'teacher' => 'application/vnd.smart.teacher',
    'tei' => 'application/tei+xml',
    'teicorpus' => 'application/tei+xml',
    'tex' => 'application/x-tex',
    'texi' => 'application/x-texinfo',
    'texinfo' => 'application/x-texinfo',
    'text' => 'text/plain',
    'tfi' => 'application/thraud+xml',
    'tfm' => 'application/x-tex-tfm',
    'tfx' => 'image/tiff-fx',
    'tga' => 'image/x-tga',
    'tgz' => 'application/x-tar',
    'thmx' => 'application/vnd.ms-officetheme',
    'tif' => 'image/tiff',
    'tiff' => 'image/tiff',
    'tk' => 'application/x-tcl',
    'tmo' => 'application/vnd.tmobile-livetv',
    'toml' => 'application/toml',
    'torrent' => 'application/x-bittorrent',
    'tpl' => 'application/vnd.groove-tool-template',
    'tpt' => 'application/vnd.trid.tpt',
    'tr' => 'text/troff',
    'tra' => 'application/vnd.trueapp',
    'trm' => 'application/x-msterminal',
    'ts' => 'video/mp2t',
    'tsd' => 'application/timestamped-data',
    'tsv' => 'text/tab-separated-values',
    'ttc' => 'font/collection',
    'ttf' => 'font/ttf',
    'ttl' => 'text/turtle',
    'ttml' => 'application/ttml+xml',
    'twd' => 'application/vnd.simtech-mindmapper',
    'twds' => 'application/vnd.simtech-mindmapper',
    'txd' => 'application/vnd.genomatix.tuxedo',
    'txf' => 'application/vnd.mobius.txf',
    'txt' => 'text/plain',
    'u8dsn' => 'message/global-delivery-status',
    'u8hdr' => 'message/global-headers',
    'u8mdn' => 'message/global-disposition-notification',
    'u8msg' => 'message/global',
    'u32' => 'application/x-authorware-bin',
    'ubj' => 'application/ubjson',
    'udeb' => 'application/x-debian-package',
    'ufd' => 'application/vnd.ufdl',
    'ufdl' => 'application/vnd.ufdl',
    'ulx' => 'application/x-glulx',
    'umj' => 'application/vnd.umajin',
    'unityweb' => 'application/vnd.unity',
    'uoml' => 'application/vnd.uoml+xml',
    'uri' => 'text/uri-list',
    'uris' => 'text/uri-list',
    'urls' => 'text/uri-list',
    'usdz' => 'model/vnd.usdz+zip',
    'ustar' => 'application/x-ustar',
    'utz' => 'application/vnd.uiq.theme',
    'uu' => 'text/x-uuencode',
    'uva' => 'audio/vnd.dece.audio',
    'uvd' => 'application/vnd.dece.data',
    'uvf' => 'application/vnd.dece.data',
    'uvg' => 'image/vnd.dece.graphic',
    'uvh' => 'video/vnd.dece.hd',
    'uvi' => 'image/vnd.dece.graphic',
    'uvm' => 'video/vnd.dece.mobile',
    'uvp' => 'video/vnd.dece.pd',
    'uvs' => 'video/vnd.dece.sd',
    'uvt' => 'application/vnd.dece.ttml+xml',
    'uvu' => 'video/vnd.uvvu.mp4',
    'uvv' => 'video/vnd.dece.video',
    'uvva' => 'audio/vnd.dece.audio',
    'uvvd' => 'application/vnd.dece.data',
    'uvvf' => 'application/vnd.dece.data',
    'uvvg' => 'image/vnd.dece.graphic',
    'uvvh' => 'video/vnd.dece.hd',
    'uvvi' => 'image/vnd.dece.graphic',
    'uvvm' => 'video/vnd.dece.mobile',
    'uvvp' => 'video/vnd.dece.pd',
    'uvvs' => 'video/vnd.dece.sd',
    'uvvt' => 'application/vnd.dece.ttml+xml',
    'uvvu' => 'video/vnd.uvvu.mp4',
    'uvvv' => 'video/vnd.dece.video',
    'uvvx' => 'application/vnd.dece.unspecified',
    'uvvz' => 'application/vnd.dece.zip',
    'uvx' => 'application/vnd.dece.unspecified',
    'uvz' => 'application/vnd.dece.zip',
    'vbox' => 'application/x-virtualbox-vbox',
    'vbox-extpack' => 'application/x-virtualbox-vbox-extpack',
    'vcard' => 'text/vcard',
    'vcd' => 'application/x-cdlink',
    'vcf' => 'text/x-vcard',
    'vcg' => 'application/vnd.groove-vcard',
    'vcs' => 'text/x-vcalendar',
    'vcx' => 'application/vnd.vcx',
    'vdi' => 'application/x-virtualbox-vdi',
    'vhd' => 'application/x-virtualbox-vhd',
    'vis' => 'application/vnd.visionary',
    'viv' => 'video/vnd.vivo',
    'vlc' => 'application/videolan',
    'vmdk' => 'application/x-virtualbox-vmdk',
    'vob' => 'video/x-ms-vob',
    'vor' => 'application/vnd.stardivision.writer',
    'vox' => 'application/x-authorware-bin',
    'vrml' => 'model/vrml',
    'vsd' => 'application/vnd.visio',
    'vsf' => 'application/vnd.vsf',
    'vss' => 'application/vnd.visio',
    'vst' => 'application/vnd.visio',
    'vsw' => 'application/vnd.visio',
    'vtf' => 'image/vnd.valve.source.texture',
    'vtt' => 'text/vtt',
    'vtu' => 'model/vnd.vtu',
    'vxml' => 'application/voicexml+xml',
    'w3d' => 'application/x-director',
    'wad' => 'application/x-doom',
    'wadl' => 'application/vnd.sun.wadl+xml',
    'war' => 'application/java-archive',
    'wasm' => 'application/wasm',
    'wav' => 'audio/x-wav',
    'wax' => 'audio/x-ms-wax',
    'wbmp' => 'image/vnd.wap.wbmp',
    'wbs' => 'application/vnd.criticaltools.wbs+xml',
    'wbxml' => 'application/wbxml',
    'wcm' => 'application/vnd.ms-works',
    'wdb' => 'application/vnd.ms-works',
    'wdp' => 'image/vnd.ms-photo',
    'weba' => 'audio/webm',
    'webapp' => 'application/x-web-app-manifest+json',
    'webm' => 'video/webm',
    'webmanifest' => 'application/manifest+json',
    'webp' => 'image/webp',
    'wg' => 'application/vnd.pmi.widget',
    'wgt' => 'application/widget',
    'wks' => 'application/vnd.ms-works',
    'wm' => 'video/x-ms-wm',
    'wma' => 'audio/x-ms-wma',
    'wmd' => 'application/x-ms-wmd',
    'wmf' => 'image/wmf',
    'wml' => 'text/vnd.wap.wml',
    'wmlc' => 'application/wmlc',
    'wmls' => 'text/vnd.wap.wmlscript',
    'wmlsc' => 'application/vnd.wap.wmlscriptc',
    'wmv' => 'video/x-ms-wmv',
    'wmx' => 'video/x-ms-wmx',
    'wmz' => 'application/x-msmetafile',
    'woff' => 'font/woff',
    'woff2' => 'font/woff2',
    'word' => 'application/msword',
    'wpd' => 'application/vnd.wordperfect',
    'wpl' => 'application/vnd.ms-wpl',
    'wps' => 'application/vnd.ms-works',
    'wqd' => 'application/vnd.wqd',
    'wri' => 'application/x-mswrite',
    'wrl' => 'model/vrml',
    'wsc' => 'message/vnd.wfa.wsc',
    'wsdl' => 'application/wsdl+xml',
    'wspolicy' => 'application/wspolicy+xml',
    'wtb' => 'application/vnd.webturbo',
    'wvx' => 'video/x-ms-wvx',
    'x3d' => 'model/x3d+xml',
    'x3db' => 'model/x3d+fastinfoset',
    'x3dbz' => 'model/x3d+binary',
    'x3dv' => 'model/x3d-vrml',
    'x3dvz' => 'model/x3d+vrml',
    'x3dz' => 'model/x3d+xml',
    'x32' => 'application/x-authorware-bin',
    'x_b' => 'model/vnd.parasolid.transmit.binary',
    'x_t' => 'model/vnd.parasolid.transmit.text',
    'xaml' => 'application/xaml+xml',
    'xap' => 'application/x-silverlight-app',
    'xar' => 'application/vnd.xara',
    'xav' => 'application/xcap-att+xml',
    'xbap' => 'application/x-ms-xbap',
    'xbd' => 'application/vnd.fujixerox.docuworks.binder',
    'xbm' => 'image/x-xbitmap',
    'xca' => 'application/xcap-caps+xml',
    'xcs' => 'application/calendar+xml',
    'xdf' => 'application/xcap-diff+xml',
    'xdm' => 'application/vnd.syncml.dm+xml',
    'xdp' => 'application/vnd.adobe.xdp+xml',
    'xdssc' => 'application/dssc+xml',
    'xdw' => 'application/vnd.fujixerox.docuworks',
    'xel' => 'application/xcap-el+xml',
    'xenc' => 'application/xenc+xml',
    'xer' => 'application/xcap-error+xml',
    'xfdf' => 'application/vnd.adobe.xfdf',
    'xfdl' => 'application/vnd.xfdl',
    'xht' => 'application/xhtml+xml',
    'xhtml' => 'application/xhtml+xml',
    'xhvml' => 'application/xv+xml',
    'xif' => 'image/vnd.xiff',
    'xl' => 'application/excel',
    'xla' => 'application/vnd.ms-excel',
    'xlam' => 'application/vnd.ms-excel.addin.macroEnabled.12',
    'xlc' => 'application/vnd.ms-excel',
    'xlf' => 'application/xliff+xml',
    'xlm' => 'application/vnd.ms-excel',
    'xls' => 'application/vnd.ms-excel',
    'xlsb' => 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'xlsm' => 'application/vnd.ms-excel.sheet.macroEnabled.12',
    'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'xlt' => 'application/vnd.ms-excel',
    'xltm' => 'application/vnd.ms-excel.template.macroEnabled.12',
    'xltx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'xlw' => 'application/vnd.ms-excel',
    'xm' => 'audio/xm',
    'xml' => 'application/xml',
    'xns' => 'application/xcap-ns+xml',
    'xo' => 'application/vnd.olpc-sugar',
    'xop' => 'application/xop+xml',
    'xpi' => 'application/x-xpinstall',
    'xpl' => 'application/xproc+xml',
    'xpm' => 'image/x-xpixmap',
    'xpr' => 'application/vnd.is-xpr',
    'xps' => 'application/vnd.ms-xpsdocument',
    'xpw' => 'application/vnd.intercon.formnet',
    'xpx' => 'application/vnd.intercon.formnet',
    'xsd' => 'application/xml',
    'xsl' => 'application/xml',
    'xslt' => 'application/xslt+xml',
    'xsm' => 'application/vnd.syncml+xml',
    'xspf' => 'application/xspf+xml',
    'xul' => 'application/vnd.mozilla.xul+xml',
    'xvm' => 'application/xv+xml',
    'xvml' => 'application/xv+xml',
    'xwd' => 'image/x-xwindowdump',
    'xyz' => 'chemical/x-xyz',
    'xz' => 'application/x-xz',
    'yaml' => 'text/yaml',
    'yang' => 'application/yang',
    'yin' => 'application/yin+xml',
    'yml' => 'text/yaml',
    'ymp' => 'text/x-suse-ymp',
    'z' => 'application/x-compress',
    'z1' => 'application/x-zmachine',
    'z2' => 'application/x-zmachine',
    'z3' => 'application/x-zmachine',
    'z4' => 'application/x-zmachine',
    'z5' => 'application/x-zmachine',
    'z6' => 'application/x-zmachine',
    'z7' => 'application/x-zmachine',
    'z8' => 'application/x-zmachine',
    'zaz' => 'application/vnd.zzazz.deck+xml',
    'zip' => 'application/x-zip',
    'zir' => 'application/vnd.zul',
    'zirz' => 'application/vnd.zul',
    'zmm' => 'application/vnd.handheld-entertainment+xml',
    'zsh' => 'text/x-scriptzsh',
  ];

  private $severityNames = [
    E_ERROR => "Error",
    E_WARNING => "Warning",
    E_PARSE => "Parsing Error",
    E_NOTICE => "Notice",
    E_CORE_ERROR => "Core Error",
    E_CORE_WARNING => "Core Warning",
    E_COMPILE_ERROR => "Compile Error",
    E_COMPILE_WARNING => "Compile Warning",
    E_USER_ERROR => "User Error",
    E_USER_WARNING => "User Warning",
    E_USER_NOTICE => "User Notice",
    E_STRICT => "Runtime Notice",
    E_DEPRECATED => "Deprecated",
  ];

  private $trafficUnits = [ 'b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb' ];

  public function __construct()
  {
    $this->brightPath = rtrim(dirname(__DIR__), '/') . '/';

    if (strpos(__DIR__, '/vendor/')) {
      // composer version
      $this->basePath = rtrim(dirname(dirname(dirname(dirname(__DIR__)))), '/') . '/';
    } else {
      $this->basePath = rtrim(dirname(dirname(__DIR__)), '/') . '/';
    }

    $this->processId = null;

    parent::__construct();

    register_shutdown_function(array(&$this, 'captureShutdown'));
  }

  public function saveCallerScript($value)
  {
    $this->scriptPath = $value;
    $this->scriptBasePath = rtrim(dirname($value), '/') . '/';
    $this->scriptName = $this->fs()->fileName($value);
  }

  public function getScriptPath()
  {
    return $this->scriptPath;
  }

  public function getScriptBasePath()
  {
    return $this->scriptBasePath;
  }

  public function getBrightPath()
  {
    return $this->brightPath;
  }

  public function getScriptName()
  {
    return $this->scriptName;
  }

  public function getBasePath()
  {
    if ($this->basePathEx) {
      $result = $this->basePathEx;
    } else {
      $result = $this->basePath;
    }

    return $result;
  }

  public function setBasePath($value)
  {
    $this->basePathEx = rtrim($value, '/') . '/';
  }

  private function removePrefix($s1, $s2)
  {
    if (strpos($s1, $s2) === 0) {
      $result = substr($s1, strlen($s2));
    } else {
      $result = '';
      for ($i = 0; $i < min(strlen($s1), strlen($s2)); $i++) {
        if ($s1[$i] != $s2[$i]) {
          $result = substr($s1, $i);
          break;
        }
      }
    }

    return $result;
  }

  public function getRelativePath()
  {
    return $this->removePrefix($this->getBrightPath(), $this->getBasePath());
  }

  public function setApiPath($value)
  {
    $this->apiPath = rtrim($value, '/') . '/';
  }

  public function getApiPath()
  {
    if ($this->apiPath) {
      $result = $this->apiPath;
    } else {
      $result = $this->getBasePath() . 'api/';
    }

    return $result;
  }

  public function setAppPath($value)
  {
    $this->appPath = $value;
  }

  public function getAppPath()
  {
    if ($this->appPath) {
      $result = $this->appPath;
    } else {
      $result = $this->getBasePath() . 'app/';
    }

    return $result;
  }

  public function setDataSourcesPath($value)
  {
    $this->dataSourcesPath = rtrim($value, '/') . '/';
  }

  public function getDataSourcesPath()
  {
    if ($this->dataSourcesPath) {
      $result = $this->dataSourcesPath;
    } else {
      $result = $this->getBasePath() . 'datasources/';
    }

    return $result;
  }

  public function setTemplatesPath($value)
  {
    $this->templatesPath = rtrim($value, '/') . '/';
  }

  public function getTemplatesPath()
  {
    if ($this->templatesPath) {
      $result = $this->templatesPath;
    } else {
      $result = $this->getBasePath() . 'templates/';
    }

    return $result;
  }

  public function getTempPath()
  {
    if (!$this->tempPath) {
      $this->tempPath = $this->getBasePath() . '_tmp/' . ($this->isConsoleMode() ? 'console/' : 'web/') .
        (br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME) ? strtolower(br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME)) . '/' : '');
    }

    $result = $this->tempPath;

    if (!is_dir($result)) {
      br()->fs()->makeDir($result, 0777);
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
      if ($this->tempPath) {
        $result .= hash('sha256', $this->tempPath) . '/';
      }
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
    }

    return $result;
  }

  public function getLogsPath()
  {
    if (!$this->logsPath) {
      $this->logsPath = $this->getBasePath() . '_logs/' . ($this->isConsoleMode() ? 'console/' : 'web/') .
        (br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME) ? strtolower(br()->config()->get(BrConst::CONFIG_OPTION_DB_NAME)) . '/' : '');
    }

    $result = $this->logsPath;

    if (!is_dir($result)) {
      br()->fs()->makeDir($result, 0777);
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
      if ($this->logsPath) {
        $result .= hash('sha256', $this->logsPath) . '/';
      }
    }

    if (!is_dir($result) || !is_writable($result)) {
      $result = rtrim(sys_get_temp_dir(), '/') . '/';
    }

    return $result;
  }

  // at

  public function atBasePath($path)
  {
    return $this->getBasePath() . ltrim($path, '/');
  }

  public function atScriptBasePath($path)
  {
    return $this->getScriptBasePath() . ltrim($path, '/');
  }

  public function atAppPath($path)
  {
    return $this->getAppPath() . ltrim($path, '/');
  }

  public function atAPIPath($path)
  {
    return $this->getApiPath() . ltrim($path, '/');
  }

  public function atTemplatesPath($path)
  {
    return $this->getTemplatesPath() . ltrim($path, '/');
  }

  public function require($path)
  {
    if (file_exists($path)) {
      require_once($path);
      return true;
    } else {
      return false;
    }
  }

  // statics

  public function __call($name, $arguments)
  {
    return call_user_func_array([ 'Bright\Br' . ucwords($name), 'getInstance' ], $arguments);
  }

  /**
   *
   * @return \Bright\BrLog
   */
  public function log()
  {
    $log = BrLog::getInstance();

    $args = func_get_args();
    foreach ($args as $var) {
      $log->message($var);
    }

    return $log;
  }

  /**
   * Get Instance of BrConfig OR value of config-element
   * @param string $name
   * @param mixed $defaultValue
   * @return \Bright\BrConfig|mixed
   */
  public function config($name = null, $defaultValue = null)
  {
    $config = BrConfig::getInstance();

    if ($name) {
      return $config->get($name, $defaultValue);
    } else {
      return $config;
    }
  }

  public function session()
  {
    return call_user_func_array(array('Bright\BrSession', 'getInstance'), func_get_args());
  }

  public function colors()
  {
    return call_user_func_array(array('Bright\BrColors', 'getInstance'), func_get_args());
  }

  public function cmd()
  {
    return call_user_func_array(array('Bright\BrCmd', 'getInstance'), func_get_args());
  }

  public function rabbitMQ()
  {
    return call_user_func_array(array('Bright\BrRabbitMQ', 'getInstance'), func_get_args());
  }

  public function fs()
  {
    return call_user_func_array(array('Bright\BrFileSystem', 'getInstance'), func_get_args());
  }

  public function console()
  {
    return call_user_func_array(array('Bright\BrConsole', 'getInstance'), func_get_args());
  }

  public function auth()
  {
    return call_user_func_array(array('Bright\BrAuth', 'getInstance'), func_get_args());
  }

  public function errorHandler()
  {
    return call_user_func_array(array('Bright\BrErrorHandler', 'getInstance'), func_get_args());
  }

  public function db($name = null)
  {
    return call_user_func_array(array('Bright\BrDataBase', 'getInstance'), func_get_args());
  }

  public function renderer($name = null)
  {
    return call_user_func_array(array('Bright\BrRenderer', 'getInstance'), func_get_args());
  }

  /**
   * Get Instance of BrRequest
   * @return \Bright\BrRequest
   */
  public function request()
  {
    return call_user_func_array(array('Bright\BrRequest', 'getInstance'), func_get_args());
  }

  public function xss()
  {
    return call_user_func_array(array('Bright\BrXSS', 'getInstance'), func_get_args());
  }

  public function html()
  {
    return call_user_func_array(array('Bright\BrHTML', 'getInstance'), func_get_args());
  }

  public function isConsoleMode()
  {
    return !isset($_SERVER) || (!array_key_exists('REQUEST_METHOD', $_SERVER));
  }

  public function isJobMode()
  {
    $result = $this->isConsoleMode();

    $this->trigger('checkJobMode', $result);

    return $result;
  }

  public function isThreadMode()
  {
    return $this->threadMode;
  }

  public function setThreadMode()
  {
    $this->threadMode = true;
  }

  public function getMicrotime()
  {
    return hrtime(true)/1e+9;
  }

  public function placeholder()
  {
    $args = func_get_args();
    $tmpl = array_shift($args);
    $result = $this->placeholderEx($tmpl, $args, $error);
    if ($result === false) {
      return 'ERROR:' . $error;
    } else {
      return $result;
    }
  }

  public function getUnifiedTimestamp()
  {
    return (new \DateTime())->format('Y-m-d\TH:i:s.u\Z');
  }

  public function assert($value, $error = null)
  {
    if (!$value) {
      throw new BrAppException($error ? $error : 'Assertion error');
    }
  }

  private function placeholderCompile($tmpl)
  {
    $compiled  = array();
    $p         = 0;
    $i         = 0;
    $has_named = false;

    while (false !== ($start = $p = strpos($tmpl, "?", $p))) {
      switch ($c = substr($tmpl, ++$p, 1)) {
        case '&':
        case '%':
        case '@':
        case '#':
          $type = $c;
          if (substr($tmpl, $p+1, 1) == '&') {
            $type = $type . '&';
            ++$p;
          }
          ++$p;
          break;
        default:
          $type = '';
          break;
      }

      if (preg_match('/^((?:[^\s[:punct:]]|_)+)/', substr($tmpl, $p), $pock)) {
        $key = $pock[1];
        if ($type != '#') {
          $has_named = true;
        }
        $p += strlen($key);
      } else {
        $key = $i;
        if ($type != '#') {
          $i++;
        }
      }

      $compiled[] = [ $key, $type, $start, $p - $start ];
    }

    return [ $compiled, $tmpl, $has_named ];
  }

  public function placeholderEx($tmpl, $args, &$errormsg)
  {
    if (is_array($tmpl)) {
      $compiled = $tmpl;
    } else {
      $compiled = $this->placeholderCompile($tmpl);
    }

    list ($compiled, $tmpl, $has_named) = $compiled;

    if ($has_named) {
      $args = @$args[0];
    }

    $p   = 0;
    $out = '';
    $error = false;

    foreach ($compiled as $num => $e) {
      list ($key, $type, $start, $length) = $e;

      $out .= substr($tmpl, $p, $start - $p);
      $p = $start + $length;

      $repl = '';
      $errmsg = '';

      do {
        if (!isset($args[$key])) {
          $args[$key] = "";
        }

        if ($type === '#') {
          $repl = @constant($key);
          if (null === $repl) {
            $error = $errmsg = "UNKNOWN_CONSTANT_$key";
          }
          break;
        }

        if (!isset($args[$key])) {
          $error = $errmsg = "UNKNOWN_PLACEHOLDER_$key";
          break;
        }

        $a = $args[$key];
        if ($type === '&') {
          if (strlen($a) === 0) {
            $repl = "null";
          } else {
            $repl = "'".addslashes($a)."'";
          }
          break;
        } elseif ($type === '') {
          if (is_array($a)) {
            $error = $errmsg = "NOT_A_SCALAR_PLACEHOLDER_$key";
            break;
          } elseif (strlen($a) === 0) {
            $repl = "null";
          } else {
            $tmpVal = str_replace(',', '.', $a);
            $repl = (br($tmpVal)->isNumeric() ? $tmpVal : "'" . addslashes($a) . "'");
          }
          break;
        }

        if (!is_array($a)) {
          $error = $errmsg = "NOT_AN_ARRAY_PLACEHOLDER_$key";
          break;
        }

        if (($type === '@') || ($type === '@&')) {
          foreach ($a as $v) {
            if ($type === '@&') {
              $repl .= ($repl === ''? "" : ",") . ("'" . addslashes($v) . "'");
            } else {
              $tmpVal = str_replace(',', '.', $v);
              $repl .= ($repl === ''? "" : ",") . (br($tmpVal)->isNumeric() ? $tmpVal : "'" . addslashes($v) . "'");
            }
          }
        } elseif ($type === '%') {
          $lerror = array();
          foreach ($a as $k => $v) {
            if (!is_string($k)) {
              $lerror[$k] = "NOT_A_STRING_KEY_{$k}_FOR_PLACEHOLDER_$key";
            } else {
              $k = preg_replace('/[^a-zA-Z0-9_]/', '_', $k);
            }
            $repl .= ($repl===''? "" : ", ").$k."='".@addslashes($v)."'";
          }
          if (count($lerror)) {
            $repl = '';
            foreach ($a as $k => $v) {
              if (isset($lerror[$k])) {
                $repl .= ($repl===''? "" : ", ").$lerror[$k];
              } else {
                $k = preg_replace('/[^a-zA-Z0-9_-]/', '_', $k);
                $repl .= ($repl===''? "" : ", ").$k."=?";
              }
            }
            $error = $errmsg = $repl;
          }
        }
      } while (false);

      if ($errmsg) {
        $compiled[$num]['error'] = $errmsg;
      }
      if (!$error) {
        $out .= $repl;
      }
    }
    $out .= substr($tmpl, $p);

    if ($error) {
      $out = '';
      $p   = 0;
      foreach ($compiled as $num => $e) {
        list ($key, $type, $start, $length) = $e;
        $out .= substr($tmpl, $p, $start - $p);
        $p = $start + $length;
        if (isset($e['error'])) {
          $out .= $e['error'];
        } else {
          $out .= substr($tmpl, $start, $length);
        }
      }
      $out .= substr($tmpl, $p);
      $errormsg = $out;
      return false;
    } else {
      $errormsg = false;
      return $out;
    }
  }

  public function panic($error = null)
  {
    throw new BrAppException($error ? $error : "Critical error");
  }

  public function halt($check, $error = null)
  {
    if (!$error) {
      $error = $check;
      $check = false;
    }
    if (!$check) {
      throw new BrAppException($error ? $error : "Critical error");
    }
  }

  public function fromJSON($json, $default = null)
  {
    $result = json_decode($json, true);
    if (!$result) {
      $result = $default;
    }
    return $result;
  }

  public function toJSON($data)
  {
    return json_encode($data);
  }

  public function html2text($html)
  {
    return $this->HTML()->toText($html);
  }

  public function text2html($html)
  {
    return $this->HTML()->fromText($html);
  }

  public function getCommandLineArguments($asString = false)
  {
    global $argv;

    $result = array();

    if (is_array($argv)) {
      for ($i = 1; $i < count($argv); $i++) {
        $result[] = $argv[$i];
      }
    }

    if ($asString) {
      return br($result)->join(' ');
    } else {
      return $result;
    }
  }

  public function guid()
  {
    return sprintf(
      '%04x%04x-%04x-%03x4-%04x-%04x%04x%04x',
      random_int(0, 65535),
      random_int(0, 65535),
      random_int(0, 65535),
      random_int(0, 4095),
      bindec(substr_replace(sprintf('%016b', random_int(0, 65535)), '01', 6, 2)),
      random_int(0, 65535),
      random_int(0, 65535),
      random_int(0, 65535)
    );
  }

  public function encryptInt($num)
  {
    $rand1 = random_int(100, 999);
    $rand2 = random_int(100, 999);
    $key1 = ($num + $rand1) * $rand2;
    $key2 = ($num + $rand2) * $rand1;
    $result = $rand1.$rand2.$key1.$key2;
    $rand1_len = chr(ord('A') + strlen($rand1));
    $rand2_len = chr(ord('D') + strlen($rand2));
    $key1_len  = chr(ord('G') + strlen($key1));
    $rand1_pos = random_int(0, floor(strlen($result)/3));
    $result1 = substr_replace($result, $rand1_len, $rand1_pos, 0);
    $rand2_pos = random_int($rand1_pos + 1, floor(2*strlen($result1)/3));
    $result2 = substr_replace($result1, $rand2_len, $rand2_pos, 0);
    $key1_pos  = random_int($rand2_pos + 1, strlen($result2)-1);

    return  substr_replace($result2, $key1_len, $key1_pos, 0);
  }

  public function decryptInt($num)
  {
    if (preg_match('/([A-Z]).*([A-Z]).*([A-Z])/', $num, $matches)) {
      $rand1_len = ord($matches[1]) - ord('A');
      $rand2_len = ord($matches[2]) - ord('D');
      $key1_len  = ord($matches[3]) - ord('G');
      $num = str_replace($matches[1], '', $num);
      $num = str_replace($matches[2], '', $num);
      $num = str_replace($matches[3], '', $num);
      $rand1 = substr($num, 0, $rand1_len);
      $rand2 = substr($num, $rand1_len, $rand2_len);
      $key1 = substr($num, $rand1_len + $rand2_len, $key1_len);
      $key2 = substr($num, $rand1_len + $rand2_len + $key1_len);
      if (($rand1 > 0) && ($rand2 > 0)) {
        $num1 = $key1 / $rand2 - $rand1;
        $num2 = $key2 / $rand1 - $rand2;
        if ($num1 == $num2) {
          return $num1;
        }
      }
    }
    return null;
  }

  public function sendMail($emails, $subject, $body, $params = [], $callback = null)
  {
    if (is_callable($params)) {
      $callback = $params;
      $params = [];
    }

    br()->log()->message('Sending mail to ' . br($emails)->join());

    $message = new \Swift_Message();

    if ($emails = br($emails)->split()) {
      foreach ($emails as $email) {
        $emailsArray = br(trim($email))->split();
        foreach ($emailsArray as $oneEMail) {
          $message->addTo($oneEMail);
        }
      }

      $fromName = br($params, 'senderName', br()->config()->get('br/mail/fromName'));

      if ($from = br($params, 'sender', br()->config()->get('br/mail/from', $emails[0]))) {
        $message->addFrom($from, $fromName);
        $message->addReplyTo($from, $fromName);
      }
    }

    if (br($params, 'cc')) {
      $cc = br($params['cc'])->split();
      foreach ($cc as $email) {
        $message->addCc($email);
      }
    }

    if (br($params, 'bcc')) {
      $bcc = br($params['bcc'])->split();
      foreach ($bcc as $email) {
        $message->addBCC($email);
      }
    }

    $headers = $message->getHeaders();

    if (br($params, 'customHeaders')) {
      foreach ($params['customHeaders'] as $customHeader) {
        $headers->addTextHeader($customHeader);
      }
    }

    if (br($params, 'attachments')) {
      foreach ($params['attachments'] as $attachment) {
        $message->attach(\Swift_Attachment::fromPath($attachment['path'])->setFilename($attachment['name']));
      }
    }

    $message->setSubject($subject);
    $message->setBody($body);

    if (preg_match('/<a|<html|<span|<a|<br|<p/ism', $message->getBody())) {
      $message->setContentType('text/html');
      $message->addPart(br($message->getBody())->htmlToText(), 'text/plain');
    } else {
      $message->setContentType('text/plain');
    }

    if (is_callable($callback)) {
      $callback($message);
    }

    switch (br($params, 'mailer', br()->config()->get('br/mail/mailer'))) {
      case 'smtp':
        $transport = new \Swift_SmtpTransport();
        if ($hostname = br($params, 'hostname', br()->config()->get('br/mail/SMTP/hostname'))) {
          $transport->setHost($hostname);
        }
        if ($port = br($params, 'port', br()->config()->get('br/mail/SMTP/port'))) {
          $transport->setPort($port);
        }
        if (($username = br($params, 'username', br()->config()->get('br/mail/SMTP/username'))) &&
            ($password = br($params, 'password', br()->config()->get('br/mail/SMTP/password')))) {
          $transport->setUsername($username);
          $transport->setPassword($password);
        }
        if (br($params, 'secure', br()->config()->get('br/mail/SMTP/secure'))) {
          $transport->setEncryption('ssl');
        }
        if ($encryption = br($params, 'secure', br()->config()->get('br/mail/SMTP/encryption'))) {
          $transport->setEncryption($encryption);
        }
        break;
      default:
        $transport = new \Swift_SendmailTransport('/usr/sbin/sendmail -bs');
        break;
    }

    $mailer = new \Swift_Mailer($transport);

    $status = $mailer->send($message);

    if ($status === 0) {
      throw new BrAppException('No Recipients specified');
    }

    return true;
  }

  public function inc(&$var, $secondVar, $glue = ', ')
  {
    if (is_integer($var)) {
      $var = $var + $secondVar;
    } else {
      $var = $var . ($var ? $glue : '') . $secondVar;
    }

    return $var;
  }

  public function stripSlashes(&$element)
  {
    if (is_array($element)) {
      foreach ($element as $key => $value) {
        $this->stripSlashes($element[$key]);
      }
    } else {
      $element = stripslashes($element);
    }

    return $element;
  }

  public function getContentTypeByExtension($fileName)
  {
    return br($this->mimeTypes, strtolower(br()->fs()->fileExt($fileName)));
  }

  public function getContentTypeByContent($fileName)
  {
    if (file_exists($fileName)) {
      return br($this->mimeTypes, strtolower(br()->images()->getFormat($fileName)));
    }
  }

  // utils

  public function formatDuration($duration, $params = [])
  {
    $includeSign = br($params, 'includeSign');
    $withUnits = br($params, 'withUnits');

    $secs = $mins = $hrs = 0;
    if ($duration < 60) {
      $secs = $duration;
    } elseif ($duration < 60*60) {
      $mins = floor($duration/60);
      $secs = $duration - $mins*60;
    } else {
      $hrs = floor($duration/60/60);
      $mins = floor(($duration - $hrs*60*60)/60);
      $secs = $duration - $hrs*60*60 - $mins*60;
    }
    if ($hrs) {
      return
        ($includeSign ? ($duration > 0 ? '+' : '') : '') . $hrs .
        ($withUnits ? ' ' . self::HRS . ' ' : ':') . str_pad($mins, 2, '0') .
        ($withUnits ? ' ' . self::MINS . ' ' : ':') . number_format(br()->smartRound($secs, 3), 3) .
        ($withUnits ? ' ' . self::SECS . '' : '');
    }
    if ($mins) {
      return
        ($includeSign ? ($duration > 0 ? '+' : '') : '') . $mins .
        ($withUnits ? ' ' . self::MINS . ' ' : ':') . number_format(br()->smartRound($secs, 3), 3) .
        ($withUnits ? ' ' . self::SECS . '' : '');
    }
    return
      ($includeSign ? ($duration > 0 ? '+' : '') : '') . number_format(br()->smartRound($secs, 3), 3) .
      ($withUnits ? ' ' . self::SECS . '' : '');
  }

  public function formatBytes($size, $params = [])
  {
    $includeSign = br($params, 'includeSign');
    $compact = br($params, 'compact');

    $abs = abs($size);
    if ($abs > 0) {
      $unit =
        ($abs < 1024 ? 0 :
          ($abs < 1024*1024 ? 1 :
            ($abs < 1024*1024*1024 ? 2 :
              ($abs < 1024*1024*1024*1024 ? 3 :
                ($abs < 1024*1024*1024*1024*1024 ? 4 :
                  floor(log($abs, 1024)))))));
      return
        ($includeSign ? ($size > 0 ? '+' : '') : '') .
        ($size < 0 ? '-': '') . @round($abs / pow(1024, $unit), 2) .
        ($compact ? '' : ' ') .
        $this->trafficUnits[$unit];
    } else {
      return '0b';
    }
  }

  public function formatDate($outputFormat, $datetime = null, $params = [])
  {
    try {
      $minYear = br($params, 'minYear');
      $inputFormat = br($params, 'inputFormat');
      $datetime = ($datetime ? $datetime : 'now');
      if (($inputFormat == 'us') && !br($datetime)->isNumeric()) {
        $datetime = str_replace('-', '/', $datetime);
      }
      if (br($datetime)->isNumeric()) {
        $date = new \DateTime();
        $date->setTimestamp($datetime);
      } else {
        $datetime = preg_replace('/([0-9])((A|P)M)/i', '$1 $2', $datetime);
        $date = new \DateTime($datetime);
      }
      if ($minYear && ($date->format('Y') < $minYear)) {
        throw new BrAppException('Wrong date: ' . $datetime);
      }
      return $date->format($outputFormat);
    } catch (\Exception $e) {
      throw new BrAppException('Wrong date: ' . $datetime);
    }
  }

  public function smartRound($value, $precision = 2)
  {
    $value = round($value, $precision);

    if (strpos($value, '.') !== false) {
      return rtrim(rtrim($value, '0'), '.');
    } else {
      return $value;
    }
  }

  public function formatTraffic($size)
  {
    return $this->formatBytes($size);
  }

  public function getMemoryUsage()
  {
    return $this->formatBytes(memory_get_usage(true));
  }

  public function getProcessId()
  {
    if ($this->processId === null) {
      $this->processId = getmypid();
    }

    return $this->processId;
  }

  public function trn($phrase = null)
  {
    $trn = BrTrn::getInstance();

    if ($phrase) {
      return $trn->getAttr($phrase, $phrase);
    } else {
      return $trn;
    }
  }

  public function captureShutdown()
  {
    foreach ($this->tempFiles as $fileName) {
      @unlink($fileName);
    }
  }

  public function getTempFile($fileName)
  {
    $this->tempFiles[] = $this->getTempPath() . $fileName;

    return $this->getTempPath() . $fileName;
  }

  public function createTempFile($prefix, $extension = '', $register = true)
  {
    $fileName = @tempnam($this->getTempPath(), $prefix);
    @chmod($fileName, 0666);

    if ($extension) {
      rename($fileName, $fileName . $extension);
      $fileName = $fileName . $extension;
    }

    if ($register) {
      $this->tempFiles[] = $fileName;
    }

    return $fileName;
  }

  public function closureDump($c)
  {
    $str = 'function (';
    $r = new \ReflectionFunction($c);
    $params = array();
    foreach ($r->getParameters() as $p) {
      $s = '';
      if ($p->isArray()) {
        $s .= 'array ';
      } elseif ($p->getClass()) {
        $s .= $p->getClass()->name . ' ';
      }
      if ($p->isPassedByReference()) {
        $s .= '&';
      }
      $s .= '$' . $p->name;
      if ($p->isOptional()) {
        $s .= ' = ' . var_export($p->getDefaultValue(), true);
      }
      $params []= $s;
    }
    $str .= implode(', ', $params);
    $str .= '){' . PHP_EOL;
    $lines = file($r->getFileName());
    for ($l = $r->getStartLine(); $l < $r->getEndLine(); $l++) {
      $str .= $lines[$l];
    }
    return $str;
  }

  public function exec($cmd, $whatToReturn = '')
  {
    $tempFile1 = br()->createTempFile('cmd1', '.log');
    $tempFile2 = br()->createTempFile('cmd2', '.log');

    $runCmd = $cmd . ' </dev/null >' . $tempFile1. ' 2>' . $tempFile2;

    br()->log('[EXEC]' . ' ' . $runCmd);

    exec($runCmd, $stdout, $retval);

    br()->log('[EXEC]' . ' Result: ' . $retval);

    $log = br()->fs()->loadFromFile($tempFile1);
    $err = br()->fs()->loadFromFile($tempFile2);

    $result = [
      'stdout' => $log,
      'stderr' => $err,
      'exitCode' => $retval
    ];

    if ($whatToReturn == 'all') {
      return $result;
    }

    if (array_key_exists($whatToReturn, $result)) {
      return $result[$whatToReturn];
    }

    if ($retval) {
      if ($err) {
        $error = $err;
      } elseif ($log) {
        $error = $log;
      } else {
        $error = 'Can not run shell command ' . $cmd;
      }
      throw new \Exception($error);
    }

    return $log;
  }

  public function getErrorSeverityName($severity)
  {
    return br($this->severityNames, $severity, 'Error');
  }

  public function getShortClassName($obj)
  {
    return (new \ReflectionClass($obj))->getShortName();
  }
}
