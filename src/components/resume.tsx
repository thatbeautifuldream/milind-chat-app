import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { resume } from '@/lib/resume';
import { ThemedText } from '@/components/themed-text';
import { ExternalLink } from '@/components/external-link';
import { calculateDuration, formatDate, range, rangeCompact } from '@/lib/format';

export default function ResumeScreen() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <ResumeView data={resume} />
        <View style={styles.footer}>
          <ThemedText type="small" themeColor="textSecondary">
            Source: github.com/thatbeautifuldream/resume
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

function ResumeView({ data }: { data: any }) {
  return (
    <View style={styles.resumeView}>
      <ResumeHeader basics={data.basics} />

      {data.work && data.work.length > 0 && (
        <ResumeSection title="Experience">
          <View style={styles.sectionContentLarge}>
            {data.work.map((w: any) => (
              <WorkExperienceItem key={w.name} item={w} />
            ))}
          </View>
        </ResumeSection>
      )}

      {data.projects && data.projects.length > 0 && (
        <ResumeSection title="Projects">
          <View style={styles.sectionContentLarge}>
            {data.projects.map((p: any) => (
              <ProjectPortfolioItem key={p.name} item={p} />
            ))}
          </View>
        </ResumeSection>
      )}

      {data.talks && data.talks.length > 0 && (
        <ResumeSection title="Talks">
          <View style={styles.sectionContentSmall}>
            {data.talks.map((t: any) => (
              <TalkPresentationItem key={t.title} item={t} />
            ))}
          </View>
        </ResumeSection>
      )}

      {data.contributions && data.contributions.length > 0 && (
        <ResumeSection title="Open Source Contributions">
          <View style={styles.sectionContentSmall}>
            {data.contributions.map((c: any) => (
              <OpenSourceContributionItem key={c.url} item={c} />
            ))}
          </View>
        </ResumeSection>
      )}

      {data.education && data.education.length > 0 && (
        <ResumeSection title="Education">
          <View style={styles.sectionContentMedium}>
            {data.education.map((e: any) => (
              <EducationCredentialItem key={e.institution} item={e} />
            ))}
          </View>
        </ResumeSection>
      )}

      {data.skills && data.skills.length > 0 && (
        <ResumeSection title="Skills">
          <SkillsProficiency skills={data.skills} />
        </ResumeSection>
      )}
    </View>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="resumeSection">
          {title}
        </ThemedText>
      </View>
      <View>{children}</View>
    </View>
  );
}

function ResumeHeader({ basics }: { basics: any }) {
  return (
    <View style={styles.header}>
      <ThemedText style={styles.headerName}>
        {basics.name}
      </ThemedText>

      <View style={styles.headerContact}>
        {basics.email && (
          <ThemedText type="resumeLabel">
            {basics.email}
          </ThemedText>
        )}
        {basics.url && (
          <ExternalLink href={`https://${basics.url}`}>
            <ThemedText type="resumeLabel">
              {basics.url}
            </ThemedText>
          </ExternalLink>
        )}
        {basics.profiles?.map((p: any) => (
          <ExternalLink
            key={p.network}
            href={p.url.startsWith('http') ? p.url : `https://${p.url}`}
          >
            <ThemedText type="resumeLabel">
              {getNetworkLabel(p)}
            </ThemedText>
          </ExternalLink>
        ))}
      </View>
    </View>
  );
}

function getNetworkLabel(profile: any) {
  const n = profile.network?.toLowerCase() || '';
  if (n.includes('github')) return `gh/${profile.username || ''}`;
  if (n.includes('twitter') || n === 'x') return `x/${profile.username || ''}`;
  if (n.includes('linkedin')) return `li/${profile.username || ''}`;
  if (n.includes('youtube')) return `yt/${profile.username || ''}`;
  if (n.includes('cal')) return `cal/${profile.username || ''}`;
  return profile.username || profile.url || profile.network;
}

function WorkExperienceItem({ item }: { item: any }) {
  const duration = calculateDuration(item.startDate, item.endDate);
  const isPresent = !item.endDate;

  return (
    <View style={styles.workItem}>
      <View style={styles.workItemHeader}>
        <View style={styles.workItemTitle}>
          <View style={styles.rowSpaceBetween}>
            <ThemedText style={styles.position}>
              {item.position || 'Role'}
            </ThemedText>
            {item.workType && (
              <ThemedText type="resumeLabel" themeColor="textSecondary" style={styles.workType}>
                {item.workType}
              </ThemedText>
            )}
          </View>
          <View style={styles.rowSpaceBetween}>
            <ThemedText type="resumeLabel" style={styles.company}>
              {item.name}
            </ThemedText>
            <ThemedText type="resumeLabel" themeColor="textSecondary" style={styles.date}>
              {Platform.select({
                web: range(item.startDate, item.endDate),
                default: rangeCompact(item.startDate, item.endDate),
              })}
              {duration && (
                <ThemedText type="resumeLabel" themeColor="textSecondary" style={isPresent ? styles.hidden : undefined}>
                  {` (${duration})`}
                </ThemedText>
              )}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.workItemContent}>
        {item.summary && (
          <ThemedText type="resumeLabel" style={styles.summary}>
            {item.summary}
          </ThemedText>
        )}
        {item.highlights && item.highlights.length > 0 && (
          <View style={styles.highlights}>
            {item.highlights.map((h: string, index: number) => (
              <View key={h} style={styles.highlight}>
                <ThemedText type="resumeLabel">
                  {h}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

function ProjectPortfolioItem({ item }: { item: any }) {
  const dateDisplay = item.date ? formatDate(item.date) : range(item.startDate, item.endDate);
  const href = item.url ? (item.url.startsWith('http') ? item.url : `https://${item.url}`) : undefined;

  return (
    <View style={styles.workItem}>
      <View style={styles.workItemHeader}>
        <View style={styles.workItemTitle}>
          <View style={styles.rowSpaceBetween}>
            {href ? (
              <ExternalLink href={href}>
                <ThemedText style={styles.projectName}>
                  {item.name}
                </ThemedText>
              </ExternalLink>
            ) : (
              <ThemedText style={styles.projectName}>
                {item.name}
              </ThemedText>
            )}
            <ThemedText type="resumeLabel" themeColor="textSecondary" style={styles.date}>
              {dateDisplay}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.workItemContent}>
        {item.description && (
          <ThemedText type="resumeLabel" style={styles.summary}>
            {item.description}
          </ThemedText>
        )}
        {item.highlights && item.highlights.length > 0 && (
          <View style={styles.highlights}>
            {item.highlights.map((h: string, index: number) => (
              <View key={h} style={styles.highlight}>
                <ThemedText type="resumeLabel">
                  {h}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

function EducationCredentialItem({ item }: { item: any }) {
  const dateDisplay = item.endDate ? formatDate(item.endDate) : range(item.startDate, item.endDate);
  const href = item.url ? (item.url.startsWith('http') ? item.url : `https://${item.url}`) : undefined;

  return (
    <View style={styles.educationItem}>
      <View style={styles.educationContent}>
        {href ? (
          <ExternalLink href={href}>
            <ThemedText type="resumeLabel" style={styles.institution}>
              {item.institution}
            </ThemedText>
          </ExternalLink>
        ) : (
          <ThemedText type="resumeLabel" style={styles.institution}>
            {item.institution}
          </ThemedText>
        )}
        {item.studyType && (
          <ThemedText type="resumeLabel" style={styles.studyType}>
            {' - '}{item.studyType}
          </ThemedText>
        )}
      </View>
      <ThemedText type="resumeLabel" themeColor="textSecondary" style={styles.date}>
        {dateDisplay}
      </ThemedText>
    </View>
  );
}

function TalkPresentationItem({ item }: { item: any }) {
  const href = item.link ? (item.link.startsWith('http') ? item.link : `https://${item.link}`) : undefined;

  return (
    <View style={styles.compactItem}>
      <View style={styles.compactItemContent}>
        {href ? (
          <ExternalLink href={href}>
            <ThemedText type="resumeLabel">
              {item.title}
            </ThemedText>
          </ExternalLink>
        ) : (
          <ThemedText type="resumeLabel">
            {item.title}
          </ThemedText>
        )}
      </View>
      {item.organiser && (
        <ThemedText type="resumeLabel" themeColor="textSecondary" style={styles.organiser}>
          [{item.organiser}]
        </ThemedText>
      )}
    </View>
  );
}

function OpenSourceContributionItem({ item }: { item: any }) {
  const extractOrgAndRepo = (url: string) => {
    try {
      const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
      const parsedUrl = new URL(urlWithProtocol);
      const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        return {
          org: pathParts[0],
          orgRepo: `${pathParts[0]}/${pathParts[1]}`,
        };
      }
      return { org: '', orgRepo: '' };
    } catch {
      return { org: '', orgRepo: '' };
    }
  };

  const { org, orgRepo } = extractOrgAndRepo(item.url);
  const href = item.url.startsWith('http') ? item.url : `https://${item.url}`;

  return (
    <View style={styles.compactItem}>
      <ExternalLink href={href} style={styles.compactItemLink}>
        <ThemedText type="resumeLabel">
          {item.title}
        </ThemedText>
      </ExternalLink>
      {orgRepo && (
        <ThemedText type="resumeLabel" themeColor="textSecondary" style={styles.organiser}>
          {Platform.select({
            web: `[${orgRepo}]`,
            default: `[${org}]`,
          })}
        </ThemedText>
      )}
    </View>
  );
}

function SkillsProficiency({ skills }: { skills: string[] }) {
  return (
    <View style={styles.skills}>
      {skills.map((skill) => (
        <Pressable key={skill}>
          <ThemedText type="resumeLabel" style={styles.skill}>
            {skill}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  resumeView: {
    gap: 16,
  },
  section: {
    gap: 6,
  },
  sectionHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBED',
    paddingBottom: 4,
    marginBottom: 6,
  },
  sectionContentSmall: {
    gap: 6,
  },
  sectionContentMedium: {
    gap: 8,
  },
  sectionContentLarge: {
    gap: 20,
  },
  header: {
    alignItems: 'center',
    gap: 6,
  },
  headerName: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headerContact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  workItem: {
    gap: 8,
  },
  workItemHeader: {
    gap: 2,
  },
  workItemTitle: {
    flex: 1,
    minWidth: 0,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 8,
  },
  position: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 14,
    fontWeight: '600',
  },
  workType: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 12,
    fontStyle: 'italic',
  },
  company: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 14,
    fontStyle: 'italic',
  },
  date: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 12,
  },
  workItemContent: {
    gap: 6,
  },
  summary: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 14,
    lineHeight: 25,
  },
  highlights: {
    gap: 2,
  },
  highlight: {
    paddingLeft: 16,
  },
  projectName: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 14,
    fontWeight: '700',
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  educationContent: {
    flex: 1,
    minWidth: 0,
  },
  institution: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17.5,
  },
  studyType: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 14,
    fontStyle: 'italic',
  },
  compactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  compactItemContent: {
    flex: 1,
    minWidth: 0,
  },
  compactItemLink: {
    flex: 1,
  },
  organiser: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 12,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skill: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    paddingTop: 12,
    alignItems: 'center',
  },
  hidden: {
    display: 'none',
  },
});
